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
exports.VehicleInfo = void 0;
const typeorm_1 = require("typeorm");
const resource_entity_1 = require("./resource.entity");
const consumable_entity_1 = require("./consumable.entity");
let VehicleInfo = class VehicleInfo {
};
exports.VehicleInfo = VehicleInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], VehicleInfo.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VehicleInfo.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VehicleInfo.prototype, "vehicleNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], VehicleInfo.prototype, "leftMileage", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], VehicleInfo.prototype, "totalMileage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VehicleInfo.prototype, "insuranceName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VehicleInfo.prototype, "insuranceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, comment: '주차위치 이미지 배열' }),
    __metadata("design:type", Array)
], VehicleInfo.prototype, "parkingLocationImages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, comment: '계기판 이미지 배열' }),
    __metadata("design:type", Array)
], VehicleInfo.prototype, "odometerImages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, comment: '차량 실내 이미지 배열' }),
    __metadata("design:type", Array)
], VehicleInfo.prototype, "indoorImages", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => resource_entity_1.Resource, (resource) => resource.vehicleInfo),
    (0, typeorm_1.JoinColumn)({ name: `resourceId` }),
    __metadata("design:type", resource_entity_1.Resource)
], VehicleInfo.prototype, "resource", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => consumable_entity_1.Consumable, (consumable) => consumable.vehicleInfo),
    __metadata("design:type", Array)
], VehicleInfo.prototype, "consumables", void 0);
exports.VehicleInfo = VehicleInfo = __decorate([
    (0, typeorm_1.Entity)('vehicle_infos')
], VehicleInfo);
//# sourceMappingURL=vehicle-info.entity.js.map