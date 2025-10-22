import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainPositionRepository } from './position.repository';
import { BaseService } from '../../../common/services/base.service';
import { Position } from './position.entity';

@Injectable()
export class DomainPositionService extends BaseService<Position> {
    constructor(private readonly positionRepository: DomainPositionRepository) {
        super(positionRepository);
    }

    async findByPositionId(id: string): Promise<Position> {
        const position = await this.positionRepository.findOne({ where: { id } });
        if (!position) {
            throw new NotFoundException('직책을 찾을 수 없습니다.');
        }
        return position;
    }

    async findByCode(positionCode: string): Promise<Position> {
        const position = await this.positionRepository.findByCode(positionCode);
        if (!position) {
            throw new NotFoundException('직책을 찾을 수 없습니다.');
        }
        return position;
    }

    async findManagementPositions(): Promise<Position[]> {
        return this.positionRepository.findManagementPositions();
    }
}
