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
exports.TestDataBusinessModule = exports.ApprovalProcessBusinessModule = exports.DocumentBusinessModule = exports.ApprovalFlowBusinessModule = exports.MetadataModule = void 0;
var metadata_module_1 = require("./metadata/metadata.module");
Object.defineProperty(exports, "MetadataModule", { enumerable: true, get: function () { return metadata_module_1.MetadataModule; } });
__exportStar(require("./metadata/dtos"), exports);
__exportStar(require("./metadata/usecases"), exports);
__exportStar(require("./metadata/services/external-metadata.service"), exports);
var approval_flow_module_1 = require("./approval-flow/approval-flow.module");
Object.defineProperty(exports, "ApprovalFlowBusinessModule", { enumerable: true, get: function () { return approval_flow_module_1.ApprovalFlowBusinessModule; } });
__exportStar(require("./approval-flow/dtos"), exports);
__exportStar(require("./approval-flow/usecases"), exports);
var document_module_1 = require("./document/document.module");
Object.defineProperty(exports, "DocumentBusinessModule", { enumerable: true, get: function () { return document_module_1.DocumentBusinessModule; } });
__exportStar(require("./document/dtos"), exports);
__exportStar(require("./document/usecases"), exports);
var approval_process_module_1 = require("./approval-process/approval-process.module");
Object.defineProperty(exports, "ApprovalProcessBusinessModule", { enumerable: true, get: function () { return approval_process_module_1.ApprovalProcessBusinessModule; } });
__exportStar(require("./approval-process/dtos"), exports);
__exportStar(require("./approval-process/usecases"), exports);
var test_data_module_1 = require("./test-data/test-data.module");
Object.defineProperty(exports, "TestDataBusinessModule", { enumerable: true, get: function () { return test_data_module_1.TestDataBusinessModule; } });
__exportStar(require("./test-data/dtos"), exports);
__exportStar(require("./test-data/usecases"), exports);
//# sourceMappingURL=index.js.map