import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ApprovalResponseDto, CreateDraftDocumentDto, UpdateDraftDocumentDto } from './dtos';
import { CreateDraftUseCase } from './usecases/document/create-draft.usecase';
import { GetApprovalListUseCase } from './usecases/document/get-approval-list.usecase';
import { GetDraftUseCase } from './usecases/document/get-draft.usecase';
import { UpdateDraftUseCase } from './usecases/document/update-draft.usecase';
import { DeleteDraftUseCase } from './usecases/document/delete-draft.usecase';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginationData } from 'src/common/dtos/pagination-response.dto';
import { ApprovalStatus, ApprovalStepType } from 'src/common/enums/approval.enum';
import { Employee, Document } from 'src/database/entities';
import { ApproveStepUseCase } from './usecases/approval/approve-step.usecase';
import { ApproveDocumentUseCase } from './usecases/approval/approve-document.usecase';
import { CheckStepsUseCase } from './usecases/approval/check-steps.usecase';
import { GetMyStepUseCase } from './usecases/approval/get-my-step.usecase';
import { RejectStepUseCase } from './usecases/approval/reject-step.usecase';
import { RejectDocumentUseCase } from './usecases/approval/reject-document.usecase';

@Injectable()
export class ApprovalService {
    constructor(
        private readonly createDraftUseCase: CreateDraftUseCase,
        private readonly getApprovalListUseCase: GetApprovalListUseCase,
        private readonly getDraftUseCase: GetDraftUseCase,
        private readonly updateDraftUseCase: UpdateDraftUseCase,
        private readonly deleteDraftUseCase: DeleteDraftUseCase,
        private readonly approveStepUseCase: ApproveStepUseCase,
        private readonly approveDocumentUseCase: ApproveDocumentUseCase,
        private readonly checkStepsUseCase: CheckStepsUseCase,
        private readonly getMyStepUseCase: GetMyStepUseCase,
        private readonly rejectStepUseCase: RejectStepUseCase,
        private readonly rejectDocumentUseCase: RejectDocumentUseCase,
    ) {} // 필요한 repository 주입

    // 기안 문서 CRUD 메서드들
    async createDraft(user: Employee, draftData: CreateDraftDocumentDto): Promise<ApprovalResponseDto> {
        // 기안 문서 생성 로직
        return this.createDraftUseCase.execute(user, draftData);
    }

    async getDraftList(
        user: Employee,
        query: PaginationQueryDto,
        status: ApprovalStatus | ApprovalStatus[],
        stepType: ApprovalStepType | ApprovalStepType[],
    ): Promise<PaginationData<ApprovalResponseDto>> {
        // 기안 문서 목록 조회 로직
        return this.getApprovalListUseCase.execute(user, query, status, stepType);
    }

    async getDraft(id: string): Promise<ApprovalResponseDto> {
        // 기안 문서 조회 로직
        return this.getDraftUseCase.execute(id);
    }

    async updateDraft(id: string, draftData: UpdateDraftDocumentDto): Promise<ApprovalResponseDto> {
        // 기안 문서 수정 로직
        return this.updateDraftUseCase.execute(id, draftData);
    }

    async deleteDraft(id: string): Promise<void> {
        // 기안 문서 삭제 로직
        return this.deleteDraftUseCase.execute(id);
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

        await this.approveStepUseCase.execute(myStep.approvalStepId);
    }

    async reference(user: Employee, documentId: string): Promise<void> {
        // 열람 로직
        const myStep = await this.getMyStepUseCase.execute(documentId, user.employeeId);

        if (myStep.type !== ApprovalStepType.REFERENCE) {
            throw new BadRequestException('열람 단계가 아닙니다.');
        }

        await this.approveStepUseCase.execute(myStep.approvalStepId);
    }

    // async findMyDocuments(user: Employee, query: PaginationQueryDto): Promise<PaginationData<ApprovalResponseDto>> {
    //     // 내 문서 조회 로직
    //     return this.getMyDocumentsUseCase.execute(user.employeeId, query);
    // }

    // async findMyPendingDocuments(user: Employee, query: PaginationQueryDto): Promise<PaginationData<ApprovalResponseDto>> {
    //     // 내 결재 문서 조회 로직
    //     return this.getMyPendingDocumentsUseCase.execute(user.employeeId, query);
    // }

    // async findMyApprovalDocuments(user: Employee, query: PaginationQueryDto): Promise<PaginationData<ApprovalResponseDto>> {
    //     // 내 결재완료 문서 조회 로직
    //     return this.getMyApprovalDocumentsUseCase.execute(user.employeeId, query);
    // }

    // async findMyRejectedDocuments(user: Employee, query: PaginationQueryDto): Promise<PaginationData<ApprovalResponseDto>> {
    //     // 내 반려 문서 조회 로직
    //     return this.getMyRejectedDocumentsUseCase.execute(user.employeeId, query);
    // }

    // async findMyImplementationDocuments(user: Employee, query: PaginationQueryDto): Promise<PaginationData<ApprovalResponseDto>> {
    //     // 내 시행 문서 조회 로직
    //     return this.getMyImplementationDocumentsUseCase.execute(user.employeeId, query);
    // }

    // async findMyReferenceDocuments(user: Employee, query: PaginationQueryDto): Promise<PaginationData<ApprovalResponseDto>> {
    //     // 내 열람 문서 조회 로직
    //     return this.getMyReferenceDocumentsUseCase.execute(user.employeeId, query);
    // }
}
