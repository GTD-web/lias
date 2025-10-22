"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataContext = exports.MetadataContextModule = exports.ApprovalProcessContext = exports.ApprovalProcessModule = exports.DocumentContext = exports.DocumentModule = exports.ApprovalFlowModule = exports.ApprovalFlowContext = exports.MetadataSyncModule = exports.MetadataSyncContext = void 0;
var metadata_sync_context_1 = require("./metadata-sync/metadata-sync.context");
Object.defineProperty(exports, "MetadataSyncContext", { enumerable: true, get: function () { return metadata_sync_context_1.MetadataSyncContext; } });
var metadata_sync_module_1 = require("./metadata-sync/metadata-sync.module");
Object.defineProperty(exports, "MetadataSyncModule", { enumerable: true, get: function () { return metadata_sync_module_1.MetadataSyncModule; } });
var approval_flow_context_1 = require("./approval-flow/approval-flow.context");
Object.defineProperty(exports, "ApprovalFlowContext", { enumerable: true, get: function () { return approval_flow_context_1.ApprovalFlowContext; } });
var approval_flow_module_1 = require("./approval-flow/approval-flow.module");
Object.defineProperty(exports, "ApprovalFlowModule", { enumerable: true, get: function () { return approval_flow_module_1.ApprovalFlowModule; } });
__exportStar(require("./approval-flow/dtos/form-approval-line.dto"), exports);
__exportStar(require("./approval-flow/dtos/draft-context.dto"), exports);
var document_module_1 = require("./document/document.module");
Object.defineProperty(exports, "DocumentModule", { enumerable: true, get: function () { return document_module_1.DocumentModule; } });
var document_context_1 = require("./document/document.context");
Object.defineProperty(exports, "DocumentContext", { enumerable: true, get: function () { return document_context_1.DocumentContext; } });
__exportStar(require("./document/dtos/document.dto"), exports);
var approval_process_module_1 = require("./approval-process/approval-process.module");
Object.defineProperty(exports, "ApprovalProcessModule", { enumerable: true, get: function () { return approval_process_module_1.ApprovalProcessModule; } });
var approval_process_context_1 = require("./approval-process/approval-process.context");
Object.defineProperty(exports, "ApprovalProcessContext", { enumerable: true, get: function () { return approval_process_context_1.ApprovalProcessContext; } });
__exportStar(require("./approval-process/dtos/approval-action.dto"), exports);
var metadata_context_module_1 = require("./metadata/metadata-context.module");
Object.defineProperty(exports, "MetadataContextModule", { enumerable: true, get: function () { return metadata_context_module_1.MetadataContextModule; } });
var metadata_context_1 = require("./metadata/metadata.context");
Object.defineProperty(exports, "MetadataContext", { enumerable: true, get: function () { return metadata_context_1.MetadataContext; } });
//# sourceMappingURL=index.js.map