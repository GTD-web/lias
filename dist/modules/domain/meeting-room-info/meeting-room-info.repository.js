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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainMeetingRoomInfoRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const meeting_room_info_entity_1 = require("@libs/entities/meeting-room-info.entity");
const base_repository_1 = require("@libs/repositories/base.repository");
let DomainMeetingRoomInfoRepository = class DomainMeetingRoomInfoRepository extends base_repository_1.BaseRepository {
    constructor(repository) {
        super(repository);
    }
};
exports.DomainMeetingRoomInfoRepository = DomainMeetingRoomInfoRepository;
exports.DomainMeetingRoomInfoRepository = DomainMeetingRoomInfoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(meeting_room_info_entity_1.MeetingRoomInfo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DomainMeetingRoomInfoRepository);
//# sourceMappingURL=meeting-room-info.repository.js.map