import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment, ApartmentDTO } from '../repositories/Apartment';
import { Project } from '../repositories/Project';
import { SalesPerson } from '../repositories/SalesPerson';


@Injectable()
export class ApartmentService {
  
  constructor(
    @InjectRepository(Apartment)
    private readonly apartmentRepository: Repository<Apartment>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    
    @InjectRepository(SalesPerson)
    private readonly salesPersonRepository: Repository<SalesPerson>,
  ) {}

  async createApartment(apartmentDto: ApartmentDTO): Promise<Apartment> {
    const project = await this.projectRepository.findOne({ where: { id: apartmentDto.projectId } });
    const salesPerson = await this.salesPersonRepository.findOne({ where: { id: apartmentDto.salesPersonId } });
  
    if (!project || !salesPerson) {
      throw new Error('Invalid projectId or salesPersonId');
    }
  
    const apartment = this.apartmentRepository.create({
      ...apartmentDto,
      project,
      salesPerson,
    });
  
    return await this.apartmentRepository.save(apartment);
  }
  

  async findApartmentById(id: number): Promise<Apartment|null> {
    return this.apartmentRepository.findOne({ where: { id }, relations: ['project', 'salesPerson'] });
  }
  
  async findApartmentByName(name: string): Promise<Apartment|null> {
    return this.apartmentRepository.findOne({ where: { name }, relations: ['project', 'salesPerson'] });
  }
  async findAllApartments(page: number = 1,limit: number = 10): Promise<{
    apartments: Apartment[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;}> {
    const [apartments, total] = await this.apartmentRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['project', 'salesPerson'],
      order: {
        id: 'ASC',
    },
    });
  
    return {
      apartments,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async assignProjectToApartment(apartmentId: number, projectId: number): Promise<Apartment> {
    //incase when creating apartment it was assigned to the wrong project
  const apartment = await this.findApartmentById(apartmentId);
  if (!apartment) {
    throw new NotFoundException(`Apartment with ID ${apartmentId} not found`);
  }

  const project = await this.projectRepository.findOne({ where: { id: projectId } });
  if (!project) {
    throw new NotFoundException(`Project with ID ${projectId} not found`);
  }
  
  apartment.project = project; 
  return this.apartmentRepository.save(apartment);
}
async findAllUsers(page: number = 1,limit: number = 10): Promise<{
  salesPerson: SalesPerson[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;}> {
  const [salesPerson, total] = await this.salesPersonRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: {
      id: 'ASC',
  },
  });

  return {
    salesPerson,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

}


//Room for improvement create for users authority rules and check the token who is able to use which function