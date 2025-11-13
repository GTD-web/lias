# LIAS 결재 시스템 API 문서

## 📚 개요

LIAS(Line Approval Integration System)는 결재 프로세스를 관리하는 시스템입니다.

이 문서는 5개의 주요 API 카테고리로 구성되어 있습니다.

---

## 📖 API 문서 목록

### 1. [메타데이터 조회 API](./1-metadata-api.md)
부서, 직원, 직급 등의 메타데이터를 조회하는 API
- 부서 목록/상세 조회
- 직원 검색/상세 조회
- 직급 목록 조회
- 계층구조 조회

**총 6개 엔드포인트**

---

### 2. [카테고리 관리 API](./2-category-api.md)
문서 템플릿의 카테고리를 관리하는 API
- 카테고리 생성/조회/수정/삭제
- 카테고리 목록 조회

**총 5개 엔드포인트**

---

### 3. [템플릿 관리 API](./3-template-api.md)
문서 템플릿과 결재단계 템플릿을 관리하는 API
- 템플릿 생성/조회/수정/삭제
- 결재단계 템플릿 설정
- AssigneeRule 기반 결재선 자동 계산

**총 5개 엔드포인트**

---

### 4. [문서 관리 API](./4-document-api.md)
문서 생성, 조회, 수정, 삭제 및 기안을 처리하는 API
- 문서 CRUD
- 임시저장/기안/바로기안
- 문서 목록 조회 (페이징, 필터링)
- 템플릿 기반 결재선 조회

**총 8개 엔드포인트**

---

### 5. [결재 프로세스 API](./5-approval-process-api.md)
결재 승인, 반려, 협의, 시행, 취소 등의 결재 프로세스를 처리하는 API
- 결재 승인/반려
- 협의 완료
- 시행 완료
- 결재 취소
- 내 결재 대기 목록 조회
- 통합 결재 액션 처리

**총 8개 엔드포인트**

---

## 🔐 인증

현재 모든 API는 인증이 비활성화되어 있습니다 (개발 환경).

프로덕션 환경에서는 JWT Bearer Token 인증을 사용합니다:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📌 공통 응답 형식

### 성공 응답
- `200 OK`: 조회, 수정 성공
- `201 Created`: 생성 성공
- `204 No Content`: 삭제 성공

### 에러 응답
- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 실패
- `403 Forbidden`: 권한 없음
- `404 Not Found`: 리소스를 찾을 수 없음
- `500 Internal Server Error`: 서버 내부 오류

**에러 응답 예시**
```json
{
  "statusCode": 400,
  "message": "필수 필드가 누락되었습니다: drafterId",
  "error": "Bad Request"
}
```

---

## 📝 데이터 타입 정의

### 결재 단계 타입 (ApprovalStepType)
- `AGREEMENT`: 협의
- `APPROVAL`: 결재
- `IMPLEMENTATION`: 시행

### 결재 상태 (ApprovalStatus)
- `PENDING`: 대기
- `APPROVED`: 승인됨
- `REJECTED`: 반려됨
- `CANCELLED`: 취소됨
- `IMPLEMENTED`: 시행 완료됨

### 문서 상태 (DocumentStatus)
- `DRAFT`: 임시저장
- `PENDING`: 결재 진행 중
- `APPROVED`: 승인 완료
- `REJECTED`: 반려
- `CANCELLED`: 취소
- `IMPLEMENTED`: 시행 완료

### 템플릿 상태 (DocumentTemplateStatus)
- `DRAFT`: 초안
- `ACTIVE`: 활성
- `INACTIVE`: 비활성
- `ARCHIVED`: 보관

### 배정 규칙 (AssigneeRule)
- `FIXED`: 고정 결재자
- `DRAFTER`: 기안자
- `DEPARTMENT_HEAD`: 부서장
- `HIERARCHY_TO_SUPERIOR`: 기안자 + 직속 상급자
- `HIERARCHY_TO_POSITION`: 기안자 ~ 특정 직급까지
- `SPECIFIC_EMPLOYEE`: 특정 직원

---

## 🚀 빠른 시작

### 1. 문서 작성 및 기안 프로세스
```bash
# 1) 템플릿 조회 (결재자 맵핑 포함)
GET /documents/templates/{templateId}?drafterId={employeeId}

# 2) 바로 기안
POST /documents/submit-direct
{
  "documentTemplateId": "...",
  "title": "휴가 신청서",
  "content": "<p>...</p>",
  "drafterId": "..."
}
```

### 2. 결재 처리 프로세스
```bash
# 1) 내 결재 대기 목록 조회
GET /approval-process/my-pending?userId={userId}&type=APPROVAL

# 2) 결재 승인
POST /approval-process/approve
{
  "stepSnapshotId": "...",
  "comment": "승인합니다."
}
```

### 3. 템플릿 생성 프로세스
```bash
# 1) 카테고리 생성
POST /categories
{
  "name": "인사",
  "code": "HR"
}

# 2) 템플릿 생성
POST /templates
{
  "name": "휴가 신청서",
  "code": "VACATION_REQUEST",
  "template": "<html>...</html>",
  "categoryId": "...",
  "approvalSteps": [...]
}
```

---

## 📊 통계

- **총 컨트롤러**: 5개
- **총 엔드포인트**: 32개
- **API 카테고리**: 5개

---

## 📞 지원

- **담당자**: Backend Team
- **이메일**: backend@example.com
- **Slack**: #backend-support
- **문서 버전**: v1.0.0
- **마지막 업데이트**: 2025-01-13

