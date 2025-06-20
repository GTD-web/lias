import { Repository } from 'typeorm';
import { Department } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainDepartmentRepository extends BaseRepository<Department> {
    constructor(repository: Repository<Department>);
}
