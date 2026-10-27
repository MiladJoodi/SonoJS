"use client"

import type * as React from "react"
import { CircleHelpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type FaqItem = {
  question: string
  answer: React.ReactNode
}

const leftColumn: FaqItem[] = [
  {
    question: 'What do you mean by "design assets"?',
    answer:
      "You will have access to download the full design project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.",
  },
  {
    question: 'What does "lifetime access" exactly mean?',
    answer:
      "Once you have purchased either the design, code, or both packages, you will have access to all of the future updates based on the roadmap, free of charge.",
  },
  {
    question: "How does support work?",
    answer: (
      <>
        <p>
          We&apos;re aware of the importance of well qualified support, that is
          why we decided that support will only be provided by the authors that
          actually worked on this project.
        </p>
        <p className="mt-3">
          Feel free to{" "}
          <a
            href="#"
            className="font-medium text-primary underline underline-offset-4 hover:no-underline"
            target="_blank"
            rel="noreferrer"
          >
            contact us
          </a>{" "}
          and we&apos;ll help you out as soon as we can.
        </p>
      </>
    ),
  },
  {
    question: "I want to build more than one project. Is that allowed?",
    answer: (
      <>
        <p>
          You can use this kit for an unlimited amount of projects, whether
          it&apos;s a personal website, a SaaS app, or a website for a client.
          As long as you don&apos;t build a product that will directly compete
          with this kit either as a UI kit, theme, or template, it&apos;s fine.
        </p>
        <p className="mt-3">
          Find out more information by{" "}
          <a
            href="#"
            className="font-medium text-primary underline underline-offset-4 hover:no-underline"
          >
            reading the license
          </a>
          .
        </p>
      </>
    ),
  },
]

const rightColumn: FaqItem[] = [
  {
    question: 'What does "free updates" include?',
    answer: (
      <>
        The free updates that will be provided is based on the{" "}
        <a
          href="#"
          className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        >
          roadmap
        </a>{" "}
        that we have laid out for this project. It is also possible that we will
        provide extra updates outside of the roadmap as well.
      </>
    ),
  },
  {
    question: "What does the free version include?",
    answer: (
      <>
        <p>
          The{" "}
          <a
            href="#"
            className="font-medium text-primary underline underline-offset-4 hover:no-underline"
          >
            free version
          </a>{" "}
          includes minimal style guidelines, component variants, and a dashboard
          page with the mobile version alongside it.
        </p>
        <p className="mt-3">
          You can use this version for any purposes, because it is open-source
          under the MIT license.
        </p>
      </>
    ),
  },
  {
    question: "What is the difference between the free and pro kits?",
    answer: (
      <>
        <p>
          Although both kits are built for integration with the same stack, the
          main difference is in the design, the pages, the extra components and
          UI elements that the pro kit includes.
        </p>
        <p className="mt-3">
          Additionally, the pro kit is a project that is still in development,
          and later it will include both the application, marketing, and
          e-commerce UI interfaces.
        </p>
      </>
    ),
  },
  {
    question: "Can I use this kit in open-source projects?",
    answer: (
      <>
        <p>
          Generally, it is accepted to use this kit in open-source projects, as
          long as it is not a UI library, a theme, a template, or a page-builder
          that would be considered as an alternative to the kit itself.
        </p>
        <p className="mt-3">
          With that being said, feel free to use this design kit for your
          open-source projects.
        </p>
        <p className="mt-3">
          Find out more information by{" "}
          <a
            href="#"
            className="font-medium text-primary underline underline-offset-4 hover:no-underline"
          >
            reading the license
          </a>
          .
        </p>
      </>
    ),
  },
]

function FaqEntry({ item }: { item: FaqItem }) {
  return (
    <div className="mb-8 last:mb-0 md:mb-10">
      <h3 className="mb-3 flex items-start gap-2 text-base font-semibold text-foreground md:mb-4 md:text-lg md:font-medium">
        <CircleHelpIcon
          className="mt-0.5 size-5 shrink-0 text-muted-foreground"
          aria-hidden
        />
        <span>{item.question}</span>
      </h3>
      <div className="text-base leading-relaxed text-muted-foreground">
        {typeof item.answer === "string" ? <p>{item.answer}</p> : item.answer}
      </div>
    </div>
  )
}

export default function Faq({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full bg-card px-4 py-12 md:px-8 md:py-16", className)}
      aria-labelledby="faq-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="faq-heading"
          className="mb-6 text-2xl font-semibold tracking-tight text-foreground md:mb-8 md:text-3xl"
        >
          Frequently asked questions
        </h2>

        <div className="grid border-t border-border pt-8 text-start md:grid-cols-2 md:gap-16">
          <div>
            {leftColumn.map((item) => (
              <FaqEntry key={item.question} item={item} />
            ))}
          </div>
          <div>
            {rightColumn.map((item) => (
              <FaqEntry key={item.question} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
