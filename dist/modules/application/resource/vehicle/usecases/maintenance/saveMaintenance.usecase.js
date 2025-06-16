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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveMaintenanceUsecase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const error_message_1 = require("@libs/constants/error-message");
const notification_type_enum_1 = require("@libs/enums/notification-type.enum");
const maintenance_service_1 = require("@src/domain/maintenance/maintenance.service");
const consumable_service_1 = require("@src/domain/consumable/consumable.service");
const vehicle_info_service_1 = require("@src/domain/vehicle-info/vehicle-info.service");
const employee_service_1 = require("@src/domain/employee/employee.service");
const notification_service_1 = require("@src/application/notification/services/notification.service");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const file_service_1 = require("@src/domain/file/file.service");
let SaveMaintenanceUsecase = class SaveMaintenanceUsecase {
    constructor(maintenanceService, consumableService, vehicleInfoService, employeeService, notificationService, dataSource, fileService) {
        this.maintenanceService = maintenanceService;
        this.consumableService = consumableService;
        this.vehicleInfoService = vehicleInfoService;
        this.employeeService = employeeService;
        this.notificationService = notificationService;
        this.dataSource = dataSource;
        this.fileService = fileService;
    }
    async execute(user, createMaintenanceDto) {
        const existingMaintenance = await this.maintenanceService.findOne({
            where: {
                consumableId: createMaintenanceDto.consumableId,
                date: (0, typeorm_1.MoreThanOrEqual)(createMaintenanceDto.date),
            },
        });
        if (existingMaintenance) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.MAINTENANCE.INVALID_DATE);
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (!createMaintenanceDto.images)
                createMaintenanceDto.images = [];
            createMaintenanceDto.images = createMaintenanceDto.images.map((image) => this.fileService.getFileUrl(image));
            const maintenance = await this.maintenanceService.save(createMaintenanceDto, { queryRunner });
            await this.fileService.updateTemporaryFiles(createMaintenanceDto.images, false, { queryRunner });
            if (createMaintenanceDto.mileage) {
                const consumable = await this.consumableService.findOne({
                    where: { consumableId: maintenance.consumableId },
                    relations: ['vehicleInfo'],
                });
                if (consumable.vehicleInfo.totalMileage < createMaintenanceDto.mileage) {
                    await this.vehicleInfoService.update(consumable.vehicleInfo.vehicleInfoId, {
                        totalMileage: createMaintenanceDto.mileage,
                    }, { queryRunner });
                }
            }
            await queryRunner.commitTransaction();
            const systemAdmins = await this.employeeService.findAll({
                where: {
                    roles: (0, typeorm_1.Raw)(() => `'${role_type_enum_1.Role.SYSTEM_ADMIN}' = ANY("roles")`),
                },
            });
            const consumable = await this.consumableService.findOne({
                where: { consumableId: maintenance.consumableId },
                relations: ['vehicleInfo', 'vehicleInfo.resource'],
                withDeleted: true,
            });
            await this.notificationService.createNotification(notification_type_enum_1.NotificationType.RESOURCE_MAINTENANCE_COMPLETED, {
                resourceId: consumable.vehicleInfo.resource.resourceId,
                resourceType: consumable.vehicleInfo.resource.type,
                consumableName: consumable.name,
                resourceName: consumable.vehicleInfo.resource.name,
            }, systemAdmins.map((admin) => admin.employeeId));
            return maintenance;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.SaveMaintenanceUsecase = SaveMaintenanceUsecase;
exports.SaveMaintenanceUsecase = SaveMaintenanceUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof maintenance_service_1.DomainMaintenanceService !== "undefined" && maintenance_service_1.DomainMaintenanceService) === "function" ? _a : Object, typeof (_b = typeof consumable_service_1.DomainConsumableService !== "undefined" && consumable_service_1.DomainConsumableService) === "function" ? _b : Object, typeof (_c = typeof vehicle_info_service_1.DomainVehicleInfoService !== "undefined" && vehicle_info_service_1.DomainVehicleInfoService) === "function" ? _c : Object, typeof (_d = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _d : Object, typeof (_e = typeof notification_service_1.NotificationService !== "undefined" && notification_service_1.NotificationService) === "function" ? _e : Object, typeorm_1.DataSource, typeof (_f = typeof file_service_1.DomainFileService !== "undefined" && file_service_1.DomainFileService) === "function" ? _f : Object])
], SaveMaintenanceUsecase);
//# sourceMappingURL=saveMaintenance.usecase.js.map