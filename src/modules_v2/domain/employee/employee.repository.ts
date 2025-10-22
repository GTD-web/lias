import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainEmployeeRepository extends BaseRepository<Employee> {
    constructor(
        @InjectRepository(Employee)
        repository: Repository<Employee>,
    ) {
        super(repository);
    }

    async findByEmail(email: string): Promise<Employee | null> {
        return this.repository.findOne({ where: { email } });
    }

    async findByEmployeeNumber(employeeNumber: string): Promise<Employee | null> {
        return this.repository.findOne({ where: { employeeNumber } });
    }
}
