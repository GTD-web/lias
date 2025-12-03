"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateModule = void 0;
const common_1 = require("@nestjs/common");
const template_context_1 = require("./template.context");
const template_query_service_1 = require("./template-query.service");
const approver_mapping_service_1 = require("./approver-mapping.service");
const document_template_module_1 = require("../../domain/document-template/document-template.module");
const approval_step_template_module_1 = require("../../domain/approval-step-template/approval-step-template.module");
const category_module_1 = require("../../domain/category/category.module");
const employee_module_1 = require("../../domain/employee/employee.module");
const department_module_1 = require("../../domain/department/department.module");
let TemplateModule = class TemplateModule {
};
exports.TemplateModule = TemplateModule;
exports.TemplateModule = TemplateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            document_template_module_1.DomainDocumentTemplateModule,
            approval_step_template_module_1.DomainApprovalStepTemplateModule,
            category_module_1.DomainCategoryModule,
            employee_module_1.DomainEmployeeModule,
            department_module_1.DomainDepartmentModule,
        ],
        providers: [template_context_1.TemplateContext, template_query_service_1.TemplateQueryService, approver_mapping_service_1.ApproverMappingService],
        exports: [template_context_1.TemplateContext, template_query_service_1.TemplateQueryService, approver_mapping_service_1.ApproverMappingService],
    })
], TemplateModule);
//# sourceMappingURL=template.module.js.map