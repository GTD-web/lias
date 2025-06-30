import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ApprovalResponseDto, CreateDraftDocumentDto, UpdateDraftDocumentDto } from './dtos';
import { CreateDraftUseCase } from './usecases/approval/create-draft.usecase';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginationData } from 'src/common/dtos/pagination-response.dto';
import { ApprovalStepType, DocumentListType } from 'src/common/enums/approval.enum';
import { Employee } from 'src/database/entities';
import { ApproveStepUseCase } from './usecases/approval/approve-step.usecase';
import { ApproveDocumentUseCase } from './usecases/approval/approve-document.usecase';
import { CheckStepsUseCase } from './usecases/approval/check-steps.usecase';
import { GetMyStepUseCase } from './usecases/approval/get-my-step.usecase';
import { RejectStepUseCase } from './usecases/approval/reject-step.usecase';
import { RejectDocumentUseCase } from './usecases/approval/reject-document.usecase';
import { SetStepCurrentUseCase } from './usecases/approval/set-step-current.usecase';
import { GetApprovalDocumentsUseCase } from './usecases/approval/get-approval-documents.usecase';
import { DataSource, QueryRunner } from 'typeorm';
import { CreateApproveStepUseCase } from './usecases/approval/create-approve-step.usecase';

@Injectable()
export class ApprovalService {
    constructor(
        private readonly dataSource: DataSource,

        private readonly createDraftUseCase: CreateDraftUseCase,
        private readonly approveStepUseCase: ApproveStepUseCase,
        private readonly approveDocumentUseCase: ApproveDocumentUseCase,
        private readonly checkStepsUseCase: CheckStepsUseCase,
        private readonly getMyStepUseCase: GetMyStepUseCase,
        private readonly rejectStepUseCase: RejectStepUseCase,
        private readonly rejectDocumentUseCase: RejectDocumentUseCase,
        private readonly setStepCurrentUseCase: SetStepCurrentUseCase,
        private readonly getApprovalDocumentsUseCase: GetApprovalDocumentsUseCase,
        private readonly createApproveStepUseCase: CreateApproveStepUseCase,
    ) {} // 필요한 repository 주입

    // 기안 문서 CRUD 메서드들
    async createDraft(user: Employee, draftData: CreateDraftDocumentDto): Promise<string> {
        // 기안 문서 생성 로직
        const queryRunner = this.dataSource.createQueryRunner();

        try {
            // 트랜잭션 시작
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const document = await this.createDraftUseCase.execute(user, draftData, queryRunner);

            // 2. 결재 단계 데이터 생성 (문서 ID 추가)
            const approvalSteps = [];
            if (draftData.approvalSteps && draftData.approvalSteps.length > 0) {
                for (const step of draftData.approvalSteps) {
                    const approvalStep = await this.createApproveStepUseCase.execute(
                        document.documentId,
                        step,
                        queryRunner,
                    );
                    approvalSteps.push(approvalStep);
                }
            }

            // 3. 파일 데이터 생성 (문서 ID 추가)
            // if (draftData.files && draftData.files.length > 0) {
            //     const filesData = draftData.files.map((file) => ({
            //         ...file,
            //         documentId: document.documentId, // 생성된 문서 ID 추가
            //     }));

            //     await Promise.all(
            //         filesData.map((fileData) =>
            //             this.domainFileService.update(fileData.fileId, fileData, { queryRunner }),
            //         ),
            //     );
            // }

            // 트랜잭션 커밋
            await queryRunner.commitTransaction();

            return document.documentId;
        } catch (error) {
            // 트랜잭션 롤백
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            // queryRunner 해제
            await queryRunner.release();
        }
    }

    async approve(user: Employee, documentId: string): Promise<void> {
        // 결재 승인 로직
        const myStep = await this.getMyStepUseCase.execute(documentId, user.employeeId);

        if (myStep.type === ApprovalStepType.IMPLEMENTATION || myStep.type === ApprovalStepType.REFERENCE) {
            throw new BadRequestException('결재 단계가 아닙니다.');
        }

        // 1. 결재 단계 승인
        const approvalStep = await this.approveStepUseCase.execute(myStep.approvalStepId);
        console.log('approvalStep', approvalStep);
        // 2. 모든 결재단계가 승인되었는지 확인
        const [allStepsApproved, total] = await this.checkStepsUseCase.execute(documentId);

        // 2-1. 모든 결재 단계가 승인되지 않았다면 다음 단계로 알림보내기
        if (total > 0) {
            // 다음 단계로 알림보내기
            console.log('다음 단계로 알림보내기');
            const nextStep = allStepsApproved[0];
            console.log('nextStep', nextStep);
            await this.setStepCurrentUseCase.execute(nextStep.approvalStepId);
        } else {
            // 2-2. 모든 결재 단계가 승인되었다면 문서 승인
            await this.approveDocumentUseCase.execute(documentId);
        }
    }

    async reject(user: Employee, documentId: string): Promise<void> {
        // 결재 반려 로직
        const myStep = await this.getMyStepUseCase.execute(documentId, user.employeeId);

        if (myStep.type === ApprovalStepType.IMPLEMENTATION || myStep.type === ApprovalStepType.REFERENCE) {
            throw new BadRequestException('결재 단계가 아닙니다.');
        }

        await this.rejectStepUseCase.execute(myStep.approvalStepId);

        await this.rejectDocumentUseCase.execute(documentId);

        // 반려되었으면 기안자에게 알림 보내기
        // const document = await this.getDraftUseCase.execute(documentId);
        // await this.notificationService.sendNotification(document.drafter.employeeId, '결재 반려', `결재 반려되었습니다.`);
    }

    async implementation(user: Employee, documentId: string): Promise<void> {
        // 시행 로직
        const myStep = await this.getMyStepUseCase.execute(documentId, user.employeeId);

        if (myStep.type !== ApprovalStepType.IMPLEMENTATION) {
            throw new BadRequestException('시행 단계가 아닙니다.');
        }

        // 2. 모든 결재단계가 승인되었는지 확인
        const [allStepsApproved, total] = await this.checkStepsUseCase.execute(documentId);

        if (total > 0) {
            throw new BadRequestException('모든 결재단계가 승인되지 않았습니다.');
        }

        await this.approveStepUseCase.execute(myStep.approvalStepId);

        // 시행 단계가 완료되었으면 알림 보내기
        // const document = await this.getDraftUseCase.execute(documentId);
        // await this.notificationService.sendNotification(document.drafter.employeeId, '시행 완료', `시행 완료되었습니다.`);
    }

    async reference(user: Employee, documentId: string): Promise<void> {
        // 열람 로직
        const myStep = await this.getMyStepUseCase.execute(documentId, user.employeeId);

        if (myStep.type !== ApprovalStepType.REFERENCE) {
            throw new BadRequestException('열람 단계가 아닙니다.');
        }

        await this.approveStepUseCase.execute(myStep.approvalStepId);
    }

    async getApprovalDocuments(
        user: Employee,
        query: PaginationQueryDto,
        listType: DocumentListType,
    ): Promise<PaginationData<ApprovalResponseDto>> {
        // 결재 문서 조회 로직
        return this.getApprovalDocumentsUseCase.execute(user, query, listType);
    }

    async createTestData() {
        // 랜덤 문서 생성 기능은 별도 컨트롤러에서 처리
        throw new BadRequestException('랜덤 문서 생성은 /api/v2/approval/random-documents 엔드포인트를 사용하세요.');
    }
}
