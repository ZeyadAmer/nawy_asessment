import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, ProjectDTO } from '../repositories/Project';
import { Apartment } from '../repositories/Apartment';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Apartment)
    private readonly apartmentRepository: Repository<Apartment>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createProject(projectDto: ProjectDTO): Promise<Project> {
    const project = this.projectRepository.create(projectDto);
    return await this.projectRepository.save(project);
  }
  async findAllProjects(page: number = 1,limit: number = 10): Promise<{
    projects: Project[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;}> {
    const [projects, total] = await this.projectRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  
    return {
      projects,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  

  async findApartmentsByProjectById(id: number,page: number = 1,limit: number = 10): Promise<{
    project: Project | null;
    apartments: Apartment[];
    total: number;
    page: number;
    limit: number;totalPages: number;
  }> {
    const project = await this.projectRepository.findOne({ where: { id } });
  
    if (!project) {
      return { project: null, apartments: [], total: 0, page, limit, totalPages: 0 };
    }
  
    const [apartments, total] = await this.apartmentRepository
      .createQueryBuilder('apartment')
      .leftJoinAndSelect('apartment.salesPerson', 'salesPerson')
      .where('apartment.projectId = :id', { id })
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
  
    const totalPages = Math.ceil(total / limit);
  
    return {
      project,
      apartments,
      total,
      page,
      limit,
      totalPages,
    };
  }
  

  
}
