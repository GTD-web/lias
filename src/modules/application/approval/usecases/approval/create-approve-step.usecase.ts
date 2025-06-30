import { Injectable } from '@nestjs/common';
import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { CreateApprovalStepDto, CreateDraftDocumentDto } from '../../dtos';
import { ApprovalStep, Document } from 'src/database/entities';
import { QueryRunner } from 'typeorm';

@Injectable()
export class CreateApproveStepUseCase {
    constructor(private readonly domainApprovalStepService: DomainApprovalStepService) {}

    async execute(
        documentId: string,
        stepData: CreateApprovalStepDto,
        queryRunner: QueryRunner,
    ): Promise<ApprovalStep> {
        // 2. 결재 단계 데이터 생성 (문서 ID 추가)
        const approvalStepsData = {
            ...stepData,
            documentId: documentId, // 생성된 문서 ID 추가
        };

        const approvalStep = await this.domainApprovalStepService.save(approvalStepsData, { queryRunner });

        return approvalStep;
    }
}
