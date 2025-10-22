import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainDepartmentRepository } from './department.repository';
import { BaseService } from '../../../common/services/base.service';
import { Department } from './department.entity';

@Injectable()
export class DomainDepartmentService extends BaseService<Department> {
    constructor(private readonly departmentRepository: DomainDepartmentRepository) {
        super(departmentRepository);
    }

    async findByDepartmentId(id: string): Promise<Department> {
        const department = await this.departmentRepository.findOne({ where: { id } });
        if (!department) {
            throw new NotFoundException('부서를 찾을 수 없습니다.');
        }
        return department;
    }

    async findByCode(departmentCode: string): Promise<Department> {
        const department = await this.departmentRepository.findByCode(departmentCode);
        if (!department) {
            throw new NotFoundException('부서를 찾을 수 없습니다.');
        }
        return department;
    }

    async findRootDepartments(): Promise<Department[]> {
        return this.departmentRepository.findRootDepartments();
    }

    async findChildDepartments(parentDepartmentId: string): Promise<Department[]> {
        return this.departmentRepository.findChildDepartments(parentDepartmentId);
    }
}
