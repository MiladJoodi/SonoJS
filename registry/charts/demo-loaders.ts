import type { ComponentType } from "react"

/**
 * Ported gallery/classic demos for `/charts/view/[id]`.
 * Add an entry when a catalog id flips to `ported`.
 * Paths: gallery → `./<category>/<slug>`; classic → `./<id>`.
 */
export const chartDemoLoaders: Record<
  string,
  () => Promise<{ default: ComponentType } | Record<string, ComponentType> >
> = {
  "simple-bar-chart": () => import("./bar/simple-bar-chart"),
  "area-chart": () => import("./area/area-chart"),
  "stacked-area-chart": () => import("./area/stacked-area-chart"),
  "area-chart-range": () => import("./area/area-chart-range"),
  "area-chart-connect-nulls": () =>
    import("./area/area-chart-connect-nulls"),
  "cardinal-area-chart": () => import("./area/cardinal-area-chart"),
  "percent-area-chart": () => import("./area/percent-area-chart"),
  "synchronized-area-chart": () =>
    import("./area/synchronized-area-chart"),
  "tiny-area-chart": () => import("./area/tiny-area-chart"),
  "area-chart-fill-by-value": () =>
    import("./area/area-chart-fill-by-value"),
  "area-chart-custom-animation": () =>
    import("./area/area-chart-custom-animation"),
  "range-area-chart-custom-animation": () =>
    import("./area/range-area-chart-custom-animation"),
  "area-chart-with-custom-events": () =>
    import("./area/area-chart-with-custom-events"),
  "prevent-right-click": () => import("./area/prevent-right-click"),
  "area-interactive": () => import("./area/area-interactive"),
  "area-step": () => import("./area/area-step"),
  "area-gradient": () => import("./area/area-gradient"),
  "market-cards": () => import("./area/market-cards"),
  "chart-area-default": () => import("./area/chart-area-default"),
  "chart-area-linear": () => import("./area/chart-area-linear"),
  "chart-area-step": () => import("./area/chart-area-step"),
  "chart-area-legend": () => import("./area/chart-area-legend"),
  "chart-area-stacked": () => import("./area/chart-area-stacked"),
  "chart-area-stacked-expand": () => import("./area/chart-area-stacked-expand"),
  "chart-area-icons": () => import("./area/chart-area-icons"),
  "chart-area-axes": () => import("./area/chart-area-axes"),
  "two-level-pie-chart": () => import("./pie/two-level-pie-chart"),
  "straight-angle-pie-chart": () => import("./pie/straight-angle-pie-chart"),
  "custom-active-shape-pie-chart": () =>
    import("./pie/custom-active-shape-pie-chart"),
  "pie-chart-with-customized-label": () =>
    import("./pie/pie-chart-with-customized-label"),
  "pie-chart-with-padding-angle": () =>
    import("./pie/pie-chart-with-padding-angle"),
  "pie-chart-in-grid": () => import("./pie/pie-chart-in-grid"),
  "pie-with-gradient": () => import("./pie/pie-with-gradient"),
  "pie-donut-text": () => import("./pie/pie-donut-text"),
  "pie-interactive": () => import("./pie/pie-interactive"),
  "pie-stacked": () => import("./pie/pie-stacked"),
  "chart-pie-simple": () => import("./pie/chart-pie-simple"),
  "chart-radial-simple": () => import("./radial/chart-radial-simple"),
  "chart-radial-label": () => import("./radial/chart-radial-label"),
  "chart-radial-grid": () => import("./radial/chart-radial-grid"),
  "chart-radial-text": () => import("./radial/chart-radial-text"),
  "chart-radial-shape": () => import("./radial/chart-radial-shape"),
  "chart-radial-stacked": () => import("./radial/chart-radial-stacked"),
  "chart-pie-separator-none": () => import("./pie/chart-pie-separator-none"),
  "chart-pie-label": () => import("./pie/chart-pie-label"),
  "chart-pie-label-custom": () => import("./pie/chart-pie-label-custom"),
  "chart-pie-label-list": () => import("./pie/chart-pie-label-list"),
  "chart-pie-legend": () => import("./pie/chart-pie-legend"),
  "chart-pie-donut": () => import("./pie/chart-pie-donut"),
  "chart-pie-donut-active": () => import("./pie/chart-pie-donut-active"),
  "chart-pie-donut-text": () => import("./pie/chart-pie-donut-text"),
  "chart-pie-stacked": () => import("./pie/chart-pie-stacked"),
  "chart-pie-interactive": () => import("./pie/chart-pie-interactive"),
  "simple-line-chart": () => import("./line/simple-line-chart"),
  "dashed-line-chart": () => import("./line/dashed-line-chart"),
  "vertical-line-chart": () => import("./line/vertical-line-chart"),
  "line-chart-connect-nulls": () =>
    import("./line/line-chart-connect-nulls"),
  "line-chart-with-reference-lines": () =>
    import("./line/line-chart-with-reference-lines"),
  "customized-label-line-chart": () =>
    import("./line/customized-label-line-chart"),
  "highlight-and-zoom-line-chart": () =>
    import("./line/highlight-and-zoom-line-chart"),
  "line-chart-axis-interval": () =>
    import("./line/line-chart-axis-interval"),
  "biaxial-line-chart": () => import("./line/biaxial-line-chart"),
  "line-chart-with-x-axis-padding": () =>
    import("./line/line-chart-with-x-axis-padding"),
  "customized-dot-line-chart": () =>
    import("./line/customized-dot-line-chart"),
  "synchronized-line-chart": () =>
    import("./line/synchronized-line-chart"),
  "synchronized-different-data": () =>
    import("./line/synchronized-different-data"),
  "line-chart-custom-shape": () =>
    import("./line/line-chart-custom-shape"),
  "line-chart-has-multi-series": () =>
    import("./line/line-chart-has-multi-series"),
  "line-chart-negative-values-with-reference-lines": () =>
    import("./line/line-chart-negative-values-with-reference-lines"),
  "compare-two-lines": () => import("./line/compare-two-lines"),
  "dynamic-z-index-line-chart": () =>
    import("./line/dynamic-z-index-line-chart"),
  "tiny-line-chart": () => import("./line/tiny-line-chart"),
  "animated-time-series": () => import("./line/animated-time-series"),
  "line-interactive": () => import("./line/line-interactive"),
  "line-step": () => import("./line/line-step"),
  "line-default": () => import("./line/line-default"),
  "line-dots-colors": () => import("./line/line-dots-colors"),
  "line-label-custom": () => import("./line/line-label-custom"),
  "line-bar-area-composed-chart": () =>
    import("./composed/line-bar-area-composed-chart"),
  "same-data-composed-chart": () =>
    import("./composed/same-data-composed-chart"),
  "vertical-composed-chart": () =>
    import("./composed/vertical-composed-chart"),
  "composed-chart-with-axis-labels": () =>
    import("./composed/composed-chart-with-axis-labels"),
  "scatter-and-line-of-best-fit": () =>
    import("./composed/scatter-and-line-of-best-fit"),
  "banded-chart": () => import("./composed/banded-chart"),
  "target-price-chart": () => import("./composed/target-price-chart"),
  "asset-returns": () => import("./stock/asset-returns"),
  "monthly-savings": () => import("./stock/monthly-savings"),
  "candlestick": () => import("./stock/candlestick"),
  "candlestick-dashboard": () => import("./stock/candlestick-dashboard"),
  "candlestick-bar": () => import("./stock/candlestick-bar"),
  "candlestick-category": () => import("./stock/candlestick-category"),
  "candlestick-line": () => import("./stock/candlestick-line"),
  "sparklines": () => import("./stock/sparklines"),
  "stock-ohlc": () => import("./stock/stock-ohlc"),
  "stock-line": () => import("./stock/stock-line"),
  "stock-column": () => import("./stock/stock-column"),
  "stock-with-volume": () => import("./stock/stock-with-volume"),
  "stock-multi-series": () => import("./stock/stock-multi-series"),
  "stock-trendline": () => import("./stock/stock-trendline"),
  "kpi-area-charts": () => import("./stock/kpi-area-charts"),
  "realtime-mountain-chart": () => import("./stock/realtime-mountain-chart"),
  "realtime-candlestick": () => import("./stock/realtime-candlestick"),
  "heikin-ashi": () => import("./stock/heikin-ashi"),
  "renko-chart": () => import("./stock/renko-chart"),
  "volume-profile": () => import("./stock/volume-profile"),
  "order-book-depth": () => import("./stock/order-book-depth"),
  "drawdown-chart": () => import("./stock/drawdown-chart"),
  "bollinger-bands": () => import("./stock/bollinger-bands"),
  "candlestick-indicators": () => import("./stock/candlestick-indicators"),
  "multi-timeframe": () => import("./stock/multi-timeframe"),
  "heatmap-calendar": () => import("./heatmap/heatmap-calendar"),
  "heatmap-calendar-emerald": () =>
    import("./heatmap/heatmap-calendar-emerald"),
  "gauge-default": () => import("./gauge/gauge-default"),
  "gauge-levels": () => import("./gauge/gauge-levels"),
  "gauge-custom-colors": () => import("./gauge/gauge-custom-colors"),
  "gauge-corner-radius": () => import("./gauge/gauge-corner-radius"),
  "gauge-custom-arcs": () => import("./gauge/gauge-custom-arcs"),
  "gauge-no-animation": () => import("./gauge/gauge-no-animation"),
  "hc-gauge-default": () => import("./gauge/hc-gauge-default"),
  "hc-gauge-rounded-ends": () => import("./gauge/hc-gauge-rounded-ends"),
  "hc-gauge-thin-ring": () => import("./gauge/hc-gauge-thin-ring"),
  "hc-gauge-semicircle": () => import("./gauge/hc-gauge-semicircle"),
  "hc-gauge-custom-pivot": () => import("./gauge/hc-gauge-custom-pivot"),
  "hc-gauge-combo": () => import("./gauge/hc-gauge-combo"),
  "hc-gauge-fuel": () => import("./gauge/hc-gauge-fuel"),
  "hc-gauge-activity": () => import("./gauge/hc-gauge-activity"),
  "hc-gauge-kpi": () => import("./gauge/hc-gauge-kpi"),
  "hc-gauge-rounded-bands": () => import("./gauge/hc-gauge-rounded-bands"),
  "hc-gauge-threshold": () => import("./gauge/hc-gauge-threshold"),
  "hc-gauge-custom-dial": () => import("./gauge/hc-gauge-custom-dial"),
  "heatmap-matrix": () => import("./heatmap/heatmap-matrix"),
  "heatmap-matrix-values": () => import("./heatmap/heatmap-matrix-values"),
  "bundle-size-treemap": () => import("./treemap/bundle-size-treemap"),
  "simple-treemap": () => import("./treemap/simple-treemap"),
  "custom-content-treemap": () => import("./treemap/custom-content-treemap"),
  "nested-treemap": () => import("./treemap/nested-treemap"),
  "treemap-with-padding-and-gaps": () =>
    import("./treemap/treemap-with-padding-and-gaps"),
  "treemap-content": () => import("./treemap/treemap-content"),
  "bundle-size-sunburst": () => import("./sunburst/bundle-size-sunburst"),
  "sunburst-chart": () => import("./sunburst/sunburst-chart"),
  "sunburst-chart-theme-colors": () =>
    import("./sunburst/sunburst-chart-theme-colors"),
  "stacked-bar-chart": () => import("./bar/stacked-bar-chart"),
  "population-pyramid": () => import("./bar/population-pyramid"),
  "box-plot": () => import("./bar/box-plot"),
  waterfall: () => import("./bar/waterfall"),
  "mix-bar-chart": () => import("./bar/mix-bar-chart"),
  "positive-and-negative-bar-chart": () =>
    import("./bar/positive-and-negative-bar-chart"),
  "bar-chart-with-customized-event": () =>
    import("./bar/bar-chart-with-customized-event"),
  "bar-chart-has-background": () =>
    import("./bar/bar-chart-has-background"),
  "ranged-stacked-bar-chart": () =>
    import("./bar/ranged-stacked-bar-chart"),
  "tiny-bar-chart": () => import("./bar/tiny-bar-chart"),
  "bar-active": () => import("./bar/bar-active"),
  "timeline-chart": () => import("./bar/timeline"),
  "animated-bar-width": () => import("./bar/animated-bar-width"),
  "animated-bar-time-series": () => import("./bar/animated-bar-time-series"),
  "custom-shape-bar-chart": () => import("./bar/custom-shape-bar-chart"),
  "brush-bar-chart": () => import("./bar/brush-bar-chart"),
  "biaxial-bar-chart": () => import("./bar/biaxial-bar-chart"),
  "bar-chart-with-label-background": () =>
    import("./bar/bar-chart-with-label-background"),
  "bar-chart-range": () => import("./bar/bar-chart-range"),
  "stacked-bar-chart-with-horizontal-line": () =>
    import("./bar/stacked-bar-chart-with-horizontal-line"),
  "bar-default": () => import("./bar/bar-default"),
  "bar-multiple": () => import("./bar/bar-multiple"),
  "bar-stacked": () => import("./bar/bar-stacked"),
  "bar-label": () => import("./bar/bar-label"),
  "bar-label-custom": () => import("./bar/bar-label-custom"),
  "bar-mixed": () => import("./bar/bar-mixed"),
  "bar-interactive": () => import("./bar/bar-interactive"),
  "bar-horizontal": () => import("./bar/bar-horizontal"),
  "bar-negative": () => import("./bar/bar-negative"),
  "simple-radial-bar-chart": () =>
    import("./radial-bar/simple-radial-bar-chart"),
  "radial-bar-chart-click-to-focus-legend": () =>
    import("./radial-bar/radial-bar-chart-click-to-focus-legend"),
  "radial-text": () => import("./radial-bar/radial-text"),
  "radial-shape": () => import("./radial-bar/radial-shape"),
  "radial-stacked": () => import("./radial-bar/radial-stacked"),
  "simple-scatter-chart": () => import("./scatter/simple-scatter-chart"),
  "joint-line-scatter-chart": () =>
    import("./scatter/joint-line-scatter-chart"),
  "bubble-chart": () => import("./scatter/bubble-chart"),
  "custom-animation": () => import("./scatter/custom-animation"),
  "scatter-chart-with-labels": () =>
    import("./scatter/scatter-chart-with-labels"),
  "multiple-y-axes-scatter-chart": () =>
    import("./scatter/multiple-y-axes-scatter-chart"),
  "scatter-chart-with-cells": () =>
    import("./scatter/scatter-chart-with-cells"),
  "scatter-chart-performance": () =>
    import("./scatter/scatter-chart-performance"),
  "area-responsive-container": () =>
    import("./responsive/area-responsive-container"),
  "composed-responsive-container": () =>
    import("./responsive/composed-responsive-container"),
  "pie-responsive-container": () =>
    import("./responsive/pie-responsive-container"),
  "legend-effect-opacity": () => import("./legend/legend-effect-opacity"),
  "custom-content-of-tooltip": () =>
    import("./tooltip/custom-content-of-tooltip"),
  "tooltip-styles": () => import("./tooltip/tooltip-styles"),
  "tooltip-advanced": () => import("./tooltip/tooltip-advanced"),
  "chart-tooltip-default": () => import("./tooltip/chart-tooltip-default"),
  "chart-tooltip-indicator-line": () =>
    import("./tooltip/chart-tooltip-indicator-line"),
  "chart-tooltip-indicator-none": () =>
    import("./tooltip/chart-tooltip-indicator-none"),
  "chart-tooltip-label-custom": () =>
    import("./tooltip/chart-tooltip-label-custom"),
  "chart-tooltip-label-formatter": () =>
    import("./tooltip/chart-tooltip-label-formatter"),
  "chart-tooltip-label-none": () => import("./tooltip/chart-tooltip-label-none"),
  "chart-tooltip-formatter": () => import("./tooltip/chart-tooltip-formatter"),
  "chart-tooltip-icons": () => import("./tooltip/chart-tooltip-icons"),
  "chart-tooltip-advanced": () =>
    import("./tooltip/chart-tooltip-advanced"),
  "legend-position": () => import("./legend/legend-position"),
  "legend-styles": () => import("./legend/legend-styles"),
  "simple-radar-chart": () => import("./radar/simple-radar-chart"),
  "specified-domain-radar-chart": () =>
    import("./radar/specified-domain-radar-chart"),
  "range-radar-chart-custom-animation": () =>
    import("./radar/range-radar-chart-custom-animation"),
  "radar-lines-only": () => import("./radar/radar-lines-only"),
  "radar-icons": () => import("./radar/radar-icons"),
  "radar-multiple": () => import("./radar/radar-multiple"),
  "chart-radar-default": () => import("./radar/chart-radar-default"),
  "chart-radar-dots": () => import("./radar/chart-radar-dots"),
  "chart-radar-lines-only": () => import("./radar/chart-radar-lines-only"),
  "chart-radar-label-custom": () => import("./radar/chart-radar-label-custom"),
  "chart-radar-grid-custom": () => import("./radar/chart-radar-grid-custom"),
  "chart-radar-grid-none": () => import("./radar/chart-radar-grid-none"),
  "chart-radar-grid-circle": () => import("./radar/chart-radar-grid-circle"),
  "chart-radar-grid-circle-no-lines": () =>
    import("./radar/chart-radar-grid-circle-no-lines"),
  "chart-radar-grid-circle-fill": () =>
    import("./radar/chart-radar-grid-circle-fill"),
  "chart-radar-grid-fill": () => import("./radar/chart-radar-grid-fill"),
  "chart-radar-multiple": () => import("./radar/chart-radar-multiple"),
  "chart-radar-legend": () => import("./radar/chart-radar-legend"),
  "chart-radar-icons": () => import("./radar/chart-radar-icons"),
  "chart-radar-radius": () => import("./radar/chart-radar-radius"),
}

export function getChartDemoLoader(id: string) {
  return chartDemoLoaders[id]
}
