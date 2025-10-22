import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainDepartmentRepository extends BaseRepository<Department> {
    constructor(repository: Repository<Department>);
    findByCode(departmentCode: string): Promise<Department | null>;
    findRootDepartments(): Promise<Department[]>;
    findChildDepartments(parentDepartmentId: string): Promise<Department[]>;
}
