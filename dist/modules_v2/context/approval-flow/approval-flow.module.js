"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalFlowModule = void 0;
const common_1 = require("@nestjs/common");
const approval_flow_context_1 = require("./approval-flow.context");
const form_module_1 = require("../../domain/form/form.module");
const approval_line_template_module_1 = require("../../domain/approval-line-template/approval-line-template.module");
const approval_step_template_module_1 = require("../../domain/approval-step-template/approval-step-template.module");
const approval_line_snapshot_module_1 = require("../../domain/approval-line-snapshot/approval-line-snapshot.module");
const approval_step_snapshot_module_1 = require("../../domain/approval-step-snapshot/approval-step-snapshot.module");
const form_version_approval_line_template_version_module_1 = require("../../domain/form-version-approval-line-template-version/form-version-approval-line-template-version.module");
const employee_module_1 = require("../../domain/employee/employee.module");
const department_module_1 = require("../../domain/department/department.module");
const position_module_1 = require("../../domain/position/position.module");
const employee_department_position_module_1 = require("../../domain/employee-department-position/employee-department-position.module");
let ApprovalFlowModule = class ApprovalFlowModule {
};
exports.ApprovalFlowModule = ApprovalFlowModule;
exports.ApprovalFlowModule = ApprovalFlowModule = __decorate([
    (0, common_1.Module)({
        imports: [
            form_module_1.DomainFormModule,
            approval_line_template_module_1.DomainApprovalLineTemplateModule,
            approval_step_template_module_1.DomainApprovalStepTemplateModule,
            approval_line_snapshot_module_1.DomainApprovalLineSnapshotModule,
            approval_step_snapshot_module_1.DomainApprovalStepSnapshotModule,
            form_version_approval_line_template_version_module_1.DomainFormVersionApprovalLineTemplateVersionModule,
            employee_module_1.DomainEmployeeModule,
            department_module_1.DomainDepartmentModule,
            position_module_1.DomainPositionModule,
            employee_department_position_module_1.DomainEmployeeDepartmentPositionModule,
        ],
        providers: [approval_flow_context_1.ApprovalFlowContext],
        exports: [
            approval_flow_context_1.ApprovalFlowContext,
            form_module_1.DomainFormModule,
            approval_line_template_module_1.DomainApprovalLineTemplateModule,
            approval_step_template_module_1.DomainApprovalStepTemplateModule,
            approval_line_snapshot_module_1.DomainApprovalLineSnapshotModule,
            approval_step_snapshot_module_1.DomainApprovalStepSnapshotModule,
            form_version_approval_line_template_version_module_1.DomainFormVersionApprovalLineTemplateVersionModule,
            employee_module_1.DomainEmployeeModule,
            department_module_1.DomainDepartmentModule,
            position_module_1.DomainPositionModule,
            employee_department_position_module_1.DomainEmployeeDepartmentPositionModule,
        ],
    })
], ApprovalFlowModule);
//# sourceMappingURL=approval-flow.module.js.map