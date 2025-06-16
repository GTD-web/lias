"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainMeetingRoomInfoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const meeting_room_info_service_1 = require("./meeting-room-info.service");
const meeting_room_info_repository_1 = require("./meeting-room-info.repository");
const meeting_room_info_entity_1 = require("@libs/entities/meeting-room-info.entity");
let DomainMeetingRoomInfoModule = class DomainMeetingRoomInfoModule {
};
exports.DomainMeetingRoomInfoModule = DomainMeetingRoomInfoModule;
exports.DomainMeetingRoomInfoModule = DomainMeetingRoomInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([meeting_room_info_entity_1.MeetingRoomInfo])],
        providers: [meeting_room_info_service_1.DomainMeetingRoomInfoService, meeting_room_info_repository_1.DomainMeetingRoomInfoRepository],
        exports: [meeting_room_info_service_1.DomainMeetingRoomInfoService],
    })
], DomainMeetingRoomInfoModule);
//# sourceMappingURL=meeting-room-info.module.js.map