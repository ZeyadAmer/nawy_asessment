import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { ProjectService } from '../service/ProjectService';
import { ProjectDTO } from '../repositories/Project';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Body() projectDto: ProjectDTO) {
    return this.projectService.createProject(projectDto);
  }

  @Get()
  async getAllProjects(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.projectService.findAllProjects(Number(page), Number(limit));
  }

  @Get(':id/apartments')
  async getApartmentsByProjectId(
    @Param('id') id: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.projectService.findApartmentsByProjectById(id, page, limit);
  }

  @Get('by-name/:name/apartments')
  async getApartmentsByProjectName(
    @Param('name') name: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.projectService.findApartmentsByProjectByName(name, page, limit);
  }
}
