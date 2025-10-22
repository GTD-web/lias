import {
    AssigneeRule,
    ApprovalStepType,
    ApprovalLineType,
    DepartmentScopeType,
} from '../../../../common/enums/approval.enum';

/**
 * 문서양식 생성/수정 시 결재선 연결 관련 DTO
 */

export class CreateFormWithApprovalLineDto {
    formName: string;
    formCode: string;
    description?: string;
    template?: string; // 문서양식 HTML 템플릿
    useExistingLine: boolean; // true: 기존 템플릿 참조, false: 복제 후 수정
    lineTemplateVersionId?: string; // useExistingLine=true 시 사용
    baseLineTemplateVersionId?: string; // useExistingLine=false 시 복제 원본
    stepEdits?: StepEditDto[]; // useExistingLine=false 시 수정할 단계들
    createdBy?: string; // 생성자 ID
}

export class StepEditDto {
    stepOrder: number;
    stepType: ApprovalStepType;
    assigneeRule: AssigneeRule; // FIXED, DRAFTER, DRAFTER_SUPERIOR, DEPARTMENT_HEAD, POSITION_BASED, RANK_BASED
    targetDepartmentId?: string;
    targetPositionId?: string;
    targetEmployeeId?: string;
    isRequired: boolean;
}

export class UpdateFormVersionDto {
    formId: string;
    versionNote?: string;
    template?: string; // 문서양식 템플릿 (HTML)
    lineTemplateVersionId?: string; // 결재선 변경 시
    cloneAndEdit?: boolean; // 복제 후 수정 여부
    baseLineTemplateVersionId?: string;
    stepEdits?: StepEditDto[];
    createdBy?: string; // 수정자 ID
}

export class CloneApprovalLineTemplateDto {
    baseTemplateVersionId: string;
    newTemplateName?: string; // null이면 원본 템플릿에 새 버전 추가
    stepEdits?: StepEditDto[];
    createdBy?: string; // 생성자 ID
}

export class CreateApprovalLineTemplateVersionDto {
    templateId: string;
    versionNote?: string;
    steps: StepEditDto[];
    createdBy?: string; // 생성자 ID
}

export class CreateApprovalLineTemplateDto {
    name: string;
    description?: string;
    type: ApprovalLineType;
    orgScope: DepartmentScopeType;
    departmentId?: string;
    steps: StepEditDto[];
    createdBy?: string; // 생성자 ID
}
