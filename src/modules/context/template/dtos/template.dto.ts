import { DocumentTemplateStatus, ApprovalStepType, AssigneeRule } from '../../../../common/enums/approval.enum';

/**
 * 문서 템플릿 생성 DTO
 */
export class CreateDocumentTemplateDto {
    name: string;
    code: string;
    description?: string;
    template: string;
    status?: DocumentTemplateStatus;
    categoryId?: string;
}

/**
 * 문서 템플릿 수정 DTO
 */
export class UpdateDocumentTemplateDto {
    name?: string;
    code?: string;
    description?: string;
    template?: string;
    status?: DocumentTemplateStatus;
    categoryId?: string | null; // null로 설정하면 카테고리 제거
}

/**
 * 결재단계 템플릿 생성 DTO
 */
export class CreateApprovalStepTemplateDto {
    documentTemplateId: string;
    stepOrder?: number; // 지정하지 않으면 자동으로 마지막 순서 + 1
    stepType: ApprovalStepType;
    assigneeRule: AssigneeRule;
    targetEmployeeId?: string;
    targetDepartmentId?: string;
    targetPositionId?: string;
}

/**
 * 결재단계 템플릿 수정 DTO
 */
export class UpdateApprovalStepTemplateDto {
    stepOrder?: number;
    stepType?: ApprovalStepType;
    assigneeRule?: AssigneeRule;
    targetEmployeeId?: string | null;
    targetDepartmentId?: string | null;
    targetPositionId?: string | null;
}
