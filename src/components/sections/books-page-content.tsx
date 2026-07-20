"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Search, FileText, Clock, X } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/ui/page-header";
import { BookCover } from "@/components/ui/book-cover";
import { getAllCategories, CATEGORY_NAMES_AR } from "@/lib/data";
import { getLastReadBooks, removeFromLastRead, type LastReadEntry } from "@/lib/last-read";
import type { Book, BookCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

export function BooksPageContent() {
  const t = useTranslations();
  const categories = getAllCategories();
  const [lastRead, setLastRead] = useState<LastReadEntry[]>([]);

  useEffect(() => {
    setLastRead(getLastReadBooks());
  }, []);

  const handleRemoveLastRead = (bookNumber: number) => {
    removeFromLastRead(bookNumber);
    setLastRead(getLastReadBooks());
  };
  const [activeType, setActiveType] = useState<string>("all");
  const [query, setQuery] = useState("");

  // الكتب الحالية حسب الفئة المختارة
  const filteredBooks = useMemo(() => {
    let books: Book[] =
      activeType === "all"
        ? categories.flatMap((c) => c.booksType)
        : (categories.find((c) => c.type === activeType)?.booksType ?? []);

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      books = books.filter(
        (b) =>
          b.bookName.toLowerCase().includes(q) ||
          b.bookFullName.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q),
      );
    }
    return books;
  }, [categories, activeType, query]);

  // الفئات للتبويبات (مع "الكل")
  const tabs = useMemo(() => {
    const allTab = { type: "all", label: t("books_tab_all"), count: categories.reduce((s, c) => s + c.booksType.length, 0) };
    const catTabs = categories.map((c) => ({
      type: c.type,
      label: CATEGORY_NAMES_AR[c.type] ?? c.type,
      count: c.booksType.length,
    }));
    return [allTab, ...catTabs];
  }, [categories, t]);

  return (
    <>
      <PageHeader
        eyebrow={t("books_eyebrow")}
        title={t("books_title")}
        lede={t("books_lede")}
      />

      {/* قسم: آخر قراءة */}
      {lastRead.length > 0 && (
        <section className="container-x py-4">
          <Reveal variant="up">
            <div className="mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald" />
              <h3 className="font-display text-lg font-bold text-ink">{t("books_last_read")}</h3>
            </div>
          </Reveal>
          <div className="flex gap-3 overflow-x-auto pb-2" data-lenis-prevent>
            {lastRead.map((entry) => {
              const progress = entry.totalPages > 0 ? (entry.page / entry.totalPages) * 100 : 0;
              return (
                <Reveal key={entry.bookNumber} variant="up" delay={50}>
                  <div className="group relative flex-shrink-0">
                    <a
                      href={`/ar/books/${entry.bookNumber}?page=${entry.page}`}
                      className="block w-44 overflow-hidden rounded-xl border border-emerald/30 bg-paper p-3 transition-all hover:-translate-y-1 hover:border-emerald hover:shadow-lg"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <BookCover bookName={entry.bookName} size="sm" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[0.78rem] font-bold text-ink">{entry.bookName}</p>
                          <p className="truncate text-[0.68rem] text-emerald">{entry.bookAuthor}</p>
                        </div>
                      </div>
                      {/* شريط التقدّم */}
                      <div className="mb-1 h-1.5 overflow-hidden rounded-full bg-bg-warm">
                        <div
                          className="h-full rounded-full bg-emerald transition-all"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <p className="text-[0.66rem] text-ink-faint">
                        {t("book_page")} {entry.page} {t("book_of")} {entry.totalPages.toLocaleString("ar-EG")}
                      </p>
                    </a>
                    {/* زر حذف */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveLastRead(entry.bookNumber);
                      }}
                      aria-label="remove"
                      className="absolute -left-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-red-500/90 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* أدوات التصفية */}
      <section className="container-x py-8">
        <Reveal variant="up">
          {/* التبويبات الأفقية القابلة للتمرير */}
          <div className="mb-4 flex gap-1.5 overflow-x-auto pb-2" data-lenis-prevent>
            {tabs.map((tab) => (
              <button
                key={tab.type}
                onClick={() => setActiveType(tab.type)}
                className={cn(
                  "flex-shrink-0 rounded-lg px-3.5 py-2 text-[0.82rem] font-semibold transition-all",
                  activeType === tab.type
                    ? "bg-emerald text-paper-fixed shadow-sm"
                    : "bg-paper text-ink-soft hover:bg-emerald/10 hover:text-emerald",
                )}
              >
                {tab.label}
                <span className="mr-1.5 text-[0.7rem] opacity-70">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* البحث */}
          <div className="relative">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("books_search_placeholder")}
              className="w-full rounded-xl border border-rule bg-paper py-2.5 pr-10 pl-4 text-[0.9rem] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-emerald"
            />
          </div>
        </Reveal>
      </section>

      {/* الكتب */}
      <section className="container-x pb-16">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book, i) => (
            <Reveal key={book.bookNumber} variant="up" delay={Math.min(i * 30, 450)}>
              <BookCard book={book} t={t} />
            </Reveal>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="py-20 text-center text-ink-faint">
            <FileText className="mx-auto mb-4 h-12 w-12 opacity-40" />
            <p>{t("books_empty")}</p>
          </div>
        )}
      </section>
    </>
  );
}

function BookCard({ book, t }: { book: Book; t: (key: string) => string }) {
  return (
    <a
      href={`/ar/books/${book.bookNumber}`}
      className="group flex h-full flex-row gap-4 overflow-hidden rounded-2xl border border-rule bg-paper p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald hover:shadow-lg"
    >
      <div className="flex-shrink-0">
        <BookCover bookName={book.bookName} size="md" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <h4 className="mb-1 line-clamp-2 font-display text-[0.95rem] font-bold leading-snug text-ink transition-colors group-hover:text-emerald">
          {book.bookName}
        </h4>
        <p className="mb-2 truncate text-[0.76rem] font-semibold text-emerald">
          {book.author}
        </p>
        {book.aboutBook && (
          <p
            className="mb-2 line-clamp-2 flex-1 text-[0.76rem] leading-relaxed text-ink-soft"
            dangerouslySetInnerHTML={{ __html: stripHtml(book.aboutBook).slice(0, 90) + "…" }}
          />
        )}
        <div className="mt-auto flex items-center gap-2 pt-2 text-[0.7rem] text-ink-faint">
          <span className="rounded-md bg-bg-warm px-1.5 py-0.5 font-semibold text-emerald">
            {CATEGORY_NAMES_AR[book.bookType] ?? book.bookType}
          </span>
          <span>{book.PageTotal.toLocaleString("ar-EG")} {t("books_pages")}</span>
        </div>
      </div>
    </a>
  );
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}
