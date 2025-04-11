import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Apartment } from './Apartment';
import { z } from "zod";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  area!: string;

  @Column()
  address!: string;

  @OneToMany(() => Apartment, (apartment) => apartment.project)  
  apartments!: Apartment[];
}
export const ProjectDTO = z.object({
    name: z.string().min(3),
    area: z.string().min(3),  
    address: z.string().min(5), 
    apartmentIds: z.array(z.number().min(1)),
  });
export type ProjectDTO = z.infer<typeof ProjectDTO>;
  