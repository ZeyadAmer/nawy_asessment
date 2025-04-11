import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './repositories/Apartment';
import { Project } from './repositories/Project';
import { ApartmentController } from './controller/ApartmentController';
import { ProjectController } from './controller/ProjectController';
import { ApartmentService } from './service/ApartmentService';
import { ProjectService } from './service/ProjectService';
import { SalesPerson } from './repositories/SalesPerson';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Use PostgreSQL
      host: 'localhost', // PostgreSQL host
      port: 8042, // Default PostgreSQL port
      username: 'postgres', // Database username
      password: 'PostgrePassword1', // Database password
      database: 'nawy',
      entities: [Apartment, Project,SalesPerson], 
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Apartment, Project]), // Import the entities
  ],
  controllers: [ApartmentController, ProjectController],
  providers: [ApartmentService, ProjectService],
})
export class AppModule {}