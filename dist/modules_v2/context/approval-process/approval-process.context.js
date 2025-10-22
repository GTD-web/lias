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
var ApprovalProcessContext_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalProcessContext = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const approval_step_snapshot_service_1 = require("../../domain/approval-step-snapshot/approval-step-snapshot.service");
const approval_line_snapshot_service_1 = require("../../domain/approval-line-snapshot/approval-line-snapshot.service");
const document_service_1 = require("../../domain/document/document.service");
const approval_enum_1 = require("../../../common/enums/approval.enum");
const transaction_util_1 = require("../../../common/utils/transaction.util");
let ApprovalProcessContext = ApprovalProcessContext_1 = class ApprovalProcessContext {
    constructor(dataSource, approvalStepSnapshotService, approvalLineSnapshotService, documentService) {
        this.dataSource = dataSource;
        this.approvalStepSnapshotService = approvalStepSnapshotService;
        this.approvalLineSnapshotService = approvalLineSnapshotService;
        this.documentService = documentService;
        this.logger = new common_1.Logger(ApprovalProcessContext_1.name);
    }
    async approveStep(dto, externalQueryRunner) {
        this.logger.log(`결재 승인 시작: ${dto.stepSnapshotId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const step = await this.approvalStepSnapshotService.findOne({
                where: { id: dto.stepSnapshotId },
                queryRunner,
            });
            if (!step) {
                throw new common_1.NotFoundException(`결재 단계를 찾을 수 없습니다: ${dto.stepSnapshotId}`);
            }
            if (step.approverId !== dto.approverId) {
                throw new common_1.ForbiddenException('해당 결재를 승인할 권한이 없습니다.');
            }
            if (step.status !== approval_enum_1.ApprovalStatus.PENDING) {
                throw new common_1.BadRequestException('대기 중인 결재만 승인할 수 있습니다.');
            }
            if (step.stepType !== approval_enum_1.ApprovalStepType.APPROVAL) {
                throw new common_1.BadRequestException('결재 단계만 승인할 수 있습니다.');
            }
            await this.validateApprovalOrder(step, queryRunner);
            const approvedStep = await this.approvalStepSnapshotService.update(dto.stepSnapshotId, {
                status: approval_enum_1.ApprovalStatus.APPROVED,
                comment: dto.comment,
                approvedAt: new Date(),
            }, { queryRunner });
            await this.checkAndUpdateDocumentStatus(step.snapshotId, queryRunner);
            this.logger.log(`결재 승인 완료: ${dto.stepSnapshotId}`);
            return approvedStep;
        }, externalQueryRunner);
    }
    async rejectStep(dto, externalQueryRunner) {
        this.logger.log(`결재 반려 시작: ${dto.stepSnapshotId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const step = await this.approvalStepSnapshotService.findOne({
                where: { id: dto.stepSnapshotId },
                queryRunner,
            });
            if (!step) {
                throw new common_1.NotFoundException(`결재 단계를 찾을 수 없습니다: ${dto.stepSnapshotId}`);
            }
            if (step.approverId !== dto.approverId) {
                throw new common_1.ForbiddenException('해당 결재를 반려할 권한이 없습니다.');
            }
            if (step.status !== approval_enum_1.ApprovalStatus.PENDING) {
                throw new common_1.BadRequestException('대기 중인 결재만 반려할 수 있습니다.');
            }
            if (!dto.comment || dto.comment.trim().length === 0) {
                throw new common_1.BadRequestException('반려 사유를 입력해야 합니다.');
            }
            if (step.stepType !== approval_enum_1.ApprovalStepType.APPROVAL) {
                throw new common_1.BadRequestException('결재 단계만 반려할 수 있습니다.');
            }
            await this.validateApprovalOrder(step, queryRunner);
            const rejectedStep = await this.approvalStepSnapshotService.update(dto.stepSnapshotId, {
                status: approval_enum_1.ApprovalStatus.REJECTED,
                comment: dto.comment,
                approvedAt: new Date(),
            }, { queryRunner });
            const snapshot = await this.approvalLineSnapshotService.findOne({
                where: { id: step.snapshotId },
                queryRunner,
            });
            if (snapshot) {
                await this.documentService.update(snapshot.documentId, { status: approval_enum_1.DocumentStatus.REJECTED }, { queryRunner });
            }
            this.logger.log(`결재 반려 완료: ${dto.stepSnapshotId}`);
            return rejectedStep;
        }, externalQueryRunner);
    }
    async completeAgreement(dto, externalQueryRunner) {
        this.logger.log(`협의 완료 시작: ${dto.stepSnapshotId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const step = await this.approvalStepSnapshotService.findOne({
                where: { id: dto.stepSnapshotId },
                queryRunner,
            });
            if (!step) {
                throw new common_1.NotFoundException(`협의 단계를 찾을 수 없습니다: ${dto.stepSnapshotId}`);
            }
            if (step.approverId !== dto.agreerId) {
                throw new common_1.ForbiddenException('해당 협의를 완료할 권한이 없습니다.');
            }
            if (step.stepType !== approval_enum_1.ApprovalStepType.AGREEMENT) {
                throw new common_1.BadRequestException('협의 단계만 처리할 수 있습니다.');
            }
            if (step.status !== approval_enum_1.ApprovalStatus.PENDING) {
                throw new common_1.BadRequestException('대기 중인 협의만 완료할 수 있습니다.');
            }
            const completedStep = await this.approvalStepSnapshotService.update(dto.stepSnapshotId, {
                status: approval_enum_1.ApprovalStatus.APPROVED,
                comment: dto.comment,
                approvedAt: new Date(),
            }, { queryRunner });
            this.logger.log(`협의 완료: ${dto.stepSnapshotId}`);
            return completedStep;
        }, externalQueryRunner);
    }
    async completeImplementation(dto, externalQueryRunner) {
        this.logger.log(`시행 완료 시작: ${dto.stepSnapshotId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const step = await this.approvalStepSnapshotService.findOne({
                where: { id: dto.stepSnapshotId },
                queryRunner,
            });
            if (!step) {
                throw new common_1.NotFoundException(`시행 단계를 찾을 수 없습니다: ${dto.stepSnapshotId}`);
            }
            if (step.approverId !== dto.implementerId) {
                throw new common_1.ForbiddenException('해당 시행을 완료할 권한이 없습니다.');
            }
            if (step.stepType !== approval_enum_1.ApprovalStepType.IMPLEMENTATION) {
                throw new common_1.BadRequestException('시행 단계만 처리할 수 있습니다.');
            }
            if (step.status !== approval_enum_1.ApprovalStatus.PENDING) {
                throw new common_1.BadRequestException('대기 중인 시행만 완료할 수 있습니다.');
            }
            await this.validateImplementationPrecondition(step, queryRunner);
            const completedStep = await this.approvalStepSnapshotService.update(dto.stepSnapshotId, {
                status: approval_enum_1.ApprovalStatus.APPROVED,
                comment: dto.comment,
                approvedAt: new Date(),
            }, { queryRunner });
            const snapshot = await this.approvalLineSnapshotService.findOne({
                where: { id: step.snapshotId },
                queryRunner,
            });
            if (snapshot) {
                await this.documentService.update(snapshot.documentId, {
                    status: approval_enum_1.DocumentStatus.IMPLEMENTED,
                    metadata: dto.resultData,
                }, { queryRunner });
            }
            this.logger.log(`시행 완료: ${dto.stepSnapshotId}`);
            return completedStep;
        }, externalQueryRunner);
    }
    async cancelApproval(dto, externalQueryRunner) {
        this.logger.log(`결재 취소 시작: ${dto.documentId}`);
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const document = await this.documentService.findOne({
                where: { id: dto.documentId },
                queryRunner,
            });
            if (!document) {
                throw new common_1.NotFoundException(`문서를 찾을 수 없습니다: ${dto.documentId}`);
            }
            if (document.drafterId !== dto.drafterId) {
                throw new common_1.ForbiddenException('문서 작성자만 취소할 수 있습니다.');
            }
            if (document.status !== approval_enum_1.DocumentStatus.PENDING) {
                throw new common_1.BadRequestException('결재 진행 중인 문서만 취소할 수 있습니다.');
            }
            const cancelledDocument = await this.documentService.update(dto.documentId, {
                status: approval_enum_1.DocumentStatus.CANCELLED,
                cancelReason: dto.reason,
                cancelledAt: new Date(),
            }, { queryRunner });
            this.logger.log(`결재 취소 완료: ${dto.documentId}`);
            return cancelledDocument;
        }, externalQueryRunner);
    }
    async getMyPendingApprovals(approverId, queryRunner) {
        const allPendingSteps = await this.approvalStepSnapshotService.findAll({
            where: {
                approverId,
                status: approval_enum_1.ApprovalStatus.PENDING,
            },
            relations: ['snapshot', 'approver', 'approverDepartment', 'approverPosition'],
            order: { createdAt: 'DESC' },
            queryRunner,
        });
        const processableSteps = [];
        for (const step of allPendingSteps) {
            if (await this.canProcessStep(step, queryRunner)) {
                processableSteps.push(step);
            }
        }
        return processableSteps;
    }
    async getApprovalSteps(documentId, queryRunner) {
        const document = await this.documentService.findOne({
            where: { id: documentId },
            queryRunner,
        });
        if (!document || !document.approvalLineSnapshotId) {
            throw new common_1.NotFoundException(`문서의 결재선을 찾을 수 없습니다: ${documentId}`);
        }
        return await this.approvalStepSnapshotService.findAll({
            where: { snapshotId: document.approvalLineSnapshotId },
            relations: ['approver', 'approverDepartment', 'approverPosition'],
            order: { stepOrder: 'ASC' },
            queryRunner,
        });
    }
    async checkAndUpdateDocumentStatus(snapshotId, queryRunner) {
        const allSteps = await this.approvalStepSnapshotService.findAll({
            where: { snapshotId },
            order: { stepOrder: 'ASC' },
            queryRunner,
        });
        const agreementSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.AGREEMENT);
        const allAgreementsCompleted = agreementSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
        if (agreementSteps.length > 0 && !allAgreementsCompleted) {
            this.logger.log('협의가 아직 완료되지 않았습니다.');
            return;
        }
        const approvalSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.APPROVAL);
        const allApprovalsCompleted = approvalSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
        if (!allApprovalsCompleted) {
            this.logger.log('결재가 아직 완료되지 않았습니다.');
            return;
        }
        const implementationSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.IMPLEMENTATION);
        if (implementationSteps.length > 0) {
            const allImplementationsCompleted = implementationSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
            if (!allImplementationsCompleted) {
                this.logger.log('시행이 아직 완료되지 않았습니다.');
                return;
            }
        }
        const snapshot = await this.approvalLineSnapshotService.findOne({
            where: { id: snapshotId },
            queryRunner,
        });
        if (snapshot) {
            const finalStatus = implementationSteps.length > 0 ? approval_enum_1.DocumentStatus.IMPLEMENTED : approval_enum_1.DocumentStatus.APPROVED;
            await this.documentService.update(snapshot.documentId, { status: finalStatus }, { queryRunner });
            this.logger.log(`문서 상태 업데이트: ${snapshot.documentId} -> ${finalStatus}`);
        }
    }
    async validateApprovalOrder(currentStep, queryRunner) {
        const allSteps = await this.approvalStepSnapshotService.findAll({
            where: { snapshotId: currentStep.snapshotId },
            order: { stepOrder: 'ASC' },
            queryRunner,
        });
        const agreementSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.AGREEMENT);
        if (agreementSteps.length > 0) {
            const allAgreementsCompleted = agreementSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
            if (!allAgreementsCompleted) {
                throw new common_1.BadRequestException('모든 협의가 완료되어야 결재를 진행할 수 있습니다.');
            }
        }
        const approvalSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.APPROVAL);
        for (const step of approvalSteps) {
            if (step.stepOrder < currentStep.stepOrder) {
                if (step.status !== approval_enum_1.ApprovalStatus.APPROVED) {
                    throw new common_1.BadRequestException(`이전 결재 단계(${step.stepOrder}단계)가 완료되어야 현재 단계를 승인할 수 있습니다.`);
                }
            }
        }
        this.logger.debug(`결재 순서 검증 통과: ${currentStep.id}`);
    }
    async validateImplementationPrecondition(currentStep, queryRunner) {
        const allSteps = await this.approvalStepSnapshotService.findAll({
            where: { snapshotId: currentStep.snapshotId },
            order: { stepOrder: 'ASC' },
            queryRunner,
        });
        const agreementSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.AGREEMENT);
        if (agreementSteps.length > 0) {
            const allAgreementsCompleted = agreementSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
            if (!allAgreementsCompleted) {
                throw new common_1.BadRequestException('모든 협의가 완료되어야 시행할 수 있습니다.');
            }
        }
        const approvalSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.APPROVAL);
        const allApprovalsCompleted = approvalSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
        if (!allApprovalsCompleted) {
            throw new common_1.BadRequestException('모든 결재가 완료되어야 시행할 수 있습니다.');
        }
        this.logger.debug(`시행 가능 여부 검증 통과: ${currentStep.id}`);
    }
    async canProcessStep(step, queryRunner) {
        try {
            const allSteps = await this.approvalStepSnapshotService.findAll({
                where: { snapshotId: step.snapshotId },
                order: { stepOrder: 'ASC' },
                queryRunner,
            });
            if (step.stepType === approval_enum_1.ApprovalStepType.AGREEMENT) {
                return true;
            }
            if (step.stepType === approval_enum_1.ApprovalStepType.APPROVAL) {
                const agreementSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.AGREEMENT);
                if (agreementSteps.length > 0) {
                    const allAgreementsCompleted = agreementSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
                    if (!allAgreementsCompleted) {
                        return false;
                    }
                }
                const approvalSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.APPROVAL);
                for (const prevStep of approvalSteps) {
                    if (prevStep.stepOrder < step.stepOrder) {
                        if (prevStep.status !== approval_enum_1.ApprovalStatus.APPROVED) {
                            return false;
                        }
                    }
                }
                return true;
            }
            if (step.stepType === approval_enum_1.ApprovalStepType.IMPLEMENTATION) {
                const agreementSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.AGREEMENT);
                if (agreementSteps.length > 0) {
                    const allAgreementsCompleted = agreementSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
                    if (!allAgreementsCompleted) {
                        return false;
                    }
                }
                const approvalSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.APPROVAL);
                const allApprovalsCompleted = approvalSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
                return allApprovalsCompleted;
            }
            if (step.stepType === approval_enum_1.ApprovalStepType.REFERENCE) {
                return false;
            }
            return false;
        }
        catch (error) {
            this.logger.error(`단계 처리 가능 여부 확인 실패: ${step.id}`, error);
            return false;
        }
    }
};
exports.ApprovalProcessContext = ApprovalProcessContext;
exports.ApprovalProcessContext = ApprovalProcessContext = ApprovalProcessContext_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        approval_step_snapshot_service_1.DomainApprovalStepSnapshotService,
        approval_line_snapshot_service_1.DomainApprovalLineSnapshotService,
        document_service_1.DomainDocumentService])
], ApprovalProcessContext);
//# sourceMappingURL=approval-process.context.js.map