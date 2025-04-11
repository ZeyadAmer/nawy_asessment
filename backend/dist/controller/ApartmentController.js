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
exports.ApartmentController = void 0;
const common_1 = require("@nestjs/common");
const ApartmentService_1 = require("../service/ApartmentService");
const Apartment_1 = require("../repositories/Apartment");
let ApartmentController = class ApartmentController {
    constructor(apartmentService) {
        this.apartmentService = apartmentService;
    }
    async createApartment(apartmentDto) {
        const apartment = await this.apartmentService.createApartment(apartmentDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Apartment created successfully',
            apartment,
        };
    }
    async getApartmentById(id) {
        const apartment = await this.apartmentService.findApartmentById(id);
        if (!apartment) {
            throw new common_1.NotFoundException(`Apartment with ID ${id} not found`);
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Apartment retrieved successfully',
            apartment,
        };
    }
    async getApartmentByName(name) {
        const apartment = await this.apartmentService.findApartmentByName(name);
        if (!apartment) {
            throw new common_1.NotFoundException(`Apartment with name ${name} not found`);
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Apartment retrieved successfully',
            apartment,
        };
    }
    async getAllApartments(page = 1, limit = 10) {
        const apartments = await this.apartmentService.findAllApartments(Number(page), Number(limit));
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Apartments retrieved successfully',
            apartments,
        };
    }
    async assignProject(apartmentId, projectId) {
        try {
            const apartment = await this.apartmentService.assignProjectToApartment(apartmentId, projectId);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Project assigned successfully',
                apartment,
            };
        }
        catch (error) {
            const err = error;
            throw new common_1.NotFoundException(err.message || 'Error assigning project');
        }
    }
};
exports.ApartmentController = ApartmentController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApartmentController.prototype, "createApartment", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApartmentController.prototype, "getApartmentById", null);
__decorate([
    (0, common_1.Get)('by-name/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApartmentController.prototype, "getApartmentByName", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ApartmentController.prototype, "getAllApartments", null);
__decorate([
    (0, common_1.Patch)(':apartmentId/assign-project/:projectId'),
    __param(0, (0, common_1.Param)('apartmentId')),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ApartmentController.prototype, "assignProject", null);
exports.ApartmentController = ApartmentController = __decorate([
    (0, common_1.Controller)('apartments'),
    __metadata("design:paramtypes", [ApartmentService_1.ApartmentService])
], ApartmentController);
