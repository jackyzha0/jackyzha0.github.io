import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { joinSegments, pathToRoot } from "../util/path"
import style from "./styles/departureBoard.scss"
// @ts-ignore
import script from "./scripts/departureBoard.inline"

// Ships empty and hidden; the script reveals it once presence connects.
const DepartureBoard: QuartzComponent = ({ displayClass, cfg, fileData }: QuartzComponentProps) => {
  const scriptPath = joinSegments(pathToRoot(fileData.slug!), "static/departureBoard.js")
  return (
    <div
      class={classNames(displayClass, "departure-board")}
      data-departure-board=""
      data-state="connecting"
      data-db-src={scriptPath}
      aria-live="polite"
    >
      <div class="db-head">
        <span class="db-head-stop">{cfg.pageTitle}</span>
        <span class="db-head-clock" data-db-clock="">
          --:--:--
        </span>
      </div>
      <div class="db-screen" data-db-screen=""></div>
      <div class="db-foot">
        <span class="db-foot-status">
          <i class="db-lamp"></i>
          <span data-db-status=""></span>
        </span>
      </div>
    </div>
  )
}

DepartureBoard.css = style
DepartureBoard.afterDOMLoaded = script

export default (() => DepartureBoard) satisfies QuartzComponentConstructor
