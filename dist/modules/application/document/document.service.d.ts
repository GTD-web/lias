import { CreateApprovalLineUseCase } from './usecases/create-approval-line.usecase';
import { CreateFormApprovalLineDto } from './dtos/approval-line.dto';
import { FindApprovalLinesUseCase } from './usecases/find-approval-lines.usecase';
import { FormApprovalLineResponseDto } from './dtos';
export declare class DocumentService {
    private readonly createApprovalLineUseCase;
    private readonly findApprovalLinesUseCase;
    constructor(createApprovalLineUseCase: CreateApprovalLineUseCase, findApprovalLinesUseCase: FindApprovalLinesUseCase);
    createApprovalLine(dto: CreateFormApprovalLineDto): Promise<FormApprovalLineResponseDto>;
    findApprovalLines(): Promise<FormApprovalLineResponseDto[]>;
}
