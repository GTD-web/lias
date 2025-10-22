import { Injectable, Logger } from '@nestjs/common';
import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { CreateApprovalLineTemplateRequestDto } from '../dtos/create-approval-line-template-request.dto';
import { ApprovalLineTemplateResponseDto } from '../dtos';

/**
 * 새로운 결재선 템플릿 생성 Usecase
 *
 * 책임:
 * - 완전히 새로운 결재선 템플릿을 생성합니다.
 * - 템플릿 생성과 동시에 첫 번째 버전(v1)을 생성합니다.
 */
@Injectable()
export class CreateApprovalLineTemplateUsecase {
    private readonly logger = new Logger(CreateApprovalLineTemplateUsecase.name);

    constructor(private readonly approvalFlowContext: ApprovalFlowContext) {}

    async execute(
        createdBy: string,
        dto: CreateApprovalLineTemplateRequestDto,
    ): Promise<ApprovalLineTemplateResponseDto> {
        this.logger.log(`새 결재선 템플릿 생성 요청 (생성자: ${createdBy}): ${dto.name}`);

        const result = await this.approvalFlowContext.createApprovalLineTemplate({
            name: dto.name,
            description: dto.description,
            type: dto.type,
            orgScope: dto.orgScope,
            departmentId: dto.departmentId,
            steps: dto.steps,
            createdBy,
        });

        this.logger.log(`새 결재선 템플릿 생성 완료: ${result.template.id}`);

        return {
            id: result.template.id,
            name: result.template.name,
            description: result.template.description,
            type: result.template.type,
            orgScope: result.template.orgScope,
            departmentId: result.template.departmentId,
            status: result.template.status,
            currentVersionId: result.template.currentVersionId,
            createdAt: result.template.createdAt,
            updatedAt: result.template.updatedAt,
        };
    }
}
