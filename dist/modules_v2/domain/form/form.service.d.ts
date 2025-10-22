import { DomainFormRepository } from './form.repository';
import { BaseService } from '../../../common/services/base.service';
import { Form } from './form.entity';
import { FormStatus } from '../../../common/enums/approval.enum';
export declare class DomainFormService extends BaseService<Form> {
    private readonly formRepository;
    constructor(formRepository: DomainFormRepository);
    findByFormId(id: string): Promise<Form>;
    findByStatus(status: FormStatus): Promise<Form[]>;
    findActiveForms(): Promise<Form[]>;
}
