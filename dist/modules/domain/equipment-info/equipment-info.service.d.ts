import { DomainEquipmentInfoRepository } from './equipment-info.repository';
import { BaseService } from '@libs/services/base.service';
import { EquipmentInfo } from '@libs/entities/equipment-info.entity';
export declare class DomainEquipmentInfoService extends BaseService<EquipmentInfo> {
    private readonly equipmentInfoRepository;
    constructor(equipmentInfoRepository: DomainEquipmentInfoRepository);
}
