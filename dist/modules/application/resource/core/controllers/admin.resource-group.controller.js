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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminResourceGroupController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const create_resource_dto_1 = require("@src/application/resource/core/dtos/create-resource.dto");
const resource_response_dto_1 = require("@src/application/resource/core/dtos/resource-response.dto");
const update_resource_dto_1 = require("@src/application/resource/core/dtos/update-resource.dto");
const resource_group_service_1 = require("@src/application/resource/core/services/resource-group.service");
let AdminResourceGroupController = class AdminResourceGroupController {
    constructor(resourceGroupService) {
        this.resourceGroupService = resourceGroupService;
    }
    async findParentResourceGroups() {
        return this.resourceGroupService.findParentResourceGroups();
    }
    async findAll(type) {
        return this.resourceGroupService.findResourceGroupsWithResourceData(type);
    }
    async create(createResourceGroupDto) {
        return this.resourceGroupService.createResourceGroup(createResourceGroupDto);
    }
    async updateOrder(updateResourceGroupOrdersDto) {
        return this.resourceGroupService.reorderResourceGroups(updateResourceGroupOrdersDto);
    }
    async update(resourceGroupId, updateResourceGroupDto) {
        return this.resourceGroupService.updateResourceGroup(resourceGroupId, updateResourceGroupDto);
    }
    async remove(resourceGroupId) {
        return this.resourceGroupService.deleteResourceGroup(resourceGroupId);
    }
};
exports.AdminResourceGroupController = AdminResourceGroupController;
__decorate([
    (0, common_1.Get)('parents'),
    (0, swagger_1.ApiOperation)({ summary: '상위그룹 목록 조회 #사용자/자원구분/모달' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '상위 자원 그룹 목록을 조회했습니다.',
        type: [resource_response_dto_1.ResourceGroupResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminResourceGroupController.prototype, "findParentResourceGroups", null);
__decorate([
    (0, common_1.Get)('resources'),
    (0, swagger_1.ApiOperation)({ summary: '상위그룹-하위그룹-자원 목록 조회 #사용자/자원선택/모달 #관리자/자원관리/자원목록' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '자원 그룹들과 각 그룹에 속한 자원 목록을 조회했습니다.',
        type: [resource_response_dto_1.ResourceGroupWithResourcesResponseDto],
    }),
    (0, swagger_1.ApiQuery)({ name: 'type', enum: resource_type_enum_1.ResourceType, required: false }),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AdminResourceGroupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '자원 그룹 생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 201,
        description: '자원 그룹이 생성되었습니다.',
        type: resource_response_dto_1.ResourceGroupResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_resource_dto_1.CreateResourceGroupDto !== "undefined" && create_resource_dto_1.CreateResourceGroupDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AdminResourceGroupController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('order'),
    (0, swagger_1.ApiOperation)({ summary: '자원 그룹 순서 변경' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '자원 그룹 순서가 성공적으로 변경되었습니다.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof update_resource_dto_1.UpdateResourceGroupOrdersDto !== "undefined" && update_resource_dto_1.UpdateResourceGroupOrdersDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AdminResourceGroupController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.Patch)(':resourceGroupId'),
    (0, swagger_1.ApiOperation)({ summary: '자원 그룹 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '자원 그룹이 수정되었습니다.',
        type: resource_response_dto_1.ResourceGroupResponseDto,
    }),
    __param(0, (0, common_1.Param)('resourceGroupId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof update_resource_dto_1.UpdateResourceGroupDto !== "undefined" && update_resource_dto_1.UpdateResourceGroupDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AdminResourceGroupController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':resourceGroupId'),
    (0, swagger_1.ApiOperation)({ summary: '자원 그룹 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        description: '자원 그룹이 삭제되었습니다.',
    }),
    __param(0, (0, common_1.Param)('resourceGroupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminResourceGroupController.prototype, "remove", null);
exports.AdminResourceGroupController = AdminResourceGroupController = __decorate([
    (0, swagger_1.ApiTags)('3. 자원 그룹 - 관리자 '),
    (0, common_1.Controller)('v1/admin/resource-groups'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.SYSTEM_ADMIN),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_group_service_1.ResourceGroupService !== "undefined" && resource_group_service_1.ResourceGroupService) === "function" ? _a : Object])
], AdminResourceGroupController);
//# sourceMappingURL=admin.resource-group.controller.js.map