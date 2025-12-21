"use client";

import dynamic from "next/dynamic";
import type { BookItem } from "@/components/library/BookshelfScene";

const BookshelfScene = dynamic(
  () => import("@/components/library/BookshelfScene"),
  { ssr: false }
);

export default function BookshelfClient({ books }: { books: BookItem[] }) {
  return <BookshelfScene books={books} />;
}


