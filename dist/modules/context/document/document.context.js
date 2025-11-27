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
const document_entity_1 = require("../../domain/document/document.entity");
const document_service_1 = require("../../domain/document/document.service");
const document_template_service_1 = require("../../domain/document-template/document-template.service");
const employee_service_1 = require("../../domain/employee/employee.service");
const approval_step_snapshot_service_1 = require("../../domain/approval-step-snapshot/approval-step-snapshot.service");
const approval_enum_1 = require("../../../common/enums/approval.enum");
const transaction_util_1 = require("../../../common/utils/transaction.util");
let DocumentContext = DocumentContext_1 = class DocumentContext {
    constructor(dataSource, documentService, documentTemplateService, employeeService, approvalStepSnapshotService) {
        this.dataSource = dataSource;
        this.documentService = documentService;
        this.documentTemplateService = documentTemplateService;
        this.employeeService = employeeService;
        this.approvalStepSnapshotService = approvalStepSnapshotService;
        this.logger = new common_1.Logger(DocumentContext_1.name);
    }
    async createDocument(dto, externalQueryRunner) {
        this.logger.log(`문서 생성 시작: ${dto.title}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            if (dto.documentTemplateId) {
                const documentTemplate = await this.documentTemplateService.findOne({
                    where: { id: dto.documentTemplateId },
                    queryRunner,
                });
                if (!documentTemplate) {
                    throw new common_1.NotFoundException(`문서 템플릿을 찾을 수 없습니다: ${dto.documentTemplateId}`);
                }
            }
            const drafter = await this.employeeService.findOne({
                where: { id: dto.drafterId },
                queryRunner,
            });
            if (!drafter) {
                throw new common_1.NotFoundException(`기안자를 찾을 수 없습니다: ${dto.drafterId}`);
            }
            const documentEntity = await this.documentService.create({
                documentNumber: null,
                title: dto.title,
                content: dto.content,
                drafterId: dto.drafterId,
                documentTemplateId: dto.documentTemplateId,
                status: approval_enum_1.DocumentStatus.DRAFT,
                metadata: dto.metadata,
            }, { queryRunner });
            const document = await this.documentService.save(documentEntity, { queryRunner });
            if (dto.approvalSteps && dto.approvalSteps.length > 0) {
                await this.createApprovalStepSnapshots(document.id, dto.approvalSteps, queryRunner);
            }
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
            if (dto.approvalSteps !== undefined && document.status !== approval_enum_1.DocumentStatus.DRAFT) {
                throw new common_1.BadRequestException('결재선은 임시저장 상태의 문서만 수정할 수 있습니다.');
            }
            const isTitleOrContentUpdated = dto.title !== undefined || dto.content !== undefined;
            let updatedMetadata = document.metadata;
            if (isTitleOrContentUpdated) {
                const existingHistory = document.metadata?.modificationHistory || [];
                const newHistoryItem = {
                    previousTitle: document.title,
                    previousContent: document.content,
                    modifiedAt: new Date().toISOString(),
                    modificationComment: dto.comment || '수정 사유 없음',
                    documentStatus: document.status,
                };
                updatedMetadata = {
                    ...(document.metadata || {}),
                    modificationHistory: [...existingHistory, newHistoryItem],
                };
            }
            const updatedDocument = await this.documentService.update(documentId, {
                title: dto.title ?? document.title,
                content: dto.content ?? document.content,
                comment: dto.comment ?? document.comment,
                metadata: updatedMetadata,
                status: dto.status ?? document.status,
            }, { queryRunner });
            if (dto.approvalSteps !== undefined) {
                await this.updateApprovalStepSnapshots(documentId, dto.approvalSteps, queryRunner);
            }
            this.logger.log(`문서 수정 완료: ${documentId}`);
            return updatedDocument;
        }, externalQueryRunner);
    }
    async submitDocument(dto, externalQueryRunner) {
        this.logger.log(`문서 기안 시작: ${dto.documentId}`);
        if (!dto.documentId) {
            throw new common_1.BadRequestException('기안할 문서 ID가 필요합니다.');
        }
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
            const documentTemplateId = dto.documentTemplateId || document.documentTemplateId || null;
            if (documentTemplateId) {
                const template = await this.documentTemplateService.findOne({
                    where: { id: documentTemplateId },
                    queryRunner,
                });
                if (!template) {
                    throw new common_1.NotFoundException(`문서 템플릿을 찾을 수 없습니다: ${documentTemplateId}`);
                }
            }
            const documentNumber = await this.generateDocumentNumber(documentTemplateId, queryRunner);
            if (dto.approvalSteps && dto.approvalSteps.length > 0) {
                await this.updateApprovalStepSnapshots(dto.documentId, dto.approvalSteps, queryRunner);
            }
            else {
                const existingSnapshots = await this.approvalStepSnapshotService.findAll({
                    where: { documentId: dto.documentId },
                    queryRunner,
                });
                if (existingSnapshots.length === 0) {
                    throw new common_1.BadRequestException('기안 시 결재선이 필요합니다.');
                }
            }
            const submittedDocument = await this.documentService.update(dto.documentId, {
                documentNumber,
                status: approval_enum_1.DocumentStatus.PENDING,
                submittedAt: new Date(),
            }, { queryRunner });
            this.logger.log(`문서 기안 완료: ${dto.documentId}, 문서번호: ${documentNumber}`);
            return submittedDocument;
        }, externalQueryRunner);
    }
    async generateDocumentNumber(documentTemplateId, queryRunner) {
        let templateCode = 'EXT';
        if (documentTemplateId) {
            const documentTemplate = await this.documentTemplateService.findOne({
                where: { id: documentTemplateId },
                queryRunner,
            });
            if (documentTemplate) {
                templateCode = documentTemplate.code;
            }
        }
        const currentYear = new Date().getFullYear().toString();
        const yearStart = `${currentYear}-01-01`;
        const yearEnd = `${currentYear}-12-31`;
        const countResult = await queryRunner.query(`SELECT COUNT(*) as count FROM documents 
             WHERE "documentNumber" LIKE $1 
             AND "submittedAt" >= $2 
             AND "submittedAt" <= $3
             AND "documentNumber" IS NOT NULL`, [`${templateCode}-${currentYear}-%`, yearStart, yearEnd]);
        const seq = parseInt(countResult[0]?.count || '0') + 1;
        const seqStr = seq.toString().padStart(4, '0');
        return `${templateCode}-${currentYear}-${seqStr}`;
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
            relations: ['drafter', 'approvalSteps'],
            order: {
                approvalSteps: {
                    stepOrder: 'ASC',
                },
            },
            queryRunner,
        });
        if (!document) {
            throw new common_1.NotFoundException(`문서를 찾을 수 없습니다: ${documentId}`);
        }
        return document;
    }
    async getDocuments(filter, queryRunner) {
        const qb = queryRunner
            ? queryRunner.manager.getRepository(document_entity_1.Document).createQueryBuilder('document')
            : this.documentService.createQueryBuilder('document');
        qb.leftJoinAndSelect('document.drafter', 'drafter')
            .leftJoinAndSelect('document.approvalSteps', 'approvalSteps')
            .orderBy('document.createdAt', 'DESC')
            .addOrderBy('approvalSteps.stepOrder', 'ASC');
        if (filter.referenceUserId) {
            qb.andWhere(`document.id IN (
                    SELECT DISTINCT d.id
                    FROM documents d
                    INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                    WHERE ass."stepType" = :referenceStepType
                    AND ass."approverId" = :referenceUserId
                    AND d.status != :draftStatus
                )`, {
                referenceStepType: approval_enum_1.ApprovalStepType.REFERENCE,
                referenceUserId: filter.referenceUserId,
                draftStatus: approval_enum_1.DocumentStatus.DRAFT,
            });
        }
        else if (filter.drafterId) {
            qb.andWhere('document.drafterId = :drafterId', { drafterId: filter.drafterId });
            if (filter.status) {
                qb.andWhere('document.status = :status', { status: filter.status });
            }
            if (filter.status === approval_enum_1.DocumentStatus.PENDING && filter.pendingStepType) {
                qb.andWhere(`document.id IN (
                        SELECT document_id
                        FROM (
                            SELECT DISTINCT ON (d.id)
                                d.id as document_id,
                                ass."stepType"
                            FROM documents d
                            INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                            WHERE d.status = :pendingStatus
                            AND ass.status = :pendingStepStatus
                            AND d."drafterId" = :drafterId
                            ORDER BY d.id, ass."stepOrder" ASC
                        ) current_steps
                        WHERE "stepType" = :stepType
                    )`, {
                    pendingStatus: approval_enum_1.DocumentStatus.PENDING,
                    pendingStepStatus: approval_enum_1.ApprovalStatus.PENDING,
                    stepType: filter.pendingStepType,
                });
            }
        }
        if (filter.documentTemplateId) {
            qb.andWhere('document.documentTemplateId = :documentTemplateId', {
                documentTemplateId: filter.documentTemplateId,
            });
        }
        if (filter.categoryId) {
            qb.leftJoin('document_templates', 'template', 'document.documentTemplateId = template.id');
            qb.andWhere('template.categoryId = :categoryId', { categoryId: filter.categoryId });
        }
        if (filter.searchKeyword) {
            qb.andWhere('document.title LIKE :keyword', { keyword: `%${filter.searchKeyword}%` });
        }
        if (filter.startDate) {
            qb.andWhere('document.createdAt >= :startDate', { startDate: filter.startDate });
        }
        if (filter.endDate) {
            qb.andWhere('document.createdAt <= :endDate', { endDate: filter.endDate });
        }
        const page = filter.page || 1;
        const limit = filter.limit || 20;
        const skip = (page - 1) * limit;
        const totalItems = await qb.getCount();
        const documents = await qb.skip(skip).take(limit).getMany();
        const totalPages = Math.ceil(totalItems / limit);
        return {
            data: documents,
            meta: {
                currentPage: page,
                itemsPerPage: limit,
                totalItems,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }
    async createApprovalStepSnapshots(documentId, approvalSteps, queryRunner) {
        if (!approvalSteps || approvalSteps.length === 0)
            return;
        for (const step of approvalSteps) {
            const approverSnapshot = await this.buildApproverSnapshot(step.approverId, queryRunner);
            const snapshotEntity = await this.approvalStepSnapshotService.create({
                documentId,
                stepOrder: step.stepOrder,
                stepType: step.stepType,
                approverId: step.approverId,
                approverSnapshot,
                status: approval_enum_1.ApprovalStatus.PENDING,
            }, { queryRunner });
            await this.approvalStepSnapshotService.save(snapshotEntity, { queryRunner });
        }
        this.logger.debug(`결재단계 스냅샷 ${approvalSteps.length}개 생성 완료: 문서 ${documentId}`);
    }
    async updateApprovalStepSnapshots(documentId, approvalSteps, queryRunner) {
        if (approvalSteps === undefined)
            return;
        const existingSnapshots = await this.approvalStepSnapshotService.findAll({
            where: { documentId },
            queryRunner,
        });
        const existingSnapshotIds = new Set(existingSnapshots.map((s) => s.id));
        const requestedSnapshotIds = new Set(approvalSteps.filter((step) => step.id).map((step) => step.id));
        const snapshotsToDelete = existingSnapshots.filter((s) => !requestedSnapshotIds.has(s.id));
        for (const snapshot of snapshotsToDelete) {
            await this.approvalStepSnapshotService.delete(snapshot.id, { queryRunner });
        }
        for (const step of approvalSteps) {
            const approverSnapshot = await this.buildApproverSnapshot(step.approverId, queryRunner);
            if (step.id && existingSnapshotIds.has(step.id)) {
                await this.approvalStepSnapshotService.update(step.id, {
                    stepOrder: step.stepOrder,
                    stepType: step.stepType,
                    approverId: step.approverId,
                    approverSnapshot,
                }, { queryRunner });
            }
            else {
                const snapshotEntity = await this.approvalStepSnapshotService.create({
                    documentId,
                    stepOrder: step.stepOrder,
                    stepType: step.stepType,
                    approverId: step.approverId,
                    approverSnapshot,
                    status: approval_enum_1.ApprovalStatus.PENDING,
                }, { queryRunner });
                await this.approvalStepSnapshotService.save(snapshotEntity, { queryRunner });
            }
        }
        this.logger.debug(`결재단계 스냅샷 업데이트 완료: 문서 ${documentId}, ${approvalSteps.length}개 처리, ${snapshotsToDelete.length}개 삭제`);
    }
    async buildApproverSnapshot(approverId, queryRunner) {
        const employee = await this.employeeService.findOne({
            where: { id: approverId },
            relations: [
                'departmentPositions',
                'departmentPositions.department',
                'departmentPositions.position',
                'currentRank',
            ],
            queryRunner,
        });
        if (!employee) {
            throw new common_1.NotFoundException(`결재자를 찾을 수 없습니다: ${approverId}`);
        }
        const currentDepartmentPosition = employee.departmentPositions?.find((dp) => dp.isManager) || employee.departmentPositions?.[0];
        const snapshot = {
            employeeName: employee.name,
            employeeNumber: employee.employeeNumber,
        };
        if (currentDepartmentPosition?.department) {
            snapshot.departmentId = currentDepartmentPosition.department.id;
            snapshot.departmentName = currentDepartmentPosition.department.departmentName;
        }
        if (currentDepartmentPosition?.position) {
            snapshot.positionId = currentDepartmentPosition.position.id;
            snapshot.positionTitle = currentDepartmentPosition.position.positionTitle;
        }
        if (employee.currentRank) {
            snapshot.rankId = employee.currentRank.id;
            snapshot.rankTitle = employee.currentRank.rankTitle;
        }
        return snapshot;
    }
    async getDocumentStatistics(userId) {
        this.logger.debug(`문서 통계 조회: 사용자 ${userId}`);
        const myDocumentsStats = await this.dataSource.query(`
            SELECT
                COUNT(*) FILTER (WHERE status = $1) as draft,
                COUNT(*) FILTER (WHERE "submittedAt" IS NOT NULL) as submitted,
                COUNT(*) FILTER (WHERE status = $2) as "pending",
                COUNT(*) FILTER (WHERE status = $3) as approved,
                COUNT(*) FILTER (WHERE status = $4) as rejected,
                COUNT(*) FILTER (WHERE status = $5) as implemented
            FROM documents
            WHERE "drafterId" = $6
            `, [
            approval_enum_1.DocumentStatus.DRAFT,
            approval_enum_1.DocumentStatus.PENDING,
            approval_enum_1.DocumentStatus.APPROVED,
            approval_enum_1.DocumentStatus.REJECTED,
            approval_enum_1.DocumentStatus.IMPLEMENTED,
            userId,
        ]);
        const pendingStepStats = await this.dataSource.query(`
            WITH current_steps AS (
                SELECT DISTINCT ON (d.id)
                    d.id as document_id,
                    ass."stepType"
                FROM documents d
                INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                WHERE d."drafterId" = $1
                AND d.status = $2
                AND ass.status = $3
                ORDER BY d.id, ass."stepOrder" ASC
            )
            SELECT
                COUNT(*) FILTER (WHERE "stepType" = $4) as agreement,
                COUNT(*) FILTER (WHERE "stepType" = $5) as approval
            FROM current_steps
            `, [
            userId,
            approval_enum_1.DocumentStatus.PENDING,
            approval_enum_1.ApprovalStatus.PENDING,
            approval_enum_1.ApprovalStepType.AGREEMENT,
            approval_enum_1.ApprovalStepType.APPROVAL,
        ]);
        const referenceStats = await this.dataSource.query(`
            SELECT COUNT(DISTINCT d.id) as reference
            FROM documents d
            INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
            WHERE ass."stepType" = $1
            AND ass."approverId" = $2
            AND d.status != $3
            `, [approval_enum_1.ApprovalStepType.REFERENCE, userId, approval_enum_1.DocumentStatus.DRAFT]);
        const myStats = myDocumentsStats[0];
        const pendingStats = pendingStepStats[0];
        const refStats = referenceStats[0];
        return {
            myDocuments: {
                draft: parseInt(myStats.draft || '0'),
                submitted: parseInt(myStats.submitted || '0'),
                agreement: parseInt(pendingStats.agreement || '0'),
                approval: parseInt(pendingStats.approval || '0'),
                approved: parseInt(myStats.approved || '0'),
                rejected: parseInt(myStats.rejected || '0'),
                implemented: parseInt(myStats.implemented || '0'),
            },
            othersDocuments: {
                reference: parseInt(refStats.reference || '0'),
            },
        };
    }
    async getMyAllDocumentsStatistics(userId) {
        this.logger.debug(`내 전체 문서 통계 조회: 사용자 ${userId}`);
        const filterTypes = [
            'DRAFT',
            'RECEIVED',
            'PENDING',
            'PENDING_AGREEMENT',
            'PENDING_APPROVAL',
            'IMPLEMENTATION',
            'APPROVED',
            'REJECTED',
            'RECEIVED_REFERENCE',
        ];
        const statistics = {};
        for (const filterType of filterTypes) {
            const qb = this.documentService.createQueryBuilder('document');
            this.applyFilterTypeCondition(qb, filterType, userId);
            const count = await qb.getCount();
            statistics[filterType] = count;
        }
        return statistics;
    }
    async getMyAllDocuments(params) {
        const page = params.page || 1;
        const limit = params.limit || 20;
        const skip = (page - 1) * limit;
        const baseQb = this.documentService.createQueryBuilder('document').orderBy('document.createdAt', 'DESC');
        this.applyFilterTypeCondition(baseQb, params.filterType || 'ALL', params.userId, params.approvalStatus, params.referenceReadStatus);
        if (params.searchKeyword) {
            baseQb.andWhere('document.title LIKE :keyword', { keyword: `%${params.searchKeyword}%` });
        }
        if (params.categoryId) {
            baseQb.leftJoin('document_templates', 'template', 'document.documentTemplateId = template.id');
            baseQb.andWhere('template.categoryId = :categoryId', { categoryId: params.categoryId });
        }
        if (params.startDate) {
            baseQb.andWhere('document.submittedAt >= :startDate', { startDate: params.startDate });
        }
        if (params.endDate) {
            baseQb.andWhere('document.submittedAt <= :endDate', { endDate: params.endDate });
        }
        const totalItems = await baseQb.getCount();
        const documentIds = await baseQb.clone().select('document.id').skip(skip).take(limit).getRawMany();
        this.logger.debug(`페이지네이션 적용: skip=${skip}, limit=${limit}, 조회된 ID 개수=${documentIds.length}, 전체=${totalItems}`);
        let documents = [];
        if (documentIds.length > 0) {
            const ids = documentIds.map((item) => item.document_id);
            const documentsMap = await this.documentService
                .createQueryBuilder('document')
                .leftJoinAndSelect('document.drafter', 'drafter')
                .leftJoinAndSelect('document.approvalSteps', 'approvalSteps')
                .whereInIds(ids)
                .addOrderBy('approvalSteps.stepOrder', 'ASC')
                .getMany();
            const templateIds = [...new Set(documentsMap.map((doc) => doc.documentTemplateId).filter(Boolean))];
            let templatesWithCategory = [];
            if (templateIds.length > 0) {
                const templateResults = await this.dataSource
                    .createQueryBuilder()
                    .select([
                    'dt.id as template_id',
                    'dt.name as template_name',
                    'dt.code as template_code',
                    'c.id as category_id',
                    'c.name as category_name',
                    'c.code as category_code',
                    'c.description as category_description',
                    'c.order as category_order',
                ])
                    .from('document_templates', 'dt')
                    .leftJoin('categories', 'c', 'dt.categoryId = c.id')
                    .where('dt.id IN (:...templateIds)', { templateIds })
                    .getRawMany();
                templatesWithCategory = templateResults.map((row) => ({
                    id: row.template_id,
                    name: row.template_name,
                    code: row.template_code,
                    category: row.category_id
                        ? {
                            id: row.category_id,
                            name: row.category_name,
                            code: row.category_code,
                            description: row.category_description,
                            order: row.category_order,
                        }
                        : undefined,
                }));
            }
            const templateMap = new Map(templatesWithCategory.map((t) => [t.id, t]));
            const documentsWithTemplate = documentsMap.map((doc) => ({
                ...doc,
                documentTemplate: doc.documentTemplateId ? templateMap.get(doc.documentTemplateId) : undefined,
            }));
            const docMap = new Map(documentsWithTemplate.map((doc) => [doc.id, doc]));
            documents = ids.map((id) => docMap.get(id)).filter((doc) => doc !== undefined);
        }
        const totalPages = Math.ceil(totalItems / limit);
        return {
            data: documents,
            meta: {
                currentPage: page,
                itemsPerPage: limit,
                totalItems,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }
    applyFilterTypeCondition(qb, filterType, userId, approvalStatus, referenceReadStatus) {
        switch (filterType) {
            case 'DRAFT':
                qb.andWhere('document.drafterId = :userId', { userId }).andWhere('document.status = :status', {
                    status: approval_enum_1.DocumentStatus.DRAFT,
                });
                break;
            case 'PENDING':
                qb.andWhere('document.drafterId = :userId', { userId }).andWhere('document.status = :status', {
                    status: approval_enum_1.DocumentStatus.PENDING,
                });
                break;
            case 'RECEIVED':
                qb.andWhere('document.drafterId != :userId', { userId })
                    .andWhere('document.status = :pendingStatus', { pendingStatus: approval_enum_1.DocumentStatus.PENDING })
                    .andWhere(`document.id IN (
                        SELECT DISTINCT d.id
                        FROM documents d
                        INNER JOIN approval_step_snapshots my_step ON d.id = my_step."documentId"
                        WHERE d.status = :pendingStatus
                        AND d."drafterId" != :userId
                        AND my_step."approverId" = :userId
                        AND my_step."stepType" IN (:...receivedStepTypes)
                        AND (
                            -- 아직 내 차례가 아닌 것 (앞에 PENDING 단계가 있음)
                            EXISTS (
                                SELECT 1
                                FROM approval_step_snapshots prior_step
                                WHERE prior_step."documentId" = my_step."documentId"
                                AND prior_step."stepOrder" < my_step."stepOrder"
                                AND prior_step.status = :pendingStepStatus
                            )
                            OR
                            -- 내 차례가 지나간 것 (내 단계가 APPROVED)
                            my_step.status = :approvedStepStatus
                        )
                    )`, {
                    receivedStepTypes: [approval_enum_1.ApprovalStepType.AGREEMENT, approval_enum_1.ApprovalStepType.APPROVAL],
                    pendingStepStatus: approval_enum_1.ApprovalStatus.PENDING,
                    approvedStepStatus: approval_enum_1.ApprovalStatus.APPROVED,
                });
                break;
            case 'PENDING_AGREEMENT':
                if (approvalStatus) {
                    this.applyApprovalStatusFilter(qb, userId, approval_enum_1.ApprovalStepType.AGREEMENT, approvalStatus);
                }
                else {
                    qb.andWhere('document.drafterId != :userId', { userId }).andWhere(`document.id IN (
                            SELECT DISTINCT my_step."documentId"
                            FROM approval_step_snapshots my_step
                            INNER JOIN documents d ON my_step."documentId" = d.id
                            WHERE my_step."approverId" = :userId
                            AND my_step."stepType" = :agreementType
                            AND d.status = :pendingStatus
                            AND d."drafterId" != :userId
                            AND my_step.status = :pendingStepStatus
                            AND NOT EXISTS (
                                SELECT 1
                                FROM approval_step_snapshots prior_step
                                WHERE prior_step."documentId" = my_step."documentId"
                                AND prior_step."stepOrder" < my_step."stepOrder"
                                AND prior_step.status = :pendingStepStatus
                            )
                        )`, {
                        pendingStatus: approval_enum_1.DocumentStatus.PENDING,
                        agreementType: approval_enum_1.ApprovalStepType.AGREEMENT,
                        pendingStepStatus: approval_enum_1.ApprovalStatus.PENDING,
                    });
                }
                break;
            case 'PENDING_APPROVAL':
                if (approvalStatus) {
                    this.applyApprovalStatusFilter(qb, userId, approval_enum_1.ApprovalStepType.APPROVAL, approvalStatus);
                }
                else {
                    qb.andWhere('document.drafterId != :userId', { userId }).andWhere(`document.id IN (
                            SELECT DISTINCT my_step."documentId"
                            FROM approval_step_snapshots my_step
                            INNER JOIN documents d ON my_step."documentId" = d.id
                            WHERE my_step."approverId" = :userId
                            AND my_step."stepType" = :approvalType
                            AND d.status = :pendingStatus
                            AND d."drafterId" != :userId
                            AND my_step.status = :pendingStepStatus
                            AND NOT EXISTS (
                                SELECT 1
                                FROM approval_step_snapshots prior_step
                                WHERE prior_step."documentId" = my_step."documentId"
                                AND prior_step."stepOrder" < my_step."stepOrder"
                                AND prior_step.status = :pendingStepStatus
                            )
                        )`, {
                        pendingStatus: approval_enum_1.DocumentStatus.PENDING,
                        approvalType: approval_enum_1.ApprovalStepType.APPROVAL,
                        pendingStepStatus: approval_enum_1.ApprovalStatus.PENDING,
                    });
                }
                break;
            case 'IMPLEMENTATION':
                qb.andWhere('document.drafterId != :userId', { userId }).andWhere(`document.id IN (
                        SELECT DISTINCT d.id
                        FROM documents d
                        INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                        WHERE d.status = :approvedStatus
                        AND d."drafterId" != :userId
                        AND ass."approverId" = :userId
                        AND ass."stepType" = :implementationType
                        AND ass.status = :pendingStepStatus
                    )`, {
                    approvedStatus: approval_enum_1.DocumentStatus.APPROVED,
                    implementationType: approval_enum_1.ApprovalStepType.IMPLEMENTATION,
                    pendingStepStatus: approval_enum_1.ApprovalStatus.PENDING,
                });
                break;
            case 'APPROVED':
                qb.andWhere(`(
                        (document.drafterId = :userId AND document.status IN (:...completedStatuses))
                        OR
                        (document.drafterId != :userId AND document.id IN (
                            SELECT DISTINCT d.id
                            FROM documents d
                            INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                            WHERE ass."approverId" = :userId
                            AND d.status IN (:...completedStatuses2)
                        ))
                    )`, {
                    userId,
                    completedStatuses: [approval_enum_1.DocumentStatus.APPROVED, approval_enum_1.DocumentStatus.IMPLEMENTED],
                    completedStatuses2: [approval_enum_1.DocumentStatus.APPROVED, approval_enum_1.DocumentStatus.IMPLEMENTED],
                });
                break;
            case 'REJECTED':
                qb.andWhere(`(
                        (document.drafterId = :userId AND document.status = :rejectedStatus)
                        OR
                        (document.drafterId != :userId AND document.id IN (
                            SELECT DISTINCT d.id
                            FROM documents d
                            INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                            WHERE ass."approverId" = :userId
                            AND d.status = :rejectedStatus2
                        ))
                    )`, {
                    userId,
                    rejectedStatus: approval_enum_1.DocumentStatus.REJECTED,
                    rejectedStatus2: approval_enum_1.DocumentStatus.REJECTED,
                });
                break;
            case 'RECEIVED_REFERENCE':
                qb.andWhere('document.drafterId != :userId', { userId }).andWhere('document.status = :implementedStatus', { implementedStatus: approval_enum_1.DocumentStatus.IMPLEMENTED });
                if (referenceReadStatus) {
                    const statusCondition = referenceReadStatus === 'READ' ? approval_enum_1.ApprovalStatus.APPROVED : approval_enum_1.ApprovalStatus.PENDING;
                    qb.andWhere(`document.id IN (
                        SELECT d.id
                        FROM documents d
                        INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                        WHERE ass."stepType" = :referenceType
                        AND ass."approverId" = :userId
                        AND ass."status" = :referenceStatus
                        AND d.status = :implementedStatus
                    )`, {
                        referenceType: approval_enum_1.ApprovalStepType.REFERENCE,
                        referenceStatus: statusCondition,
                    });
                }
                else {
                    qb.andWhere(`document.id IN (
                        SELECT d.id
                        FROM documents d
                        INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                        WHERE ass."stepType" = :referenceType
                        AND ass."approverId" = :userId
                        AND d.status = :implementedStatus
                    )`, {
                        referenceType: approval_enum_1.ApprovalStepType.REFERENCE,
                    });
                }
                break;
            case 'ALL':
            default:
                qb.andWhere(`(
                        document.drafterId = :userId
                        OR
                        document.id IN (
                            SELECT d.id
                            FROM documents d
                            INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                            WHERE ass."approverId" = :userId
                            AND d.status != :draftStatus
                        )
                    )`, {
                    userId,
                    draftStatus: approval_enum_1.DocumentStatus.DRAFT,
                });
                break;
        }
    }
    applyApprovalStatusFilter(qb, userId, stepType, approvalStatus) {
        switch (approvalStatus) {
            case 'SCHEDULED':
                qb.andWhere(`document.id IN (
                        SELECT DISTINCT my_step."documentId"
                        FROM approval_step_snapshots my_step
                        INNER JOIN documents d ON my_step."documentId" = d.id
                        WHERE my_step."approverId" = :userId
                        AND my_step."stepType" = :stepType
                        AND d.status = :pendingStatus
                        AND EXISTS (
                            SELECT 1
                            FROM approval_step_snapshots prior_step
                            WHERE prior_step."documentId" = my_step."documentId"
                            AND prior_step."stepOrder" < my_step."stepOrder"
                            AND prior_step.status = :pendingStepStatus
                        )
                    )`, {
                    userId,
                    stepType,
                    pendingStatus: approval_enum_1.DocumentStatus.PENDING,
                    pendingStepStatus: approval_enum_1.ApprovalStatus.PENDING,
                });
                break;
            case 'CURRENT':
                qb.andWhere(`document.id IN (
                        SELECT my_step."documentId"
                        FROM approval_step_snapshots my_step
                        INNER JOIN documents d ON my_step."documentId" = d.id
                        WHERE my_step."approverId" = :userId
                        AND my_step."stepType" = :stepType
                        AND my_step.status = :pendingStepStatus
                        AND d.status = :pendingStatus
                        AND NOT EXISTS (
                            SELECT 1
                            FROM approval_step_snapshots prior_step
                            WHERE prior_step."documentId" = my_step."documentId"
                            AND prior_step."stepOrder" < my_step."stepOrder"
                            AND prior_step.status != :approvedStatus
                        )
                    )`, {
                    userId,
                    stepType,
                    pendingStatus: approval_enum_1.DocumentStatus.PENDING,
                    pendingStepStatus: approval_enum_1.ApprovalStatus.PENDING,
                    approvedStatus: approval_enum_1.ApprovalStatus.APPROVED,
                });
                break;
            case 'COMPLETED':
                qb.andWhere(`document.id IN (
                        SELECT DISTINCT d.id
                        FROM documents d
                        INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                        WHERE d.status = :pendingStatus
                        AND ass."approverId" = :userId
                        AND ass."stepType" = :stepType
                        AND ass.status = :approvedStatus
                    )`, {
                    userId,
                    stepType,
                    pendingStatus: approval_enum_1.DocumentStatus.PENDING,
                    approvedStatus: approval_enum_1.ApprovalStatus.APPROVED,
                });
                break;
        }
    }
    async getMyDrafts(drafterId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const qb = this.documentService
            .createQueryBuilder('document')
            .leftJoinAndSelect('document.drafter', 'drafter')
            .leftJoinAndSelect('document.approvalSteps', 'approvalSteps')
            .where('document.drafterId = :drafterId', { drafterId })
            .orderBy('document.createdAt', 'DESC')
            .addOrderBy('approvalSteps.stepOrder', 'ASC');
        const totalItems = await qb.getCount();
        const documents = await qb.skip(skip).take(limit).getMany();
        const totalPages = Math.ceil(totalItems / limit);
        return {
            data: documents,
            meta: {
                currentPage: page,
                itemsPerPage: limit,
                totalItems,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }
};
exports.DocumentContext = DocumentContext;
exports.DocumentContext = DocumentContext = DocumentContext_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        document_service_1.DomainDocumentService,
        document_template_service_1.DomainDocumentTemplateService,
        employee_service_1.DomainEmployeeService,
        approval_step_snapshot_service_1.DomainApprovalStepSnapshotService])
], DocumentContext);
//# sourceMappingURL=document.context.js.map