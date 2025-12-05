import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { DocumentStatus, ApprovalStepType, ApprovalStatus } from '../../../../common/enums/approval.enum';

/**
 * 테스트용 직원 이름 Enum
 * Swagger에서 이름으로 선택할 수 있도록 함
 */
export enum TestEmployeeName {
    김규현 = '김규현',
    김종식 = '김종식',
    우창욱 = '우창욱',
    이화영 = '이화영',
    조민경 = '조민경',
    박헌남 = '박헌남',
    유승훈 = '유승훈',
    민정호 = '민정호',
}

/**
 * 테스트용 직원 이름 -> ID 매핑
 */
export const TEST_EMPLOYEE_ID_MAP: Record<TestEmployeeName, string> = {
    [TestEmployeeName.김규현]: '839e6f06-8d44-43a1-948c-095253c4cf8c',
    [TestEmployeeName.김종식]: '604a5c05-e0c0-495f-97bc-b86046db4342',
    [TestEmployeeName.우창욱]: '02b1d831-f278-4393-86ec-9db01248a1ec',
    [TestEmployeeName.이화영]: 'fd3336ea-2b7f-463a-9f21-cced8d68892f',
    [TestEmployeeName.조민경]: '1e9cc4b3-affb-4f63-9749-3480cd5261b9',
    [TestEmployeeName.박헌남]: 'f5f08c1d-9330-40f8-b80c-e75d9442503b',
    [TestEmployeeName.유승훈]: 'dbfbb104-6560-4557-8079-7845a82ffe14',
    [TestEmployeeName.민정호]: '2f0ecd69-1b07-4d33-8f49-b71ef9048d87',
};

/**
 * 테스트 문서 생성 Query DTO
 * Swagger에서 셀렉트박스로 선택 가능
 * 결재 단계별로 구분하여 추가 가능
 */
export class CreateTestDocumentQueryDto {
    // ============================================
    // 📄 문서 기본 정보
    // ============================================
    @ApiProperty({
        description: '문서 제목',
        example: '[테스트] 휴가 신청서',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional({
        description: '문서 내용 (HTML)',
        example: '<p>테스트 문서 내용입니다.</p>',
    })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiProperty({
        description: '기안자 선택',
        enum: TestEmployeeName,
        example: TestEmployeeName.김규현,
        enumName: 'TestEmployeeName',
    })
    @IsEnum(TestEmployeeName)
    drafterName: TestEmployeeName;

    @ApiProperty({
        description: '문서 상태',
        enum: DocumentStatus,
        example: DocumentStatus.PENDING,
        enumName: 'DocumentStatus',
    })
    @IsEnum(DocumentStatus)
    status: DocumentStatus;

    // ============================================
    // 🤝 합의 단계 (AGREEMENT) - 선택
    // ============================================
    @ApiPropertyOptional({
        description: '[합의1] 합의자 선택',
        enum: TestEmployeeName,
        enumName: 'TestEmployeeName',
    })
    @IsOptional()
    @IsEnum(TestEmployeeName)
    agreement1Approver?: TestEmployeeName;

    @ApiPropertyOptional({
        description: '[합의1] 합의 상태',
        enum: ApprovalStatus,
        enumName: 'ApprovalStatus',
    })
    @IsOptional()
    @IsEnum(ApprovalStatus)
    agreement1Status?: ApprovalStatus;

    @ApiPropertyOptional({
        description: '[합의2] 합의자 선택',
        enum: TestEmployeeName,
        enumName: 'TestEmployeeName',
    })
    @IsOptional()
    @IsEnum(TestEmployeeName)
    agreement2Approver?: TestEmployeeName;

    @ApiPropertyOptional({
        description: '[합의2] 합의 상태',
        enum: ApprovalStatus,
        enumName: 'ApprovalStatus',
    })
    @IsOptional()
    @IsEnum(ApprovalStatus)
    agreement2Status?: ApprovalStatus;

    // ============================================
    // ✅ 결재 단계 (APPROVAL) - 필수 1개 이상
    // ============================================
    @ApiProperty({
        description: '[결재1] 결재자 선택 (필수)',
        enum: TestEmployeeName,
        example: TestEmployeeName.김종식,
        enumName: 'TestEmployeeName',
    })
    @IsEnum(TestEmployeeName)
    approval1Approver: TestEmployeeName;

    @ApiProperty({
        description: '[결재1] 결재 상태 (필수)',
        enum: ApprovalStatus,
        example: ApprovalStatus.APPROVED,
        enumName: 'ApprovalStatus',
    })
    @IsEnum(ApprovalStatus)
    approval1Status: ApprovalStatus;

    @ApiPropertyOptional({
        description: '[결재2] 결재자 선택',
        enum: TestEmployeeName,
        enumName: 'TestEmployeeName',
    })
    @IsOptional()
    @IsEnum(TestEmployeeName)
    approval2Approver?: TestEmployeeName;

    @ApiPropertyOptional({
        description: '[결재2] 결재 상태',
        enum: ApprovalStatus,
        enumName: 'ApprovalStatus',
    })
    @IsOptional()
    @IsEnum(ApprovalStatus)
    approval2Status?: ApprovalStatus;

    @ApiPropertyOptional({
        description: '[결재3] 결재자 선택',
        enum: TestEmployeeName,
        enumName: 'TestEmployeeName',
    })
    @IsOptional()
    @IsEnum(TestEmployeeName)
    approval3Approver?: TestEmployeeName;

    @ApiPropertyOptional({
        description: '[결재3] 결재 상태',
        enum: ApprovalStatus,
        enumName: 'ApprovalStatus',
    })
    @IsOptional()
    @IsEnum(ApprovalStatus)
    approval3Status?: ApprovalStatus;

    // ============================================
    // 🚀 시행 단계 (IMPLEMENTATION) - 필수 1개
    // ============================================
    @ApiProperty({
        description: '[시행] 시행자 선택 (필수)',
        enum: TestEmployeeName,
        example: TestEmployeeName.김규현,
        enumName: 'TestEmployeeName',
    })
    @IsEnum(TestEmployeeName)
    implementationApprover: TestEmployeeName;

    @ApiProperty({
        description: '[시행] 시행 상태 (필수)',
        enum: ApprovalStatus,
        example: ApprovalStatus.PENDING,
        enumName: 'ApprovalStatus',
    })
    @IsEnum(ApprovalStatus)
    implementationStatus: ApprovalStatus;

    // ============================================
    // 📋 참조 단계 (REFERENCE) - 선택
    // ============================================
    @ApiPropertyOptional({
        description: '[참조1] 참조자 선택',
        enum: TestEmployeeName,
        enumName: 'TestEmployeeName',
    })
    @IsOptional()
    @IsEnum(TestEmployeeName)
    reference1Approver?: TestEmployeeName;

    @ApiPropertyOptional({
        description: '[참조1] 참조 상태',
        enum: ApprovalStatus,
        enumName: 'ApprovalStatus',
    })
    @IsOptional()
    @IsEnum(ApprovalStatus)
    reference1Status?: ApprovalStatus;

    @ApiPropertyOptional({
        description: '[참조2] 참조자 선택',
        enum: TestEmployeeName,
        enumName: 'TestEmployeeName',
    })
    @IsOptional()
    @IsEnum(TestEmployeeName)
    reference2Approver?: TestEmployeeName;

    @ApiPropertyOptional({
        description: '[참조2] 참조 상태',
        enum: ApprovalStatus,
        enumName: 'ApprovalStatus',
    })
    @IsOptional()
    @IsEnum(ApprovalStatus)
    reference2Status?: ApprovalStatus;
}

/**
 * 테스트용 결재단계 인터페이스 (내부 변환용)
 */
export interface TestApprovalStep {
    stepOrder: number;
    stepType: ApprovalStepType;
    approverId: string;
    status: ApprovalStatus;
    comment?: string;
}

/**
 * 테스트 문서 생성 내부 DTO (서비스용)
 */
export class CreateTestDocumentDto {
    title: string;
    content?: string;
    drafterId: string;
    status: DocumentStatus;
    approvalSteps: TestApprovalStep[];
}

/**
 * 테스트 문서 생성 응답 DTO
 */
export class CreateTestDocumentResponseDto {
    @ApiProperty({
        description: '생성된 문서 ID',
        example: 'uuid',
    })
    documentId: string;

    @ApiProperty({
        description: '문서 번호',
        example: 'TEST-2025-123456',
    })
    documentNumber: string;

    @ApiProperty({
        description: '문서 제목',
        example: '[테스트] 휴가 신청서',
    })
    title: string;

    @ApiProperty({
        description: '문서 상태',
        enum: DocumentStatus,
        example: DocumentStatus.PENDING,
    })
    status: DocumentStatus;

    @ApiProperty({
        description: '생성된 결재 단계 수',
        example: 3,
    })
    approvalStepsCount: number;

    @ApiProperty({
        description: '생성 메시지',
        example: '테스트 문서가 성공적으로 생성되었습니다.',
    })
    message: string;
}
