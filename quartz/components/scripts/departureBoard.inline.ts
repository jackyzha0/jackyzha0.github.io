// The board pulls in playhtml (and with it yjs + a websocket client), which is
// far too much to ship on every page of the garden. Keep the loader tiny here
// and pull the real module in on demand, only where a board is on the page.
type BoardModule = { mount: (board: HTMLElement) => () => void }

let pending: Promise<BoardModule> | null = null

document.addEventListener("nav", () => {
  const board = document.querySelector<HTMLElement>("[data-departure-board]")
  const src = board?.dataset.dbSrc
  if (!board || !src) return

  let unmount: (() => void) | null = null
  let cancelled = false
  window.addCleanup(() => {
    cancelled = true
    unmount?.()
    unmount = null
  })

  pending ??= import(new URL(src, document.baseURI).href) as Promise<BoardModule>
  pending
    .then((mod) => {
      if (!cancelled) unmount = mod.mount(board)
    })
    .catch(() => {
      board.dataset.state = "lost"
    })
})
