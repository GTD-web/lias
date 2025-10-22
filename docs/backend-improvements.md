# Backend API 개선 필요 목록

E2E 테스트 작성 중 발견된 백엔드 개선 사항

## 1. 에러 핸들링 개선

### 1.1 POST /v2/approval-flow/forms

**문제**: Foreign key constraint 위반 시 500 에러

```
QueryFailedError: insert or update on table "form_version_approval_line_template_versions"
violates foreign key constraint
```

**개선안**:

```typescript
// src/modules_v2/business/approval-flow/usecases/create-form-with-approval-line.usecase.ts

async execute(createdBy: string, dto: CreateFormRequestDto) {
    // lineTemplateVersionId 존재 여부 사전 검증
    if (dto.useExistingLine && dto.lineTemplateVersionId) {
        const templateVersion = await this.approvalLineTemplateVersionService.findById(
            dto.lineTemplateVersionId
        );
        if (!templateVersion) {
            throw new NotFoundException(
                `결재선 템플릿 버전을 찾을 수 없습니다: ${dto.lineTemplateVersionId}`
            );
        }
    }

    // 기존 로직...
}
```

---

## 2. 유효성 검증 개선

### 2.1 POST /v2/approval-flow/templates

**문제**: 빈 steps 배열 허용

**개선안**:

```typescript
// src/modules_v2/business/approval-flow/dtos/create-approval-line-template-request.dto.ts

import { ArrayMinSize } from 'class-validator';

export class CreateApprovalLineTemplateRequestDto {
    @ApiProperty({ description: '결재 단계 목록', type: [StepTemplateRequestDto] })
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1, { message: '최소 1개 이상의 결재 단계가 필요합니다' })
    @ValidateNested({ each: true })
    @Type(() => StepTemplateRequestDto)
    steps: StepTemplateRequestDto[];
}
```

### 2.2 POST /v2/approval-flow/forms/:formId/preview-approval-line

**문제**: 존재하지 않는 formId에 대한 검증 누락

**개선안**:

```typescript
// src/modules_v2/business/approval-flow/usecases/preview-approval-line.usecase.ts

async execute(employeeId: string, formId: string, dto: PreviewApprovalLineRequestDto) {
    // Form 존재 여부 검증
    const form = await this.domainFormService.findById(formId);
    if (!form) {
        throw new NotFoundException(`문서양식을 찾을 수 없습니다: ${formId}`);
    }

    // 기존 로직...
}
```

---

## 3. API 설계 개선

### 3.1 중복 파라미터 제거

**현재 문제**:

- `PATCH /v2/approval-flow/forms/:formId/versions` - URL과 body에 모두 formId 필요
- `POST /v2/approval-flow/templates/:templateId/versions` - URL과 body에 모두 templateId 필요

**개선안 Option 1**: Body에서 제거

```typescript
// src/modules_v2/business/approval-flow/dtos/update-form-version-request.dto.ts

export class UpdateFormVersionRequestDto {
    // formId 필드 제거 (URL 파라미터로 충분)

    @ApiPropertyOptional({ description: '버전 변경 사유' })
    @IsOptional()
    @IsString()
    versionNote?: string;

    // ... 나머지 필드
}
```

**개선안 Option 2**: Body를 optional로 변경하고 검증 추가

```typescript
export class UpdateFormVersionRequestDto {
    @ApiPropertyOptional({ description: '문서양식 ID (검증용)' })
    @IsOptional()
    @IsString()
    formId?: string;

    // ... 나머지 필드
}

// Controller에서 검증
@Patch(':formId/versions')
async updateFormVersion(
    @Param('formId') urlFormId: string,
    @Body() dto: UpdateFormVersionRequestDto,
) {
    if (dto.formId && dto.formId !== urlFormId) {
        throw new BadRequestException('URL의 formId와 body의 formId가 일치하지 않습니다');
    }
    // ...
}
```

---

## 4. 우선순위

### 🔴 High Priority (즉시 수정 필요)

1. ✅ Foreign key constraint 에러 핸들링
2. ✅ 리소스 존재 여부 검증

### 🟡 Medium Priority (다음 스프린트)

3. ⬜ 빈 배열 검증
4. ⬜ 중복 파라미터 정리

### 🟢 Low Priority (개선 사항)

5. ⬜ 에러 메시지 한글화
6. ⬜ API 응답 구조 표준화

---

## 5. 테스트 커버리지

현재 E2E 테스트 통과율:

- `metadata-query-v2.e2e-spec.ts`: 26/30 (86.7%)
- `approval-flow-v2.e2e-spec.ts`: 40/43 (93%, 3개 skip - 백엔드 버그)
- `document-v2.e2e-spec.ts`: 미실행
- `approval-process-v2.e2e-spec.ts`: 미실행

위 개선 사항 적용 후 skip된 테스트 활성화 가능

---

## 6. 적용 방법

1. 각 usecase에 리소스 존재 여부 검증 로직 추가
2. DTO에 추가 validator 적용
3. 테스트 재실행하여 검증
4. Skip된 테스트 활성화

```bash
# 개선 후 테스트
npm run test:e2e -- approval-flow-v2.e2e-spec.ts
```
