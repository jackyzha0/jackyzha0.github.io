import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "jzhao.xyz",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "jzhao.xyz",
    ignorePatterns: ["private", "templates"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: {
          name: "DM Serif Display",
          weights: [400],
        },
        body: "Bricolage Grotesque",
        code: "JetBrains Mono",
      },
      colors: {
        // letterpress poster: deep navy + vermilion on warm paper
        lightMode: {
          light: "#f5eedd", // warm letterpress paper
          lightgray: "#e3d9c0", // aged paper borders / code bg
          gray: "#9a8e76", // muted warm gray (dates, line numbers)
          darkgray: "#2d4673", // navy ink body text (reads clearly blue, not black)
          dark: "#16294e", // deep navy headings
          secondary: "#284d78", // navy links / title / primary accent
          tertiary: "#c8482b", // bright orange-red (hover, active, graph)
          highlight: "rgba(200, 72, 43, 0.1)", // faint vermilion ink wash
          textHighlight: "#f4c84b88", // warm yellow marker
        },
        // cyanotype: warm cream + vermilion accent on deep prussian blue
        darkMode: {
          light: "#06182f", // deep prussian blue background
          lightgray: "#122845", // lighter prussian borders / code bg
          gray: "#7191b8", // muted steel-blue (dates, line numbers)
          darkgray: "#caddf4", // cyanotype light-blue body text
          dark: "#eef4fc", // bright blue-white (headings)
          secondary: "#8fb9de", // luminous sky-cyan links / title
          tertiary: "#e0552f", // bold vermilion (hover, active, graph)
          highlight: "rgba(224, 85, 47, 0.14)", // faint vermilion wash
          textHighlight: "#c9542f55", // muted vermilion marker
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.Poetry(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown({
        enableInHtmlEmbed: false,
        parseTags: false,
        mermaid: false,
      }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "absolute", lazyLoad: true }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
      Plugin.LazyScripts({
        scripts: [{ name: "departureBoard", entry: "components/scripts/departureBoard.lazy.ts" }],
      }),
    ],
  },
}

export default config
