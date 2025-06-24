"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
const common_1 = require("@nestjs/common");
const create_approval_line_usecase_1 = require("./usecases/approval-line/create-approval-line.usecase");
const find_approval_lines_usecase_1 = require("./usecases/approval-line/find-approval-lines.usecase");
const find_approval_line_by_id_usecase_1 = require("./usecases/approval-line/find-approval-line-by-id.usecase");
const update_approval_line_usecase_1 = require("./usecases/approval-line/update-approval-line.usecase");
const delete_approval_line_usecase_1 = require("./usecases/approval-line/delete-approval-line.usecase");
const create_form_type_usecase_1 = require("./usecases/form-type/create-form-type.usecase");
const find_form_types_usecase_1 = require("./usecases/form-type/find-form-types.usecase");
const find_form_type_by_id_usecase_1 = require("./usecases/form-type/find-form-type-by-id.usecase");
const update_form_type_usecase_1 = require("./usecases/form-type/update-form-type.usecase");
const delete_form_type_usecase_1 = require("./usecases/form-type/delete-form-type.usecase");
const find_document_form_by_id_usecase_1 = require("./usecases/document-form/find-document-form-by-id.usecase");
const create_document_form_usecase_1 = require("./usecases/document-form/create-document-form.usecase");
const find_document_forms_usecase_1 = require("./usecases/document-form/find-document-forms.usecase");
const update_document_form_usecase_1 = require("./usecases/document-form/update-document-form.usecase");
const delete_document_form_usecase_1 = require("./usecases/document-form/delete-document-form.usecase");
let DocumentService = class DocumentService {
    constructor(createApprovalLineUseCase, findApprovalLinesUseCase, findApprovalLineByIdUseCase, updateApprovalLineUseCase, deleteApprovalLineUseCase, createFormTypeUseCase, findFormTypesUseCase, findFormTypeByIdUseCase, updateFormTypeUseCase, deleteFormTypeUseCase, createDocumentFormUseCase, findDocumentFormsUseCase, findDocumentFormByIdUseCase, updateDocumentFormUseCase, deleteDocumentFormUseCase) {
        this.createApprovalLineUseCase = createApprovalLineUseCase;
        this.findApprovalLinesUseCase = findApprovalLinesUseCase;
        this.findApprovalLineByIdUseCase = findApprovalLineByIdUseCase;
        this.updateApprovalLineUseCase = updateApprovalLineUseCase;
        this.deleteApprovalLineUseCase = deleteApprovalLineUseCase;
        this.createFormTypeUseCase = createFormTypeUseCase;
        this.findFormTypesUseCase = findFormTypesUseCase;
        this.findFormTypeByIdUseCase = findFormTypeByIdUseCase;
        this.updateFormTypeUseCase = updateFormTypeUseCase;
        this.deleteFormTypeUseCase = deleteFormTypeUseCase;
        this.createDocumentFormUseCase = createDocumentFormUseCase;
        this.findDocumentFormsUseCase = findDocumentFormsUseCase;
        this.findDocumentFormByIdUseCase = findDocumentFormByIdUseCase;
        this.updateDocumentFormUseCase = updateDocumentFormUseCase;
        this.deleteDocumentFormUseCase = deleteDocumentFormUseCase;
    }
    async createApprovalLine(user, dto) {
        return await this.createApprovalLineUseCase.execute(user, dto);
    }
    async findApprovalLines(page, limit, type) {
        return await this.findApprovalLinesUseCase.execute(page, limit, type);
    }
    async findApprovalLineById(id) {
        return await this.findApprovalLineByIdUseCase.execute(id);
    }
    async updateApprovalLine(user, dto) {
        return await this.updateApprovalLineUseCase.execute(user, dto);
    }
    async deleteApprovalLine(id) {
        return await this.deleteApprovalLineUseCase.execute(id);
    }
    async createFormType(dto) {
        return await this.createFormTypeUseCase.execute(dto);
    }
    async findFormTypes() {
        return await this.findFormTypesUseCase.execute();
    }
    async findFormTypeById(id) {
        return await this.findFormTypeByIdUseCase.execute(id);
    }
    async updateFormType(id, dto) {
        return await this.updateFormTypeUseCase.execute(id, dto);
    }
    async deleteFormType(id) {
        return await this.deleteFormTypeUseCase.execute(id);
    }
    async createDocumentForm(dto) {
        return await this.createDocumentFormUseCase.execute(dto);
    }
    async findDocumentForms(query) {
        return await this.findDocumentFormsUseCase.execute(query);
    }
    async findDocumentFormById(id) {
        return await this.findDocumentFormByIdUseCase.execute(id);
    }
    async updateDocumentForm(id, dto) {
        return await this.updateDocumentFormUseCase.execute(id, dto);
    }
    async deleteDocumentForm(id) {
        return await this.deleteDocumentFormUseCase.execute(id);
    }
};
exports.DocumentService = DocumentService;
exports.DocumentService = DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [create_approval_line_usecase_1.CreateApprovalLineUseCase,
        find_approval_lines_usecase_1.FindApprovalLinesUseCase,
        find_approval_line_by_id_usecase_1.FindApprovalLineByIdUseCase,
        update_approval_line_usecase_1.UpdateApprovalLineUseCase,
        delete_approval_line_usecase_1.DeleteApprovalLineUseCase,
        create_form_type_usecase_1.CreateFormTypeUseCase,
        find_form_types_usecase_1.FindFormTypesUseCase,
        find_form_type_by_id_usecase_1.FindFormTypeByIdUseCase,
        update_form_type_usecase_1.UpdateFormTypeUseCase,
        delete_form_type_usecase_1.DeleteFormTypeUseCase,
        create_document_form_usecase_1.CreateDocumentFormUseCase,
        find_document_forms_usecase_1.FindDocumentFormsUseCase,
        find_document_form_by_id_usecase_1.FindDocumentFormByIdUseCase,
        update_document_form_usecase_1.UpdateDocumentFormUseCase,
        delete_document_form_usecase_1.DeleteDocumentFormUseCase])
], DocumentService);
//# sourceMappingURL=document.service.js.map