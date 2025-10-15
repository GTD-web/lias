import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainPositionRepository } from './position.repository';
import { BaseService } from '../../../common/services/base.service';
import { Position } from '../../../database/entities';

@Injectable()
export class DomainPositionService extends BaseService<Position> {
    constructor(private readonly positionRepository: DomainPositionRepository) {
        super(positionRepository);
    }

    /**
     * 직책 ID로 찾기
     */
    async findByPositionId(id: string): Promise<Position> {
        const position = await this.positionRepository.findOne({ where: { id } });
        if (!position) {
            throw new NotFoundException('직책을 찾을 수 없습니다.');
        }
        return position;
    }

    /**
     * 직책 코드로 찾기
     */
    async findByPositionCode(positionCode: string): Promise<Position> {
        const position = await this.positionRepository.findOne({ where: { positionCode } });
        if (!position) {
            throw new NotFoundException('직책을 찾을 수 없습니다.');
        }
        return position;
    }

    /**
     * 직책 코드로 찾기 (없으면 null 반환)
     */
    async findOrNullByPositionCode(positionCode: string): Promise<Position | null> {
        return await this.positionRepository.findOne({ where: { positionCode } });
    }

    /**
     * 관리 권한이 있는 직책 목록 조회
     */
    async findManagementPositions(): Promise<Position[]> {
        return await this.positionRepository.findAll({
            where: { hasManagementAuthority: true },
            order: { level: 'ASC' },
        });
    }

    /**
     * 레벨 순으로 모든 직책 조회
     */
    async findAllOrderedByLevel(): Promise<Position[]> {
        return await this.positionRepository.findAll({
            order: { level: 'ASC' },
        });
    }
}
