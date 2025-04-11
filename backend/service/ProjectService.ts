import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, ProjectDTO } from '../repositories/Project';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createProject(projectDto: ProjectDTO): Promise<Project> {
    const project = this.projectRepository.create(projectDto);
    return await this.projectRepository.save(project);
  }

  async findApartmentsByProjectById(id: number): Promise<Project | null> {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['apartments'],
    });
  }

  async findApartmentsByProjectByName(name: string): Promise<Project | null> {
    return this.projectRepository.findOne({
      where: { name },
      relations: ['apartments'],
    });
  }
}
