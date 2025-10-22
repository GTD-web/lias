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
exports.ApprovalFlowController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const usecases_1 = require("../usecases");
const dtos_1 = require("../dtos");
const jwt_auth_guard_1 = require("../../../../common/guards/jwt-auth.guard");
const user_decorator_1 = require("../../../../common/decorators/user.decorator");
const employee_entity_1 = require("../../../domain/employee/employee.entity");
const approval_flow_context_1 = require("../../../context/approval-flow/approval-flow.context");
let ApprovalFlowController = class ApprovalFlowController {
    constructor(createFormWithApprovalLineUsecase, updateFormVersionUsecase, cloneApprovalLineTemplateUsecase, createApprovalLineTemplateVersionUsecase, createApprovalLineTemplateUsecase, createApprovalSnapshotUsecase, previewApprovalLineUsecase, approvalFlowContext) {
        this.createFormWithApprovalLineUsecase = createFormWithApprovalLineUsecase;
        this.updateFormVersionUsecase = updateFormVersionUsecase;
        this.cloneApprovalLineTemplateUsecase = cloneApprovalLineTemplateUsecase;
        this.createApprovalLineTemplateVersionUsecase = createApprovalLineTemplateVersionUsecase;
        this.createApprovalLineTemplateUsecase = createApprovalLineTemplateUsecase;
        this.createApprovalSnapshotUsecase = createApprovalSnapshotUsecase;
        this.previewApprovalLineUsecase = previewApprovalLineUsecase;
        this.approvalFlowContext = approvalFlowContext;
    }
    async createFormWithApprovalLine(user, dto) {
        return this.createFormWithApprovalLineUsecase.execute(user.id, dto);
    }
    async updateFormVersion(user, formId, dto) {
        if (dto.formId && dto.formId !== formId) {
            throw new common_1.BadRequestException('URL의 formId와 body의 formId가 일치하지 않습니다');
        }
        return this.updateFormVersionUsecase.execute(user.id, { ...dto, formId });
    }
    async createApprovalLineTemplate(user, dto) {
        return this.createApprovalLineTemplateUsecase.execute(user.id, dto);
    }
    async cloneApprovalLineTemplate(user, dto) {
        return this.cloneApprovalLineTemplateUsecase.execute(user.id, dto);
    }
    async createApprovalLineTemplateVersion(user, templateId, dto) {
        if (dto.templateId && dto.templateId !== templateId) {
            throw new common_1.BadRequestException('URL의 templateId와 body의 templateId가 일치하지 않습니다');
        }
        return this.createApprovalLineTemplateVersionUsecase.execute(user.id, { ...dto, templateId });
    }
    async createApprovalSnapshot(dto) {
        return this.createApprovalSnapshotUsecase.execute(dto);
    }
    async getApprovalLineTemplates(type) {
        return await this.approvalFlowContext.getApprovalLineTemplates(type);
    }
    async getApprovalLineTemplate(templateId) {
        return await this.approvalFlowContext.getApprovalLineTemplateById(templateId);
    }
    async getApprovalLineTemplateVersion(templateId, versionId) {
        return await this.approvalFlowContext.getApprovalLineTemplateVersion(templateId, versionId);
    }
    async getForms() {
        return await this.approvalFlowContext.getForms();
    }
    async getForm(formId) {
        return await this.approvalFlowContext.getFormById(formId);
    }
    async getFormVersion(formId, versionId) {
        return await this.approvalFlowContext.getFormVersion(formId, versionId);
    }
    async previewApprovalLine(employee, formId, dto) {
        return await this.previewApprovalLineUsecase.execute(employee.id, formId, dto);
    }
};
exports.ApprovalFlowController = ApprovalFlowController;
__decorate([
    (0, common_1.Post)('forms'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '문서양식 생성 & 결재선 연결',
        description: '새로운 문서양식을 생성하고 결재선을 연결합니다. ' +
            '기존 결재선을 참조하거나(useExistingLine=true) 복제 후 수정(useExistingLine=false)할 수 있습니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 복제 후 수정 방식으로 문서양식 생성\n' +
            '- ✅ 기존 결재선 참조하여 문서양식 생성\n' +
            '- ❌ 필수 필드 누락 (formName, formCode)\n' +
            '- ❌ useExistingLine=true인데 lineTemplateVersionId 누락\n' +
            '- ❌ useExistingLine=false인데 baseLineTemplateVersionId 누락\n' +
            '- ❌ 존재하지 않는 결재선 템플릿 버전 ID (404 반환)',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: '문서양식 생성 성공',
        type: dtos_1.CreateFormResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: '잘못된 요청 (필수 파라미터 누락 등)',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee,
        dtos_1.CreateFormRequestDto]),
    __metadata("design:returntype", Promise)
], ApprovalFlowController.prototype, "createFormWithApprovalLine", null);
__decorate([
    (0, common_1.Patch)('forms/:formId/versions'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '문서양식 수정 (새 버전 생성)',
        description: '문서양식을 수정합니다. 기존 버전은 불변으로 유지하고 새 버전을 생성합니다. ' +
            '결재선도 변경 가능하며, 복제 후 수정도 지원합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 문서양식 템플릿 수정 (새 버전 생성)\n' +
            '- ✅ 결재선도 함께 변경\n' +
            '- ❌ 존재하지 않는 문서양식 ID (404 반환)',
    }),
    (0, swagger_1.ApiParam)({ name: 'formId', description: '문서양식 ID', example: 'form-123' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '문서양식 수정 성공',
        type: dtos_1.UpdateFormVersionResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: '문서양식을 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('formId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, String, dtos_1.UpdateFormVersionRequestDto]),
    __metadata("design:returntype", Promise)
], ApprovalFlowController.prototype, "updateFormVersion", null);
__decorate([
    (0, common_1.Post)('templates'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '새로운 결재선 템플릿 생성',
        description: '완전히 새로운 결재선 템플릿을 생성합니다. ' +
            '템플릿 생성 시 첫 번째 버전(v1)이 자동으로 생성됩니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 새로운 결재선 템플릿 생성\n' +
            '- ❌ 필수 필드 누락 (name, steps)\n' +
            '- ❌ steps가 빈 배열 (400 반환)\n' +
            '- ❌ step에 필수 필드 누락 (assigneeRule)',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: '결재선 템플릿 생성 성공',
        type: dtos_1.ApprovalLineTemplateResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: '잘못된 요청 (필수 파라미터 누락 등)',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee,
        dtos_1.CreateApprovalLineTemplateRequestDto]),
    __metadata("design:returntype", Promise)
], ApprovalFlowController.prototype, "createApprovalLineTemplate", null);
__decorate([
    (0, common_1.Post)('templates/clone'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '결재선 템플릿 복제 (Detach & Clone)',
        description: '기존 결재선 템플릿을 복제합니다. ' +
            'newTemplateName이 있으면 새 템플릿을 생성(분기)하고, 없으면 원본 템플릿에 새 버전을 추가합니다. ' +
            '복제 시 단계를 수정할 수 있습니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 같은 템플릿의 새 버전으로 복제\n' +
            '- ✅ 새로운 템플릿으로 분기\n' +
            '- ❌ 필수 필드 누락 (baseTemplateVersionId)\n' +
            '- ❌ 존재하지 않는 소스 템플릿 버전 ID (404 반환)',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: '결재선 템플릿 복제 성공',
        type: dtos_1.ApprovalLineTemplateVersionResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: '원본 결재선 템플릿을 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee,
        dtos_1.CloneTemplateRequestDto]),
    __metadata("design:returntype", Promise)
], ApprovalFlowController.prototype, "cloneApprovalLineTemplate", null);
__decorate([
    (0, common_1.Post)('templates/:templateId/versions'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '결재선 템플릿 새 버전 생성',
        description: '기존 결재선 템플릿의 새 버전을 생성합니다. 기존 버전은 비활성화되고 새 버전이 활성화됩니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 결재선 템플릿의 새 버전 생성\n' +
            '- ❌ 존재하지 않는 템플릿 ID (404 반환)\n' +
            '- ❌ 필수 필드 누락 (steps)',
    }),
    (0, swagger_1.ApiParam)({ name: 'templateId', description: '결재선 템플릿 ID', example: 'template-123' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: '새 버전 생성 성공',
        type: dtos_1.ApprovalLineTemplateVersionResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: '결재선 템플릿을 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('templateId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, String, dtos_1.CreateTemplateVersionRequestDto]),
    __metadata("design:returntype", Promise)
], ApprovalFlowController.prototype, "createApprovalLineTemplateVersion", null);
__decorate([
    (0, common_1.Post)('snapshots'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '결재 스냅샷 생성 (기안 시 호출)',
        description: '문서 기안 시 호출됩니다. ' +
            '결재선 템플릿의 assignee_rule을 기안 컨텍스트로 해석하여 실제 결재자를 확정하고 스냅샷으로 저장합니다. ' +
            '이후 결재선 템플릿이 변경되어도 기안된 문서의 결재선은 변경되지 않습니다.\n\n' +
            '**참고:** 이 API는 주로 문서 제출(POST /v2/documents/:documentId/submit) 프로세스 내에서 내부적으로 호출됩니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: '결재 스냅샷 생성 성공',
        type: dtos_1.ApprovalSnapshotResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: '문서양식 버전을 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: '결재자를 찾을 수 없음 (assignee_rule 해석 실패)',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateSnapshotRequestDto]),
    __metadata("design:returntype", Promise)
], ApprovalFlowController.prototype, "createApprovalSnapshot", null);
__decorate([
    (0, common_1.Get)('templates'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '결재선 템플릿 목록 조회',
        description: '등록된 결재선 템플릿 목록을 조회합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 모든 결재선 템플릿 조회\n' +
            '- ✅ 타입별 필터링',
    }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, description: '템플릿 유형 (COMMON, DEDICATED 등)' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '결재선 템플릿 목록 조회 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalFlowController.prototype, "getApprovalLineTemplates", null);
__decorate([
    (0, common_1.Get)('templates/:templateId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '결재선 템플릿 상세 조회',
        description: '특정 결재선 템플릿의 상세 정보를 조회합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 특정 결재선 템플릿 조회\n' +
            '- ❌ 존재하지 않는 템플릿 ID (404 반환)',
    }),
    (0, swagger_1.ApiParam)({ name: 'templateId', description: '결재선 템플릿 ID' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '결재선 템플릿 조회 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: '결재선 템플릿을 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Param)('templateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalFlowController.prototype, "getApprovalLineTemplate", null);
__decorate([
    (0, common_1.Get)('templates/:templateId/versions/:versionId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '결재선 템플릿 버전 상세 조회',
        description: '특정 결재선 템플릿의 특정 버전 상세 정보를 조회합니다.',
    }),
    (0, swagger_1.ApiParam)({ name: 'templateId', description: '결재선 템플릿 ID' }),
    (0, swagger_1.ApiParam)({ name: 'versionId', description: '결재선 템플릿 버전 ID' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '결재선 템플릿 버전 상세 조회 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: '결재선 템플릿 버전을 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Param)('templateId')),
    __param(1, (0, common_1.Param)('versionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ApprovalFlowController.prototype, "getApprovalLineTemplateVersion", null);
__decorate([
    (0, common_1.Get)('forms'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '문서양식 목록 조회',
        description: '등록된 문서양식 목록을 조회합니다.\n\n' + '**테스트 시나리오:**\n' + '- ✅ 모든 문서양식 조회',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '문서양식 목록 조회 성공',
        type: [dtos_1.FormResponseDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApprovalFlowController.prototype, "getForms", null);
__decorate([
    (0, common_1.Get)('forms/:formId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '문서양식 상세 조회',
        description: '특정 문서양식의 상세 정보를 조회합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 특정 문서양식 조회\n' +
            '- ❌ 존재하지 않는 문서양식 ID (404 반환)',
    }),
    (0, swagger_1.ApiParam)({ name: 'formId', description: '문서양식 ID' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '문서양식 조회 성공',
        type: dtos_1.FormResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: '문서양식을 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Param)('formId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalFlowController.prototype, "getForm", null);
__decorate([
    (0, common_1.Get)('forms/:formId/versions/:versionId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '문서양식 버전 상세 조회',
        description: '특정 문서양식의 특정 버전 상세 정보를 조회합니다.',
    }),
    (0, swagger_1.ApiParam)({ name: 'formId', description: '문서양식 ID' }),
    (0, swagger_1.ApiParam)({ name: 'versionId', description: '문서양식 버전 ID' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '문서양식 버전 상세 조회 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: '문서양식 버전을 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Param)('formId')),
    __param(1, (0, common_1.Param)('versionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ApprovalFlowController.prototype, "getFormVersion", null);
__decorate([
    (0, common_1.Post)('forms/:formId/preview-approval-line'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '결재선 미리보기',
        description: '문서 작성 시 실제로 할당될 결재자 목록을 미리 확인합니다. ' +
            '문서양식에 연결된 결재선 템플릿과 기안 컨텍스트를 기반으로 ' +
            '실제 결재자(이름, 부서, 직책)를 조회합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 결재선 미리보기 조회\n' +
            '- ❌ 필수 필드 누락 (formVersionId)\n' +
            '- ❌ 존재하지 않는 문서양식 ID (404 반환)',
    }),
    (0, swagger_1.ApiParam)({ name: 'formId', description: '문서양식 ID' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: '결재선 미리보기 성공',
        type: dtos_1.PreviewApprovalLineResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: '문서양식 또는 결재선 템플릿을 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: '잘못된 요청 (기안자 부서 정보 없음 등)',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('formId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, String, dtos_1.PreviewApprovalLineRequestDto]),
    __metadata("design:returntype", Promise)
], ApprovalFlowController.prototype, "previewApprovalLine", null);
exports.ApprovalFlowController = ApprovalFlowController = __decorate([
    (0, swagger_1.ApiTags)('Approval Flow (v2)'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [usecases_1.CreateFormWithApprovalLineUsecase,
        usecases_1.UpdateFormVersionUsecase,
        usecases_1.CloneApprovalLineTemplateUsecase,
        usecases_1.CreateApprovalLineTemplateVersionUsecase,
        usecases_1.CreateApprovalLineTemplateUsecase,
        usecases_1.CreateApprovalSnapshotUsecase,
        usecases_1.PreviewApprovalLineUsecase,
        approval_flow_context_1.ApprovalFlowContext])
], ApprovalFlowController);
//# sourceMappingURL=approval-flow.controller.js.map