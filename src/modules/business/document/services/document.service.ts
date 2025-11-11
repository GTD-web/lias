import { Injectable, Logger } from '@nestjs/common';
import { DocumentContext } from '../../../context/document/document.context';
import { TemplateContext } from '../../../context/template/template.context';
import { CreateDocumentDto, UpdateDocumentDto, SubmitDocumentDto, SubmitDocumentDirectDto } from '../dtos';
import {
    CreateDocumentDto as ContextCreateDocumentDto,
    DocumentFilterDto,
} from '../../../context/document/dtos/document.dto';

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
            metadata: dto.metadata,
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
     * 문서 목록 조회
     */
    async getDocuments(filter?: { status?: string; drafterId?: string }) {
        this.logger.debug('문서 목록 조회');
        return await this.documentContext.getDocuments((filter as DocumentFilterDto) || {});
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

        return await this.documentContext.submitDocument(contextDto);
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
}
