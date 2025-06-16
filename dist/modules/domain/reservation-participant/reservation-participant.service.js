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
exports.DomainReservationParticipantService = void 0;
const common_1 = require("@nestjs/common");
const reservation_participant_repository_1 = require("./reservation-participant.repository");
const base_service_1 = require("@libs/services/base.service");
let DomainReservationParticipantService = class DomainReservationParticipantService extends base_service_1.BaseService {
    constructor(reservationParticipantRepository) {
        super(reservationParticipantRepository);
        this.reservationParticipantRepository = reservationParticipantRepository;
    }
    async findByParticipantId(participantId) {
        const participant = await this.reservationParticipantRepository.findOne({
            where: { participantId },
            relations: ['reservation', 'employee'],
        });
        if (!participant) {
            throw new common_1.NotFoundException('참가자를 찾을 수 없습니다.');
        }
        return participant;
    }
    async findByReservationId(reservationId) {
        return this.reservationParticipantRepository.findAll({
            where: { reservationId },
            relations: ['reservation', 'employee'],
        });
    }
    async findByEmployeeId(employeeId) {
        return this.reservationParticipantRepository.findAll({
            where: { employeeId },
            relations: ['reservation', 'employee'],
        });
    }
    async findByType(type) {
        return this.reservationParticipantRepository.findAll({
            where: { type },
            relations: ['reservation', 'employee'],
        });
    }
};
exports.DomainReservationParticipantService = DomainReservationParticipantService;
exports.DomainReservationParticipantService = DomainReservationParticipantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reservation_participant_repository_1.DomainReservationParticipantRepository])
], DomainReservationParticipantService);
//# sourceMappingURL=reservation-participant.service.js.map