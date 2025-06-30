import { Injectable } from '@nestjs/common';
import { DomainEmployeeService } from 'src/modules/domain/employee/employee.service';
import { Employee } from 'src/database/entities/employee.entity';
import { Request } from 'express';

@Injectable()
export class FindMeUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    async execute(user: Employee): Promise<Employee> {
        return await this.employeeService.findOne({
            where: {
                employeeNumber: user.employeeNumber,
            },
        });
    }
}
