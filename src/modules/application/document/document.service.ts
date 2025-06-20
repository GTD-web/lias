import { Injectable } from '@nestjs/common';
import { CreateApprovalLineUseCase } from './usecases/approval-line/create-approval-line.usecase';
import { CreateFormApprovalLineDto, UpdateFormApprovalLineDto } from './dtos/approval-line.dto';
import { FindApprovalLinesUseCase } from './usecases/approval-line/find-approval-lines.usecase';
import {
    CreateDocumentFormDto,
    CreateDocumentTypeDto,
    DocumentFormResponseDto,
    DocumentTypeResponseDto,
    FormApprovalLineResponseDto,
    UpdateDocumentFormDto,
    UpdateDocumentTypeDto,
} from './dtos';
import { Employee } from '../../../database/entities/employee.entity';
import { FindApprovalLineByIdUseCase } from './usecases/approval-line/find-approval-line-by-id.usecase';
import { UpdateApprovalLineUseCase } from './usecases/approval-line/update-approval-line.usecase';
import { DeleteApprovalLineUseCase } from './usecases/approval-line/delete-approval-line.usecase';
import { CreateFormTypeUseCase } from './usecases/form-type/create-form-type.usecase';
import { FindFormTypesUseCase } from './usecases/form-type/find-form-types.usecase';
import { FindFormTypeByIdUseCase } from './usecases/form-type/find-form-type-by-id.usecase';
import { UpdateFormTypeUseCase } from './usecases/form-type/update-form-type.usecase';
import { DeleteFormTypeUseCase } from './usecases/form-type/delete-form-type.usecase';
import { FindDocumentFormByIdUseCase } from './usecases/document-form/find-document-form-by-id.usecase';
import { CreateDocumentFormUseCase } from './usecases/document-form/create-document-form.usecase';
import { FindDocumentFormsUseCase } from './usecases/document-form/find-document-forms.usecase';
import { UpdateDocumentFormUseCase } from './usecases/document-form/update-document-form.usecase';
import { DeleteDocumentFormUseCase } from './usecases/document-form/delete-document-form.usecase';

@Injectable()
export class DocumentService {
    constructor(
        private readonly createApprovalLineUseCase: CreateApprovalLineUseCase,
        private readonly findApprovalLinesUseCase: FindApprovalLinesUseCase,
        private readonly findApprovalLineByIdUseCase: FindApprovalLineByIdUseCase,
        private readonly updateApprovalLineUseCase: UpdateApprovalLineUseCase,
        private readonly deleteApprovalLineUseCase: DeleteApprovalLineUseCase,
        private readonly createFormTypeUseCase: CreateFormTypeUseCase,
        private readonly findFormTypesUseCase: FindFormTypesUseCase,
        private readonly findFormTypeByIdUseCase: FindFormTypeByIdUseCase,
        private readonly updateFormTypeUseCase: UpdateFormTypeUseCase,
        private readonly deleteFormTypeUseCase: DeleteFormTypeUseCase,
        private readonly createDocumentFormUseCase: CreateDocumentFormUseCase,
        private readonly findDocumentFormsUseCase: FindDocumentFormsUseCase,
        private readonly findDocumentFormByIdUseCase: FindDocumentFormByIdUseCase,
        private readonly updateDocumentFormUseCase: UpdateDocumentFormUseCase,
        private readonly deleteDocumentFormUseCase: DeleteDocumentFormUseCase,
    ) {}

    async createApprovalLine(user: Employee, dto: CreateFormApprovalLineDto): Promise<FormApprovalLineResponseDto> {
        return await this.createApprovalLineUseCase.execute(user, dto);
    }

    async findApprovalLines(): Promise<FormApprovalLineResponseDto[]> {
        return await this.findApprovalLinesUseCase.execute();
    }

    async findApprovalLineById(id: string): Promise<FormApprovalLineResponseDto> {
        return await this.findApprovalLineByIdUseCase.execute(id);
    }

    async updateApprovalLine(user: Employee, dto: UpdateFormApprovalLineDto): Promise<FormApprovalLineResponseDto> {
        return await this.updateApprovalLineUseCase.execute(user, dto);
    }

    async deleteApprovalLine(id: string): Promise<boolean> {
        return await this.deleteApprovalLineUseCase.execute(id);
    }

    async createFormType(dto: CreateDocumentTypeDto): Promise<DocumentTypeResponseDto> {
        return await this.createFormTypeUseCase.execute(dto);
    }

    async findFormTypes(): Promise<DocumentTypeResponseDto[]> {
        return await this.findFormTypesUseCase.execute();
    }

    async findFormTypeById(id: string): Promise<DocumentTypeResponseDto> {
        return await this.findFormTypeByIdUseCase.execute(id);
    }

    async updateFormType(id: string, dto: UpdateDocumentTypeDto): Promise<DocumentTypeResponseDto> {
        return await this.updateFormTypeUseCase.execute(id, dto);
    }

    async deleteFormType(id: string): Promise<boolean> {
        return await this.deleteFormTypeUseCase.execute(id);
    }

    async createDocumentForm(dto: CreateDocumentFormDto): Promise<DocumentFormResponseDto> {
        return await this.createDocumentFormUseCase.execute(dto);
    }

    async findDocumentForms(): Promise<DocumentFormResponseDto[]> {
        return await this.findDocumentFormsUseCase.execute();
    }

    async findDocumentFormById(id: string): Promise<DocumentFormResponseDto> {
        return await this.findDocumentFormByIdUseCase.execute(id);
    }

    async updateDocumentForm(id: string, dto: UpdateDocumentFormDto): Promise<DocumentFormResponseDto> {
        return await this.updateDocumentFormUseCase.execute(id, dto);
    }

    async deleteDocumentForm(id: string): Promise<boolean> {
        return await this.deleteDocumentFormUseCase.execute(id);
    }
}
