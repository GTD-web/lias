"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentModule = void 0;
const common_1 = require("@nestjs/common");
const document_context_1 = require("./document.context");
const document_query_service_1 = require("./document-query.service");
const document_filter_builder_1 = require("./document-filter.builder");
const document_module_1 = require("../../domain/document/document.module");
const document_template_module_1 = require("../../domain/document-template/document-template.module");
const employee_module_1 = require("../../domain/employee/employee.module");
const approval_step_snapshot_module_1 = require("../../domain/approval-step-snapshot/approval-step-snapshot.module");
let DocumentModule = class DocumentModule {
};
exports.DocumentModule = DocumentModule;
exports.DocumentModule = DocumentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            document_module_1.DomainDocumentModule,
            document_template_module_1.DomainDocumentTemplateModule,
            employee_module_1.DomainEmployeeModule,
            approval_step_snapshot_module_1.DomainApprovalStepSnapshotModule,
        ],
        providers: [document_context_1.DocumentContext, document_query_service_1.DocumentQueryService, document_filter_builder_1.DocumentFilterBuilder],
        exports: [document_context_1.DocumentContext, document_query_service_1.DocumentQueryService],
    })
], DocumentModule);
//# sourceMappingURL=document.module.js.map