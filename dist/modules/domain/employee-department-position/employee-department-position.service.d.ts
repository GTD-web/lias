import { DomainEmployeeDepartmentPositionRepository } from './employee-department-position.repository';
import { BaseService } from '../../../common/services/base.service';
import { EmployeeDepartmentPosition } from './employee-department-position.entity';
export declare class DomainEmployeeDepartmentPositionService extends BaseService<EmployeeDepartmentPosition> {
    private readonly employeeDepartmentPositionRepository;
    constructor(employeeDepartmentPositionRepository: DomainEmployeeDepartmentPositionRepository);
}
