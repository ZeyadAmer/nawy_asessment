"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Apartment_1 = require("./repositories/Apartment");
const Project_1 = require("./repositories/Project");
const ApartmentController_1 = require("./controller/ApartmentController");
const ProjectController_1 = require("./controller/ProjectController");
const ApartmentService_1 = require("./service/ApartmentService");
const ProjectService_1 = require("./service/ProjectService");
const SalesPerson_1 = require("./repositories/SalesPerson");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres', // Use PostgreSQL
                host: 'localhost', // PostgreSQL host
                port: 8042, // Default PostgreSQL port
                username: 'postgres', // Database username
                password: 'PostgrePassword1', // Database password
                database: 'nawy',
                entities: [Apartment_1.Apartment, Project_1.Project, SalesPerson_1.SalesPerson],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([Apartment_1.Apartment, Project_1.Project]), // Import the entities
        ],
        controllers: [ApartmentController_1.ApartmentController, ProjectController_1.ProjectController],
        providers: [ApartmentService_1.ApartmentService, ProjectService_1.ProjectService],
    })
], AppModule);
