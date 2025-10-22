"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalFlowBusinessModule = void 0;
const common_1 = require("@nestjs/common");
const approval_flow_controller_1 = require("./controllers/approval-flow.controller");
const approval_flow_module_1 = require("../../context/approval-flow/approval-flow.module");
const usecases_1 = require("./usecases");
let ApprovalFlowBusinessModule = class ApprovalFlowBusinessModule {
};
exports.ApprovalFlowBusinessModule = ApprovalFlowBusinessModule;
exports.ApprovalFlowBusinessModule = ApprovalFlowBusinessModule = __decorate([
    (0, common_1.Module)({
        imports: [approval_flow_module_1.ApprovalFlowModule],
        controllers: [approval_flow_controller_1.ApprovalFlowController],
        providers: [
            usecases_1.CreateFormWithApprovalLineUsecase,
            usecases_1.UpdateFormVersionUsecase,
            usecases_1.CloneApprovalLineTemplateUsecase,
            usecases_1.CreateApprovalLineTemplateVersionUsecase,
            usecases_1.CreateApprovalLineTemplateUsecase,
            usecases_1.CreateApprovalSnapshotUsecase,
            usecases_1.PreviewApprovalLineUsecase,
        ],
        exports: [
            usecases_1.CreateFormWithApprovalLineUsecase,
            usecases_1.UpdateFormVersionUsecase,
            usecases_1.CloneApprovalLineTemplateUsecase,
            usecases_1.CreateApprovalLineTemplateVersionUsecase,
            usecases_1.CreateApprovalLineTemplateUsecase,
            usecases_1.CreateApprovalSnapshotUsecase,
            usecases_1.PreviewApprovalLineUsecase,
        ],
    })
], ApprovalFlowBusinessModule);
//# sourceMappingURL=approval-flow.module.js.map