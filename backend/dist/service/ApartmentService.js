"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Apartment_1 = require("../repositories/Apartment");
const Project_1 = require("../repositories/Project");
const SalesPerson_1 = require("../repositories/SalesPerson");
let ApartmentService = class ApartmentService {
    constructor(apartmentRepository, projectRepository, salesPersonRepository) {
        this.apartmentRepository = apartmentRepository;
        this.projectRepository = projectRepository;
        this.salesPersonRepository = salesPersonRepository;
    }
    async createApartment(apartmentDto) {
        const project = await this.projectRepository.findOne({ where: { id: apartmentDto.projectId } });
        const salesPerson = await this.salesPersonRepository.findOne({ where: { id: apartmentDto.salesPersonId } });
        if (!project || !salesPerson) {
            throw new Error('Invalid projectId or salesPersonId');
        }
        const apartment = this.apartmentRepository.create(Object.assign(Object.assign({}, apartmentDto), { project,
            salesPerson }));
        return await this.apartmentRepository.save(apartment);
    }
    async findApartmentById(id) {
        return this.apartmentRepository.findOne({ where: { id }, relations: ['project', 'salesPerson'] });
    }
    async findApartmentByName(name) {
        return this.apartmentRepository.findOne({ where: { name }, relations: ['project', 'salesPerson'] });
    }
    async findAllApartments(page = 1, limit = 10) {
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
    async assignProjectToApartment(apartmentId, projectId) {
        //incase when creating apartment it was assigned to the wrong project
        const apartment = await this.findApartmentById(apartmentId);
        if (!apartment) {
            throw new common_1.NotFoundException(`Apartment with ID ${apartmentId} not found`);
        }
        const project = await this.projectRepository.findOne({ where: { id: projectId } });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${projectId} not found`);
        }
        apartment.project = project;
        return this.apartmentRepository.save(apartment);
    }
    async findAllUsers(page = 1, limit = 10) {
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
};
exports.ApartmentService = ApartmentService;
exports.ApartmentService = ApartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Apartment_1.Apartment)),
    __param(1, (0, typeorm_1.InjectRepository)(Project_1.Project)),
    __param(2, (0, typeorm_1.InjectRepository)(SalesPerson_1.SalesPerson)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ApartmentService);
//Room for improvement create for users authority rules and check the token who is able to use which function
