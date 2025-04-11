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
exports.SalesPersonDTO = exports.SalesPerson = void 0;
const typeorm_1 = require("typeorm");
const Apartment_1 = require("./Apartment");
const zod_1 = require("zod");
let SalesPerson = class SalesPerson {
};
exports.SalesPerson = SalesPerson;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SalesPerson.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SalesPerson.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SalesPerson.prototype, "contactNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SalesPerson.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SalesPerson.prototype, "additionalInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Apartment_1.Apartment, (apartment) => apartment.project),
    __metadata("design:type", Array)
], SalesPerson.prototype, "apartments", void 0);
exports.SalesPerson = SalesPerson = __decorate([
    (0, typeorm_1.Entity)()
], SalesPerson);
exports.SalesPersonDTO = zod_1.z.object({
    name: zod_1.z.string().min(3),
    contactNumber: zod_1.z.string().min(10).max(15),
    email: zod_1.z.string().email(),
    additionalInfo: zod_1.z.string().optional(),
    apartmentId: zod_1.z.number().min(1),
});
