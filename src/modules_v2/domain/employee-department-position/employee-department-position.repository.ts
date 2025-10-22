import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeDepartmentPosition } from './employee-department-position.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainEmployeeDepartmentPositionRepository extends BaseRepository<EmployeeDepartmentPosition> {
    constructor(
        @InjectRepository(EmployeeDepartmentPosition)
        repository: Repository<EmployeeDepartmentPosition>,
    ) {
        super(repository);
    }

    async findByEmployeeId(employeeId: string): Promise<EmployeeDepartmentPosition[]> {
        return this.repository.find({
            where: { employeeId },
            relations: ['department', 'position'],
        });
    }

    async findByDepartmentId(departmentId: string): Promise<EmployeeDepartmentPosition[]> {
        return this.repository.find({
            where: { departmentId },
            relations: ['employee', 'position'],
        });
    }

    async findManagersByDepartmentId(departmentId: string): Promise<EmployeeDepartmentPosition[]> {
        return this.repository.find({
            where: { departmentId, isManager: true },
            relations: ['employee', 'position'],
        });
    }
}
