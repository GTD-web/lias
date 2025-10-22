import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './position.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainPositionRepository extends BaseRepository<Position> {
    constructor(
        @InjectRepository(Position)
        repository: Repository<Position>,
    ) {
        super(repository);
    }

    async findByCode(positionCode: string): Promise<Position | null> {
        return this.repository.findOne({ where: { positionCode } });
    }

    async findManagementPositions(): Promise<Position[]> {
        return this.repository.find({
            where: { hasManagementAuthority: true },
            order: { level: 'ASC' },
        });
    }
}
