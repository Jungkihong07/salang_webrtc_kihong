# 프로젝트 구조 가이드

이 문서는 Salang WebRTC 프로젝트의 폴더 구조와 각 파일의 역할을 설명합니다.

## 📁 루트 디렉토리

```
salang_webrtc_kihong/
├── 📄 README.md                    # 프로젝트 개요 및 사용법
├── 📄 PROJECT_STRUCTURE.md         # 이 파일 - 프로젝트 구조 설명
├── 📄 package.json                 # Node.js 프로젝트 설정 및 의존성
├── 📄 package-lock.json            # 의존성 버전 고정 파일
├── 📄 docker-compose.yml           # Docker 컨테이너 오케스트레이션 설정
├── 📄 coturn.conf                  # coturn TURN/STUN 서버 설정 파일
├── 📄 index.html                   # HTML 진입점
├── 📄 vite.config.ts               # Vite 빌드 도구 설정
├── 📄 tsconfig.json                # TypeScript 컴파일러 설정
├── 📄 tsconfig.node.json           # Node.js용 TypeScript 설정
├── 📁 src/                         # 소스 코드 디렉토리
└── 📁 supabase/                    # Supabase 설정 디렉토리
```

## 📁 src/ - 소스 코드 디렉토리

프론트엔드 React 애플리케이션의 모든 소스 코드가 위치합니다.

```
src/
├── 📄 main.tsx                     # React 애플리케이션 진입점
├── 📄 App.tsx                      # 메인 App 컴포넌트 (WebRTC 로직 포함)
├── 📄 App.css                      # App 컴포넌트 스타일
└── 📄 index.css                    # 전역 CSS 스타일
```

### 주요 파일 설명

- **`main.tsx`**: React 애플리케이션의 진입점으로, DOM에 App 컴포넌트를 렌더링
- **`App.tsx`**: 메인 애플리케이션 컴포넌트
  - Trystero 라이브러리를 사용한 WebRTC 연결 로직
  - Supabase 시그널링 서버 연동
  - coturn TURN/STUN 서버 설정
  - 비디오 스트림 관리
- **`App.css`**: App 컴포넌트 전용 스타일
- **`index.css`**: 전역 CSS 스타일 (기본 폰트, 색상 테마 등)

## 📁 supabase/ - Supabase 설정 디렉토리

Supabase 로컬 개발 환경 설정 파일들이 위치합니다.

```
supabase/
├── 📄 config.toml                  # Supabase 프로젝트 설정
└── 📁 .branches/                   # Supabase 브랜치 관리
    └── 📄 _current_branch          # 현재 활성 브랜치 정보
```

### 주요 파일 설명

- **`config.toml`**: Supabase 프로젝트의 전체 설정
  - 데이터베이스 설정
  - API 설정
  - 인증 설정
  - 스토리지 설정
  - Realtime 설정

## 📁 node_modules/ - 의존성 패키지

npm으로 설치된 모든 의존성 패키지들이 위치합니다. 이 폴더는 자동 생성되며 수동으로 편집하지 않습니다.

## 🔧 설정 파일들

### Docker 관련

- **`docker-compose.yml`**: Docker 컨테이너 오케스트레이션

  - Supabase PostgreSQL 컨테이너
  - Supabase API 컨테이너
  - Supabase Realtime 컨테이너
  - coturn TURN/STUN 서버 컨테이너

- **`coturn.conf`**: coturn 서버 설정
  - TURN/STUN 서버 포트 설정
  - 인증 정보
  - 릴레이 포트 범위
  - 보안 설정

### 빌드 도구 관련

- **`vite.config.ts`**: Vite 개발 서버 및 빌드 설정
- **`tsconfig.json`**: TypeScript 컴파일러 설정
- **`tsconfig.node.json`**: Node.js 환경용 TypeScript 설정

### 프로젝트 관리

- **`package.json`**: 프로젝트 메타데이터 및 스크립트
  - 프로젝트 이름, 버전, 설명
  - 의존성 목록
  - npm 스크립트 (dev, build, docker:up 등)

## 🚀 실행 방법

### 개발 환경 시작

```bash
# 의존성 설치
npm install

# Docker 서비스 시작
docker-compose up -d

# 개발 서버 시작
npm run dev
```

### 접근 가능한 서비스

- **프론트엔드**: http://localhost:3000
- **Supabase API**: http://localhost:54321
- **Supabase Realtime**: http://localhost:4000
- **coturn TURN/STUN**: localhost:3478

## 📝 개발 가이드

### 새로운 컴포넌트 추가

1. `src/` 디렉토리에 새 컴포넌트 파일 생성
2. 필요시 CSS 파일도 함께 생성
3. `App.tsx`에서 import하여 사용

### Supabase 설정 변경

1. `supabase/config.toml` 파일 수정
2. `docker-compose down && docker-compose up -d`로 재시작

### TURN 서버 설정 변경

1. `coturn.conf` 파일 수정
2. `docker-compose restart coturn`으로 재시작

## 🔍 문제 해결

### 포트 충돌

- Docker Compose가 실패하는 경우: `docker-compose down` 후 재시작
- 개발 서버 포트 변경: `vite.config.ts`에서 포트 설정 수정

### 의존성 문제

- `node_modules` 삭제 후 `npm install` 재실행
- `package-lock.json` 삭제 후 재설치

### Docker 문제

- Docker Desktop이 실행 중인지 확인
- `docker system prune`으로 정리 후 재시작
