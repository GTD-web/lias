import { FormApprovalLineResponseDto } from './approval-line.dto';
import { DocumentTypeResponseDto } from './form-type.dto';
import { ImplementerInfo, ReferencerInfo } from 'src/common/types/entity.type';
export declare class EmployeeInfoDto {
    employeeId: string;
    name: string;
    rank: string;
}
export declare class CreateDocumentFormDto {
    name: string;
    description: string;
    template: string;
    receiverInfo: EmployeeInfoDto[];
    implementerInfo: EmployeeInfoDto[];
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
    receiverInfo: ReferencerInfo[];
    implementerInfo: ImplementerInfo[];
    documentType: DocumentTypeResponseDto;
    formApprovalLine: FormApprovalLineResponseDto;
}
export {};
