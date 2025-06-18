import { Injectable } from '@nestjs/common';
import { CreateApprovalLineUseCase } from './usecases/create-approval-line.usecase';
import { CreateFormApprovalLineDto } from './dtos/approval-line.dto';
import { FindApprovalLinesUseCase } from './usecases/find-approval-lines.usecase';
import { FormApprovalLineResponseDto } from './dtos';

@Injectable()
export class DocumentService {
    constructor(
        private readonly createApprovalLineUseCase: CreateApprovalLineUseCase,
        private readonly findApprovalLinesUseCase: FindApprovalLinesUseCase,
    ) {}

    async createApprovalLine(dto: CreateFormApprovalLineDto): Promise<FormApprovalLineResponseDto> {
        return await this.createApprovalLineUseCase.execute(dto);
    }

    async findApprovalLines(): Promise<FormApprovalLineResponseDto[]> {
        return await this.findApprovalLinesUseCase.execute();
    }
}
