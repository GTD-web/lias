import { Injectable, Logger } from '@nestjs/common';
import { DocumentContext } from '../../../context/document/document.context';
import { DocumentQueryService } from '../../../context/document/document-query.service';
import { TemplateContext } from '../../../context/template/template.context';
import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { NotificationContext } from '../../../context/notification/notification.context';
import { CommentContext } from '../../../context/comment/comment.context';
import { CreateDocumentDto, UpdateDocumentDto, SubmitDocumentDto, SubmitDocumentDirectDto } from '../dtos';
import {
    CreateDocumentDto as ContextCreateDocumentDto,
    DocumentFilterDto,
} from '../../../context/document/dtos/document.dto';
import { ApprovalStepType } from 'src/common/enums/approval.enum';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';
import { withTransaction } from 'src/common/utils/transaction.util';
import { DataSource } from 'typeorm';
import { ApproverMappingService } from 'src/modules/context/template/approver-mapping.service';
import { DocumentPolicyValidator, DrafterAction } from 'src/common/utils/document-policy.validator';

/**
 * 문서 비즈니스 서비스
 * 문서 CRUD 및 기안 관련 비즈니스 로직을 담당합니다.
 */
@Injectable()
export class DocumentService {
    private readonly logger = new Logger(DocumentService.name);

    constructor(
        private readonly dataSource: DataSource,
        private readonly documentContext: DocumentContext,
        private readonly documentQueryService: DocumentQueryService,
        private readonly templateContext: TemplateContext,
        private readonly approverMappingService: ApproverMappingService,
        private readonly approvalProcessContext: ApprovalProcessContext,
        private readonly notificationContext: NotificationContext,
        private readonly commentContext: CommentContext,
    ) {}

    /**
     * 문서 생성 (임시저장)
     */
    async createDocument(dto: CreateDocumentDto, drafterId: string) {
        this.logger.log(`문서 생성 시작: ${dto.title}`);

        const contextDto: ContextCreateDocumentDto = {
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
        return await withTransaction(this.dataSource, async (queryRunner) => {
            const document = await this.documentContext.createDocument(contextDto, queryRunner);

            // 4) 결재단계 스냅샷 생성 (제공된 경우)
            if (dto.approvalSteps && dto.approvalSteps.length > 0) {
                await this.documentContext.createApprovalStepSnapshots(document.id, dto.approvalSteps, queryRunner);
            }

            return document;
        });
    }

    /**
     * 문서 수정
     * 정책: 임시저장/결재진행중 상태에서만 내용 수정 가능
     */
    async updateDocument(documentId: string, dto: UpdateDocumentDto) {
        this.logger.log(`문서 수정 시작: ${documentId}`);

        // 1) 문서 조회 및 정책 검증
        const document = await this.documentQueryService.getDocument(documentId);

        // 2) 내용 수정 정책 검증
        DocumentPolicyValidator.validateDrafterActionOrThrow(document.status, DrafterAction.UPDATE_CONTENT);

        // 3) 결재선 수정 정책 검증 (결재선 수정 요청 시)
        if (dto.approvalSteps !== undefined) {
            DocumentPolicyValidator.validateDrafterActionOrThrow(document.status, DrafterAction.UPDATE_APPROVAL_LINE);
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

        return await withTransaction(this.dataSource, async (queryRunner) => {
            return await this.documentContext.updateDocument(documentId, fullContextDto, queryRunner);
        });
    }

    /**
     * 문서 삭제
     * 정책: 임시저장 상태에서만 삭제 가능
     */
    async deleteDocument(documentId: string) {
        this.logger.log(`문서 삭제 시작: ${documentId}`);

        // 1) 문서 조회 및 정책 검증
        const document = await this.documentQueryService.getDocument(documentId);

        // 2) 삭제 정책 검증
        DocumentPolicyValidator.validateDrafterActionOrThrow(document.status, DrafterAction.DELETE);

        return await this.documentContext.deleteDocument(documentId);
    }

    /**
     * 문서 조회 (단건)
     * @param documentId 문서 ID
     * @param userId 현재 사용자 ID (결재취소 가능 여부 계산용, 선택적)
     */
    async getDocument(documentId: string, userId?: string) {
        this.logger.debug(`문서 조회: ${documentId}, 사용자: ${userId || 'N/A'}`);
        return await this.documentQueryService.getDocument(documentId, userId);
    }

    /**
     * 문서 목록 조회 (페이징, 필터링)
     */
    async getDocuments(filter: DocumentFilterDto) {
        this.logger.debug('문서 목록 조회', filter);
        return await this.documentQueryService.getDocuments(filter);
    }

    /**
     * 문서 기안 (임시저장된 문서 기반)
     * 정책: 임시저장 상태에서만 상신 가능
     */
    async submitDocument(dto: SubmitDocumentDto) {
        this.logger.log(`문서 기안 시작: ${dto.documentId}`);

        // 1) 문서 조회 및 정책 검증
        const document = await this.documentQueryService.getDocument(dto.documentId);

        // 2) 상신 정책 검증
        DocumentPolicyValidator.validateDrafterActionOrThrow(document.status, DrafterAction.SUBMIT);

        const contextDto = {
            documentId: dto.documentId,
            documentTemplateId: dto.documentTemplateId,
            approvalSteps: dto.approvalSteps?.map((step) => ({
                stepOrder: step.stepOrder,
                stepType: step.stepType,
                approverId: step.approverId,
            })),
        };

        // 3) 문서 기안 처리 (트랜잭션)
        const submittedDocument = await withTransaction(this.dataSource, async (queryRunner) => {
            return await this.documentContext.submitDocument(contextDto, queryRunner);
        });

        // 2) 기안자 자동 승인 처리 (조건부, 별도 트랜잭션)
        await this.approvalProcessContext.autoApproveIfDrafterIsFirstApprover(
            submittedDocument.id,
            submittedDocument.drafterId,
        );

        // 3) 알림 전송 (비동기, 실패해도 전체 프로세스에 영향 없음)
        this.sendSubmitNotification(submittedDocument.id, submittedDocument.drafterId).catch((error) => {
            this.logger.error('문서 기안 알림 전송 실패', error);
        });

        this.logger.log(`문서 기안 및 자동 승인 처리 완료: ${submittedDocument.id}`);
        return submittedDocument;
    }

    /**
     * 바로 기안 (임시저장 없이 바로 기안)
     * 내부적으로 임시저장 후 기안하는 방식으로 처리됩니다.
     */
    async submitDocumentDirect(dto: SubmitDocumentDirectDto, drafterId: string) {
        this.logger.log(`바로 기안 시작: ${dto.title}`);

        // 1. 임시저장 + 기안 처리 (트랜잭션)
        const createDto: ContextCreateDocumentDto = {
            drafterId: drafterId,
            documentTemplateId: dto.documentTemplateId,
            title: dto.title,
            content: dto.content,
            metadata: dto.metadata,
            approvalSteps: dto.approvalSteps,
        };

        const submittedDocument = await withTransaction(this.dataSource, async (queryRunner) => {
            // 1-1) 임시저장
            const draftDocument = await this.documentContext.createDocument(createDto, queryRunner);
            this.logger.debug(`임시저장 완료: ${draftDocument.id}`);

            // 1-2) 기안
            const submitDto: SubmitDocumentDto = {
                documentId: draftDocument.id,
                documentTemplateId: dto.documentTemplateId,
                approvalSteps: dto.approvalSteps,
            };
            return await this.documentContext.submitDocument(submitDto, queryRunner);
        });

        // 2) 기안자 자동 승인 처리 (조건부, 별도 트랜잭션)
        await this.approvalProcessContext.autoApproveIfDrafterIsFirstApprover(
            submittedDocument.id,
            submittedDocument.drafterId,
        );

        // 3) 알림 전송 (비동기, 실패해도 전체 프로세스에 영향 없음)
        this.sendSubmitNotification(submittedDocument.id, submittedDocument.drafterId).catch((error) => {
            this.logger.error('바로 기안 알림 전송 실패', error);
        });

        this.logger.log(`바로 기안 및 자동 승인 처리 완료: ${submittedDocument.id}`);
        return submittedDocument;
    }

    /**
     * 상신취소 (기안자용)
     * 정책: 결재진행중이고 결재자가 아직 어떤 처리도 하지 않은 상태일 때만 가능
     */
    async cancelSubmit(documentId: string, drafterId: string, reason: string) {
        this.logger.log(`상신 취소 요청: ${documentId}, 기안자: ${drafterId}`);

        return await withTransaction(this.dataSource, async (queryRunner) => {
            return await this.documentContext.상신을취소한다(
                {
                    documentId,
                    drafterId,
                    reason,
                },
                queryRunner,
            );
        });
    }

    /**
     * 문서 기안 알림 전송 (private)
     */
    private async sendSubmitNotification(documentId: string, drafterId: string): Promise<void> {
        try {
            // 1) 문서 정보 조회 (drafter 포함)
            const document = await this.documentQueryService.getDocument(documentId);

            // 2) 결재 단계 조회
            const allSteps = await this.approvalProcessContext.getApprovalStepsByDocumentId(documentId);

            // 3) 기안자의 employeeNumber 조회
            const drafter = document.drafter;
            if (!drafter || !drafter.employeeNumber) {
                this.logger.warn(`기안자 정보를 찾을 수 없습니다: ${drafterId}`);
                return;
            }

            // 4) 알림 전송
            await this.notificationContext.sendNotificationAfterSubmit({
                document,
                allSteps,
                drafterEmployeeNumber: drafter.employeeNumber,
            });
        } catch (error) {
            this.logger.error(`문서 기안 알림 전송 중 오류 발생: ${documentId}`, error);
            throw error;
        }
    }

    /**
     * 새 문서 작성용 템플릿 상세 조회 (결재자 정보 맵핑 포함)
     */
    async getTemplateForNewDocument(templateId: string, drafterId: string) {
        this.logger.debug(`템플릿 상세 조회 (결재자 맵핑): ${templateId}, 기안자: ${drafterId}`);
        return await this.approverMappingService.getDocumentTemplateWithMappedApprovers(templateId, drafterId);
    }

    /**
     * 문서 통계 조회
     */
    async getDocumentStatistics(userId: string) {
        this.logger.debug(`문서 통계 조회: 사용자 ${userId}`);
        return await this.documentQueryService.getDocumentStatistics(userId);
    }

    /**
     * 내 전체 문서 통계 조회 (작성 + 결재라인)
     */
    async getMyAllDocumentsStatistics(userId: string) {
        this.logger.debug(`내 전체 문서 통계 조회: 사용자 ${userId}`);
        return await this.documentQueryService.getMyAllDocumentsStatistics(userId);
    }

    /**
     * 내 전체 문서 목록 조회 (작성 + 결재라인)
     */
    async getMyAllDocuments(params: {
        userId: string;
        filterType?: string;
        receivedStepType?: string;
        drafterFilter?: string;
        referenceReadStatus?: string;
        searchKeyword?: string;
        startDate?: Date;
        endDate?: Date;
        sortOrder?: string;
        page?: number;
        limit?: number;
    }) {
        this.logger.debug('내 전체 문서 목록 조회', params);
        return await this.documentQueryService.getMyAllDocuments(params);
    }

    /**
     * 내가 작성한 문서 전체 조회
     * @param drafterId 기안자 ID
     * @param page 페이지 번호
     * @param limit 페이지당 항목 수
     * @param draftFilter DRAFT 상태 필터 (DRAFT_ONLY: 임시저장만, EXCLUDE_DRAFT: 임시저장 제외)
     */
    async getMyDrafts(drafterId: string, page: number, limit: number, draftFilter?: 'DRAFT_ONLY' | 'EXCLUDE_DRAFT') {
        this.logger.debug(
            `내가 작성한 문서 조회: 사용자 ${drafterId}, 페이지 ${page}, 제한 ${limit}, 필터 ${draftFilter || '없음'}`,
        );
        return await this.documentQueryService.getMyDrafts(drafterId, page, limit, draftFilter);
    }

    /**
     * 코멘트 작성
     */
    async createComment(documentId: string, dto: CreateCommentDto, authorId: string) {
        this.logger.log(`코멘트 작성: 문서 ${documentId}`);
        return await this.commentContext.코멘트를작성한다({
            documentId: documentId,
            authorId: authorId,
            content: dto.content,
            parentCommentId: dto.parentCommentId,
        });
    }

    /**
     * 코멘트 수정
     */
    async updateComment(commentId: string, dto: UpdateCommentDto, authorId: string) {
        this.logger.log(`코멘트 수정: ${commentId}`);
        return await this.commentContext.코멘트를수정한다({
            commentId: commentId,
            authorId: authorId,
            content: dto.content,
        });
    }

    /**
     * 코멘트 삭제
     */
    async deleteComment(commentId: string, authorId: string) {
        this.logger.log(`코멘트 삭제: ${commentId}`);
        return await this.commentContext.코멘트를삭제한다(commentId, authorId);
    }

    /**
     * 문서의 코멘트 조회
     */
    async getDocumentComments(documentId: string) {
        this.logger.debug(`문서 코멘트 조회: ${documentId}`);
        return await this.commentContext.문서의코멘트를조회한다(documentId);
    }

    /**
     * 코멘트 상세 조회
     */
    async getComment(commentId: string) {
        this.logger.debug(`코멘트 조회: ${commentId}`);
        return await this.commentContext.코멘트를조회한다(commentId);
    }
}
