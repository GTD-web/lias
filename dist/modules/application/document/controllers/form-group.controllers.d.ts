import { DocumentService } from '../document.service';
export declare class FormGroupController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    createFormGroup(): Promise<any[]>;
    findAllFormGroups(): Promise<any[]>;
    findFormGroupById(id: string): Promise<any[]>;
    updateFormGroupById(id: string): Promise<any[]>;
    deleteFormGroupById(id: string): Promise<any[]>;
}
