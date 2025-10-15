<p align="center">
<img width="250" height="123" alt="favocion-512x512 - 복사본" src="https://github.com/user-attachments/assets/86044c04-58a4-404a-9da6-80fe4dcf76bd" />

</p>
<h4 align="center">
AI를 활용해 법률 정보의 문턱을 낮추는 <b>"내 손안의 법률 비서👨‍⚖️"</b><br/><br/>
</h4>

<p align="center">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
<img src="https://img.shields.io/badge/Fetch_API-4285F4?style=for-the-badge&logo=javascript&logoColor=white"/>
<img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>
<img src="https://img.shields.io/badge/Framer_Motion-EF008F?style=for-the-badge&logo=framer&logoColor=white"/>
<img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white"/>
</p>

---

## 바로? BaLaw! <a href="https://www.trybalaw.com/" target="_blank"> 🚀 서비스 바로가기</a>

**바로(BaLaw)** 는 복잡하고 어려운 법률 문제에 직면한 일반인들을 위해 **AI 기술**을 활용하여 법률 정보의 문턱을 낮추는 **'내 손안의 법률 비서'** 서비스입니다

---

## 🛠️ 기술 스택

| Category                 | Stack                                        |
| ------------------------ | -------------------------------------------- |
| **언어**                 | Typescript                                   |
| **프레임워크**           | React, Next.js                               |
| **클라이언트 상태 관리** | Zustand, Context API                         |
| **서버 상태 관리**       | TanStack Query                               |
| **인증 / 인가**          | jose                                         |
| **애니메이션**           | Framer Motion, GSAP                          |
| **CSS**                  | Tailwind CSS, Shadcn, Radix                  |
| **API 통신**             | Axios, Fetch                                 |
| **배포**                 | Vercel                                       |
| **빌드 / 번들러**        | Turbopack                                    |
| **코드 품질**            | Husky, ESLint, Prettier                      |
| **테스트**               | LightHouse, Vercel Speed Insight / Analytics |
| **협업**                 | Notion, Github, Figma, Slack, Discord, Zoom  |

---

## 🎯 프로젝트 목표

### 💡 기획 배경

기존의 법률 서비스는 전문 용어로 인한 소통의 어려움이나, 시간과 비용이 큰 높은 진입 장벽이 존재합니다 <br/> **AI를 활용해 언제나, 즉시, 무료로 법률 정보의 접근성을 극대화하고, 사용자에게 직관적이고 친화적인 디자인과 기능을 제공하여 어렵지 않은, 다가가기 쉬운 법률 서비스**를 제공하고자 합니다
<br/>
<br/>
### 🚩 기술 목표

#### Next.js 이해와 활용

App Router, 서버/클라이언트 컴포넌트, SSR/SSG/ISR 등 렌더링 전략을 이해하고, 데이터 패칭, 라우팅, 성능 최적화를 통해 SEO와 사용자 경험이 우수한 웹 애플리케이션을 구축할 수 있습니다

#### 백엔드와 협업

RESTful API통신, 인증/보안 처리, 에러 핸들링을 구현하고, API 스펙 협의 및 상태 관리를 통해 백엔드 팀과 효과적으로 협업하여 안정적인 서비스를 개발할 수 있습니다

---

## 🗂️ 폴더 구조

<details>
<summary>📂 폴더 구조 보기</summary>

```bash
📁 project-root
├── 📁 public
│   ├── 📁 fonts
│   ├── 📁 icons
│   ├── 📁 images
│   └── 📄 favicon.ico
│
├── 📁 src
│   ├── 📁 api
│   │   ├── 📁 account
│   │   ├── 📁 chat
│   │   ├── 📁 data
│   │   ├── 📁 detail
│   │   ├── 📁 rank
│   │   ├── 📁 search
│   │   ├── 📁 vote
│   │   ├── 📁 word
│   │   ├── 📄 axiosInstance.ts
│   │   └── 📄 tokenRefresh.ts
│   │
│   ├── 📁 app
│   │   ├── 📁 (account)
│   │   │   ├── 📁 find-account
│   │   │   ├── 📁 login
│   │   │   ├── 📁 oauth
│   │   │   ├── 📁 password-reset
│   │   │   ├── 📁 sign-up
│   │   │   └── 📄 layout.tsx
│   │   │
│   │   ├── 📁 (ai-layout)
│   │   │   ├── 📁 advice
│   │   │   ├── 📁 chat
│   │   │   └── 📄 layout.tsx
│   │   │
│   │   ├── 📁 detail
│   │   │   ├── 📁 law
│   │   │   ├── 📁 precedent
│   │   │   └── 📄 loading.tsx
│   │   │
│   │   ├── 📁 mypage
│   │   │
│   │   ├── 📁 search
│   │   │   └── 📁 (search-layout)
│   │   │         ├── 📁 law
│   │   │         ├── 📁 precedent
│   │   │         ├── 📁 total
│   │   │         ├── 📄 layout.tsx
│   │   │         └── 📄 loading.tsx
│   │   │
│   │   ├── 📁 test
│   │   ├── 📁 vote
│   │   │   └── 📁 (vote-layout)
│   │   │         ├── 📁 (my-vote)
│   │   │         ├── 📁 closed
│   │   │         ├── 📁 ongoing
│   │   │         └── 📄 layout.tsx
│   │   ├── 📄 layout.tsx
│   │   ├── 📄 not-found.tsx
│   │   └── 📄 page.tsx
│   │
│   ├── 📁 assets
│   │   ├── 📁 icons
│   │   └── 📁 images
│   │
│   ├── 📁 components
│   │   ├── 📁 features
│   │   ├── 📁 forms
│   │   ├── 📁 layout
│   │   ├── 📁 provider
│   │   └── 📁 ui
│   │
│   ├── 📁 context
│   ├── 📁 hooks
│   ├── 📁 store
│   ├── 📁 styles
│   ├── 📁 types
│   └── 📁 utils
```
</details>
<br/>

---

## 🏗️ 시스템 아키텍처
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/66c8a14e-0c3e-4563-8f7a-602e85571451" />

---

## ⚙️ 주요 기능
### 회원 관리, 유저 세션 관리
- 일반 로그인/네이버,카카오 소셜 로그인 등 다양한 로그인 방법 제공
- jose 라이브러리를 통한 클라이언트 토큰 검증
- 자동 로그인 제공
### AI 상담
- 채팅 목록 팝업으로 과거 채팅 이력 제공
- 유저의 프롬프트 기반으로 키워드 랭킹 제공
- AI 상담 내역 제공
- AI API의 특정 상 긴 fetch시간을 해소하기 위한 로딩
### 검색
- 통합, 법령, 판례 카테고리 검색
- 카테고리별 필터로 상세 검색 제공
- 키워드 검색
- 내용 미리보기 제공
### 상세
- 목차 네비게이션 (TOC) 제공
- 읽기 쉬운 글 구성 제공
### 투표

### 반응형 / 테마 지원
- 모바일 ~ 데스크탑 해상도까지 지원
- 라이트 / 다크모드 지원
---
## 📸 주요 기능 화면
### 회원 관리, 유저 세션 관리

### AI 상담

### 검색

### 상세

### 투표

### 반응형 / 테마 지원

---

## 🧑‍💻 협업 컨벤션

### 1. PR 규칙

- 최소 1명 이상 승인 후 병합
- 코드 리뷰 필수

### 2. 커밋 컨벤션

- type : 한글 요약
  `feat : 회원가입 UI 제작`

### 3. 브랜치 전략

- GitHub Flow 방식

- 네이밍 규칙
  `feat/페이지/기능명`
  `fix/페이지/버그명`

### 4. 코드 품질

- Husky + ESLint + Prettier로 코드 품질 관리

---

## 🧪 테스트

- **Vercel Speed Insight / Analytics** 를 통한 자동 성능 분석
- **Lighthouse** 로 접근성, SEO, 성능 지표 측정

---

## ✍️ 팀 문화

| 시간             | 내용                                           |
| ---------------- | ---------------------------------------------- |
| 🕘 오전 9시      | 데일리 스크럼 (컨디션 / 일정 / 작업 계획 공유) |
| 🕔 오후 5시      | 작업 진행 내용 공유 및 회고                    |
| 🌙 오후 6시 이후 | 디스코드 모각코 자율 개발                      |
| 📚 상시          | 데일리 로그 작성                               |

---

## 🚀 향후 발전 방향
- 우선순위 낮은 기능 구현
- 아키텍쳐 리팩토링
- 성능 개선(캐싱 및 서버컴포넌트 리팩토링)
- 테스트 코드 작성



---

## 👥 팀원 소개

|                                                   Frontend                                                   |                                                   Frontend                                                   |                                                   Frontend                                                   |
| :----------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/8806b4c4-7452-4e57-b10f-581b82a913f3" width="120" style="border-radius:50%;" /> | <img src="https://github.com/user-attachments/assets/87ac58b9-5e45-4009-87d9-3f07c76472c0" width="120" style="border-radius:50%;" /> | <img src="https://github.com/user-attachments/assets/511e4cad-9b88-4118-8e77-296aa086b082" width="120" style="border-radius:50%;" /> |
|                                                   👑 팀장                                                    |                                                   🧑‍💻 팀원                                                    |                                                   🧑‍💻 팀원                                                    |
|                                                  **백효영**                                                  |                                                  **황유정**                                                  |                                                  **김영민**                                                  |
|                                  [GitHub](https://github.com/HyoYoung0829)                                   |                                     [GitHub](https://github.com/YooJeong01)                                     |                                   [GitHub](https://github.com/kimym98)                                    |
