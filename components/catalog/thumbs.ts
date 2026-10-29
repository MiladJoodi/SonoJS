/** Blocks category thumbs: `public/images/blocks/{category}-light|dark.webp`. */
export function blockCategoryThumbSrc(
  category: string,
  theme: "light" | "dark"
) {
  return `/images/blocks/${category}-${theme}.webp`
}

/** Component thumbs: `public/images/components/{slug}-light|dark.webp`. */
export function componentThumbSrc(slug: string, theme: "light" | "dark") {
  return `/images/components/${slug}-${theme}.webp`
}
