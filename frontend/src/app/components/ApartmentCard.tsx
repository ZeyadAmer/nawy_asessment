import { Apartment } from "@/types/Apartment.type"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LuBedDouble, LuBath } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { CgDetailsMore } from "react-icons/cg"
import { MdOutlineLocationOn } from "react-icons/md"

type ApartmentCardProps = {
  apartment: Apartment
}

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  return (
    <div className="w-full rounded-lg border shadow-sm bg-card text-card-foreground">
      <div className="flex flex-col p-6 space-y-1.5">
        <div className="text-2xl font-semibold tracking-tight leading-none">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: apartment.currency,
          }).format(apartment.price)}
        </div>
        <div className="overflow-hidden text-lg text-muted-foreground overflow-ellipsis text-nowrap">
          {apartment.name}
        </div>
        <div className="overflow-hidden text-lg text-muted-foreground overflow-ellipsis text-nowrap">
          number: {apartment.id}
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <span>{apartment.project.name}</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <MdOutlineLocationOn />
            <span>{apartment.project.area}</span>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <LuBedDouble />
            <span>{apartment.rooms}</span>
          </div>
          <div className="flex items-center space-x-2">
            <LuBath />
            <span>{apartment.toilets}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center p-6 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex-grow" variant="outline">
              <CgDetailsMore className="mr-2 w-6 h-6" />
              Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Details</DialogTitle>
              <DialogDescription>
                <p className="text-black"><span className="font-semibold">Name:</span> {apartment.name}</p>
                <p className="text-black"><span className="font-semibold">Number:</span> {apartment.id}</p>
                <p className="text-black"><span className="font-semibold">Floor:</span> {apartment.floor}</p>
                <p className="text-black"><span className="font-semibold">Rooms:</span> {apartment.rooms}</p>
                <p className="text-black"><span className="font-semibold">Toilets:</span> {apartment.toilets}</p>
                <p className="text-black"><span className="font-semibold">Park spot:</span> {apartment.hasParking ? "Yes" : "No"}</p>
                <p className="text-black"><span className="font-semibold">Project name:</span> {apartment.project.name}</p>
                <p className="text-black"><span className="font-semibold">Area:</span> {apartment.project.area}</p>
                <p className="text-black"><span className="font-semibold">Address:</span> {apartment.project.address}</p>
                <p className="text-black"><span className="font-semibold">Price:</span>{" "}
                {new Intl.NumberFormat("en-US", { style: "currency", currency: apartment.currency }).format(apartment.price)}</p>
                <p className="text-black"><span className="font-semibold">Contact person name:</span> {apartment.salesPerson.name}</p>
                <p className="text-black"><span className="font-semibold">Contact person number:</span> {apartment.salesPerson.contactNumber}</p>
                <p className="text-black"><span className="font-semibold">Contact person email:</span> {apartment.salesPerson.email}</p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
