export declare class FormResponseDto {
    id: string;
    name: string;
    code: string;
    description?: string;
    status: string;
    currentVersionId?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class FormVersionResponseDto {
    id: string;
    formId: string;
    versionNo: number;
    isActive: boolean;
    changeReason?: string;
    createdAt: Date;
}
export declare class FormVersionWithApprovalLineResponseDto extends FormVersionResponseDto {
    template?: string;
    approvalLineInfo?: {
        template: ApprovalLineTemplateResponseDto;
        templateVersion: ApprovalLineTemplateVersionResponseDto;
        steps: ApprovalStepTemplateResponseDto[];
    };
}
export declare class CreateFormResponseDto {
    form: FormResponseDto;
    formVersion: FormVersionResponseDto;
    lineTemplateVersionId: string;
}
export declare class UpdateFormVersionResponseDto {
    form: FormResponseDto;
    newVersion: FormVersionResponseDto;
}
export declare class ApprovalLineTemplateResponseDto {
    id: string;
    name: string;
    description?: string;
    type: string;
    orgScope: string;
    departmentId?: string;
    status: string;
    currentVersionId?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ApprovalLineTemplateVersionResponseDto {
    id: string;
    templateId: string;
    versionNo: number;
    isActive: boolean;
    changeReason?: string;
    createdAt: Date;
}
export declare class ApprovalStepSnapshotResponseDto {
    id: string;
    stepOrder: number;
    stepType: string;
    approverId: string;
    approverDepartmentId?: string;
    approverPositionId?: string;
    required: boolean;
    status: string;
}
export declare class ApprovalSnapshotResponseDto {
    id: string;
    documentId: string;
    frozenAt: Date;
    steps?: ApprovalStepSnapshotResponseDto[];
}
export declare class ApprovalStepTemplateResponseDto {
    id: string;
    lineTemplateVersionId: string;
    stepOrder: number;
    stepType: string;
    assigneeRule: string;
    defaultApproverId?: string;
    targetDepartmentId?: string;
    targetPositionId?: string;
    required: boolean;
    description?: string;
    defaultApprover?: {
        id: string;
        employeeNumber: string;
        name: string;
        email: string;
        phoneNumber: string;
    };
    targetDepartment?: {
        id: string;
        departmentCode: string;
        departmentName: string;
    };
    targetPosition?: {
        id: string;
        positionCode: string;
        positionTitle: string;
        level: number;
        hasManagementAuthority: boolean;
    };
}
