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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectDTO = exports.Project = void 0;
const typeorm_1 = require("typeorm");
const Apartment_1 = require("./Apartment");
const zod_1 = require("zod");
let Project = class Project {
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Project.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Apartment_1.Apartment, (apartment) => apartment.project),
    __metadata("design:type", Array)
], Project.prototype, "apartments", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)()
], Project);
exports.ProjectDTO = zod_1.z.object({
    name: zod_1.z.string().min(3),
    area: zod_1.z.string().min(3),
    address: zod_1.z.string().min(5),
    apartmentIds: zod_1.z.array(zod_1.z.number().min(1)),
});
