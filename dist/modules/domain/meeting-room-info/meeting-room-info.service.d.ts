import { DomainMeetingRoomInfoRepository } from './meeting-room-info.repository';
import { BaseService } from '@libs/services/base.service';
import { MeetingRoomInfo } from '@libs/entities/meeting-room-info.entity';
export declare class DomainMeetingRoomInfoService extends BaseService<MeetingRoomInfo> {
    private readonly meetingRoomInfoRepository;
    constructor(meetingRoomInfoRepository: DomainMeetingRoomInfoRepository);
    findByMeetingRoomInfoId(meetingRoomInfoId: string): Promise<MeetingRoomInfo>;
    findByResourceId(resourceId: string): Promise<MeetingRoomInfo>;
}
