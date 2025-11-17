import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { DocumentContext } from '../../../context/document/document.context';
import { TemplateContext } from '../../../context/template/template.context';
import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { NotificationContext } from '../../../context/notification/notification.context';
import { CreateDocumentDto, UpdateDocumentDto, SubmitDocumentDto, SubmitDocumentDirectDto } from '../dtos';
import {
    CreateDocumentDto as ContextCreateDocumentDto,
    DocumentFilterDto,
} from '../../../context/document/dtos/document.dto';
import { ApprovalStepType } from 'src/common/enums/approval.enum';

/**
 * 문서 비즈니스 서비스
 * 문서 CRUD 및 기안 관련 비즈니스 로직을 담당합니다.
 */
@Injectable()
export class DocumentService {
    private readonly logger = new Logger(DocumentService.name);

    constructor(
        private readonly documentContext: DocumentContext,
        private readonly templateContext: TemplateContext,
        private readonly approvalProcessContext: ApprovalProcessContext,
        private readonly notificationContext: NotificationContext,
    ) {}

    /**
     * 문서 생성 (임시저장)
     */
    async createDocument(dto: CreateDocumentDto) {
        this.logger.log(`문서 생성 시작: ${dto.title}`);

        const contextDto: ContextCreateDocumentDto = {
            documentTemplateId: dto.documentTemplateId,
            title: dto.title,
            content: dto.content,
            drafterId: dto.drafterId,
            metadata: dto.metadata,
            approvalSteps: dto.approvalSteps?.map((step) => ({
                stepOrder: step.stepOrder,
                stepType: step.stepType,
                approverId: step.approverId,
            })),
        };

        return await this.documentContext.createDocument(contextDto);
    }

    /**
     * 문서 수정 (임시저장 상태만 가능)
     */
    async updateDocument(documentId: string, dto: UpdateDocumentDto) {
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

    /**
     * 문서 삭제 (임시저장 상태만 가능)
     */
    async deleteDocument(documentId: string) {
        this.logger.log(`문서 삭제 시작: ${documentId}`);
        return await this.documentContext.deleteDocument(documentId);
    }

    /**
     * 문서 조회 (단건)
     */
    async getDocument(documentId: string) {
        this.logger.debug(`문서 조회: ${documentId}`);
        return await this.documentContext.getDocument(documentId);
    }

    /**
     * 문서 목록 조회 (페이징, 필터링)
     */
    async getDocuments(filter: DocumentFilterDto) {
        this.logger.debug('문서 목록 조회', filter);
        return await this.documentContext.getDocuments(filter);
    }

    /**
     * 문서 기안 (임시저장된 문서 기반)
     */
    async submitDocument(dto: SubmitDocumentDto) {
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
        // 기본적으로 결재 하나와 시행 하나는 필수로 필요하다.
        // stepType 이 결재인 경우와 시행인 경우를 카운트 해서 2개 이상이어야 한다.
        const approvalSteps = contextDto.approvalSteps.filter((step) => step.stepType === ApprovalStepType.APPROVAL);
        const implementationSteps = contextDto.approvalSteps.filter(
            (step) => step.stepType === ApprovalStepType.IMPLEMENTATION,
        );
        if (approvalSteps.length < 1 || implementationSteps.length < 1) {
            throw new BadRequestException('결재 하나와 시행 하나는 필수로 필요합니다.');
        }

        // 1) 문서 기안 처리
        const submittedDocument = await this.documentContext.submitDocument(contextDto);

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
     * 문서 기안 알림 전송 (private)
     */
    private async sendSubmitNotification(documentId: string, drafterId: string): Promise<void> {
        try {
            // 1) 문서 정보 조회 (drafter 포함)
            const document = await this.documentContext.getDocument(documentId);

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
     * 바로 기안 (임시저장 없이 바로 기안)
     * 내부적으로 임시저장 후 기안하는 방식으로 처리됩니다.
     */
    async submitDocumentDirect(dto: SubmitDocumentDirectDto) {
        this.logger.log(`바로 기안 시작: ${dto.title}`);

        // 1. 임시저장
        const createDto: CreateDocumentDto = {
            documentTemplateId: dto.documentTemplateId,
            title: dto.title,
            content: dto.content,
            drafterId: dto.drafterId,
            metadata: dto.metadata,
        };

        const draftDocument = await this.createDocument(createDto);
        this.logger.debug(`임시저장 완료: ${draftDocument.id}`);

        // 2. 기안
        const submitDto: SubmitDocumentDto = {
            documentId: draftDocument.id,
            documentTemplateId: dto.documentTemplateId,
        };

        return await this.submitDocument(submitDto);
    }

    /**
     * 새 문서 작성용 템플릿 상세 조회 (결재자 정보 맵핑 포함)
     */
    async getTemplateForNewDocument(templateId: string, drafterId: string) {
        this.logger.debug(`템플릿 상세 조회 (결재자 맵핑): ${templateId}, 기안자: ${drafterId}`);
        return await this.templateContext.getDocumentTemplateWithMappedApprovers(templateId, drafterId);
    }

    /**
     * 문서 통계 조회
     */
    async getDocumentStatistics(userId: string) {
        this.logger.debug(`문서 통계 조회: 사용자 ${userId}`);
        return await this.documentContext.getDocumentStatistics(userId);
    }
}
