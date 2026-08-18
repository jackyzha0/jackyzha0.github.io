import { QuartzEmitterPlugin } from "../types"
import { i18n } from "../../i18n"
import { unescapeHTML } from "../../util/escape"
import { FullSlug, getFileExtension, isAbsoluteURL, joinSegments, QUARTZ } from "../../util/path"
import { ImageOptions, SocialImageOptions, defaultImage, getSatoriFonts } from "../../util/og"
import sharp from "sharp"
import satori, { SatoriOptions } from "satori"
import { loadEmoji, getIconCode } from "../../util/emoji"
import { write } from "./helpers"
import { BuildCtx } from "../../util/ctx"
import { QuartzPluginData } from "../vfile"
import { JSXInternal } from "preact/src/jsx"
import fs from "node:fs/promises"
import path from "node:path"
import { createHash } from "node:crypto"
import { availableParallelism } from "node:os"
import { styleText } from "util"

const defaultOptions: SocialImageOptions = {
  colorScheme: "lightMode",
  width: 1200,
  height: 630,
  imageStructure: defaultImage,
  excludeRoot: false,
}

const webpQuality = 40

// only needed when satori or sharp change; the key already covers the JSX, fonts and dimensions
const cacheVersion = 1
const ogCacheDir = path.join(QUARTZ, ".quartz-cache", "og")
const cacheEnabled = process.env.QUARTZ_OG_CACHE !== "0"

// satori runs on the main thread but sharp encodes off it, so a small pool lets the two overlap
const maxConcurrency = Math.max(1, Math.min(8, availableParallelism()))

let cacheDirReady: Promise<unknown> | undefined
const ensureCacheDir = () => (cacheDirReady ??= fs.mkdir(ogCacheDir, { recursive: true }))

let iconBase64Promise: Promise<string | undefined> | undefined
function getIconBase64(): Promise<string | undefined> {
  iconBase64Promise ??= (async () => {
    const iconPath = joinSegments(QUARTZ, "static", "icon.png")
    try {
      const iconData = await fs.readFile(iconPath)
      return `data:image/png;base64,${iconData.toString("base64")}`
    } catch {
      console.warn(styleText("yellow", `Warning: Could not find icon at ${iconPath}`))
      return undefined
    }
  })()
  return iconBase64Promise
}

// preact stamps vnodes with monotonically increasing internals (`__v`, `__k`, ...) that differ
// between pages and runs, so stripping them is what makes the key stable. component types are
// functions, so they contribute their source instead of serializing to nothing.
const stableReplacer = (key: string, value: unknown) => {
  if (key.startsWith("_")) return undefined
  if (typeof value === "function") return value.toString()
  return value
}

function fontsCacheKey(fonts: SatoriOptions["fonts"]): string {
  const hash = createHash("sha256")
  for (const font of fonts) {
    hash.update(`${font.name}:${font.weight}:${font.style}:`)
    hash.update(Buffer.from(font.data as ArrayBuffer))
  }
  return hash.digest("hex")
}

function ogCachePath(
  component: JSXInternal.Element,
  fontKey: string,
  { width, height }: SocialImageOptions,
): string {
  const key = createHash("sha256")
    .update(
      JSON.stringify(
        { v: cacheVersion, width, height, quality: webpQuality, fontKey, component },
        stableReplacer,
      ),
    )
    .digest("hex")
  return path.join(ogCacheDir, `${key}.webp`)
}

let tmpCounter = 0
async function writeToCache(cachePath: string, image: Buffer) {
  // write then rename so an interrupted build can't leave a truncated image behind
  const tmpPath = `${cachePath}.${process.pid}-${tmpCounter++}.tmp`
  try {
    await fs.writeFile(tmpPath, image)
    await fs.rename(tmpPath, cachePath)
  } catch (err) {
    console.warn(styleText("yellow", `\nWarning: could not cache og image ${cachePath}: ${err}`))
    await fs.rm(tmpPath, { force: true })
  }
}

// only safe from `emit`, which sees every page; `partialEmit` only sees what changed
async function pruneCache(used: Set<string>) {
  if (!cacheEnabled) return
  try {
    const stale = (await fs.readdir(ogCacheDir))
      .map((entry) => path.join(ogCacheDir, entry))
      .filter((entry) => !used.has(entry))
    await Promise.all(stale.map((entry) => fs.rm(entry, { force: true })))
  } catch (err) {
    console.warn(styleText("yellow", `\nWarning: could not prune og image cache: ${err}`))
  }
}

async function buildImageComponent(
  { cfg, description, fonts, title, fileData }: ImageOptions,
  userOpts: SocialImageOptions,
): Promise<JSXInternal.Element> {
  return userOpts.imageStructure({
    cfg,
    userOpts,
    title,
    description,
    fonts,
    fileData,
    iconBase64: await getIconBase64(),
  })
}

async function renderSocialImage(
  imageComponent: JSXInternal.Element,
  fonts: SatoriOptions["fonts"],
  { width, height }: SocialImageOptions,
): Promise<Buffer> {
  const svg = await satori(imageComponent, {
    width,
    height,
    fonts,
    loadAdditionalAsset: async (languageCode: string, segment: string) => {
      if (languageCode === "emoji") {
        return await loadEmoji(getIconCode(segment))
      }

      return languageCode
    },
  })

  return sharp(Buffer.from(svg)).webp({ quality: webpQuality }).toBuffer()
}

async function processOgImage(
  ctx: BuildCtx,
  fileData: QuartzPluginData,
  fonts: SatoriOptions["fonts"],
  fontKey: string,
  fullOptions: SocialImageOptions,
  used?: Set<string>,
) {
  const cfg = ctx.cfg.configuration
  const slug = fileData.slug!
  const titleSuffix = cfg.pageTitleSuffix ?? ""
  const title =
    (fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title) + titleSuffix
  const description =
    fileData.frontmatter?.socialDescription ??
    fileData.frontmatter?.description ??
    unescapeHTML(fileData.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description)

  const imageComponent = await buildImageComponent(
    {
      title,
      description,
      fonts,
      cfg,
      fileData,
    },
    fullOptions,
  )

  const emit = (content: Buffer) =>
    write({
      ctx,
      content,
      slug: `${slug}-og-image` as FullSlug,
      ext: ".webp",
    })

  if (!cacheEnabled) {
    return emit(await renderSocialImage(imageComponent, fonts, fullOptions))
  }

  const cachePath = ogCachePath(imageComponent, fontKey, fullOptions)
  used?.add(cachePath)
  const cached = await fs.readFile(cachePath).catch(() => undefined)
  if (cached) return emit(cached)

  const image = await renderSocialImage(imageComponent, fonts, fullOptions)
  const emitted = await emit(image)
  await writeToCache(cachePath, image)
  return emitted
}

/**
 * Runs `fn` over `items` with at most `limit` in flight, yielding results as they settle.
 */
async function* mapPool<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): AsyncGenerator<R> {
  type Settled = { idx: number; value?: R; err?: unknown }
  const inFlight = new Map<number, Promise<Settled>>()
  let next = 0

  while (next < items.length || inFlight.size > 0) {
    while (next < items.length && inFlight.size < limit) {
      const idx = next++
      inFlight.set(
        idx,
        fn(items[idx]).then(
          (value) => ({ idx, value }),
          (err) => ({ idx, err }),
        ),
      )
    }

    // every task settles into a value, so bailing out below can't orphan a rejected promise
    const { idx, value, err } = await Promise.race(inFlight.values())
    inFlight.delete(idx)
    if (err) throw err
    yield value as R
  }
}

async function setupOgImages(ctx: BuildCtx) {
  const cfg = ctx.cfg.configuration
  const fonts = await getSatoriFonts(cfg.theme.typography.header, cfg.theme.typography.body)
  if (cacheEnabled) await ensureCacheDir()
  return { fonts, fontKey: fontsCacheKey(fonts) }
}

export const CustomOgImagesEmitterName = "CustomOgImages"
export const CustomOgImages: QuartzEmitterPlugin<Partial<SocialImageOptions>> = (userOpts) => {
  const fullOptions = { ...defaultOptions, ...userOpts }

  return {
    name: CustomOgImagesEmitterName,
    getQuartzComponents() {
      return []
    },
    async *emit(ctx, content, _resources) {
      const { fonts, fontKey } = await setupOgImages(ctx)
      const files = content
        .map(([_tree, vfile]) => vfile.data)
        .filter((fileData) => fileData.frontmatter?.socialImage === undefined)

      const used = new Set<string>()
      yield* mapPool(files, maxConcurrency, (fileData) =>
        processOgImage(ctx, fileData, fonts, fontKey, fullOptions, used),
      )
      await pruneCache(used)
    },
    async *partialEmit(ctx, _content, _resources, changeEvents) {
      const { fonts, fontKey } = await setupOgImages(ctx)

      // find all slugs that changed or were added
      const files = changeEvents
        .filter((changeEvent) => changeEvent.type === "add" || changeEvent.type === "change")
        .map((changeEvent) => changeEvent.file)
        .filter((file) => file !== undefined && file.data.frontmatter?.socialImage === undefined)
        .map((file) => file!.data)

      yield* mapPool(files, maxConcurrency, (fileData) =>
        processOgImage(ctx, fileData, fonts, fontKey, fullOptions),
      )
    },
    externalResources: (ctx) => {
      if (!ctx.cfg.configuration.baseUrl) {
        return {}
      }

      const baseUrl = ctx.cfg.configuration.baseUrl
      return {
        additionalHead: [
          (pageData) => {
            const isRealFile = pageData.filePath !== undefined
            let userDefinedOgImagePath = pageData.frontmatter?.socialImage

            if (userDefinedOgImagePath) {
              if (isAbsoluteURL(userDefinedOgImagePath)) {
                // keep as-is
              } else if (userDefinedOgImagePath.startsWith(".")) {
                userDefinedOgImagePath = new URL(
                  userDefinedOgImagePath,
                  `https://${baseUrl}/${pageData.slug!}`,
                ).href
              } else {
                userDefinedOgImagePath = `https://${baseUrl}/static/${userDefinedOgImagePath}`
              }
            }

            const generatedOgImagePath = isRealFile
              ? `https://${baseUrl}/${pageData.slug!}-og-image.webp`
              : undefined
            const defaultOgImagePath = `https://${baseUrl}/static/og-image.png`
            const ogImagePath = userDefinedOgImagePath ?? generatedOgImagePath ?? defaultOgImagePath
            const ogImageMimeType = `image/${getFileExtension(ogImagePath) ?? "png"}`
            return (
              <>
                {!userDefinedOgImagePath && (
                  <>
                    <meta property="og:image:width" content={fullOptions.width.toString()} />
                    <meta property="og:image:height" content={fullOptions.height.toString()} />
                  </>
                )}

                <meta property="og:image" content={ogImagePath} />
                <meta property="og:image:url" content={ogImagePath} />
                <meta name="twitter:image" content={ogImagePath} />
                <meta property="og:image:type" content={ogImageMimeType} />
              </>
            )
          },
        ],
      }
    },
  }
}
