import { Injectable } from '@nestjs/common';
import { DomainFormApprovalLineService } from '../../../../domain/form-approval-line/form-approval-line.service';
import { FormApprovalLineResponseDto, FormApprovalStepResponseDto } from '../../dtos';

@Injectable()
export class FindApprovalLineByIdUseCase {
    constructor(private readonly formApprovalLineService: DomainFormApprovalLineService) {}

    async execute(id: string): Promise<FormApprovalLineResponseDto> {
        const approvalLine = await this.formApprovalLineService.findOne({
            where: {
                formApprovalLineId: id,
            },
            relations: ['formApprovalSteps', 'formApprovalSteps.defaultApprover'],
            order: {
                formApprovalSteps: {
                    order: 'ASC',
                },
            },
        });

        return approvalLine;
    }
}
