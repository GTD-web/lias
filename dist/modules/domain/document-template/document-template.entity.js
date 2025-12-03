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
exports.DocumentTemplate = void 0;
const typeorm_1 = require("typeorm");
const approval_enum_1 = require("../../../common/enums/approval.enum");
const approval_step_template_entity_1 = require("../approval-step-template/approval-step-template.entity");
const category_entity_1 = require("../category/category.entity");
let DocumentTemplate = class DocumentTemplate {
    이름을설정한다(name) {
        this.name = name;
    }
    코드를설정한다(code) {
        this.code = code;
    }
    설명을설정한다(description) {
        this.description = description;
    }
    템플릿을설정한다(template) {
        this.template = template;
    }
    카테고리를설정한다(categoryId) {
        this.categoryId = categoryId;
    }
    상태를설정한다(status) {
        this.status = status;
    }
    활성화한다() {
        this.status = approval_enum_1.DocumentTemplateStatus.ACTIVE;
    }
};
exports.DocumentTemplate = DocumentTemplate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { comment: '문서 템플릿 ID' }),
    __metadata("design:type", String)
], DocumentTemplate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '문서 템플릿 이름' }),
    __metadata("design:type", String)
], DocumentTemplate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '문서 템플릿 코드' }),
    __metadata("design:type", String)
], DocumentTemplate.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: '문서 템플릿 설명' }),
    __metadata("design:type", String)
], DocumentTemplate.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: approval_enum_1.DocumentTemplateStatus,
        default: approval_enum_1.DocumentTemplateStatus.DRAFT,
        comment: '문서 템플릿 상태',
    }),
    __metadata("design:type", String)
], DocumentTemplate.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '문서 HTML 템플릿' }),
    __metadata("design:type", String)
], DocumentTemplate.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, comment: '카테고리 ID' }),
    __metadata("design:type", String)
], DocumentTemplate.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", Date)
], DocumentTemplate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", Date)
], DocumentTemplate.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.documentTemplates, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'categoryId' }),
    __metadata("design:type", category_entity_1.Category)
], DocumentTemplate.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => approval_step_template_entity_1.ApprovalStepTemplate, (step) => step.documentTemplate, { cascade: true }),
    __metadata("design:type", Array)
], DocumentTemplate.prototype, "approvalStepTemplates", void 0);
exports.DocumentTemplate = DocumentTemplate = __decorate([
    (0, typeorm_1.Entity)('document_templates'),
    (0, typeorm_1.Index)(['status']),
    (0, typeorm_1.Index)(['categoryId'])
], DocumentTemplate);
//# sourceMappingURL=document-template.entity.js.map