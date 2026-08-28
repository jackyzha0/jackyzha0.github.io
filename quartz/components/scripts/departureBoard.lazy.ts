import { playhtml } from "playhtml"
import { uniqueNamesGenerator, adjectives, animals } from "unique-names-generator"

// everyone looking at the home page joins the same playhtml presence room and
// broadcasts when they got here. the board is a bus stop: who is waiting now,
// and who has recently left.
const ROOM = "stop"
const CHANNEL = "stop"
// both panels grow to a cap, then collapse the tail into a count
const MAX_ARRIVALS = 5
const MAX_DEPARTURES = 3
// more are retained than are shown, so the overflow count means something
const MAX_DEPARTED = 50
// only relevant to a tab left open a long time -- departures aren't stored
// anywhere, so a bare HH:MM can't drift far enough to be ambiguous
const DEPARTED_TTL = 12 * 60 * 60 * 1000
const CONNECT_TIMEOUT = 12_000
// a cursor's name fades in as your pointer closes on it: full at NEAR, gone
// past FAR, smoothstepped in between
const FADE_NEAR = 48
const FADE_FAR = 240
// go this long without moving the pointer and you step off the board: your
// presence clears, so your cursor vanishes for everyone at once
const IDLE_AFTER = 60_000
// capping both dictionaries at 9 means any pairing lands under 20 characters,
// which is what a row can hold. leaves ~324k combinations.
const MAX_WORD = 9
const SHORT_ADJECTIVES = adjectives.filter((word) => word.length <= MAX_WORD)
const SHORT_ANIMALS = animals.filter((word) => word.length <= MAX_WORD)
// how long a row counts as "entering" -- long enough to survive a repaint
// caused by someone else's presence landing a beat later
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
// presence is ephemeral and the server replays nothing, so a departure only
// exists if this tab watched it happen. nothing is persisted.
let departures: Departure[] = []
let presentIds = new Set<string>()
let knownRiders = new Map<string, Rider>()
// a cursor's name fades up as your pointer nears it, or snaps in while you
// hover that visitor's row on the board
let hoveredConn: string | null = null
// publicKeys of everyone the board currently lists as here
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

// a peer's publicKey is arbitrary remote input, so never render it directly --
// it only ever seeds a pick from our own word lists
function nameFor(key: string): string {
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  }
  // seed the generator with a number, not the key itself: it hashes strings so
  // coarsely that every visitor collapses into one of ~128 names
  return uniqueNamesGenerator({
    dictionaries: [SHORT_ADJECTIVES, SHORT_ANIMALS],
    separator: " ",
    style: "lowerCase",
    seed: hash,
  })
}

// playhtml hands out saturated pastels like "hsl(164, 70%, 60%)", which fight
// the letterpress palette. Keep only the hue -- a bare number, so nothing a
// peer sends can reach a style declaration -- and re-tint it per theme.
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

/** Caps a panel at what's shown, trading the remainder for a count. */
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

/**
 * Quartz navigates by morphing document.body, which wipes anything playhtml
 * appended there -- the cursors never came back on the way home. Mounting the
 * cursor layer as a sibling of <body> puts it outside the morph entirely.
 */
function cursorRoot(): HTMLElement {
  let root = document.getElementById("db-cursor-root")
  if (!root) {
    root = document.createElement("div")
    root.id = "db-cursor-root"
    document.documentElement.appendChild(root)
  }
  return root
}

/** Your own pointer, drawn in the same pixel style as everyone else's. */
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

/** Push what we know about a visitor onto their cursor: colour, name, whether
 * the name is currently showing. */
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

// playhtml hands us the positioned wrapper before it draws its own SVG arrow;
// returning it swaps in a pixel blob instead
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
  // written straight from the event rather than the rAF loop, so your own
  // cursor doesn't trail a frame behind the real pointer
  selfCursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
  const target = event.target as HTMLElement | null
  const interactive = Boolean(target?.closest?.("a, button, input, textarea, select, summary"))
  selfCursor.classList.toggle("is-over-link", interactive)
}

function smoothstep(t: number): number {
  const clamped = t < 0 ? 0 : t > 1 ? 1 : t
  return clamped * clamped * (3 - 2 * clamped)
}

// Read every rect before writing anything back, so N cursors cost one layout
// per frame rather than N.
function proximityTick() {
  proximityFrame = requestAnimationFrame(proximityTick)

  // our own cursor is a pointer replacement, not presence -- skip it
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
    // nothing to show yet -- the board is hidden until presence is up
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

    // Someone who navigates off the home page clears this channel but stays
    // connected, so they linger in the presence map. Being connected isn't
    // being here -- without an arrival time they've left the stop, and both
    // the board and their cursor should treat them as gone.
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

  // anyone who was in the last snapshot but isn't in this one just left
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

  // a cursor whose owner has gone quiet sends no further update to be filtered,
  // so sweep the ones already on screen whenever the roster changes
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
  // stop broadcasting presence; everyone else's board moves us to departures
  // and drops our cursor. we stay on our own board, marked away.
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

/**
 * playhtml keeps broadcasting a pointer after its owner has navigated away --
 * `enabled` is only read when the cursor client is first built, so there's no
 * way to switch it back off. Filter on the receiving side instead: a cursor is
 * only drawn for someone the board still lists as being here, which keeps the
 * two halves of this feature telling the same story.
 */
function shouldRenderCursor(presence: { playerIdentity?: { publicKey?: string } }): boolean {
  const key = presence?.playerIdentity?.publicKey
  return typeof key === "string" && atStop.has(key)
}

// re-runs the filter over every cursor already on screen
function revalidateCursors() {
  try {
    playhtml.cursorClient?.configure({ shouldRenderCursor })
  } catch {
    // nothing to revalidate if cursors never came up
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

/** Wire up a board element. Returns a teardown to run when we navigate away. */
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

  // coming back to the home page counts as a fresh arrival at the stop
  announceArrival()
  startTicker()
  void connect()

  return teardown
}
