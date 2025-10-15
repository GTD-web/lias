import { DomainRankRepository } from './rank.repository';
import { BaseService } from '../../../common/services/base.service';
import { Rank } from '../../../database/entities';
export declare class DomainRankService extends BaseService<Rank> {
    private readonly rankRepository;
    constructor(rankRepository: DomainRankRepository);
    findByRankId(id: string): Promise<Rank>;
    findByRankCode(rankCode: string): Promise<Rank>;
    findOrNullByRankCode(rankCode: string): Promise<Rank | null>;
    findAllOrderedByLevel(): Promise<Rank[]>;
    findByLevel(level: number): Promise<Rank[]>;
}
