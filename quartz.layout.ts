import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

const recentNotes = [
  Component.RecentNotes({
    title: "Selected Writing",
    limit: 4,
    filter: (f) =>
      f.slug!.startsWith("posts/") &&
      f.slug! !== "posts/index" &&
      !f.frontmatter?.noindex &&
      !(f.frontmatter?.tags ?? []).includes("personal"),
    linkToMore: "posts/" as SimpleSlug,
  }),
  Component.RecentNotes({
    title: "Recent Notes",
    limit: 2,
    filter: (f) => f.slug!.startsWith("thoughts/"),
    linkToMore: "thoughts/" as SimpleSlug,
  }),
]

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [...recentNotes.map((c) => Component.MobileOnly(c))],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0",
      Twitter: "https://twitter.com/_jzhao",
    },
  }),
}

const left = [
  Component.Flex({
    gap: "0.5rem",
    components: [
      { Component: Component.PageTitle(), grow: true },
      { Component: Component.Search() },
      { Component: Component.Darkmode() },
    ],
  }),
  ...recentNotes.map((c) => Component.DesktopOnly(c)),
]

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta(), Component.TagList()],
  left,
  right: [
    Component.ConditionalRender({
      component: Component.DepartureBoard(),
      condition: (props) => props.fileData.slug === "index",
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta()],
  left,
  right: [],
}
