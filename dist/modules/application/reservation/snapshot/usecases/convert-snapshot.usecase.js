"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertSnapshotUsecase = void 0;
const common_1 = require("@nestjs/common");
let ConvertSnapshotUsecase = class ConvertSnapshotUsecase {
    execute(snapshot) {
        return {
            snapshotId: snapshot.snapshotId,
            employeeId: snapshot.employeeId,
            step: snapshot.step,
            resourceType: snapshot.resourceType,
            droppableGroupData: snapshot.droppableGroupData,
            dateRange: snapshot.dateRange,
            startTime: snapshot.startTime,
            endTime: snapshot.endTime,
            timeRange: snapshot.timeRange,
            timeUnit: snapshot.timeUnit,
            selectedResource: snapshot.selectedResource,
            title: snapshot.title,
            reminderTimes: snapshot.reminderTimes,
            isAllDay: snapshot.isAllDay,
            notifyBeforeStart: snapshot.notifyBeforeStart,
            notifyMinutesBeforeStart: snapshot.notifyMinutesBeforeStart,
            attendees: snapshot.attendees,
            createdAt: snapshot.createdAt,
            updatedAt: snapshot.updatedAt,
        };
    }
};
exports.ConvertSnapshotUsecase = ConvertSnapshotUsecase;
exports.ConvertSnapshotUsecase = ConvertSnapshotUsecase = __decorate([
    (0, common_1.Injectable)()
], ConvertSnapshotUsecase);
//# sourceMappingURL=convert-snapshot.usecase.js.map