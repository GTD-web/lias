import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rank } from './rank.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainRankRepository extends BaseRepository<Rank> {
    constructor(
        @InjectRepository(Rank)
        repository: Repository<Rank>,
    ) {
        super(repository);
    }

    async findByCode(rankCode: string): Promise<Rank | null> {
        return this.repository.findOne({ where: { rankCode } });
    }

    async findByLevel(level: number): Promise<Rank[]> {
        return this.repository.find({
            where: { level },
            order: { level: 'ASC' },
        });
    }
}
