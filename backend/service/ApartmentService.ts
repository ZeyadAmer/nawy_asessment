import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment, ApartmentDTO } from '../repositories/Apartment';
import { Project } from '../repositories/Project';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Apartment)
    private readonly apartmentRepository: Repository<Apartment>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createApartment(apartmentDto: ApartmentDTO): Promise<Apartment> {
    const apartment = this.apartmentRepository.create(apartmentDto);
    await this.apartmentRepository.save(apartment);
    return apartment;
  }

  async findApartmentById(id: number): Promise<Apartment|null> {
    return this.apartmentRepository.findOne({ where: { id }, relations: ['project', 'salesPerson'] });
  }
  
  async findApartmentByName(name: string): Promise<Apartment|null> {
    return this.apartmentRepository.findOne({ where: { name }, relations: ['project', 'salesPerson'] });
  }

  async assignProjectToApartment(apartmentId: number, projectId: number): Promise<Apartment> {
    //incase when creating apartment it was assigned to the wrong project
  const apartment = await this.findApartmentById(apartmentId);
  if (!apartment) {
    throw new Error('Apartment not found');
  }

  const project = await this.projectRepository.findOne({ where: { id: projectId } });
  if (!project) {
    throw new Error('Project not found');
  }
  
  apartment.project = project; 
  return this.apartmentRepository.save(apartment);
}

}


//Room for improvement create for users authority rules and check the token who is able to use which function