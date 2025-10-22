import { ApiProperty } from '@nestjs/swagger';

export class CreatedTestDataDto {
    @ApiProperty({ description: '생성된 Form ID 목록', type: [String] })
    forms: string[];

    @ApiProperty({ description: '생성된 FormVersion ID 목록', type: [String] })
    formVersions: string[];

    @ApiProperty({ description: '생성된 Document ID 목록', type: [String] })
    documents: string[];

    @ApiProperty({ description: '생성된 ApprovalLineTemplate ID 목록', type: [String] })
    approvalLineTemplates: string[];

    @ApiProperty({ description: '생성된 ApprovalLineTemplateVersion ID 목록', type: [String] })
    approvalLineTemplateVersions: string[];

    @ApiProperty({ description: '생성된 ApprovalStepTemplate ID 목록', type: [String] })
    approvalStepTemplates: string[];

    @ApiProperty({ description: '생성된 ApprovalLineSnapshot ID 목록', type: [String] })
    approvalLineSnapshots: string[];

    @ApiProperty({ description: '생성된 ApprovalStepSnapshot ID 목록', type: [String] })
    approvalStepSnapshots: string[];
}

export class TestDataResponseDto {
    @ApiProperty({ description: '성공 여부' })
    success: boolean;

    @ApiProperty({ description: '메시지' })
    message: string;

    @ApiProperty({ description: '생성된 테스트 데이터', type: CreatedTestDataDto, required: false })
    data?: CreatedTestDataDto;
}
