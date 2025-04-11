import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CurrencyCode } from '../enums/CurrencyCode.enum';
import { Project } from './Project';
import { SalesPerson } from './SalesPerson';
import { z } from "zod";

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column({ type: "enum", enum: CurrencyCode, default: CurrencyCode.EGP })
  currency!: string;

  @Column("integer")
  floor!: number;
  
  @Column("integer")
  rooms!: number;

  @Column("integer")
  toilets!: number;

  @Column("boolean")
  hasParking!: boolean;
  
  @ManyToOne(() => Project, (project) => project.apartments) 
  project!: Project;

  @ManyToOne(() => SalesPerson, (salesPerson) => salesPerson.apartments)
  salesPerson!: SalesPerson;
  
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
export type ApartmentDTO = z.infer<typeof ApartmentDTO>;

// Search and Filter Functionality: Enable searching on the apartment listing
// page by unit name, unit number, or project.