import { Apartment } from './Apartment.type'; 
import { z } from "zod";

export type SalesPerson ={
  id: number;
  name: string;
  contactNumber: string;
  email: string;
  additionalInfo: string; 
  apartments: Apartment[];
}
export const SalesPersonDTO = z.object({
    name: z.string().min(3), 
    contactNumber: z.string().min(10).max(15), 
    email: z.string().email(), 
    additionalInfo: z.string().optional(),  
    apartmentId: z.number().min(1), 
  });
  