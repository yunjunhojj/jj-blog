import Link from "next/link";
import Image from "next/image";
import type { BookMeta } from "@/lib/books";

interface BookCardProps {
  book: BookMeta;
}

function getStatusColor(status: string): string {
  if (status === "읽는 중") {
    return "bg-blue-500 text-white";
  }
  if (status === "완료") {
    return "bg-green-500 text-white";
  }
  if (status.includes("회독")) {
    return "bg-purple-500 text-white";
  }
  return "bg-gray-500 text-white";
}

export default function BookCard({ book }: BookCardProps) {
  const imageUrl = book.image
    ? book.image.startsWith("http") || book.image.startsWith("/")
      ? book.image
      : `/images/${book.image}`
    : null;

  return (
    <div className="group relative">
      <Link href={`/books/${book.slug}`} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-transform hover:scale-105">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-800">
              <div className="text-center px-4">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 line-clamp-3">
                  {book.title}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1">
              {book.title}
            </div>
            {book.readingStatus && (
              <span
                className={`inline-block px-2 py-0.5 text-xs font-medium rounded whitespace-nowrap flex-shrink-0 ${getStatusColor(book.readingStatus)}`}
              >
                {book.readingStatus}
              </span>
            )}
          </div>
          {book.description && (
            <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
              {book.description}
            </div>
          )}
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {book.date} · {book.readTime}
          </div>
        </div>
      </Link>
    </div>
  );
}
