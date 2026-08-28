import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { joinSegments, pathToRoot } from "../util/path"
import style from "./styles/departureBoard.scss"
// @ts-ignore
import script from "./scripts/departureBoard.inline"

// The board ships empty and stays hidden until presence connects, then reveals
// itself with the rows sliding in -- no loading state to read.
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
