import { CurrencyCode } from '../enums/CurrencyCode.enum';
import { Project } from './Project.type';
import { SalesPerson } from './SalesPerson.type';
import { z } from "zod";

export type Apartment ={
  id: number;
  name: string;
  price: number;
  currency: string;
  floor: number;
  rooms: number;
  toilets: number;
  hasParking: boolean;
  project: Project;
  salesPerson: SalesPerson;
  
}
export const ApartmentDTO = z.object({
  name: z.string().min(3),  
  price: z.number().min(0), 
  currency: z.nativeEnum(CurrencyCode),
  floor: z.number().min(0),  
  rooms: z.number().min(1),  
  toilets: z.number().min(1),  
  hasParking: z.boolean(), 
  projectId: z.number().min(1),
  salesPersonId: z.number().min(1), 
});
