import { getLatestPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getLatestPosts();

  return (
    <>
      {/* Header Section */}
      <section className="mb-16">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          Hi 👋, I&apos;m Junho (JJ)
        </h1>
        <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
          저는 3년차 프론트엔드 개발자이며, React, TypeScript를 활용해서 웹
          애플리케이션을 개발합니다.
        </p>
        <p className="text-base text-gray-600 dark:text-gray-400">
          부족한 점을 보완하기 위해 공부를 하고있으며 이 블로그에서는 공부한
          내용을 정리하고 있습니다.
        </p>
      </section>

      {/* Latest Posts Section */}
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Latest Posts
          </h2>
          <Link
            href="/posts"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            Read all posts →
          </Link>
        </div>

        <div className="space-y-6">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group cursor-pointer rounded-lg p-6 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <Link href={`/posts/${post.slug}`} className="block">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.date}, {post.readTime}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
