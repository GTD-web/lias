import { DomainRankRepository } from './rank.repository';
import { BaseService } from '../../../common/services/base.service';
import { Rank } from './rank.entity';
export declare class DomainRankService extends BaseService<Rank> {
    private readonly rankRepository;
    constructor(rankRepository: DomainRankRepository);
    findByRankId(id: string): Promise<Rank>;
    findByCode(rankCode: string): Promise<Rank>;
    findByLevel(level: number): Promise<Rank[]>;
}
