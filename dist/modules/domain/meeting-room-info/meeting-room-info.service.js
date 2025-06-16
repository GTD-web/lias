"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainMeetingRoomInfoService = void 0;
const common_1 = require("@nestjs/common");
const meeting_room_info_repository_1 = require("./meeting-room-info.repository");
const base_service_1 = require("@libs/services/base.service");
let DomainMeetingRoomInfoService = class DomainMeetingRoomInfoService extends base_service_1.BaseService {
    constructor(meetingRoomInfoRepository) {
        super(meetingRoomInfoRepository);
        this.meetingRoomInfoRepository = meetingRoomInfoRepository;
    }
    async findByMeetingRoomInfoId(meetingRoomInfoId) {
        const meetingRoomInfo = await this.meetingRoomInfoRepository.findOne({
            where: { meetingRoomInfoId },
        });
        if (!meetingRoomInfo) {
            throw new common_1.NotFoundException('회의실 정보를 찾을 수 없습니다.');
        }
        return meetingRoomInfo;
    }
    async findByResourceId(resourceId) {
        const meetingRoomInfo = await this.meetingRoomInfoRepository.findOne({
            where: { resourceId },
        });
        if (!meetingRoomInfo) {
            throw new common_1.NotFoundException('회의실 정보를 찾을 수 없습니다.');
        }
        return meetingRoomInfo;
    }
};
exports.DomainMeetingRoomInfoService = DomainMeetingRoomInfoService;
exports.DomainMeetingRoomInfoService = DomainMeetingRoomInfoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [meeting_room_info_repository_1.DomainMeetingRoomInfoRepository])
], DomainMeetingRoomInfoService);
//# sourceMappingURL=meeting-room-info.service.js.map