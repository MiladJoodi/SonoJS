import avatar1 from "./images/avatar-1.webp"
import avatar2 from "./images/avatar-2.webp"
import avatar3 from "./images/avatar-3.webp"
import avatar4 from "./images/avatar-4.webp"
import avatar5 from "./images/avatar-5.webp"
import avatar6 from "./images/avatar-6.webp"

export function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

export const reviews = [
  {
    name: "Sarah Johnson",
    username: "@sarah",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: avatar1,
  },
  {
    name: "Michael Chen",
    username: "@michael",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: avatar2,
  },
  {
    name: "Emily Rodriguez",
    username: "@emily",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: avatar3,
  },
  {
    name: "David Thompson",
    username: "@david",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: avatar4,
  },
  {
    name: "Lisa Parker",
    username: "@lisa",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: avatar5,
  },
  {
    name: "James Wilson",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: avatar6,
  },
] as const
