import { Injectable } from '@nestjs/common';
import { DomainFormApprovalLineService } from '../../../domain/form-approval-line/form-approval-line.service';
import { DomainFormApprovalStepService } from '../../../domain/form-approval-step/form-approval-step.service';
import { CreateFormApprovalLineDto } from '../dtos/approval-line.dto';
import { FormApprovalLine } from '../../../../database/entities/form-approval-line.entity';
import { FormApprovalStep } from '../../../../database/entities/form-approval-step.entity';

@Injectable()
export class CreateApprovalLineUseCase {
    constructor(
        private readonly formApprovalLineService: DomainFormApprovalLineService,
        private readonly formApprovalStepService: DomainFormApprovalStepService,
    ) {}

    async execute(dto: CreateFormApprovalLineDto): Promise<FormApprovalLine> {
        const approvalLine = await this.formApprovalLineService.save({
            name: dto.name,
            description: dto.description,
            type: dto.type,
            order: 1, // 기본값으로 1 설정
        });

        for (const stepDto of dto.formApprovalSteps) {
            await this.formApprovalStepService.save({
                ...stepDto,
                formApprovalLine: approvalLine,
            });
        }

        return approvalLine;
    }
}
