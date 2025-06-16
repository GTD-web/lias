import { Repository } from 'typeorm';
import { MeetingRoomInfo } from '@libs/entities/meeting-room-info.entity';
import { BaseRepository } from '@libs/repositories/base.repository';
export declare class DomainMeetingRoomInfoRepository extends BaseRepository<MeetingRoomInfo> {
    constructor(repository: Repository<MeetingRoomInfo>);
}
