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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const ProjectService_1 = require("../service/ProjectService");
const Project_1 = require("../repositories/Project");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async createProject(projectDto) {
        const parsed = Project_1.ProjectDTO.safeParse(projectDto);
        if (!parsed.success) {
            throw new Error('Validation failed');
        }
        const project = await this.projectService.createProject(projectDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Project created successfully',
            project,
        };
    }
    async getAllProjects(page = 1, limit = 10) {
        return this.projectService.findAllProjects(Number(page), Number(limit));
    }
    async getApartmentsByProjectId(id, page = 1, limit = 10) {
        const result = await this.projectService.findApartmentsByProjectById(id, page, limit);
        if (!result.project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Apartments retrieved successfully',
            result
        };
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "createProject", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getAllProjects", null);
__decorate([
    (0, common_1.Get)(':id/apartments'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getApartmentsByProjectId", null);
exports.ProjectController = ProjectController = __decorate([
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [ProjectService_1.ProjectService])
], ProjectController);
