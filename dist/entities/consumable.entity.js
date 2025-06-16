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
exports.Consumable = void 0;
const typeorm_1 = require("typeorm");
const vehicle_info_entity_1 = require("./vehicle-info.entity");
const maintenance_entity_1 = require("./maintenance.entity");
let Consumable = class Consumable {
};
exports.Consumable = Consumable;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], Consumable.prototype, "consumableId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Consumable.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Consumable.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Consumable.prototype, "replaceCycle", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Consumable.prototype, "notifyReplacementCycle", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Consumable.prototype, "initMileage", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Consumable.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_info_entity_1.VehicleInfo),
    (0, typeorm_1.JoinColumn)({ name: 'vehicleInfoId', referencedColumnName: 'vehicleInfoId' }),
    __metadata("design:type", vehicle_info_entity_1.VehicleInfo)
], Consumable.prototype, "vehicleInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => maintenance_entity_1.Maintenance, (maintenance) => maintenance.consumable),
    __metadata("design:type", Array)
], Consumable.prototype, "maintenances", void 0);
exports.Consumable = Consumable = __decorate([
    (0, typeorm_1.Entity)('consumables')
], Consumable);
//# sourceMappingURL=consumable.entity.js.map