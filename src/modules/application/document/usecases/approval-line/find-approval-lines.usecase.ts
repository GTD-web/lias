import { Injectable } from '@nestjs/common';
import { DomainFormApprovalLineService } from '../../../../domain/form-approval-line/form-approval-line.service';
import { FormApprovalLineResponseDto, FormApprovalStepResponseDto } from '../../dtos';
import { PaginationData } from 'src/common/dtos/paginate-response.dto';
import { ApprovalLineType } from 'src/common/enums/approval.enum';

@Injectable()
export class FindApprovalLinesUseCase {
    constructor(private readonly formApprovalLineService: DomainFormApprovalLineService) {}

    async execute(
        page: number,
        limit: number,
        type?: ApprovalLineType,
    ): Promise<PaginationData<FormApprovalLineResponseDto>> {
        console.log('page', page);
        console.log('limit', limit);
        console.log('type', type);
        const [approvalLines, total] = await this.formApprovalLineService.findAndCount({
            where: {
                type: type || ApprovalLineType.COMMON,
            },
            relations: ['formApprovalSteps', 'formApprovalSteps.defaultApprover'],
            order: {
                formApprovalSteps: {
                    order: 'ASC',
                },
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        const meta = {
            total,
            page,
            limit,
            hasNext: total > page * limit,
        };

        return {
            items: approvalLines,
            meta,
        };

        // const approvalLines = await this.formApprovalLineService.findAll({
        //     relations: ['formApprovalSteps', 'formApprovalSteps.defaultApprover'],
        //     order: {
        //         formApprovalSteps: {
        //             order: 'ASC',
        //         },
        //     },
        // });

        // console.log('approvalLines', approvalLines);

        // return approvalLines;
    }
}
