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
<img width="1920" height="1080" alt="'바로 BaLaw' 시스템 아키텍처" src="https://github.com/user-attachments/assets/0a9cb00f-44d5-4be5-b9ac-973887b9e711" />

---

## ⚙️ 주요 기능
### 회원 관리, 유저 세션 관리
- 일반 로그인/네이버,카카오 소셜 로그인 등 다양한 로그인 방법 제공
- 자동 로그인 제공
- Next.js 서버에서 jose라이브러리로 JWT 유효성 및 만료 검증을 수행
- Axios 인터셉터 기반의 공용 에러 처리 및 자동 토큰 재발급 구현
### AI 상담
- 채팅 목록 팝업으로 과거 채팅 이력 제공
- 유저의 프롬프트 기반으로 키워드 랭킹 제공
- AI 상담 내역 제공
- AI API의 특성 상 긴 fetch시간을 해소하기 위한 로딩
### 검색
- 통합, 법령, 판례 카테고리 검색 및 키워드 검색
- 카테고리별 필터로 상세 검색 제공
- 내용 미리보기 제공
- url기반 검색 상태 관리로 공유, 북마크 등에 최적화
- SSR을 적용해 메타 태그, 구조화 데이터 노출 등 검색엔진 최적화
### 상세
- 목차 네비게이션 (TOC) 제공
- 읽기 쉬운 글 구성 제공
- SSR을 적용해 메타 태그, 구조화 데이터 노출 등 검색엔진 최적화
### 투표
- 투표 등록, 수정, 예약 종료, 자동 마감, 중복 투표 방지 제공
- 투표 집계 및 성별, 나이별 차트를 통한 시각화
- 진행 중 / 마감 / 참여한 투표 카테고리 제공
- 무한 스크롤 및 낙관적 업데이트
### 인라인 용어 해설
- 인라인으로 용어 검색및 툴팁 해설 제공
- 드래그 / 더블 클릭 이벤트 트리거 기반 동작
### 챗봇
- 전역 상태를 기반으로 마지막 AI 상담 내역을 제공
- 사용자가 이전 대화를 보조 패널 형태로 참고하며 검색 및 상세 페이지에서 자료 탐색과 의사결정을 돕도록 구현

### 반응형 / 테마 지원
- 모바일 ~ 데스크탑 해상도까지 지원
- 라이트 / 다크모드 지원
---
## 📸 주요 기능 화면
### 회원 관리, 유저 세션 관리

### AI 상담
<table>
  <tr>
    <td>
      <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8ce65d1a-48ee-44cb-b3a9-bc3dcdb28f92" />
    </td>
    <td>
      <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7ed7cbab-03a9-4284-a078-5a352a8d7e5c" />
    </td>
  </tr>
</table>


### 검색
<table>
  <tr>
    <td>
      <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2dbbf33c-cd31-41c7-8a9d-91ef9ed6fa32" />
    </td>
    <td>
      <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b8e689de-93ff-4422-af21-232c5af01602" />
    </td>
  </tr>
</table>

### 상세
<table>
  <tr>
    <td>
      <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0e26b3e0-0908-4b08-8611-e9e819d8911b" />
    </td>
    <td>
      <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5c2c0358-fe75-4ce7-9335-f4c00e7e75bc" />
    </td>
  </tr>
</table>

### 투표
<table>
  <tr>
    <td>
      <img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/a098a0f6-87c7-45b7-abac-de7d38c0c268" />
    </td>
    <td>
      <img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/171a432b-d225-4e48-bf59-20e7dd19c3f9" />
    </td>
  </tr>
</table>

### 인라인 용어 해설 / 실시간 랭킹 / 챗봇
<table>
  <tr>
    <td>
      <img width="1704" height="857" alt="4" src="https://github.com/user-attachments/assets/2cda9aa4-998b-4ca4-b8c4-0a5513753846" />
    </td>
  </tr>
</table>

### 반응형
<table>
  <tr>
    <td>
      <img width="2923" height="854" alt="1" src="https://github.com/user-attachments/assets/ec621571-5b33-4ad9-80cb-36c0efb17047" />
    </td>
    </tr>
  <tr>
    <td>
      <img width="2938" height="865" alt="2" src="https://github.com/user-attachments/assets/890e11e0-2984-4066-aeae-cf3b7cf1ef07" />
    </td>
    </tr>
    <tr>
    <td>
      <img width="2923" height="853" alt="3" src="https://github.com/user-attachments/assets/08b1b661-ba70-4fc8-8a5c-b92829ca767b" />
    </td>
    </tr>
</table>


### 다크모드
<table>
  <tr>
    <td>
      <img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/8ada6b4a-ae9c-477a-adf3-639b2239d671" />
    </td>
    <td>
      <img width="2558" height="1400" alt="image" src="https://github.com/user-attachments/assets/4979e524-a6a5-4e1b-95f5-6c775c2edf00" />
    </td>
  </tr>
  <tr>
    <td>
      <img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/a1fdc821-0f3a-479f-859f-28105a29837a" />
    </td>
    <td>
      <img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/43cadb2a-f1dd-4e6d-8dd9-cede0152fc53" />
    </td>
  </tr>
</table>
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
| <img src="https://github.com/user-attachments/assets/8806b4c4-7452-4e57-b10f-581b82a913f3" width="120" style="border-radius:50%;" /> | <img src="https://github.com/user-attachments/assets/87ac58b9-5e45-4009-87d9-3f07c76472c0" width="120" style="border-radius:50%;" /> | <img src="https://github.com/user-attachments/assets/4dfd6a15-1429-44eb-877c-0e1d2a3e20ca" width="120" style="border-radius:50%;" /> |
|                                                   👑 팀장                                                    |                                                   🧑‍💻 팀원                                                    |                                                   🧑‍💻 팀원                                                    |
|                                                  **백효영**                                                  |                                                  **황유정**                                                  |                                                  **김영민**                                                  |
|                                  [GitHub](https://github.com/HyoYoung0829)                                   |                                     [GitHub](https://github.com/YooJeong01)                                     |                                   [GitHub](https://github.com/kimym98)                                    |
