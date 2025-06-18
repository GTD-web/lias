import { FormApprovalLineResponseDto } from './approval-line.dto';
import { DocumentTypeResponseDto } from './form-type.dto';
export declare class CreateDocumentFormDto {
    name: string;
    description: string;
    template: string;
    documentTypeId: string;
    formApprovalLineId: string;
}
declare const UpdateDocumentFormDto_base: import("@nestjs/common").Type<Partial<CreateDocumentFormDto>>;
export declare class UpdateDocumentFormDto extends UpdateDocumentFormDto_base {
}
export declare class DocumentFormResponseDto {
    documentFormId: string;
    name: string;
    description: string;
    template: string;
    documentType: DocumentTypeResponseDto;
    formApprovalLine: FormApprovalLineResponseDto;
}
export {};
