import { FormStatus } from '../../../common/enums/approval.enum';
export declare class Form {
    id: string;
    name: string;
    code: string;
    description?: string;
    status: FormStatus;
    currentVersionId?: string;
    createdAt: Date;
    updatedAt: Date;
    currentVersion?: any;
    versions: any[];
}
