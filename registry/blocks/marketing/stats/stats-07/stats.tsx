"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

type Accent = "blue" | "purple" | "green" | "cyan"

const metrics: {
  value: string
  label: string
  accent: Accent
  delay: string
}[] = [
  {
    value: "600 000 000",
    label: "PROTOCOL EXECUTIONS",
    accent: "blue",
    delay: "0s",
  },
  {
    value: "600 000 000",
    label: "NEURAL NETWORKS",
    accent: "purple",
    delay: "0.5s",
  },
  {
    value: "600 000 000",
    label: "DATA STREAMS",
    accent: "green",
    delay: "1s",
  },
  {
    value: "600 000 000",
    label: "QUANTUM BITS",
    accent: "cyan",
    delay: "1.5s",
  },
]

function ProtocolIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M25.6 22.9C25.7 23 25.8 23 26 23H33C33.6 23 34 22.6 34 22C34 21.8 34 21.7 33.9 21.6L30.4 14.6C30.1 14.1 29.5 13.9 29 14.2C28.9 14.3 28.7 14.4 28.6 14.6L25.1 21.6C24.9 22 25.1 22.6 25.6 22.9ZM29.5 17.2L31.4 21H27.6L29.5 17.2ZM18.5 14C16 14 14 16 14 18.5C14 21 16 23 18.5 23C21 23 23 21 23 18.5C23 16 21 14 18.5 14ZM18.5 21C17.1 21 16 19.9 16 18.5C16 17.1 17.1 16 18.5 16C19.9 16 21 17.1 21 18.5C21 19.9 19.9 21 18.5 21ZM22.7 25.3C22.3 24.9 21.7 24.9 21.3 25.3L18.5 28.1L15.7 25.3C15.3 24.9 14.7 24.9 14.3 25.3C13.9 25.7 13.9 26.3 14.3 26.7L17.1 29.5L14.3 32.3C13.9 32.7 13.9 33.3 14.3 33.7C14.7 34.1 15.3 34.1 15.7 33.7L18.5 30.9L21.3 33.7C21.7 34.1 22.3 34.1 22.7 33.7C23.1 33.3 23.1 32.7 22.7 32.3L19.9 29.5L22.7 26.7C23.1 26.3 23.1 25.7 22.7 25.3ZM33 25H26C25.4 25 25 25.4 25 26V33C25 33.6 25.4 34 26 34H33C33.6 34 34 33.6 34 33V26C34 25.4 33.6 25 33 25ZM32 32H27V27H32V32Z"
        fill="currentColor"
      />
      <circle cx="24" cy="24" r="23.5" stroke="currentColor" />
    </svg>
  )
}

export default function Stats({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-label="System metrics"
      {...props}
    >
      <style>{`
        @keyframes stats-07-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes stats-07-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        .stats-07-band {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          background-image: linear-gradient(
            to bottom right,
            #000000,
            #030712,
            #000000
          );
        }
        .stats-07-band .stats-07-scan {
          pointer-events: none;
          position: absolute;
          inset: 0;
          opacity: 0.06;
          background-image: repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent 2px,
            rgba(255, 255, 255, 0.05) 2px,
            rgba(255, 255, 255, 0.05) 3px
          );
        }
        .stats-07-band .stats-07-spark {
          position: absolute;
          border-radius: 9999px;
          animation: stats-07-pulse 2s ease-in-out infinite;
        }
        .stats-07-band .stats-07-card {
          position: relative;
          padding: 1.5rem;
          text-align: center;
          border-radius: 12px;
          border-width: 1px;
          border-style: solid;
          transition:
            transform 300ms ease,
            border-color 300ms ease;
          animation: stats-07-float 4s ease-in-out infinite;
        }
        .stats-07-band .stats-07-card:hover {
          transform: scale(1.02);
        }
        .stats-07-band .stats-07-card-wash {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          opacity: 0.04;
          transition: opacity 300ms ease;
          pointer-events: none;
        }
        .stats-07-band .stats-07-card:hover .stats-07-card-wash {
          opacity: 0.08;
        }
        .stats-07-band .stats-07-value {
          margin-bottom: 0.5rem;
          font-size: clamp(1.125rem, 5.2vw, 1.875rem);
          font-weight: 600;
          letter-spacing: 0.025em;
          font-variant-numeric: tabular-nums;
          unicode-bidi: isolate;
          direction: ltr;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
        .stats-07-band .stats-07-label {
          color: #9ca3af;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .stats-07-band .stats-07-icon {
          display: block;
          margin-inline: auto;
          margin-bottom: 1rem;
          width: 40px;
          height: 40px;
          animation: stats-07-pulse 2s ease-in-out infinite;
          transition: color 300ms ease;
        }
        .stats-07-band .stats-07-dot-a,
        .stats-07-band .stats-07-dot-b {
          position: absolute;
          border-radius: 9999px;
          animation: stats-07-pulse 2s ease-in-out infinite;
        }
        .stats-07-band .stats-07-dot-a {
          top: 1rem;
          inset-inline-end: 1rem;
          width: 0.5rem;
          height: 0.5rem;
        }
        .stats-07-band .stats-07-dot-b {
          bottom: 1rem;
          inset-inline-start: 1rem;
          width: 0.25rem;
          height: 0.25rem;
          animation-delay: 75ms;
        }
        .stats-07-band .stats-07-card--blue {
          border-color: rgba(96, 165, 250, 0.2);
        }
        .stats-07-band .stats-07-card--blue:hover {
          border-color: rgba(96, 165, 250, 0.45);
        }
        .stats-07-band .stats-07-card--blue .stats-07-card-wash {
          background-image: linear-gradient(
            to bottom right,
            #60a5fa,
            #a855f7,
            #4ade80
          );
        }
        .stats-07-band .stats-07-card--blue .stats-07-icon {
          color: #60a5fa;
        }
        .stats-07-band .stats-07-card--blue:hover .stats-07-icon {
          color: #a855f7;
        }
        .stats-07-band .stats-07-card--blue .stats-07-value {
          background-image: linear-gradient(
            to right,
            #60a5fa,
            #a855f7,
            #4ade80
          );
        }
        .stats-07-band .stats-07-card--blue .stats-07-dot-a {
          background-color: #60a5fa;
        }
        .stats-07-band .stats-07-card--blue .stats-07-dot-b {
          background-color: #4ade80;
        }
        .stats-07-band .stats-07-card--purple {
          border-color: rgba(168, 85, 247, 0.2);
        }
        .stats-07-band .stats-07-card--purple:hover {
          border-color: rgba(168, 85, 247, 0.45);
        }
        .stats-07-band .stats-07-card--purple .stats-07-card-wash {
          background-image: linear-gradient(
            to bottom right,
            #a855f7,
            #4ade80,
            #60a5fa
          );
        }
        .stats-07-band .stats-07-card--purple .stats-07-icon {
          color: #a855f7;
        }
        .stats-07-band .stats-07-card--purple:hover .stats-07-icon {
          color: #4ade80;
        }
        .stats-07-band .stats-07-card--purple .stats-07-value {
          background-image: linear-gradient(
            to right,
            #a855f7,
            #4ade80,
            #60a5fa
          );
        }
        .stats-07-band .stats-07-card--purple .stats-07-dot-a {
          background-color: #a855f7;
        }
        .stats-07-band .stats-07-card--purple .stats-07-dot-b {
          background-color: #4ade80;
        }
        .stats-07-band .stats-07-card--green {
          border-color: rgba(74, 222, 128, 0.2);
        }
        .stats-07-band .stats-07-card--green:hover {
          border-color: rgba(74, 222, 128, 0.45);
        }
        .stats-07-band .stats-07-card--green .stats-07-card-wash {
          background-image: linear-gradient(
            to bottom right,
            #4ade80,
            #60a5fa,
            #a855f7
          );
        }
        .stats-07-band .stats-07-card--green .stats-07-icon {
          color: #4ade80;
        }
        .stats-07-band .stats-07-card--green:hover .stats-07-icon {
          color: #60a5fa;
        }
        .stats-07-band .stats-07-card--green .stats-07-value {
          background-image: linear-gradient(
            to right,
            #4ade80,
            #60a5fa,
            #a855f7
          );
        }
        .stats-07-band .stats-07-card--green .stats-07-dot-a {
          background-color: #4ade80;
        }
        .stats-07-band .stats-07-card--green .stats-07-dot-b {
          background-color: #60a5fa;
        }
        .stats-07-band .stats-07-card--cyan {
          border-color: rgba(96, 165, 250, 0.2);
        }
        .stats-07-band .stats-07-card--cyan:hover {
          border-color: rgba(96, 165, 250, 0.45);
        }
        .stats-07-band .stats-07-card--cyan .stats-07-card-wash {
          background-image: linear-gradient(
            to bottom right,
            #60a5fa,
            #4ade80,
            #a855f7
          );
        }
        .stats-07-band .stats-07-card--cyan .stats-07-icon {
          color: #60a5fa;
        }
        .stats-07-band .stats-07-card--cyan:hover .stats-07-icon {
          color: #a855f7;
        }
        .stats-07-band .stats-07-card--cyan .stats-07-value {
          background-image: linear-gradient(
            to right,
            #60a5fa,
            #4ade80,
            #a855f7
          );
        }
        .stats-07-band .stats-07-card--cyan .stats-07-dot-a {
          background-color: #60a5fa;
        }
        .stats-07-band .stats-07-card--cyan .stats-07-dot-b {
          background-color: #a855f7;
        }
        @media (prefers-reduced-motion: reduce) {
          .stats-07-band .stats-07-card,
          .stats-07-band .stats-07-icon,
          .stats-07-band .stats-07-spark,
          .stats-07-band .stats-07-dot-a,
          .stats-07-band .stats-07-dot-b {
            animation: none;
          }
          .stats-07-band .stats-07-card:hover {
            transform: none;
          }
        }
      `}</style>

      <div className="stats-07-band w-full px-4 py-16 sm:px-6 md:px-8 md:py-20">
        <div className="stats-07-scan" aria-hidden="true" />
        <div
          className="stats-07-spark top-20 start-1/4 size-2 bg-[#60a5fa]"
          aria-hidden="true"
        />
        <div
          className="stats-07-spark top-40 end-1/3 size-1 bg-[#4ade80]"
          style={{ animationDelay: "75ms" }}
          aria-hidden="true"
        />
        <div
          className="stats-07-spark bottom-40 start-1/3 size-3 bg-[#a855f7]"
          style={{ animationDelay: "150ms" }}
          aria-hidden="true"
        />
        <div
          className="stats-07-spark bottom-20 end-1/4 size-1 bg-[#60a5fa]"
          style={{ animationDelay: "300ms" }}
          aria-hidden="true"
        />

        <ul className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((item) => (
            <li key={item.label}>
              <div
                className={cn(
                  "stats-07-card",
                  `stats-07-card--${item.accent}`
                )}
                style={{ animationDelay: item.delay }}
              >
                <div className="stats-07-card-wash" aria-hidden="true" />
                <div className="relative z-10">
                  <ProtocolIcon className="stats-07-icon" />
                  <p className="stats-07-value">{item.value}</p>
                  <p className="stats-07-label">{item.label}</p>
                </div>
                <span className="stats-07-dot-a" aria-hidden="true" />
                <span className="stats-07-dot-b" aria-hidden="true" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
