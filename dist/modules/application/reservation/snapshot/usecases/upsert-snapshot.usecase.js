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
exports.UpsertSnapshotUsecase = void 0;
const common_1 = require("@nestjs/common");
const find_snapshot_usecase_1 = require("./find-snapshot.usecase");
const create_snapshot_usecase_1 = require("./create-snapshot.usecase");
const update_snapshot_usecase_1 = require("./update-snapshot.usecase");
let UpsertSnapshotUsecase = class UpsertSnapshotUsecase {
    constructor(findSnapshotUsecase, createSnapshotUsecase, updateSnapshotUsecase) {
        this.findSnapshotUsecase = findSnapshotUsecase;
        this.createSnapshotUsecase = createSnapshotUsecase;
        this.updateSnapshotUsecase = updateSnapshotUsecase;
    }
    async execute(user, dto) {
        const snapshot = await this.findSnapshotUsecase.execute(user.employeeId);
        if (snapshot) {
            return await this.updateSnapshotUsecase.execute({ ...dto, snapshotId: snapshot.snapshotId });
        }
        else {
            return await this.createSnapshotUsecase.execute(user, dto);
        }
    }
};
exports.UpsertSnapshotUsecase = UpsertSnapshotUsecase;
exports.UpsertSnapshotUsecase = UpsertSnapshotUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [find_snapshot_usecase_1.FindSnapshotUsecase,
        create_snapshot_usecase_1.CreateSnapshotUsecase,
        update_snapshot_usecase_1.UpdateSnapshotUsecase])
], UpsertSnapshotUsecase);
//# sourceMappingURL=upsert-snapshot.usecase.js.map