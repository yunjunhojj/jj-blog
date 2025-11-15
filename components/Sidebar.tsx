import Link from "next/link";
import { getLatestPosts, getAllTags } from "@/lib/posts";
import { getAllInterviews } from "@/lib/interviews";
import Image from "next/image";
import LinkedInIcon from "@/icons/linkedin.svg";
import GitHubIcon from "@/icons/github.svg";
import EmailIcon from "@/icons/email.svg";
import DailyInterview from "./DailyInterview";

export default function Sidebar() {
  const recentPosts = getLatestPosts(4);
  const tags = getAllTags();
  const allInterviews = getAllInterviews();

  return (
    <aside className="space-y-8">
      {/* Author Profile */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Image src="/images/me.jpeg" alt="Profile" width={80} height={80} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
            윤준호 (JJ)
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            프론트엔드 개발자
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            웹 기술과 사용자 경험에 관심이 많은 개발자입니다. <br />
            새로운 기술을 배우고 공유하는 것을 좋아합니다.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a
              href="https://www.linkedin.com/in/junho-yun-b91721135/"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/yunjunhojj"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href="mailto:yunjunhojj@gmail.com"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              aria-label="Email"
            >
              <EmailIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Daily Interview */}
      <DailyInterview interviews={allInterviews} />

      {/* Recent Posts */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          최근 포스트
        </h3>
        <ul className="space-y-3">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <span className="line-clamp-1 flex-1">{post.title}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                    {post.date}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/posts"
          className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          모든 포스트 보기 →
        </Link>
      </div>

      {/* Tags */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          태그
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/?tag=${encodeURIComponent(tag)}`}
              className="px-3 py-1.5 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
