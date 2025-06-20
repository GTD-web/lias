import { Injectable } from '@nestjs/common';
import { DomainDepartmentService } from '../../../domain/department/department.service';
import { MMSDepartmentResponseDto } from '../dtos/mms-department-response.dto';
import { Department } from 'src/database/entities';

@Injectable()
export class SyncDepartmentUsecase {
    constructor(private readonly departmentService: DomainDepartmentService) {}

    async execute(departments: MMSDepartmentResponseDto[]): Promise<void> {
        await this.recursiveSyncDepartments(departments);
    }

    private async syncDepartment(
        department: MMSDepartmentResponseDto,
        parentDepartmentId?: string,
    ): Promise<Department> {
        let existingDepartment = await this.departmentService.findOne({
            where: {
                departmentCode: department.department_code,
            },
        });

        try {
            if (existingDepartment) {
                existingDepartment.departmentName = department.department_name;
                existingDepartment.departmentCode = department.department_code;
                existingDepartment.parentDepartmentId = parentDepartmentId;
                await this.departmentService.save(existingDepartment);
            } else {
                console.log('create department', department);
                const newDepartment = await this.departmentService.create({
                    departmentName: department.department_name,
                    departmentCode: department.department_code,
                    parentDepartmentId: parentDepartmentId,
                });
                existingDepartment = await this.departmentService.save(newDepartment);
            }
            return existingDepartment;
        } catch (error) {
            console.log(error);
        }
    }

    private async recursiveSyncDepartments(
        departments: MMSDepartmentResponseDto[],
        parentDepartmentId?: string,
    ): Promise<void> {
        for (const department of departments) {
            const syncedDepartment = await this.syncDepartment(department, parentDepartmentId);

            if (department.child_departments && department.child_departments.length > 0) {
                await this.recursiveSyncDepartments(department.child_departments, syncedDepartment.departmentId);
            }
        }
    }
}
