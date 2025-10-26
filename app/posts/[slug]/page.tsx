import { getPostBySlug, getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';
import 'prismjs/themes/prism-tomorrow.css';

export async function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Post not found
        </h1>
        <Link
          href="/posts"
          className="mt-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to posts
        </Link>
      </>
    );
  }

  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeCodeTitles)
    .use(rehypePrismPlus)
    .use(rehypeStringify)
    .process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <>
      <Link
        href="/posts"
        className="mb-8 inline-block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      >
        ← Back to posts
      </Link>

      <article>
        <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-gray-100">
          {post.title}
        </h1>
        
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-4">
          <p>{post.date} · {post.readTime}</p>
        </div>

        <div
          className="prose prose-lg prose-gray dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </>
  );
}
