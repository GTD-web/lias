import { FormApprovalLineResponseDto } from './approval-line.dto';
import { DocumentTypeResponseDto } from './form-type.dto';
import { AutoFillType } from 'src/common/enums/approval.enum';
export declare class EmployeeInfoDto {
    employeeId: string;
    name: string;
    rank: string;
}
export declare class CreateDocumentFormDto {
    name: string;
    description: string;
    template: string;
    autoFillType: AutoFillType;
    documentTypeId: string;
    formApprovalLineId: string;
}
declare const UpdateDocumentFormDto_base: import("@nestjs/common").Type<Partial<CreateDocumentFormDto>>;
export declare class UpdateDocumentFormDto extends UpdateDocumentFormDto_base {
    documentFormId: string;
}
export declare class DocumentFormResponseDto {
    documentFormId: string;
    name: string;
    description: string;
    template: string;
    autoFillType: AutoFillType;
    documentType: DocumentTypeResponseDto;
    formApprovalLine: FormApprovalLineResponseDto;
}
export {};
