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
var DocumentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
const common_1 = require("@nestjs/common");
const document_context_1 = require("../../../context/document/document.context");
const document_query_service_1 = require("../../../context/document/document-query.service");
const template_context_1 = require("../../../context/template/template.context");
const approval_process_context_1 = require("../../../context/approval-process/approval-process.context");
const notification_context_1 = require("../../../context/notification/notification.context");
const comment_context_1 = require("../../../context/comment/comment.context");
const transaction_util_1 = require("../../../../common/utils/transaction.util");
const typeorm_1 = require("typeorm");
const approver_mapping_service_1 = require("../../../context/template/approver-mapping.service");
const document_policy_validator_1 = require("../../../../common/utils/document-policy.validator");
let DocumentService = DocumentService_1 = class DocumentService {
    constructor(dataSource, documentContext, documentQueryService, templateContext, approverMappingService, approvalProcessContext, notificationContext, commentContext) {
        this.dataSource = dataSource;
        this.documentContext = documentContext;
        this.documentQueryService = documentQueryService;
        this.templateContext = templateContext;
        this.approverMappingService = approverMappingService;
        this.approvalProcessContext = approvalProcessContext;
        this.notificationContext = notificationContext;
        this.commentContext = commentContext;
        this.logger = new common_1.Logger(DocumentService_1.name);
    }
    async createDocument(dto, drafterId) {
        this.logger.log(`문서 생성 시작: ${dto.title}`);
        const contextDto = {
            documentTemplateId: dto.documentTemplateId,
            title: dto.title,
            content: dto.content,
            drafterId: drafterId,
            metadata: dto.metadata,
            approvalSteps: dto.approvalSteps?.map((step) => ({
                stepOrder: step.stepOrder,
                stepType: step.stepType,
                approverId: step.approverId,
            })),
        };
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const document = await this.documentContext.createDocument(contextDto, queryRunner);
            if (dto.approvalSteps && dto.approvalSteps.length > 0) {
                await this.documentContext.createApprovalStepSnapshots(document.id, dto.approvalSteps, queryRunner);
            }
            return document;
        });
    }
    async updateDocument(documentId, dto) {
        this.logger.log(`문서 수정 시작: ${documentId}`);
        const document = await this.documentQueryService.getDocument(documentId);
        document_policy_validator_1.DocumentPolicyValidator.validateDrafterActionOrThrow(document.status, document_policy_validator_1.DrafterAction.UPDATE_CONTENT);
        if (dto.approvalSteps !== undefined) {
            document_policy_validator_1.DocumentPolicyValidator.validateDrafterActionOrThrow(document.status, document_policy_validator_1.DrafterAction.UPDATE_APPROVAL_LINE);
        }
        const fullContextDto = {
            title: dto.title,
            content: dto.content,
            comment: dto.comment,
            approvalSteps: dto.approvalSteps?.map((step) => ({
                id: step.id,
                stepOrder: step.stepOrder,
                stepType: step.stepType,
                approverId: step.approverId,
            })),
        };
        return await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            return await this.documentContext.updateDocument(documentId, fullContextDto, queryRunner);
        });
    }
    async deleteDocument(documentId) {
        this.logger.log(`문서 삭제 시작: ${documentId}`);
        const document = await this.documentQueryService.getDocument(documentId);
        document_policy_validator_1.DocumentPolicyValidator.validateDrafterActionOrThrow(document.status, document_policy_validator_1.DrafterAction.DELETE);
        return await this.documentContext.deleteDocument(documentId);
    }
    async getDocument(documentId) {
        this.logger.debug(`문서 조회: ${documentId}`);
        return await this.documentQueryService.getDocument(documentId);
    }
    async getDocuments(filter) {
        this.logger.debug('문서 목록 조회', filter);
        return await this.documentQueryService.getDocuments(filter);
    }
    async submitDocument(dto) {
        this.logger.log(`문서 기안 시작: ${dto.documentId}`);
        const document = await this.documentQueryService.getDocument(dto.documentId);
        document_policy_validator_1.DocumentPolicyValidator.validateDrafterActionOrThrow(document.status, document_policy_validator_1.DrafterAction.SUBMIT);
        const contextDto = {
            documentId: dto.documentId,
            documentTemplateId: dto.documentTemplateId,
            approvalSteps: dto.approvalSteps?.map((step) => ({
                stepOrder: step.stepOrder,
                stepType: step.stepType,
                approverId: step.approverId,
            })),
        };
        const submittedDocument = await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            return await this.documentContext.submitDocument(contextDto, queryRunner);
        });
        await this.approvalProcessContext.autoApproveIfDrafterIsFirstApprover(submittedDocument.id, submittedDocument.drafterId);
        this.sendSubmitNotification(submittedDocument.id, submittedDocument.drafterId).catch((error) => {
            this.logger.error('문서 기안 알림 전송 실패', error);
        });
        this.logger.log(`문서 기안 및 자동 승인 처리 완료: ${submittedDocument.id}`);
        return submittedDocument;
    }
    async submitDocumentDirect(dto, drafterId) {
        this.logger.log(`바로 기안 시작: ${dto.title}`);
        const createDto = {
            drafterId: drafterId,
            documentTemplateId: dto.documentTemplateId,
            title: dto.title,
            content: dto.content,
            metadata: dto.metadata,
            approvalSteps: dto.approvalSteps,
        };
        const submittedDocument = await (0, transaction_util_1.withTransaction)(this.dataSource, async (queryRunner) => {
            const draftDocument = await this.documentContext.createDocument(createDto, queryRunner);
            this.logger.debug(`임시저장 완료: ${draftDocument.id}`);
            const submitDto = {
                documentId: draftDocument.id,
                documentTemplateId: dto.documentTemplateId,
                approvalSteps: dto.approvalSteps,
            };
            return await this.documentContext.submitDocument(submitDto, queryRunner);
        });
        await this.approvalProcessContext.autoApproveIfDrafterIsFirstApprover(submittedDocument.id, submittedDocument.drafterId);
        this.sendSubmitNotification(submittedDocument.id, submittedDocument.drafterId).catch((error) => {
            this.logger.error('바로 기안 알림 전송 실패', error);
        });
        this.logger.log(`바로 기안 및 자동 승인 처리 완료: ${submittedDocument.id}`);
        return submittedDocument;
    }
    async sendSubmitNotification(documentId, drafterId) {
        try {
            const document = await this.documentQueryService.getDocument(documentId);
            const allSteps = await this.approvalProcessContext.getApprovalStepsByDocumentId(documentId);
            const drafter = document.drafter;
            if (!drafter || !drafter.employeeNumber) {
                this.logger.warn(`기안자 정보를 찾을 수 없습니다: ${drafterId}`);
                return;
            }
            await this.notificationContext.sendNotificationAfterSubmit({
                document,
                allSteps,
                drafterEmployeeNumber: drafter.employeeNumber,
            });
        }
        catch (error) {
            this.logger.error(`문서 기안 알림 전송 중 오류 발생: ${documentId}`, error);
            throw error;
        }
    }
    async getTemplateForNewDocument(templateId, drafterId) {
        this.logger.debug(`템플릿 상세 조회 (결재자 맵핑): ${templateId}, 기안자: ${drafterId}`);
        return await this.approverMappingService.getDocumentTemplateWithMappedApprovers(templateId, drafterId);
    }
    async getDocumentStatistics(userId) {
        this.logger.debug(`문서 통계 조회: 사용자 ${userId}`);
        return await this.documentQueryService.getDocumentStatistics(userId);
    }
    async getMyAllDocumentsStatistics(userId) {
        this.logger.debug(`내 전체 문서 통계 조회: 사용자 ${userId}`);
        return await this.documentQueryService.getMyAllDocumentsStatistics(userId);
    }
    async getMyAllDocuments(params) {
        this.logger.debug('내 전체 문서 목록 조회', params);
        return await this.documentQueryService.getMyAllDocuments(params);
    }
    async getMyDrafts(drafterId, page, limit) {
        this.logger.debug(`내가 작성한 문서 전체 조회: 사용자 ${drafterId}, 페이지 ${page}, 제한 ${limit}`);
        return await this.documentQueryService.getMyDrafts(drafterId, page, limit);
    }
    async createComment(documentId, dto, authorId) {
        this.logger.log(`코멘트 작성: 문서 ${documentId}`);
        return await this.commentContext.코멘트를작성한다({
            documentId: documentId,
            authorId: authorId,
            content: dto.content,
            parentCommentId: dto.parentCommentId,
        });
    }
    async updateComment(commentId, dto, authorId) {
        this.logger.log(`코멘트 수정: ${commentId}`);
        return await this.commentContext.코멘트를수정한다({
            commentId: commentId,
            authorId: authorId,
            content: dto.content,
        });
    }
    async deleteComment(commentId, authorId) {
        this.logger.log(`코멘트 삭제: ${commentId}`);
        return await this.commentContext.코멘트를삭제한다(commentId, authorId);
    }
    async getDocumentComments(documentId) {
        this.logger.debug(`문서 코멘트 조회: ${documentId}`);
        return await this.commentContext.문서의코멘트를조회한다(documentId);
    }
    async getComment(commentId) {
        this.logger.debug(`코멘트 조회: ${commentId}`);
        return await this.commentContext.코멘트를조회한다(commentId);
    }
};
exports.DocumentService = DocumentService;
exports.DocumentService = DocumentService = DocumentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        document_context_1.DocumentContext,
        document_query_service_1.DocumentQueryService,
        template_context_1.TemplateContext,
        approver_mapping_service_1.ApproverMappingService,
        approval_process_context_1.ApprovalProcessContext,
        notification_context_1.NotificationContext,
        comment_context_1.CommentContext])
], DocumentService);
//# sourceMappingURL=document.service.js.map