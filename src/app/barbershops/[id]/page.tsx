import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/services-item"
import Siderbar from "@/app/_components/sidebar"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronsLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop?.name}
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronsLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="absolute right-4 top-4"
              size="icon"
              variant="outline"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <Siderbar />
        </Sheet>
      </div>

      <div className="space-y-2 border-b border-solid p-5">
        <h1 className="text-xl font-bold">{barbershop?.name}</h1>
        <div className="mb-3 flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p>{barbershop?.address}</p>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p>5,0 (829 Avaliações)</p>
        </div>
      </div>

      <div className="space-y3 space-y-2 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>

      <div className="p-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          serviços
        </h2>
        <div className="mb-3 space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem
              service={JSON.parse(JSON.stringify(service))}
              barbershop={JSON.parse(JSON.stringify(barbershop))}
              key={service.id}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3 p-5">
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage
