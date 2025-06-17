"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormApprovalLineModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../../database/entities");
const form_approval_line_service_1 = require("./form-approval-line.service");
const form_approval_line_repository_1 = require("./form-approval-line.repository");
let FormApprovalLineModule = class FormApprovalLineModule {
};
exports.FormApprovalLineModule = FormApprovalLineModule;
exports.FormApprovalLineModule = FormApprovalLineModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.FormApprovalLine])],
        providers: [form_approval_line_service_1.DomainFormApprovalLineService, form_approval_line_repository_1.DomainFormApprovalLineRepository],
        exports: [form_approval_line_service_1.DomainFormApprovalLineService],
    })
], FormApprovalLineModule);
//# sourceMappingURL=form-approval-line.module.js.map