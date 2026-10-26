import { cn } from "@/lib/utils"

export function DropboxIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("size-5 shrink-0", className)}
      {...props}
    >
      <g fill="#0756dc" fillRule="evenodd">
        <path d="m48 33.688-9.414 6.146L32 34.336l-6.586 5.498L16 33.688l6.508-5.212L16 23.264l9.414-6.146L32 22.614l6.586-5.496L48 23.264l-6.508 5.212zm-6.548 7.536L32.02 46.88l-9.434-5.656v-2.068L25.414 41l6.606-5.482L38.626 41l2.826-1.844zM32 0C14.326 0 0 14.326 0 32c0 17.672 14.326 32 32 32s32-14.328 32-32C64 14.326 49.674 0 32 0z" />
        <path d="M22.509 28.475 32 34.335l9.49-5.86-9.49-5.86z" />
      </g>
    </svg>
  )
}
