import { Repository } from 'typeorm';
import { EquipmentInfo } from '@libs/entities/equipment-info.entity';
import { BaseRepository } from '@libs/repositories/base.repository';
export declare class DomainEquipmentInfoRepository extends BaseRepository<EquipmentInfo> {
    constructor(repository: Repository<EquipmentInfo>);
}
