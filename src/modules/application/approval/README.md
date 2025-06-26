# Approval Module (결재 모듈)

## 개요

결재 상신 시스템의 핵심 모듈로, 기안 문서의 CRUD와 결재 상신 기능을 제공합니다.

## 구조

```
approval/
├── approval.module.ts              # 모듈 정의
├── approval.service.ts             # 서비스 레이어
├── controllers/                    # 컨트롤러
│   ├── approval.controller.ts      # 기본 결재 컨트롤러
│   ├── approval-draft.controller.ts # 기안 문서 CRUD 컨트롤러
│   └── approval-submit.controller.ts # 결재 상신 컨트롤러
├── dtos/                          # 데이터 전송 객체
│   ├── approval-draft.dto.ts      # 기안 문서 DTO
│   ├── approval-submit.dto.ts     # 결재 상신 DTO
│   ├── approval-response.dto.ts   # 응답 DTO
│   └── index.ts                   # DTO export
└── usecases/                      # 비즈니스 로직
    ├── draft/                     # 기안 관련 usecase
    │   ├── create-draft.usecase.ts
    │   ├── get-draft.usecase.ts
    │   ├── update-draft.usecase.ts
    │   └── delete-draft.usecase.ts
    ├── submit/                    # 상신 관련 usecase
    │   └── submit-approval.usecase.ts
    └── list/                      # 목록 조회 usecase
        └── get-approval-list.usecase.ts
```

## 주요 기능

### 1. 기안 문서 관리 (CRUD)

- **생성**: 새로운 기안 문서 작성
- **조회**: 기안 문서 상세 정보 조회
- **수정**: 기안 문서 내용 수정
- **삭제**: 기안 문서 삭제

### 2. 결재 상신

- 기안 문서를 결재선에 상신
- 결재선 설정 및 관리
- 상신 상태 관리

### 3. 결재 목록 조회

- 사용자별 결재 목록 조회
- 상태별 필터링
- 페이징 처리

## API 엔드포인트

### 기안 문서 관리

- `POST /approval-drafts` - 기안 문서 생성
- `GET /approval-drafts/:id` - 기안 문서 조회
- `PUT /approval-drafts/:id` - 기안 문서 수정
- `DELETE /approval-drafts/:id` - 기안 문서 삭제

### 결재 상신

- `POST /approval-submit/:id` - 결재 상신

### 결재 목록

- `GET /approvals` - 결재 목록 조회
- `GET /approvals/:id` - 결재 상세 조회

## 상태 관리

- `DRAFT`: 기안 상태
- `SUBMITTED`: 상신 완료
- `PENDING`: 결재 대기
- `APPROVED`: 승인 완료
- `REJECTED`: 반려

## 의존성

- JWT 인증 가드
- TypeORM Repository
- Swagger 문서화
