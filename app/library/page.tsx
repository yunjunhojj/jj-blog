import { getAllBooks } from "@/lib/books";
import BookCard from "@/components/library/BookCard";

export default function LibraryPage() {
  const books = getAllBooks();

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          서재
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          책을 클릭하면 해당 글로 이동합니다. 책에 마우스를 올리면 읽기 상태를 설정할 수 있습니다.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          전체 글 목록
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}


