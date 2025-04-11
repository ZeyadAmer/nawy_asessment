import { Controller, Get, Param, Post, Body, Query, Patch, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { ApartmentService } from '../service/ApartmentService';
import { ApartmentDTO } from '../repositories/Apartment';

@Controller('apartments')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createApartment(@Body() apartmentDto: ApartmentDTO) {
    const parsed = ApartmentDTO.safeParse(apartmentDto);
        
        if (!parsed.success) {
          throw new Error('Validation failed');
        }
    const apartment = await this.apartmentService.createApartment(apartmentDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Apartment created successfully',
      apartment,
    };
  }

  @Get(':id')
  async getApartmentById(@Param('id') id: number) {
    const apartment = await this.apartmentService.findApartmentById(id);
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Apartment retrieved successfully',
      apartment,
    };
  }

  @Get('by-name/:name')
  async getApartmentByName(@Param('name') name: string) {
    const apartment = await this.apartmentService.findApartmentByName(name);
    if (!apartment) {
      throw new NotFoundException(`Apartment with name ${name} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Apartment retrieved successfully',
      apartment,
    };
  }

  @Get()
  async getAllApartments(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const apartments = await this.apartmentService.findAllApartments(Number(page), Number(limit));
    return {
      statusCode: HttpStatus.OK,
      message: 'Apartments retrieved successfully',
      apartments,
    };
  }

  @Patch(':apartmentId/assign-project/:projectId')
  async assignProject(
    @Param('apartmentId') apartmentId: number,
    @Param('projectId') projectId: number,
  ) {
    try {
      const apartment = await this.apartmentService.assignProjectToApartment(apartmentId, projectId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Project assigned successfully',
        apartment,
      };
    } catch (error) {
      const err = error as Error;
      throw new NotFoundException(err.message || 'Error assigning project');
    }
  }
}
