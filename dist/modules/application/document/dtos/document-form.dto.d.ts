import { FormApprovalLineResponseDto } from './approval-line.dto';
import { DocumentTypeResponseDto } from './form-type.dto';
import { ImplementerInfo, ReferencerInfo } from 'src/common/types/entity.type';
export declare class CreateDocumentFormDto {
    name: string;
    description: string;
    template: string;
    receiverInfo: ReferencerInfo[];
    implementerInfo: ImplementerInfo[];
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
    receiverInfo: ReferencerInfo[];
    implementerInfo: ImplementerInfo[];
    documentType: DocumentTypeResponseDto;
    formApprovalLine: FormApprovalLineResponseDto;
}
export {};
