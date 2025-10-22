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
exports.DomainApprovalLineTemplateVersionService = void 0;
const common_1 = require("@nestjs/common");
const approval_line_template_version_repository_1 = require("./approval-line-template-version.repository");
const base_service_1 = require("../../../common/services/base.service");
let DomainApprovalLineTemplateVersionService = class DomainApprovalLineTemplateVersionService extends base_service_1.BaseService {
    constructor(approvalLineTemplateVersionRepository) {
        super(approvalLineTemplateVersionRepository);
        this.approvalLineTemplateVersionRepository = approvalLineTemplateVersionRepository;
    }
    async findByVersionId(id) {
        const version = await this.approvalLineTemplateVersionRepository.findOne({
            where: { id },
            relations: ['steps'],
        });
        if (!version) {
            throw new common_1.NotFoundException('결재선 템플릿 버전을 찾을 수 없습니다.');
        }
        return version;
    }
    async findByTemplateId(templateId) {
        return this.approvalLineTemplateVersionRepository.findByTemplateId(templateId);
    }
    async findActiveVersion(templateId) {
        const version = await this.approvalLineTemplateVersionRepository.findActiveVersion(templateId);
        if (!version) {
            throw new common_1.NotFoundException('활성 버전을 찾을 수 없습니다.');
        }
        return version;
    }
    async findByTemplateIdAndVersionNo(templateId, versionNo) {
        const version = await this.approvalLineTemplateVersionRepository.findByTemplateIdAndVersionNo(templateId, versionNo);
        if (!version) {
            throw new common_1.NotFoundException('결재선 템플릿 버전을 찾을 수 없습니다.');
        }
        return version;
    }
};
exports.DomainApprovalLineTemplateVersionService = DomainApprovalLineTemplateVersionService;
exports.DomainApprovalLineTemplateVersionService = DomainApprovalLineTemplateVersionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_line_template_version_repository_1.DomainApprovalLineTemplateVersionRepository])
], DomainApprovalLineTemplateVersionService);
//# sourceMappingURL=approval-line-template-version.service.js.map