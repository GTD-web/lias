import { Repository } from 'typeorm';
import { Rank } from './rank.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainRankRepository extends BaseRepository<Rank> {
    constructor(repository: Repository<Rank>);
    findByCode(rankCode: string): Promise<Rank | null>;
    findByLevel(level: number): Promise<Rank[]>;
}
