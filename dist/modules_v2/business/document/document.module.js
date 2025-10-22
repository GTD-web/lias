"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentBusinessModule = void 0;
const common_1 = require("@nestjs/common");
const document_module_1 = require("../../context/document/document.module");
const approval_flow_module_1 = require("../../context/approval-flow/approval-flow.module");
const form_module_1 = require("../../domain/form/form.module");
const employee_department_position_module_1 = require("../../domain/employee-department-position/employee-department-position.module");
const document_controller_1 = require("./controllers/document.controller");
const Usecases = require("./usecases");
let DocumentBusinessModule = class DocumentBusinessModule {
};
exports.DocumentBusinessModule = DocumentBusinessModule;
exports.DocumentBusinessModule = DocumentBusinessModule = __decorate([
    (0, common_1.Module)({
        imports: [
            document_module_1.DocumentModule,
            approval_flow_module_1.ApprovalFlowModule,
            form_module_1.DomainFormModule,
            employee_department_position_module_1.DomainEmployeeDepartmentPositionModule,
        ],
        controllers: [document_controller_1.DocumentController],
        providers: [
            Usecases.CreateDocumentUsecase,
            Usecases.UpdateDocumentUsecase,
            Usecases.SubmitDocumentUsecase,
            Usecases.CancelDocumentUsecase,
            Usecases.GetDocumentUsecase,
        ],
        exports: [
            Usecases.CreateDocumentUsecase,
            Usecases.UpdateDocumentUsecase,
            Usecases.SubmitDocumentUsecase,
            Usecases.CancelDocumentUsecase,
            Usecases.GetDocumentUsecase,
        ],
    })
], DocumentBusinessModule);
//# sourceMappingURL=document.module.js.map