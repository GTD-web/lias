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
exports.ApprovalDraftController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const approval_service_1 = require("../approval.service");
const jwt_auth_guard_1 = require("../../../../common/guards/jwt-auth.guard");
let ApprovalDraftController = class ApprovalDraftController {
    constructor(approvalService) {
        this.approvalService = approvalService;
    }
};
exports.ApprovalDraftController = ApprovalDraftController;
exports.ApprovalDraftController = ApprovalDraftController = __decorate([
    (0, swagger_1.ApiTags)('기안 문서 관리'),
    (0, common_1.Controller)('documents'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [approval_service_1.ApprovalService])
], ApprovalDraftController);
//# sourceMappingURL=document.controller.js.map