import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApartmentDTO as formSchema } from "@/types/Apartment.type";
import { VscLoading } from "react-icons/vsc";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyCode } from "@/enums/CurrencyCode.enum";
import { ScrollArea } from "@/components/ui/scroll-area";
import { projectService } from "../services/projectService";
import { apartmentService } from "../services/apartmentService"; // Assuming you have this service

const enumToObjectList = (enumObj: any) => {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key))) // Filter out numeric values (in case of numeric enums)
    .map((key) => ({
      label: key,
      value: enumObj[key as keyof typeof enumObj],
    }));
};

type ApartmentAddFromProps = {
  onFormSubmit: (data: z.infer<typeof formSchema>) => void;
  isPending?: boolean;
};

export function ApartmentAddFrom({
  onFormSubmit,
  isPending,
}: ApartmentAddFromProps) {
  const CurrencyCodeList = enumToObjectList(CurrencyCode);

  const [projects, setProjects] = useState<any[]>([]); // State to hold project data
  const [salesPersons, setSalesPersons] = useState<any[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 1,
      currency: CurrencyCode.EGP,
      floor: 1,
      rooms: 1,
      toilets: 1,
      hasParking: false,
      projectId: 0, 
      salesPersonId: 0,
    },
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.getAllProjects();
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchSalesPersons = async () => {
      try {
        const response = await apartmentService.getAllUsers();
        setSalesPersons(response.data.salesPerson.salesPerson); // Assuming the response structure
      } catch (error) {
        console.error("Failed to fetch sales persons", error);
      }
    };
  
    fetchSalesPersons();
  }, []);
    
  // Handle form submission
  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Call the backend API to create the apartment
      console.log("Form Data before submission:", data); // ✅ Log here

      const response = await apartmentService.createApartment(data);
      console.log("Apartment created:", response);
      onFormSubmit(data); // Call the parent function if needed
    } catch (error) {
      console.error("Error creating apartment:", error);
      alert("There was an error creating the apartment");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-2 w-full"
          noValidate
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <ScrollArea className="w-full h-[600px]">
            <div className="flex flex-col mb-3 space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Price"
                        value={field.value}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))} // Convert to number
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="flex flex-col mx-1">
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          CurrencyCodeList?.find(
                            (item) => item.value === field.value
                          )?.value ?? CurrencyCode.EGP
                        }
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {CurrencyCodeList?.map((item) => (
                            <SelectItem
                              value={item.label}
                              key={item.value}
                              onSelect={() => {
                                form.setValue("currency", item.value);
                              }}
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>Floor</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Floor"
                        value={field.value} // Ensures numeric value is displayed
                        onChange={(e) => field.onChange(parseInt(e.target.value))} // Converts to number
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rooms"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>Rooms</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Rooms"
                        value={field.value} // Ensures numeric value is displayed
                        onChange={(e) => field.onChange(parseInt(e.target.value))} // Converts to number
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="toilets"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>Toilets</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Toilets"
                        value={field.value} // Ensures numeric value is displayed
                        onChange={(e) => field.onChange(parseInt(e.target.value))} // Converts to number
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasParking"
                render={({ field }) => (
                  <FormItem className="mx-1 flex flex-col items-center items-start space-x-2">
                    <FormLabel className="!mb-0">Has a parking spot</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Project Dropdown */}
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>Project</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects?.map((project) => (
                            <SelectItem key={project.id} value={project.id.toString()}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salesPersonId"
                render={({ field }) => (
                  <FormItem className="mx-1">
                    <FormLabel>Sales Person</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a salesperson" />
                        </SelectTrigger>
                        <SelectContent>
                          {salesPersons?.map((salesPerson) => (
                            <SelectItem key={salesPerson.id} value={salesPerson.id.toString()}>
                              {salesPerson.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
          </ScrollArea>

          <Button disabled={isPending} className="w-full" type="submit">
            {isPending ? <VscLoading className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
