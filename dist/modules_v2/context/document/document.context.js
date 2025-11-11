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
var DocumentContext_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentContext = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const document_service_1 = require("../../domain/document/document.service");
const form_version_service_1 = require("../../domain/form/form-version.service");
const employee_service_1 = require("../../domain/employee/employee.service");
const approval_enum_1 = require("../../../common/enums/approval.enum");
const transaction_util_1 = require("../../../common/utils/transaction.util");
let DocumentContext = DocumentContext_1 = class DocumentContext {
    constructor(dataSource, documentService, formVersionService, employeeService) {
        this.dataSource = dataSource;
        this.documentService = documentService;
        this.formVersionService = formVersionService;
        this.employeeService = employeeService;
        this.logger = new common_1.Logger(DocumentContext_1.name);
    }
    async createDocument(dto, externalQueryRunner) {
        this.logger.log(`문서 생성 시작: ${dto.title}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            if (dto.formVersionId) {
                const formVersion = await this.formVersionService.findOne({
                    where: { id: dto.formVersionId },
                    queryRunner,
                });
                if (!formVersion) {
                    throw new common_1.NotFoundException(`문서양식 버전을 찾을 수 없습니다: ${dto.formVersionId}`);
                }
            }
            const drafter = await this.employeeService.findOne({
                where: { id: dto.drafterId },
                queryRunner,
            });
            if (!drafter) {
                throw new common_1.NotFoundException(`기안자를 찾을 수 없습니다: ${dto.drafterId}`);
            }
            const documentNumber = `DRAFT-${Date.now()}`;
            const documentEntity = await this.documentService.create({
                documentNumber,
                formVersionId: dto.formVersionId || null,
                title: dto.title,
                content: dto.content,
                drafterId: dto.drafterId,
                status: approval_enum_1.DocumentStatus.DRAFT,
                metadata: dto.metadata,
            }, { queryRunner });
            const document = await this.documentService.save(documentEntity, { queryRunner });
            this.logger.log(`문서 생성 완료: ${document.id}`);
            return document;
        }, externalQueryRunner);
    }
    async updateDocument(documentId, dto, externalQueryRunner) {
        this.logger.log(`문서 수정 시작: ${documentId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const document = await this.documentService.findOne({
                where: { id: documentId },
                queryRunner,
            });
            if (!document) {
                throw new common_1.NotFoundException(`문서를 찾을 수 없습니다: ${documentId}`);
            }
            if (document.status !== approval_enum_1.DocumentStatus.DRAFT && dto.status !== approval_enum_1.DocumentStatus.PENDING) {
                throw new common_1.BadRequestException('임시저장 상태의 문서만 수정할 수 있습니다.');
            }
            const updatedDocument = await this.documentService.update(documentId, {
                title: dto.title ?? document.title,
                content: dto.content ?? document.content,
                metadata: dto.metadata ?? document.metadata,
                approvalLineSnapshotId: dto.approvalLineSnapshotId ?? document.approvalLineSnapshotId,
                status: dto.status ?? document.status,
            }, { queryRunner });
            this.logger.log(`문서 수정 완료: ${documentId}`);
            return updatedDocument;
        }, externalQueryRunner);
    }
    async submitDocument(dto, approvalLineSnapshotId, externalQueryRunner) {
        this.logger.log(`문서 기안 시작: ${dto.documentId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const document = await this.documentService.findOne({
                where: { id: dto.documentId },
                queryRunner,
            });
            if (!document) {
                throw new common_1.NotFoundException(`문서를 찾을 수 없습니다: ${dto.documentId}`);
            }
            if (document.status !== approval_enum_1.DocumentStatus.DRAFT) {
                throw new common_1.BadRequestException('임시저장 상태의 문서만 기안할 수 있습니다.');
            }
            let documentNumber;
            if (document.formVersionId) {
                documentNumber = await this.generateDocumentNumber(document.formVersionId, queryRunner);
            }
            else {
                const today = new Date();
                const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
                const countResult = await queryRunner.query(`SELECT COUNT(*) as count FROM documents 
                         WHERE "documentNumber" LIKE $1 
                         AND "createdAt" >= $2`, [`EXT-${dateStr}-%`, today.toISOString().slice(0, 10)]);
                const seq = parseInt(countResult[0]?.count || '0') + 1;
                const seqStr = seq.toString().padStart(4, '0');
                documentNumber = `EXT-${dateStr}-${seqStr}`;
            }
            const submittedDocument = await this.documentService.update(dto.documentId, {
                documentNumber,
                approvalLineSnapshotId,
                status: approval_enum_1.DocumentStatus.PENDING,
                submittedAt: new Date(),
            }, { queryRunner });
            this.logger.log(`문서 기안 완료: ${dto.documentId}, 문서번호: ${documentNumber}`);
            return submittedDocument;
        }, externalQueryRunner);
    }
    async deleteDocument(documentId, externalQueryRunner) {
        this.logger.log(`문서 삭제 시작: ${documentId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const document = await this.documentService.findOne({
                where: { id: documentId },
                queryRunner,
            });
            if (!document) {
                throw new common_1.NotFoundException(`문서를 찾을 수 없습니다: ${documentId}`);
            }
            if (document.status !== approval_enum_1.DocumentStatus.DRAFT) {
                throw new common_1.BadRequestException('임시저장 상태의 문서만 삭제할 수 있습니다.');
            }
            await this.documentService.delete(documentId, { queryRunner });
            this.logger.log(`문서 삭제 완료: ${documentId}`);
            return { deleted: true, documentId };
        }, externalQueryRunner);
    }
    async getDocument(documentId, queryRunner) {
        const document = await this.documentService.findOne({
            where: { id: documentId },
            relations: ['formVersion', 'drafter', 'approvalLineSnapshot'],
            queryRunner,
        });
        if (!document) {
            throw new common_1.NotFoundException(`문서를 찾을 수 없습니다: ${documentId}`);
        }
        return document;
    }
    async getDocuments(filter, queryRunner) {
        const where = {};
        if (filter.status)
            where.status = filter.status;
        if (filter.drafterId)
            where.drafterId = filter.drafterId;
        if (filter.formVersionId)
            where.formVersionId = filter.formVersionId;
        return await this.documentService.findAll({
            where,
            relations: ['formVersion', 'drafter'],
            order: { createdAt: 'DESC' },
            queryRunner,
        });
    }
    async generateDocumentNumber(formVersionId, queryRunner) {
        if (!formVersionId) {
            throw new common_1.BadRequestException('문서양식 버전 ID가 필요합니다.');
        }
        const formVersion = await this.formVersionService.findOne({
            where: { id: formVersionId },
            relations: ['form'],
            queryRunner,
        });
        if (!formVersion || !formVersion.form) {
            throw new common_1.NotFoundException('문서양식을 찾을 수 없습니다.');
        }
        const formCode = formVersion.form.code || 'DOC';
        const today = new Date();
        const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
        const countResult = await queryRunner.query(`SELECT COUNT(*) as count FROM documents 
             WHERE "documentNumber" LIKE $1 
             AND "createdAt" >= $2`, [`${formCode}-${dateStr}-%`, today.toISOString().slice(0, 10)]);
        const seq = parseInt(countResult[0]?.count || '0') + 1;
        const seqStr = seq.toString().padStart(4, '0');
        return `${formCode}-${dateStr}-${seqStr}`;
    }
};
exports.DocumentContext = DocumentContext;
exports.DocumentContext = DocumentContext = DocumentContext_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        document_service_1.DomainDocumentService,
        form_version_service_1.DomainFormVersionService,
        employee_service_1.DomainEmployeeService])
], DocumentContext);
//# sourceMappingURL=document.context.js.map