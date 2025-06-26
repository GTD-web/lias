"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalModule = void 0;
const common_1 = require("@nestjs/common");
const approval_service_1 = require("./approval.service");
const document_controller_1 = require("./controllers/document.controller");
const typeorm_1 = require("@nestjs/typeorm");
const document_entity_1 = require("../../../database/entities/document.entity");
const document_module_1 = require("../../domain/document/document.module");
const employee_module_1 = require("../../domain/employee/employee.module");
const approval_step_module_1 = require("../../domain/approval-step/approval-step.module");
const document_type_module_1 = require("../../domain/document-type/document-type.module");
const file_module_1 = require("../../domain/file/file.module");
const approval_step_entity_1 = require("../../../database/entities/approval-step.entity");
const employee_entity_1 = require("../../../database/entities/employee.entity");
const document_type_entity_1 = require("../../../database/entities/document-type.entity");
const file_entity_1 = require("../../../database/entities/file.entity");
const ApprovalUsecases = require("./usecases/approval");
const DocumentUsecases = require("./usecases/document");
const approval_controller_1 = require("./controllers/approval.controller");
let ApprovalModule = class ApprovalModule {
};
exports.ApprovalModule = ApprovalModule;
exports.ApprovalModule = ApprovalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([document_entity_1.Document, approval_step_entity_1.ApprovalStep, employee_entity_1.Employee, document_type_entity_1.DocumentType, file_entity_1.File]),
            document_module_1.DomainDocumentModule,
            employee_module_1.DomainEmployeeModule,
            approval_step_module_1.DomainApprovalStepModule,
            document_type_module_1.DomainDocumentTypeModule,
            file_module_1.DomainFileModule,
        ],
        controllers: [document_controller_1.ApprovalDraftController, approval_controller_1.ApprovalController],
        providers: [approval_service_1.ApprovalService, ...Object.values(ApprovalUsecases), ...Object.values(DocumentUsecases)],
        exports: [approval_service_1.ApprovalService],
    })
], ApprovalModule);
//# sourceMappingURL=approval.module.js.map