"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  ChevronLeft,
  ChevronRight,
  List,
  X,
  Loader2,
  AlertCircle,
  BookOpen,
  ZoomIn,
  ZoomOut,
  Type,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { flattenToc, fetchBookPageClient } from "@/lib/data";
import { BookCover } from "@/components/ui/book-cover";
import type { BookInfo, PageContent, TocItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BookReaderProps {
  bookNumber: number;
  urlType: string;
  bookName: string;
  bookAuthor: string;
  info: BookInfo;
  totalPages: number;
  initialPage: PageContent;
  toc: TocItem[];
}

const FONT_MIN = 0.85;
const FONT_MAX = 1.6;
const FONT_STEP = 0.1;
const FONT_KEY = "alheekmah-book-fontsize";

export function BookReader({
  bookNumber,
  urlType,
  bookName,
  bookAuthor,
  info,
  totalPages,
  initialPage,
  toc,
}: BookReaderProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageNum, setPageNum] = useState(initialPage.page_number);
  const [tocOpen, setTocOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // حجم الخط (يُحفظ في localStorage)
  const [fontScale, setFontScale] = useState<number>(() => {
    if (typeof window === "undefined") return 1.1;
    const saved = parseFloat(localStorage.getItem(FONT_KEY) ?? "1.1");
    return isNaN(saved) ? 1.1 : Math.min(FONT_MAX, Math.max(FONT_MIN, saved));
  });

  const changeFontSize = (delta: number) => {
    setFontScale((prev) => {
      const next = Math.min(FONT_MAX, Math.max(FONT_MIN, prev + delta));
      localStorage.setItem(FONT_KEY, String(next));
      return next;
    });
  };

  const fetchPage = async (target: number) => {
    if (target < 1 || target > totalPages) return;
    setLoading(true);
    setError(false);
    try {
      const result = await fetchBookPageClient(bookNumber, target, urlType);
      if (!result) throw new Error("failed");
      setCurrentPage(result.page);
      setPageNum(result.page.page_number);
      const content = document.getElementById("book-content");
      if (content) (content as HTMLElement).scrollTo({ top: 0, behavior: "smooth" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleTocClick = (page: number) => {
    setTocOpen(false);
    fetchPage(page);
  };

  // التنقّل بالكيبورد (أسهم يمين/يسار) — مرتبط بـ window ليعمل دائمًا
  // يتجاهل الأحداث عندما يكون التركيز داخل حقل إدخال أو textarea
  const onKeyNav = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isInput || tocOpen || loading) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        fetchPage(pageNum + 1); // RTL: يسار = التالي
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        fetchPage(pageNum - 1); // RTL: يمين = السابق
      }
    },
    [pageNum, totalPages, tocOpen, loading],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyNav);
    return () => window.removeEventListener("keydown", onKeyNav);
  }, [onKeyNav]);

  return (
    <div className="container-x py-8">
      {/* رأس الكتاب */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-rule pb-5">
        <div className="flex items-start gap-4">
          {/* غلاف الكتاب بزخارف إسلامية */}
          <BookCover bookName={bookName} size="lg" className="flex-shrink-0 shadow-lg" />
          <div>
            <h1 className="font-display text-2xl font-bold leading-tight text-ink">
              {bookName}
            </h1>
            <p className="mt-1 text-[0.92rem] font-semibold text-emerald">
              {bookAuthor}
            </p>
            <p className="mt-1 text-[0.78rem] text-ink-faint">
              {t("book_page")} {pageNum} {t("book_of")}{" "}
              {totalPages.toLocaleString(locale === "ar" ? "ar-EG" : "en")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTocOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-rule bg-paper px-4 py-2 text-[0.86rem] font-semibold text-ink-soft transition-colors hover:border-emerald hover:text-emerald-deep"
          >
            <List className="h-4 w-4" />
            {t("book_toc")}
          </button>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-xl border border-rule bg-paper px-4 py-2 text-[0.86rem] font-semibold text-ink-soft transition-colors hover:border-emerald hover:text-emerald-deep"
          >
            <X className="h-4 w-4" />
            {t("book_back")}
          </Link>
        </div>
      </div>

      {/* شريط الأدوات: التنقل + حجم الخط */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rule bg-paper p-3">
        {/* التنقل السابق/التالي */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => fetchPage(pageNum - 1)}
            disabled={pageNum <= 1 || loading}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.86rem] font-semibold text-ink-soft transition-colors hover:bg-bg hover:text-emerald-deep disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
            {t("book_prev")}
          </button>

          <div className="flex items-center gap-2 px-2">
            <input
              type="number"
              min={1}
              max={totalPages}
              value={pageNum}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (!isNaN(v)) setPageNum(v);
              }}
              onBlur={(e) => {
                const v = parseInt(e.target.value, 10);
                if (!isNaN(v) && v !== currentPage.page_number) fetchPage(v);
              }}
              onKeyDown={(e) => e.key === "Enter" && fetchPage(pageNum)}
              className="w-20 rounded-lg border border-rule bg-bg px-3 py-1.5 text-center text-[0.86rem] outline-none focus:border-emerald"
            />
            <span className="text-[0.82rem] text-ink-faint">
              / {totalPages.toLocaleString(locale === "ar" ? "ar-EG" : "en")}
            </span>
          </div>

          <button
            onClick={() => fetchPage(pageNum + 1)}
            disabled={pageNum >= totalPages || loading}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.86rem] font-semibold text-ink-soft transition-colors hover:bg-bg hover:text-emerald-deep disabled:opacity-40"
          >
            {t("book_next")}
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* تحكم حجم الخط */}
        <div className="flex items-center gap-1 rounded-lg border border-rule bg-bg p-1">
          <button
            onClick={() => changeFontSize(-FONT_STEP)}
            disabled={fontScale <= FONT_MIN}
            aria-label={t("book_font_smaller")}
            className="grid h-8 w-8 place-items-center rounded-md text-ink-soft transition-colors hover:bg-paper hover:text-emerald disabled:opacity-40"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="flex items-center gap-1 px-1 text-[0.72rem] font-semibold text-ink-faint">
            <Type className="h-3 w-3" />
            {Math.round(fontScale * 100)}%
          </span>
          <button
            onClick={() => changeFontSize(FONT_STEP)}
            disabled={fontScale >= FONT_MAX}
            aria-label={t("book_font_larger")}
            className="grid h-8 w-8 place-items-center rounded-md text-ink-soft transition-colors hover:bg-paper hover:text-emerald disabled:opacity-40"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* محتوى الصفحة */}
      <article
        id="book-content"
        className="min-h-[50vh] rounded-2xl border border-rule bg-paper p-6 lg:p-10"
      >
        {loading ? (
          <LoadingState t={t} />
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-red-700">
            <AlertCircle className="h-8 w-8" />
            <p className="text-[0.9rem]">{t("book_error")}</p>
            <button
              onClick={() => fetchPage(pageNum)}
              className="mt-2 rounded-lg bg-emerald px-4 py-2 text-[0.82rem] font-bold text-paper-fixed"
            >
              {t("book_retry")}
            </button>
          </div>
        ) : (
          <div
            className="book-content prose-rtl max-w-none font-quran leading-loose text-ink"
            style={{ fontSize: `${fontScale}rem` }}
            dangerouslySetInnerHTML={{ __html: currentPage.text }}
          />
        )}
      </article>

      {/* تنقّل سفلي */}
      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={() => fetchPage(pageNum - 1)}
          disabled={pageNum <= 1 || loading}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-deep px-5 py-2.5 text-[0.86rem] font-bold text-paper-fixed transition-colors hover:bg-emerald disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
          {t("book_prev")}
        </button>
        <button
          onClick={() => fetchPage(pageNum + 1)}
          disabled={pageNum >= totalPages || loading}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-emerald to-emerald-bright px-5 py-2.5 text-[0.86rem] font-bold text-paper-fixed transition-transform hover:-translate-y-0.5 disabled:opacity-40"
        >
          {t("book_next")}
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      {/* نافذة الفهرس */}
      {tocOpen && (
        <div
          className="fixed inset-0 z-[100] flex justify-end bg-black/50 backdrop-blur-sm"
          onClick={() => setTocOpen(false)}
        >
          <div
            data-lenis-prevent
            className="h-full w-full max-w-md overflow-y-auto bg-paper p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between border-b border-rule pb-4">
              <h3 className="font-display text-xl font-bold text-ink">
                {t("book_toc")}
              </h3>
              <button
                onClick={() => setTocOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full bg-bg text-ink-soft hover:bg-paper-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-0.5">
              {toc.length === 0 ? (
                <p className="py-8 text-center text-[0.86rem] text-ink-faint">
                  {t("book_toc_empty")}
                </p>
              ) : (
                toc.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleTocClick(item.page)}
                    style={{ paddingInlineStart: `${item.depth * 16 + 12}px` }}
                    className={cn(
                      "rounded-lg px-3 py-2 text-start text-[0.86rem] transition-colors",
                      item.depth === 0
                        ? "font-bold text-ink hover:bg-bg"
                        : "text-ink-soft hover:bg-bg hover:text-emerald-deep",
                    )}
                  >
                    <span className="block leading-snug">{item.text}</span>
                    <span className="mt-0.5 block text-[0.7rem] text-ink-faint">
                      {t("book_page")} {item.page}
                    </span>
                  </button>
                ))
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   شاشة التحميل أثناء جلب الصفحة
   ========================================================================== */
function LoadingState({ t }: { t: (key: string) => string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20">
      {/* أيقونة كتاب بنبضات */}
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-2xl bg-emerald/20" />
        <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-emerald/10 text-emerald">
          <BookOpen className="h-8 w-8" strokeWidth={1.5} />
        </div>
      </div>

      {/* نص */}
      <div className="text-center">
        <p className="font-display text-lg font-bold text-ink">
          {t("book_loading")}
        </p>
        <div className="mt-2 flex items-center justify-center gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-emerald [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-emerald [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-emerald" />
        </div>
      </div>
    </div>
  );
}

// مساعد لتسطيح الفهرس
export function prepareToc(info: BookInfo): TocItem[] {
  if (!info.toc || !Array.isArray(info.toc)) return [];
  return flattenToc(info.toc);
}
