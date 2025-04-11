import { Apartment } from './Apartment.type';
import { z } from "zod";

export type Project ={
  id: number;
  name: string;
  area: string;
  address: string;
  apartments: Apartment[];
}
export const ProjectDTO = z.object({
    name: z.string().min(3),
    area: z.string().min(3),  
    address: z.string().min(5), 
    apartmentIds: z.array(z.number().min(1)).optional(),
  });
  