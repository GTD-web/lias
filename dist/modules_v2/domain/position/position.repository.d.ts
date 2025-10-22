import { Repository } from 'typeorm';
import { Position } from './position.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainPositionRepository extends BaseRepository<Position> {
    constructor(repository: Repository<Position>);
    findByCode(positionCode: string): Promise<Position | null>;
    findManagementPositions(): Promise<Position[]>;
}
