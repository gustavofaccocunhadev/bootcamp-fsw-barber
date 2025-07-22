import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"

import { Sheet, SheetTrigger } from "./ui/sheet"

import Siderbar from "./sidebar"
import { MenuIcon } from "lucide-react"
import Link from "next/link"

const Header = () => {
  return (
    <div>
      <Card className="rounded-none">
        <CardContent className="flex flex-row items-center justify-between p-5">
          <Link href="/">
            <Image alt="FSW-Barber" src="/logo.png" height={18} width={120} />
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <Siderbar />
          </Sheet>
        </CardContent>
      </Card>
    </div>
  )
}

export default Header
