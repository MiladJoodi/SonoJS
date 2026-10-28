# Porting a chart from FarsiUI (per-file)

Say which id to bring (e.g. `chart-area-default` or gallery `simple-bar-chart`). Then:

## Locked visual pattern (canonical) — LOCKED

**Source of truth:** `registry/charts/bar/simple-bar-chart.tsx`  
**Do not restyle** without an explicit unlock. After any allowed edit: `npm run registry:build` so `public/r/simple-bar-chart.json` matches the site.

New / ported gallery charts should follow this chrome unless the chart type cannot (e.g. heatmap):

| Concern | Locked choice |
|---|---|
| Dual series | `--chart-1` navy `#1E3A8A` × `--chart-2` orange `#EA580C` (dark: `#3B82F6` / `#F97316`) |
| Tokens | `globals.css` + `vega-tokens.css` + registry `cssVars` — no hex in the demo file |
| Header | Title + subtitle; metric total + delta + active month (Intl); idle = last category |
| Bars | Grouped flat fills, top radius `8` (= control), width 36/28, category gap 18%/16%, barGap 8/6 |
| Scrub | Hover / touch / keyboard; inactive 40%; one neutral total above taller bar while scrubbing |
| Value labels | Never series-colored; never always-on (default). Exception: pyramid tip `%` — see below |
| Grid | Horizontal only, dashed `4 4`, quiet border opacity |
| Axes | No axis/tick lines; muted 12px tabular ticks; **no** rotated unit label |
| Legend | Bottom center, `size-2` **rounded-full** dots (outside SVG) |
| Tooltip | `ChartTooltip` + `ChartTooltipContent`; soft cursor wash |
| Motion | ease-out ~180–200ms; honor `prefers-reduced-motion`; no idle pulse |
| Direction | `useChartDir`; LTR data; RTL flips axis/layout only |
| a11y | `accessibilityLayer` + keyboard `aria-live` + `sr-only` table |
| Shared chrome | `chartBarContainerClassName` / `CHART_SERIES_*` from `_lib/chart-styles` |

Do **not** invent a second dual-series palette for “variety.” Semantic `--chart-3…5` only for status / alert accents.

## Per-chart deviations

Locked Simple Bar chrome is the **default starting point**. Chart-type or custom looks live in **that chart’s file** — do not fork the dual-series palette or restyle Simple/Stacked to match.

| Where | Use for |
|---|---|
| Same `registry/charts/<category>/<slug>.tsx` | Chart-local UI (e.g. pyramid always-on tip `%` via `EndLabel`, SVG ink via `color-mix` on `--chart-*`) |
| `registry/charts/_lib/` | Helpers shared by **2+** charts only |
| Sibling `.css` + registry `files` entry | Only when the chart needs real stylesheet rules (keyframes, complex selectors) — not for SVG label geometry |

**Population pyramid:** tip percentages outside each bar are always-on and series-tinted via `color-mix(…, var(--chart-*), var(--foreground))` — never mix with `black` (breaks dark mode). No hover tooltip overlay.

**Box plot:** custom `BoxShape` + `ErrorBar` whiskers + outlier `Scatter`; always-on median labels + median stroke use light ink (`#ffffff`) on the `--chart-1` box (never `foreground` — black-on-navy in light). Key legend (box / median / outlier); five-number tooltip. Metric header tracks median.

**On-fill labels:** any SVG text drawn on a series-colored fill must use light ink (`#ffffff`), same as `bar-chart-with-label-background`. Tip/scrub labels *outside* bars stay `var(--foreground)`. Never `color-mix(…, black)` for tip ink.

**Scrub flicker:** `isAnimationActive={!reducedMotion && !liveScrubbing}` — Cell opacity changes must not re-run bar enter animation. Prefer stable `LabelList` + `useCallback` content over inline `label={() => …}`. Dim inactive labels with opacity; do not unmount them.

**Always-on labels:** charts with permanent value ink (`bar-chart-with-label-background`, `bar-label`, `bar-label-custom`, `population-pyramid`, `box-plot`) use `isAnimationActive={false}` — enter animation grows height from 0 and makes labels blink on load.

**Waterfall:** floating `[bottom, top]` range bars from a running total; fills use semantic `--chart-up` / `--chart-down` + `--chart-1` for totals (not dual-series navy×orange for every step).

**Mix bar:** Store+Online stacked (`stackId`) beside a non-stacked Orders series; `--chart-3` for the third series; HTML legend hover/click focus-locks a series (dims others).

**Positive / negative bar:** grouped dual series that cross zero; `ReferenceLine` at y=0; Y ticks tinted by sign (`--chart-up` / `--destructive`); metric header shows signed net.

**Customized event bar:** click (and optional scrub) selects a month; chip row + detail panel stay in sync; average `ReferenceLine`; no tooltip (panel replaces it).

**Has background:** Desktop `Bar` uses Recharts `background={{ fill: "var(--muted)" }}` as a full-height track; Mobile stays a plain grouped bar.

**Ranged stacked:** Prep/Pack/Ship as `[start, end]` minute ranges inside `BarStack`; `--chart-3` for Ship; custom tooltip shows each stage window + total.

**Tiny bar:** sparkline-style stage (`h-[100px]`, `max-w-[300px]`, golden aspect) — no axes / tooltip / legend; locked metric header + scrub still apply.

**Animated bar width:** idle = all bars thin (`scaleX(20%)`); scrub expands only the active bar. `expanded = reducedMotion || (liveScrubbing && index === liveIndex)`.

**bar-interactive:** Store/Online toggle tabs show period totals; chart plots the active series only; dense daily X ticks (`minTickGap`); fullWidth preview.

**bar-active:** Per-category fills (`--chart-1…5`); featured index keeps a dashed stroke (`activeBarIndex`, default `2`); idle metric returns to the featured bar (not last).

**bar-horizontal:** `layout="vertical"` (category on Y, value on X); single series `--chart-1`; `XAxis.reversed` in RTL (bars grow left, Y on the right); tip radius stays `[0,8,8,0]` even in RTL (Recharts negative width — swapping to `[8,0,0,8]` rounds the base); tip label past the value tip; scrub uses Y.

**Horizontal RTL tip pattern:** tip at `x + width` always (width is negative when `XAxis.reversed`), `textAnchor` flip, tip gutter on the tip side. Same for `bar-label-custom`, `bar-mixed`, `timeline`. Always tip radius `[0,8,8,0]` — never swap corners in RTL.

**Custom tooltips:** plot islands are `dir="ltr"` — custom tooltip roots must set `dir={dir}` from `useChartDir` (box-plot, waterfall, ranged-stacked). `ChartTooltipContent` already does this via `useDirection`.

**Bar label (classic):** vertical single-series with always-on top value labels (neutral ink) — exception to the default “never always-on” rule.

**Bar label custom (classic):** horizontal (`layout="vertical"`) with always-on tip labels past the bar end; same scrub/Y-axis pattern as Bar Horizontal.

**area-chart:** dual overlapping monotone `Area`s (Desktop×Mobile) with **neon** chart-local styles (`useMarketNeon` → `--chart-up`/`--chart-down` + stroke bloom); navy×orange fallback; locked metric scrub chrome; stage uses `chartAreaContainerClassName`.

**stacked-area-chart:** three stacked monotone `Area`s (Desktop×Mobile×Tablet, `stackId`) with **neon** on Desktop/Mobile (`--chart-up`/`--chart-down`); `--chart-3` amber for Tablet; same locked scrub chrome + gradients.

**area-chart-range:** single `[low, high]` temperature band with **neon** (`--chart-up`); metric tracks high + span label; `ReferenceLine` at 0.

**area-chart-connect-nulls:** single **neon** area; stacked pair — gap at nulls vs `connectNulls`; April omitted; metric shows `—` on the null month.

**cardinal-area-chart:** side-by-side curve compare — `monotone` vs `natural` with **neon** up/down; shared scrub.

**percent-area-chart:** three stacked areas with `stackOffset="expand"` (100% share) + **neon** on Desktop/Mobile; metric tracks dominant series %; Y ticks as percent.

**synchronized-area-chart:** three `syncId` area panels — Desktop, Mobile + `Brush`, Total (`--chart-3`) with **neon** on Desktop/Mobile; shared metric scrubber; brush window offsets tooltip index.

**tiny-area-chart:** sparkline stage (no axes / tooltip / legend) with locked metric header scrubber + **neon** single series; `isAnimationActive={false}`.

**area-chart-fill-by-value:** single monotone area; fill splits at y=0 via `useYAxisScale` + `useChartHeight` gradient (**neon** up/down when branded); zero `ReferenceLine`; signed metric scrubber.

**area-chart-custom-animation:** single **neon** monotone area; custom entrance `animationDuration={900}` (0 when reduced-motion); metric scrubber pauses tween while scrubbing.

**range-area-chart-custom-animation:** **neon** `[low, high]` linear range area; custom entrance `animationDuration={1200}`; metric tracks high + span; scrub pauses tween.

**area-chart-with-custom-events:** **neon** `type="step"` area; chart-root handlers + `getRelativeCoordinate` with live event panel; mock seed `456` (20 weeks); scrub + context-menu `preventDefault`.

**prevent-right-click:** **neon** monotone area; `onContextMenu` → `preventDefault` with brief blocked flash; mock seed `4390435` (H1 y-series).

**area-interactive:** Store/Online toggle tabs show period totals; chart plots the active series only as a **neon** monotone area + gradient; dense daily X ticks (`minTickGap`); fullWidth preview — same interaction model as `line-interactive` / `bar-interactive`.

**area-step:** single **neon** `type="step"` area (Store H1 2026); flat segments between months; metric scrubber.

**area-gradient:** stacked Store×Online `type="natural"` areas with **neon** chart-local styles (`useMarketNeon` → `--chart-up`/`--chart-down` + stroke bloom); navy×orange fallback when raw; metric scrubber.

**market-cards:** three SVG area-sparkline cards (30-day up / KWD down / gold flat) with **neon** glow on branded skins; no Recharts; inherits page `dir`; fullWidth preview.

**chart-area-default (classic):** single Store series with `type="natural"` area + navy fill gradient; locked metric scrubber (same chrome as `line-default`).

**chart-area-linear (classic):** same Store series with `type="linear"` area + navy fill gradient; locked metric scrubber.

**chart-area-step (classic):** same Store series with `type="step"` area + navy fill gradient; locked metric scrubber. Distinct from gallery `area-step`.

**chart-area-legend (classic):** stacked Desktop×Mobile `type="natural"` areas + `ChartLegend` / `ChartLegendContent`; locked metric scrubber (total visitors).

**chart-area-stacked (classic):** same stacked Desktop×Mobile natural areas with footer series keys (no `ChartLegend`); locked metric scrubber. Distinct from gallery `stacked-area-chart`.

**chart-area-stacked-expand (classic):** same dual series with `stackOffset="expand"` (100% share); metric tracks leading share; distinct from gallery `percent-area-chart`.

**chart-area-icons (classic):** stacked Desktop×Mobile natural areas + `ChartLegend` with Lucide `TrendingDown` / `TrendingUp` series icons; locked metric scrubber.

**chart-area-axes (classic):** stacked Store×Online solid fills (`fillOpacity` 0.4) + sparse Y-axis `tickCount={3}`; locked metric scrubber. Last classic area demo in the set.

**two-level-pie-chart:** nested pies (inner regions / outer channels); metric = idle outer total or scrub slice + “% of ring”; no on-slice labels; region legend only; `--chart-1…5`; RTL flips start/end angles.

**straight-angle-pie-chart:** half-pie `startAngle`/`endAngle` 180↔0, `cy="100%"` `outerRadius="195%"` `aspect-[2.4]` (fills height — little dead air above); no on-slice labels; metric = idle total or scrub slice + “% of total”; RTL swaps sweep so flat edge stays bottom.

**custom-active-shape-pie-chart:** donut with `activeShape` callout + outer ring; tooltip body suppressed; idle returns to `defaultActiveIndex` (0); value ink `foreground`, percent muted; center name uses slice fill.

**pie-chart-with-customized-label:** full pie with always-on mid-slice `%` labels (`labelLine={false}`); on-fill ink `#ffffff`; `isAnimationActive={false}` to avoid label blink; metric scrub dims siblings.

**pie-chart-with-padding-angle:** thin donut (`innerRadius` 80% / `outerRadius` 100%) with `paddingAngle={5}` + `cornerRadius="50%"`; no on-slice labels; `ChartLegend`; metric scrub dims siblings.

**pie-chart-in-grid:** CSS Grid teaching demo (`grid-cols-3` / `grid-rows-3`) — 2×2 + two 1×1 + 3×1 cells; shared donut `60%`/`80%`; English center labels; `isAnimationActive={false}`; no metric scrub; `fullWidth` preview.

**pie-with-gradient:** donut with custom radial + shine `shape`, `paddingAngle={3}` `cornerRadius={10}`; active expand + outer ring; center disc idle = total / scrub = name + `%`; channel cards drive active; no hardcoded `dir`; English / `Intl`.

**pie-donut-text:** gallery donut with center ring-total Label; header metric scrub; classic twin is `chart-pie-donut-text`.

**pie-interactive:** gallery month Select + active sector; needs registry `select`; classic twin is `chart-pie-interactive`.

**pie-stacked:** gallery nested Store×Online month rings; ↑/↓ switch ring; classic twin is `chart-pie-stacked`.

**chart-pie-simple (classic):** baseline full pie (no inner radius); province sales 275/200/187/173/90; locked metric scrub; no Card shell; English / `Intl`; featured.

**chart-radial-simple (classic):** concentric `RadialBar` rings (inner 30 / outer 110); region sales sample; `--chart-1…5` via Cell + cssVars (light/dark); locked metric scrub; `plotDir` flips angles; `RadialProvinceTooltipContent` with `dir`; track `background={{ fill: "var(--muted)" }}`; plot `dir="ltr"`.

**chart-radial-label (classic):** same as simple + `LabelList` inside-start (white on-fill) + wide sweep (`-90`→`380`, RTL mirrored); `isAnimationActive={false}`; same tooltip / muted track.

**chart-radial-grid (classic):** same sample + `PolarGrid gridType="circle"` + `outerRadius={100}` (no bar background); same tooltip / scrub.

**chart-radial-text (classic):** partial ring (`0`→`250`, RTL mirrored) + PolarGrid double circle + center Label; `--chart-2`; muted track; `RadialProvinceTooltipContent`; plot `dir="ltr"`.

**chart-radial-shape (classic):** short arc (`endAngle={100}`, RTL mirrored) + PolarGrid `[86,74]`; `--chart-2`; muted track; tooltip + center Label; plot `dir="ltr"`.

**chart-radial-stacked (classic):** semicircle (`endAngle={180}`, RTL mirrored) Store×Online stack; navy×orange cssVars; `ChartTooltipContent dir={dir}`; centered total; plot `dir="ltr"`.

**chart-pie-separator-none (classic):** same data as Simple; teaching diff is `stroke="0"` (seamless slices, no background gaps); locked metric scrub; not featured.

**chart-pie-label (classic):** same data as Simple; always-on value `label`; ink via `[&_.recharts-pie-label-text]:fill-foreground`; `isAnimationActive={false}` to avoid label blink; locked metric scrub.

**chart-pie-label-custom (classic):** custom JSX `label` + `labelLine={false}`; value ink `var(--foreground)`; `isAnimationActive={false}`; locked metric scrub.

**chart-pie-label-list (classic):** `LabelList` province names on slices; on-fill ink `#ffffff`; `isAnimationActive={false}`; locked metric scrub.

**chart-pie-legend (classic):** full pie + `ChartLegend` / `ChartLegendContent nameKey="province"` wrap row (`basis-1/4`); taller stage `max-h-[300px]`; tooltip + metric scrub.

**chart-pie-donut (classic):** payment-method donut (`innerRadius={60}`); card/gateway/cash/wallet/other; empty hole (no center Label — vs donut-text); locked metric scrub.

**chart-pie-donut-active (classic):** province donut `innerRadius={60}` `strokeWidth={5}`; custom `shape` expands active `outerRadius+10`; idle returns to `defaultActiveIndex` (0); metric tracks featured/active slice.

**chart-pie-donut-text (classic):** twin of gallery `pie-donut-text`; `innerRadius={60}` `strokeWidth={5}`; center `Label` always = ring total + “Sales”; header metric scrub; same chrome language.

**chart-pie-stacked (classic):** twin of gallery `pie-stacked`; Store `outerRadius={60}` × Online `70`/`90`; shared month colors; ↑/↓ switch ring; compact 250px stage.

**chart-pie-interactive (classic):** twin of gallery `pie-interactive`; `innerRadius={60}` `strokeWidth={5}`; Select + expand/halo active shape; center = active value + month; needs registry `select`; 300px stage.

**simple-line-chart:** dual monotone `Line`s (Desktop×Mobile); same locked metric scrub chrome; dots dim to 40% when scrubbing inactive categories; stage uses `chartLineContainerClassName`.

**dashed-line-chart:** same chrome as simple-line; both series use `strokeDasharray` (`3 4 5 2` / `6 4`); idle `dot={false}` (activeDot only); legend shows dashed stroke samples.

**vertical-line-chart:** `layout="vertical"` (months on Y, values on X); dual `type="linear"` lines; portrait stage (`chartVerticalLineContainerClassName`); scrub via Y (Up/Down + `indexFromClientY`); `XAxis.reversed` + `YAxis` orientation/reversed for RTL — same pattern as bar-horizontal.

**line-chart-connect-nulls:** single navy series; stacked pair — gap at nulls vs `connectNulls`; April omitted in demo data; metric shows `—` on the null month; shared scrub across both plots.

**line-chart-with-reference-lines:** same chrome as simple-line; vertical `ReferenceLine` on March + horizontal at `y=200` (`--destructive`); label positions flip for RTL.

**customized-label-line-chart:** same chrome as simple-line; always-on alternating Desktop point labels (halo stroke); angled X ticks (`rotate(-35)`); scrub dims inactive labels.

**highlight-and-zoom-line-chart:** drag `ReferenceArea` to zoom X + dual Y domains (Cost×Impressions); Zoom out resets; no category scrub (drag is the interaction); `XAxis.reversed` + axis sides flip for RTL.

**line-chart-axis-interval:** stacked interval demos (`preserveStart` / `preserveEnd` / `preserveStartEnd` / `equidistantPreserveStart` / `1`); dense `interval={1}` uses angled X ticks; mock data via `chart-mock-data`.

**biaxial-line-chart:** dual Y-axes (`yAxisId` primary/secondary) with independent domains (revenue vs orders); axis ticks tinted to series; same locked scrub chrome as simple-line.

**line-chart-with-x-axis-padding:** same chrome as simple-line; `XAxis` `padding` inset (LTR `{ left: 30, right: 100 }`, RTL flipped) so end categories stay off the plot edge.

**customized-dot-line-chart:** same chrome as simple-line; Desktop `dot`/`activeDot` are smile/frown faces (`--chart-3` / `--chart-2`) by `HAPPY_THRESHOLD` (200 sessions); Mobile keeps round dots.

**synchronized-line-chart:** three `syncId` panels — Desktop line, Mobile line + `Brush`, Total area (`--chart-3`); shared metric scrubber; brush window offsets tooltip index.

**synchronized-different-data:** two `syncId` panels (daily × every-5-days) with custom `syncMethod` (`closestDate`, ±2 days); metric scrubber tracks the dense daily series.

**line-chart-custom-shape:** same chrome as simple-line; both series use custom Line `shape` (`OpacityFadeShape` via `Curve`) for entrance opacity fade (500ms; 0 when reduced-motion).

**line-chart-has-multi-series:** type-required multi `Line`s each with partial category `data` (overlapping windows); third series uses `--chart-3` (semantic amber); HTML legend; metric = sum of series present at active month.

**line-chart-negative-values-with-reference-lines:** numeric X/Y path through the origin; zero `ReferenceLine`s when `minX`/`minY` are negative; metric scrubber tracks Y at the active point.

**compare-two-lines:** type-required hover compare — portfolio (navy) vs reinvestment dashed (orange) + principal (muted); gradient scrub after cursor; delta `ReferenceLine` segment; custom compare tooltip.

**dynamic-z-index-line-chart:** Desktop×Mobile×Orders (`--chart-3` amber); HTML legend hover dims that series to 0.45 and raises `zIndex` (paint order last); metric = sum of three; scrub default on.

**tiny-line-chart:** sparkline stage (no axes / tooltip / legend) with locked metric header scrubber; navy single series; `isAnimationActive={false}`.

**animated-time-series:** dual Desktop×Mobile lines; circular sliding window (default 6 of 12); auto-advance ~800ms; pauses while scrubbing or `prefers-reduced-motion`.

**line-interactive:** Store/Online toggle tabs show period totals; chart plots the active series only as a monotone line (`dot={false}` idle); dense daily X ticks (`minTickGap`); fullWidth preview — same interaction model as `bar-interactive`.

**line-step:** same chrome as simple-line; both series use `type="step"` (flat segments between categories).

**line-default (classic):** single Store series with `type="natural"`; short id (no `chart-` prefix, same as `bar-default`); locked metric scrubber.

**line-dots-colors (classic):** natural sales line; each region dot uses `--chart-1…5` fills (same EN regions as bar-mixed); short id.

**line-label-custom (classic):** natural sales line; always-on region tip labels via `LabelList` (`isAnimationActive={false}`); short id.

**line-bar-area-composed-chart:** `ComposedChart` Area(orders)+Bar(online)+Line(store); chart-1…3; locked metric scrubber; EN months.

**same-data-composed-chart:** Bar + Line both on `sales`; trend stroke chart-2; locked metric scrubber.

**vertical-composed-chart:** `layout="vertical"` Bar(sales)+Line(target) by EN region; reserved tip gutter; locked scrubber.

**composed-chart-with-axis-labels:** dual Y (money + margin %); Area/Bar/Line; axis labels type-required; chart-1…3.

**scatter-and-line-of-best-fit:** Scatter(sales) + dashed OLS `fit` Line; continuous spend X; scrub nearest point.

**banded-chart:** Area `band` [low, high] + Line `actual`; scrub metric + in/above/below band.

**target-price-chart:** Area `range` + Line `price` + dashed `target`; scrub price vs target.

**Stock (category):** candle/OHLC bodies use semantic `--chart-up` / `--chart-down` when bullish/bearish — not navy×orange dual series for every bar. Preserve custom SVG shapes (`CandlestickShape`, `OhlcBar`, …) from `_lib` when ported. Overlays (SMA, bands) may use `--chart-1` / `--chart-2`.

**asset-returns:** horizontal `layout="vertical"` return % bars; lookback tabs + max/min stats; custom tip-rounded shape with on-fill USD labels; `XAxis.reversed` in RTL (negative width — never clamp to 0); navy / orange lowest highlight; metric scrubber.

**monthly-savings:** channel tabs (Gold/USD/fund/bank/cash) + compound balance; type-required rounded-top `VerticalBar`; year-end / profit stats; metric scrubber across months.

**candlestick:** `CandlestickShape` wick+body via `stock-shared`; `candleRangeKey` range Bar; `--chart-up`/`--chart-down`; metric scrubber on close.

**candlestick-dashboard:** type-required symbol card (ticker + session badge + last) + candles + volume strip tinted by candle direction; scrub syncs header/volume.

**candlestick-bar:** dual `syncId` panels — OHLC candles + signed change bars; type-required `Brush`; scrub maps through brush window.

**candlestick-category:** category X (`label` date+time); type-required dashed orange `ReferenceLine` news marker; scrub highlights when on news.

**candlestick-line:** `ComposedChart` candles + monotone SMA (`--chart-2`); `sma()` from stock-shared; scrub shows close vs SMA.

**sparklines:** type-required KPI area cards + watchlist (trend line / volume bars / share); no neon; scrub across cards and rows.

**stock-ohlc:** classic `OhlcBar` (H–L stem, open← / →close ticks) via stock-shared; intraday `generateMockMarketData`; `--chart-up`/`--chart-down`; metric scrubber.

**stock-line:** type-required symbol card + monotone close Area with soft gradient fill (`--chart-1`); no neon; metric scrubber.

**stock-column:** close columns with per-bar `Cell` via `candleColor`; intraday mock data; `--chart-up`/`--chart-down`; metric scrubber.

**stock-with-volume:** dual `syncId` panels — OHLC candles + volume bars tinted by candle direction; metric scrubber.

**stock-multi-series:** type-required summary cards + indexed % LineChart (AENE/FOLD/AUTO); chart-1…3; no neon; scrub updates cards + avg return.

**stock-trendline:** type-required symbol card + close Line + dashed SMA (`--chart-2`); `sma()` from stock-shared; no neon; metric scrubber (close vs SMA).

**kpi-area-charts:** **KPI Area Charts**. KPI minis + hero dual area + stacked/share; navy×orange×amber; no neon; scrub KPI/month.

**realtime-mountain-chart:** live sliding-window area; type-required play/pause + `PulsingLiveDot` (respects `prefers-reduced-motion`); no neon; metric scrubber.

**realtime-candlestick:** live forming candles + synced volume; sticky Y domain; play/pause; `CandlestickShape`; no neon/exchange branding; metric scrubber.

**heikin-ashi:** `toHeikinAshi` + `CandlestickShape`; type-required symbol card; tight category gap; metric scrubber.

**renko-chart:** `toRenko` + `RenkoBrickShape`; brick-index X (not calendar time); up/down brick counts in card; metric scrubber.

**volume-profile:** horizontal `layout="vertical"` volume-by-price; POC cell highlight (`--chart-up`); idle scrub on POC; `XAxis.reversed` in RTL (tip radius stays `[0,4,4,0]`); metric scrubber.

**order-book-depth:** dual `stepAfter` Areas (bid `--chart-up` / ask `--chart-down`); mid join; no neon; idle scrub on mid; metric scrubber.

**drawdown-chart:** dual `syncId` panels — equity `Line` (`--chart-1`) + underwater drawdown `Area` (`--chart-down`); `runningDrawdown` in stock-shared; summary cards; no neon; metric scrubber.

**bollinger-bands:** close `Line` (`--chart-1`) + dashed SMA mid (`--chart-3`) + ±σ envelope (`--chart-2` stacked Areas); `stdev` in stock-shared; phased series; no neon; metric scrubber.

**candlestick-indicators:** triple `syncId` panels — OHLC candles + RSI(14) + MACD(12,26,9) hist/lines; `ema`/`rsi`/`macd` in stock-shared; no neon; metric scrubber.

**multi-timeframe:** stacked Daily (`--chart-1`) / Weekly (`--chart-3`) / Monthly (`--chart-2`) close lines; weekly×5 / monthly×20 rollup from daily; per-panel scrub; no neon.

**heatmap-calendar:** SVG calendar grid (not Recharts); Sunday-start weeks; `--chart-1` intensity levels; holiday stroke; floating tip + keyboard scrub; EN/Gregorian; RTL flips week growth via `useChartDir`. Shared: `heatmap-shared`.

**heatmap-calendar-emerald:** same calendar grid; soft green `--chart-up` intensity; commits unit; no holiday strokes.

**heatmap-matrix:** day × hour (7×24) SVG grid; `--chart-1`; floating tip; EN weekdays; RTL flips columns via `useChartDir`.

**heatmap-matrix-values:** same matrix with `showValues` in-cell counts (when cell width allows); `--chart-up` green.

**bundle-size-treemap:** flat Recharts `Treemap` of client JS (KB) by package group; custom leaf tiles + on-fill labels; `--chart-1…5` per group; locked metric scrub (idle = total); EN package names; plot `dir="ltr"`.

**simple-treemap:** classic flat module-size treemap (Flare-inspired LOC, two levels); custom leaf tiles; `--chart-1…5` per group; locked metric scrub; EN names; plot `dir="ltr"`.

**custom-content-treemap:** teaching `content` renderer — group (depth 1) fill + rank + centered label; leaves are transparent stroke subdivisions; `--chart-1…5`; locked metric scrub; plot `dir="ltr"`.

**nested-treemap:** `type="nest"` drill-down with breadcrumb (styled over Recharts nest index); keeps `data → render` hierarchy; click group to zoom; `--chart-1…5`; locked metric scrub; plot `dir="ltr"`.

**treemap-with-padding-and-gaps:** same two-level Flare data as Simple; teaching diff is `nodeInset={10}` + `nodeGap={6}`; muted group plates so gutters read; `--chart-1…5`; locked metric scrub; plot `dir="ltr"`.

**treemap-content:** teaching `content={<Cell />}` (cloneElement path) vs function content; centered leaf name + size; `--chart-1…5`; locked metric scrub; plot `dir="ltr"`.

**bundle-size-sunburst:** Recharts `SunburstChart` of tree-shaken client JS (bytes) by group; nested ring shades via `color-mix` on `--chart-1…5` (tracks light/dark cssVars); center disc inherits page `dir`; `SunburstTooltipContent` with `dir` + fill swatch; locked metric scrub (idle = total); white on-fill name labels; EN names; plot `dir="ltr"`. Shared: `sunburst-shared`.

**sunburst-chart:** classic regional sales share (%) — region → channel → site (3 levels); same chrome / theme-aware shades / center / tooltip as Bundle Size; EN names; plot `dir="ltr"`. Shared: `sunburst-shared`.

**sunburst-chart-theme-colors:** org headcount by team (Engineering / Sales / Marketing / Support); same `--chart-1…5` `colorizeTree` + tooltip/center RTL pattern; EN names; plot `dir="ltr"`. Shared: `sunburst-shared`.

**Radar (category):** header / legend inherit page `dir`; plot island `dir="ltr"` (polar SVG). `PolarAngleAxis.reversed` in RTL. Dual series navy×orange via `cssVars` (`--chart-1` for single-series). `ChartTooltip` + `ChartTooltipContent` (page `dir`). Metric scrub across angle categories; keyboard reverses in RTL. Quiet dashed `PolarGrid`. QA: LTR×RTL × light×dark before `ported`.

**simple-radar-chart:** single Score polygon across six subjects; locked metric scrub (idle = last subject); active vertex dots while scrubbing; English / `Intl`; featured gallery starter.

**specified-domain-radar-chart:** dual Alex×Sara polygons; `PolarRadiusAxis` `domain={[0,150]}` + `angle={30}` + `outerRadius="80%"`; metric = subject sum; English / `Intl`; featured.

**range-radar-chart-custom-animation:** ceiling (`high`) polygon; data keeps `low`/`high` for span in metric + tip; custom entrance `animationDuration={1600}` (0 / paused when reduced-motion or scrubbing); English / `Intl`.

**radar-lines-only:** dual Store×Online stroke-only (`fillOpacity={0}`) + `PolarGrid radialLines={false}`; metric = month sum; English / `Intl`.

**radar-icons:** dual Store×Online filled polygons; `chartConfig` Lucide icons (`ArrowDownFromLine` / `ArrowUpFromLine`) via `ChartLegendContent`; tip `indicator="line"`; English / `Intl`; featured.

**radar-multiple:** dual overlapping Store×Online filled polygons (no icons); metric = month sum; English / `Intl`; featured gallery.

**chart-radar-default (classic):** single Store filled polygon + default `ChartTooltipContent`; metric scrub; English / `Intl`; featured classic starter.

**chart-radar-dots (classic):** same as default + `dot={{ r: 4, fillOpacity: 1 }}`; English / `Intl`; featured.

**chart-radar-lines-only (classic):** twin of gallery `radar-lines-only` — dual stroke-only + `radialLines={false}`; English / `Intl`.

**chart-radar-label-custom (classic):** dual Store×Online; custom `PolarAngleAxis` tick renders `store/online` + month; English / `Intl`.

**chart-radar-grid-custom (classic):** single Store; `PolarGrid` with `radialLines={false}` + `polarRadius={[90]}`; tip `hideLabel`; English / `Intl`.

**chart-radar-grid-none (classic):** single Store; no `PolarGrid`; vertex `dot`; tip `hideLabel`; English / `Intl`.

**chart-radar-grid-circle (classic):** single Store; `PolarGrid gridType="circle"`; vertex `dot`; tip `hideLabel`; English / `Intl`.

**chart-radar-grid-circle-no-lines (classic):** single Store; `gridType="circle"` + `radialLines={false}`; vertex `dot`; tip `hideLabel`; English / `Intl`.

**chart-radar-grid-circle-fill (classic):** single Store; circular `PolarGrid` with `fill-(--color-store) opacity-20`; English / `Intl`.

**chart-radar-grid-fill (classic):** single Store; default polygon `PolarGrid` with `fill-(--color-store) opacity-20`; tip `hideLabel`; English / `Intl`.

**chart-radar-multiple (classic):** twin of gallery `radar-multiple` — dual Store×Online filled polygons; tip `indicator="line"`; English / `Intl`.

**chart-radar-legend (classic):** dual Store×Online + `ChartLegend` / `ChartLegendContent`; tip `indicator="line"`; English / `Intl`.

**chart-radar-icons (classic):** twin of gallery `radar-icons` — Lucide icons in `chartConfig` + `ChartLegendContent`; English / `Intl`.

**chart-radar-radius (classic):** dual Store×Online; `PolarRadiusAxis` (no `PolarAngleAxis`); tip `labelKey="month"` + `labelFormatter` → month value (not config label); radius `angle` 60 LTR / 120 RTL; English / `Intl`.

**Radial bar (category):** header / legend inherit page `dir`; plot island `dir="ltr"` (polar SVG). Tokens `--chart-1…5` via registry `cssVars` (light/dark — no hex in demos except on-arc `#ffffff`). Track = muted mix / `fill-muted`. `ChartTooltip` + `ChartTooltipContent` (page `dir` via `useDirection`). Keyboard scrub / focus reverses in RTL. QA: LTR×RTL × light×dark before `ported`.

**simple-radial-bar-chart:** concentric age-band rings (`RadialBar` + `background`); locked metric scrub (idle = total share); English / `Intl`; featured gallery starter.

**radial-bar-chart-click-to-focus-legend:** five concentric rings (unique `--chart-1…5`); click ring or legend chip to focus (opacity 1 vs 0.2), click again to clear; metric tracks focus; `cursor-pointer`; English / `Intl`.

**radial-text:** single progress `RadialBar` (~250° sweep) + center `Label` (value + caption); track muted mix; `--chart-1`; `ChartTooltip`; English / `Intl`.

**radial-shape:** thick square-ended arc (`cornerRadius={0}`) over thin `PolarGrid` track; decorative ~100° sweep; center Label; `ChartTooltip`; teaching contrast vs `radial-text`.

**radial-stacked:** half-ring Desktop×Mobile `stackId`; `PolarAngleAxis` domain = total; center Label total; navy×orange; tooltip + legend chips; English / `Intl`.

**Scatter (category):** header / legend inherit page `dir`; plot island `dir="ltr"`; `XAxis.reversed` + `YAxis` orientation flip in RTL. Dual series navy×orange via `cssVars`. `ChartTooltip` + `ChartTooltipContent` (page `dir`). Scatter tooltip payload includes x+y (+z) — formatters render once (`index === 0`) from the row; `ChartTooltipContent` skips null formatter returns. Metric scrub across flattened points (sorted by X); keyboard reverses in RTL. QA: LTR×RTL × light×dark before `ported`.

**simple-scatter-chart:** dual `Scatter` (Group A / B) on continuous height×weight plane; custom circle `shape` for scrub dim/size; featured gallery starter; English / `Intl`.

**joint-line-scatter-chart:** same dual plane + `line` / `lineType="joint"` connecting points in data order; legend shows stroke+dot; English / `Intl`.

**bubble-chart:** dual `Scatter` + `ZAxis` (`z` → bubble radius); metric tracks score; soft fill + background stroke; legend notes size encoding; English / `Intl`.

**custom-animation:** single-series bubble scatter; Swap dataset + Crossfade / Staggered / Pop via `animationInterpolateFn` (Recharts ≥3.9); honors `prefers-reduced-motion`; English / `Intl`.

**scatter-chart-with-labels:** single-series + `ZAxis` + always-on `LabelList` (`name`); `isAnimationActive={false}`; scrub dims inactive labels/points; English / `Intl`.

**multiple-y-axes-scatter-chart:** dual `Scatter` with `yAxisId` primary/secondary + independent domains; axis ticks tinted to series; RTL swaps start/end sides; English / `Intl`.

**scatter-chart-with-cells:** per-point `--chart-1…5` + `Symbols` via `shape` (Cell deprecated); scrub dims inactive marks; English / `Intl`.

**scatter-chart-performance:** ~50 series × 12 points (seeded); `isAnimationActive={false}`; scrub focuses a whole series (not every mark); pass/fail via `--chart-up` / `--chart-down`; English / `Intl`.

**Responsive (category):** teach fluid `ChartContainer` stage (not raw Recharts `ResponsiveContainer`). Header inherits page `dir`; plot island `dir="ltr"`; `XAxis.reversed` + `YAxis` orientation flip in RTL. Locked navy×orange + `--chart-1…5` refs; metric scrub; English / `Intl`. QA: LTR×RTL × light×dark before `ported`.

**area-responsive-container:** single Store area + dashed ReferenceLines (`x=Mar` min month / `y=4000` target); fluid stage `max-h-[420px]`; legend chips for series + refs; plot `dir="ltr"`.

**composed-responsive-container:** `ComposedChart` Orders area × Online bars × Store line; fluid stage `max-h-[380px]`; `ChartLegend`; metric = category sum; navy×orange×amber; plot `dir="ltr"`.

**pie-responsive-container:** square fluid stage (`h-[300px]` / `max-w-[300px]`); labeled pie + `ChartLegend` wrap row; `--chart-1…4` regions; slice scrub (idle = total); `isAnimationActive={false}` for stable labels; plot `dir="ltr"`.

**Legend (category):** teach legend interaction / placement / custom chrome. Header inherits page `dir`; plot island `dir="ltr"`; `XAxis.reversed` + `YAxis` orientation flip in RTL. Locked navy×orange; metric scrub; English / `Intl`. QA: LTR×RTL × light×dark before `ported`.

**legend-effect-opacity:** dual Online×Store lines; `ChartLegend` `onMouseEnter` / `onMouseLeave` dims the other series (`strokeOpacity` 0.5); default Recharts legend icons (not `ChartLegendContent`) so payload hover works; `cursor-pointer` on legend items; plot `dir="ltr"`.

**legend-position:** same dual line + data; teaching diff is `ChartLegend` / `ChartLegendContent` with `verticalAlign="top"` and `className="pb-4"`; plot `dir="ltr"`.

**legend-styles:** dual Store×Online bars; custom card legend (`dir` from page) with hint + period total (`Intl`, number island `dir="ltr"`); accent bar on logical `end`; navy×orange; plot `dir="ltr"`.

**Tooltip (category):** teach custom / styled / advanced chart tooltips. Header inherits page `dir`; plot island `dir="ltr"`; `XAxis.reversed` + `YAxis` orientation flip in RTL. Locked navy×orange; metric scrub; English / `Intl`. Custom tip panels set `dir` from `useChartDir` (not only `ChartTooltipContent`). QA: LTR×RTL × light×dark before `ported`.

**custom-content-of-tooltip:** dual Online×Store bars; fully custom tip (month intro + series rows); `ChartLegend` / `ChartLegendContent`; soft bar cursor wash; plot `dir="ltr"`.

**tooltip-styles:** dual Online×Store bars; Recharts default tip chrome via `contentStyle` / `itemStyle` / `labelStyle` (navy border, orange label); `direction` from `useChartDir`; pinned `active` + `defaultIndex` for inspectability; plot `dir="ltr"`.

**tooltip-advanced:** stacked Delivery×Pickup bars; `ChartTooltipContent` custom `formatter` (swatch + kcal + Total row at `index === 1`); `hideLabel`; `cursor={false}`; `defaultIndex` pin; weekday axis via `Intl`; plot `dir="ltr"`.

**chart-tooltip-default (classic):** same stacked Delivery×Pickup sample; default `ChartTooltipContent` + long-date `labelFormatter` (`Intl` day/month/year); `cursor={false}`; `defaultIndex` pin; locked scrub; plot `dir="ltr"`.

**chart-tooltip-indicator-line (classic):** twin of default; teaching diff is `indicator="line"` on `ChartTooltipContent`; same sample / labelFormatter / scrub / plot `dir="ltr"`.

**chart-tooltip-indicator-none (classic):** twin of default; teaching diff is `hideIndicator` (no color swatch); same sample / labelFormatter / scrub / plot `dir="ltr"`.

**chart-tooltip-label-custom (classic):** same stacked sample; tip title from `labelKey="activities"` → `chartConfig.activities.label` ("Activities"); `indicator="line"`; no date labelFormatter; locked scrub; plot `dir="ltr"`.

**chart-tooltip-label-formatter (classic):** same stacked sample; teaching focus is long-date `labelFormatter` on default `ChartTooltipContent` (dot indicator); `cursor={false}`; `defaultIndex` pin; locked scrub; plot `dir="ltr"`.

**chart-tooltip-label-none (classic):** same stacked sample; `hideLabel` + `hideIndicator` (series rows only, no date header / swatches); locked scrub; plot `dir="ltr"`.

**chart-tooltip-formatter (classic):** same stacked sample; `hideLabel` + custom `formatter` (series label + value + `kcal`); no Total row (vs gallery `tooltip-advanced`); locked scrub; plot `dir="ltr"`.

**chart-tooltip-icons (classic):** same stacked sample; `chartConfig` series `icon` (`Footprints` / `Waves` from lucide); `hideLabel`; tip shows icons instead of color dots; npm `lucide-react`; locked scrub; plot `dir="ltr"`.

**chart-tooltip-advanced (classic):** twin of gallery `tooltip-advanced`; `hideLabel` + custom `formatter` (swatch + kcal + Total at `index === 1`); locked scrub; plot `dir="ltr"`.

**Gauge (category):** header chrome inherits page `dir` (logical layout); plot island always `dir="ltr"` (RGC wrapper or `ChartHighchartsGauge`). Needle/dial ink = `var(--foreground)` (`GAUGE_NEEDLE` / `HC_DIAL`). HC tooltips use `--popover` / `--popover-foreground` from `hc-gauge-shared`. Soft arc hex stays fixed (readable in both themes); tracks use `color-mix` on `--muted-foreground` / `--foreground`. RGC items declare `lodash` (undeclared dep of `react-gauge-chart` for `lodash/isEqual`). Not Simple Bar scrub.

**Gauge CLI = demo:** `sonojs add <id>` installs the same `registry/charts/gauge/<id>.tsx` shown on `/charts/view/<id>`, plus shared (`gauge-shared` or `hc-gauge-shared`) and `chart-styles` (`use-chart-dir`), with npm deps logged as `+` lines. Keep `cssVars` in `registry-items.mjs` in sync with hex in the demo (and shared libs). Rebuild with `npm run registry:build` after edits.

**RGC gauges:** `ChartGauge` is `memo`. Entrance: park at `0.001` with `animate={false}`, then animate to target (avoids library `prevPercent || percent` flash that drew the tip first). `ChartDemo` mounts the demo only after reveal (never under opacity-0 — that finished the sweep off-screen, then replayed). Splash dismiss is isolated. Pass **stable** `colors` / `arcsLength` refs. Use `animate={false}` to park the needle (gauge-no-animation).

**gauge-default:** vivid **emerald / amber / rose** via scoped `--gauge-band-*`; default needle (`GAUGE_NEEDLE`); fixed 250×420 stage; plot `dir="ltr"`.

**gauge-levels:** 20-band `gaugeTrafficRamp` at 86%; same chrome / traffic endpoints as `gauge-default`.

**gauge-custom-colors:** 30 bands rose→sand (`#d97986` / `#c4a574`), `arcWidth={0.3}`, needle 37%; same chrome.

**gauge-corner-radius:** 10 traffic bands, `arcPadding={0.1}` `cornerRadius={3}`, needle 60%; same chrome.

**gauge-custom-arcs:** uneven `arcsLength={[0.3,0.5,0.2]}` traffic colors, `arcPadding={0.02}`, needle 37%; same chrome.

**gauge-no-animation:** 15 traffic bands, `animate={false}`, needle 56%; same chrome.

**hc-gauge-default:** Highcharts `gauge` dial; soft traffic `plotBands`; value 68; English labels via `hc-gauge-shared`; client mount; plot `dir="ltr"`.

**hc-gauge-rounded-ends:** rounded pane (`borderRadius: 50%`) + dial tips; soft blue bands; value 72; same chrome.

**hc-gauge-thin-ring:** thin outer `plotBands` (90%/80%); violet/slate; dial `HC_DIAL`; value 45; same chrome.

**hc-gauge-semicircle:** pane −90°→90°; gold→terracotta→red; max 200; value 110 km/h; same chrome.

**hc-gauge-custom-pivot:** large hollow pivot + blunt dial; soft teal; pane −150°→150°; value 78; same chrome.

**hc-gauge-combo:** `solidgauge` + `gauge` dial on one value (74); teal/blue/violet stops; `borderRadius: 0`; same chrome.

**hc-gauge-fuel:** semicircle `solidgauge`; rose→gold→green stops; value 64%; same chrome.

**hc-gauge-activity:** 360° `solidgauge` ring; pink→rose gradient; value 79% Steps; same chrome.

**hc-gauge-kpi:** three nested solidgauge rings (Conversion 82 / Engagement 59 / Retention 71); `HC_COLOR_0…2`; height 320; same chrome.

**hc-gauge-rounded-bands:** dial with individually rounded plotBands; distinct **teal / amber / rose** light+dark (`#0D9488`/`#D97706`/`#E11D48` · `#2DD4BF`/`#FBBF24`/`#FB7185`); value 55; same chrome.

**hc-gauge-threshold:** solidgauge −4…4 with `threshold: 0`; red below / green above (`HC_TRAFFIC`); plotLine at 0; value −1.2; same chrome.

**hc-gauge-custom-dial:** solidgauge arc + circular SVG path dial (dot, no needle); `HC_COLOR_0`; value 75; pane −120…120; same chrome.

## Checklist

1. **Locate source**
   - Classic: `FarsiUI/apps/v4/registry/new-york-v4/charts/<id>.tsx`
   - Gallery: `FarsiUI/apps/v4/examples/chart/<category>/<slug>.tsx` (or synced `…/charts/gallery/<category>/`)
2. **Target path**
   - Authoring (classic + gallery) → `registry/charts/<category>/<slug>.tsx`
     (e.g. `bar/simple-bar-chart.tsx`, `area/chart-area-default.tsx`; optional `index.ts`)
   - Shared helpers → `registry/charts/_lib/`
   - Preview images → `public/charts/` (only with that demo)
   - **Consumer install (`target`):** `components/charts/<slug>.tsx` (flat);
     helpers → `components/charts/_lib/…` (never `components/ui/` for demos).
     Build rewrites `_lib` imports for the flat target.
   - Consumer imports: `@/components/ui/chart`, `@/lib/utils` — not `@sonojs/ui` or docs chrome
3. **Content**
   - Convert FA copy / digits / Jalali / toman labels to **English**
   - Match the **Locked visual pattern** above (start from `simple-bar-chart` chrome)
   - Default geometry **LTR**; still work under `ChartPreview` RTL toggle (layout chrome only — **do not** swap data to Persian when `dir=rtl`)
4. **Deps**
   - Register in `scripts/registry-items.mjs` (`registry:chart` or shared lib)
   - Complete `registryDependencies` + npm `dependencies` (recharts, highcharts, …)
   - Prefer `ChartContainer` from installable `chart` when the source uses it
5. **Catalog**
   - Set entry `status: "ported"` in `lib/charts-catalog.ts`
   - Honor `fullWidth` on the view page / `ChartPreview`
6. **Build**
   - `npm run registry:build`
   - Spot-check `/charts/view/<id>` LTR and RTL
   - Confirm `public/r/<id>.json` matches the authored source
