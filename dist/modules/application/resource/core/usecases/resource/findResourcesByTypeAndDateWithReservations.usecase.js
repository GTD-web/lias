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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindResourcesByTypeAndDateWithReservationsUsecase = void 0;
const common_1 = require("@nestjs/common");
const resource_service_1 = require("@src/domain/resource/resource.service");
const resource_group_service_1 = require("@src/domain/resource-group/resource-group.service");
const date_util_1 = require("@libs/utils/date.util");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const typeorm_1 = require("typeorm");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
let FindResourcesByTypeAndDateWithReservationsUsecase = class FindResourcesByTypeAndDateWithReservationsUsecase {
    constructor(resourceService, resourceGroupService, reservationService) {
        this.resourceService = resourceService;
        this.resourceGroupService = resourceGroupService;
        this.reservationService = reservationService;
    }
    async execute(user, type, startDate, endDate, isMine) {
        if (!!startDate && !!endDate && startDate > endDate) {
            throw new common_1.BadRequestException('Start date must be before end date');
        }
        const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        const startDateObj = regex.test(startDate)
            ? date_util_1.DateUtil.date(startDate).toDate()
            : date_util_1.DateUtil.date(startDate + ' 00:00:00').toDate();
        const endDateObj = regex.test(endDate)
            ? date_util_1.DateUtil.date(endDate).toDate()
            : date_util_1.DateUtil.date(endDate + ' 23:59:59').toDate();
        const resourceGroups = await this.resourceGroupService.findAll({
            where: {
                type: type,
                parentResourceGroupId: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()),
            },
            order: {
                order: 'ASC',
            },
        });
        const resourceGroupsWithResources = await Promise.all(resourceGroups.map(async (resourceGroup) => {
            const resources = await this.resourceService.findAll({
                where: {
                    resourceGroupId: resourceGroup.resourceGroupId,
                },
                order: {
                    order: 'ASC',
                },
            });
            const resourcesWithReservations = await Promise.all(resources.map(async (resource) => {
                const dateCondition = (0, typeorm_1.Raw)((alias) => `(${alias} BETWEEN :startDateObj AND :endDateObj OR
                              "Reservation"."endDate" BETWEEN :startDateObj AND :endDateObj OR
                              (${alias} <= :startDateObj AND "Reservation"."endDate" >= :endDateObj))`, { startDateObj, endDateObj });
                const where = {
                    startDate: dateCondition,
                    resourceId: resource.resourceId,
                    status: (0, typeorm_1.In)([
                        reservation_type_enum_1.ReservationStatus.PENDING,
                        reservation_type_enum_1.ReservationStatus.CONFIRMED,
                        reservation_type_enum_1.ReservationStatus.CLOSED,
                    ]),
                };
                const reservations = await this.reservationService.findAll({
                    where: where,
                    relations: ['participants', 'participants.employee'],
                    order: {
                        startDate: 'ASC',
                    },
                });
                const reservationResponseDtos = reservations
                    .map((reservation) => {
                    const isMine = reservation.participants.some((participant) => participant.type === reservation_type_enum_1.ParticipantsType.RESERVER &&
                        participant.employeeId === user.employeeId);
                    reservation.participants = reservation.participants.filter((participant) => participant.type === reservation_type_enum_1.ParticipantsType.RESERVER);
                    return {
                        ...reservation,
                        startDate: date_util_1.DateUtil.date(reservation.startDate).format(),
                        endDate: date_util_1.DateUtil.date(reservation.endDate).format(),
                        isMine: isMine,
                    };
                })
                    .filter((reservation) => {
                    if (isMine) {
                        return reservation.participants.some((participant) => participant.employeeId === user.employeeId);
                    }
                    return true;
                });
                return {
                    ...resource,
                    resourceId: resource.resourceId,
                    reservations: reservationResponseDtos,
                };
            }));
            return {
                ...resourceGroup,
                resources: resourcesWithReservations,
            };
        }));
        return resourceGroupsWithResources;
    }
};
exports.FindResourcesByTypeAndDateWithReservationsUsecase = FindResourcesByTypeAndDateWithReservationsUsecase;
exports.FindResourcesByTypeAndDateWithReservationsUsecase = FindResourcesByTypeAndDateWithReservationsUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.DomainResourceService !== "undefined" && resource_service_1.DomainResourceService) === "function" ? _a : Object, typeof (_b = typeof resource_group_service_1.DomainResourceGroupService !== "undefined" && resource_group_service_1.DomainResourceGroupService) === "function" ? _b : Object, typeof (_c = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _c : Object])
], FindResourcesByTypeAndDateWithReservationsUsecase);
//# sourceMappingURL=findResourcesByTypeAndDateWithReservations.usecase.js.map