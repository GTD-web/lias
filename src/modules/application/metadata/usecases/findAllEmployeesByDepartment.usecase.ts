import { Injectable } from '@nestjs/common';
import { DomainEmployeeService } from 'src/modules/domain/employee/employee.service';
import { MetadataResponseDto } from '../dtos/metadata-response.dto';
import { DomainDepartmentService } from 'src/modules/domain/department/department.service';
import { IsNull } from 'typeorm';

@Injectable()
export class FindAllEmployeesByDepartmentUsecase {
    constructor(
        private readonly employeeService: DomainEmployeeService,
        private readonly departmentService: DomainDepartmentService,
    ) {}

    async execute(): Promise<MetadataResponseDto> {
        const departments = await this.departmentService.findAll({
            where: {
                parentDepartment: IsNull(),
            },
            relations: ['childrenDepartments', 'childrenDepartments.childrenDepartments'],
        });
        console.log('departments', departments);
        const employees = await this.employeeService.findAll({
            select: {
                employeeId: true,
                name: true,
                email: true,
                employeeNumber: true,
                position: true,
                department: true,
                rank: true,
            },
        });

        const metadata = this.buildDepartmentTree(departments, employees);
        return metadata[0];
    }

    private buildDepartmentTree(departments: any[], employees: any[]): MetadataResponseDto[] {
        return departments.map((department) => {
            const departmentEmployees = employees.filter(
                (employee) => employee.department === department.departmentCode,
            );

            const childrenDepartments =
                department.childrenDepartments && department.childrenDepartments.length > 0
                    ? this.buildDepartmentTree(department.childrenDepartments, employees)
                    : [];

            department.childrenDepartments = childrenDepartments;
            return {
                department,
                employees: departmentEmployees,
            };
        });
    }
}
