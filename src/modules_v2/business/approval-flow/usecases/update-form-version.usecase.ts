import { Injectable, Logger } from '@nestjs/common';
import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { UpdateFormVersionRequestDto, UpdateFormVersionResponseDto } from '../dtos';

/**
 * 문서양식 수정 (새 버전 생성) Usecase
 */
@Injectable()
export class UpdateFormVersionUsecase {
    private readonly logger = new Logger(UpdateFormVersionUsecase.name);

    constructor(private readonly approvalFlowContext: ApprovalFlowContext) {}

    async execute(createdBy: string, dto: UpdateFormVersionRequestDto): Promise<UpdateFormVersionResponseDto> {
        this.logger.log(`문서양식 수정 요청 (수정자: ${createdBy}): ${dto.formId}`);

        const result = await this.approvalFlowContext.updateFormVersion({
            formId: dto.formId,
            versionNote: dto.versionNote,
            template: dto.template,
            lineTemplateVersionId: dto.lineTemplateVersionId,
            cloneAndEdit: dto.cloneAndEdit,
            baseLineTemplateVersionId: dto.baseLineTemplateVersionId,
            stepEdits: dto.stepEdits,
            createdBy,
        });

        this.logger.log(`문서양식 수정 완료: ${result.form.id}, 새 버전: v${result.newVersion.versionNo}`);

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
            newVersion: {
                id: result.newVersion.id,
                formId: result.newVersion.formId,
                versionNo: result.newVersion.versionNo,
                isActive: result.newVersion.isActive,
                changeReason: result.newVersion.changeReason,
                createdAt: result.newVersion.createdAt,
            },
        };
    }
}
