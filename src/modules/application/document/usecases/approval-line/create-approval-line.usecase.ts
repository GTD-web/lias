import { Injectable } from '@nestjs/common';
import { DomainFormApprovalLineService } from '../../../../domain/form-approval-line/form-approval-line.service';
import { DomainFormApprovalStepService } from '../../../../domain/form-approval-step/form-approval-step.service';
import { CreateFormApprovalLineDto } from '../../dtos/approval-line.dto';
import { FormApprovalLine } from '../../../../../database/entities/form-approval-line.entity';
import { FormApprovalStep } from '../../../../../database/entities/form-approval-step.entity';
import { Employee } from '../../../../../database/entities/employee.entity';
import { ApprovalLineType } from '../../../../../common/enums/approval.enum';

@Injectable()
export class CreateApprovalLineUseCase {
    constructor(
        private readonly formApprovalLineService: DomainFormApprovalLineService,
        private readonly formApprovalStepService: DomainFormApprovalStepService,
    ) {}

    async execute(user: Employee, dto: CreateFormApprovalLineDto): Promise<FormApprovalLine> {
        if (dto.type === ApprovalLineType.CUSTOM) {
            dto['employeeId'] = user.employeeId;
        }
        const approvalLine = await this.formApprovalLineService.save(dto);

        for (const stepDto of dto.formApprovalSteps) {
            await this.formApprovalStepService.save({
                ...stepDto,
                // defaultApproverId: '7d3784a8-7246-4fbc-a912-5c118c3777d7',
                formApprovalLine: approvalLine,
            });
        }

        return approvalLine;
    }
}
