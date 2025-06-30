import { Injectable } from '@nestjs/common';
import { DomainEmployeeService } from '../../../domain/employee/employee.service';
import { MMSEmployeeResponseDto } from '../dtos/mms-employee-response.dto';

@Injectable()
export class SyncEmployeeUsecase {
    constructor(private readonly employeeService: DomainEmployeeService) {}

    async execute(employees: MMSEmployeeResponseDto[]): Promise<void> {
        for (const employee of employees) {
            const existingEmployee = await this.employeeService.findOne({
                where: {
                    employeeNumber: employee.employee_number,
                },
            });

            if (employee.status === '퇴사') {
                if (existingEmployee) {
                    await this.employeeService.update(existingEmployee.employeeId, {
                        department: employee.status,
                        position: employee.status,
                        rank: employee.status,
                    });
                }
                continue;
            }

            try {
                if (existingEmployee) {
                    existingEmployee.name = employee.name;
                    existingEmployee.email = employee.email;
                    existingEmployee.employeeNumber = employee.employee_number;
                    existingEmployee.department = employee.department;
                    existingEmployee.position = employee.position;
                    existingEmployee.rank = employee.rank;
                    // existingEmployee.mobile = employee.phone_number;
                    await this.employeeService.save(existingEmployee);
                } else {
                    console.log('create employee', employee);
                    const employeeData = {
                        name: employee.name,
                        email: employee.email,
                        employeeNumber: employee.employee_number,
                        department: employee.department,
                        position: employee.position,
                        rank: employee.rank,
                        // mobile: employee.phone_number,
                    };
                    const newEmployee = await this.employeeService.create(employeeData);
                    await this.employeeService.save(newEmployee);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
