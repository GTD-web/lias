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
exports.ResourceManager = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const resource_entity_1 = require("./resource.entity");
let ResourceManager = class ResourceManager {
};
exports.ResourceManager = ResourceManager;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], ResourceManager.prototype, "resourceManagerId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ResourceManager.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ResourceManager.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", typeof (_a = typeof employee_entity_1.Employee !== "undefined" && employee_entity_1.Employee) === "function" ? _a : Object)
], ResourceManager.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resource_entity_1.Resource),
    (0, typeorm_1.JoinColumn)({ name: 'resourceId' }),
    __metadata("design:type", resource_entity_1.Resource)
], ResourceManager.prototype, "resource", void 0);
exports.ResourceManager = ResourceManager = __decorate([
    (0, typeorm_1.Entity)('resource_managers')
], ResourceManager);
//# sourceMappingURL=resource-manager.entity.js.map