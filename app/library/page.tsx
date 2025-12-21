import { getAllPosts, type PostMeta } from "@/lib/posts";
import dynamic from "next/dynamic";
import Link from "next/link";

const BookshelfScene = dynamic(
  () => import("@/components/library/BookshelfScene"),
  { ssr: false }
);

function toBooks(posts: PostMeta[]) {
  return posts.map((p) => ({ slug: p.slug, title: p.title }));
}

export default function LibraryPage() {
  const posts = getAllPosts();
  const books = toBooks(posts);

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          서재
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          책을 클릭하면 해당 글로 이동합니다.
        </p>
      </header>

      <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="h-[520px]">
          <BookshelfScene books={books} />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          전체 글 목록
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="block rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {post.title}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {post.date} · {post.readTime}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}


