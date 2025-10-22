import { Repository } from 'typeorm';
import { Form } from './form.entity';
import { FormStatus } from '../../../common/enums/approval.enum';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainFormRepository extends BaseRepository<Form> {
    constructor(repository: Repository<Form>);
    findByStatus(status: FormStatus): Promise<Form[]>;
    findActiveForms(): Promise<Form[]>;
}
