import { StarIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { VerifiedBadge } from "@sonojs/ui/components/verified-badge"

export function VerifiedBadgeSeller() {
  return (
    <div className="flex w-full justify-center px-2">
      <Card className="w-full max-w-sm shadow-soft">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarImage src="/images/docs/03.webp" alt="Northwind Goods" />
              <AvatarFallback>NG</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 text-start">
              <CardTitle className="flex items-center gap-1.5 text-base">
                <span className="truncate">Northwind Goods</span>
                <VerifiedBadge
                  variant="gold"
                  size="sm"
                  title="Verified business"
                />
              </CardTitle>
              <CardDescription className="mt-1.5 flex items-center gap-1">
                <StarIcon className="size-3.5 fill-amber-400 text-amber-400" />
                <span className="tabular-nums">4.9</span>
                <span>· Official store</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Verified seller — ships worldwide with tracked delivery and easy
            returns.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button className="flex-1 cursor-pointer">Follow</Button>
          <Button variant="outline" className="flex-1 cursor-pointer">
            Message
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
