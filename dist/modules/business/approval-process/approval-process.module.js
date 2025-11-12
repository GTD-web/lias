"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalProcessBusinessModule = void 0;
const common_1 = require("@nestjs/common");
const approval_process_controller_1 = require("./controllers/approval-process.controller");
const approval_process_service_1 = require("./services/approval-process.service");
const approval_notification_service_1 = require("./services/approval-notification.service");
const approval_process_module_1 = require("../../context/approval-process/approval-process.module");
const notification_module_1 = require("../../context/notification/notification.module");
const document_module_1 = require("../../context/document/document.module");
let ApprovalProcessBusinessModule = class ApprovalProcessBusinessModule {
};
exports.ApprovalProcessBusinessModule = ApprovalProcessBusinessModule;
exports.ApprovalProcessBusinessModule = ApprovalProcessBusinessModule = __decorate([
    (0, common_1.Module)({
        imports: [approval_process_module_1.ApprovalProcessModule, notification_module_1.NotificationContextModule, document_module_1.DocumentModule],
        controllers: [approval_process_controller_1.ApprovalProcessController],
        providers: [approval_process_service_1.ApprovalProcessService, approval_notification_service_1.ApprovalNotificationService],
    })
], ApprovalProcessBusinessModule);
//# sourceMappingURL=approval-process.module.js.map