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
exports.ApprovalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const approval_service_1 = require("../approval.service");
const jwt_auth_guard_1 = require("../../../../common/guards/jwt-auth.guard");
const entities_1 = require("../../../../database/entities");
const user_decorator_1 = require("../../../../common/decorators/user.decorator");
let ApprovalController = class ApprovalController {
    constructor(approvalService) {
        this.approvalService = approvalService;
    }
    async approve(documentId, user) {
        await this.approvalService.approve(user, documentId);
    }
    async reject(documentId, user) {
        await this.approvalService.reject(user, documentId);
    }
    async implementation(documentId, user) {
        await this.approvalService.implementation(user, documentId);
    }
    async reference(documentId, user) {
        await this.approvalService.reference(user, documentId);
    }
};
exports.ApprovalController = ApprovalController;
__decorate([
    (0, common_1.Post)(':documentId/approve'),
    (0, swagger_1.ApiOperation)({ summary: '결재 승인' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '결재 승인 성공' }),
    __param(0, (0, common_1.Param)('documentId')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.Employee]),
    __metadata("design:returntype", Promise)
], ApprovalController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':documentId/reject'),
    (0, swagger_1.ApiOperation)({ summary: '결재 반려' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '결재 반려 성공' }),
    __param(0, (0, common_1.Param)('documentId')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.Employee]),
    __metadata("design:returntype", Promise)
], ApprovalController.prototype, "reject", null);
__decorate([
    (0, common_1.Post)(':documentId/implementation'),
    (0, swagger_1.ApiOperation)({ summary: '시행' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '시행 성공' }),
    __param(0, (0, common_1.Param)('documentId')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.Employee]),
    __metadata("design:returntype", Promise)
], ApprovalController.prototype, "implementation", null);
__decorate([
    (0, common_1.Post)(':documentId/reference'),
    (0, swagger_1.ApiOperation)({ summary: '열람' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '열람 성공' }),
    __param(0, (0, common_1.Param)('documentId')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.Employee]),
    __metadata("design:returntype", Promise)
], ApprovalController.prototype, "reference", null);
exports.ApprovalController = ApprovalController = __decorate([
    (0, swagger_1.ApiTags)('결재 관리'),
    (0, common_1.Controller)(''),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [approval_service_1.ApprovalService])
], ApprovalController);
//# sourceMappingURL=approval.controller.js.map