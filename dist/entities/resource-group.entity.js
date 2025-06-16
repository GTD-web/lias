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
exports.ResourceGroup = void 0;
const typeorm_1 = require("typeorm");
const resource_entity_1 = require("./resource.entity");
const resource_type_enum_1 = require("../enums/resource-type.enum");
let ResourceGroup = class ResourceGroup {
};
exports.ResourceGroup = ResourceGroup;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], ResourceGroup.prototype, "resourceGroupId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ResourceGroup.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ResourceGroup.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ResourceGroup.prototype, "parentResourceGroupId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: resource_type_enum_1.ResourceType,
    }),
    __metadata("design:type", typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object)
], ResourceGroup.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ResourceGroup.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resource_entity_1.Resource, (resource) => resource.resourceGroup),
    __metadata("design:type", Array)
], ResourceGroup.prototype, "resources", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ResourceGroup, (resourceGroup) => resourceGroup.children),
    (0, typeorm_1.JoinColumn)({ name: 'parentResourceGroupId' }),
    __metadata("design:type", ResourceGroup)
], ResourceGroup.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ResourceGroup, (resourceGroup) => resourceGroup.parent),
    __metadata("design:type", Array)
], ResourceGroup.prototype, "children", void 0);
exports.ResourceGroup = ResourceGroup = __decorate([
    (0, typeorm_1.Entity)('resource_groups')
], ResourceGroup);
//# sourceMappingURL=resource-group.entity.js.map