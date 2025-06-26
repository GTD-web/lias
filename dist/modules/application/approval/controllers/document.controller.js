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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalDraftController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const approval_service_1 = require("../approval.service");
const dtos_1 = require("../dtos");
const jwt_auth_guard_1 = require("../../../../common/guards/jwt-auth.guard");
const pagination_query_dto_1 = require("../../../../common/dtos/pagination-query.dto");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
const user_decorator_1 = require("../../../../common/decorators/user.decorator");
const employee_entity_1 = require("../../../../database/entities/employee.entity");
let ApprovalDraftController = class ApprovalDraftController {
    constructor(approvalService) {
        this.approvalService = approvalService;
    }
    async createDraft(user, draftData) {
        return this.approvalService.createDraft(user, draftData);
    }
    async getDraftList(user, query, status, stepType) {
        return this.approvalService.getDraftList(user, query, status, stepType);
    }
    async getDraft(id) {
        return this.approvalService.getDraft(id);
    }
    async updateDraft(id, draftData) {
        return this.approvalService.updateDraft(id, draftData);
    }
    async deleteDraft(id) {
        return this.approvalService.deleteDraft(id);
    }
};
exports.ApprovalDraftController = ApprovalDraftController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '기안 문서 생성' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '기안 문서 생성 성공', type: dtos_1.ApprovalResponseDto }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, dtos_1.CreateDraftDocumentDto]),
    __metadata("design:returntype", Promise)
], ApprovalDraftController.prototype, "createDraft", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '기안 문서 목록 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '기안 문서 목록 조회 성공', type: dtos_1.ApprovalResponseDto }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        type: String,
        required: false,
        isArray: true,
        description: Object.values(approval_enum_1.ApprovalStatus).join(' / '),
    }),
    (0, swagger_1.ApiQuery)({
        name: 'stepType',
        type: String,
        required: false,
        isArray: true,
        description: Object.values(approval_enum_1.ApprovalStepType).join(' / '),
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('stepType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee,
        pagination_query_dto_1.PaginationQueryDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ApprovalDraftController.prototype, "getDraftList", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '기안 문서 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '기안 문서 조회 성공', type: dtos_1.ApprovalResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalDraftController.prototype, "getDraft", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '기안 문서 수정' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '기안 문서 수정 성공', type: dtos_1.ApprovalResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateDraftDocumentDto]),
    __metadata("design:returntype", Promise)
], ApprovalDraftController.prototype, "updateDraft", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '기안 문서 삭제' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: '기안 문서 삭제 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalDraftController.prototype, "deleteDraft", null);
exports.ApprovalDraftController = ApprovalDraftController = __decorate([
    (0, swagger_1.ApiTags)('기안 문서 관리'),
    (0, common_1.Controller)('documents'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [approval_service_1.ApprovalService])
], ApprovalDraftController);
//# sourceMappingURL=document.controller.js.map