import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getBook, getUrlTypeForBook } from "@/lib/data";
import { BookReaderClient } from "@/components/sections/book-reader-client";

// اجعل هذه الصفحة ديناميكية (لا تُعرض مسبقًا كـ SSG)
export const dynamic = "force-dynamic";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ locale: string; bookNumber: string }>;
}) {
  const { locale, bookNumber: bookNumStr } = await params;
  setRequestLocale(locale);

  const bookNumber = parseInt(bookNumStr, 10);
  if (isNaN(bookNumber)) notFound();

  const book = getBook(bookNumber);
  if (!book) notFound();

  const urlType = getUrlTypeForBook(bookNumber);
  if (!urlType) notFound();

  return (
    <BookReaderClient
      bookNumber={bookNumber}
      urlType={urlType}
      bookName={book.bookName}
      bookAuthor={book.author}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; bookNumber: string }>;
}) {
  const { bookNumber: bookNumStr } = await params;
  const bookNumber = parseInt(bookNumStr, 10);
  if (isNaN(bookNumber)) return {};

  const { getBook } = await import("@/lib/data");
  const book = getBook(bookNumber);
  if (!book) return {};

  return {
    title: book.bookName,
    description: `${book.bookFullName} — ${book.author}`,
  };
}
