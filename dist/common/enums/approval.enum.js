"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentStatus = exports.AssigneeRule = exports.ApprovalLineTemplateStatus = exports.FormStatus = exports.DocumentListType = exports.AutoFillType = exports.ApprovalLineType = exports.ApprovalStatus = exports.ApprovalStepType = exports.DepartmentScopeType = exports.ApproverType = void 0;
var ApproverType;
(function (ApproverType) {
    ApproverType["USER"] = "USER";
    ApproverType["POSITION"] = "POSITION";
})(ApproverType || (exports.ApproverType = ApproverType = {}));
var DepartmentScopeType;
(function (DepartmentScopeType) {
    DepartmentScopeType["ALL"] = "ALL";
    DepartmentScopeType["SPECIFIC_DEPARTMENT"] = "SPECIFIC_DEPARTMENT";
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
    AutoFillType["APPROVAL_LINE"] = "APPROVAL_LINE";
})(AutoFillType || (exports.AutoFillType = AutoFillType = {}));
var DocumentListType;
(function (DocumentListType) {
    DocumentListType["DRAFTED"] = "drafted";
    DocumentListType["PENDING_APPROVAL"] = "pending_approval";
    DocumentListType["PENDING_AGREEMENT"] = "pending_agreement";
    DocumentListType["APPROVED"] = "approved";
    DocumentListType["REJECTED"] = "rejected";
    DocumentListType["RECEIVED_REFERENCE"] = "received_reference";
    DocumentListType["IMPLEMENTATION"] = "implementation";
    DocumentListType["ASSIGNED"] = "assigned";
})(DocumentListType || (exports.DocumentListType = DocumentListType = {}));
var FormStatus;
(function (FormStatus) {
    FormStatus["DRAFT"] = "DRAFT";
    FormStatus["ACTIVE"] = "ACTIVE";
    FormStatus["ARCHIVED"] = "ARCHIVED";
})(FormStatus || (exports.FormStatus = FormStatus = {}));
var ApprovalLineTemplateStatus;
(function (ApprovalLineTemplateStatus) {
    ApprovalLineTemplateStatus["DRAFT"] = "DRAFT";
    ApprovalLineTemplateStatus["ACTIVE"] = "ACTIVE";
    ApprovalLineTemplateStatus["ARCHIVED"] = "ARCHIVED";
})(ApprovalLineTemplateStatus || (exports.ApprovalLineTemplateStatus = ApprovalLineTemplateStatus = {}));
var AssigneeRule;
(function (AssigneeRule) {
    AssigneeRule["FIXED"] = "FIXED";
    AssigneeRule["DRAFTER"] = "DRAFTER";
    AssigneeRule["DRAFTER_SUPERIOR"] = "DRAFTER_SUPERIOR";
    AssigneeRule["DEPARTMENT_HEAD"] = "DEPARTMENT_HEAD";
    AssigneeRule["POSITION_BASED"] = "POSITION_BASED";
})(AssigneeRule || (exports.AssigneeRule = AssigneeRule = {}));
var DocumentStatus;
(function (DocumentStatus) {
    DocumentStatus["DRAFT"] = "DRAFT";
    DocumentStatus["PENDING"] = "PENDING";
    DocumentStatus["APPROVED"] = "APPROVED";
    DocumentStatus["REJECTED"] = "REJECTED";
    DocumentStatus["CANCELLED"] = "CANCELLED";
    DocumentStatus["IMPLEMENTED"] = "IMPLEMENTED";
})(DocumentStatus || (exports.DocumentStatus = DocumentStatus = {}));
//# sourceMappingURL=approval.enum.js.map