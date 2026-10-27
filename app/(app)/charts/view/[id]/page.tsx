import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  ChartDemo,
  ChartPreview,
  ChartViewBackButton,
  ChartViewPager,
  chartGalleryHref,
} from "@/components/charts"
import {
  ComponentSource,
  DocsApiProps,
  DocsInstallation,
} from "@/components/docs"
import { chartUsageSnippets } from "@/lib/chart-demo-export-name"
import { getChartAdjacent, getChartEntry } from "@/lib/charts-catalog"
import { readChartDemoSource } from "@/lib/read-chart-demo-source"
import { chartViewMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const entry = getChartEntry(id)
  if (!entry) {
    return { title: "Chart" }
  }
  return chartViewMetadata(id, entry.title, entry.status === "ported")
}

export default async function ChartViewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const entry = getChartEntry(id)
  if (!entry) notFound()

  const source =
    entry.status === "ported" ? await readChartDemoSource(id) : null
  const usage = source ? chartUsageSnippets(id, source) : null
  const hasGalleryBarProps =
    id === "simple-bar-chart" ||
    id === "area-chart" ||
    id === "stacked-area-chart" ||
    id === "area-chart-range" ||
    id === "area-chart-connect-nulls" ||
    id === "cardinal-area-chart" ||
    id === "percent-area-chart" ||
    id === "synchronized-area-chart" ||
    id === "tiny-area-chart" ||
    id === "area-chart-fill-by-value" ||
    id === "area-chart-custom-animation" ||
    id === "range-area-chart-custom-animation" ||
    id === "area-chart-with-custom-events" ||
    id === "prevent-right-click" ||
    id === "area-interactive" ||
    id === "area-step" ||
    id === "area-gradient" ||
    id === "market-cards" ||
    id === "chart-area-default" ||
    id === "chart-area-linear" ||
    id === "chart-area-step" ||
    id === "chart-area-legend" ||
    id === "chart-area-stacked" ||
    id === "chart-area-stacked-expand" ||
    id === "chart-area-icons" ||
    id === "chart-area-gradient" ||
    id === "chart-area-axes" ||
    id === "two-level-pie-chart" ||
    id === "straight-angle-pie-chart" ||
    id === "custom-active-shape-pie-chart" ||
    id === "pie-chart-with-customized-label" ||
    id === "pie-chart-with-padding-angle" ||
    id === "pie-with-gradient" ||
    id === "pie-donut-text" ||
    id === "pie-interactive" ||
    id === "pie-stacked" ||
    id === "chart-pie-simple" ||
    id === "chart-pie-separator-none" ||
    id === "chart-pie-label" ||
    id === "chart-pie-label-custom" ||
    id === "chart-pie-label-list" ||
    id === "chart-pie-legend" ||
    id === "chart-pie-donut" ||
    id === "chart-pie-donut-active" ||
    id === "chart-pie-donut-text" ||
    id === "chart-pie-stacked" ||
    id === "chart-pie-interactive" ||
    id === "simple-line-chart" ||
    id === "dashed-line-chart" ||
    id === "vertical-line-chart" ||
    id === "line-chart-connect-nulls" ||
    id === "line-chart-with-reference-lines" ||
    id === "customized-label-line-chart" ||
    id === "highlight-and-zoom-line-chart" ||
    id === "line-chart-axis-interval" ||
    id === "biaxial-line-chart" ||
    id === "line-chart-with-x-axis-padding" ||
    id === "customized-dot-line-chart" ||
    id === "synchronized-line-chart" ||
    id === "synchronized-different-data" ||
    id === "line-chart-custom-shape" ||
    id === "line-chart-has-multi-series" ||
    id === "line-chart-negative-values-with-reference-lines" ||
    id === "compare-two-lines" ||
    id === "dynamic-z-index-line-chart" ||
    id === "tiny-line-chart" ||
    id === "animated-time-series" ||
    id === "line-interactive" ||
    id === "line-step" ||
    id === "line-default" ||
    id === "line-dots-colors" ||
    id === "line-label-custom" ||
    id === "line-bar-area-composed-chart" ||
    id === "same-data-composed-chart" ||
    id === "vertical-composed-chart" ||
    id === "composed-chart-with-axis-labels" ||
    id === "scatter-and-line-of-best-fit" ||
    id === "banded-chart" ||
    id === "target-price-chart" ||
    id === "asset-returns" ||
    id === "monthly-savings" ||
    id === "candlestick" ||
    id === "candlestick-dashboard" ||
    id === "candlestick-bar" ||
    id === "candlestick-category" ||
    id === "candlestick-line" ||
    id === "sparklines" ||
    id === "stock-ohlc" ||
    id === "stock-line" ||
    id === "stock-column" ||
    id === "stock-with-volume" ||
    id === "stock-multi-series" ||
    id === "stock-trendline" ||
    id === "kpi-area-charts" ||
    id === "realtime-mountain-chart" ||
    id === "realtime-candlestick" ||
    id === "heikin-ashi" ||
    id === "renko-chart" ||
    id === "volume-profile" ||
    id === "order-book-depth" ||
    id === "drawdown-chart" ||
    id === "bollinger-bands" ||
    id === "candlestick-indicators" ||
    id === "multi-timeframe" ||
    id === "heatmap-calendar" ||
    id === "heatmap-calendar-emerald" ||
    id === "heatmap-matrix" ||
    id === "heatmap-matrix-values" ||
    id === "gauge-default" ||
    id === "gauge-levels" ||
    id === "gauge-custom-colors" ||
    id === "gauge-corner-radius" ||
    id === "gauge-custom-arcs" ||
    id === "gauge-no-animation" ||
    id === "hc-gauge-default" ||
    id === "hc-gauge-rounded-ends" ||
    id === "hc-gauge-thin-ring" ||
    id === "hc-gauge-semicircle" ||
    id === "hc-gauge-custom-pivot" ||
    id === "hc-gauge-combo" ||
    id === "hc-gauge-fuel" ||
    id === "hc-gauge-activity" ||
    id === "hc-gauge-kpi" ||
    id === "hc-gauge-rounded-bands" ||
    id === "hc-gauge-threshold" ||
    id === "hc-gauge-custom-dial" ||
    id === "stacked-bar-chart" ||
    id === "population-pyramid" ||
    id === "box-plot" ||
    id === "waterfall" ||
    id === "mix-bar-chart" ||
    id === "positive-and-negative-bar-chart" ||
    id === "bar-chart-with-customized-event" ||
    id === "bar-chart-has-background" ||
    id === "ranged-stacked-bar-chart" ||
    id === "tiny-bar-chart" ||
    id === "bar-active" ||
    id === "bar-interactive" ||
    id === "bar-horizontal" ||
    id === "timeline" ||
    id === "animated-bar-width" ||
    id === "animated-bar-time-series" ||
    id === "custom-shape-bar-chart" ||
    id === "brush-bar-chart" ||
    id === "biaxial-bar-chart" ||
    id === "bar-chart-with-label-background" ||
    id === "bar-chart-range" ||
    id === "stacked-bar-chart-with-horizontal-line" ||
    id === "bar-default" ||
    id === "bar-multiple" ||
    id === "bar-stacked" ||
    id === "bar-label" ||
    id === "bar-label-custom" ||
    id === "bar-mixed" ||
    id === "bar-negative" ||
    id === "simple-radial-bar-chart" ||
    id === "simple-scatter-chart" ||
    id === "joint-line-scatter-chart" ||
    id === "bubble-chart" ||
    id === "custom-animation" ||
    id === "scatter-chart-with-labels" ||
    id === "multiple-y-axes-scatter-chart" ||
    id === "scatter-chart-with-cells" ||
    id === "scatter-chart-performance" ||
    id === "area-responsive-container" ||
    id === "composed-responsive-container" ||
    id === "pie-responsive-container" ||
    id === "legend-effect-opacity" ||
    id === "legend-position" ||
    id === "legend-styles" ||
    id === "custom-content-of-tooltip" ||
    id === "tooltip-styles" ||
    id === "tooltip-advanced" ||
    id === "chart-tooltip-default" ||
    id === "chart-tooltip-indicator-line" ||
    id === "chart-tooltip-indicator-none" ||
    id === "chart-tooltip-label-custom" ||
    id === "chart-tooltip-label-formatter" ||
    id === "chart-tooltip-label-none" ||
    id === "chart-tooltip-formatter" ||
    id === "chart-tooltip-icons" ||
    id === "chart-tooltip-advanced" ||
    id === "simple-radar-chart" ||
    id === "specified-domain-radar-chart" ||
    id === "range-radar-chart-custom-animation" ||
    id === "radar-lines-only" ||
    id === "radar-icons" ||
    id === "radar-multiple" ||
    id === "chart-radar-default" ||
    id === "chart-radar-dots" ||
    id === "chart-radar-lines-only" ||
    id === "chart-radar-label-custom" ||
    id === "chart-radar-grid-custom" ||
    id === "chart-radar-grid-none" ||
    id === "chart-radar-grid-circle" ||
    id === "chart-radar-grid-circle-no-lines" ||
    id === "chart-radar-grid-circle-fill" ||
    id === "chart-radar-grid-fill" ||
    id === "chart-radar-multiple" ||
    id === "chart-radar-legend" ||
    id === "chart-radar-icons" ||
    id === "chart-radar-radius"
  const chartImport =
    id === "area-chart"
      ? {
          name: "AreaChart",
          path: "@/components/charts/area-chart",
        }
      : id === "stacked-area-chart"
        ? {
            name: "StackedAreaChart",
            path: "@/components/charts/stacked-area-chart",
          }
        : id === "area-chart-range"
          ? {
              name: "AreaChartRange",
              path: "@/components/charts/area-chart-range",
            }
          : id === "area-chart-connect-nulls"
            ? {
                name: "AreaChartConnectNulls",
                path: "@/components/charts/area-chart-connect-nulls",
              }
            : id === "cardinal-area-chart"
              ? {
                  name: "CardinalAreaChart",
                  path: "@/components/charts/cardinal-area-chart",
                }
              : id === "percent-area-chart"
                ? {
                    name: "PercentAreaChart",
                    path: "@/components/charts/percent-area-chart",
                  }
                : id === "synchronized-area-chart"
                  ? {
                      name: "SynchronizedAreaChart",
                      path: "@/components/charts/synchronized-area-chart",
                    }
                  : id === "tiny-area-chart"
                    ? {
                        name: "TinyAreaChart",
                        path: "@/components/charts/tiny-area-chart",
                      }
                    : id === "area-chart-fill-by-value"
                      ? {
                          name: "AreaChartFillByValue",
                          path: "@/components/charts/area-chart-fill-by-value",
                        }
                      : id === "area-chart-custom-animation"
                        ? {
                            name: "AreaChartCustomAnimation",
                            path: "@/components/charts/area-chart-custom-animation",
                          }
                        : id === "range-area-chart-custom-animation"
                          ? {
                              name: "RangeAreaChartCustomAnimation",
                              path: "@/components/charts/range-area-chart-custom-animation",
                            }
                          : id === "area-chart-with-custom-events"
                            ? {
                                name: "AreaChartWithCustomEvents",
                                path: "@/components/charts/area-chart-with-custom-events",
                              }
                            : id === "prevent-right-click"
                              ? {
                                  name: "PreventRightClick",
                                  path: "@/components/charts/prevent-right-click",
                                }
                              : id === "area-interactive"
                                ? {
                                    name: "AreaInteractive",
                                    path: "@/components/charts/area-interactive",
                                  }
                                : id === "area-step"
                                  ? {
                                      name: "AreaStep",
                                      path: "@/components/charts/area-step",
                                    }
                                  : id === "area-gradient"
                                    ? {
                                        name: "AreaGradient",
                                        path: "@/components/charts/area-gradient",
                                      }
                                    : id === "market-cards"
                                      ? {
                                          name: "MarketCards",
                                          path: "@/components/charts/market-cards",
                                        }
                                      : id === "chart-area-default"
                                        ? {
                                            name: "ChartAreaDefault",
                                            path: "@/components/charts/chart-area-default",
                                          }
                                        : id === "chart-area-linear"
                                          ? {
                                              name: "ChartAreaLinear",
                                              path: "@/components/charts/chart-area-linear",
                                            }
                                          : id === "chart-area-step"
                                            ? {
                                                name: "ChartAreaStep",
                                                path: "@/components/charts/chart-area-step",
                                              }
                                            : id === "chart-area-legend"
                                              ? {
                                                  name: "ChartAreaLegend",
                                                  path: "@/components/charts/chart-area-legend",
                                                }
                                              : id === "chart-area-stacked"
                                                ? {
                                                    name: "ChartAreaStacked",
                                                    path: "@/components/charts/chart-area-stacked",
                                                  }
                                                : id === "chart-area-stacked-expand"
                                                  ? {
                                                      name: "ChartAreaStackedExpand",
                                                      path: "@/components/charts/chart-area-stacked-expand",
                                                    }
                                                  : id === "chart-area-icons"
                                                    ? {
                                                        name: "ChartAreaIcons",
                                                        path: "@/components/charts/chart-area-icons",
                                                      }
                                                    : id === "chart-area-gradient"
                                                      ? {
                                                          name: "ChartAreaGradient",
                                                          path: "@/components/charts/chart-area-gradient",
                                                        }
                                                      : id === "chart-area-axes"
                                                        ? {
                                                            name: "ChartAreaAxes",
                                                            path: "@/components/charts/chart-area-axes",
                                                          }
                                                        : id === "two-level-pie-chart"
                                                          ? {
                                                              name: "TwoLevelPieChart",
                                                              path: "@/components/charts/two-level-pie-chart",
                                                            }
                                                          : id === "straight-angle-pie-chart"
                                                            ? {
                                                                name: "StraightAnglePieChart",
                                                                path: "@/components/charts/straight-angle-pie-chart",
                                                              }
                                                            : id ===
                                                                "custom-active-shape-pie-chart"
                                                              ? {
                                                                  name: "CustomActiveShapePieChart",
                                                                  path: "@/components/charts/custom-active-shape-pie-chart",
                                                                }
                                                              : id ===
                                                                  "pie-chart-with-customized-label"
                                                                ? {
                                                                    name: "PieChartWithCustomizedLabel",
                                                                    path: "@/components/charts/pie-chart-with-customized-label",
                                                                  }
                                                                : id ===
                                                                    "pie-chart-with-padding-angle"
                                                                  ? {
                                                                      name: "PieChartWithPaddingAngle",
                                                                      path: "@/components/charts/pie-chart-with-padding-angle",
                                                                    }
                                                                  : id ===
                                                                      "pie-chart-in-grid"
                                                                    ? {
                                                                        name: "PieChartInGrid",
                                                                        path: "@/components/charts/pie-chart-in-grid",
                                                                      }
                                                                    : id ===
                                                                        "pie-with-gradient"
                                                                      ? {
                                                                          name: "PieWithGradient",
                                                                          path: "@/components/charts/pie-with-gradient",
                                                                        }
                                                                      : id ===
                                                                          "pie-donut-text"
                                                                        ? {
                                                                            name: "PieDonutText",
                                                                            path: "@/components/charts/pie-donut-text",
                                                                          }
                                                                        : id ===
                                                                            "pie-interactive"
                                                                          ? {
                                                                              name: "PieInteractive",
                                                                              path: "@/components/charts/pie-interactive",
                                                                            }
                                                                          : id ===
                                                                              "pie-stacked"
                                                                            ? {
                                                                                name: "PieStacked",
                                                                                path: "@/components/charts/pie-stacked",
                                                                              }
                                                                            : id ===
                                                                                "chart-pie-simple"
                                                                              ? {
                                                                                  name: "ChartPieSimple",
                                                                                  path: "@/components/charts/chart-pie-simple",
                                                                                }
                                                                              : id ===
                                                                                  "chart-pie-separator-none"
                                                                                ? {
                                                                                    name: "ChartPieSeparatorNone",
                                                                                    path: "@/components/charts/chart-pie-separator-none",
                                                                                  }
                                                                                : id ===
                                                                                    "chart-pie-label"
                                                                                  ? {
                                                                                      name: "ChartPieLabel",
                                                                                      path: "@/components/charts/chart-pie-label",
                                                                                    }
                                                                                  : id ===
                                                                                      "chart-pie-label-custom"
                                                                                    ? {
                                                                                        name: "ChartPieLabelCustom",
                                                                                        path: "@/components/charts/chart-pie-label-custom",
                                                                                      }
                                                                                    : id ===
                                                                                        "chart-pie-label-list"
                                                                                      ? {
                                                                                          name: "ChartPieLabelList",
                                                                                          path: "@/components/charts/chart-pie-label-list",
                                                                                        }
                                                                                      : id ===
                                                                                          "chart-pie-legend"
                                                                                        ? {
                                                                                            name: "ChartPieLegend",
                                                                                            path: "@/components/charts/chart-pie-legend",
                                                                                          }
                                                                                        : id ===
                                                                                            "chart-pie-donut"
                                                                                          ? {
                                                                                              name: "ChartPieDonut",
                                                                                              path: "@/components/charts/chart-pie-donut",
                                                                                            }
                                                                                          : id ===
                                                                                              "chart-pie-donut-active"
                                                                                            ? {
                                                                                                name: "ChartPieDonutActive",
                                                                                                path: "@/components/charts/chart-pie-donut-active",
                                                                                              }
                                                                                            : id ===
                                                                                                "chart-pie-donut-text"
                                                                                              ? {
                                                                                                  name: "ChartPieDonutText",
                                                                                                  path: "@/components/charts/chart-pie-donut-text",
                                                                                                }
                                                                                              : id ===
                                                                                                  "chart-pie-stacked"
                                                                                                ? {
                                                                                                    name: "ChartPieStacked",
                                                                                                    path: "@/components/charts/chart-pie-stacked",
                                                                                                  }
                                                                                                : id ===
                                                                                                    "chart-pie-interactive"
                                                                                                  ? {
                                                                                                      name: "ChartPieInteractive",
                                                                                                      path: "@/components/charts/chart-pie-interactive",
                                                                                                    }
      : id === "simple-line-chart"
      ? {
          name: "SimpleLineChart",
          path: "@/components/charts/simple-line-chart",
        }
      : id === "dashed-line-chart"
        ? {
            name: "DashedLineChart",
            path: "@/components/charts/dashed-line-chart",
          }
        : id === "vertical-line-chart"
          ? {
              name: "VerticalLineChart",
              path: "@/components/charts/vertical-line-chart",
            }
          : id === "line-chart-connect-nulls"
            ? {
                name: "LineChartConnectNulls",
                path: "@/components/charts/line-chart-connect-nulls",
              }
            : id === "line-chart-with-reference-lines"
              ? {
                  name: "LineChartWithReferenceLines",
                  path: "@/components/charts/line-chart-with-reference-lines",
                }
              : id === "customized-label-line-chart"
                ? {
                    name: "CustomizedLabelLineChart",
                    path: "@/components/charts/customized-label-line-chart",
                  }
                : id === "highlight-and-zoom-line-chart"
                  ? {
                      name: "HighlightAndZoomLineChart",
                      path: "@/components/charts/highlight-and-zoom-line-chart",
                    }
                  : id === "line-chart-axis-interval"
                    ? {
                        name: "LineChartAxisInterval",
                        path: "@/components/charts/line-chart-axis-interval",
                      }
                    : id === "biaxial-line-chart"
                      ? {
                          name: "BiaxialLineChart",
                          path: "@/components/charts/biaxial-line-chart",
                        }
          : id === "line-chart-with-x-axis-padding"
            ? {
                name: "LineChartWithXAxisPadding",
                path: "@/components/charts/line-chart-with-x-axis-padding",
              }
            : id === "customized-dot-line-chart"
              ? {
                  name: "CustomizedDotLineChart",
                  path: "@/components/charts/customized-dot-line-chart",
                }
              : id === "synchronized-line-chart"
                ? {
                    name: "SynchronizedLineChart",
                    path: "@/components/charts/synchronized-line-chart",
                  }
                : id === "synchronized-different-data"
                  ? {
                      name: "SynchronizedDifferentData",
                      path: "@/components/charts/synchronized-different-data",
                    }
                  : id === "line-chart-custom-shape"
                    ? {
                        name: "LineChartCustomShape",
                        path: "@/components/charts/line-chart-custom-shape",
                      }
                    : id === "line-chart-has-multi-series"
                      ? {
                          name: "LineChartHasMultiSeries",
                          path: "@/components/charts/line-chart-has-multi-series",
                        }
                      : id === "line-chart-negative-values-with-reference-lines"
                        ? {
                            name: "LineChartNegativeValuesWithReferenceLines",
                            path: "@/components/charts/line-chart-negative-values-with-reference-lines",
                          }
                        : id === "compare-two-lines"
                          ? {
                              name: "CompareTwoLines",
                              path: "@/components/charts/compare-two-lines",
                            }
                          : id === "dynamic-z-index-line-chart"
                            ? {
                                name: "DynamicZIndexLineChart",
                                path: "@/components/charts/dynamic-z-index-line-chart",
                              }
                            : id === "tiny-line-chart"
                            ? {
                                name: "TinyLineChart",
                                path: "@/components/charts/tiny-line-chart",
                              }
                            : id === "animated-time-series"
                              ? {
                                  name: "AnimatedTimeSeries",
                                  path: "@/components/charts/animated-time-series",
                                }
                              : id === "line-interactive"
                                ? {
                                    name: "LineInteractive",
                                    path: "@/components/charts/line-interactive",
                                  }
                              : id === "line-step"
                                ? {
                                    name: "LineStep",
                                    path: "@/components/charts/line-step",
                                  }
                                : id === "line-default"
                                  ? {
                                      name: "LineDefault",
                                      path: "@/components/charts/line-default",
                                    }
                                  : id === "line-dots-colors"
                                    ? {
                                        name: "LineDotsColors",
                                        path: "@/components/charts/line-dots-colors",
                                      }
                                        : id === "line-label-custom"
                                          ? {
                                              name: "LineLabelCustom",
                                              path: "@/components/charts/line-label-custom",
                                            }
                                          : id === "line-bar-area-composed-chart"
                                            ? {
                                                name: "LineBarAreaComposedChart",
                                                path: "@/components/charts/line-bar-area-composed-chart",
                                              }
                                            : id === "same-data-composed-chart"
                                              ? {
                                                  name: "SameDataComposedChart",
                                                  path: "@/components/charts/same-data-composed-chart",
                                                }
                                              : id === "vertical-composed-chart"
                                                ? {
                                                    name: "VerticalComposedChart",
                                                    path: "@/components/charts/vertical-composed-chart",
                                                  }
                                                : id === "composed-chart-with-axis-labels"
                                                  ? {
                                                      name: "ComposedChartWithAxisLabels",
                                                      path: "@/components/charts/composed-chart-with-axis-labels",
                                                    }
                                                  : id === "scatter-and-line-of-best-fit"
                                                    ? {
                                                        name: "ScatterAndLineOfBestFit",
                                                        path: "@/components/charts/scatter-and-line-of-best-fit",
                                                      }
                                                    : id === "banded-chart"
                                                      ? {
                                                          name: "BandedChart",
                                                          path: "@/components/charts/banded-chart",
                                                        }
                                                      : id === "target-price-chart"
                                                        ? {
                                                            name: "TargetPriceChart",
                                                            path: "@/components/charts/target-price-chart",
                                                          }
                                                        : id === "asset-returns"
                                                          ? {
                                                              name: "AssetReturns",
                                                              path: "@/components/charts/asset-returns",
                                                            }
                                                          : id === "monthly-savings"
                                                            ? {
                                                                name: "MonthlySavings",
                                                                path: "@/components/charts/monthly-savings",
                                                              }
                                                            : id === "candlestick"
                                                              ? {
                                                                  name: "Candlestick",
                                                                  path: "@/components/charts/candlestick",
                                                                }
                                                              : id === "candlestick-dashboard"
                                                                ? {
                                                                    name: "CandlestickDashboard",
                                                                    path: "@/components/charts/candlestick-dashboard",
                                                                  }
                                                                : id === "candlestick-bar"
                                                                  ? {
                                                                      name: "CandlestickBar",
                                                                      path: "@/components/charts/candlestick-bar",
                                                                    }
                                                                  : id === "candlestick-category"
                                                                    ? {
                                                                        name: "CandlestickCategory",
                                                                        path: "@/components/charts/candlestick-category",
                                                                      }
                                                                    : id === "candlestick-line"
                                                                      ? {
                                                                          name: "CandlestickLine",
                                                                          path: "@/components/charts/candlestick-line",
                                                                        }
                                                                      : id === "sparklines"
                                                                        ? {
                                                                            name: "Sparklines",
                                                                            path: "@/components/charts/sparklines",
                                                                          }
                                                                        : id === "stock-ohlc"
                                                                          ? {
                                                                              name: "StockOhlc",
                                                                              path: "@/components/charts/stock-ohlc",
                                                                            }
                                                                          : id === "stock-line"
                                                                            ? {
                                                                                name: "StockLine",
                                                                                path: "@/components/charts/stock-line",
                                                                              }
                                                                            : id === "stock-column"
                                                                              ? {
                                                                                  name: "StockColumn",
                                                                                  path: "@/components/charts/stock-column",
                                                                                }
                                                                              : id === "stock-with-volume"
                                                                                ? {
                                                                                    name: "StockWithVolume",
                                                                                    path: "@/components/charts/stock-with-volume",
                                                                                  }
                                                                                : id === "stock-multi-series"
                                                                                  ? {
                                                                                      name: "StockMultiSeries",
                                                                                      path: "@/components/charts/stock-multi-series",
                                                                                    }
                                                                                  : id === "stock-trendline"
                                                                                    ? {
                                                                                        name: "StockTrendline",
                                                                                        path: "@/components/charts/stock-trendline",
                                                                                      }
                                                                                    : id === "kpi-area-charts"
                                                                                      ? {
                                                                                          name: "KpiAreaCharts",
                                                                                          path: "@/components/charts/kpi-area-charts",
                                                                                        }
                                                                                      : id === "realtime-mountain-chart"
                                                                                        ? {
                                                                                            name: "RealtimeMountainChart",
                                                                                            path: "@/components/charts/realtime-mountain-chart",
                                                                                          }
                                                                                        : id === "realtime-candlestick"
                                                                                          ? {
                                                                                              name: "RealtimeCandlestick",
                                                                                              path: "@/components/charts/realtime-candlestick",
                                                                                            }
                                                                                          : id === "heikin-ashi"
                                                                                            ? {
                                                                                                name: "HeikinAshi",
                                                                                                path: "@/components/charts/heikin-ashi",
                                                                                              }
                                                                                            : id === "renko-chart"
                                                                                              ? {
                                                                                                  name: "RenkoChart",
                                                                                                  path: "@/components/charts/renko-chart",
                                                                                                }
                                                                                              : id === "volume-profile"
                                                                                                ? {
                                                                                                    name: "VolumeProfile",
                                                                                                    path: "@/components/charts/volume-profile",
                                                                                                  }
                                                                                                : id === "order-book-depth"
                                                                                                  ? {
                                                                                                      name: "OrderBookDepth",
                                                                                                      path: "@/components/charts/order-book-depth",
                                                                                                    }
                                                                                                  : id === "drawdown-chart"
                                                                                                    ? {
                                                                                                        name: "DrawdownChart",
                                                                                                        path: "@/components/charts/drawdown-chart",
                                                                                                      }
                                                                                                    : id === "bollinger-bands"
                                                                                                      ? {
                                                                                                          name: "BollingerBands",
                                                                                                          path: "@/components/charts/bollinger-bands",
                                                                                                        }
                                                                                                      : id === "candlestick-indicators"
                                                                                                        ? {
                                                                                                            name: "CandlestickIndicators",
                                                                                                            path: "@/components/charts/candlestick-indicators",
                                                                                                          }
                                                                                                        : id === "multi-timeframe"
                                                                                                          ? {
                                                                                                              name: "MultiTimeframe",
                                                                                                              path: "@/components/charts/multi-timeframe",
                                                                                                            }
                                                                                                          : id === "heatmap-calendar"
                                                                                                            ? {
                                                                                                                name: "HeatmapCalendar",
                                                                                                                path: "@/components/charts/heatmap-calendar",
                                                                                                              }
                                                                                                            : id === "heatmap-calendar-emerald"
                                                                                                              ? {
                                                                                                                  name: "HeatmapCalendarEmerald",
                                                                                                                  path: "@/components/charts/heatmap-calendar-emerald",
                                                                                                                }
                                                                                                              : id === "heatmap-matrix"
                                                                                                                ? {
                                                                                                                    name: "HeatmapMatrix",
                                                                                                                    path: "@/components/charts/heatmap-matrix",
                                                                                                                  }
                                                                                                                : id === "heatmap-matrix-values"
                                                                                                                  ? {
                                                                                                                      name: "HeatmapMatrixValues",
                                                                                                                      path: "@/components/charts/heatmap-matrix-values",
                                                                                                                    }
                                                                                                                  : id === "gauge-default"
                                                                                                                    ? {
                                                                                                                        name: "GaugeDefault",
                                                                                                                        path: "@/components/charts/gauge-default",
                                                                                                                      }
                                                                                                                    : id === "gauge-levels"
                                                                                                                      ? {
                                                                                                                          name: "GaugeLevels",
                                                                                                                          path: "@/components/charts/gauge-levels",
                                                                                                                        }
                                                                                                                      : id ===
                                                                                                                          "gauge-custom-colors"
                                                                                                                        ? {
                                                                                                                            name: "GaugeCustomColors",
                                                                                                                            path: "@/components/charts/gauge-custom-colors",
                                                                                                                          }
                                                                                                                        : id ===
                                                                                                                            "gauge-corner-radius"
                                                                                                                          ? {
                                                                                                                              name: "GaugeCornerRadius",
                                                                                                                              path: "@/components/charts/gauge-corner-radius",
                                                                                                                            }
                                                                                                                          : id ===
                                                                                                                              "gauge-custom-arcs"
                                                                                                                            ? {
                                                                                                                                name: "GaugeCustomArcs",
                                                                                                                                path: "@/components/charts/gauge-custom-arcs",
                                                                                                                              }
                                                                                                                            : id ===
                                                                                                                                "gauge-no-animation"
                                                                                                                              ? {
                                                                                                                                  name: "GaugeNoAnimation",
                                                                                                                                  path: "@/components/charts/gauge-no-animation",
                                                                                                                                }
                                                                                                                              : id ===
                                                                                                                                  "hc-gauge-default"
                                                                                                                                ? {
                                                                                                                                    name: "HcGaugeDefault",
                                                                                                                                    path: "@/components/charts/hc-gauge-default",
                                                                                                                                  }
                                                                                                                                : id ===
                                                                                                                                    "hc-gauge-rounded-ends"
                                                                                                                                  ? {
                                                                                                                                      name: "HcGaugeRoundedEnds",
                                                                                                                                      path: "@/components/charts/hc-gauge-rounded-ends",
                                                                                                                                    }
                                                                                                                                  : id ===
                                                                                                                                      "hc-gauge-thin-ring"
                                                                                                                                    ? {
                                                                                                                                        name: "HcGaugeThinRing",
                                                                                                                                        path: "@/components/charts/hc-gauge-thin-ring",
                                                                                                                                      }
                                                                                                                                    : id ===
                                                                                                                                        "hc-gauge-semicircle"
                                                                                                                                      ? {
                                                                                                                                          name: "HcGaugeSemicircle",
                                                                                                                                          path: "@/components/charts/hc-gauge-semicircle",
                                                                                                                                        }
                                                                                                                                      : id ===
                                                                                                                                          "hc-gauge-custom-pivot"
                                                                                                                                        ? {
                                                                                                                                            name: "HcGaugeCustomPivot",
                                                                                                                                            path: "@/components/charts/hc-gauge-custom-pivot",
                                                                                                                                          }
                                                                                                                                        : id ===
                                                                                                                                            "hc-gauge-combo"
                                                                                                                                          ? {
                                                                                                                                              name: "HcGaugeCombo",
                                                                                                                                              path: "@/components/charts/hc-gauge-combo",
                                                                                                                                            }
                                                                                                                                          : id ===
                                                                                                                                              "hc-gauge-fuel"
                                                                                                                                            ? {
                                                                                                                                                name: "HcGaugeFuel",
                                                                                                                                                path: "@/components/charts/hc-gauge-fuel",
                                                                                                                                              }
                                                                                                                                            : id ===
                                                                                                                                                "hc-gauge-activity"
                                                                                                                                              ? {
                                                                                                                                                  name: "HcGaugeActivity",
                                                                                                                                                  path: "@/components/charts/hc-gauge-activity",
                                                                                                                                                }
                                                                                                                                              : id ===
                                                                                                                                                  "hc-gauge-kpi"
                                                                                                                                                ? {
                                                                                                                                                    name: "HcGaugeKpi",
                                                                                                                                                    path: "@/components/charts/hc-gauge-kpi",
                                                                                                                                                  }
                                                                                                                                                : id ===
                                                                                                                                                    "hc-gauge-rounded-bands"
                                                                                                                                                  ? {
                                                                                                                                                      name: "HcGaugeRoundedBands",
                                                                                                                                                      path: "@/components/charts/hc-gauge-rounded-bands",
                                                                                                                                                    }
                                                                                                                                                  : id ===
                                                                                                                                                      "hc-gauge-threshold"
                                                                                                                                                    ? {
                                                                                                                                                        name: "HcGaugeThreshold",
                                                                                                                                                        path: "@/components/charts/hc-gauge-threshold",
                                                                                                                                                      }
                                                                                                                                                    : id ===
                                                                                                                                                        "hc-gauge-custom-dial"
                                                                                                                                                      ? {
                                                                                                                                                          name: "HcGaugeCustomDial",
                                                                                                                                                          path: "@/components/charts/hc-gauge-custom-dial",
                                                                                                                                                        }
      : id === "stacked-bar-chart"
      ? {
          name: "StackedBarChart",
          path: "@/components/charts/stacked-bar-chart",
        }
      : id === "population-pyramid"
        ? {
            name: "PopulationPyramid",
            path: "@/components/charts/population-pyramid",
          }
        : id === "box-plot"
          ? {
              name: "BoxPlot",
              path: "@/components/charts/box-plot",
            }
          : id === "waterfall"
            ? {
                name: "WaterfallChart",
                path: "@/components/charts/waterfall",
              }
            : id === "mix-bar-chart"
              ? {
                  name: "MixBarChart",
                  path: "@/components/charts/mix-bar-chart",
                }
              : id === "positive-and-negative-bar-chart"
                ? {
                    name: "PositiveNegativeBarChart",
                    path: "@/components/charts/positive-and-negative-bar-chart",
                  }
                : id === "bar-chart-with-customized-event"
                  ? {
                      name: "BarChartWithCustomizedEvent",
                      path: "@/components/charts/bar-chart-with-customized-event",
                    }
                  : id === "bar-chart-has-background"
                    ? {
                        name: "BarChartHasBackground",
                        path: "@/components/charts/bar-chart-has-background",
                      }
                    : id === "ranged-stacked-bar-chart"
                      ? {
                          name: "RangedStackedBarChart",
                          path: "@/components/charts/ranged-stacked-bar-chart",
                        }
                      : id === "tiny-bar-chart"
                        ? {
                            name: "TinyBarChart",
                            path: "@/components/charts/tiny-bar-chart",
                          }
                          : id === "bar-active"
                            ? {
                                name: "BarActive",
                                path: "@/components/charts/bar-active",
                              }
                            : id === "bar-interactive"
                              ? {
                                  name: "BarInteractive",
                                  path: "@/components/charts/bar-interactive",
                                }
                              : id === "bar-horizontal"
                                ? {
                                    name: "BarHorizontal",
                                    path: "@/components/charts/bar-horizontal",
                                  }
                        : id === "timeline"
                          ? {
                              name: "TimelineChart",
                              path: "@/components/charts/timeline",
                            }
                        : id === "animated-bar-width"
                          ? {
                              name: "AnimatedBarWidthChart",
                              path: "@/components/charts/animated-bar-width",
                            }
                          : id === "animated-bar-time-series"
                            ? {
                                name: "AnimatedBarTimeSeriesChart",
                                path: "@/components/charts/animated-bar-time-series",
                              }
                            : id === "custom-shape-bar-chart"
                              ? {
                                  name: "CustomShapeBarChart",
                                  path: "@/components/charts/custom-shape-bar-chart",
                                }
                              : id === "brush-bar-chart"
                                ? {
                                    name: "BrushBarChart",
                                    path: "@/components/charts/brush-bar-chart",
                                  }
                                : id === "biaxial-bar-chart"
                                  ? {
                                      name: "BiaxialBarChart",
                                      path: "@/components/charts/biaxial-bar-chart",
                                    }
                                  : id === "bar-chart-with-label-background"
                                    ? {
                                        name: "BarChartWithLabelBackground",
                                        path: "@/components/charts/bar-chart-with-label-background",
                                      }
                                    : id === "bar-chart-range"
                                      ? {
                                          name: "BarChartRange",
                                          path: "@/components/charts/bar-chart-range",
                                        }
                                      : id === "stacked-bar-chart-with-horizontal-line"
                                        ? {
                                            name: "StackedBarChartWithHorizontalLine",
                                            path: "@/components/charts/stacked-bar-chart-with-horizontal-line",
                                          }
                                          : id === "bar-default"
                                            ? {
                                                name: "BarDefault",
                                                path: "@/components/charts/bar-default",
                                              }
                                            : id === "bar-multiple"
                                              ? {
                                                  name: "BarMultiple",
                                                  path: "@/components/charts/bar-multiple",
                                                }
                                              : id === "bar-stacked"
                                                ? {
                                                    name: "BarStacked",
                                                    path: "@/components/charts/bar-stacked",
                                                  }
                                              : id === "bar-label"
                                                ? {
                                                    name: "BarLabel",
                                                    path: "@/components/charts/bar-label",
                                                  }
                                                : id === "bar-label-custom"
                                                  ? {
                                                      name: "BarLabelCustom",
                                                      path: "@/components/charts/bar-label-custom",
                                                    }
                                                : id === "bar-mixed"
                                                  ? {
                                                      name: "BarMixed",
                                                      path: "@/components/charts/bar-mixed",
                                                    }
                                                    : id === "bar-negative"
                                                      ? {
                                                          name: "BarNegative",
                                                          path: "@/components/charts/bar-negative",
                                                        }
                                                      : id ===
                                                          "simple-radial-bar-chart"
                                                        ? {
                                                            name: "SimpleRadialBarChart",
                                                            path: "@/components/charts/simple-radial-bar-chart",
                                                          }
                                                        : id ===
                                                            "simple-scatter-chart"
                                                          ? {
                                                              name: "SimpleScatterChart",
                                                              path: "@/components/charts/simple-scatter-chart",
                                                            }
                                                          : id ===
                                                              "joint-line-scatter-chart"
                                                            ? {
                                                                name: "JointLineScatterChart",
                                                                path: "@/components/charts/joint-line-scatter-chart",
                                                              }
                                                            : id ===
                                                                "bubble-chart"
                                                              ? {
                                                                  name: "BubbleChart",
                                                                  path: "@/components/charts/bubble-chart",
                                                                }
                                                              : id ===
                                                                  "custom-animation"
                                                                ? {
                                                                    name: "CustomAnimation",
                                                                    path: "@/components/charts/custom-animation",
                                                                  }
                                                                : id ===
                                                                    "scatter-chart-with-labels"
                                                                  ? {
                                                                      name: "ScatterChartWithLabels",
                                                                      path: "@/components/charts/scatter-chart-with-labels",
                                                                    }
                                                                  : id ===
                                                                      "multiple-y-axes-scatter-chart"
                                                                    ? {
                                                                        name: "MultipleYAxesScatterChart",
                                                                        path: "@/components/charts/multiple-y-axes-scatter-chart",
                                                                      }
                                                                    : id ===
                                                                        "scatter-chart-with-cells"
                                                                      ? {
                                                                          name: "ScatterChartWithCells",
                                                                          path: "@/components/charts/scatter-chart-with-cells",
                                                                        }
                                                                      : id ===
                                                                          "scatter-chart-performance"
                                                                        ? {
                                                                            name: "ScatterChartPerformance",
                                                                            path: "@/components/charts/scatter-chart-performance",
                                                                          }
                                                                        : id ===
                                                                            "area-responsive-container"
                                                                          ? {
                                                                              name: "AreaResponsiveContainer",
                                                                              path: "@/components/charts/area-responsive-container",
                                                                            }
                                                                          : id ===
                                                                              "composed-responsive-container"
                                                                            ? {
                                                                                name: "ComposedResponsiveContainer",
                                                                                path: "@/components/charts/composed-responsive-container",
                                                                              }
                                                                  : id ===
                                                                      "pie-responsive-container"
                                                                    ? {
                                                                        name: "PieResponsiveContainer",
                                                                        path: "@/components/charts/pie-responsive-container",
                                                                      }
                                                                    : id ===
                                                                        "legend-effect-opacity"
                                                                      ? {
                                                                          name: "LegendEffectOpacity",
                                                                          path: "@/components/charts/legend-effect-opacity",
                                                                        }
                                                                      : id ===
                                                                          "legend-position"
                                                                        ? {
                                                                            name: "LegendPosition",
                                                                            path: "@/components/charts/legend-position",
                                                                          }
                                                                        : id ===
                                                                            "legend-styles"
                                                                          ? {
                                                                              name: "LegendStyles",
                                                                              path: "@/components/charts/legend-styles",
                                                                            }
                                                                          : id ===
                                                                              "custom-content-of-tooltip"
                                                                            ? {
                                                                                name: "CustomContentOfTooltip",
                                                                                path: "@/components/charts/custom-content-of-tooltip",
                                                                              }
                                                                            : id ===
                                                                                "tooltip-styles"
                                                                              ? {
                                                                                  name: "TooltipStyles",
                                                                                  path: "@/components/charts/tooltip-styles",
                                                                                }
                                                                              : id ===
                                                                                  "tooltip-advanced"
                                                                                ? {
                                                                                    name: "TooltipAdvanced",
                                                                                    path: "@/components/charts/tooltip-advanced",
                                                                                  }
                                                                                : id ===
                                                                                    "chart-tooltip-default"
                                                                                  ? {
                                                                                      name: "ChartTooltipDefault",
                                                                                      path: "@/components/charts/chart-tooltip-default",
                                                                                    }
                                                                                  : id ===
                                                                                      "chart-tooltip-indicator-line"
                                                                                    ? {
                                                                                        name: "ChartTooltipIndicatorLine",
                                                                                        path: "@/components/charts/chart-tooltip-indicator-line",
                                                                                      }
                                                                                    : id ===
                                                                                        "chart-tooltip-indicator-none"
                                                                                      ? {
                                                                                          name: "ChartTooltipIndicatorNone",
                                                                                          path: "@/components/charts/chart-tooltip-indicator-none",
                                                                                        }
                                                                                      : id ===
                                                                                          "chart-tooltip-label-custom"
                                                                                        ? {
                                                                                            name: "ChartTooltipLabelCustom",
                                                                                            path: "@/components/charts/chart-tooltip-label-custom",
                                                                                          }
                                                                                        : id ===
                                                                                            "chart-tooltip-label-formatter"
                                                                                          ? {
                                                                                              name: "ChartTooltipLabelFormatter",
                                                                                              path: "@/components/charts/chart-tooltip-label-formatter",
                                                                                            }
                                                                                          : id ===
                                                                                              "chart-tooltip-label-none"
                                                                                            ? {
                                                                                                name: "ChartTooltipLabelNone",
                                                                                                path: "@/components/charts/chart-tooltip-label-none",
                                                                                              }
                                                                                            : id ===
                                                                                                "chart-tooltip-formatter"
                                                                                              ? {
                                                                                                  name: "ChartTooltipFormatter",
                                                                                                  path: "@/components/charts/chart-tooltip-formatter",
                                                                                                }
                                                                                              : id ===
                                                                                                  "chart-tooltip-icons"
                                                                                                ? {
                                                                                                    name: "ChartTooltipIcons",
                                                                                                    path: "@/components/charts/chart-tooltip-icons",
                                                                                                  }
                                                                                                : id ===
                                                                                                    "chart-tooltip-advanced"
                                                                                                  ? {
                                                                                                      name: "ChartTooltipAdvanced",
                                                                                                      path: "@/components/charts/chart-tooltip-advanced",
                                                                                                    }
                                                                                                  : id ===
                                                                                                      "simple-radar-chart"
                                                                                                    ? {
                                                                                                        name: "SimpleRadarChart",
                                                                                                        path: "@/components/charts/simple-radar-chart",
                                                                                                      }
                                                                                                    : id ===
                                                                                                        "specified-domain-radar-chart"
                                                                                                      ? {
                                                                                                          name: "SpecifiedDomainRadarChart",
                                                                                                          path: "@/components/charts/specified-domain-radar-chart",
                                                                                                        }
                                                                                                      : id ===
                                                                                                          "range-radar-chart-custom-animation"
                                                                                                        ? {
                                                                                                            name: "RangeRadarChartCustomAnimation",
                                                                                                            path: "@/components/charts/range-radar-chart-custom-animation",
                                                                                                          }
                                                                                                        : id ===
                                                                                                            "radar-lines-only"
                                                                                                          ? {
                                                                                                              name: "RadarLinesOnly",
                                                                                                              path: "@/components/charts/radar-lines-only",
                                                                                                            }
                                                                                                          : id ===
                                                                                                              "radar-icons"
                                                                                                            ? {
                                                                                                                name: "RadarIcons",
                                                                                                                path: "@/components/charts/radar-icons",
                                                                                                              }
                                                                                                            : id ===
                                                                                                                "radar-multiple"
                                                                                                              ? {
                                                                                                                  name: "RadarMultiple",
                                                                                                                  path: "@/components/charts/radar-multiple",
                                                                                                                }
                                                                                                              : id ===
                                                                                                                  "chart-radar-default"
                                                                                                                ? {
                                                                                                                    name: "ChartRadarDefault",
                                                                                                                    path: "@/components/charts/chart-radar-default",
                                                                                                                  }
                                                                                                                : id ===
                                                                                                                    "chart-radar-dots"
                                                                                                                  ? {
                                                                                                                      name: "ChartRadarDots",
                                                                                                                      path: "@/components/charts/chart-radar-dots",
                                                                                                                    }
                                                                                                                  : id ===
                                                                                                                      "chart-radar-lines-only"
                                                                                                                    ? {
                                                                                                                        name: "ChartRadarLinesOnly",
                                                                                                                        path: "@/components/charts/chart-radar-lines-only",
                                                                                                                      }
                                                                                                                    : id ===
                                                                                                                        "chart-radar-label-custom"
                                                                                                                      ? {
                                                                                                                          name: "ChartRadarLabelCustom",
                                                                                                                          path: "@/components/charts/chart-radar-label-custom",
                                                                                                                        }
                                                                                                                      : id ===
                                                                                                                          "chart-radar-grid-custom"
                                                                                                                        ? {
                                                                                                                            name: "ChartRadarGridCustom",
                                                                                                                            path: "@/components/charts/chart-radar-grid-custom",
                                                                                                                          }
                                                                                                                        : id ===
                                                                                                                            "chart-radar-grid-none"
                                                                                                                          ? {
                                                                                                                              name: "ChartRadarGridNone",
                                                                                                                              path: "@/components/charts/chart-radar-grid-none",
                                                                                                                            }
                                                                                                                          : id ===
                                                                                                                              "chart-radar-grid-circle"
                                                                                                                            ? {
                                                                                                                                name: "ChartRadarGridCircle",
                                                                                                                                path: "@/components/charts/chart-radar-grid-circle",
                                                                                                                              }
                                                                                                                            : id ===
                                                                                                                                "chart-radar-grid-circle-no-lines"
                                                                                                                              ? {
                                                                                                                                  name: "ChartRadarGridCircleNoLines",
                                                                                                                                  path: "@/components/charts/chart-radar-grid-circle-no-lines",
                                                                                                                                }
                                                                                                                              : id ===
                                                                                                                                  "chart-radar-grid-circle-fill"
                                                                                                                                ? {
                                                                                                                                    name: "ChartRadarGridCircleFill",
                                                                                                                                    path: "@/components/charts/chart-radar-grid-circle-fill",
                                                                                                                                  }
                                                                                                                                : id ===
                                                                                                                                    "chart-radar-grid-fill"
                                                                                                                                  ? {
                                                                                                                                      name: "ChartRadarGridFill",
                                                                                                                                      path: "@/components/charts/chart-radar-grid-fill",
                                                                                                                                    }
                                                                                                                                  : id ===
                                                                                                                                      "chart-radar-multiple"
                                                                                                                                    ? {
                                                                                                                                        name: "ChartRadarMultiple",
                                                                                                                                        path: "@/components/charts/chart-radar-multiple",
                                                                                                                                      }
                                                                                                                                    : id ===
                                                                                                                                        "chart-radar-legend"
                                                                                                                                      ? {
                                                                                                                                          name: "ChartRadarLegend",
                                                                                                                                          path: "@/components/charts/chart-radar-legend",
                                                                                                                                        }
                                                                                                                                      : id ===
                                                                                                                                          "chart-radar-icons"
                                                                                                                                        ? {
                                                                                                                                            name: "ChartRadarIcons",
                                                                                                                                            path: "@/components/charts/chart-radar-icons",
                                                                                                                                          }
                                                                                                                                        : id ===
                                                                                                                                            "chart-radar-radius"
                                                                                                                                          ? {
                                                                                                                                              name: "ChartRadarRadius",
                                                                                                                                              path: "@/components/charts/chart-radar-radius",
                                                                                                                                            }
                                                                                                                                          : {
                                                                                                                                              name: "SimpleBarChart",
                                                                                                                                              path: "@/components/charts/simple-bar-chart",
                                                                                                                                            }

  const adjacent = getChartAdjacent(id)

  return (
    <article className="w-full max-w-none space-y-8">
      <header className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <ChartViewBackButton href={chartGalleryHref(entry.category)} />
            <h1
              className="text-h1 min-w-0 flex-1 truncate"
              title={entry.title}
            >
              {entry.title}
            </h1>
          </div>
          <ChartViewPager
            previous={adjacent.previous}
            next={adjacent.next}
            className="mt-1.5"
          />
        </div>
      </header>

      <section>
        <ChartPreview fullWidth={entry.fullWidth}>
          {entry.status === "ported" ? (
            <ChartDemo id={entry.id} />
          ) : (
            <div className="flex min-h-48 flex-col items-center justify-center gap-2 text-center">
              <p className="text-sm font-medium text-foreground">Pending</p>
              <p className="max-w-md text-sm text-muted-foreground">
                Skeleton only — ask to port this id. Direction toggle is ready
                for when the English demo lands.
              </p>
            </div>
          )}
        </ChartPreview>
      </section>

      {entry.status === "ported" ? (
        <>
          <DocsInstallation name={entry.id} />

          {usage ? (
            <section className="space-y-3">
              <h2 className="text-h3">Usage</h2>
              <ComponentSource title="import" lang="tsx" code={usage.usageImport} />
              <ComponentSource title="page.tsx" lang="tsx" code={usage.usagePage} />
            </section>
          ) : null}

          {hasGalleryBarProps ? (
            <>
              <section className="space-y-4">
                <h2 className="text-h3">Scrub</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <code className="sono-inline-code">scrub</code> highlights the
                  active category and dims the rest (default{" "}
                  <code className="sono-inline-code">true</code>). Pass{" "}
                  <code className="sono-inline-code">false</code> to keep the
                  idle last-category view.
                </p>
                <ComponentSource
                  title="scrub"
                  lang="tsx"
                  code={`import { ${chartImport.name} } from "${chartImport.path}"

export default function Page() {
  return <${chartImport.name} scrub={false} />
}`}
                />
              </section>

              <section className="space-y-4">
                <h2 className="text-h3">Plot direction</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {id === "population-pyramid" ? (
                    <>
                      <code className="sono-inline-code">plotDir</code> swaps
                      Male/Female sides. Default{" "}
                      <code className="sono-inline-code">ltr</code> keeps Male
                      left and Female right (plot does not follow page{" "}
                      <code className="sono-inline-code">dir</code>). Header and
                      legend still inherit page direction.
                    </>
                  ) : (
                    <>
                      <code className="sono-inline-code">plotDir</code> only
                      flips the plot (bars / axes). Header and legend still
                      follow page <code className="sono-inline-code">dir</code>.
                      Omit it to match the page (default).
                    </>
                  )}
                </p>
                <ComponentSource
                  title="plotDir"
                  lang="tsx"
                  code={
                    id === "population-pyramid"
                      ? `import { ${chartImport.name} } from "${chartImport.path}"

export default function Page() {
  return (
    <div dir="rtl">
      {/* Chrome RTL · Male still left / Female right */}
      <${chartImport.name} />
      {/* Swap sides */}
      <${chartImport.name} plotDir="rtl" />
    </div>
  )
}`
                      : `import { ${chartImport.name} } from "${chartImport.path}"

export default function Page() {
  return (
    <div dir="rtl">
      {/* Chrome RTL · bars still start on the left */}
      <${chartImport.name} plotDir="ltr" />
    </div>
  )
}`
                  }
                />
              </section>

              <section className="space-y-3">
                <h2 className="text-h3">Props</h2>
                <DocsApiProps
                  rows={[
                    {
                      name: "scrub",
                      type: "boolean",
                      defaultValue: "true",
                      description:
                        "Hover, touch, and keyboard scrub — dim inactive categories and update the metric header.",
                    },
                    {
                      name: "plotDir",
                      type: '"ltr" | "rtl"',
                      defaultValue:
                        id === "population-pyramid" ? '"ltr"' : "page dir",
                      description:
                        id === "population-pyramid"
                          ? 'Male/Female sides. Default "ltr" (Male left). Pass "rtl" to swap. Header/legend follow page dir.'
                          : "Plot-only layout (bar sides / axes). Header and legend keep following page dir.",
                    },
                    ...(id === "bar-interactive" ||
                    id === "line-interactive" ||
                    id === "area-interactive"
                      ? [
                          {
                            name: "defaultSeries",
                            type: '"store" | "online"',
                            defaultValue: '"store"',
                            description:
                              "Which series is selected on first render. Users can still toggle Store / Online.",
                          },
                        ]
                      : []),
                    ...(id === "bar-active"
                      ? [
                          {
                            name: "activeBarIndex",
                            type: "number",
                            defaultValue: "2",
                            description:
                              "Category index that keeps the dashed featured outline. Idle metric resets here after scrub.",
                          },
                        ]
                      : []),
                  ]}
                />
              </section>
            </>
          ) : null}
        </>
      ) : null}
    </article>
  )
}
