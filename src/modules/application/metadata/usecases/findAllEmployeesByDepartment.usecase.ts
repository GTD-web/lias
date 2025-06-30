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
                employees: this.sortEmployees(departmentEmployees),
            };
        });
    }

    private sortEmployees(employees: any[]): any[] {
        return employees.sort((a, b) => {
            // 1순위: position
            const positionOrder = ['임원', '실장', 'PM', '파트장', '직원'];
            const aPositionIndex = positionOrder.indexOf(a.position);
            const bPositionIndex = positionOrder.indexOf(b.position);

            if (aPositionIndex !== bPositionIndex) {
                return aPositionIndex - bPositionIndex;
            }

            // 2순위: rank
            const rankOrder = [
                '사장',
                '부사장',
                '전무이사',
                '상무이사',
                '이사',
                '전문위원',
                '책임연구원',
                '책임매니저',
                '책임제조원',
                '선임매니저',
                '선임연구원',
                '선임제조원',
                '매니저',
                '연구원',
                '제조원',
            ];
            const aRankIndex = rankOrder.indexOf(a.rank);
            const bRankIndex = rankOrder.indexOf(b.rank);

            if (aRankIndex !== bRankIndex) {
                return aRankIndex - bRankIndex;
            }

            // 3순위: employeeNumber
            if (a.employeeNumber !== b.employeeNumber) {
                return a.employeeNumber.localeCompare(b.employeeNumber);
            }

            // 4순위: 이름
            return a.name.localeCompare(b.name);
        });
    }
}
