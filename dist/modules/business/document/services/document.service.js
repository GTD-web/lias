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
const template_context_1 = require("../../../context/template/template.context");
const approval_process_context_1 = require("../../../context/approval-process/approval-process.context");
const notification_context_1 = require("../../../context/notification/notification.context");
const comment_context_1 = require("../../../context/comment/comment.context");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
let DocumentService = DocumentService_1 = class DocumentService {
    constructor(documentContext, templateContext, approvalProcessContext, notificationContext, commentContext) {
        this.documentContext = documentContext;
        this.templateContext = templateContext;
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
        return await this.documentContext.createDocument(contextDto);
    }
    async updateDocument(documentId, dto) {
        this.logger.log(`문서 수정 시작: ${documentId}`);
        const contextDto = {
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
        return await this.documentContext.updateDocument(documentId, contextDto);
    }
    async deleteDocument(documentId) {
        this.logger.log(`문서 삭제 시작: ${documentId}`);
        return await this.documentContext.deleteDocument(documentId);
    }
    async getDocument(documentId) {
        this.logger.debug(`문서 조회: ${documentId}`);
        return await this.documentContext.getDocument(documentId);
    }
    async getDocuments(filter) {
        this.logger.debug('문서 목록 조회', filter);
        return await this.documentContext.getDocuments(filter);
    }
    async submitDocument(dto) {
        this.logger.log(`문서 기안 시작: ${dto.documentId}`);
        const contextDto = {
            documentId: dto.documentId,
            documentTemplateId: dto.documentTemplateId,
            approvalSteps: dto.approvalSteps?.map((step) => ({
                stepOrder: step.stepOrder,
                stepType: step.stepType,
                approverId: step.approverId,
            })),
        };
        const approvalSteps = contextDto.approvalSteps.filter((step) => step.stepType === approval_enum_1.ApprovalStepType.APPROVAL);
        const implementationSteps = contextDto.approvalSteps.filter((step) => step.stepType === approval_enum_1.ApprovalStepType.IMPLEMENTATION);
        if (approvalSteps.length < 1 || implementationSteps.length < 1) {
            throw new common_1.BadRequestException('결재 하나와 시행 하나는 필수로 필요합니다.');
        }
        const submittedDocument = await this.documentContext.submitDocument(contextDto);
        await this.approvalProcessContext.autoApproveIfDrafterIsFirstApprover(submittedDocument.id, submittedDocument.drafterId);
        this.sendSubmitNotification(submittedDocument.id, submittedDocument.drafterId).catch((error) => {
            this.logger.error('문서 기안 알림 전송 실패', error);
        });
        this.logger.log(`문서 기안 및 자동 승인 처리 완료: ${submittedDocument.id}`);
        return submittedDocument;
    }
    async sendSubmitNotification(documentId, drafterId) {
        try {
            const document = await this.documentContext.getDocument(documentId);
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
    async submitDocumentDirect(dto, drafterId) {
        this.logger.log(`바로 기안 시작: ${dto.title}`);
        const createDto = {
            documentTemplateId: dto.documentTemplateId,
            title: dto.title,
            content: dto.content,
            metadata: dto.metadata,
            approvalSteps: dto.approvalSteps,
        };
        const draftDocument = await this.createDocument(createDto, drafterId);
        this.logger.debug(`임시저장 완료: ${draftDocument.id}`);
        const submitDto = {
            documentId: draftDocument.id,
            documentTemplateId: dto.documentTemplateId,
            approvalSteps: dto.approvalSteps,
        };
        return await this.submitDocument(submitDto);
    }
    async getTemplateForNewDocument(templateId, drafterId) {
        this.logger.debug(`템플릿 상세 조회 (결재자 맵핑): ${templateId}, 기안자: ${drafterId}`);
        return await this.templateContext.getDocumentTemplateWithMappedApprovers(templateId, drafterId);
    }
    async getDocumentStatistics(userId) {
        this.logger.debug(`문서 통계 조회: 사용자 ${userId}`);
        return await this.documentContext.getDocumentStatistics(userId);
    }
    async getMyAllDocumentsStatistics(userId) {
        this.logger.debug(`내 전체 문서 통계 조회: 사용자 ${userId}`);
        return await this.documentContext.getMyAllDocumentsStatistics(userId);
    }
    async getMyAllDocuments(params) {
        this.logger.debug('내 전체 문서 목록 조회', params);
        return await this.documentContext.getMyAllDocuments(params);
    }
    async getMyDrafts(drafterId, page, limit) {
        this.logger.debug(`내가 작성한 문서 전체 조회: 사용자 ${drafterId}, 페이지 ${page}, 제한 ${limit}`);
        return await this.documentContext.getMyDrafts(drafterId, page, limit);
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
    __metadata("design:paramtypes", [document_context_1.DocumentContext,
        template_context_1.TemplateContext,
        approval_process_context_1.ApprovalProcessContext,
        notification_context_1.NotificationContext,
        comment_context_1.CommentContext])
], DocumentService);
//# sourceMappingURL=document.service.js.map