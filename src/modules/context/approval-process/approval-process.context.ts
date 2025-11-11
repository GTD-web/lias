import { Injectable, Logger, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { DomainApprovalStepSnapshotService } from '../../domain/approval-step-snapshot/approval-step-snapshot.service';
import { DomainDocumentService } from '../../domain/document/document.service';
import { Document } from '../../domain/document/document.entity';
import { ApprovalStepSnapshot } from '../../domain/approval-step-snapshot/approval-step-snapshot.entity';
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
                await this.checkAndUpdateDocumentStatus(step.documentId, queryRunner);

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
                await this.documentService.update(
                    step.documentId,
                    { status: DocumentStatus.REJECTED, rejectedAt: new Date() },
                    { queryRunner },
                );

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
                await this.documentService.update(
                    step.documentId,
                    {
                        status: DocumentStatus.IMPLEMENTED,
                        metadata: dto.resultData,
                    },
                    { queryRunner },
                );

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
     * 6. 내 결재 대기 목록 조회 (페이징, 필터링)
     */
    async getMyPendingApprovals(
        userId: string,
        type: 'SUBMITTED' | 'AGREEMENT' | 'APPROVAL',
        page: number = 1,
        limit: number = 20,
        queryRunner?: QueryRunner,
    ) {
        const repository = queryRunner
            ? queryRunner.manager.getRepository(Document)
            : this.dataSource.getRepository(Document);

        const stepRepository = queryRunner
            ? queryRunner.manager.getRepository(ApprovalStepSnapshot)
            : this.dataSource.getRepository(ApprovalStepSnapshot);

        let documents: Document[] = [];
        const currentStepsMap = new Map<string, ApprovalStepSnapshot>(); // documentId -> currentStep
        let totalItems = 0;

        if (type === 'SUBMITTED') {
            // 상신: 내가 기안한 문서들 중 결재 대기 중인 문서
            const qb = repository
                .createQueryBuilder('document')
                .leftJoinAndSelect('document.drafter', 'drafter')
                .where('document.drafterId = :userId', { userId })
                .andWhere('document.status = :status', { status: DocumentStatus.PENDING })
                .orderBy('document.createdAt', 'DESC');

            // 전체 개수 조회
            totalItems = await qb.getCount();

            // 페이징 처리
            const skip = (page - 1) * limit;
            documents = await qb.skip(skip).take(limit).getMany();
        } else {
            // 합의/미결: 내가 처리해야 하는 문서들
            const stepType = type === 'AGREEMENT' ? ApprovalStepType.AGREEMENT : ApprovalStepType.APPROVAL;

            const qb = stepRepository
                .createQueryBuilder('step')
                .leftJoinAndSelect('step.document', 'document')
                .leftJoinAndSelect('document.drafter', 'drafter')
                .where('step.approverId = :userId', { userId })
                .andWhere('step.stepType = :stepType', { stepType })
                .andWhere('step.status = :status', { status: ApprovalStatus.PENDING })
                .orderBy('step.createdAt', 'DESC');

            // 전체 개수 조회
            totalItems = await qb.getCount();

            // 페이징 처리
            const skip = (page - 1) * limit;
            const steps = await qb.skip(skip).take(limit).getMany();

            // 실제 처리 가능한 단계만 필터링하고 문서 추출
            for (const step of steps) {
                const allSteps = await this.approvalStepSnapshotService.findAll({
                    where: { documentId: step.documentId },
                    order: { stepOrder: 'ASC' },
                    queryRunner,
                });

                if (await this.canProcessStepOptimized(step, allSteps)) {
                    documents.push(step.document);
                    currentStepsMap.set(step.documentId, step);
                }
            }
        }

        // 응답 데이터 변환 (문서 중심)
        const data = await Promise.all(
            documents.map(async (doc) => {
                const currentStep = currentStepsMap.get(doc.id);

                // 전체 결재 단계 조회
                const allApprovalSteps = await this.approvalStepSnapshotService.findAll({
                    where: { documentId: doc.id },
                    relations: ['approver'],
                    order: { stepOrder: 'ASC' },
                    queryRunner,
                });

                // 결재 단계 요약 정보 생성
                const approvalSteps = allApprovalSteps.map((step) => ({
                    id: step.id,
                    stepOrder: step.stepOrder,
                    stepType: step.stepType,
                    status: step.status,
                    approverId: step.approverId,
                    approverName: step.approverSnapshot?.employeeName || step.approver?.name || '',
                    comment: step.comment,
                    approvedAt: step.approvedAt,
                }));

                // 현재 단계 정보 생성 (합의/미결일 때만)
                const currentStepInfo = currentStep
                    ? {
                          id: currentStep.id,
                          stepOrder: currentStep.stepOrder,
                          stepType: currentStep.stepType,
                          status: currentStep.status,
                          approverId: currentStep.approverId,
                          approverSnapshot: currentStep.approverSnapshot,
                      }
                    : undefined;

                return {
                    documentId: doc.id,
                    documentNumber: doc.documentNumber,
                    title: doc.title,
                    status: doc.status,
                    drafterId: doc.drafterId,
                    drafterName: doc.drafter?.name || '',
                    drafterDepartmentName: undefined, // TODO: 기안자 부서 정보 추가 필요
                    currentStep: currentStepInfo,
                    approvalSteps,
                    submittedAt: doc.submittedAt,
                    createdAt: doc.createdAt,
                };
            }),
        );

        // 페이징 메타데이터 계산
        const totalPages = Math.ceil(totalItems / limit);

        return {
            data,
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

    /**
     * 7. 문서의 결재 단계 목록 조회
     */
    async getApprovalSteps(documentId: string, queryRunner?: QueryRunner) {
        // 1) Document 존재 확인
        const document = await this.documentService.findOne({
            where: { id: documentId },
            queryRunner,
        });

        if (!document) {
            throw new NotFoundException(`문서를 찾을 수 없습니다: ${documentId}`);
        }

        // 2) 결재 단계 목록 조회
        return await this.approvalStepSnapshotService.findAll({
            where: { documentId },
            relations: ['approver', 'document'],
            order: { stepOrder: 'ASC' },
            queryRunner,
        });
    }

    /**
     * 헬퍼: 다음 단계 확인 및 문서 상태 업데이트
     */
    private async checkAndUpdateDocumentStatus(documentId: string, queryRunner: QueryRunner) {
        // 1) 모든 결재 단계 조회
        const allSteps = await this.approvalStepSnapshotService.findAll({
            where: { documentId },
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
        const finalStatus = implementationSteps.length > 0 ? DocumentStatus.IMPLEMENTED : DocumentStatus.APPROVED;

        await this.documentService.update(documentId, { status: finalStatus, approvedAt: new Date() }, { queryRunner });

        this.logger.log(`문서 상태 업데이트: ${documentId} -> ${finalStatus}`);
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
            where: { documentId: currentStep.documentId },
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
            where: { documentId: currentStep.documentId },
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
     * 기안자 자동 승인 처리
     * 조건:
     * - 합의 단계가 없음
     * - 첫 번째 결재 단계가 APPROVAL 타입
     * - 첫 번째 결재자가 기안자 본인
     */
    async autoApproveIfDrafterIsFirstApprover(
        documentId: string,
        drafterId: string,
        queryRunner?: QueryRunner,
    ): Promise<void> {
        // 1) 모든 결재 단계 조회
        const allSteps = await this.approvalStepSnapshotService.findAll({
            where: { documentId },
            order: { stepOrder: 'ASC' },
            queryRunner,
        });

        if (allSteps.length === 0) {
            return; // 결재 단계가 없으면 처리하지 않음
        }

        // 2) 합의 단계가 있는지 확인
        const hasAgreementStep = allSteps.some((step) => step.stepType === ApprovalStepType.AGREEMENT);
        if (hasAgreementStep) {
            this.logger.debug('합의 단계가 있어 기안자 자동 승인을 건너뜁니다.');
            return; // 합의가 있으면 자동 승인하지 않음
        }

        // 3) 첫 번째 단계 확인
        const firstStep = allSteps[0];

        // 4) 조건 확인: APPROVAL 타입이고, 결재자가 기안자 본인인지
        if (
            firstStep.stepType === ApprovalStepType.APPROVAL &&
            firstStep.approverId === drafterId &&
            firstStep.status === ApprovalStatus.PENDING
        ) {
            this.logger.log(`기안자가 첫 번째 결재자입니다. 자동 승인 처리: ${firstStep.id}`);

            // 5) 자동 승인 처리
            await this.approvalStepSnapshotService.update(
                firstStep.id,
                {
                    status: ApprovalStatus.APPROVED,
                    comment: '기안자 자동 승인',
                    approvedAt: new Date(),
                },
                { queryRunner },
            );

            // 6) 다음 단계 확인 및 문서 상태 업데이트
            // 다음 결재자가 있는지 확인
            const nextApprovalStep = allSteps.find(
                (step) =>
                    step.stepOrder > firstStep.stepOrder &&
                    step.stepType === ApprovalStepType.APPROVAL &&
                    step.status === ApprovalStatus.PENDING,
            );

            // 다음 결재자가 없으면 문서 상태를 APPROVED로 변경
            if (!nextApprovalStep) {
                // 시행 단계 확인
                const implementationStep = allSteps.find((step) => step.stepType === ApprovalStepType.IMPLEMENTATION);

                if (implementationStep) {
                    // 시행 단계가 있으면 APPROVED로 변경 (시행 대기)
                    await this.documentService.update(
                        documentId,
                        {
                            status: DocumentStatus.APPROVED,
                            approvedAt: new Date(),
                        },
                        { queryRunner },
                    );
                } else {
                    // 시행 단계가 없으면 최종 승인 완료
                    await this.documentService.update(
                        documentId,
                        {
                            status: DocumentStatus.APPROVED,
                            approvedAt: new Date(),
                        },
                        { queryRunner },
                    );
                }
            }

            this.logger.log(`기안자 자동 승인 완료: ${firstStep.id}`);
        }
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
                where: { documentId: step.documentId },
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
