import { Injectable } from '@nestjs/common';
import { DomainFormApprovalLineService } from '../../../../domain/form-approval-line/form-approval-line.service';
import { DomainFormApprovalStepService } from '../../../../domain/form-approval-step/form-approval-step.service';
import { UpdateFormApprovalLineDto } from '../../dtos/approval-line.dto';
import { FormApprovalLine } from '../../../../../database/entities/form-approval-line.entity';
import { FormApprovalStep } from '../../../../../database/entities/form-approval-step.entity';
import { Employee } from '../../../../../database/entities/employee.entity';
import { ApprovalLineType } from '../../../../../common/enums/approval.enum';

@Injectable()
export class UpdateApprovalLineUseCase {
    constructor(
        private readonly formApprovalLineService: DomainFormApprovalLineService,
        private readonly formApprovalStepService: DomainFormApprovalStepService,
    ) {}

    async execute(user: Employee, dto: UpdateFormApprovalLineDto): Promise<FormApprovalLine> {
        if (dto.type === ApprovalLineType.CUSTOM) {
            dto['employeeId'] = user.employeeId;
        }

        const { formApprovalSteps, ...updateData } = dto;

        // 기존 결재 단계 모두 삭제
        await this.formApprovalStepService.deleteByFormApprovalLineId(dto.formApprovalLineId);

        // 새로운 결재 단계 생성
        for (const stepDto of formApprovalSteps) {
            await this.formApprovalStepService.save({
                ...stepDto,
                formApprovalLineId: dto.formApprovalLineId,
            });
        }
        const approvalLine = await this.formApprovalLineService.update(dto.formApprovalLineId, updateData, {
            relations: ['formApprovalSteps', 'formApprovalSteps.defaultApprover'],
        });

        console.log('approvalLine', approvalLine);
        return approvalLine;
    }
}
