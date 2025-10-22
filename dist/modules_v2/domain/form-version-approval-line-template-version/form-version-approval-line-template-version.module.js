"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainFormVersionApprovalLineTemplateVersionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const form_version_approval_line_template_version_service_1 = require("./form-version-approval-line-template-version.service");
const form_version_approval_line_template_version_repository_1 = require("./form-version-approval-line-template-version.repository");
const form_version_approval_line_template_version_entity_1 = require("./form-version-approval-line-template-version.entity");
let DomainFormVersionApprovalLineTemplateVersionModule = class DomainFormVersionApprovalLineTemplateVersionModule {
};
exports.DomainFormVersionApprovalLineTemplateVersionModule = DomainFormVersionApprovalLineTemplateVersionModule;
exports.DomainFormVersionApprovalLineTemplateVersionModule = DomainFormVersionApprovalLineTemplateVersionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([form_version_approval_line_template_version_entity_1.FormVersionApprovalLineTemplateVersion])],
        providers: [
            form_version_approval_line_template_version_service_1.DomainFormVersionApprovalLineTemplateVersionService,
            form_version_approval_line_template_version_repository_1.DomainFormVersionApprovalLineTemplateVersionRepository,
        ],
        exports: [form_version_approval_line_template_version_service_1.DomainFormVersionApprovalLineTemplateVersionService],
    })
], DomainFormVersionApprovalLineTemplateVersionModule);
//# sourceMappingURL=form-version-approval-line-template-version.module.js.map