import { Injectable } from '@nestjs/common';
import { DomainFormApprovalLineService } from '../../../../domain/form-approval-line/form-approval-line.service';
import { FormApprovalLineResponseDto, FormApprovalStepResponseDto } from '../../dtos';

@Injectable()
export class FindApprovalLinesUseCase {
    constructor(private readonly formApprovalLineService: DomainFormApprovalLineService) {}

    async execute(): Promise<FormApprovalLineResponseDto[]> {
        const approvalLines = await this.formApprovalLineService.findAll({
            relations: ['formApprovalSteps', 'formApprovalSteps.defaultApprover'],
        });

        console.log('approvalLines', approvalLines);

        return approvalLines;
    }
}
