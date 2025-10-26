import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="mb-12">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            ← Back to home
          </Link>
          <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-gray-100">
            All Posts
          </h1>
        </div>

        <div className="space-y-6">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group cursor-pointer rounded-lg p-6 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <Link href={`/posts/${post.slug}`} className="block">
                <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.date}, {post.readTime}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
