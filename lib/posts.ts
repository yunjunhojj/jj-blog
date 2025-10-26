import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dayjs from 'dayjs';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export interface PostMeta {
  title: string;
  date: string;
  readTime: string;
  slug: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  return fs.readdirSync(postsDirectory).filter((file) => 
    file.endsWith('.mdx')
  );
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    let dateStr = '';
    if (data.date) {
      if (data.date instanceof Date) {
        dateStr = dayjs(data.date).format('YYYY-MM-DD');
      } else if (typeof data.date === 'string') {
        dateStr = data.date;
      }
    }
    
    return {
      title: data.title || '',
      date: dateStr,
      readTime: data.readTime || '',
      slug: slug,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug.replace(/\.mdx$/, ''));
      if (!post) return null;
      return {
        title: post.title,
        date: post.date,
        readTime: post.readTime,
        slug: slug.replace(/\.mdx$/, ''),
      };
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
