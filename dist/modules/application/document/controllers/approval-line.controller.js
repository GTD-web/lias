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
exports.ApprovalLineController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("../../../../common/decorators/api-responses.decorator");
const document_service_1 = require("../document.service");
const approval_line_dto_1 = require("../dtos/approval-line.dto");
const employee_entity_1 = require("../../../../database/entities/employee.entity");
const user_decorator_1 = require("../../../../common/decorators/user.decorator");
const pagination_query_dto_1 = require("../../../../common/dtos/pagination-query.dto");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
let ApprovalLineController = class ApprovalLineController {
    constructor(documentService) {
        this.documentService = documentService;
    }
    async createApprovalLine(user, createFormApprovalLineDto) {
        const approvalLine = await this.documentService.createApprovalLine(user, createFormApprovalLineDto);
        return approvalLine;
    }
    async findAllApprovalLines(query, type) {
        return await this.documentService.findApprovalLines(query.page, query.limit, type);
    }
    async findApprovalLineById(id) {
        return await this.documentService.findApprovalLineById(id);
    }
    async updateApprovalLineById(user, id, updateFormApprovalLineDto) {
        const approvalLine = await this.documentService.updateApprovalLine(user, updateFormApprovalLineDto);
        return approvalLine;
    }
    async deleteApprovalLineById(id) {
        return await this.documentService.deleteApprovalLine(id);
    }
};
exports.ApprovalLineController = ApprovalLineController;
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: '결재선 생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '결재선을 성공적으로 생성했습니다.',
        type: approval_line_dto_1.FormApprovalLineResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee,
        approval_line_dto_1.CreateFormApprovalLineDto]),
    __metadata("design:returntype", Promise)
], ApprovalLineController.prototype, "createApprovalLine", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: '결재선 목록 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '결재선 목록을 성공적으로 조회했습니다.',
        type: [approval_line_dto_1.FormApprovalLineResponseDto],
        isPaginated: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        type: Number,
        required: false,
        description: '페이지 번호',
        example: 1,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        type: Number,
        required: false,
        description: '페이지당 아이템 수',
        example: 10,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'type',
        type: String,
        enum: approval_enum_1.ApprovalLineType,
        required: false,
        description: '결재선 타입',
        example: 'COMMON',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto, String]),
    __metadata("design:returntype", Promise)
], ApprovalLineController.prototype, "findAllApprovalLines", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '결재선 상세 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '결재선을 성공적으로 상세 조회했습니다.',
        type: approval_line_dto_1.FormApprovalLineResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalLineController.prototype, "findApprovalLineById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '결재선 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '결재선을 성공적으로 수정했습니다.',
        type: approval_line_dto_1.FormApprovalLineResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, String, approval_line_dto_1.UpdateFormApprovalLineDto]),
    __metadata("design:returntype", Promise)
], ApprovalLineController.prototype, "updateApprovalLineById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '결재선 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '결재선을 성공적으로 삭제했습니다.',
        type: 'boolean',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalLineController.prototype, "deleteApprovalLineById", null);
exports.ApprovalLineController = ApprovalLineController = __decorate([
    (0, swagger_1.ApiTags)('결재선'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('approval-lines'),
    __metadata("design:paramtypes", [document_service_1.DocumentService])
], ApprovalLineController);
//# sourceMappingURL=approval-line.controller.js.map