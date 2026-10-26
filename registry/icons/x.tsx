import { cn } from "@/lib/utils"

const xPath =
  "M15.9445 23L10.3951 15.0901L3.44789 23H0.508789L9.09111 13.2311L0.508789 1H8.05474L13.285 8.45502L19.8383 1H22.7774L14.5933 10.3165L23.4904 23H15.9445ZM19.2175 20.77H17.2388L4.71714 3.23H6.69613L11.7111 10.2532L12.5784 11.4719L19.2175 20.77Z"

export function XIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-5", className)}
      fill="currentColor"
      {...props}
    >
      <g transform="translate(12 12) scale(0.78) translate(-12 -12)">
        <path fillRule="evenodd" clipRule="evenodd" d={xPath} />
      </g>
    </svg>
  )
}
