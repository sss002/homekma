# GenAI Learn — Interactive Demo

로컬에서 실행하려면:

1. 의존성 설치

```bash
npm install
```

2. 개발 서버 시작

```bash
npm run dev
```

이 프로젝트는 Vite + React + TailwindCSS 기반의 단일 컴포넌트 데모입니다. Framer Motion과 Lucide 아이콘을 사용합니다.
# homekma
homekma
---

외부에서 파일을 바로 볼 수 있는 URL 템플릿

아래는 저장소 파일을 외부에서(예: GitHub 웹 뷰 또는 raw) 열람할 수 있는 URL 템플릿과 간단한 설명입니다. `OWNER`, `REPO`, `BRANCH`를 실제 값으로 바꿔 사용하세요 (예: `BRANCH`는 보통 `main` 또는 `master`).

GitHub 파일 보기(웹):
https://github.com/OWNER/REPO/blob/BRANCH/path/to/file

직접 원시(raw) 보기(원시 콘텐츠):
https://raw.githubusercontent.com/OWNER/REPO/BRANCH/path/to/file

파일 목록

- `ai_studio_code_lifeninvest.html` : AI 스튜디오 관련 데모/샘플 HTML 페이지.
	- 보기(웹): https://github.com/OWNER/REPO/blob/BRANCH/ai_studio_code_lifeninvest.html
	- raw: https://raw.githubusercontent.com/OWNER/REPO/BRANCH/ai_studio_code_lifeninvest.html
- `index.html` : 애플리케이션의 기본 HTML 엔트리 파일.
	- 보기(웹): https://github.com/OWNER/REPO/blob/BRANCH/index.html
	- raw: https://raw.githubusercontent.com/OWNER/REPO/BRANCH/index.html
- `package.json` : 프로젝트 의존성과 실행/빌드 스크립트 정의.
	- 보기(웹): https://github.com/OWNER/REPO/blob/BRANCH/package.json
	- raw: https://raw.githubusercontent.com/OWNER/REPO/BRANCH/package.json
- `postcss.config.cjs` : PostCSS 구성 파일 (빌드 시 CSS 처리 설정).
	- 보기(웹): https://github.com/OWNER/REPO/blob/BRANCH/postcss.config.cjs
	- raw: https://raw.githubusercontent.com/OWNER/REPO/BRANCH/postcss.config.cjs
- `tailwind.config.cjs` : Tailwind CSS 설정 파일.
	- 보기(웹): https://github.com/OWNER/REPO/blob/BRANCH/tailwind.config.cjs
	- raw: https://raw.githubusercontent.com/OWNER/REPO/BRANCH/tailwind.config.cjs

src 폴더

- `src/App.jsx` : React 컴포넌트(주요 UI 컴포넌트).
	- 보기(웹): https://github.com/OWNER/REPO/blob/BRANCH/src/App.jsx
	- raw: https://raw.githubusercontent.com/OWNER/REPO/BRANCH/src/App.jsx
- `src/main.jsx` : 앱 진입점(JSX/React 초기화 및 렌더링).
	- 보기(웹): https://github.com/OWNER/REPO/blob/BRANCH/src/main.jsx
	- raw: https://raw.githubusercontent.com/OWNER/REPO/BRANCH/src/main.jsx
- `src/index.css` : 전역 CSS(또는 Tailwind 지시문 포함).
	- 보기(웹): https://github.com/OWNER/REPO/blob/BRANCH/src/index.css
	- raw: https://raw.githubusercontent.com/OWNER/REPO/BRANCH/src/index.css

유의사항
- 저장소가 비공개(private)인 경우, 외부에서 접근하려면 권한이 필요합니다.
- 실제 외부 링크를 자동으로 생성하려면 이 저장소의 GitHub 소유자(`OWNER`)와 저장소명(`REPO`), 브랜치(`BRANCH`)를 알고 있어야 합니다.

추가로 원하시면 실제 GitHub 원격 정보(`OWNER/REPO`와 `BRANCH`)를 알려주시면 README의 모든 링크를 자동으로 채워드리겠습니다.

