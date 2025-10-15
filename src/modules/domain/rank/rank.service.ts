import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainRankRepository } from './rank.repository';
import { BaseService } from '../../../common/services/base.service';
import { Rank } from '../../../database/entities';

@Injectable()
export class DomainRankService extends BaseService<Rank> {
    constructor(private readonly rankRepository: DomainRankRepository) {
        super(rankRepository);
    }

    /**
     * 직급 ID로 찾기
     */
    async findByRankId(id: string): Promise<Rank> {
        const rank = await this.rankRepository.findOne({ where: { id } });
        if (!rank) {
            throw new NotFoundException('직급을 찾을 수 없습니다.');
        }
        return rank;
    }

    /**
     * 직급 코드로 찾기
     */
    async findByRankCode(rankCode: string): Promise<Rank> {
        const rank = await this.rankRepository.findOne({ where: { rankCode } });
        if (!rank) {
            throw new NotFoundException('직급을 찾을 수 없습니다.');
        }
        return rank;
    }

    /**
     * 직급 코드로 찾기 (없으면 null 반환)
     */
    async findOrNullByRankCode(rankCode: string): Promise<Rank | null> {
        return await this.rankRepository.findOne({ where: { rankCode } });
    }

    /**
     * 레벨 순으로 모든 직급 조회
     */
    async findAllOrderedByLevel(): Promise<Rank[]> {
        return await this.rankRepository.findAll({
            order: { level: 'ASC' },
        });
    }

    /**
     * 특정 레벨의 직급 조회
     */
    async findByLevel(level: number): Promise<Rank[]> {
        return await this.rankRepository.findAll({
            where: { level },
        });
    }

    /**
     * 특정 레벨 이상의 직급 조회 (상위 직급)
     */
    // async findSeniorRanks(level: number): Promise<Rank[]> {
    //     const qb = this.rankRepository.createQueryBuilder('rank');
    //     return await qb.where('rank.level <= :level', { level }).orderBy('rank.level', 'ASC').getMany();
    // }
}
