import { Controller, Get, Param, Post, Body, Query, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { ProjectService } from '../service/ProjectService';
import { ProjectDTO } from '../repositories/Project';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProject(@Body() projectDto: ProjectDTO) {
    const project = await this.projectService.createProject(projectDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Project created successfully',
      project,
    };
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
    const result = await this.projectService.findApartmentsByProjectById(id, page, limit);
    if (!result.project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Apartments retrieved successfully',
      project: result.project,
      apartments: result.apartments,
    };
  }

  @Get('by-name/:name/apartments')
  async getApartmentsByProjectName(
    @Param('name') name: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const result = await this.projectService.findApartmentsByProjectByName(name, page, limit);
    if (!result.project) {
      throw new NotFoundException(`Project with name ${name} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Apartments retrieved successfully',
      project: result.project,
      apartments: result.apartments,
    };
  }
}
