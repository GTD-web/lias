import { Injectable } from '@nestjs/common';
import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { ApprovalStepType } from 'src/common/enums/approval.enum';
import { In } from 'typeorm';
import { ApprovalStep } from 'src/database/entities/approval-step.entity';

@Injectable()
export class CheckStepsUseCase {
    constructor(private readonly approvalStepService: DomainApprovalStepService) {}

    async execute(documentId: string): Promise<[ApprovalStep[], number]> {
        const [steps, total] = await this.approvalStepService.findAndCount({
            where: {
                documentId,
                isApproved: false,
                type: In([ApprovalStepType.APPROVAL, ApprovalStepType.AGREEMENT]),
            },
        });
        return [
            steps.sort((a, b) => {
                if (a.type === ApprovalStepType.AGREEMENT && b.type === ApprovalStepType.APPROVAL) return -1;
                if (a.type === ApprovalStepType.APPROVAL && b.type === ApprovalStepType.AGREEMENT) return 1;
                return a.order - b.order;
            }),
            total,
        ];
    }
}
