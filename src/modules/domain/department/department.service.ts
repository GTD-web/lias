import { Injectable } from '@nestjs/common';
import { DomainDepartmentRepository } from './department.repository';
import { BaseService } from '../../../common/services/base.service';
import { Department } from '../../../database/entities';

@Injectable()
export class DomainDepartmentService extends BaseService<Department> {
    constructor(private readonly departmentRepository: DomainDepartmentRepository) {
        super(departmentRepository);
    }
}
