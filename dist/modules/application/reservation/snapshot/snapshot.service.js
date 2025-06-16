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
exports.SnapshotService = void 0;
const common_1 = require("@nestjs/common");
const update_snapshot_usecase_1 = require("./usecases/update-snapshot.usecase");
const find_snapshot_usecase_1 = require("./usecases/find-snapshot.usecase");
const delete_snapshot_usecase_1 = require("./usecases/delete-snapshot.usecase");
const upsert_snapshot_usecase_1 = require("./usecases/upsert-snapshot.usecase");
let SnapshotService = class SnapshotService {
    constructor(updateSnapshotUsecase, findSnapshotUsecase, deleteSnapshotUsecase, upsertSnapshotUsecase) {
        this.updateSnapshotUsecase = updateSnapshotUsecase;
        this.findSnapshotUsecase = findSnapshotUsecase;
        this.deleteSnapshotUsecase = deleteSnapshotUsecase;
        this.upsertSnapshotUsecase = upsertSnapshotUsecase;
    }
    async createSnapshot(user, createSnapshotDto) {
        return this.upsertSnapshotUsecase.execute(user, createSnapshotDto);
    }
    async updateSnapshot(user, updateSnapshotDto) {
        return this.updateSnapshotUsecase.execute(updateSnapshotDto);
    }
    async findUserSnapshot(user) {
        return this.findSnapshotUsecase.execute(user.employeeId);
    }
    async deleteSnapshot(user, snapshotId) {
        await this.deleteSnapshotUsecase.execute(snapshotId);
    }
};
exports.SnapshotService = SnapshotService;
exports.SnapshotService = SnapshotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [update_snapshot_usecase_1.UpdateSnapshotUsecase,
        find_snapshot_usecase_1.FindSnapshotUsecase,
        delete_snapshot_usecase_1.DeleteSnapshotUsecase,
        upsert_snapshot_usecase_1.UpsertSnapshotUsecase])
], SnapshotService);
//# sourceMappingURL=snapshot.service.js.map