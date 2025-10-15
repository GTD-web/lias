import { Repository } from 'typeorm';
import { Position } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainPositionRepository extends BaseRepository<Position> {
    constructor(repository: Repository<Position>);
}
