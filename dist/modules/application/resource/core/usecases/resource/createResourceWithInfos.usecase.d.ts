import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { DomainResourceManagerService } from '@src/domain/resource-manager/resource-manager.service';
import { CreateResourceInfoDto } from '../../dtos/create-resource.dto';
import { DataSource } from 'typeorm';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { DomainMeetingRoomInfoService } from '@src/domain/meeting-room-info/meeting-room-info.service';
import { DomainAccommodationInfoService } from '@src/domain/accommodation-info/accommodation-info.service';
import { DomainFileService } from '@src/domain/file/file.service';
import { CreateResourceResponseDto } from '../../dtos/resource-response.dto';
import { DomainEquipmentInfoService } from '@src/domain/equipment-info/equipment-info.service';
export declare class CreateResourceWithInfosUsecase {
    private readonly resourceService;
    private readonly resourceGroupService;
    private readonly resourceManagerService;
    private readonly vehicleInfoService;
    private readonly meetingRoomInfoService;
    private readonly accommodationInfoService;
    private readonly equipmentInfoService;
    private readonly fileService;
    private readonly dataSource;
    constructor(resourceService: DomainResourceService, resourceGroupService: DomainResourceGroupService, resourceManagerService: DomainResourceManagerService, vehicleInfoService: DomainVehicleInfoService, meetingRoomInfoService: DomainMeetingRoomInfoService, accommodationInfoService: DomainAccommodationInfoService, equipmentInfoService: DomainEquipmentInfoService, fileService: DomainFileService, dataSource: DataSource);
    execute(createResourceInfo: CreateResourceInfoDto): Promise<CreateResourceResponseDto>;
}
