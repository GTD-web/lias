import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainEmployeeRepository extends BaseRepository<Employee> {
    constructor(
        @InjectRepository(Employee)
        repository: Repository<Employee>,
    ) {
        super(repository);
    }
}
