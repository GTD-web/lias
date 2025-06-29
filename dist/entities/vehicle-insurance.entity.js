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
exports.VehicleInsurance = void 0;
const typeorm_1 = require("typeorm");
let VehicleInsurance = class VehicleInsurance {
};
exports.VehicleInsurance = VehicleInsurance;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], VehicleInsurance.prototype, "vehicleInsuranceId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VehicleInsurance.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VehicleInsurance.prototype, "insuranceCompanyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VehicleInsurance.prototype, "policyNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], VehicleInsurance.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], VehicleInsurance.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VehicleInsurance.prototype, "coverage", void 0);
exports.VehicleInsurance = VehicleInsurance = __decorate([
    (0, typeorm_1.Entity)('vehicle_insurances')
], VehicleInsurance);
//# sourceMappingURL=vehicle-insurance.entity.js.map