"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoFillType = exports.ApprovalLineType = exports.ApprovalStatus = exports.ApprovalStepType = exports.DepartmentScopeType = exports.ApproverType = void 0;
var ApproverType;
(function (ApproverType) {
    ApproverType["USER"] = "USER";
    ApproverType["POSITION"] = "POSITION";
})(ApproverType || (exports.ApproverType = ApproverType = {}));
var DepartmentScopeType;
(function (DepartmentScopeType) {
    DepartmentScopeType["SELECTED"] = "SELECTED";
    DepartmentScopeType["DRAFT_OWNER"] = "DRAFT_OWNER";
})(DepartmentScopeType || (exports.DepartmentScopeType = DepartmentScopeType = {}));
var ApprovalStepType;
(function (ApprovalStepType) {
    ApprovalStepType["AGREEMENT"] = "AGREEMENT";
    ApprovalStepType["APPROVAL"] = "APPROVAL";
    ApprovalStepType["IMPLEMENTATION"] = "IMPLEMENTATION";
    ApprovalStepType["REFERENCE"] = "REFERENCE";
})(ApprovalStepType || (exports.ApprovalStepType = ApprovalStepType = {}));
var ApprovalStatus;
(function (ApprovalStatus) {
    ApprovalStatus["PENDING"] = "PENDING";
    ApprovalStatus["APPROVED"] = "APPROVED";
    ApprovalStatus["REJECTED"] = "REJECTED";
    ApprovalStatus["CANCELLED"] = "CANCELLED";
})(ApprovalStatus || (exports.ApprovalStatus = ApprovalStatus = {}));
var ApprovalLineType;
(function (ApprovalLineType) {
    ApprovalLineType["COMMON"] = "COMMON";
    ApprovalLineType["CUSTOM"] = "CUSTOM";
})(ApprovalLineType || (exports.ApprovalLineType = ApprovalLineType = {}));
var AutoFillType;
(function (AutoFillType) {
    AutoFillType["NONE"] = "NONE";
    AutoFillType["DRAFTER_ONLY"] = "DRAFTER_ONLY";
    AutoFillType["DRAFTER_SUPERIOR"] = "DRAFTER_SUPERIOR";
})(AutoFillType || (exports.AutoFillType = AutoFillType = {}));
//# sourceMappingURL=approval.enum.js.map