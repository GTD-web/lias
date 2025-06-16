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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maintenance = void 0;
const typeorm_1 = require("typeorm");
const consumable_entity_1 = require("./consumable.entity");
let Maintenance = class Maintenance {
};
exports.Maintenance = Maintenance;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], Maintenance.prototype, "maintenanceId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Maintenance.prototype, "consumableId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Maintenance.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Maintenance.prototype, "mileage", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Maintenance.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true, comment: '정비사진 배열' }),
    __metadata("design:type", Array)
], Maintenance.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Maintenance.prototype, "maintananceBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Maintenance.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Maintenance.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => consumable_entity_1.Consumable),
    (0, typeorm_1.JoinColumn)({ name: 'consumableId' }),
    __metadata("design:type", typeof (_a = typeof consumable_entity_1.Consumable !== "undefined" && consumable_entity_1.Consumable) === "function" ? _a : Object)
], Maintenance.prototype, "consumable", void 0);
exports.Maintenance = Maintenance = __decorate([
    (0, typeorm_1.Entity)('maintenances')
], Maintenance);
//# sourceMappingURL=maintenance.entity.js.map