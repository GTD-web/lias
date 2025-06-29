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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteReservationClosingJobUsecase = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
let DeleteReservationClosingJobUsecase = class DeleteReservationClosingJobUsecase {
    constructor(schedulerRegistry) {
        this.schedulerRegistry = schedulerRegistry;
    }
    execute(reservationId) {
        const jobName = `closing-${reservationId}`;
        try {
            if (this.schedulerRegistry.doesExist('cron', jobName)) {
                this.schedulerRegistry.deleteCronJob(jobName);
                console.log(`Job ${jobName} deleted successfully`);
            }
        }
        catch (error) {
            console.log(`Failed to delete job ${jobName}: ${error.message}`);
        }
    }
};
exports.DeleteReservationClosingJobUsecase = DeleteReservationClosingJobUsecase;
exports.DeleteReservationClosingJobUsecase = DeleteReservationClosingJobUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof schedule_1.SchedulerRegistry !== "undefined" && schedule_1.SchedulerRegistry) === "function" ? _a : Object])
], DeleteReservationClosingJobUsecase);
//# sourceMappingURL=delete-reservation-closing-job.usecase.js.map