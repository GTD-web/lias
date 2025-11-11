"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalProcessModule = void 0;
const common_1 = require("@nestjs/common");
const approval_process_context_1 = require("./approval-process.context");
const approval_step_snapshot_module_1 = require("../../domain/approval-step-snapshot/approval-step-snapshot.module");
const document_module_1 = require("../../domain/document/document.module");
let ApprovalProcessModule = class ApprovalProcessModule {
};
exports.ApprovalProcessModule = ApprovalProcessModule;
exports.ApprovalProcessModule = ApprovalProcessModule = __decorate([
    (0, common_1.Module)({
        imports: [approval_step_snapshot_module_1.DomainApprovalStepSnapshotModule, document_module_1.DomainDocumentModule],
        providers: [approval_process_context_1.ApprovalProcessContext],
        exports: [approval_process_context_1.ApprovalProcessContext],
    })
], ApprovalProcessModule);
//# sourceMappingURL=approval-process.module.js.map