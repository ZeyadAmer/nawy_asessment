import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Apartment } from './Apartment'; 
import { z } from "zod";

@Entity()
export class SalesPerson {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  contactNumber!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  additionalInfo?: string; 

  @OneToMany(() => Apartment, (apartment) => apartment.project)  
    apartments!: Apartment[];
}
export const SalesPersonDTO = z.object({
    name: z.string().min(3), 
    contactNumber: z.string().min(10).max(15), 
    email: z.string().email(), 
    additionalInfo: z.string().optional(),  
    apartmentId: z.number().min(1), 
  });
export type SalesPersonDTO = z.infer<typeof SalesPersonDTO>;
  