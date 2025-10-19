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
├── 📄 .env                         # 환경 변수 파일 (gitignore에 포함)
├── 📄 .env.example                 # 환경 변수 템플릿
├── 📄 index.html                   # HTML 진입점
├── 📄 vite.config.ts               # Vite 빌드 도구 설정
├── 📄 tsconfig.json                # TypeScript 컴파일러 설정
├── 📄 tsconfig.node.json           # Node.js용 TypeScript 설정
└── 📁 src/                         # 소스 코드 디렉토리
```

## 📁 src/ - 소스 코드 디렉토리

프론트엔드 React 애플리케이션의 모든 소스 코드가 위치합니다.

```
src/
├── 📄 main.tsx                     # React 애플리케이션 진입점
├── 📄 App.tsx                      # 메인 App 컴포넌트 (WebRTC 로직 포함)
├── 📄 App.css                      # App 컴포넌트 스타일
├── 📄 index.css                    # 전역 CSS 스타일
├── 📄 vite-env.d.ts                # Vite 환경 변수 타입 정의
└── 📁 components/                  # React 컴포넌트
    ├── 📄 ConnectionTest.tsx       # WebRTC 연결 테스트 컴포넌트
    └── 📄 ConnectionTest.css       # 테스트 컴포넌트 스타일
```

### 주요 파일 설명

- **`main.tsx`**: React 애플리케이션의 진입점으로, DOM에 App 컴포넌트를 렌더링
- **`App.tsx`**: 메인 애플리케이션 컴포넌트
  - Trystero 라이브러리를 사용한 WebRTC 연결 로직 (Supabase 전략)
  - Supabase SaaS 시그널링 서버 연동
  - coturn TURN/STUN 서버 설정
  - 비디오 스트림 관리
  - 탭 네비게이션 (일반 앱 ↔ 테스트 페이지)
- **`App.css`**: App 컴포넌트 전용 스타일
- **`index.css`**: 전역 CSS 스타일 (기본 폰트, 색상 테마 등)
- **`vite-env.d.ts`**: Vite 환경 변수 타입 정의 (TypeScript)

### components/ 디렉토리

- **`ConnectionTest.tsx`**: WebRTC 연결 테스트 전용 컴포넌트
  - 연결 상태 실시간 모니터링
  - 오디오 레벨 시각화 (Web Audio API)
  - 네트워크 지연시간 측정
  - ICE 연결 상태 추적
  - 자동화된 테스트 시나리오 실행
- **`ConnectionTest.css`**: 테스트 컴포넌트 스타일

## 🔐 환경 변수 파일

### `.env` (gitignore에 포함됨)

실제 Supabase 프로젝트 정보와 coturn 설정이 포함된 환경 변수 파일입니다.

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
TURN_USERNAME=salang
TURN_PASSWORD=salang123
TURN_REALM=salang.local
```

### `.env.example`

환경 변수 파일의 템플릿입니다. 새로운 개발자가 프로젝트를 시작할 때 이 파일을 `.env`로 복사하고 실제 값을 입력합니다.

## 📁 node_modules/ - 의존성 패키지

npm으로 설치된 모든 의존성 패키지들이 위치합니다. 이 폴더는 자동 생성되며 수동으로 편집하지 않습니다.

## 🔧 설정 파일들

### Docker 관련

- **`docker-compose.yml`**: Docker 컨테이너 오케스트레이션

  - coturn TURN/STUN 서버 컨테이너만 실행
  - 환경 변수를 통한 동적 설정 지원

- **`coturn.conf`**: coturn 서버 설정
  - TURN/STUN 서버 포트 설정 (3478)
  - 인증 정보 (user/password/realm)
  - 릴레이 포트 범위 (49152-49200)
  - 보안 설정 및 로그 설정

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

### 초기 설정

1. **환경 변수 파일 생성**

```bash
# .env.example을 복사하여 .env 생성
cp .env.example .env

# .env 파일을 열어 실제 Supabase 프로젝트 정보 입력
# VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY를
# Supabase 대시보드(https://supabase.com/dashboard)에서 확인하여 입력
```

2. **Supabase 프로젝트 준비**

- https://supabase.com 에서 무료 계정 생성
- 새 프로젝트 생성
- Project Settings > API에서 Project URL과 anon public key 복사
- `.env` 파일에 해당 정보 입력

### 개발 환경 시작

```bash
# 의존성 설치
npm install

# (선택사항) 로컬 coturn 서버 시작 - 현재는 Google STUN 사용 중
# docker-compose up -d

# 개발 서버 시작
npm run dev
```

**참고:** 현재는 Google의 무료 STUN 서버를 사용하므로 Docker coturn 없이도 외부 사용자와 연결됩니다!

### 접근 가능한 서비스

- **프론트엔드**: http://localhost:3000
- **Supabase**: Supabase SaaS (클라우드)
- **STUN 서버**: Google 공개 STUN (stun.l.google.com:19302)
- **(선택사항) coturn**: localhost:3478 (로컬 테스트용, 현재 미사용)

## 📝 개발 가이드

### 새로운 컴포넌트 추가

1. `src/` 디렉토리에 새 컴포넌트 파일 생성
2. 필요시 CSS 파일도 함께 생성
3. `App.tsx`에서 import하여 사용

### 환경 변수 변경

1. `.env` 파일에서 필요한 값 수정
2. 개발 서버 재시작 (`npm run dev`)

### ICE 서버 설정 변경

**현재 사용 중: Google STUN 서버**

- `src/App.tsx`와 `src/components/ConnectionTest.tsx`의 `TURN_CONFIG` 수정
- 무료, 외부 사용자와 약 80% 연결 성공률

**로컬 coturn 사용 (선택사항):**

1. `coturn.conf` 파일 수정
2. `docker-compose up -d`로 coturn 시작
3. 코드에서 `localhost:3478`로 변경

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
