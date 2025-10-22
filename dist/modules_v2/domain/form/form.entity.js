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
exports.Form = void 0;
const typeorm_1 = require("typeorm");
const approval_enum_1 = require("../../../common/enums/approval.enum");
let Form = class Form {
};
exports.Form = Form;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { comment: '문서 양식 ID' }),
    __metadata("design:type", String)
], Form.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '문서 양식 이름' }),
    __metadata("design:type", String)
], Form.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '문서 양식 코드' }),
    __metadata("design:type", String)
], Form.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: '문서 양식 설명' }),
    __metadata("design:type", String)
], Form.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: approval_enum_1.FormStatus,
        default: approval_enum_1.FormStatus.DRAFT,
        comment: '문서 양식 상태',
    }),
    __metadata("design:type", String)
], Form.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, comment: '현재 활성 버전 ID' }),
    __metadata("design:type", String)
], Form.prototype, "currentVersionId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '생성일' }),
    __metadata("design:type", Date)
], Form.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ comment: '수정일' }),
    __metadata("design:type", Date)
], Form.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('FormVersion'),
    (0, typeorm_1.JoinColumn)({ name: 'currentVersionId' }),
    __metadata("design:type", Object)
], Form.prototype, "currentVersion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('FormVersion', 'form'),
    __metadata("design:type", Array)
], Form.prototype, "versions", void 0);
exports.Form = Form = __decorate([
    (0, typeorm_1.Entity)('forms'),
    (0, typeorm_1.Index)(['status'])
], Form);
//# sourceMappingURL=form.entity.js.map