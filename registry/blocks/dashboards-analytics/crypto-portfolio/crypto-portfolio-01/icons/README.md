# Coin icons — drop files here

Put each asset logo in this folder, then wire the import in `crypto-portfolio.tsx` (see the `ASSETS` array + `ICON_IMPORTS` comment).

| File to add | Asset | `ASSETS` `id` |
|---|---|---|
| `btc.svg` (or `.webp` / `.png`) | Bitcoin | `btc` |
| `eth.svg` | Ethereum | `eth` |
| `sol.svg` | Solana | `sol` |
| `usdc.svg` | USD Coin | `usdc` |

Recommended: square SVG or WebP, ~64–128px, transparent background.

After adding files, in `crypto-portfolio.tsx`:

```tsx
import btcIcon from "./icons/btc.svg"
import ethIcon from "./icons/eth.svg"
import solIcon from "./icons/sol.svg"
import usdcIcon from "./icons/usdc.svg"

// then on each asset:
iconSrc: assetSrc(btcIcon),
```

Until then, the UI shows a letter fallback with the asset accent color.
