import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dayjs from "dayjs";
import readingTime from "reading-time";

const booksDirectory = path.join(process.cwd(), "content", "books");

function calculateReadTime(content: string): string {
  const withoutCodeBlocks = content.replace(/```[\s\S]*?```/g, "");
  const withoutInlineCode = withoutCodeBlocks.replace(/`[^`]+`/g, "");
  const withoutLinks = withoutInlineCode.replace(
    /\[([^\]]+)\]\([^\)]+\)/g,
    "$1"
  );
  const withoutImages = withoutLinks.replace(/!\[([^\]]*)\]\([^\)]+\)/g, "");
  const withoutHtml = withoutImages.replace(/<[^>]+>/g, "");

  const stats = readingTime(withoutHtml);
  const minutes = Math.max(1, Math.ceil(stats.minutes));
  return `${minutes}분`;
}

export interface BookMeta {
  title: string;
  date: string;
  readTime: string;
  slug: string;
  description?: string;
  tags?: string[];
  category?: string;
  image?: string;
  readingStatus?: string; // "읽는 중", "완료", "2회독" 등
}

export interface Book extends BookMeta {
  content: string;
}

export function getBookSlugs(): string[] {
  if (!fs.existsSync(booksDirectory)) {
    return [];
  }

  const isProduction = process.env.NODE_ENV === "production";

  return fs
    .readdirSync(booksDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .filter((file) => {
      // 예시 파일은 프로덕션 빌드에서만 제외 (localhost에서는 표시)
      if (isProduction && file.startsWith("example-")) {
        return false;
      }
      return true;
    });
}

export function getBookBySlug(slug: string): Book | null {
  try {
    const fullPath = path.join(booksDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    let dateStr = "";
    if (data.date) {
      if (data.date instanceof Date) {
        dateStr = dayjs(data.date).format("YYYY-MM-DD");
      } else if (typeof data.date === "string") {
        dateStr = data.date;
      }
    }

    // readTime이 메타데이터에 없으면 자동 계산
    const readTime = data.readTime || calculateReadTime(content);

    return {
      title: data.title || "",
      date: dateStr,
      readTime,
      slug: slug,
      content,
      description: data.description || "",
      tags: data.tags || [],
      category: data.category || "",
      image: data.image || "",
      readingStatus: data.readingStatus || "",
    };
  } catch (error) {
    console.error(`Error reading book ${slug}:`, error);
    return null;
  }
}

export function getAllBooks(): BookMeta[] {
  const slugs = getBookSlugs();
  const books = slugs
    .map((slug): BookMeta | null => {
      const book = getBookBySlug(slug.replace(/\.mdx$/, ""));
      if (!book) return null;
      const meta: BookMeta = {
        title: book.title,
        date: book.date,
        readTime: book.readTime,
        slug: slug.replace(/\.mdx$/, ""),
        description: book.description,
        tags: book.tags,
        category: book.category,
        image: book.image,
        readingStatus: book.readingStatus,
      };
      return meta;
    })
    .filter((book): book is BookMeta => book !== null);

  return books.sort((a, b) => {
    return dayjs(b.date).valueOf() - dayjs(a.date).valueOf();
  });
}

export function getLatestBooks(count: number = 6): BookMeta[] {
  const allBooks = getAllBooks();
  return allBooks.slice(0, count);
}

export function getBooksByCategory(category: string): BookMeta[] {
  const allBooks = getAllBooks();
  return allBooks.filter((book) => book.category === category);
}

export function getAllCategories(): string[] {
  const allBooks = getAllBooks();
  const categories = new Set<string>();
  allBooks.forEach((book) => {
    if (book.category) {
      categories.add(book.category);
    }
  });
  return Array.from(categories);
}

export function getCategoryCounts(): Record<string, number> {
  const allBooks = getAllBooks();
  const counts: Record<string, number> = {};
  allBooks.forEach((book) => {
    if (book.category) {
      counts[book.category] = (counts[book.category] || 0) + 1;
    }
  });
  return counts;
}

export function getBooksByTag(tag: string): BookMeta[] {
  const allBooks = getAllBooks();
  return allBooks.filter((book) => book.tags && book.tags.includes(tag));
}

export function getAllTags(): string[] {
  const allBooks = getAllBooks();
  const tags = new Set<string>();
  allBooks.forEach((book) => {
    if (book.tags && Array.isArray(book.tags)) {
      book.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}

export function getTagCounts(): Record<string, number> {
  const allBooks = getAllBooks();
  const counts: Record<string, number> = {};
  allBooks.forEach((book) => {
    if (book.tags && Array.isArray(book.tags)) {
      book.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    }
  });
  return counts;
}

