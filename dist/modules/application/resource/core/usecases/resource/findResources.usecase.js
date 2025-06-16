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
exports.FindResourcesUsecase = void 0;
const common_1 = require("@nestjs/common");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const resource_response_dto_1 = require("../../dtos/resource-response.dto");
const resource_service_1 = require("@src/domain/resource/resource.service");
let FindResourcesUsecase = class FindResourcesUsecase {
    constructor(resourceService) {
        this.resourceService = resourceService;
    }
    async execute(type) {
        let relations = [];
        if (type === resource_type_enum_1.ResourceType.VEHICLE) {
            relations = ['vehicleInfo', 'vehicleInfo.consumables'];
        }
        else if (type === resource_type_enum_1.ResourceType.MEETING_ROOM) {
            relations = ['meetingRoomInfo'];
        }
        else if (type === resource_type_enum_1.ResourceType.ACCOMMODATION) {
            relations = ['accommodationInfo'];
        }
        else if (type === resource_type_enum_1.ResourceType.EQUIPMENT) {
            relations = ['equipmentInfo'];
        }
        const resources = await this.resourceService.findAll({
            where: {
                type: type,
            },
            relations: relations,
        });
        return resources.map((resource) => new resource_response_dto_1.ResourceResponseDto(resource));
    }
};
exports.FindResourcesUsecase = FindResourcesUsecase;
exports.FindResourcesUsecase = FindResourcesUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.DomainResourceService !== "undefined" && resource_service_1.DomainResourceService) === "function" ? _a : Object])
], FindResourcesUsecase);
//# sourceMappingURL=findResources.usecase.js.map