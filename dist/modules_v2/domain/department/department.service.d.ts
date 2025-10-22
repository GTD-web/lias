import { DomainDepartmentRepository } from './department.repository';
import { BaseService } from '../../../common/services/base.service';
import { Department } from './department.entity';
export declare class DomainDepartmentService extends BaseService<Department> {
    private readonly departmentRepository;
    constructor(departmentRepository: DomainDepartmentRepository);
    findByDepartmentId(id: string): Promise<Department>;
    findByCode(departmentCode: string): Promise<Department>;
    findRootDepartments(): Promise<Department[]>;
    findChildDepartments(parentDepartmentId: string): Promise<Department[]>;
}
