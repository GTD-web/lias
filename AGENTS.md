# Cursor 프로젝트 룰

## 커밋 메시지 생성 규칙

### 언어

- **모든 커밋 메시지는 반드시 한국어로 작성합니다.**
- Generate commit messages in Korean language only.
- Never use English for commit messages.
- Always write commit messages in 한국어 (Korean).

### 형식

커밋 메시지는 다음 형식을 따릅니다:

```
<타입>: <제목>

<본문>
```

### 타입

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `refactor`: 코드 리팩토링
- `style`: 코드 포맷팅, 세미콜론 누락 등
- `docs`: 문서 수정
- `test`: 테스트 코드 추가 또는 수정
- `chore`: 빌드 업무 수정, 패키지 매니저 수정 등
- `perf`: 성능 개선
- `ci`: CI 설정 파일 수정
- `build`: 빌드 시스템 수정

### 예시

```
feat: 동료 평가 상세 조회 기능 구현

- 동료 평가 상세 정보를 조회하는 핸들러 추가
- 평가 제출 및 업데이트 로직 개선
```

```
fix: 프로젝트 배정 삭제 버그 수정

- 삭제 시 발생하는 참조 오류 해결
```

```
test: 프로젝트 배정 관련 e2e 테스트 파일 재구조화

- 테스트 파일을 project-assignment 폴더로 이동
- 테스트 구조 개선
```

## 코드 작성 규칙

### 함수명

- Context 내의 함수는 일관된 코드 컨벤션을 위해 '~한다' 형태로 끝나는 한글 함수명을 사용합니다.

### 응답 언어

- 모든 대화 및 설명은 한국어로 작성합니다.
