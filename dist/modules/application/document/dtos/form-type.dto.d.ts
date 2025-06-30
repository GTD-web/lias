export declare class CreateDocumentTypeDto {
    name: string;
    documentNumberCode: string;
}
declare const UpdateDocumentTypeDto_base: import("@nestjs/common").Type<Partial<CreateDocumentTypeDto>>;
export declare class UpdateDocumentTypeDto extends UpdateDocumentTypeDto_base {
    documentTypeId: string;
}
export declare class DocumentTypeResponseDto {
    documentTypeId: string;
    name: string;
    documentNumberCode: string;
}
export {};
