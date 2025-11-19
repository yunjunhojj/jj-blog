import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { getDefaultImage } from "@/lib/defaultImages";

export interface PostCardProps {
  title: string;
  date: string;
  readTime: string;
  description?: string;
  tags?: string[];
  slug: string;
  image?: string;
  category?: string;
}

export default function PostCard({
  title,
  date,
  readTime,
  description,
  tags = [],
  slug,
  image,
  category,
}: PostCardProps) {
  const formattedDate = dayjs(date).format("YYYY.MM.DD");
  const defaultImageConfig = getDefaultImage(category);

  return (
    <article className="group bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 dark:border-gray-800">
      <Link href={`/posts/${slug}`} className="block">
        <div className="relative w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${defaultImageConfig.gradient}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-white/80 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-white/90 text-sm font-medium">{category || "포스트"}</p>
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{readTime}</span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {title}
          </h3>

          {description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
              {description}
            </p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
