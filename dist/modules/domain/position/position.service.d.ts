import { DomainPositionRepository } from './position.repository';
import { BaseService } from '../../../common/services/base.service';
import { Position } from '../../../database/entities';
export declare class DomainPositionService extends BaseService<Position> {
    private readonly positionRepository;
    constructor(positionRepository: DomainPositionRepository);
    findByPositionId(id: string): Promise<Position>;
    findByPositionCode(positionCode: string): Promise<Position>;
    findOrNullByPositionCode(positionCode: string): Promise<Position | null>;
    findManagementPositions(): Promise<Position[]>;
    findAllOrderedByLevel(): Promise<Position[]>;
}
