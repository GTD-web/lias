# 환경 변수 설정 가이드

## 개요

이 문서는 LIAS 프로젝트에 필요한 환경 변수 설정 방법을 설명합니다.

## .env 파일 생성

프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 애플리케이션 설정
NODE_ENV=local
PORT=3000

# 데이터베이스 설정 (현재 서버)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=tech7admin!
POSTGRES_DB=resource-server

# 중앙 정보 서버 연결 정보 (논리 복제용)
# 중앙 서버에서 조직 정보(직급, 직책, 부서, 직원)를 실시간으로 복제
CENTRAL_DB_HOST=central-server.example.com
CENTRAL_DB_PORT=5432
CENTRAL_DB_NAME=central-server
CENTRAL_DB_USER=replication_user
CENTRAL_DB_PASSWORD=secure_password_here

# JWT 설정
GLOBAL_SECRET=your-secret-key-here
JWT_EXPIRES_IN=1d

# AWS S3 설정 (선택사항)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-northeast-2
AWS_S3_BUCKET=

# Firebase 설정 (푸시 알림용, 선택사항)
FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_CLIENT_X509_CERT_URL=
FIREBASE_UNIVERSE_DOMAIN=

# Web Push 설정 (선택사항)
WEB_PUSH_PUBLIC_KEY=
WEB_PUSH_PRIVATE_KEY=
```

## 환경 변수 상세 설명

### 필수 설정

#### 애플리케이션 설정

| 변수명     | 설명              | 기본값  | 예시                                 |
| ---------- | ----------------- | ------- | ------------------------------------ |
| `NODE_ENV` | 실행 환경         | `local` | `local`, `development`, `production` |
| `PORT`     | 애플리케이션 포트 | `3000`  | `3000`, `5000`                       |

#### 현재 서버 데이터베이스

| 변수명              | 설명                  | 기본값            | 예시                          |
| ------------------- | --------------------- | ----------------- | ----------------------------- |
| `POSTGRES_HOST`     | PostgreSQL 호스트     | `localhost`       | `localhost`, `db.example.com` |
| `POSTGRES_PORT`     | PostgreSQL 포트       | `5432`            | `5432`                        |
| `POSTGRES_USER`     | 데이터베이스 사용자명 | `admin`           | `admin`, `postgres`           |
| `POSTGRES_PASSWORD` | 데이터베이스 비밀번호 | -                 | `your_password`               |
| `POSTGRES_DB`       | 데이터베이스 이름     | `resource-server` | `lias`, `resource-server`     |

#### 중앙 정보 서버 (논리 복제용)

| 변수명                | 설명                               | 예시                         |
| --------------------- | ---------------------------------- | ---------------------------- |
| `CENTRAL_DB_HOST`     | 중앙 서버 PostgreSQL 호스트        | `central-server.example.com` |
| `CENTRAL_DB_PORT`     | 중앙 서버 PostgreSQL 포트          | `5432`                       |
| `CENTRAL_DB_NAME`     | 중앙 서버 데이터베이스 이름        | `central-server`             |
| `CENTRAL_DB_USER`     | 복제용 사용자명 (SELECT 권한 필요) | `replication_user`           |
| `CENTRAL_DB_PASSWORD` | 복제용 사용자 비밀번호             | `secure_password`            |

> ⚠️ **중요:** 중앙 서버에서 복제용 사용자는 `REPLICATION` 권한과 해당 테이블에 대한 `SELECT` 권한이 필요합니다.

#### JWT 설정

| 변수명           | 설명                      | 예시                         |
| ---------------- | ------------------------- | ---------------------------- |
| `GLOBAL_SECRET`  | JWT 서명에 사용할 비밀 키 | `my-super-secret-key-123!@#` |
| `JWT_EXPIRES_IN` | JWT 토큰 만료 시간        | `1d`, `7d`, `24h`            |

### 선택 설정

#### AWS S3 (파일 업로드용)

| 변수명                  | 설명                            |
| ----------------------- | ------------------------------- |
| `AWS_ACCESS_KEY_ID`     | AWS Access Key                  |
| `AWS_SECRET_ACCESS_KEY` | AWS Secret Access Key           |
| `AWS_REGION`            | AWS 리전 (예: `ap-northeast-2`) |
| `AWS_S3_BUCKET`         | S3 버킷 이름                    |

#### Firebase (푸시 알림용)

Firebase 설정은 Firebase Console에서 서비스 계정 키를 다운로드하여 각 필드에 입력합니다.

## 환경별 설정

### 로컬 개발 환경

```env
NODE_ENV=local
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# 중앙 서버 복제는 선택사항
# CENTRAL_DB_HOST=
```

### 개발 서버

```env
NODE_ENV=development
POSTGRES_HOST=dev-db.example.com
POSTGRES_PORT=5432

# 중앙 서버 복제 활성화
CENTRAL_DB_HOST=central-dev.example.com
CENTRAL_DB_USER=replication_dev_user
```

### 프로덕션 서버

```env
NODE_ENV=production
POSTGRES_HOST=prod-db.example.com
POSTGRES_PORT=5432

# 중앙 서버 복제 활성화
CENTRAL_DB_HOST=central.example.com
CENTRAL_DB_USER=replication_user
# SSL 필수
CENTRAL_DB_HOST=central.example.com?sslmode=require
```

## 보안 권장사항

1. **`.env` 파일을 Git에 커밋하지 마세요**

    - `.gitignore`에 `.env`가 포함되어 있는지 확인

2. **프로덕션 환경에서는 환경 변수 관리 서비스 사용**

    - AWS Systems Manager Parameter Store
    - AWS Secrets Manager
    - HashiCorp Vault

3. **강력한 비밀번호 사용**

    - 최소 16자 이상
    - 대소문자, 숫자, 특수문자 조합

4. **복제용 사용자는 최소 권한 부여**
    ```sql
    -- 중앙 서버에서 실행
    CREATE USER replication_user WITH REPLICATION LOGIN PASSWORD 'strong_password';
    GRANT SELECT ON TABLE ranks, positions, departments, employees, employee_department_positions TO replication_user;
    ```

## 트러블슈팅

### 데이터베이스 연결 실패

```bash
# 연결 테스트
psql -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER -d $POSTGRES_DB
```

### 중앙 서버 복제 실패

```bash
# 중앙 서버 연결 테스트
psql -h $CENTRAL_DB_HOST -p $CENTRAL_DB_PORT -U $CENTRAL_DB_USER -d $CENTRAL_DB_NAME

# Publication 확인 (중앙 서버에서)
SELECT * FROM pg_publication WHERE pubname LIKE '%organization%';
```

### 환경 변수가 로드되지 않음

```typescript
// src/main.ts 또는 src/configs/env.config.ts에서 확인
import { config } from 'dotenv';
config(); // .env 파일 로드

console.log('POSTGRES_HOST:', process.env.POSTGRES_HOST);
console.log('CENTRAL_DB_HOST:', process.env.CENTRAL_DB_HOST);
```

## 참고 문서

- [NestJS Configuration](https://docs.nestjs.com/techniques/configuration)
- [PostgreSQL Logical Replication](./06_logical_replication.md)
- [dotenv 문서](https://github.com/motdotla/dotenv)
