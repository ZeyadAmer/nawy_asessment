import { Controller, Get, Param, Post, Body, Query, Patch } from '@nestjs/common';
import { ApartmentService } from '../service/ApartmentService';
import { ApartmentDTO } from '../repositories/Apartment';

@Controller('apartments')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Post()
  async createApartment(@Body() apartmentDto: ApartmentDTO) {
    return this.apartmentService.createApartment(apartmentDto);
  }

  @Get(':id')
  async getApartmentById(@Param('id') id: number) {
    return this.apartmentService.findApartmentById(id);
  }

  @Get('by-name/:name')
  async getApartmentByName(@Param('name') name: string) {
    return this.apartmentService.findApartmentByName(name);
  }

  @Get()
  async getAllApartments(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.apartmentService.findAllApartments(Number(page), Number(limit));
  }

  @Patch(':apartmentId/assign-project/:projectId')
  async assignProject(
    @Param('apartmentId') apartmentId: number,
    @Param('projectId') projectId: number,
  ) {
    return this.apartmentService.assignProjectToApartment(apartmentId, projectId);
  }
}
