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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTaskListUsecase = void 0;
const common_1 = require("@nestjs/common");
const date_util_1 = require("@libs/utils/date.util");
const typeorm_1 = require("typeorm");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
const resource_service_1 = require("@src/domain/resource/resource.service");
let GetTaskListUsecase = class GetTaskListUsecase {
    constructor(resourceService, reservationService) {
        this.resourceService = resourceService;
        this.reservationService = reservationService;
    }
    async execute(user) {
        const delayedReturnReservations = await this.reservationService.findAll({
            where: {
                participants: {
                    employeeId: user.employeeId,
                    type: reservation_type_enum_1.ParticipantsType.RESERVER,
                },
                status: reservation_type_enum_1.ReservationStatus.CONFIRMED,
                endDate: (0, typeorm_1.LessThan)(date_util_1.DateUtil.now().toDate()),
                reservationVehicles: {
                    isReturned: false,
                },
            },
            relations: ['participants', 'resource', 'reservationVehicles'],
        });
        const isResourceAdmin = user.roles.includes(role_type_enum_1.Role.RESOURCE_ADMIN);
        const isSystemAdmin = user.roles.includes(role_type_enum_1.Role.SYSTEM_ADMIN);
        const needReplaceConsumable = [];
        if (isResourceAdmin || isSystemAdmin) {
            const resources = await this.resourceService.findAll({
                where: {
                    ...(isSystemAdmin ? {} : { resourceManagers: { employeeId: user.employeeId } }),
                },
                relations: [
                    'resourceManagers',
                    'vehicleInfo',
                    'vehicleInfo.consumables',
                    'vehicleInfo.consumables.maintenances',
                ],
            });
            for (const resource of resources) {
                for (const consumable of resource.vehicleInfo?.consumables || []) {
                    const latestMaintenance = consumable.maintenances[consumable.maintenances.length - 1] || null;
                    if (latestMaintenance) {
                        const maintanceRequired = resource.vehicleInfo.totalMileage - Number(latestMaintenance.mileage) >
                            consumable.replaceCycle;
                        if (maintanceRequired) {
                            needReplaceConsumable.push({
                                type: '소모품교체',
                                title: `${consumable.name} 교체 필요`,
                                reservationId: null,
                                resourceId: resource.resourceId,
                                resourceName: resource.name,
                                startDate: null,
                                endDate: null,
                            });
                        }
                    }
                }
            }
        }
        const items = [
            ...delayedReturnReservations.map((reservation) => {
                return {
                    type: '반납지연',
                    title: `${reservation.resource.name} 반납 지연 중`,
                    reservationId: reservation.reservationId,
                    resourceId: reservation.resource.resourceId,
                    resourceName: reservation.resource.name,
                    startDate: reservation.startDate,
                    endDate: reservation.endDate,
                };
            }),
            ...needReplaceConsumable,
        ];
        return {
            totalCount: items.length,
            items,
        };
    }
};
exports.GetTaskListUsecase = GetTaskListUsecase;
exports.GetTaskListUsecase = GetTaskListUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.DomainResourceService !== "undefined" && resource_service_1.DomainResourceService) === "function" ? _a : Object, typeof (_b = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _b : Object])
], GetTaskListUsecase);
//# sourceMappingURL=getTaskList.usecase.js.map