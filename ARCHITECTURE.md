# LIAS 시스템 아키텍처 문서

## 📋 목차

1. [개요](#개요)
2. [계층 구조](#계층-구조)
3. [데이터 흐름](#데이터-흐름)
4. [레이어별 상세 설명](#레이어별-상세-설명)
5. [엔티티 설계 원칙](#엔티티-설계-원칙)
6. [트랜잭션 관리](#트랜잭션-관리)
7. [Context 분리 전략](#context-분리-전략)
8. [UI 계층 구조](#ui-계층-구조)
9. [구현 예시](#구현-예시)

---

## 개요

LIAS는 **3-Layer Architecture**를 기반으로 한 전자결재 시스템입니다. 각 레이어는 명확한 책임을 가지며, 단일 방향 의존성을 유지합니다.

### 핵심 설계 원칙

- **단일 책임 원칙 (SRP)**: 각 클래스/모듈은 하나의 명확한 책임만 가짐
- **도메인 주도 설계 (DDD)**: 비즈니스 로직을 도메인 모델에 캡슐화
- **명시적 트랜잭션 관리**: Business Layer에서 일관되게 관리
- **의존성 역전**: 상위 레이어가 하위 레이어를 의존하며, 인터페이스를 통한 느슨한 결합

---

## 계층 구조

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│              (Controllers, Guards, Pipes)                │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│                    Business Layer                        │
│        (비즈니스 로직 조율, 트랜잭션 관리)                 │
│  - document.service.ts                                   │
│  - template.service.ts                                   │
│  - approval-process.service.ts                           │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│                     Context Layer                        │
│           (도메인 간 협력, 복잡한 비즈니스 로직)            │
│  - document.context.ts (CRUD)                            │
│  - document-query.service.ts (조회)                      │
│  - document-filter.builder.ts (필터링)                   │
│  - template.context.ts (CRUD)                            │
│  - template-query.service.ts (조회)                      │
│  - approver-mapping.service.ts (결재자 매핑)              │
│  - approval-process.context.ts                           │
│  - comment.context.ts                                    │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│                     Domain Layer                         │
│              (엔티티, 도메인 서비스, 리포지토리)             │
│  - document.entity.ts (+ Setters)                        │
│  - document.service.ts (도메인 메서드)                    │
│  - document.repository.ts                                │
│  - approval-step-snapshot.entity.ts (+ Setters)          │
│  - comment.entity.ts (+ Setters)                         │
│  - employee.entity.ts (+ Setters)                        │
│  - document-template.entity.ts (+ Setters)               │
│  - approval-step-template.entity.ts (+ Setters)          │
│  - category.entity.ts (+ Setters)                        │
└─────────────────────────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│                   Infrastructure Layer                   │
│                (TypeORM, PostgreSQL)                     │
└─────────────────────────────────────────────────────────┘
```

---

## 데이터 흐름

### 📝 Command (쓰기) 작업 흐름

```
User Action (UI)
    │
    ▼
Controller (Presentation Layer)
    │ - DTO 검증
    │ - 인증/인가 확인
    ▼
Business Service
    │ - withTransaction 시작 ◄─── 트랜잭션 시작점
    │ - 여러 Context 조율
    │ - 비즈니스 규칙 검증
    ▼
Context
    │ - 도메인 간 협력 조율
    │ - 크로스 도메인 검증
    │ - Domain Service 호출
    ▼
Domain Service
    │ - Entity 생성 (new Entity())
    │ - Setter 함수 호출
    │ - Repository.save()
    ▼
Repository (Infrastructure)
    │ - TypeORM을 통한 DB 저장
    ▼
Database (PostgreSQL)
```

### 🔍 Query (읽기) 작업 흐름

```
User Request (UI)
    │
    ▼
Controller
    │
    ▼
Business Service
    │ - Query Service 호출 (트랜잭션 없음)
    ▼
Query Service (Context Layer)
    │ - 복잡한 조회 로직
    │ - QueryBuilder 사용
    │ - 필터링/정렬/페이지네이션
    ▼
Domain Service / Repository
    │ - findOne / findAll
    │ - createQueryBuilder
    ▼
Database
```

---

## 레이어별 상세 설명

### 1️⃣ Domain Layer (도메인 레이어)

**책임:**
- 비즈니스 핵심 로직 캡슐화
- 엔티티 생명주기 관리
- 데이터 정합성 보장

**구성 요소:**

#### Entity (엔티티)
```typescript
@Entity('documents')
export class Document {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'enum', enum: DocumentStatus })
    status: DocumentStatus;

    // ==================== Setter 메서드 ====================
    
    /**
     * 제목을 설정한다
     */
    제목을설정한다(title: string): void {
        this.title = title;
    }

    /**
     * 상신한다
     */
    상신한다(): void {
        this.status = DocumentStatus.PENDING;
        this.submittedAt = new Date();
    }

    /**
     * 승인완료한다
     */
    승인완료한다(): void {
        this.status = DocumentStatus.APPROVED;
        this.approvedAt = new Date();
    }
}
```

**특징:**
- ✅ 한글 메서드명 사용 (`~한다` 형태)
- ✅ 상태 변경과 날짜 설정을 원자적으로 처리
- ✅ 비즈니스 규칙을 엔티티 내부에 캡슐화

#### Domain Service (도메인 서비스)
```typescript
@Injectable()
export class DomainDocumentService extends BaseService<Document> {
    /**
     * 문서를 생성한다
     */
    async createDocument(
        dto: DeepPartial<Document>,
        queryRunner?: QueryRunner
    ): Promise<Document> {
        const document = new Document();
        
        if (dto.title) {
            document.제목을설정한다(dto.title);
        }
        if (dto.content) {
            document.내용을설정한다(dto.content);
        }
        
        document.임시저장한다();
        
        return await this.documentRepository.save(document, { queryRunner });
    }

    /**
     * 문서를 수정한다
     */
    async updateDocument(
        document: Document,
        dto: DeepPartial<Document>,
        queryRunner?: QueryRunner
    ): Promise<Document> {
        if (dto.title) {
            document.제목을설정한다(dto.title);
        }
        
        return await this.documentRepository.save(document, { queryRunner });
    }
}
```

**특징:**
- ✅ BaseService를 상속하여 기본 CRUD 제공
- ✅ Entity Setter를 활용한 도메인 로직 수행
- ✅ `queryRunner` 파라미터로 트랜잭션 참여
- ✅ 순수한 도메인 로직만 포함

---

### 2️⃣ Context Layer (컨텍스트 레이어)

**책임:**
- 여러 도메인 간 협력 조율
- 복잡한 비즈니스 규칙 검증
- 도메인 로직 조합

**구성 요소:**

#### Context (컨텍스트)
```typescript
@Injectable()
export class DocumentContext {
    constructor(
        private readonly documentService: DomainDocumentService,
        private readonly employeeService: DomainEmployeeService,
        private readonly approvalStepSnapshotService: DomainApprovalStepSnapshotService,
    ) {}

    /**
     * 문서를 생성한다
     */
    async createDocument(
        dto: CreateDocumentDto,
        queryRunner?: QueryRunner
    ): Promise<Document> {
        // 1. 기안자 존재 확인
        await this.employeeService.findOneWithError({
            where: { id: dto.drafterId },
            queryRunner,
        });

        // 2. 문서 생성 (도메인 서비스 위임)
        const document = await this.documentService.createDocument(dto, queryRunner);

        // 3. 결재단계 스냅샷 생성 (필요한 경우)
        if (dto.approvalSteps && dto.approvalSteps.length > 0) {
            await this.createApprovalStepSnapshots(
                document.id,
                dto.approvalSteps,
                queryRunner
            );
        }

        return document;
    }
}
```

**특징:**
- ✅ 여러 Domain Service 조합
- ✅ 크로스 도메인 검증 수행
- ✅ 트랜잭션은 받지만 생성하지 않음
- ✅ 비즈니스 흐름 조율

#### Query Service (조회 서비스)
```typescript
@Injectable()
export class DocumentQueryService {
    /**
     * 문서 목록을 조회한다 (필터링, 페이지네이션)
     */
    async getDocuments(query: QueryDocumentsDto) {
        const qb = this.documentService.createQueryBuilder('document');
        
        // 필터 적용
        this.filterBuilder.applyFilters(qb, query);
        
        // 페이지네이션
        const skip = (query.page - 1) * query.limit;
        const [data, total] = await qb
            .skip(skip)
            .take(query.limit)
            .getManyAndCount();
        
        return { data, pagination: { page, limit, total } };
    }
}
```

**특징:**
- ✅ Command와 Query 분리 (CQRS 패턴)
- ✅ 복잡한 조회 로직 캡슐화
- ✅ 트랜잭션 불필요

#### Filter Builder (필터 빌더)
```typescript
@Injectable()
export class DocumentFilterBuilder {
    applyDraftFilter(qb: SelectQueryBuilder<Document>, userId: string) {
        qb.andWhere('document.drafterId = :userId', { userId })
          .andWhere('document.status = :status', { status: DocumentStatus.DRAFT });
    }

    applyFilter(qb: SelectQueryBuilder<Document>, filterType: string, userId: string) {
        switch (filterType) {
            case 'DRAFT':
                this.applyDraftFilter(qb, userId);
                break;
            // ... 기타 필터
        }
    }
}
```

**특징:**
- ✅ 필터링 로직을 모듈화
- ✅ 재사용성 향상
- ✅ 복잡도 감소

---

### 3️⃣ Business Layer (비즈니스 레이어)

**책임:**
- 트랜잭션 생명주기 관리
- 여러 Context 조율
- 외부 서비스 연동 (알림, 이메일 등)

```typescript
@Injectable()
export class DocumentService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly documentContext: DocumentContext,
        private readonly documentQueryService: DocumentQueryService,
        private readonly approvalProcessContext: ApprovalProcessContext,
    ) {}

    /**
     * 문서를 생성한다
     */
    async createDocument(dto: CreateDocumentDto) {
        return await withTransaction(this.dataSource, async (queryRunner) => {
            // Context에 트랜잭션 전파
            return await this.documentContext.createDocument(dto, queryRunner);
        });
    }

    /**
     * 문서를 기안한다
     */
    async submitDocument(dto: SubmitDocumentDto) {
        const submittedDocument = await withTransaction(
            this.dataSource,
            async (queryRunner) => {
                return await this.documentContext.submitDocument(dto, queryRunner);
            }
        );

        // 트랜잭션 외부 작업 (비동기 알림)
        await this.approvalProcessContext.autoApproveIfDrafterIsFirstApprover(
            submittedDocument.id,
            submittedDocument.drafterId
        );

        // 알림 전송 (실패해도 롤백하지 않음)
        this.sendSubmitNotification(submittedDocument.id, submittedDocument.drafterId)
            .catch(error => this.logger.error('알림 전송 실패', error));

        return submittedDocument;
    }

    /**
     * 문서 목록을 조회한다 (트랜잭션 불필요)
     */
    async getDocuments(query: QueryDocumentsDto) {
        return await this.documentQueryService.getDocuments(query);
    }
}
```

**특징:**
- ✅ `withTransaction`으로 트랜잭션 시작
- ✅ `queryRunner`를 Context로 전파
- ✅ 트랜잭션 외부 작업 분리
- ✅ 조회는 트랜잭션 없이 Query Service 호출

---

## 엔티티 설계 원칙

### Setter 함수 네이밍 규칙

```typescript
// ✅ 올바른 예시
제목을설정한다(title: string): void { }
내용을설정한다(content: string): void { }
상태를설정한다(status: DocumentStatus): void { }

// 상태 변경 메서드
임시저장한다(): void { }
상신한다(): void { }
승인완료한다(): void { }
반려한다(): void { }
취소한다(reason?: string): void { }

// ❌ 잘못된 예시
setTitle(title: string): void { }  // 영문 사용
제목_설정(title: string): void { }  // 언더스코어 사용
```

### Setter 함수 구현 원칙

1. **단순 할당 Setter**
```typescript
제목을설정한다(title: string): void {
    this.title = title;
}
```

2. **상태 변경 Setter (날짜 자동 설정)**
```typescript
상신한다(): void {
    this.status = DocumentStatus.PENDING;
    this.submittedAt = new Date();  // 상태와 함께 날짜 자동 설정
}

승인완료한다(): void {
    this.status = DocumentStatus.APPROVED;
    this.approvedAt = new Date();
}
```

3. **복합 로직 Setter**
```typescript
취소한다(reason?: string): void {
    this.status = DocumentStatus.CANCELLED;
    this.cancelReason = reason;
    this.cancelledAt = new Date();
}

삭제한다(): void {
    this.deletedAt = new Date();  // 소프트 삭제
}
```

### 왜 Setter 함수를 사용하는가?

1. **비즈니스 로직 캡슐화**
   - 상태 변경 시 필요한 부가 작업을 한 곳에서 관리
   - 예: 상신 시 `status`와 `submittedAt`을 함께 설정

2. **데이터 정합성 보장**
   - 관련된 필드들이 항상 일관성 있게 변경됨
   - 실수로 날짜를 설정하지 않는 버그 방지

3. **유지보수성 향상**
   - 상태 변경 로직이 변경되어도 Setter 내부만 수정
   - 코드 중복 제거

4. **가독성 향상**
   - `document.상신한다()`가 `document.status = DocumentStatus.PENDING; document.submittedAt = new Date()`보다 의도가 명확

---

## 트랜잭션 관리

### 트랜잭션 계층 구조

```
Business Service (트랜잭션 시작)
    ↓ withTransaction
    ├─ queryRunner 생성
    │
    ├─ Context (트랜잭션 참여)
    │   ↓ queryRunner 전달
    │   └─ Domain Service (트랜잭션 참여)
    │       ↓ queryRunner 전달
    │       └─ Repository (트랜잭션 참여)
    │
    └─ commit / rollback (자동)
```

### withTransaction 유틸리티

```typescript
// common/utils/transaction.util.ts
export async function withTransaction<T>(
    dataSource: DataSource,
    work: (queryRunner: QueryRunner) => Promise<T>,
    externalQueryRunner?: QueryRunner,
): Promise<T> {
    if (externalQueryRunner) {
        // 외부 트랜잭션에 참여
        return await work(externalQueryRunner);
    }

    // 새 트랜잭션 시작
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const result = await work(queryRunner);
        await queryRunner.commitTransaction();
        return result;
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
    } finally {
        await queryRunner.release();
    }
}
```

### 사용 예시

**Business Service:**
```typescript
async createTemplateWithApprovalSteps(dto: CreateTemplateDto) {
    return await withTransaction(this.dataSource, async (queryRunner) => {
        // 1. 템플릿 생성
        const template = await this.templateContext.createDocumentTemplate(
            dto,
            queryRunner  // ← queryRunner 전달
        );

        // 2. 결재단계 생성 (같은 트랜잭션)
        for (const step of dto.approvalSteps) {
            await this.templateContext.createApprovalStepTemplate(
                step,
                queryRunner  // ← queryRunner 전달
            );
        }

        return { template, steps };
    });
    // 자동 commit 또는 rollback
}
```

**Context:**
```typescript
async createDocumentTemplate(dto: CreateDto, queryRunner?: QueryRunner) {
    // 검증 로직
    
    // Domain Service에 queryRunner 전달
    return await this.documentTemplateService.createDocumentTemplate(
        dto,
        queryRunner  // ← queryRunner 전달
    );
}
```

**Domain Service:**
```typescript
async createDocumentTemplate(params, queryRunner?: QueryRunner) {
    const template = new DocumentTemplate();
    template.이름을설정한다(params.name);
    
    // Repository에 queryRunner 전달
    return await this.repository.save(template, { queryRunner });
}
```

### 트랜잭션 규칙

1. **시작점: Business Service**
   - ✅ `withTransaction` 호출
   - ✅ `queryRunner` 생성 및 관리

2. **참여: Context & Domain Service**
   - ✅ `queryRunner` 파라미터 받기
   - ✅ 하위 레이어로 `queryRunner` 전달
   - ❌ 새 트랜잭션 시작 금지

3. **조회 작업**
   - ❌ 트랜잭션 불필요
   - ✅ Query Service에서 직접 실행

---

## Context 분리 전략

### 언제 Context를 분리하는가?

#### ✅ 분리가 필요한 경우

1. **독립적인 비즈니스 도메인**
   ```
   DocumentContext         ← 문서 CRUD
   ApprovalProcessContext  ← 결재 처리 흐름
   CommentContext          ← 댓글 관리
   ```

2. **조회와 명령 분리 (CQRS)**
   ```
   DocumentContext         ← Command (쓰기)
   DocumentQueryService    ← Query (읽기)
   ```

3. **복잡한 로직의 모듈화**
   ```
   TemplateContext           ← CRUD
   ApproverMappingService    ← 결재자 매핑 로직 (375줄)
   TemplateQueryService      ← 조회 로직
   ```

#### ❌ 분리하지 않는 경우

1. **강한 결합 관계**
   ```
   DocumentContext
   └─ ApprovalStepSnapshotContext (X)
      → Document 생성 시 항상 함께 생성됨
      → DocumentContext의 private 메서드로 통합
   ```

2. **단순한 로직**
   ```
   // 100줄 미만의 단순 Context는 분리 불필요
   ```

### Context 분리 예시: Template 모듈

**Before (1,043줄):**
```
template.context.ts
├─ CRUD 로직 (350줄)
├─ 조회 로직 (200줄)
└─ 결재자 매핑 로직 (400줄)
```

**After:**
```
template.context.ts (340줄)          ← CRUD만
template-query.service.ts (162줄)    ← 조회 전담
approver-mapping.service.ts (375줄)  ← 매핑 전담
```

**효과:**
- ✅ 각 파일의 책임이 명확
- ✅ 테스트 용이성 향상
- ✅ 코드 가독성 향상

---

## UI 계층 구조

```
Layout (전체 레이아웃)
├── Context (전역 상태)
└── Page (라우팅 단위)
    └── Section (의미적 영역)
        └── Panel (독립 블록)
            ├── Module (기능 단위)
            │   └── Component (UI 기본 단위)
            └── Widget (보조 UI)
```

### UI → Backend 데이터 흐름

```
사용자 액션 (Button Click)
    ↓
Component 이벤트 핸들러
    ↓
Context 상태 업데이트 요청
    ↓
API Route Handler (Next.js)
    ↓
Backend API (NestJS)
    ├─ Controller
    ├─ Business Service
    ├─ Context
    └─ Domain Service
    ↓
Database
    ↓
Response
    ↓
Adapter (데이터 변환)
    ↓
Context 상태 업데이트
    ↓
Component 리렌더링
```

---

## 구현 예시

### 예시 1: Document 생성 (전체 흐름)

**1. Controller (Presentation Layer)**
```typescript
@Post()
async createDocument(@Body() dto: CreateDocumentDto, @User() user: Employee) {
    return await this.documentService.createDocument({
        ...dto,
        drafterId: user.id,
    });
}
```

**2. Business Service**
```typescript
async createDocument(dto: CreateDocumentDto) {
    return await withTransaction(this.dataSource, async (queryRunner) => {
        const document = await this.documentContext.createDocument(dto, queryRunner);
        
        if (dto.approvalSteps?.length > 0) {
            await this.documentContext.createApprovalStepSnapshots(
                document.id,
                dto.approvalSteps,
                queryRunner
            );
        }
        
        return document;
    });
}
```

**3. Context**
```typescript
async createDocument(dto: CreateDocumentDto, queryRunner?: QueryRunner) {
    // 기안자 확인
    await this.employeeService.findOneWithError({
        where: { id: dto.drafterId },
        queryRunner,
    });

    // 문서 생성
    const document = await this.documentService.createDocument(dto, queryRunner);

    return document;
}
```

**4. Domain Service**
```typescript
async createDocument(dto: DeepPartial<Document>, queryRunner?: QueryRunner) {
    const document = new Document();
    
    document.제목을설정한다(dto.title);
    document.내용을설정한다(dto.content);
    document.기안자를설정한다(dto.drafterId);
    document.임시저장한다();
    
    return await this.documentRepository.save(document, { queryRunner });
}
```

**5. Entity**
```typescript
임시저장한다(): void {
    this.status = DocumentStatus.DRAFT;
}
```

### 예시 2: 복잡한 조회 (Query 패턴)

**1. Controller**
```typescript
@Get()
async getDocuments(@Query() query: QueryDocumentsDto, @User() user: Employee) {
    return await this.documentService.getDocuments(query, user.id);
}
```

**2. Business Service**
```typescript
async getDocuments(query: QueryDocumentsDto, userId: string) {
    // 트랜잭션 불필요 - 직접 Query Service 호출
    return await this.documentQueryService.getDocuments(query, userId);
}
```

**3. Query Service**
```typescript
async getDocuments(query: QueryDocumentsDto, userId: string) {
    const qb = this.documentService.createQueryBuilder('document');
    
    // 필터 적용
    this.filterBuilder.applyFilter(qb, query.filterType, userId);
    
    // 검색
    if (query.searchKeyword) {
        qb.andWhere('document.title LIKE :keyword', {
            keyword: `%${query.searchKeyword}%`
        });
    }
    
    // 페이지네이션
    const [data, total] = await qb
        .skip((query.page - 1) * query.limit)
        .take(query.limit)
        .getManyAndCount();
    
    return { data, pagination: { page, limit, total } };
}
```

**4. Filter Builder**
```typescript
applyFilter(qb: SelectQueryBuilder<Document>, filterType: string, userId: string) {
    switch (filterType) {
        case 'DRAFT':
            this.applyDraftFilter(qb, userId);
            break;
        case 'PENDING':
            this.applyPendingFilter(qb, userId);
            break;
        // ...
    }
}
```

---

## 모듈 구조

```
src/
├── common/                     # 공통 유틸리티
│   ├── enums/
│   ├── guards/
│   ├── pipes/
│   ├── utils/
│   │   ├── transaction.util.ts        # 트랜잭션 헬퍼
│   │   └── approval-rule-validator.ts # 결재 규칙 검증
│   ├── services/
│   │   └── base.service.ts            # 공통 CRUD 메서드
│   └── repositories/
│       └── base.repository.ts
│
├── modules/
│   ├── domain/                 # 도메인 레이어
│   │   ├── document/
│   │   │   ├── document.entity.ts      # + Setters
│   │   │   ├── document.service.ts     # 도메인 메서드
│   │   │   ├── document.repository.ts
│   │   │   └── document.module.ts
│   │   ├── approval-step-snapshot/
│   │   ├── document-template/
│   │   ├── approval-step-template/
│   │   ├── category/
│   │   ├── comment/
│   │   └── employee/
│   │
│   ├── context/                # 컨텍스트 레이어
│   │   ├── document/
│   │   │   ├── document.context.ts           # CRUD
│   │   │   ├── document-query.service.ts     # 조회
│   │   │   ├── document-filter.builder.ts    # 필터링
│   │   │   └── document.module.ts
│   │   ├── template/
│   │   │   ├── template.context.ts           # CRUD
│   │   │   ├── template-query.service.ts     # 조회
│   │   │   ├── approver-mapping.service.ts   # 매핑
│   │   │   └── template.module.ts
│   │   ├── approval-process/
│   │   └── comment/
│   │
│   └── business/               # 비즈니스 레이어
│       ├── document/
│       │   ├── controllers/
│       │   │   └── document.controller.ts
│       │   ├── services/
│       │   │   └── document.service.ts       # 트랜잭션 관리
│       │   ├── dtos/
│       │   └── document.module.ts
│       ├── template/
│       └── approval-process/
```

---

## 베스트 프랙티스

### ✅ DO (권장 사항)

1. **트랜잭션은 Business Service에서만 시작**
   ```typescript
   // ✅ 올바름
   async createDocument(dto) {
       return await withTransaction(this.dataSource, async (qr) => {
           return await this.context.create(dto, qr);
       });
   }
   ```

2. **Entity Setter 사용**
   ```typescript
   // ✅ 올바름
   document.제목을설정한다(title);
   document.상신한다();

   // ❌ 잘못됨
   document.title = title;
   document.status = DocumentStatus.PENDING;
   document.submittedAt = new Date();
   ```

3. **findOneWithError 사용**
   ```typescript
   // ✅ 올바름
   const employee = await this.employeeService.findOneWithError({
       where: { id: employeeId }
   });

   // ❌ 잘못됨
   const employee = await this.employeeService.findOne(...);
   if (!employee) throw new NotFoundException();
   ```

4. **Query와 Command 분리**
   ```typescript
   // ✅ 올바름
   DocumentContext        // CRUD
   DocumentQueryService   // 조회

   // ❌ 잘못됨
   DocumentContext        // CRUD + 조회 혼재
   ```

### ❌ DON'T (지양할 사항)

1. **Context에서 트랜잭션 시작**
   ```typescript
   // ❌ 잘못됨
   async createDocument(dto) {
       return await withTransaction(this.dataSource, async (qr) => {
           // Context에서 트랜잭션 시작하지 말 것
       });
   }
   ```

2. **직접 프로퍼티 할당**
   ```typescript
   // ❌ 잘못됨
   document.status = DocumentStatus.PENDING;
   document.submittedAt = new Date();
   
   // ✅ Setter 사용
   document.상신한다();
   ```

3. **과도한 Context 분리**
   ```typescript
   // ❌ 잘못됨 - 너무 강하게 결합된 로직 분리
   DocumentContext
   ApprovalStepSnapshotContext  // Document에 너무 의존적

   // ✅ 올바름
   DocumentContext
   └─ private createApprovalStepSnapshots()  // 내부 메서드로
   ```

---

## 요약

### 핵심 아키텍처 원칙

1. **3-Layer Architecture**: Domain → Context → Business
2. **Entity-Centric Design**: Setter 함수로 비즈니스 로직 캡슐화
3. **Transaction at Business**: Business Service에서만 트랜잭션 시작
4. **CQRS Pattern**: Query와 Command 분리
5. **Single Responsibility**: 각 레이어/클래스는 하나의 명확한 책임

### 리팩토링 결과

| 모듈 | Before | After | 개선율 |
|------|--------|-------|--------|
| Document Context | 488줄 (CRUD + Query 혼재) | 488줄 (CRUD) + QueryService (545줄) | 책임 분리 ✅ |
| Template Context | 1,043줄 (모든 로직 혼재) | 340줄 (CRUD) + QueryService (162줄) + MappingService (375줄) | **-67%** |
| Entity Setters | ❌ 없음 | ✅ 모든 엔티티에 적용 | 일관성 ✅ |
| 트랜잭션 관리 | ⚠️ 혼재 | ✅ Business Service에서만 | 일관성 ✅ |

---

## 참고 자료

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [CQRS Pattern](https://martinfowler.com/bliki/CQRS.html)

