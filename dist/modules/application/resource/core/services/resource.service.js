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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceService = void 0;
const common_1 = require("@nestjs/common");
const resource_1 = require("@src/application/resource/core/usecases/resource");
let ResourceService = class ResourceService {
    constructor(findResourcesUsecase, findResourceDetailUsecase, reorderResourcesUsecase, updateResourceUsecase, deleteResourceUsecase, findAvailableTimeUsecase, findResourcesByTypeAndDateWithReservationsUsecase, checkAvailabilityUsecase, createResourceWithInfosUsecase) {
        this.findResourcesUsecase = findResourcesUsecase;
        this.findResourceDetailUsecase = findResourceDetailUsecase;
        this.reorderResourcesUsecase = reorderResourcesUsecase;
        this.updateResourceUsecase = updateResourceUsecase;
        this.deleteResourceUsecase = deleteResourceUsecase;
        this.findAvailableTimeUsecase = findAvailableTimeUsecase;
        this.findResourcesByTypeAndDateWithReservationsUsecase = findResourcesByTypeAndDateWithReservationsUsecase;
        this.checkAvailabilityUsecase = checkAvailabilityUsecase;
        this.createResourceWithInfosUsecase = createResourceWithInfosUsecase;
    }
    async createResourceWithInfos(createResourceInfo) {
        return this.createResourceWithInfosUsecase.execute(createResourceInfo);
    }
    async findResources(type) {
        return this.findResourcesUsecase.execute(type);
    }
    async findResourceDetailForAdmin(resourceId) {
        return this.findResourceDetailUsecase.executeForAdmin(resourceId);
    }
    async reorderResources(updateResourceOrdersDto) {
        return this.reorderResourcesUsecase.execute(updateResourceOrdersDto);
    }
    async updateResource(resourceId, updateResourceInfoDto) {
        return this.updateResourceUsecase.execute(resourceId, updateResourceInfoDto);
    }
    async deleteResource(resourceId) {
        return this.deleteResourceUsecase.execute(resourceId);
    }
    async findResourcesByTypeAndDateWithReservations(user, type, startDate, endDate, isMine) {
        return this.findResourcesByTypeAndDateWithReservationsUsecase.execute(user, type, startDate, endDate, isMine);
    }
    async findAvailableTime(query) {
        return this.findAvailableTimeUsecase.execute(query);
    }
    async checkAvailability(resourceId, startDate, endDate, reservationId) {
        return this.checkAvailabilityUsecase.execute(resourceId, startDate, endDate, reservationId);
    }
    async findResourceDetailForUser(employeeId, resourceId) {
        return this.findResourceDetailUsecase.executeForUser(employeeId, resourceId);
    }
};
exports.ResourceService = ResourceService;
exports.ResourceService = ResourceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_1.FindResourcesUsecase !== "undefined" && resource_1.FindResourcesUsecase) === "function" ? _a : Object, typeof (_b = typeof resource_1.FindResourceDetailUsecase !== "undefined" && resource_1.FindResourceDetailUsecase) === "function" ? _b : Object, typeof (_c = typeof resource_1.ReorderResourcesUsecase !== "undefined" && resource_1.ReorderResourcesUsecase) === "function" ? _c : Object, typeof (_d = typeof resource_1.UpdateResourceUsecase !== "undefined" && resource_1.UpdateResourceUsecase) === "function" ? _d : Object, typeof (_e = typeof resource_1.DeleteResourceUsecase !== "undefined" && resource_1.DeleteResourceUsecase) === "function" ? _e : Object, typeof (_f = typeof resource_1.FindAvailableTimeUsecase !== "undefined" && resource_1.FindAvailableTimeUsecase) === "function" ? _f : Object, typeof (_g = typeof resource_1.FindResourcesByTypeAndDateWithReservationsUsecase !== "undefined" && resource_1.FindResourcesByTypeAndDateWithReservationsUsecase) === "function" ? _g : Object, typeof (_h = typeof resource_1.CheckAvailabilityUsecase !== "undefined" && resource_1.CheckAvailabilityUsecase) === "function" ? _h : Object, typeof (_j = typeof resource_1.CreateResourceWithInfosUsecase !== "undefined" && resource_1.CreateResourceWithInfosUsecase) === "function" ? _j : Object])
], ResourceService);
//# sourceMappingURL=resource.service.js.map