import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainDepartmentRepository extends BaseRepository<Department> {
    constructor(
        @InjectRepository(Department)
        repository: Repository<Department>,
    ) {
        super(repository);
    }

    async findByCode(departmentCode: string): Promise<Department | null> {
        return this.repository.findOne({ where: { departmentCode } });
    }

    async findRootDepartments(): Promise<Department[]> {
        return this.repository.find({
            where: { parentDepartmentId: null as any },
            order: { order: 'ASC' },
        });
    }

    async findChildDepartments(parentDepartmentId: string): Promise<Department[]> {
        return this.repository.find({
            where: { parentDepartmentId },
            order: { order: 'ASC' },
        });
    }
}
