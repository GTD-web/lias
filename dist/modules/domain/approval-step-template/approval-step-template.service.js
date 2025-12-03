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
exports.DomainApprovalStepTemplateService = void 0;
const common_1 = require("@nestjs/common");
const approval_step_template_repository_1 = require("./approval-step-template.repository");
const base_service_1 = require("../../../common/services/base.service");
const approval_step_template_entity_1 = require("./approval-step-template.entity");
let DomainApprovalStepTemplateService = class DomainApprovalStepTemplateService extends base_service_1.BaseService {
    constructor(approvalStepTemplateRepository) {
        super(approvalStepTemplateRepository);
        this.approvalStepTemplateRepository = approvalStepTemplateRepository;
    }
    async createApprovalStepTemplate(params, queryRunner) {
        const approvalStepTemplate = new approval_step_template_entity_1.ApprovalStepTemplate();
        approvalStepTemplate.문서템플릿을설정한다(params.documentTemplateId);
        approvalStepTemplate.결재단계순서를설정한다(params.stepOrder);
        approvalStepTemplate.결재단계타입을설정한다(params.stepType);
        approvalStepTemplate.결재자할당규칙을설정한다(params.assigneeRule);
        if (params.targetEmployeeId) {
            approvalStepTemplate.대상직원을설정한다(params.targetEmployeeId);
        }
        if (params.targetDepartmentId) {
            approvalStepTemplate.대상부서를설정한다(params.targetDepartmentId);
        }
        if (params.targetPositionId) {
            approvalStepTemplate.대상직책을설정한다(params.targetPositionId);
        }
        return await this.approvalStepTemplateRepository.save(approvalStepTemplate, { queryRunner });
    }
    async updateApprovalStepTemplate(approvalStepTemplate, params, queryRunner) {
        if (params.stepOrder !== undefined) {
            approvalStepTemplate.결재단계순서를설정한다(params.stepOrder);
        }
        if (params.stepType) {
            approvalStepTemplate.결재단계타입을설정한다(params.stepType);
        }
        if (params.assigneeRule) {
            approvalStepTemplate.결재자할당규칙을설정한다(params.assigneeRule);
        }
        if (params.targetEmployeeId !== undefined) {
            approvalStepTemplate.대상직원을설정한다(params.targetEmployeeId || undefined);
        }
        if (params.targetDepartmentId !== undefined) {
            approvalStepTemplate.대상부서를설정한다(params.targetDepartmentId || undefined);
        }
        if (params.targetPositionId !== undefined) {
            approvalStepTemplate.대상직책을설정한다(params.targetPositionId || undefined);
        }
        return await this.approvalStepTemplateRepository.save(approvalStepTemplate, { queryRunner });
    }
};
exports.DomainApprovalStepTemplateService = DomainApprovalStepTemplateService;
exports.DomainApprovalStepTemplateService = DomainApprovalStepTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_step_template_repository_1.DomainApprovalStepTemplateRepository])
], DomainApprovalStepTemplateService);
//# sourceMappingURL=approval-step-template.service.js.map