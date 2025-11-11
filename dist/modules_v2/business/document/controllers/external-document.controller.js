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
exports.ExternalDocumentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../dtos");
const usecases_1 = require("../usecases");
const jwt_auth_guard_1 = require("../../../../common/guards/jwt-auth.guard");
const user_decorator_1 = require("../../../../common/decorators/user.decorator");
const employee_entity_1 = require("../../../domain/employee/employee.entity");
let ExternalDocumentController = class ExternalDocumentController {
    constructor(createExternalDocumentUsecase) {
        this.createExternalDocumentUsecase = createExternalDocumentUsecase;
    }
    async createExternalDocument(user, dto) {
        return await this.createExternalDocumentUsecase.execute(user.id, dto);
    }
};
exports.ExternalDocumentController = ExternalDocumentController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '외부 문서 생성 (양식 선택 없음)',
        description: '외부 시스템에서 문서를 직접 생성합니다. 양식 선택 없이 문서 제목과 내용만으로 생성됩니다.\n\n' +
            '**주요 특징:**\n' +
            '- formVersionId가 필요 없습니다\n' +
            '- customApprovalSteps로 결재선을 지정할 수 있습니다\n' +
            '- 결재선이 지정되면 문서 생성 시 즉시 스냅샷이 생성됩니다\n' +
            '- 외부 시스템 통합에 최적화된 API입니다\n\n' +
            '**결재선 처리:**\n' +
            '- customApprovalSteps가 있으면 해당 결재선으로 스냅샷 생성\n' +
            '- customApprovalSteps가 없으면 자동 계층적 결재선 생성\n' +
            '- 양식이 없으므로 외부 문서용 결재선 처리 로직 사용\n\n' +
            '**문서 상태:**\n' +
            '- 문서 생성 후 즉시 PENDING 상태로 변경\n' +
            '- 결재 프로세스가 자동으로 시작됩니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 외부 문서 생성 (양식 없음)\n' +
            '- ✅ 정상: 외부 문서 생성 + 결재선 지정\n' +
            '- ✅ 정상: customApprovalSteps로 결재선 커스터마이징\n' +
            '- ✅ 정상: 자동 계층적 결재선 생성\n' +
            '- ❌ 실패: 필수 필드 누락 (title, content)\n' +
            '- ❌ 실패: 기안자 부서 정보 없음\n' +
            '- ❌ 실패: 인증 토큰 없음 (401 반환)',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '외부 문서 생성 성공', type: dtos_1.DocumentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee,
        dtos_1.CreateExternalDocumentRequestDto]),
    __metadata("design:returntype", Promise)
], ExternalDocumentController.prototype, "createExternalDocument", null);
exports.ExternalDocumentController = ExternalDocumentController = __decorate([
    (0, swagger_1.ApiTags)('외부 문서 관리'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('external'),
    __metadata("design:paramtypes", [usecases_1.CreateExternalDocumentUsecase])
], ExternalDocumentController);
//# sourceMappingURL=external-document.controller.js.map