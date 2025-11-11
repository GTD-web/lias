"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainApprovalStepTemplateModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const approval_step_template_service_1 = require("./approval-step-template.service");
const approval_step_template_repository_1 = require("./approval-step-template.repository");
const approval_step_template_entity_1 = require("./approval-step-template.entity");
let DomainApprovalStepTemplateModule = class DomainApprovalStepTemplateModule {
};
exports.DomainApprovalStepTemplateModule = DomainApprovalStepTemplateModule;
exports.DomainApprovalStepTemplateModule = DomainApprovalStepTemplateModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([approval_step_template_entity_1.ApprovalStepTemplate])],
        providers: [approval_step_template_service_1.DomainApprovalStepTemplateService, approval_step_template_repository_1.DomainApprovalStepTemplateRepository],
        exports: [approval_step_template_service_1.DomainApprovalStepTemplateService],
    })
], DomainApprovalStepTemplateModule);
//# sourceMappingURL=approval-step-template.module.js.map