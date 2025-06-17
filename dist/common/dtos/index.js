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
exports.BaseResponseDto = exports.ErrorResponseDto = exports.PaginationMetaDto = exports.PaginationQueryDto = void 0;
var paginate_query_dto_1 = require("./paginate-query.dto");
Object.defineProperty(exports, "PaginationQueryDto", { enumerable: true, get: function () { return paginate_query_dto_1.PaginationQueryDto; } });
var paginate_response_dto_1 = require("./paginate-response.dto");
Object.defineProperty(exports, "PaginationMetaDto", { enumerable: true, get: function () { return paginate_response_dto_1.PaginationMetaDto; } });
var response_dto_1 = require("./response.dto");
Object.defineProperty(exports, "ErrorResponseDto", { enumerable: true, get: function () { return response_dto_1.ErrorResponseDto; } });
Object.defineProperty(exports, "BaseResponseDto", { enumerable: true, get: function () { return response_dto_1.BaseResponseDto; } });
__exportStar(require("../../modules/application/employee/dtos/index"), exports);
//# sourceMappingURL=index.js.map