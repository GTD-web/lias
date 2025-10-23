/**
 * 기안 시 assignee rule 해석을 위한 컨텍스트
 */

export class DraftContextDto {
    drafterId: string; // 기안자 ID
    drafterDepartmentId?: string; // 기안자 부서 ID
    documentAmount?: number; // 문서 금액 (금액 기반 결재선용)
    documentType?: string; // 문서 유형
    customFields?: Record<string, any>; // 추가 컨텍스트 정보
}

export class ResolvedApproverDto {
    employeeId: string;
    employeeName?: string;
    departmentId?: string;
    positionId?: string;
    stepOrder: number;
    stepType: string;
    assigneeRule?: string;
    isRequired: boolean;
}

export class CustomApprovalStepDto {
    stepOrder: number;
    stepType: string;
    assigneeRule: string;
    employeeId: string;
    isRequired: boolean;
}

export class CreateSnapshotDto {
    documentId: string;
    formVersionId: string;
    draftContext: DraftContextDto;
    customApprovalSteps?: CustomApprovalStepDto[];
}
