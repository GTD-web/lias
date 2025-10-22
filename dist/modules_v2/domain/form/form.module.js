"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainFormModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const form_service_1 = require("./form.service");
const form_repository_1 = require("./form.repository");
const form_version_service_1 = require("./form-version.service");
const form_version_repository_1 = require("./form-version.repository");
const form_entity_1 = require("./form.entity");
const form_version_entity_1 = require("./form-version.entity");
let DomainFormModule = class DomainFormModule {
};
exports.DomainFormModule = DomainFormModule;
exports.DomainFormModule = DomainFormModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([form_entity_1.Form, form_version_entity_1.FormVersion])],
        providers: [form_service_1.DomainFormService, form_repository_1.DomainFormRepository, form_version_service_1.DomainFormVersionService, form_version_repository_1.DomainFormVersionRepository],
        exports: [form_service_1.DomainFormService, form_version_service_1.DomainFormVersionService],
    })
], DomainFormModule);
//# sourceMappingURL=form.module.js.map