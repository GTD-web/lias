import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { ApprovalStep } from 'src/database/entities/approval-step.entity';

@Injectable()
export class GetMyStepUseCase {
    constructor(private readonly approvalStepService: DomainApprovalStepService) {}

    async execute(documentId: string, employeeId: string): Promise<ApprovalStep> {
        const myStep = await this.approvalStepService.findOne({
            where: {
                documentId,
                approverId: employeeId,
            },
        });

        if (!myStep) {
            throw new NotFoundException('결재 단계를 찾을 수 없습니다.');
        }

        if (myStep.approvedDate) {
            throw new BadRequestException('이미 승인된 결재 단계입니다.');
        }

        return myStep;
    }
}
