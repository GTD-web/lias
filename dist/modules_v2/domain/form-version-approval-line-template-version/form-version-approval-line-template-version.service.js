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
exports.DomainFormVersionApprovalLineTemplateVersionService = void 0;
const common_1 = require("@nestjs/common");
const form_version_approval_line_template_version_repository_1 = require("./form-version-approval-line-template-version.repository");
const base_service_1 = require("../../../common/services/base.service");
let DomainFormVersionApprovalLineTemplateVersionService = class DomainFormVersionApprovalLineTemplateVersionService extends base_service_1.BaseService {
    constructor(formVersionApprovalLineTemplateVersionRepository) {
        super(formVersionApprovalLineTemplateVersionRepository);
        this.formVersionApprovalLineTemplateVersionRepository = formVersionApprovalLineTemplateVersionRepository;
    }
    async findByMappingId(id) {
        const mapping = await this.formVersionApprovalLineTemplateVersionRepository.findOne({
            where: { id },
            relations: ['formVersion', 'approvalLineTemplateVersion'],
        });
        if (!mapping) {
            throw new common_1.NotFoundException('매핑 정보를 찾을 수 없습니다.');
        }
        return mapping;
    }
    async findByFormVersionId(formVersionId) {
        return this.formVersionApprovalLineTemplateVersionRepository.findByFormVersionId(formVersionId);
    }
    async findByApprovalLineTemplateVersionId(approvalLineTemplateVersionId) {
        return this.formVersionApprovalLineTemplateVersionRepository.findByApprovalLineTemplateVersionId(approvalLineTemplateVersionId);
    }
    async findDefaultByFormVersionId(formVersionId) {
        const mapping = await this.formVersionApprovalLineTemplateVersionRepository.findDefaultByFormVersionId(formVersionId);
        if (!mapping) {
            throw new common_1.NotFoundException('기본 결재선을 찾을 수 없습니다.');
        }
        return mapping;
    }
};
exports.DomainFormVersionApprovalLineTemplateVersionService = DomainFormVersionApprovalLineTemplateVersionService;
exports.DomainFormVersionApprovalLineTemplateVersionService = DomainFormVersionApprovalLineTemplateVersionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [form_version_approval_line_template_version_repository_1.DomainFormVersionApprovalLineTemplateVersionRepository])
], DomainFormVersionApprovalLineTemplateVersionService);
//# sourceMappingURL=form-version-approval-line-template-version.service.js.map