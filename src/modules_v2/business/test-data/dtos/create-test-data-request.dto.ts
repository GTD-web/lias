import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum, IsString, IsNumber, Min } from 'class-validator';

/**
 * 테스트 데이터 시나리오 타입
 */
export enum TestDataScenario {
    /** 간단한 2단계 결재 (기안자 -> 부서장 -> 본부장) */
    SIMPLE_APPROVAL = 'SIMPLE_APPROVAL',

    /** 복잡한 다단계 결재 (기안자 -> 팀장 -> 부서장 -> 본부장) */
    MULTI_LEVEL_APPROVAL = 'MULTI_LEVEL_APPROVAL',

    /** 협의 프로세스 (기안자 -> 협의자 2명 동시 검토 -> 부서장 승인) */
    AGREEMENT_PROCESS = 'AGREEMENT_PROCESS',

    /** 시행 프로세스 (기안자 -> 부서장 승인 -> 시행자 실행 -> 완료) */
    IMPLEMENTATION_PROCESS = 'IMPLEMENTATION_PROCESS',

    /** 반려 시나리오 (기안자 -> 1단계 반려 -> REJECTED 상태) */
    REJECTED_DOCUMENT = 'REJECTED_DOCUMENT',

    /** 취소 시나리오 (기안자 -> 진행 중 기안자가 취소 -> CANCELLED 상태) */
    CANCELLED_DOCUMENT = 'CANCELLED_DOCUMENT',

    /** 참조자 포함 (기안자 -> 결재 진행 -> 참조자들에게 알림) */
    WITH_REFERENCE = 'WITH_REFERENCE',

    /** 병렬 협의 (기안자 -> 여러 부서 동시 협의 -> 최종 승인) */
    PARALLEL_AGREEMENT = 'PARALLEL_AGREEMENT',

    /** 전체 프로세스 (기안자 -> 협의 -> 결재 -> 시행 -> 참조, 모든 단계 포함) */
    FULL_PROCESS = 'FULL_PROCESS',
}

/**
 * 테스트 데이터 생성 요청 DTO
 */
export class CreateTestDataRequestDto {
    @ApiProperty({
        description: '생성할 테스트 데이터 시나리오',
        enum: TestDataScenario,
        example: TestDataScenario.SIMPLE_APPROVAL,
        examples: {
            simple: { value: TestDataScenario.SIMPLE_APPROVAL, description: '✅ 간단한 2단계 결재' },
            multiLevel: { value: TestDataScenario.MULTI_LEVEL_APPROVAL, description: '🔄 복잡한 다단계 결재' },
            agreement: { value: TestDataScenario.AGREEMENT_PROCESS, description: '🤝 협의 프로세스' },
            implementation: { value: TestDataScenario.IMPLEMENTATION_PROCESS, description: '⚙️ 시행 프로세스' },
            rejected: { value: TestDataScenario.REJECTED_DOCUMENT, description: '❌ 반려된 문서' },
            cancelled: { value: TestDataScenario.CANCELLED_DOCUMENT, description: '🚫 취소된 문서' },
            withReference: { value: TestDataScenario.WITH_REFERENCE, description: '👥 참조자 포함' },
            parallel: { value: TestDataScenario.PARALLEL_AGREEMENT, description: '🔀 병렬 협의' },
            fullProcess: { value: TestDataScenario.FULL_PROCESS, description: '🎯 전체 프로세스' },
        },
    })
    @IsNotEmpty({ message: '시나리오를 선택해주세요' })
    @IsEnum(TestDataScenario)
    scenario: TestDataScenario;

    @ApiPropertyOptional({
        description: '생성할 문서 개수 (기본값: 1)',
        example: 1,
        minimum: 1,
        maximum: 10,
    })
    @IsOptional()
    @IsNumber()
    @Min(1)
    documentCount?: number;

    @ApiPropertyOptional({
        description: '문서 제목 접두사',
        example: '테스트',
    })
    @IsOptional()
    @IsString()
    titlePrefix?: string;

    @ApiPropertyOptional({
        description: '시나리오 진행 정도 (0: 초기 상태, 100: 완료 상태)',
        example: 50,
        minimum: 0,
        maximum: 100,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    progress?: number;
}
