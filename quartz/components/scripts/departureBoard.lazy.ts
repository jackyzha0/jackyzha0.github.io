import { playhtml } from "playhtml"
import { uniqueNamesGenerator, adjectives, animals } from "unique-names-generator"

const ROOM = "stop"
const CHANNEL = "stop"
const MAX_ARRIVALS = 5
const MAX_DEPARTURES = 3
// more are retained than are shown, so the overflow count means something
const MAX_DEPARTED = 50
// short enough that a bare HH:MM can't be mistaken for the day before
const DEPARTED_TTL = 12 * 60 * 60 * 1000
const CONNECT_TIMEOUT = 12_000
const FADE_NEAR = 48
const FADE_FAR = 240
// matches playhtml's own cursor freshness window, so a cursor going stale and
// the board marking you gone happen together rather than 30s apart
const IDLE_AFTER = 30_000
// 9 keeps any pairing under the 20 characters a row can hold (~324k combos)
const MAX_WORD = 9
const SHORT_ADJECTIVES = adjectives.filter((word) => word.length <= MAX_WORD)
const SHORT_ANIMALS = animals.filter((word) => word.length <= MAX_WORD)
// long enough to outlast a repaint from someone else's presence landing late
const ENTRY_WINDOW = 500

type Rider = {
  id: string
  publicKey: string
  name: string
  hue: number
  isMe: boolean
  arrivedAt: number
}

type Departure = {
  key: string
  name: string
  hue: number
  departedAt: number
}

let boardEl: HTMLElement | null = null
let screenEl: HTMLElement | null = null
let clockEl: HTMLElement | null = null
let statusEl: HTMLElement | null = null

let connectStarted = false
let subscribed = false
let connected = false
let everConnected = false
let lost = false
let ticker: number | null = null

let riders: Rider[] = []
// the server replays nothing: a departure only exists if this tab saw it happen
let departures: Departure[] = []
let presentIds = new Set<string>()
let knownRiders = new Map<string, Rider>()
let hoveredConn: string | null = null
// publicKeys the board currently lists as here
let atStop = new Set<string>()
let pointerX = -1e4
let pointerY = -1e4
let proximityFrame: number | null = null
let selfCursor: HTMLElement | null = null
let lastActiveAt = Date.now()
let idleAway = false
let seenFirstSnapshot = false
let firstSeen = new Map<string, number>()
let myArrival = 0
let lastSignature = ""
let entering = 0

// publicKey is remote input, so it only ever seeds a pick from our own lists
function nameFor(key: string): string {
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  }
  // seed with a number: the library hashes string seeds so coarsely that every
  // visitor collapses into one of ~128 names
  return uniqueNamesGenerator({
    dictionaries: [SHORT_ADJECTIVES, SHORT_ANIMALS],
    separator: " ",
    style: "lowerCase",
    seed: hash,
  })
}

// playhtml hands out saturated pastels that fight the palette. Keep only the
// hue, as a bare number, so nothing a peer sends reaches a style declaration.
function hueOf(value: unknown, fallbackKey: string): number {
  if (typeof value === "string") {
    const match = /^hsl\(\s*(\d{1,3}(?:\.\d+)?)/.exec(value)
    if (match) return Math.round(Number(match[1])) % 360
  }
  let hash = 0
  for (let i = 0; i < fallbackKey.length; i++) {
    hash = (hash * 31 + fallbackKey.charCodeAt(i)) >>> 0
  }
  return hash % 360
}

function clockTime(ts: number): string {
  return new Date(ts).toLocaleTimeString(undefined, {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  })
}

function trimDepartures(list: Departure[]): Departure[] {
  const cutoff = Date.now() - DEPARTED_TTL
  return list
    .filter((d) => d.departedAt > cutoff)
    .sort((a, b) => b.departedAt - a.departedAt)
    .slice(0, MAX_DEPARTED)
}

function row(opts: {
  key: string
  label: string
  hue: number | null
  time: string
  className: string
  conn?: string
}): HTMLLIElement {
  const li = document.createElement("li")
  li.className = "db-row " + opts.className
  if (opts.conn) li.dataset.conn = opts.conn

  const now = performance.now()
  const seenAt = firstSeen.get(opts.key)
  if (seenAt === undefined) firstSeen.set(opts.key, now)
  if (seenAt === undefined || now - seenAt < ENTRY_WINDOW) {
    li.classList.add("is-new")
    li.style.setProperty("--db-i", String(entering++))
  }

  const chip = document.createElement("span")
  chip.className = "db-chip"
  if (opts.hue !== null) chip.style.setProperty("--db-hue", String(opts.hue))

  const name = document.createElement("span")
  name.className = "db-name"
  name.textContent = opts.label

  const leader = document.createElement("span")
  leader.className = "db-leader"
  leader.setAttribute("aria-hidden", "true")

  const time = document.createElement("span")
  time.className = "db-time"
  time.textContent = opts.time

  li.append(chip, name, leader, time)
  return li
}

function section(label: string, rows: HTMLLIElement[]): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = "db-section"

  const heading = document.createElement("p")
  heading.className = "db-section-label"
  const text = document.createElement("span")
  text.textContent = label
  heading.append(text)

  wrapper.append(heading)

  const list = document.createElement("ol")
  list.className = "db-rows"
  list.append(...rows)
  wrapper.append(list)
  return wrapper
}

function overflowRow(count: number): HTMLLIElement {
  const li = document.createElement("li")
  li.className = "db-row is-overflow"
  const text = document.createElement("span")
  text.className = "db-name"
  text.textContent = `+${count} more`
  li.append(text)
  return li
}

function panel(rows: HTMLLIElement[], total: number, whenEmpty: string): HTMLLIElement[] {
  const hidden = total - rows.length
  if (hidden > 0) rows.push(overflowRow(hidden))
  if (rows.length === 0) rows.push(noteRow(whenEmpty))
  return rows
}

function noteRow(text: string): HTMLLIElement {
  const li = document.createElement("li")
  li.className = "db-row is-note"
  const label = document.createElement("span")
  label.className = "db-name"
  label.textContent = text
  li.append(label)
  return li
}

// Quartz navigates by morphing document.body, which wipes anything playhtml
// appended there. A sibling of <body> sits outside the morph.
function cursorRoot(): HTMLElement {
  let root = document.getElementById("db-cursor-root")
  if (!root) {
    root = document.createElement("div")
    root.id = "db-cursor-root"
    document.documentElement.appendChild(root)
  }
  return root
}

function mountSelfCursor() {
  if (selfCursor) return
  selfCursor = document.createElement("div")
  selfCursor.className = "db-cursor db-cursor--self"
  const blob = document.createElement("i")
  blob.className = "db-cursor-blob"
  selfCursor.append(blob)
  cursorRoot().appendChild(selfCursor)
  document.documentElement.classList.add("db-cursors-live")
}

function unmountSelfCursor() {
  document.documentElement.classList.remove("db-cursors-live")
  selfCursor?.remove()
  selfCursor = null
}

function cursorEl(conn: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-db-cursor="${CSS.escape(conn)}"]`)
}

function syncCursor(conn: string, el: HTMLElement | null = cursorEl(conn)) {
  if (!el) return
  const rider = knownRiders.get(conn)
  if (rider) {
    el.style.setProperty("--db-hue", String(rider.hue))
    const label = el.querySelector<HTMLElement>(".db-cursor-label")
    if (label && label.textContent !== rider.name) label.textContent = rider.name
  }
}

function syncAllCursors() {
  for (const conn of knownRiders.keys()) syncCursor(conn)
}

// returning the wrapper here pre-empts playhtml's own SVG arrow
function renderCursor(conn: string, el: HTMLElement): HTMLElement {
  el.dataset.dbCursor = conn
  el.classList.add("db-cursor")

  const blob = document.createElement("i")
  blob.className = "db-cursor-blob"

  const label = document.createElement("span")
  label.className = "db-cursor-label"

  el.append(blob, label)
  syncCursor(conn, el)
  return el
}

function setHovered(conn: string | null) {
  hoveredConn = conn
}

function onPointerMove(event: MouseEvent) {
  pointerX = event.clientX
  pointerY = event.clientY
  lastActiveAt = Date.now()
  if (idleAway) {
    idleAway = false
    announceArrival()
    refresh()
  }
  if (!selfCursor) return
  // straight from the event, not the rAF loop, so it doesn't trail a frame
  selfCursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
  const target = event.target as HTMLElement | null
  const interactive = Boolean(target?.closest?.("a, button, input, textarea, select, summary"))
  selfCursor.classList.toggle("is-over-link", interactive)
}

function smoothstep(t: number): number {
  const clamped = t < 0 ? 0 : t > 1 ? 1 : t
  return clamped * clamped * (3 - 2 * clamped)
}

// read every rect before writing back: one layout per frame, not N
function proximityTick() {
  proximityFrame = requestAnimationFrame(proximityTick)

  const cursors = document.querySelectorAll<HTMLElement>(".db-cursor:not(.db-cursor--self)")
  if (cursors.length === 0) return

  const nearness: number[] = []
  for (const el of cursors) {
    const blob = el.querySelector<HTMLElement>(".db-cursor-blob") ?? el
    const rect = blob.getBoundingClientRect()
    const dx = rect.left + rect.width / 2 - pointerX
    const dy = rect.top + rect.height / 2 - pointerY
    nearness.push(smoothstep((FADE_FAR - Math.hypot(dx, dy)) / (FADE_FAR - FADE_NEAR)))
  }

  cursors.forEach((el, i) => {
    const near = el.dataset.dbCursor === hoveredConn ? 1 : nearness[i]
    el.style.setProperty("--db-near", near.toFixed(3))
  })
}

function onScreenOver(event: Event) {
  const target = event.target as HTMLElement | null
  const row = target?.closest?.(".db-row") as HTMLElement | null
  setHovered(row?.dataset.conn ?? null)
}

function onScreenLeave() {
  setHovered(null)
}

function note(text: string): HTMLElement {
  const p = document.createElement("p")
  p.className = "db-empty"
  p.textContent = text
  return p
}

function paint() {
  if (!boardEl || !screenEl) return

  const state = connected ? "live" : everConnected ? "lost" : "connecting"
  boardEl.dataset.state = state

  if (statusEl) {
    statusEl.textContent =
      state === "lost"
        ? "signal lost"
        : state === "live"
          ? riders.length === 1
            ? "1 at stop"
            : `${riders.length} at stop`
          : ""
  }

  const signature = [
    state,
    idleAway ? "away" : "here",
    riders.map((r) => `${r.id}@${r.arrivedAt}`).join(","),
    departures.map((d) => `${d.name}@${d.departedAt}`).join(","),
  ].join("|")
  if (signature === lastSignature) return
  lastSignature = signature

  const onBoard = new Set<string>()
  const blocks: HTMLElement[] = []
  entering = 0

  if (state === "lost") {
    blocks.push(note("no connection to the stop."))
  } else if (state === "connecting") {
    // hidden until presence is up
  } else {
    const arrived = riders.slice(0, MAX_ARRIVALS).map((rider) => {
      onBoard.add(rider.id)
      return row({
        key: rider.id,
        conn: rider.isMe ? undefined : rider.id,
        label: rider.isMe ? "you" : rider.name,
        hue: rider.isMe ? null : rider.hue,
        time: rider.isMe && idleAway ? "away" : `arr ${clockTime(rider.arrivedAt)}`,
        className: [rider.isMe ? "is-me" : "", rider.isMe && idleAway ? "is-away" : ""]
          .filter(Boolean)
          .join(" "),
      })
    })

    const gone = departures.slice(0, MAX_DEPARTURES).map((departure) => {
      const key = `departed:${departure.key}:${departure.departedAt}`
      onBoard.add(key)
      return row({
        key,
        label: departure.name,
        hue: departure.hue,
        time: `dep ${clockTime(departure.departedAt)}`,
        className: "has-departed",
      })
    })

    blocks.push(
      section("arrivals", panel(arrived, riders.length, "nobody at the stop.")),
      section("departures", panel(gone, departures.length, "no departures yet.")),
    )
  }

  screenEl.replaceChildren(...blocks)
  for (const key of firstSeen.keys()) {
    if (!onBoard.has(key)) firstSeen.delete(key)
  }
}

function refresh() {
  if (!connected) return

  let views: Map<string, any>
  try {
    views = playhtml.presence.getPresences()
  } catch {
    return
  }

  const now = Date.now()
  const nextIds = new Set<string>()
  const next: Rider[] = []

  views.forEach((view, id) => {
    const identity = view?.playerIdentity
    const publicKey = typeof identity?.publicKey === "string" ? identity.publicKey : id
    const mine = Boolean(view?.isMe)
    const broadcast = (view as any)?.[CHANNEL]?.arrivedAt
    const arrivedAt = mine ? myArrival : typeof broadcast === "number" ? broadcast : 0

    // Navigating away clears this channel but keeps the connection, so they
    // linger in the presence map. Connected is not here.
    if (!arrivedAt) return

    const rider: Rider = {
      id,
      publicKey,
      name: nameFor(publicKey),
      hue: hueOf(identity?.playerStyle?.colorPalette?.[0], publicKey),
      isMe: mine,
      arrivedAt,
    }
    nextIds.add(id)
    knownRiders.set(id, rider)
    next.push(rider)
  })

  if (seenFirstSnapshot) {
    let changed = false
    for (const id of presentIds) {
      if (nextIds.has(id)) continue
      const gone = knownRiders.get(id)
      knownRiders.delete(id)
      if (!gone || gone.isMe) continue
      departures.unshift({ key: gone.publicKey, name: gone.name, hue: gone.hue, departedAt: now })
      changed = true
    }
    if (changed) departures = trimDepartures(departures)
  }

  presentIds = nextIds
  seenFirstSnapshot = true

  const stillHere = new Set(next.map((rider) => rider.publicKey))
  const changed = stillHere.size !== atStop.size || [...stillHere].some((key) => !atStop.has(key))
  atStop = stillHere

  const returned = departures.filter((departure) => stillHere.has(departure.key))
  if (returned.length > 0) {
    departures = departures.filter((departure) => !stillHere.has(departure.key))
  }

  // a quiet cursor sends no update to filter, so sweep what's already on screen
  if (changed) revalidateCursors()
  syncAllCursors()

  next.sort((a, b) => {
    if (a.isMe !== b.isMe) return a.isMe ? -1 : 1
    return b.arrivedAt - a.arrivedAt
  })
  riders = next

  paint()
}

function checkIdle() {
  if (!connected || idleAway || !boardEl) return
  if (Date.now() - lastActiveAt < IDLE_AFTER) return
  idleAway = true
  // we stay on our own board, marked away; everyone else sees us depart
  leaveStop()
  refresh()
}

function tick() {
  if (clockEl) {
    clockEl.textContent = new Date().toLocaleTimeString(undefined, {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }
  const trimmed = trimDepartures(departures)
  if (trimmed.length !== departures.length) departures = trimmed
  checkIdle()
  refresh()
  paint()
}

function startTicker() {
  stopTicker()
  tick()
  ticker = window.setInterval(tick, 1000)
}

function stopTicker() {
  if (ticker !== null) {
    clearInterval(ticker)
    ticker = null
  }
}

function markLost() {
  lost = true
  connected = false
  paint()
}

async function connect() {
  if (lost) return paint()

  if (!connectStarted) {
    connectStarted = true
    // pin the room so query strings (?utm_source=...) don't split people up
    playhtml.init({
      room: ROOM,
      onError: markLost,
      cursors: {
        enabled: true,
        onCustomCursorRender: renderCursor,
        shouldRenderCursor,
        container: cursorRoot(),
      },
    })
  }

  const timedOut = Symbol("timeout")
  const timeout = new Promise<typeof timedOut>((resolve) =>
    setTimeout(() => resolve(timedOut), CONNECT_TIMEOUT),
  )
  const result = await Promise.race([playhtml.ready.then(() => "ready" as const), timeout]).catch(
    () => timedOut,
  )
  if (result === timedOut) return markLost()

  connected = true
  everConnected = true
  if (!subscribed) {
    subscribed = true
    playhtml.presence.onPresenceChange(CHANNEL, refresh)
  }
  announceArrival()
  refresh()
}

function announceArrival() {
  if (!connected) return
  myArrival = Date.now()
  try {
    playhtml.presence.setMyPresence(CHANNEL, { arrivedAt: myArrival })
  } catch {
    markLost()
  }
}

function leaveStop() {
  if (!connected) return
  try {
    playhtml.presence.setMyPresence(CHANNEL, null)
  } catch {
    // nothing to do -- the server drops us when the socket closes anyway
  }
}

// playhtml keeps broadcasting a pointer after its owner navigates away --
// `enabled` is only read when the cursor client is built, so it can't be
// switched back off. Filter on the receiving side instead.
function shouldRenderCursor(presence: { playerIdentity?: { publicKey?: string } }): boolean {
  const key = presence?.playerIdentity?.publicKey
  return typeof key === "string" && atStop.has(key)
}

function revalidateCursors() {
  try {
    playhtml.cursorClient?.configure({ shouldRenderCursor })
  } catch {
    // cursors never came up
  }
}

function teardown() {
  stopTicker()
  leaveStop()
  hoveredConn = null
  atStop = new Set()
  revalidateCursors()
  unmountSelfCursor()
  document.removeEventListener("mousemove", onPointerMove)
  if (proximityFrame !== null) {
    cancelAnimationFrame(proximityFrame)
    proximityFrame = null
  }
  if (screenEl) {
    screenEl.removeEventListener("mouseover", onScreenOver)
    screenEl.removeEventListener("mouseleave", onScreenLeave)
  }
  boardEl = null
  screenEl = null
  clockEl = null
  statusEl = null
}

export function mount(board: HTMLElement): () => void {
  boardEl = board
  screenEl = board.querySelector<HTMLElement>("[data-db-screen]")
  clockEl = board.querySelector<HTMLElement>("[data-db-clock]")
  statusEl = board.querySelector<HTMLElement>("[data-db-status]")

  firstSeen = new Map()
  lastSignature = ""

  screenEl?.addEventListener("mouseover", onScreenOver)
  screenEl?.addEventListener("mouseleave", onScreenLeave)
  document.addEventListener("mousemove", onPointerMove, { passive: true })
  mountSelfCursor()
  if (proximityFrame === null) proximityTick()

  announceArrival()
  startTicker()
  void connect()

  return teardown
}
