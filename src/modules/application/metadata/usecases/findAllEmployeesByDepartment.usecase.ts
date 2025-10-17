import { Injectable } from '@nestjs/common';
import { DomainEmployeeService } from 'src/modules/domain/employee/employee.service';
import { MetadataResponseDto, DepartmentResponseDto, EmployeeResponseDto } from '../dtos/metadata-response.dto';
import { DomainDepartmentService } from 'src/modules/domain/department/department.service';
import { IsNull } from 'typeorm';
import { Employee } from 'src/database/entities/employee.entity';
import { Department } from 'src/database/entities/department.entity ';
import { EmployeeDepartmentPosition } from 'src/database/entities/employee-department-position.entity';

interface EmployeeWithRelations extends Employee {
    departmentPositions?: EmployeeDepartmentPosition[];
}

@Injectable()
export class FindAllEmployeesByDepartmentUsecase {
    constructor(
        private readonly employeeService: DomainEmployeeService,
        private readonly departmentService: DomainDepartmentService,
    ) {}

    async execute(): Promise<MetadataResponseDto> {
        // 최상위 부서와 하위 부서들을 재귀적으로 조회
        const departments = await this.departmentService.findAll({
            where: {
                parentDepartment: IsNull(),
            },
            relations: ['childDepartments', 'childDepartments.childDepartments'],
            order: {
                order: 'ASC',
                childDepartments: {
                    order: 'ASC',
                },
            },
        });

        // 직원 정보를 부서-직책 관계와 함께 조회
        const employees = await this.employeeService.findAll({
            relations: [
                'departmentPositions',
                'departmentPositions.department',
                'departmentPositions.position',
                'currentRank',
            ],
        });

        const metadata = this.buildDepartmentTree(departments, employees as EmployeeWithRelations[]);
        return metadata[0];
    }

    private buildDepartmentTree(departments: Department[], employees: EmployeeWithRelations[]): MetadataResponseDto[] {
        return departments.map((department) => {
            // 해당 부서에 속한 직원 필터링
            const departmentEmployees = employees.filter((employee) => {
                // 새로운 구조: departmentPositions를 통한 관계 확인
                if (employee.departmentPositions && employee.departmentPositions.length > 0) {
                    return employee.departmentPositions.some((dp) => dp.departmentId === department.id);
                }
            });

            // 하위 부서 재귀 처리
            const childrenDepartments =
                department.childDepartments && department.childDepartments.length > 0
                    ? this.buildDepartmentTree(department.childDepartments, employees)
                    : [];

            // 엔티티를 DTO로 변환
            const departmentDto = this.convertDepartmentToDto(department, childrenDepartments);
            const employeeDtos = this.sortEmployees(departmentEmployees, department.id);

            return {
                department: departmentDto,
                employees: employeeDtos,
            };
        });
    }

    private convertDepartmentToDto(
        department: Department,
        childrenDepartments: MetadataResponseDto[],
    ): DepartmentResponseDto {
        return {
            departmentId: department.id,
            departmentName: department.departmentName,
            departmentCode: department.departmentCode,
            childrenDepartments: childrenDepartments.map((meta) => meta.department),
        };
    }

    private sortEmployees(employees: EmployeeWithRelations[], departmentId: string): EmployeeResponseDto[] {
        // 정렬을 위한 임시 타입
        interface SortableEmployee extends EmployeeResponseDto {
            positionLevel: number;
            rankLevel: number;
        }

        return employees
            .map((employee): SortableEmployee => {
                // 해당 부서에서의 직책 정보 찾기
                const deptPosition = employee.departmentPositions?.find((dp) => dp.departmentId === departmentId);

                return {
                    employeeId: employee.id,
                    name: employee.name,
                    email: employee.email,
                    employeeNumber: employee.employeeNumber,
                    // 정렬을 위한 추가 정보 (임시)
                    positionLevel: deptPosition?.position?.level || 999,
                    rankLevel: employee.currentRank?.level || 999,
                };
            })
            .sort((a, b) => {
                // 1순위: position level (낮을수록 상위)
                if (a.positionLevel !== b.positionLevel) {
                    return a.positionLevel - b.positionLevel;
                }

                // 2순위: rank level (낮을수록 상위)
                if (a.rankLevel !== b.rankLevel) {
                    return a.rankLevel - b.rankLevel;
                }

                // 3순위: employeeNumber
                if (a.employeeNumber !== b.employeeNumber) {
                    return a.employeeNumber.localeCompare(b.employeeNumber);
                }

                // 4순위: 이름
                return a.name.localeCompare(b.name);
            })
            .map(({ positionLevel, rankLevel, ...employee }) => employee); // 정렬 후 임시 필드 제거
    }
}
