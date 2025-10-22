import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './form.entity';
import { FormStatus } from '../../../common/enums/approval.enum';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainFormRepository extends BaseRepository<Form> {
    constructor(
        @InjectRepository(Form)
        repository: Repository<Form>,
    ) {
        super(repository);
    }

    async findByStatus(status: FormStatus): Promise<Form[]> {
        return this.repository.find({
            where: { status },
            order: { createdAt: 'DESC' },
        });
    }

    async findActiveForms(): Promise<Form[]> {
        return this.findByStatus(FormStatus.ACTIVE);
    }
}
