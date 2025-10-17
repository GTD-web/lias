import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { ApprovalStep } from 'src/database/entities/approval-step.entity';

@Injectable()
export class GetMyStepUseCase {
    constructor(private readonly approvalStepService: DomainApprovalStepService) {}

    async execute(documentId: string, employeeId: string): Promise<ApprovalStep[]> {
        // 해당 직원의 모든 단계 조회
        const mySteps = await this.approvalStepService.findAll({
            where: {
                documentId,
                approverId: employeeId,
            },
        });

        if (!mySteps || mySteps.length === 0) {
            throw new NotFoundException('결재 단계를 찾을 수 없습니다.');
        }

        return mySteps;
    }
}
