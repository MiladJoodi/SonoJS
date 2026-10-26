"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import appImage from "./images/app.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

function GooglePlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="me-2 inline size-9 shrink-0"
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <path fill="#57cef3" d="M7 3v58l33-29z" />
      <path fill="#fff200" d="m36 32 8-10 15 10-15 10z" />
      <path fill="#48ff48" d="M36 32 7 3h4l34 20z" />
      <path fill="#ff6c58" d="M36 32 7 61h4l34-20z" />
      <path
        fill="#f33"
        d="M9.1 64c-1.9 0-3.6-1-4.5-2.6L8 58.2v.7c0 .3.1.6.3.8L24 44c7.4 0 14.1-1.2 18.3-3.1l5.8-3.4v4.6L11.7 63.3c-.7.5-1.6.7-2.6.7z"
      />
      <path
        fill="#0779e4"
        d="M9.1 4C8.5 4 8 4.5 8 5.1V36c0 4.4 7.2 8 16 8L5.5 62.5c-.9-.9-1.5-2.2-1.5-3.6V5.1C4 2.3 6.3 0 9.1 0z"
      />
      <path
        fill="#314a52"
        d="M8.3 4.3c.2-.2.5-.3.8-.3.2 0 .4.1.6.2l45.5 26.6c.5.2.8.7.8 1.2s-.3 1-.7 1.3l-11.4 6.6 2.9 2.9 10.4-6.1c1.7-1 2.7-2.8 2.7-4.7s-1-3.8-2.7-4.7L11.7.7C11 .2 10.1 0 9.1 0 7.7 0 6.4.6 5.5 1.5z"
      />
    </svg>
  )
}

function AppleStoreIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="me-2 inline size-9 shrink-0"
      viewBox="0 0 22.773 22.773"
      aria-hidden="true"
    >
      <path
        fill="#ffffff"
        d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
      />
    </svg>
  )
}

function AppArt() {
  const [missing, setMissing] = React.useState(false)

  if (missing) {
    return (
      <div className="flex aspect-[5/4] w-full items-center justify-center rounded-[16px] bg-black/5">
        <p className="text-sm text-muted-foreground">Add app.webp here</p>
      </div>
    )
  }

  return (
    <img
      src={assetSrc(appImage)}
      alt="Mobile app preview"
      className="cta-06-art w-full object-contain"
      loading="lazy"
      onError={() => setMissing(true)}
    />
  )
}

export default function Cta({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "mt-10 w-full overflow-visible px-4 pb-8 lg:mt-24 md:px-8",
        className
      )}
      aria-labelledby="cta-heading"
      {...props}
    >
      <style>{`
        .cta-06-band {
          background-color: #e0f7ff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
        }
        .dark .cta-06-band {
          background-color: #0e4a5c;
          border-color: #155e75;
        }
        .cta-06-band .cta-06-title {
          color: #0f172a;
          font-weight: 700;
        }
        .dark .cta-06-band .cta-06-title {
          color: #f8fafc;
        }
        .cta-06-band .cta-06-desc {
          color: #475569;
        }
        .dark .cta-06-band .cta-06-desc {
          color: #cbd5e1;
        }
        .cta-06-band .cta-06-store {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          background-color: #000000 !important;
          color: #ffffff !important;
          font-size: 1.25rem;
          letter-spacing: 0.05em;
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }
        .cta-06-band .cta-06-store:hover {
          background-color: #111111 !important;
        }
        .cta-06-band .cta-06-store:focus-visible {
          outline: 2px solid #2563eb;
          outline-offset: 2px;
        }
        .cta-06-band .cta-06-store-eyebrow {
          margin: 0;
          font-size: 10px;
          font-weight: 500;
          line-height: 1;
          color: #ffffff !important;
          text-align: start;
        }
        .cta-06-band .cta-06-store-label {
          color: #ffffff !important;
          font-weight: 600;
          line-height: 1.2;
        }
        @media (min-width: 1024px) {
          .cta-06-art-wrap {
            min-height: 320px;
            height: 100%;
          }
          .cta-06-art {
            position: absolute;
            inset-inline-end: -1.5rem;
            top: -90px;
            width: 100%;
            height: 125%;
            max-width: none;
            object-fit: contain;
            object-position: bottom right;
          }
          [dir="rtl"] .cta-06-art {
            object-position: bottom left;
          }
        }
      `}</style>

      {/* Same content width as cta-04 */}
      <div className="mx-auto max-w-6xl overflow-visible">
        <div className="cta-06-band relative w-full overflow-visible px-4 sm:px-6 md:px-16">
          <div className="relative grid lg:grid-cols-5">
            <div className="relative z-10 w-full py-10 text-center sm:py-12 lg:col-span-2 lg:py-14 lg:text-start">
              <h2
                id="cta-heading"
                className="cta-06-title mb-6 text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl"
              >
                Exclusive App Discount – Save 50%!
              </h2>
              <p className="cta-06-desc text-base leading-relaxed lg:text-lg">
                Download our mobile app and enjoy an exclusive 50% discount on
                your first purchase.
              </p>

              <div className="mt-8 flex flex-row flex-wrap items-center gap-4 max-lg:justify-center lg:flex-nowrap">
                <a href="#" className="cta-06-store">
                  <GooglePlayIcon />
                  <span>
                    <p className="cta-06-store-eyebrow">Get it on</p>
                    <span className="cta-06-store-label">Google Play</span>
                  </span>
                </a>
                <a href="#" className="cta-06-store">
                  <AppleStoreIcon />
                  <span>
                    <p className="cta-06-store-eyebrow">Download on the</p>
                    <span className="cta-06-store-label">App Store</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="cta-06-art-wrap relative z-0 max-lg:-order-1 max-lg:pt-4 lg:col-span-3">
              <AppArt />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
