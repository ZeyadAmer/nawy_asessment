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
exports.ApartmentDTO = exports.Apartment = void 0;
const typeorm_1 = require("typeorm");
const CurrencyCode_enum_1 = require("../enums/CurrencyCode.enum");
const Project_1 = require("./Project");
const SalesPerson_1 = require("./SalesPerson");
const zod_1 = require("zod");
let Apartment = class Apartment {
};
exports.Apartment = Apartment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Apartment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Apartment.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Apartment.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: CurrencyCode_enum_1.CurrencyCode, default: CurrencyCode_enum_1.CurrencyCode.EGP }),
    __metadata("design:type", String)
], Apartment.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)("integer"),
    __metadata("design:type", Number)
], Apartment.prototype, "floor", void 0);
__decorate([
    (0, typeorm_1.Column)("integer"),
    __metadata("design:type", Number)
], Apartment.prototype, "rooms", void 0);
__decorate([
    (0, typeorm_1.Column)("integer"),
    __metadata("design:type", Number)
], Apartment.prototype, "toilets", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean"),
    __metadata("design:type", Boolean)
], Apartment.prototype, "hasParking", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Project_1.Project, (project) => project.apartments),
    __metadata("design:type", Project_1.Project)
], Apartment.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SalesPerson_1.SalesPerson, (salesPerson) => salesPerson.apartments),
    __metadata("design:type", SalesPerson_1.SalesPerson)
], Apartment.prototype, "salesPerson", void 0);
exports.Apartment = Apartment = __decorate([
    (0, typeorm_1.Entity)()
], Apartment);
exports.ApartmentDTO = zod_1.z.object({
    name: zod_1.z.string().min(3),
    price: zod_1.z.number().min(0),
    currency: zod_1.z.nativeEnum(CurrencyCode_enum_1.CurrencyCode),
    floor: zod_1.z.number().min(0),
    rooms: zod_1.z.number().min(1),
    toilets: zod_1.z.number().min(1),
    hasParking: zod_1.z.boolean(),
    projectId: zod_1.z.number().min(1),
    salesPersonId: zod_1.z.number().min(1),
});
// Search and Filter Functionality: Enable searching on the apartment listing
// page by unit name, unit number, or project.
