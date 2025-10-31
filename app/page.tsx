import { getLatestPosts, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

interface HomeProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const category = params?.category;

  let posts;
  let title = "최신 포스트";
  let subtitle = "개발과 관련된 최신 글들을 만나보세요";

  if (category) {
    posts = getPostsByCategory(category);
    title = `${category} 카테고리`;
    subtitle = `${category} 카테고리에 속한 포스트 ${posts.length}개`;
  } else {
    posts = getLatestPosts(6);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2">
        {/* Latest Posts Section */}
        <section className="mb-12">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
              {category && (
                <Link
                  href="/"
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  전체 보기
                </Link>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                해당 카테고리에 포스트가 없습니다.
              </p>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                전체 포스트 보기
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.slug}
                  title={post.title}
                  date={post.date}
                  readTime={post.readTime}
                  description={post.description}
                  tags={post.tags}
                  slug={post.slug}
                  image={post.image}
                  likes={post.likes}
                  comments={post.comments}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <Sidebar />
      </div>
    </div>
  );
}
