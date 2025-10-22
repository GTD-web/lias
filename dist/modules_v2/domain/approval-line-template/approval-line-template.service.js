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
exports.DomainApprovalLineTemplateService = void 0;
const common_1 = require("@nestjs/common");
const approval_line_template_repository_1 = require("./approval-line-template.repository");
const base_service_1 = require("../../../common/services/base.service");
let DomainApprovalLineTemplateService = class DomainApprovalLineTemplateService extends base_service_1.BaseService {
    constructor(approvalLineTemplateRepository) {
        super(approvalLineTemplateRepository);
        this.approvalLineTemplateRepository = approvalLineTemplateRepository;
    }
    async findByTemplateId(id) {
        const template = await this.approvalLineTemplateRepository.findOne({ where: { id } });
        if (!template) {
            throw new common_1.NotFoundException('결재선 템플릿을 찾을 수 없습니다.');
        }
        return template;
    }
    async findByStatus(status) {
        return this.approvalLineTemplateRepository.findByStatus(status);
    }
    async findByType(type) {
        return this.approvalLineTemplateRepository.findByType(type);
    }
    async findByDepartmentId(departmentId) {
        return this.approvalLineTemplateRepository.findByDepartmentId(departmentId);
    }
};
exports.DomainApprovalLineTemplateService = DomainApprovalLineTemplateService;
exports.DomainApprovalLineTemplateService = DomainApprovalLineTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_line_template_repository_1.DomainApprovalLineTemplateRepository])
], DomainApprovalLineTemplateService);
//# sourceMappingURL=approval-line-template.service.js.map