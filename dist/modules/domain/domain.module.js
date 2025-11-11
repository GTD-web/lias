"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_module_1 = require("./category/category.module");
const document_template_module_1 = require("./document-template/document-template.module");
const document_module_1 = require("./document/document.module");
const employee_module_1 = require("./employee/employee.module");
const department_module_1 = require("./department/department.module");
const position_module_1 = require("./position/position.module");
const rank_module_1 = require("./rank/rank.module");
const employee_department_position_module_1 = require("./employee-department-position/employee-department-position.module");
const approval_step_template_module_1 = require("./approval-step-template/approval-step-template.module");
const approval_step_snapshot_module_1 = require("./approval-step-snapshot/approval-step-snapshot.module");
const category_entity_1 = require("./category/category.entity");
const document_template_entity_1 = require("./document-template/document-template.entity");
const document_entity_1 = require("./document/document.entity");
const employee_entity_1 = require("./employee/employee.entity");
const department_entity_1 = require("./department/department.entity");
const position_entity_1 = require("./position/position.entity");
const rank_entity_1 = require("./rank/rank.entity");
const employee_department_position_entity_1 = require("./employee-department-position/employee-department-position.entity");
const approval_step_template_entity_1 = require("./approval-step-template/approval-step-template.entity");
const approval_step_snapshot_entity_1 = require("./approval-step-snapshot/approval-step-snapshot.entity");
let DomainModule = class DomainModule {
};
exports.DomainModule = DomainModule;
exports.DomainModule = DomainModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                category_entity_1.Category,
                document_template_entity_1.DocumentTemplate,
                document_entity_1.Document,
                employee_entity_1.Employee,
                department_entity_1.Department,
                position_entity_1.Position,
                rank_entity_1.Rank,
                employee_department_position_entity_1.EmployeeDepartmentPosition,
                approval_step_template_entity_1.ApprovalStepTemplate,
                approval_step_snapshot_entity_1.ApprovalStepSnapshot,
            ]),
            category_module_1.DomainCategoryModule,
            document_template_module_1.DomainDocumentTemplateModule,
            document_module_1.DomainDocumentModule,
            employee_module_1.DomainEmployeeModule,
            department_module_1.DomainDepartmentModule,
            position_module_1.DomainPositionModule,
            rank_module_1.DomainRankModule,
            employee_department_position_module_1.DomainEmployeeDepartmentPositionModule,
            approval_step_template_module_1.DomainApprovalStepTemplateModule,
            approval_step_snapshot_module_1.DomainApprovalStepSnapshotModule,
        ],
        exports: [
            category_module_1.DomainCategoryModule,
            document_template_module_1.DomainDocumentTemplateModule,
            document_module_1.DomainDocumentModule,
            employee_module_1.DomainEmployeeModule,
            department_module_1.DomainDepartmentModule,
            position_module_1.DomainPositionModule,
            rank_module_1.DomainRankModule,
            employee_department_position_module_1.DomainEmployeeDepartmentPositionModule,
            approval_step_template_module_1.DomainApprovalStepTemplateModule,
            approval_step_snapshot_module_1.DomainApprovalStepSnapshotModule,
        ],
    })
], DomainModule);
//# sourceMappingURL=domain.module.js.map