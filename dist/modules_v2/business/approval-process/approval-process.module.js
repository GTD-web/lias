"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalProcessBusinessModule = void 0;
const common_1 = require("@nestjs/common");
const approval_process_module_1 = require("../../context/approval-process/approval-process.module");
const approval_process_controller_1 = require("./controllers/approval-process.controller");
const document_module_1 = require("../../domain/document/document.module");
const employee_module_1 = require("../../domain/employee/employee.module");
const department_module_1 = require("../../domain/department/department.module");
const employee_department_position_module_1 = require("../../domain/employee-department-position/employee-department-position.module");
const Usecases = require("./usecases");
let ApprovalProcessBusinessModule = class ApprovalProcessBusinessModule {
};
exports.ApprovalProcessBusinessModule = ApprovalProcessBusinessModule;
exports.ApprovalProcessBusinessModule = ApprovalProcessBusinessModule = __decorate([
    (0, common_1.Module)({
        imports: [
            approval_process_module_1.ApprovalProcessModule,
            document_module_1.DomainDocumentModule,
            employee_module_1.DomainEmployeeModule,
            department_module_1.DomainDepartmentModule,
            employee_department_position_module_1.DomainEmployeeDepartmentPositionModule,
        ],
        controllers: [approval_process_controller_1.ApprovalProcessController],
        providers: [
            Usecases.ApproveStepUsecase,
            Usecases.RejectStepUsecase,
            Usecases.CompleteAgreementUsecase,
            Usecases.CompleteImplementationUsecase,
            Usecases.CancelApprovalUsecase,
            Usecases.GetApprovalStatusUsecase,
        ],
        exports: [
            Usecases.ApproveStepUsecase,
            Usecases.RejectStepUsecase,
            Usecases.CompleteAgreementUsecase,
            Usecases.CompleteImplementationUsecase,
            Usecases.CancelApprovalUsecase,
            Usecases.GetApprovalStatusUsecase,
        ],
    })
], ApprovalProcessBusinessModule);
//# sourceMappingURL=approval-process.module.js.map