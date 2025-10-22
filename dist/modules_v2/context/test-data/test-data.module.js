"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDataContextModule = void 0;
const common_1 = require("@nestjs/common");
const test_data_context_1 = require("./test-data.context");
const form_module_1 = require("../../domain/form/form.module");
const document_module_1 = require("../../domain/document/document.module");
const approval_line_template_module_1 = require("../../domain/approval-line-template/approval-line-template.module");
const approval_step_template_module_1 = require("../../domain/approval-step-template/approval-step-template.module");
const approval_line_snapshot_module_1 = require("../../domain/approval-line-snapshot/approval-line-snapshot.module");
const approval_step_snapshot_module_1 = require("../../domain/approval-step-snapshot/approval-step-snapshot.module");
const form_version_approval_line_template_version_module_1 = require("../../domain/form-version-approval-line-template-version/form-version-approval-line-template-version.module");
const employee_module_1 = require("../../domain/employee/employee.module");
const department_module_1 = require("../../domain/department/department.module");
const employee_department_position_module_1 = require("../../domain/employee-department-position/employee-department-position.module");
const position_module_1 = require("../../domain/position/position.module");
let TestDataContextModule = class TestDataContextModule {
};
exports.TestDataContextModule = TestDataContextModule;
exports.TestDataContextModule = TestDataContextModule = __decorate([
    (0, common_1.Module)({
        imports: [
            form_module_1.DomainFormModule,
            document_module_1.DomainDocumentModule,
            approval_line_template_module_1.DomainApprovalLineTemplateModule,
            approval_step_template_module_1.DomainApprovalStepTemplateModule,
            approval_line_snapshot_module_1.DomainApprovalLineSnapshotModule,
            approval_step_snapshot_module_1.DomainApprovalStepSnapshotModule,
            form_version_approval_line_template_version_module_1.DomainFormVersionApprovalLineTemplateVersionModule,
            employee_module_1.DomainEmployeeModule,
            department_module_1.DomainDepartmentModule,
            employee_department_position_module_1.DomainEmployeeDepartmentPositionModule,
            position_module_1.DomainPositionModule,
        ],
        providers: [test_data_context_1.TestDataContext],
        exports: [test_data_context_1.TestDataContext],
    })
], TestDataContextModule);
//# sourceMappingURL=test-data.module.js.map