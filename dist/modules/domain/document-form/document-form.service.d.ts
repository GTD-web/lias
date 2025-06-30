import { DomainDocumentFormRepository } from './document-form.repository';
import { BaseService } from '../../../common/services/base.service';
import { DocumentForm } from '../../../database/entities';
export declare class DomainDocumentFormService extends BaseService<DocumentForm> {
    private readonly documentFormRepository;
    constructor(documentFormRepository: DomainDocumentFormRepository);
}
