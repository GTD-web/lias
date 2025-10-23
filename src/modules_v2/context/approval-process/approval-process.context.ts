import { Injectable, Logger, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { DomainApprovalStepSnapshotService } from '../../domain/approval-step-snapshot/approval-step-snapshot.service';
import { DomainApprovalLineSnapshotService } from '../../domain/approval-line-snapshot/approval-line-snapshot.service';
import { DomainDocumentService } from '../../domain/document/document.service';
import {
    ApproveStepDto,
    RejectStepDto,
    CompleteAgreementDto,
    CompleteImplementationDto,
    CancelApprovalDto,
    ApprovalStepFilterDto,
} from './dtos/approval-action.dto';
import { ApprovalStatus, ApprovalStepType, DocumentStatus } from '../../../common/enums/approval.enum';
import { withTransaction } from '../../../common/utils/transaction.util';

/**
 * 결재 프로세스 컨텍스트
 *
 * 역할:
 * - 결재 승인/반려 처리
 * - 협의 완료 처리
 * - 시행 완료 처리
 * - 결재 취소 처리
 * - 결재 상태 조회
 * - 다음 결재자 자동 이동
 */
@Injectable()
export class ApprovalProcessContext {
    private readonly logger = new Logger(ApprovalProcessContext.name);

    constructor(
        private readonly dataSource: DataSource,
        private readonly approvalStepSnapshotService: DomainApprovalStepSnapshotService,
        private readonly approvalLineSnapshotService: DomainApprovalLineSnapshotService,
        private readonly documentService: DomainDocumentService,
    ) {}

    /**
     * 1. 결재 승인 처리
     */
    async approveStep(dto: ApproveStepDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`결재 승인 시작: ${dto.stepSnapshotId}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 1) Step 조회
                const step = await this.approvalStepSnapshotService.findOne({
                    where: { id: dto.stepSnapshotId },
                    queryRunner,
                });

                if (!step) {
                    throw new NotFoundException(`결재 단계를 찾을 수 없습니다: ${dto.stepSnapshotId}`);
                }

                // 2) 권한 확인
                if (step.approverId !== dto.approverId) {
                    throw new ForbiddenException('해당 결재를 승인할 권한이 없습니다.');
                }

                // 3) 상태 확인
                if (step.status !== ApprovalStatus.PENDING) {
                    throw new BadRequestException('대기 중인 결재만 승인할 수 있습니다.');
                }

                // 4) 결재 단계가 APPROVAL인지 확인
                if (step.stepType !== ApprovalStepType.APPROVAL) {
                    throw new BadRequestException('결재 단계만 승인할 수 있습니다.');
                }

                // 5) 결재 순서 검증
                await this.validateApprovalOrder(step, queryRunner);

                // 6) 승인 처리
                const approvedStep = await this.approvalStepSnapshotService.update(
                    dto.stepSnapshotId,
                    {
                        status: ApprovalStatus.APPROVED,
                        comment: dto.comment,
                        approvedAt: new Date(),
                    },
                    { queryRunner },
                );

                // 7) 다음 단계 확인 및 문서 상태 업데이트
                await this.checkAndUpdateDocumentStatus(step.snapshotId, queryRunner);

                this.logger.log(`결재 승인 완료: ${dto.stepSnapshotId}`);
                return approvedStep;
            },
            externalQueryRunner,
        );
    }

    /**
     * 2. 결재 반려 처리
     */
    async rejectStep(dto: RejectStepDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`결재 반려 시작: ${dto.stepSnapshotId}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 1) Step 조회
                const step = await this.approvalStepSnapshotService.findOne({
                    where: { id: dto.stepSnapshotId },
                    queryRunner,
                });

                if (!step) {
                    throw new NotFoundException(`결재 단계를 찾을 수 없습니다: ${dto.stepSnapshotId}`);
                }

                // 2) 권한 확인
                if (step.approverId !== dto.approverId) {
                    throw new ForbiddenException('해당 결재를 반려할 권한이 없습니다.');
                }

                // 3) 상태 확인
                if (step.status !== ApprovalStatus.PENDING) {
                    throw new BadRequestException('대기 중인 결재만 반려할 수 있습니다.');
                }

                // 4) 반려 사유 확인
                if (!dto.comment || dto.comment.trim().length === 0) {
                    throw new BadRequestException('반려 사유를 입력해야 합니다.');
                }

                // 5) 결재 단계가 APPROVAL인지 확인
                if (step.stepType !== ApprovalStepType.APPROVAL) {
                    throw new BadRequestException('결재 단계만 반려할 수 있습니다.');
                }

                // 6) 결재 순서 검증 (반려도 차례가 되어야 가능)
                await this.validateApprovalOrder(step, queryRunner);

                // 7) 반려 처리
                const rejectedStep = await this.approvalStepSnapshotService.update(
                    dto.stepSnapshotId,
                    {
                        status: ApprovalStatus.REJECTED,
                        comment: dto.comment,
                        approvedAt: new Date(),
                    },
                    { queryRunner },
                );

                // 8) Document 상태를 REJECTED로 변경
                const snapshot = await this.approvalLineSnapshotService.findOne({
                    where: { id: step.snapshotId },
                    queryRunner,
                });

                if (snapshot) {
                    await this.documentService.update(
                        snapshot.documentId,
                        { status: DocumentStatus.REJECTED },
                        { queryRunner },
                    );
                }

                this.logger.log(`결재 반려 완료: ${dto.stepSnapshotId}`);
                return rejectedStep;
            },
            externalQueryRunner,
        );
    }

    /**
     * 3. 협의 완료 처리
     */
    async completeAgreement(dto: CompleteAgreementDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`협의 완료 시작: ${dto.stepSnapshotId}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 1) Step 조회
                const step = await this.approvalStepSnapshotService.findOne({
                    where: { id: dto.stepSnapshotId },
                    queryRunner,
                });

                if (!step) {
                    throw new NotFoundException(`협의 단계를 찾을 수 없습니다: ${dto.stepSnapshotId}`);
                }

                // 2) 권한 확인
                if (step.approverId !== dto.agreerId) {
                    throw new ForbiddenException('해당 협의를 완료할 권한이 없습니다.');
                }

                // 3) 단계 타입 확인
                if (step.stepType !== ApprovalStepType.AGREEMENT) {
                    throw new BadRequestException('협의 단계만 처리할 수 있습니다.');
                }

                // 4) 상태 확인
                if (step.status !== ApprovalStatus.PENDING) {
                    throw new BadRequestException('대기 중인 협의만 완료할 수 있습니다.');
                }

                // 5) 협의 완료 처리
                const completedStep = await this.approvalStepSnapshotService.update(
                    dto.stepSnapshotId,
                    {
                        status: ApprovalStatus.APPROVED, // 협의도 APPROVED로 표시
                        comment: dto.comment,
                        approvedAt: new Date(),
                    },
                    { queryRunner },
                );

                this.logger.log(`협의 완료: ${dto.stepSnapshotId}`);
                return completedStep;
            },
            externalQueryRunner,
        );
    }

    /**
     * 4. 시행 완료 처리
     */
    async completeImplementation(dto: CompleteImplementationDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`시행 완료 시작: ${dto.stepSnapshotId}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 1) Step 조회
                const step = await this.approvalStepSnapshotService.findOne({
                    where: { id: dto.stepSnapshotId },
                    queryRunner,
                });

                if (!step) {
                    throw new NotFoundException(`시행 단계를 찾을 수 없습니다: ${dto.stepSnapshotId}`);
                }

                // 2) 권한 확인
                if (step.approverId !== dto.implementerId) {
                    throw new ForbiddenException('해당 시행을 완료할 권한이 없습니다.');
                }

                // 3) 단계 타입 확인
                if (step.stepType !== ApprovalStepType.IMPLEMENTATION) {
                    throw new BadRequestException('시행 단계만 처리할 수 있습니다.');
                }

                // 4) 상태 확인
                if (step.status !== ApprovalStatus.PENDING) {
                    throw new BadRequestException('대기 중인 시행만 완료할 수 있습니다.');
                }

                // 5) 시행 가능 여부 검증 (모든 결재가 완료되어야 시행 가능)
                await this.validateImplementationPrecondition(step, queryRunner);

                // 6) 시행 완료 처리
                const completedStep = await this.approvalStepSnapshotService.update(
                    dto.stepSnapshotId,
                    {
                        status: ApprovalStatus.APPROVED,
                        comment: dto.comment,
                        approvedAt: new Date(),
                    },
                    { queryRunner },
                );

                // 7) Document 상태를 IMPLEMENTED로 변경
                const snapshot = await this.approvalLineSnapshotService.findOne({
                    where: { id: step.snapshotId },
                    queryRunner,
                });

                if (snapshot) {
                    await this.documentService.update(
                        snapshot.documentId,
                        {
                            status: DocumentStatus.IMPLEMENTED,
                            metadata: dto.resultData,
                        },
                        { queryRunner },
                    );
                }

                this.logger.log(`시행 완료: ${dto.stepSnapshotId}`);
                return completedStep;
            },
            externalQueryRunner,
        );
    }

    /**
     * 5. 결재 취소 (기안자만 가능, 결재 진행중일 때만)
     */
    async cancelApproval(dto: CancelApprovalDto, externalQueryRunner?: QueryRunner) {
        this.logger.log(`결재 취소 시작: ${dto.documentId}`);

        return await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                // 1) Document 조회
                const document = await this.documentService.findOne({
                    where: { id: dto.documentId },
                    queryRunner,
                });

                if (!document) {
                    throw new NotFoundException(`문서를 찾을 수 없습니다: ${dto.documentId}`);
                }

                // 2) 기안자 확인
                if (document.drafterId !== dto.drafterId) {
                    throw new ForbiddenException('문서 작성자만 취소할 수 있습니다.');
                }

                // 3) 상태 확인
                if (document.status !== DocumentStatus.PENDING) {
                    throw new BadRequestException('결재 진행 중인 문서만 취소할 수 있습니다.');
                }

                // 4) Document 상태를 CANCELLED로 변경
                const cancelledDocument = await this.documentService.update(
                    dto.documentId,
                    {
                        status: DocumentStatus.CANCELLED,
                        cancelReason: dto.reason,
                        cancelledAt: new Date(),
                    },
                    { queryRunner },
                );

                this.logger.log(`결재 취소 완료: ${dto.documentId}`);
                return cancelledDocument;
            },
            externalQueryRunner,
        );
    }

    /**
     * 6. 내 결재 대기 목록 조회 (실제 처리 가능한 건만 반환)
     */
    async getMyPendingApprovals(approverId: string, queryRunner?: QueryRunner) {
        const allPendingSteps = await this.approvalStepSnapshotService.findAll({
            where: {
                approverId,
                status: ApprovalStatus.PENDING,
            },
            relations: ['snapshot', 'approver', 'approverDepartment', 'approverPosition'],
            order: { createdAt: 'DESC' },
            queryRunner,
        });

        if (allPendingSteps.length === 0) {
            return [];
        }

        // 모든 스냅샷 ID 수집
        const snapshotIds = [...new Set(allPendingSteps.map((step) => step.snapshotId))];

        // 각 스냅샷의 모든 단계를 한 번에 조회
        const allStepsBySnapshot = new Map();
        for (const snapshotId of snapshotIds) {
            const steps = await this.approvalStepSnapshotService.findAll({
                where: { snapshotId },
                order: { stepOrder: 'ASC' },
                queryRunner,
            });
            allStepsBySnapshot.set(snapshotId, steps);
        }

        // 실제 처리 가능한 단계만 필터링
        const processableSteps = [];
        for (const step of allPendingSteps) {
            const allSteps = allStepsBySnapshot.get(step.snapshotId) || [];
            if (await this.canProcessStepOptimized(step, allSteps)) {
                processableSteps.push(step);
            }
        }

        return processableSteps;
    }

    /**
     * 7. 문서의 결재 단계 목록 조회
     */
    async getApprovalSteps(documentId: string, queryRunner?: QueryRunner) {
        // 1) Document의 snapshotId 조회
        const document = await this.documentService.findOne({
            where: { id: documentId },
            queryRunner,
        });

        if (!document || !document.approvalLineSnapshotId) {
            throw new NotFoundException(`문서의 결재선을 찾을 수 없습니다: ${documentId}`);
        }

        // 2) 결재 단계 목록 조회
        return await this.approvalStepSnapshotService.findAll({
            where: { snapshotId: document.approvalLineSnapshotId },
            relations: ['approver', 'approverDepartment', 'approverPosition'],
            order: { stepOrder: 'ASC' },
            queryRunner,
        });
    }

    /**
     * 헬퍼: 다음 단계 확인 및 문서 상태 업데이트
     */
    private async checkAndUpdateDocumentStatus(snapshotId: string, queryRunner: QueryRunner) {
        // 1) 모든 결재 단계 조회
        const allSteps = await this.approvalStepSnapshotService.findAll({
            where: { snapshotId },
            order: { stepOrder: 'ASC' },
            queryRunner,
        });

        // 2) 협의 단계가 모두 완료되었는지 확인
        const agreementSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.AGREEMENT);
        const allAgreementsCompleted = agreementSteps.every((s) => s.status === ApprovalStatus.APPROVED);

        if (agreementSteps.length > 0 && !allAgreementsCompleted) {
            this.logger.log('협의가 아직 완료되지 않았습니다.');
            return;
        }

        // 3) 결재 단계 확인
        const approvalSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.APPROVAL);
        const allApprovalsCompleted = approvalSteps.every((s) => s.status === ApprovalStatus.APPROVED);

        if (!allApprovalsCompleted) {
            this.logger.log('결재가 아직 완료되지 않았습니다.');
            return;
        }

        // 4) 시행 단계 확인
        const implementationSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.IMPLEMENTATION);

        if (implementationSteps.length > 0) {
            const allImplementationsCompleted = implementationSteps.every((s) => s.status === ApprovalStatus.APPROVED);

            if (!allImplementationsCompleted) {
                this.logger.log('시행이 아직 완료되지 않았습니다.');
                return;
            }
        }

        // 5) 모든 단계가 완료되면 Document 상태를 APPROVED로 변경
        const snapshot = await this.approvalLineSnapshotService.findOne({
            where: { id: snapshotId },
            queryRunner,
        });

        if (snapshot) {
            const finalStatus = implementationSteps.length > 0 ? DocumentStatus.IMPLEMENTED : DocumentStatus.APPROVED;

            await this.documentService.update(snapshot.documentId, { status: finalStatus }, { queryRunner });

            this.logger.log(`문서 상태 업데이트: ${snapshot.documentId} -> ${finalStatus}`);
        }
    }

    /**
     * 검증: 결재 순서 검증
     *
     * 규칙:
     * 1. 협의가 있다면 모든 협의가 완료되어야 결재 가능
     * 2. 이전 단계가 결재라면 이전 단계의 결재가 완료되어야 승인 가능
     */
    private async validateApprovalOrder(currentStep: any, queryRunner: QueryRunner) {
        // 모든 단계 조회
        const allSteps = await this.approvalStepSnapshotService.findAll({
            where: { snapshotId: currentStep.snapshotId },
            order: { stepOrder: 'ASC' },
            queryRunner,
        });

        // 1) 협의 단계 확인
        const agreementSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.AGREEMENT);
        if (agreementSteps.length > 0) {
            const allAgreementsCompleted = agreementSteps.every((s) => s.status === ApprovalStatus.APPROVED);
            if (!allAgreementsCompleted) {
                throw new BadRequestException('모든 협의가 완료되어야 결재를 진행할 수 있습니다.');
            }
        }

        // 2) 이전 결재 단계 확인
        const approvalSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.APPROVAL);
        for (const step of approvalSteps) {
            // 현재 단계보다 앞선 단계인 경우
            if (step.stepOrder < currentStep.stepOrder) {
                if (step.status !== ApprovalStatus.APPROVED) {
                    throw new BadRequestException(
                        `이전 결재 단계(${step.stepOrder}단계)가 완료되어야 현재 단계를 승인할 수 있습니다.`,
                    );
                }
            }
        }

        this.logger.debug(`결재 순서 검증 통과: ${currentStep.id}`);
    }

    /**
     * 검증: 시행 가능 여부 검증
     *
     * 규칙:
     * 모든 결재가 완료되어야 시행 가능
     */
    private async validateImplementationPrecondition(currentStep: any, queryRunner: QueryRunner) {
        // 모든 단계 조회
        const allSteps = await this.approvalStepSnapshotService.findAll({
            where: { snapshotId: currentStep.snapshotId },
            order: { stepOrder: 'ASC' },
            queryRunner,
        });

        // 1) 협의 단계 확인
        const agreementSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.AGREEMENT);
        if (agreementSteps.length > 0) {
            const allAgreementsCompleted = agreementSteps.every((s) => s.status === ApprovalStatus.APPROVED);
            if (!allAgreementsCompleted) {
                throw new BadRequestException('모든 협의가 완료되어야 시행할 수 있습니다.');
            }
        }

        // 2) 모든 결재 단계 확인
        const approvalSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.APPROVAL);
        const allApprovalsCompleted = approvalSteps.every((s) => s.status === ApprovalStatus.APPROVED);
        if (!allApprovalsCompleted) {
            throw new BadRequestException('모든 결재가 완료되어야 시행할 수 있습니다.');
        }

        this.logger.debug(`시행 가능 여부 검증 통과: ${currentStep.id}`);
    }

    /**
     * 검증: 단계 처리 가능 여부 확인
     *
     * 대기 목록 API에서 사용하여 실제 처리 가능한 건만 반환
     */
    private async canProcessStepOptimized(step: any, allSteps: any[]): Promise<boolean> {
        try {
            // 1) 협의는 언제나 처리 가능
            if (step.stepType === ApprovalStepType.AGREEMENT) {
                return true;
            }

            // 2) 결재인 경우
            if (step.stepType === ApprovalStepType.APPROVAL) {
                // 협의가 있다면 모든 협의가 완료되어야 함
                const agreementSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.AGREEMENT);
                if (agreementSteps.length > 0) {
                    const allAgreementsCompleted = agreementSteps.every((s) => s.status === ApprovalStatus.APPROVED);
                    if (!allAgreementsCompleted) {
                        return false;
                    }
                }

                // 이전 결재 단계가 모두 완료되어야 함
                const approvalSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.APPROVAL);
                for (const prevStep of approvalSteps) {
                    if (prevStep.stepOrder < step.stepOrder) {
                        if (prevStep.status !== ApprovalStatus.APPROVED) {
                            return false;
                        }
                    }
                }

                return true;
            }

            // 3) 시행인 경우
            if (step.stepType === ApprovalStepType.IMPLEMENTATION) {
                // 협의가 모두 완료되어야 함
                const agreementSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.AGREEMENT);
                if (agreementSteps.length > 0) {
                    const allAgreementsCompleted = agreementSteps.every((s) => s.status === ApprovalStatus.APPROVED);
                    if (!allAgreementsCompleted) {
                        return false;
                    }
                }

                // 모든 결재가 완료되어야 함
                const approvalSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.APPROVAL);
                if (approvalSteps.length > 0) {
                    const allApprovalsCompleted = approvalSteps.every((s) => s.status === ApprovalStatus.APPROVED);
                    if (!allApprovalsCompleted) {
                        return false;
                    }
                }

                return true;
            }

            return false;
        } catch (error) {
            this.logger.error(`canProcessStepOptimized 오류: ${error.message}`);
            return false;
        }
    }

    private async canProcessStep(step: any, queryRunner?: QueryRunner): Promise<boolean> {
        try {
            // 모든 단계 조회
            const allSteps = await this.approvalStepSnapshotService.findAll({
                where: { snapshotId: step.snapshotId },
                order: { stepOrder: 'ASC' },
                queryRunner,
            });

            // 1) 협의는 언제나 처리 가능
            if (step.stepType === ApprovalStepType.AGREEMENT) {
                return true;
            }

            // 2) 결재인 경우
            if (step.stepType === ApprovalStepType.APPROVAL) {
                // 협의가 있다면 모든 협의가 완료되어야 함
                const agreementSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.AGREEMENT);
                if (agreementSteps.length > 0) {
                    const allAgreementsCompleted = agreementSteps.every((s) => s.status === ApprovalStatus.APPROVED);
                    if (!allAgreementsCompleted) {
                        return false;
                    }
                }

                // 이전 결재 단계가 모두 완료되어야 함
                const approvalSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.APPROVAL);
                for (const prevStep of approvalSteps) {
                    if (prevStep.stepOrder < step.stepOrder) {
                        if (prevStep.status !== ApprovalStatus.APPROVED) {
                            return false;
                        }
                    }
                }

                return true;
            }

            // 3) 시행인 경우
            if (step.stepType === ApprovalStepType.IMPLEMENTATION) {
                // 협의가 모두 완료되어야 함
                const agreementSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.AGREEMENT);
                if (agreementSteps.length > 0) {
                    const allAgreementsCompleted = agreementSteps.every((s) => s.status === ApprovalStatus.APPROVED);
                    if (!allAgreementsCompleted) {
                        return false;
                    }
                }

                // 모든 결재가 완료되어야 함
                const approvalSteps = allSteps.filter((s) => s.stepType === ApprovalStepType.APPROVAL);
                const allApprovalsCompleted = approvalSteps.every((s) => s.status === ApprovalStatus.APPROVED);
                return allApprovalsCompleted;
            }

            // 4) 참조는 처리 불필요
            if (step.stepType === ApprovalStepType.REFERENCE) {
                return false;
            }

            return false;
        } catch (error) {
            this.logger.error(`단계 처리 가능 여부 확인 실패: ${step.id}`, error);
            return false;
        }
    }
}
