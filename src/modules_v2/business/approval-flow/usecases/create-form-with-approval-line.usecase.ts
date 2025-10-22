import { Injectable, Logger } from '@nestjs/common';
import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { CreateFormRequestDto } from '../dtos';
import { CreateFormResponseDto } from '../dtos';

/**
 * 문서양식 생성 & 결재선 연결 Usecase
 *
 * 책임:
 * - API 요청을 Context 레이어로 전달
 * - 비즈니스 로직 실행 및 응답 변환
 */
@Injectable()
export class CreateFormWithApprovalLineUsecase {
    private readonly logger = new Logger(CreateFormWithApprovalLineUsecase.name);

    constructor(private readonly approvalFlowContext: ApprovalFlowContext) {}

    async execute(createdBy: string, dto: CreateFormRequestDto): Promise<CreateFormResponseDto> {
        this.logger.log(`문서양식 생성 요청 (생성자: ${createdBy}): ${dto.formName}`);

        const result = await this.approvalFlowContext.createFormWithApprovalLine({
            formName: dto.formName,
            formCode: dto.formCode,
            description: dto.description,
            useExistingLine: dto.useExistingLine,
            lineTemplateVersionId: dto.lineTemplateVersionId,
            baseLineTemplateVersionId: dto.baseLineTemplateVersionId,
            stepEdits: dto.stepEdits,
            createdBy,
        });

        this.logger.log(`문서양식 생성 완료: ${result.form.id}`);

        return {
            form: {
                id: result.form.id,
                name: result.form.name,
                code: result.form.code,
                description: result.form.description,
                status: result.form.status,
                currentVersionId: result.form.currentVersionId,
                createdAt: result.form.createdAt,
                updatedAt: result.form.updatedAt,
            },
            formVersion: {
                id: result.formVersion.id,
                formId: result.formVersion.formId,
                versionNo: result.formVersion.versionNo,
                isActive: result.formVersion.isActive,
                changeReason: result.formVersion.changeReason,
                createdAt: result.formVersion.createdAt,
            },
            lineTemplateVersionId: result.lineTemplateVersionId,
        };
    }
}
