import { getBookBySlug, getAllBooks } from "@/lib/books";
import Link from "next/link";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import "prismjs/themes/prism-tomorrow.css";

export async function generateStaticParams() {
  const books = getAllBooks();

  return books.map((book) => ({
    slug: book.slug,
  }));
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    return (
      <>
        <h1 className="text-gray-900 dark:text-gray-100">Book not found</h1>
        <Link
          href="/library"
          className="mt-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to library
        </Link>
      </>
    );
  }

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeCodeTitles)
    .use(rehypePrismPlus)
    .use(rehypeStringify)
    .process(book.content);
  const contentHtml = processedContent.toString();

  return (
    <div className="mx-auto" style={{ maxWidth: "632px" }}>
      <Link
        href="/library"
        className="mb-8 inline-block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      >
        ← Back to library
      </Link>

      <article>
        <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-gray-100">
          {book.title}
        </h1>

        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-4">
          <p>
            {book.date} · {book.readTime}
          </p>
        </div>

        <div
          className="prose prose-lg prose-gray dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </div>
  );
}

