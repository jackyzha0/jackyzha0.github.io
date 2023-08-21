import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { visit } from "unist-util-visit"

export const Poetry: QuartzTransformerPlugin = () => ({
  name: "Poetry",
  markdownPlugins() {
    return [
      () => (tree: Root, _file) => {
        visit(tree, "code", (node) => {
          if (node.lang === "poetry") {
            node.type = "html" as "code"
            node.value = `<pre class="poetry">${node.value}</pre>`
          }
        })
      },
    ]
  },
})
