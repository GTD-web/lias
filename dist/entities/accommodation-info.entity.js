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
exports.AccommodationInfo = void 0;
const typeorm_1 = require("typeorm");
const resource_entity_1 = require("./resource.entity");
let AccommodationInfo = class AccommodationInfo {
};
exports.AccommodationInfo = AccommodationInfo;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], AccommodationInfo.prototype, "accommodationInfoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AccommodationInfo.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => resource_entity_1.Resource, (resource) => resource.accommodationInfo),
    (0, typeorm_1.JoinColumn)({ name: 'resourceId' }),
    __metadata("design:type", resource_entity_1.Resource)
], AccommodationInfo.prototype, "resource", void 0);
exports.AccommodationInfo = AccommodationInfo = __decorate([
    (0, typeorm_1.Entity)('accommodation_infos')
], AccommodationInfo);
//# sourceMappingURL=accommodation-info.entity.js.map