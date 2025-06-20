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
const document_form_module_1 = require("../../domain/document-form/document-form.module");
const document_type_module_1 = require("../../domain/document-type/document-type.module");
const form_approval_line_module_1 = require("../../domain/form-approval-line/form-approval-line.module");
const form_approval_step_module_1 = require("../../domain/form-approval-step/form-approval-step.module");
const document_form_controller_1 = require("./controllers/document-form.controller");
const form_type_controllers_1 = require("./controllers/form-type.controllers");
const approval_line_controller_1 = require("./controllers/approval-line.controller");
const document_service_1 = require("./document.service");
const ApprovalLineUsecases = require("./usecases/approval-line");
const FormTypeUsecases = require("./usecases/form-type");
const DocumentFormUsecases = require("./usecases/document-form");
let DocumentModule = class DocumentModule {
    configure(consumer) {
        consumer.apply().forRoutes({
            path: 'document',
            method: common_1.RequestMethod.ALL,
        });
    }
};
exports.DocumentModule = DocumentModule;
exports.DocumentModule = DocumentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            document_form_module_1.DomainDocumentFormModule,
            document_type_module_1.DomainDocumentTypeModule,
            form_approval_line_module_1.DomainFormApprovalLineModule,
            form_approval_step_module_1.DomainFormApprovalStepModule,
        ],
        controllers: [approval_line_controller_1.ApprovalLineController, form_type_controllers_1.FormTypeController, document_form_controller_1.DocumentFormController],
        providers: [
            document_service_1.DocumentService,
            ...Object.values(ApprovalLineUsecases),
            ...Object.values(FormTypeUsecases),
            ...Object.values(DocumentFormUsecases),
        ],
        exports: [],
    })
], DocumentModule);
//# sourceMappingURL=document.module.js.map