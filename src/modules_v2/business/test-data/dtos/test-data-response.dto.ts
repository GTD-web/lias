import { ApiProperty } from '@nestjs/swagger';

export class CreatedTestDataDto {
    @ApiProperty({ description: '생성된 Form ID 목록', type: [String], required: false })
    forms?: string[];

    @ApiProperty({ description: '생성된 FormVersion ID 목록', type: [String], required: false })
    formVersions?: string[];

    @ApiProperty({ description: '생성된 Document ID 목록', type: [String], required: false })
    documents?: string[];

    @ApiProperty({ description: '생성된 ApprovalLineTemplate ID 목록', type: [String], required: false })
    approvalLineTemplates?: string[];

    @ApiProperty({ description: '생성된 ApprovalLineTemplateVersion ID 목록', type: [String], required: false })
    approvalLineTemplateVersions?: string[];

    @ApiProperty({ description: '생성된 ApprovalStepTemplate ID 목록', type: [String], required: false })
    approvalStepTemplates?: string[];

    @ApiProperty({ description: '생성된 ApprovalLineSnapshot ID 목록', type: [String], required: false })
    approvalLineSnapshots?: string[];

    @ApiProperty({ description: '생성된 ApprovalStepSnapshot ID 목록', type: [String], required: false })
    approvalStepSnapshots?: string[];

    @ApiProperty({ description: '생성된 ApprovalLine ID 목록 (결재선 없는 경우)', type: [String], required: false })
    approvalLines?: string[];

    // 유연성을 위한 추가 필드들
    [key: string]: any;
}

export class TestDataResponseDto {
    @ApiProperty({ description: '성공 여부' })
    success: boolean;

    @ApiProperty({ description: '메시지' })
    message: string;

    @ApiProperty({ description: '생성된 테스트 데이터', required: false })
    data?: any;
}
