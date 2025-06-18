"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalLineType = exports.ApprovalStatus = exports.ApprovalStepType = exports.DepartmentScopeType = exports.ApproverType = void 0;
var ApproverType;
(function (ApproverType) {
    ApproverType["USER"] = "USER";
    ApproverType["DEPARTMENT_POSITION"] = "DEPARTMENT_POSITION";
    ApproverType["POSITION"] = "POSITION";
    ApproverType["TITLE"] = "TITLE";
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
    ApprovalStepType["EXECUTION"] = "EXECUTION";
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
//# sourceMappingURL=approval.enum.js.map