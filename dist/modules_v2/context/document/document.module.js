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
const document_module_1 = require("../../domain/document/document.module");
const form_module_1 = require("../../domain/form/form.module");
const employee_module_1 = require("../../domain/employee/employee.module");
let DocumentModule = class DocumentModule {
};
exports.DocumentModule = DocumentModule;
exports.DocumentModule = DocumentModule = __decorate([
    (0, common_1.Module)({
        imports: [document_module_1.DomainDocumentModule, form_module_1.DomainFormModule, employee_module_1.DomainEmployeeModule],
        providers: [document_context_1.DocumentContext],
        exports: [document_context_1.DocumentContext],
    })
], DocumentModule);
//# sourceMappingURL=document.module.js.map