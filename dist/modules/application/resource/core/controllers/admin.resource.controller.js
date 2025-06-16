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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminResourceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const resource_response_dto_1 = require("@src/application/resource/core/dtos/resource-response.dto");
const create_resource_dto_1 = require("@src/application/resource/core/dtos/create-resource.dto");
const update_resource_dto_1 = require("@src/application/resource/core/dtos/update-resource.dto");
const resource_service_1 = require("@src/application/resource/core/services/resource.service");
let AdminResourceController = class AdminResourceController {
    constructor(resourceService) {
        this.resourceService = resourceService;
    }
    async createWithInfos(createResourceInfo) {
        return this.resourceService.createResourceWithInfos(createResourceInfo);
    }
    async findAll(type) {
        return this.resourceService.findResources(type);
    }
    async findOne(resourceId) {
        return this.resourceService.findResourceDetailForAdmin(resourceId);
    }
    async reorder(updateResourceOrdersDto) {
        return this.resourceService.reorderResources(updateResourceOrdersDto);
    }
    async update(resourceId, updateResourceInfoDto) {
        return this.resourceService.updateResource(resourceId, updateResourceInfoDto);
    }
    async updateAvailability(resourceId, updateResourceInfoDto) {
        return this.resourceService.updateResource(resourceId, updateResourceInfoDto);
    }
    async remove(resourceId) {
        return this.resourceService.deleteResource(resourceId);
    }
};
exports.AdminResourceController = AdminResourceController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '자원 생성 #관리자/자원관리/생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 201,
        description: '자원이 성공적으로 생성되었습니다.',
        type: resource_response_dto_1.CreateResourceResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_resource_dto_1.CreateResourceInfoDto !== "undefined" && create_resource_dto_1.CreateResourceInfoDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AdminResourceController.prototype, "createWithInfos", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '자원 목록 조회 #관리자/자원관리/자원리스트' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원 목록을 성공적으로 조회했습니다.',
        type: [resource_response_dto_1.ResourceResponseDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'type', enum: resource_type_enum_1.ResourceType }),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AdminResourceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':resourceId'),
    (0, swagger_1.ApiOperation)({ summary: '자원 상세 조회 #관리자/자원관리/상세' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원을 성공적으로 조회했습니다.',
        type: resource_response_dto_1.ResourceResponseDto,
    }),
    __param(0, (0, common_1.Param)('resourceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminResourceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('order'),
    (0, swagger_1.ApiOperation)({ summary: '자원 순서 변경' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원 순서가 성공적으로 변경되었습니다.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof update_resource_dto_1.UpdateResourceOrdersDto !== "undefined" && update_resource_dto_1.UpdateResourceOrdersDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AdminResourceController.prototype, "reorder", null);
__decorate([
    (0, common_1.Patch)(':resourceId'),
    (0, swagger_1.ApiOperation)({ summary: '자원 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원이 성공적으로 수정되었습니다.',
        type: resource_response_dto_1.ResourceResponseDto,
    }),
    __param(0, (0, common_1.Param)('resourceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof update_resource_dto_1.UpdateResourceInfoDto !== "undefined" && update_resource_dto_1.UpdateResourceInfoDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AdminResourceController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':resourceId/availability'),
    (0, swagger_1.ApiOperation)({ summary: '자원 예약 가능 상태 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원이 성공적으로 수정되었습니다.',
        type: resource_response_dto_1.ResourceResponseDto,
    }),
    __param(0, (0, common_1.Param)('resourceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof update_resource_dto_1.UpdateResourceInfoDto !== "undefined" && update_resource_dto_1.UpdateResourceInfoDto) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], AdminResourceController.prototype, "updateAvailability", null);
__decorate([
    (0, common_1.Delete)(':resourceId'),
    (0, swagger_1.ApiOperation)({ summary: '자원 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원이 성공적으로 삭제되었습니다.',
    }),
    __param(0, (0, common_1.Param)('resourceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminResourceController.prototype, "remove", null);
exports.AdminResourceController = AdminResourceController = __decorate([
    (0, swagger_1.ApiTags)('3. 자원 - 관리자 '),
    (0, common_1.Controller)('v1/admin/resources'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.ResourceService !== "undefined" && resource_service_1.ResourceService) === "function" ? _a : Object])
], AdminResourceController);
//# sourceMappingURL=admin.resource.controller.js.map