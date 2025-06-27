# 랜덤 문서 생성 기능

## 개요

CreateDraftDocumentDto를 참고하여 랜덤한 사용자들이 랜덤한 기안문서를 상신한 테스트 데이터를 생성하는 기능입니다.

## 기능 설명

### 1. 랜덤 문서 생성 (`CreateRandomDocumentsUseCase`)

#### 주요 특징

- **다양한 문서 유형**: 지출결의서, 휴가신청서, 업무보고서, 구매요청서 등 20가지 문서 제목
- **랜덤 상태 분포**: PENDING 60%, APPROVED 30%, REJECTED 10%
- **순서가 있는 결재 단계**: 협의 → 결재 → 시행 → 참조 순서로 진행
- **현실적인 데이터**: 최근 30일 내의 랜덤 날짜, 다양한 부서와 직급

#### 생성되는 데이터

1. **부서**: 8개 부서 (인사팀, 개발팀, 기획팀, 마케팅팀, 재무팀, 영업팀, 연구개발팀, 총무팀)
2. **직원**: 30명의 직원 (다양한 직급: 사원~전무)
3. **문서 유형**: 8가지 문서 유형
4. **문서 양식**: 4가지 문서 양식
5. **문서**: 지정된 개수만큼의 랜덤 문서
6. **결재 단계**: 문서당 2-4개의 순서가 있는 결재 단계

### 2. API 엔드포인트

#### 랜덤 문서 생성

```http
POST /api/v2/approval/random-documents?count=20
```

**쿼리 파라미터**

- `count` (선택): 생성할 문서 개수 (기본값: 20)

**응답 예시**

```json
{
    "message": "랜덤 문서 생성이 완료되었습니다.",
    "data": {
        "createdCount": 20,
        "employees": 30,
        "departments": 8,
        "documentTypes": 8,
        "documentForms": 4,
        "approvalSteps": 60
    },
    "details": {
        "documents": [
            {
                "documentId": "uuid",
                "title": "프로젝트 A 개발비 지출결의서 (1번)",
                "status": "PENDING",
                "drafterId": "employee-uuid",
                "createdAt": "2024-01-15T10:30:00Z"
            }
        ]
    }
}
```

#### 랜덤 문서 삭제

```http
DELETE /api/v2/approval/random-documents
```

## 사용 방법

### 1. 기본 사용법

```bash
# 20개의 랜덤 문서 생성
curl -X POST "http://localhost:3000/api/v2/approval/random-documents"

# 50개의 랜덤 문서 생성
curl -X POST "http://localhost:3000/api/v2/approval/random-documents?count=50"
```

### 2. Swagger UI에서 테스트

1. `http://localhost:3000/api-docs` 접속
2. "랜덤 문서 생성" 섹션 확인
3. POST `/api/v2/approval/random-documents` 엔드포인트 테스트

## 생성되는 문서 유형

### 문서 제목 목록

1. 프로젝트 A 개발비 지출결의서
2. 연차 신청서
3. 월간 업무보고서
4. 서버 구매 요청서
5. 출장 신청서
6. 교육 신청서
7. 회의록
8. 계약서
9. 인건비 지출결의서
10. 마케팅 비용 지출결의서
11. 연구개발비 지출결의서
12. 시설 유지보수비 지출결의서
13. 소프트웨어 라이선스 구매요청서
14. 장비 구매요청서
15. 도서 구매요청서
16. 컨퍼런스 참가 신청서
17. 외부 강사 초빙 신청서
18. 사무용품 구매요청서
19. 보험료 지출결의서
20. 법무비용 지출결의서

### 문서 내용 목록

각 문서 제목에 대응하는 현실적인 내용이 랜덤하게 매칭됩니다.

## 데이터 구조

### 생성되는 엔티티 관계

```
Department (8개)
├── Employee (30명)
    ├── Document (N개) - 기안자
    └── ApprovalStep (N개) - 결재자/협의자/시행자/참조자
```

### 결재 단계 타입 및 순서

결재 단계는 **고정된 순서**로 진행됩니다:

1. **AGREEMENT** (협의): 사전 검토 및 의견 수렴
2. **APPROVAL** (결재): 최종 승인/반려 결정
3. **IMPLEMENTATION** (시행): 승인 후 실제 업무 수행
4. **REFERENCE** (참조): 정보 공유 및 알림

#### 결재 단계별 특징

- **협의 단계**: 결재 전 사전 검토, 승인권 없음
- **결재 단계**: 최종 승인/반려 결정
- **시행 단계**: 승인 후 실제 업무 수행
- **참조 단계**: 정보 공유, 읽기 전용

#### 문서 상태별 결재 단계 처리

- **PENDING**: 현재 진행 중인 단계까지만 승인됨, 현재 단계에 `isCurrent: true` 설정
- **APPROVED**: 모든 단계가 승인됨, 모든 단계에 `isCurrent: false` 설정
- **REJECTED**: 반려된 단계까지만 승인됨, 반려된 단계에 `isCurrent: true` 설정

#### 현재 단계 표시 (`isCurrent` 필드)

각 결재 단계에는 `isCurrent` 필드가 있어 현재 진행 중인 단계를 표시합니다:

- **`isCurrent: true`**: 현재 처리해야 할 단계
- **`isCurrent: false`**: 완료되었거나 아직 진행되지 않은 단계

**예시**:

```
문서: "프로젝트 A 개발비 지출결의서" - PENDING 상태
├── 1단계: AGREEMENT (협의) - isApproved: true, isCurrent: false (완료)
├── 2단계: APPROVAL (결재) - isApproved: false, isCurrent: true (현재 차례)
└── 3단계: IMPLEMENTATION (시행) - isApproved: false, isCurrent: false (대기)
```

## 주의사항

1. **기존 데이터 확인**: 부서, 직원, 문서 유형, 문서 양식이 없으면 자동으로 생성됩니다.
2. **중복 생성**: 여러 번 실행하면 기존 데이터에 추가로 생성됩니다.
3. **성능**: 대량의 문서 생성 시 시간이 걸릴 수 있습니다.
4. **데이터 정리**: 테스트 완료 후 필요시 삭제 기능을 사용하세요.
5. **결재 순서**: 결재 단계는 항상 AGREEMENT → APPROVAL → IMPLEMENTATION → REFERENCE 순서로 진행됩니다.

## 개발자 정보

이 기능은 테스트 데이터 생성을 목적으로 개발되었으며, 실제 운영 환경에서는 사용하지 않는 것을 권장합니다.
