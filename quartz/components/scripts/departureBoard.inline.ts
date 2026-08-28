// playhtml pulls in yjs and a websocket client -- far too much for every page,
// so this loader stays tiny and fetches the real module only where a board is.
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
