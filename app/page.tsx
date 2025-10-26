import { getLatestPosts } from '@/lib/posts';
import dayjs from 'dayjs';

export default function Home() {
  const posts = getLatestPosts();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
            Hi 👋, I&apos;m Junho (JJ)
          </h1>
          <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
            저는 3년차 프론트엔드 개발자이며, React, TypeScript를 활용해서 웹 애플리케이션을 개발합니다.
          </p>
          <p className="text-base text-gray-600 dark:text-gray-400">
            부족한 점을 보완하기 위해 공부를 하고있으며 이 블로그에서는 공부한 내용을 정리하고 있습니다.
          </p>
        </div>

        {/* Latest Posts Section */}
        <div className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Latest Posts
            </h2>
            <a
              href="/posts"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Read all posts →
            </a>
          </div>

          <div className="space-y-6">
            {posts.map((post, index) => (
              <article
                key={index}
                className="group cursor-pointer rounded-lg p-6 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <a href={`/posts/${post.slug}`} className="block">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {post.date}, {post.readTime}
                  </p>
                </a>
              </article>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <footer className="border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {dayjs().year()} JJ Blog. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://github.com/yunjunhojj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                GitHub
              </a>
              <a
                href="https://docs.google.com/document/d/1jDKNiBXMjg1uxB-pCEq55tSLTamWRcla_7pYAH4fKCI/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                Resume
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
