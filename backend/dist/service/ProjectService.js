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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Project_1 = require("../repositories/Project");
let ProjectService = class ProjectService {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async createProject(projectDto) {
        const project = this.projectRepository.create(projectDto);
        return await this.projectRepository.save(project);
    }
    async findAllProjects(page = 1, limit = 10) {
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
    async findApartmentsByProjectById(id, page = 1, limit = 10) {
        const project = await this.projectRepository.findOne({ where: { id } });
        if (!project) {
            return { project: null, apartments: [], total: 0, page, limit, totalPages: 0 };
        }
        const [apartments, total] = await this.apartmentRepository.findAndCount({
            where: { project: { id } },
            skip: (page - 1) * limit,
            take: limit,
            relations: ['salesPerson'],
        });
        return {
            project,
            apartments,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findApartmentsByProjectByName(name, page = 1, limit = 10) {
        const project = await this.projectRepository.findOne({ where: { name } });
        if (!project) {
            return { project: null, apartments: [], total: 0, page, limit, totalPages: 0 };
        }
        const [apartments, total] = await this.apartmentRepository.findAndCount({
            where: { project: { id: project.id } },
            skip: (page - 1) * limit,
            take: limit,
            relations: ['salesPerson'],
        });
        return {
            project,
            apartments,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Project_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectService);
