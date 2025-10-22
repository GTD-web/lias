import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainEmployeeRepository } from './employee.repository';
import { BaseService } from '../../../common/services/base.service';
import { Employee } from './employee.entity';

@Injectable()
export class DomainEmployeeService extends BaseService<Employee> {
    constructor(private readonly employeeRepository: DomainEmployeeRepository) {
        super(employeeRepository);
    }

    async findByEmployeeId(id: string): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({ where: { id } });
        if (!employee) {
            throw new NotFoundException('직원을 찾을 수 없습니다.');
        }
        return employee;
    }

    async findByEmail(email: string): Promise<Employee> {
        const employee = await this.employeeRepository.findByEmail(email);
        if (!employee) {
            throw new NotFoundException('직원을 찾을 수 없습니다.');
        }
        return employee;
    }

    async findByEmployeeNumber(employeeNumber: string): Promise<Employee> {
        const employee = await this.employeeRepository.findByEmployeeNumber(employeeNumber);
        if (!employee) {
            throw new NotFoundException('직원을 찾을 수 없습니다.');
        }
        return employee;
    }

    async findOrNullByEmployeeNumber(employeeNumber: string): Promise<Employee | null> {
        return this.employeeRepository.findByEmployeeNumber(employeeNumber);
    }

    async findOrNullByEmail(email: string): Promise<Employee | null> {
        return this.employeeRepository.findByEmail(email);
    }

    async findOrNullByEmployeeId(id: string): Promise<Employee | null> {
        return this.employeeRepository.findOne({ where: { id } });
    }
}
