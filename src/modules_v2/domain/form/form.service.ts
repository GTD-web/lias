import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainFormRepository } from './form.repository';
import { BaseService } from '../../../common/services/base.service';
import { Form } from './form.entity';
import { FormStatus } from '../../../common/enums/approval.enum';

@Injectable()
export class DomainFormService extends BaseService<Form> {
    constructor(private readonly formRepository: DomainFormRepository) {
        super(formRepository);
    }

    async findByFormId(id: string): Promise<Form> {
        const form = await this.formRepository.findOne({ where: { id } });
        if (!form) {
            throw new NotFoundException('양식을 찾을 수 없습니다.');
        }
        return form;
    }

    async findByStatus(status: FormStatus): Promise<Form[]> {
        return this.formRepository.findByStatus(status);
    }

    async findActiveForms(): Promise<Form[]> {
        return this.formRepository.findActiveForms();
    }
}
