import { Repository } from 'typeorm';
import { Employee } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainEmployeeRepository extends BaseRepository<Employee> {
    constructor(repository: Repository<Employee>);
}
