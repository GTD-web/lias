import { DomainDepartmentRepository } from './department.repository';
import { BaseService } from '../../../common/services/base.service';
import { Department } from '../../../database/entities';
export declare class DomainDepartmentService extends BaseService<Department> {
    private readonly departmentRepository;
    constructor(departmentRepository: DomainDepartmentRepository);
}
