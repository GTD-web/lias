"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateBusinessModule = void 0;
const common_1 = require("@nestjs/common");
const template_controller_1 = require("./controllers/template.controller");
const category_controller_1 = require("./controllers/category.controller");
const template_service_1 = require("./services/template.service");
const template_module_1 = require("../../context/template/template.module");
let TemplateBusinessModule = class TemplateBusinessModule {
};
exports.TemplateBusinessModule = TemplateBusinessModule;
exports.TemplateBusinessModule = TemplateBusinessModule = __decorate([
    (0, common_1.Module)({
        imports: [template_module_1.TemplateModule],
        controllers: [template_controller_1.TemplateController, category_controller_1.CategoryController],
        providers: [template_service_1.TemplateService],
    })
], TemplateBusinessModule);
//# sourceMappingURL=template.module.js.map