import Image from "next/image";
import LinkedInIcon from "@/icons/linkedin.svg";
import GitHubIcon from "@/icons/github.svg";
import EmailIcon from "@/icons/email.svg";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 py-12">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
            <Image
              src="/images/me.jpeg"
              alt="윤준호 프로필"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              윤준호
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              Frontend Developer
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <a
                href="tel:010-8977-4552"
                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                📞 010-8977-4552
              </a>
              <a
                href="mailto:yunjunhojj@gmail.com"
                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center gap-2"
              >
                <EmailIcon className="h-4 w-4" />
                yunjunhojj@gmail.com
              </a>
              <a
                href="https://github.com/yunjunhojj"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center gap-2"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/junho-yun-b91721135/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center gap-2"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="https://antennasm.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                🌐 블로그
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          About Me
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-800">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            대규모 지도 데이터 렌더링 병목을 해결해 안정적인 UX를 확보하고, 개발
            프로세스와 아키텍처 전반을 주도했습니다. 기능 개발부터 배포 및
            필요에 따라서는 풀스택 개발까지 진행하면서 프로덕트에 도움이 되는
            것을 즐깁니다.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            새로운 기술을 단순히 적용하는 데 그치지 않고, 팀의 생산성과 사용자
            경험을 동시에 향상시키는 방법을 고민합니다. Next.js 기반으로
            플랫폼을 재설계해 SSR 기반 성능 향상을 지원하고, 사내 프로젝트를
            React로 통일했습니다.
          </p>
        </div>
      </section>

      {/* Work Experience */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Work Experience
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-800">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                회사명: Loplat (Frontend Developer)
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                2023.05 ~ 재직중
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              위치 기반 데이터 활용 광고 솔루션 서비스
            </p>
          </div>

          {/* Projects */}
          <div className="space-y-6">
            {/* Vue2 to Next.js Migration */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Vue2에서 Next.js(pages router)로 마이그레이션 및 TypeScript 도입
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
                <li>
                  CSR 기반 환경에서 검색 노출이 어려운 문제를 해결하기 위해
                  Next.js로 전환, SSR/SSG 전략을 설계
                </li>
                <li>
                  iframe + postMessage 브리지를 설계해 무중단 마이그레이션 진행
                </li>
                <li>
                  JavaScript에서 TypeScript로 마이그레이션하여 타입 안정성과
                  코드 유지보수성을 향상
                </li>
                <li>
                  React Query를 도입해 서버 상태를 일관되게 관리하고, 불필요한
                  API 호출을 제거
                </li>
              </ul>
            </div>

            {/* Map Performance Optimization */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                지도 성능 최적화
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
                <li>
                  <strong>Situation:</strong> 500개 이상의 마커와 폴리곤 렌더링
                  시 브라우저 프로세스 크래시(Out Of Memory) 발생
                </li>
                <li>
                  <strong>Improvement:</strong> 가시 영역 기반 렌더링 가상화 및
                  클러스터링 기법을 적용하여 3,000개 이상 아이템 안정적 렌더링
                  가능
                </li>
              </ul>
            </div>

            {/* Internal Admin Site Improvement */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                사내 Admin 사이트 개선
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
                <li>
                  Vite로 마이그레이션하여 빌드 속도 개선 (약 60% 단축, 3분 →
                  1분)
                </li>
                <li>
                  Playwright 기반 E2E 테스트 환경 구축, QA 팀이 독립적으로
                  테스트 실행 가능하도록 지원
                </li>
                <li>
                  Docusaurus + Bitbucket API를 활용한 자동 문서 빌드 및 배포
                  파이프라인 구성, 클라이언트 문서 업데이트 리드타임 단축
                </li>
                <li>
                  Node.js fs를 활용한 상단 네비게이션 및 문서 자동 삽입 시스템
                  개발
                </li>
              </ul>
            </div>

            {/* LLM Chatbot */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                LLM 기반 챗봇 풀스택 개발
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
                <li>
                  Prompt 및 RAG 문서를 동적으로 가져오는 CRUD 풀스택 개발
                  (Backend: Fast API)
                </li>
                <li>
                  Next.js App Router 기반으로 개발하고 Server-Sent Events(SSE)
                  스트리밍 채팅 구현
                </li>
                <li>
                  LangChain + LangSmith Dataset 기반 자동 응답 정확도 평가
                  파이프라인 구축
                </li>
              </ul>
            </div>

            {/* Map-based Data Visualization */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                지도 기반 데이터 시각화 솔루션 공급
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
                <li>
                  OpenAPI Generator를 활용한 클라이언트 코드 자동 생성으로
                  클라이언트 코드 응답 속도 개선
                </li>
                <li>
                  TMAP 지도에 도로 교통량 데이터를 polyline으로 시각화하고,
                  hover/click 이벤트 최적화를 통해 렌더링 안정성 확보
                </li>
                <li>
                  URL 파라미터로 필터 상태를 관리하여 데이터 공유 및 재현성 향상
                </li>
              </ul>
            </div>

            {/* Footprint Research Lab */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                발자국 연구소
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
                <li>
                  Tailwind v4 기반 디자인 시스템 구축 및 타이포그래피/토큰 기반
                  컬러 시스템 설계
                </li>
                <li>
                  D3.js로 실시간 차트 구현 및 리스트 가상화 최적화로 2,000개
                  이상 데이터 지연 없이 검색 가능
                </li>
                <li>
                  동적 sitemap + SSG로 SEO 개선, cursor 기반 API로 주기적 데이터
                  업데이트 자동화
                </li>
              </ul>
            </div>

            {/* FE Development Environment Improvement */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                FE 개발 환경 개선
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
                <li>Cloud Build + Cloud Run 기반 CI/CD 파이프라인 설계</li>
                <li>
                  Artifact Registry cache(buildx cache) 활용으로 빌드 속도 약
                  40% 개선 (10분 → 6분)
                </li>
                <li>
                  Emotion 기반 디자인 시스템 유지보수 및 공통 UI 컴포넌트 품질
                  지속 개선
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 그외 이력 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Others
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-800">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
              한국해양대학교 전파공학과
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              2013 ~ 2019
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
              RF 안테나 연구원
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              2019 ~ 2022
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
