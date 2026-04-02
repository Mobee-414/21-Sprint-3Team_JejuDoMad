# 🌴 GlobalNomad — JejuDoMad

제주도 체험을 한 곳에서 탐색하고 예약하는 **지도 기반 체험 예약 플랫폼**

> 여러 블로그와 사이트를 전전하는 불편함 없이  
> **지도로 탐색하고, 캘린더로 예약하며, 한 플랫폼에서 모든 체험을 완결하는 서비스**

<br>

## 📌 프로젝트 개요

- **일정:** 2025.03.12 ~ 2025.04.09
- **팀명:** FE 21기 3팀 (JejuDoMad)
- **배포 URL:** https://21-sprint-3-team-jeju-do-mad.vercel.app/

<br>

## 📝 주요 기능

- 🗺️ **지도 기반 탐색:** 지도 SDK로 내 주변·특정 지역 체험을 시각화하여 효율적인 여행 동선 설계
- 📅 **캘린더 예약:** 캘린더 SDK로 예약 가능한 날짜를 직관적으로 확인하고 예약
- 🔍 **검색 및 필터:** 카테고리·가격순·최신순 필터링과 키워드 검색으로 맞춤형 체험 탐색
- ⚡ **빠른 렌더링:** Next.js Server Components + TanStack Query 캐싱으로 대기 시간 최소화
- ⭐ **후기 및 평점:** 신뢰할 수 있는 후기·평점 기반으로 체험 선택

<br>

## 👩🏻‍💻 팀원 및 역할 분담

### 김애란

- 내 체험 관리 페이지
- 내 체험 등록 및 수정 페이지
- 공통컴포넌트 (modal, dropdown)

### 박예성

- 인증관리
- 로그인/회원가입 페이지
- 공통컴포넌트 (card, input)

### 박지현

- 글로벌 css
- 내정보 페이지
- 예약내역 페이지
- 리뷰작성 페이지
- 공통컴포넌트 (search, calendar, badge)

### 이해인

- 예약현황 페이지
- 알림 페이지
- 공통컴포넌트 (sidemenu, button)

### 주평안

- 초기구조 세팅
- 메인페이지
- 체험상세페이지
- 공통컴포넌트 (gnb, footer, pagination)

<br>

## 🛠 사용된 기술 스택 및 도구

### 개발 환경

![VS Code](https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)

### FE 기술

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat-square&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logoColor=white)

### 품질 관리

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)

### 협업 도구

![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=discord&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white)
![Jira](https://img.shields.io/badge/Jira-0052CC?style=flat-square&logo=jira&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)

### 빌드 및 배포

![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

<br>

## 📁 폴더 구조

```
src/
├─ app/               // URL 경로 및 페이지 레이아웃
│   ├─ (auth)/        // 로그인, 회원가입
│   └─ (main)/        // 홈, 체험 상세, 마이페이지
├─ features/          // 도메인 단위 독립 모듈
│   ├─ auth/          // 인증 관련
│   ├─ activities/    // 체험 리스트 · 상세 · 지도
│   ├─ reservations/  // 예약 · 캘린더 · 취소
│   └─ myExperiences/ // 내 체험 등록 · 수정 · 관리
├─ components/        // 범용 공용 컴포넌트 (Button, Modal 등)
├─ shared/            // Axios 인스턴스, 유틸, 전역 타입
├─ store/             // Zustand 전역 상태
└─ styles/            // globals.css
```
