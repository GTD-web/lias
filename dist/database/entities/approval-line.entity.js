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
exports.ApprovalLine = void 0;
const typeorm_1 = require("typeorm");
const document_entity_1 = require("./document.entity");
const approval_step_entity_1 = require("./approval-step.entity");
let ApprovalLine = class ApprovalLine {
};
exports.ApprovalLine = ApprovalLine;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ApprovalLine.prototype, "approvalLineId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApprovalLine.prototype, "approvalLineType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], ApprovalLine.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], ApprovalLine.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApprovalLine.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_entity_1.Document, (document) => document.approvalLines),
    (0, typeorm_1.JoinColumn)({ name: 'documentId' }),
    __metadata("design:type", document_entity_1.Document)
], ApprovalLine.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => approval_step_entity_1.ApprovalStep, (approvalStep) => approvalStep.approvalLine),
    __metadata("design:type", Array)
], ApprovalLine.prototype, "approvalSteps", void 0);
exports.ApprovalLine = ApprovalLine = __decorate([
    (0, typeorm_1.Entity)('approval-lines')
], ApprovalLine);
//# sourceMappingURL=approval-line.entity.js.map