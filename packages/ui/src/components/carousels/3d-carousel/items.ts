import img01 from "./images/01.jpg"
import img02 from "./images/02.jpg"
import img03 from "./images/03.jpg"

export type ThreeDCarouselItem = {
  id: number
  title: string
  brand: string
  description: string
  tags: string[]
  imageUrl: string
  link: string
}

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Demo items - bundled via static imports next to this file (install + site). */
export const DEFAULT_3D_CAROUSEL_ITEMS: ThreeDCarouselItem[] = [
  {
    id: 1,
    title: "Active Wear Sensors",
    brand: "Performance Lab",
    description:
      "Flexible textile sensors that track muscle fatigue and heart rate in real time during training.",
    tags: ["Sports", "Health", "IoT"],
    imageUrl: assetSrc(img01),
    link: "#",
  },
  {
    id: 2,
    title: "Smart Ergonomics",
    brand: "Workspace Studio",
    description:
      "Pressure-sensitive fabrics that analyze posture and suggest adjustments for healthier sitting.",
    tags: ["Office", "Health", "Furniture"],
    imageUrl: assetSrc(img02),
    link: "#",
  },
  {
    id: 3,
    title: "Cabin Comfort",
    brand: "Mobility Systems",
    description:
      "Adaptive seat textiles that respond to passenger position and support safer, quieter rides.",
    tags: ["Auto", "Safety", "Smart"],
    imageUrl: assetSrc(img03),
    link: "#",
  },
]
