"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentFilterBuilder = void 0;
const common_1 = require("@nestjs/common");
const approval_enum_1 = require("../../../common/enums/approval.enum");
let DocumentFilterBuilder = class DocumentFilterBuilder {
    applyFilter(qb, filterType, userId, options) {
        switch (filterType) {
            case 'DRAFT':
                this.applyDraftFilter(qb, userId);
                break;
            case 'PENDING':
                this.applyPendingFilter(qb, userId);
                break;
            case 'RECEIVED':
                this.applyReceivedFilter(qb, userId, options?.receivedStepType);
                break;
            case 'PENDING_AGREEMENT':
                this.applyPendingAgreementFilter(qb, userId);
                break;
            case 'PENDING_APPROVAL':
                this.applyPendingApprovalFilter(qb, userId);
                break;
            case 'IMPLEMENTATION':
                this.applyImplementationFilter(qb, userId);
                break;
            case 'APPROVED':
                this.applyApprovedFilter(qb, userId, options?.drafterFilter);
                break;
            case 'REJECTED':
                this.applyRejectedFilter(qb, userId, options?.drafterFilter);
                break;
            case 'RECEIVED_REFERENCE':
                this.applyReceivedReferenceFilter(qb, userId, options?.referenceReadStatus);
                break;
            case 'ALL':
            default:
                this.applyAllFilter(qb, userId);
                break;
        }
    }
    applyDraftFilter(qb, userId) {
        qb.andWhere('document.drafterId = :userId', { userId }).andWhere('document.status = :status', {
            status: approval_enum_1.DocumentStatus.DRAFT,
        });
    }
    applyPendingFilter(qb, userId) {
        qb.andWhere('document.drafterId = :userId', { userId }).andWhere('document.status = :status', {
            status: approval_enum_1.DocumentStatus.PENDING,
        });
    }
    applyReceivedFilter(qb, userId, receivedStepType) {
        const receivedStepTypes = receivedStepType
            ? [receivedStepType === 'AGREEMENT' ? approval_enum_1.ApprovalStepType.AGREEMENT : approval_enum_1.ApprovalStepType.APPROVAL]
            : [approval_enum_1.ApprovalStepType.AGREEMENT, approval_enum_1.ApprovalStepType.APPROVAL];
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
            receivedStepTypes,
            pendingStepStatus: approval_enum_1.ApprovalStatus.PENDING,
            approvedStepStatus: approval_enum_1.ApprovalStatus.APPROVED,
        });
    }
    applyPendingAgreementFilter(qb, userId) {
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
    applyPendingApprovalFilter(qb, userId) {
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
    applyImplementationFilter(qb, userId) {
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
    }
    applyApprovedFilter(qb, userId, drafterFilter) {
        if (drafterFilter === 'MY_DRAFT') {
            qb.andWhere('document.drafterId = :userId', { userId }).andWhere('document.status IN (:...completedStatuses)', {
                completedStatuses: [approval_enum_1.DocumentStatus.APPROVED, approval_enum_1.DocumentStatus.IMPLEMENTED],
            });
        }
        else if (drafterFilter === 'PARTICIPATED') {
            qb.andWhere('document.drafterId != :userId', { userId }).andWhere(`document.id IN (
                    SELECT DISTINCT d.id
                    FROM documents d
                    INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                    WHERE ass."approverId" = :userId
                    AND d.status IN (:...completedStatuses)
                )`, {
                completedStatuses: [approval_enum_1.DocumentStatus.APPROVED, approval_enum_1.DocumentStatus.IMPLEMENTED],
            });
        }
        else {
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
        }
    }
    applyRejectedFilter(qb, userId, drafterFilter) {
        if (drafterFilter === 'MY_DRAFT') {
            qb.andWhere('document.drafterId = :userId', { userId }).andWhere('document.status = :rejectedStatus', {
                rejectedStatus: approval_enum_1.DocumentStatus.REJECTED,
            });
        }
        else if (drafterFilter === 'PARTICIPATED') {
            qb.andWhere('document.drafterId != :userId', { userId }).andWhere(`document.id IN (
                    SELECT DISTINCT d.id
                    FROM documents d
                    INNER JOIN approval_step_snapshots ass ON d.id = ass."documentId"
                    WHERE ass."approverId" = :userId
                    AND d.status = :rejectedStatus
                )`, {
                rejectedStatus: approval_enum_1.DocumentStatus.REJECTED,
            });
        }
        else {
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
        }
    }
    applyReceivedReferenceFilter(qb, userId, referenceReadStatus) {
        qb.andWhere('document.drafterId != :userId', { userId }).andWhere('document.status = :implementedStatus', {
            implementedStatus: approval_enum_1.DocumentStatus.IMPLEMENTED,
        });
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
    }
    applyAllFilter(qb, userId) {
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
    }
};
exports.DocumentFilterBuilder = DocumentFilterBuilder;
exports.DocumentFilterBuilder = DocumentFilterBuilder = __decorate([
    (0, common_1.Injectable)()
], DocumentFilterBuilder);
//# sourceMappingURL=document-filter.builder.js.map