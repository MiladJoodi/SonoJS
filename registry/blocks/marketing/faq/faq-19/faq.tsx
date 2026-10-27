import * as React from "react"

import { cn } from "@/lib/utils"

const faqData = [
  {
    question: "How long does it take to ship my order?",
    answer:
      "Orders are usually shipped within 1–2 business days after you place them. You will receive a tracking link by email once the package is on its way.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit and debit cards, including Visa and Mastercard. Company invoices are available on business plans.",
  },
  {
    question: "What shipping options do you have?",
    answer:
      "Domestic orders ship via standard and express carriers. International rates and timelines are shown at checkout before you pay.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Yes, if the order has not shipped yet. Open Orders in your account and choose Change or Cancel, or contact support with your order number.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "We ship to most countries. Duties and taxes may apply depending on your destination and are calculated when available at checkout.",
  },
  {
    question: "How do I track my package?",
    answer:
      "Use the tracking link in your shipping confirmation email, or open the order details page in your account for live status updates.",
  },
] as const

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d="M7.29001 12.66C7.10526 12.8462 7.00111 13.0976 7.00001 13.36C7.00026 13.494 7.02747 13.6266 7.08001 13.75C7.17028 13.9619 7.33093 14.1361 7.53482 14.2433C7.73872 14.3504 7.97334 14.3839 8.19907 14.338C8.42479 14.2922 8.62776 14.1698 8.77369 13.9916C8.91963 13.8134 8.99957 13.5903 9.00001 13.36C8.9989 13.0976 8.89475 12.8462 8.71001 12.66C8.61704 12.5662 8.50644 12.4918 8.38458 12.4411C8.26272 12.3903 8.13202 12.3642 8.00001 12.3642C7.86799 12.3642 7.73729 12.3903 7.61543 12.4411C7.49357 12.4918 7.38297 12.5662 7.29001 12.66ZM15.63 1.65995C15.5138 1.56597 15.3781 1.49923 15.2327 1.46461C15.0873 1.43 14.9361 1.42841 14.79 1.45995C13.7214 1.6839 12.6183 1.68675 11.5486 1.46834C10.4789 1.24992 9.46525 0.814866 8.57001 0.189952C8.40261 0.0738247 8.20374 0.0115967 8.00001 0.0115967C7.79627 0.0115967 7.5974 0.0738247 7.43001 0.189952C6.53401 0.813153 5.51998 1.24643 4.45029 1.46312C3.38061 1.6798 2.2779 1.67532 1.21001 1.44995C1.06394 1.41841 0.912671 1.42 0.767306 1.45461C0.621942 1.48923 0.486181 1.55597 0.370006 1.64995C0.253985 1.74407 0.160527 1.86299 0.0964981 1.99797C0.0324695 2.13295 -0.00050219 2.28056 5.78149e-06 2.42995V9.87995C-0.000883255 11.3137 0.340779 12.7269 0.996541 14.0019C1.6523 15.2769 2.60319 16.3768 3.77001 17.21L7.42001 19.81C7.58937 19.9305 7.7921 19.9953 8.00001 19.9953C8.20791 19.9953 8.41064 19.9305 8.58001 19.81L12.23 17.21C13.3968 16.3768 14.3477 15.2769 15.0035 14.0019C15.6592 12.7269 16.0009 11.3137 16 9.87995V2.42995C16.0005 2.28056 15.9675 2.13295 15.9035 1.99797C15.8395 1.86299 15.746 1.74407 15.63 1.64995V1.65995ZM14 9.87995C14.0008 10.9947 13.7353 12.0935 13.2257 13.085C12.716 14.0764 11.977 14.9318 11.07 15.58L8.00001 17.77L4.93001 15.58C4.02304 14.9318 3.28399 14.0764 2.77435 13.085C2.26472 12.0935 1.99924 10.9947 2.00001 9.87995V3.57995C4.09643 3.75939 6.19605 3.27297 8.00001 2.18995C9.80397 3.27297 11.9036 3.75939 14 3.57995V9.87995ZM8.00001 5.35995C7.47307 5.35961 6.95534 5.49807 6.49891 5.76139C6.04249 6.02472 5.66347 6.40361 5.40001 6.85995C5.28045 7.08849 5.25383 7.35439 5.32569 7.6021C5.39755 7.84981 5.56234 8.06017 5.78565 8.18925C6.00895 8.31832 6.27348 8.35613 6.524 8.29476C6.77452 8.2334 6.99164 8.07762 7.13001 7.85995C7.21769 7.70808 7.34377 7.58194 7.4956 7.49418C7.64743 7.40642 7.81967 7.36013 7.99504 7.35996C8.17041 7.35979 8.34274 7.40573 8.49474 7.49319C8.64674 7.58065 8.77307 7.70654 8.86106 7.85824C8.94904 8.00994 8.99559 8.18211 8.99602 8.35748C8.99646 8.53284 8.95077 8.70524 8.86354 8.85738C8.77631 9.00951 8.6506 9.13603 8.49904 9.22424C8.34747 9.31245 8.17537 9.35925 8.00001 9.35995C7.73479 9.35995 7.48044 9.46531 7.2929 9.65285C7.10536 9.84038 7.00001 10.0947 7.00001 10.36C7.00001 10.6252 7.10536 10.8795 7.2929 11.0671C7.48044 11.2546 7.73479 11.36 8.00001 11.36C8.79566 11.36 9.55872 11.0439 10.1213 10.4813C10.6839 9.91866 11 9.1556 11 8.35995C11 7.5643 10.6839 6.80124 10.1213 6.23863C9.55872 5.67602 8.79566 5.35995 8.00001 5.35995Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WaveTop({ className }: { className?: string }) {
  return (
    <div className={cn("w-full text-muted", className)} aria-hidden>
      <svg
        viewBox="0 0 1440 116"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full"
      >
        <path
          d="M1440 64.5909H1090.08C833.336 64.5909 580.229 -7.62939e-06 360 -7.62939e-06C139.771 -7.62939e-06 0 64.5909 0 64.5909V116H1440V64.5909Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

function WaveBottom({ className }: { className?: string }) {
  return (
    <div className={cn("w-full text-muted", className)} aria-hidden>
      <svg
        viewBox="0 0 1440 116"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full"
      >
        <path
          d="M0 51.4091H349.922C606.664 51.4091 859.771 116 1080 116C1300.23 116 1440 51.4091 1440 51.4091V0H0V51.4091Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

function FaqCard({
  item,
}: {
  item: (typeof faqData)[number]
}) {
  return (
    <div className="group h-full pt-8">
      <div className="relative h-full rounded-[12px] bg-card px-6 pb-8 pt-14 shadow-soft transition duration-200 hover:bg-muted/40 hover:shadow-xl sm:px-8">
        <div className="absolute left-1/2 top-0 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card transition duration-200 group-hover:bg-muted/40">
          <div className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ShieldIcon />
          </div>
        </div>
        <h3 className="mb-3 max-w-xs text-xl font-bold leading-7 text-foreground">
          {item.question}
        </h3>
        <p className="text-base font-medium leading-relaxed text-muted-foreground transition duration-200 group-hover:text-foreground/80">
          {item.answer}
        </p>
      </div>
    </div>
  )
}

export default function Faq({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("bg-background", className)} {...props}>
      <WaveTop />
      <div className="bg-muted px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
            <span className="mb-4 inline-block rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium leading-5 text-primary shadow-soft">
              FAQ
            </span>
            <h2
              id="faq-heading"
              className="mb-4 text-4xl font-bold tracking-tighter text-foreground md:text-5xl"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
              Quick answers about shipping, payments, and support so you can
              order with confidence.
            </p>
          </div>

          <div className="grid gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
            {faqData.map((item) => (
              <FaqCard key={item.question} item={item} />
            ))}
          </div>
        </div>
      </div>
      <WaveBottom />
    </section>
  )
}
