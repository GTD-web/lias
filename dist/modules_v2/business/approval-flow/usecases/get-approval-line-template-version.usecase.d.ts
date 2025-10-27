import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
export declare class GetApprovalLineTemplateVersionUsecase {
    private readonly approvalFlowContext;
    private readonly logger;
    constructor(approvalFlowContext: ApprovalFlowContext);
    execute(templateId: string, versionId: string): Promise<{
        steps: any[];
        id: string;
        templateId: string;
        versionNo: number;
        isActive: boolean;
        changeReason?: string;
        createdBy?: string;
        createdAt: Date;
        updatedAt: Date;
        template: import("../../../domain").ApprovalLineTemplate;
        formVersionMappings: import("../../../domain").FormVersionApprovalLineTemplateVersion[];
        snapshots: import("../../../domain").ApprovalLineSnapshot[];
    }>;
}
