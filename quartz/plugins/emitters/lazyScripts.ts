import { build } from "esbuild"
import { FullSlug, QUARTZ, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"

export type LazyScript = {
  /** emitted as `static/<name>.js`, loaded at runtime with a dynamic import */
  name: string
  /** entry point, relative to the `quartz` folder */
  entry: string
}

export type Options = {
  scripts: LazyScript[]
}

/**
 * Bundles a script into its own module under `static/` instead of folding it
 * into the global `postscript.js`. Use this for anything with a heavy
 * dependency that only one page needs -- the bytes stay off every other page.
 */
export const LazyScripts: QuartzEmitterPlugin<Options> = (opts) => {
  const scripts = opts?.scripts ?? []
  return {
    name: "LazyScripts",
    async *emit(ctx) {
      for (const { name, entry } of scripts) {
        const result = await build({
          entryPoints: [joinSegments(QUARTZ, entry)],
          bundle: true,
          minify: true,
          platform: "browser",
          format: "esm",
          write: false,
        })

        yield write({
          ctx,
          slug: joinSegments("static", name) as FullSlug,
          ext: ".js",
          content: result.outputFiles[0].text,
        })
      }
    },
    async *partialEmit() {},
  }
}
