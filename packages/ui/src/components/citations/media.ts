import mdnIcon from "./media/mdn.svg"
import nodeIcon from "./media/node.svg"
import nytIcon from "./media/nyt.svg"
import seriouseatsIcon from "./media/seriouseats.svg"
import tc39Icon from "./media/tc39.svg"
import wikiIcon from "./media/wiki.svg"

/** Bundled demo favicons — keep citations offline (no remote `/favicon.ico`). */
export const citationIcons = {
  mdn: mdnIcon,
  tc39: tc39Icon,
  node: nodeIcon,
  wiki: wikiIcon,
  seriouseats: seriouseatsIcon,
  nyt: nytIcon,
} as const

export type CitationIconKey = keyof typeof citationIcons
