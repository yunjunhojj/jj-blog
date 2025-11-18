import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dayjs from "dayjs";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  title: string;
  date: string;
  readTime: string;
  slug: string;
  description?: string;
  tags?: string[];
  category?: string;
  image?: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
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

    return {
      title: data.title || "",
      date: dateStr,
      readTime: data.readTime || "",
      slug: slug,
      content,
      description: data.description || "",
      tags: data.tags || [],
      category: data.category || "",
      image: data.image || "",
      likes: data.likes || 0,
      comments: data.comments || 0,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug): PostMeta | null => {
      const post = getPostBySlug(slug.replace(/\.mdx$/, ""));
      if (!post) return null;
      const meta: PostMeta = {
        title: post.title,
        date: post.date,
        readTime: post.readTime,
        slug: slug.replace(/\.mdx$/, ""),
        description: post.description,
        tags: post.tags,
        category: post.category,
        image: post.image,
        likes: post.likes,
        comments: post.comments,
      };
      return meta;
    })
    .filter((post): post is PostMeta => post !== null);

  return posts.sort((a, b) => {
    return dayjs(b.date).valueOf() - dayjs(a.date).valueOf();
  });
}

export function getLatestPosts(count: number = 6): PostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, count);
}

export function getPostsByCategory(category: string): PostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = new Set<string>();
  allPosts.forEach((post) => {
    if (post.category) {
      categories.add(post.category);
    }
  });
  return Array.from(categories);
}

export function getCategoryCounts(): Record<string, number> {
  const allPosts = getAllPosts();
  const counts: Record<string, number> = {};
  allPosts.forEach((post) => {
    if (post.category) {
      counts[post.category] = (counts[post.category] || 0) + 1;
    }
  });
  return counts;
}

export function getPostsByTag(tag: string): PostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags && post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();
  allPosts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}

export function getTagCounts(): Record<string, number> {
  const allPosts = getAllPosts();
  const counts: Record<string, number> = {};
  allPosts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    }
  });
  return counts;
}
