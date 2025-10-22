import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainRankRepository } from './rank.repository';
import { BaseService } from '../../../common/services/base.service';
import { Rank } from './rank.entity';

@Injectable()
export class DomainRankService extends BaseService<Rank> {
    constructor(private readonly rankRepository: DomainRankRepository) {
        super(rankRepository);
    }

    async findByRankId(id: string): Promise<Rank> {
        const rank = await this.rankRepository.findOne({ where: { id } });
        if (!rank) {
            throw new NotFoundException('직급을 찾을 수 없습니다.');
        }
        return rank;
    }

    async findByCode(rankCode: string): Promise<Rank> {
        const rank = await this.rankRepository.findByCode(rankCode);
        if (!rank) {
            throw new NotFoundException('직급을 찾을 수 없습니다.');
        }
        return rank;
    }

    async findByLevel(level: number): Promise<Rank[]> {
        return this.rankRepository.findByLevel(level);
    }
}
