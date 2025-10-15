import { Repository } from 'typeorm';
import { EmployeeDepartmentPosition } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainEmployeeDepartmentPositionRepository extends BaseRepository<EmployeeDepartmentPosition> {
    constructor(repository: Repository<EmployeeDepartmentPosition>);
}
