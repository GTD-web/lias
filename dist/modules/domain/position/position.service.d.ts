import { DomainPositionRepository } from './position.repository';
import { BaseService } from '../../../common/services/base.service';
import { Position } from './position.entity';
export declare class DomainPositionService extends BaseService<Position> {
    private readonly positionRepository;
    constructor(positionRepository: DomainPositionRepository);
}
