"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  ChevronLeft,
  ChevronRight,
  List,
  X,
  AlertCircle,
  BookOpen,
  ZoomIn,
  ZoomOut,
  Type,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { flattenToc } from "@/lib/data";
import { saveLastRead } from "@/lib/last-read";
import { BookCover } from "@/components/ui/book-cover";
import type { BookInfo, PageContent, TocItem, BookContent } from "@/lib/types";
import { cn } from "@/lib/utils";

const FONT_MIN = 0.85;
const FONT_MAX = 1.6;
const FONT_STEP = 0.1;
const FONT_KEY = "alheekmah-book-fontsize";

interface BookReaderClientProps {
  bookNumber: number;
  urlType: string;
  bookName: string;
  bookAuthor: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function BookReaderClient({
  bookNumber,
  urlType,
  bookName,
  bookAuthor,
}: BookReaderClientProps) {
  const t = useTranslations();
  const locale = useLocale();

  const [content, setContent] = useState<BookContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageContent | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [tocOpen, setTocOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [toc, setToc] = useState<TocItem[]>([]);

  const [fontScale, setFontScale] = useState<number>(() => {
    if (typeof window === "undefined") return 1.1;
    const saved = parseFloat(localStorage.getItem(FONT_KEY) ?? "1.1");
    return isNaN(saved) ? 1.1 : Math.min(FONT_MAX, Math.max(FONT_MIN, saved));
  });

  // جلب الكتاب كاملًا من المتصفح (fetch مباشر)
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    const urlParams = new URLSearchParams(window.location.search);
    const initialPageNum = parseInt(urlParams.get("page") ?? "1", 10);
    // جرّب proxy أولاً، وإن فشل جرّب R2 مباشرة
    const proxyUrl = `/r2-books/${urlType}/${bookNumber}.json`;
    const directUrl = `https://pub-527cd05a026a41dc9348c1e0c66bc0a6.r2.dev/${urlType}/${bookNumber}.json`;

    async function loadBook() {
      let text: string | null = null;

      // محاولة 1: R2 مباشرة (الأسرع في dev)
      try {
        const res = await fetch(directUrl);
        if (res.ok) text = await res.text();
      } catch (e) {
        console.log("[BookReader] Direct fetch failed, trying proxy:", e);
      }

      // محاولة 2: proxy محلي
      if (!text) {
        try {
          const res = await fetch(proxyUrl);
          if (res.ok) text = await res.text();
        } catch (e) {
          console.log("[BookReader] Proxy fetch also failed:", e);
        }
      }

      if (cancelled || !text) {
        if (!cancelled) {
          console.error("[BookReader] Failed to load from both proxy and direct URLs");
          setError(true);
          setLoading(false);
        }
        return;
      }

      try {
        if (cancelled) return;
        const parsed = JSON.parse(text);
        const item = Array.isArray(parsed) ? parsed[0] : parsed;
        if (!item?.info || !item?.pages) throw new Error("Invalid book data");

        const data: BookContent = { info: item.info, pages: item.pages };
        setContent(data);
        setToc(flattenToc(data.info.toc || []));
        const startPage =
          !isNaN(initialPageNum) && initialPageNum > 1
            ? data.pages.find((p) => p.page_number === initialPageNum) ?? data.pages[0]
            : data.pages[0];
        setCurrentPage(startPage);
        setPageNum(startPage?.page_number ?? 1);
        setLoading(false);
        saveLastRead({
          bookNumber,
          bookName,
          bookAuthor,
          urlType,
          page: startPage?.page_number ?? 1,
          totalPages: data.pages.length,
        });
      } catch (e) {
        if (!cancelled) {
          console.error("[BookReader] Parse error:", e);
          setError(true);
          setLoading(false);
        }
      }
    }

    loadBook();

    return () => {
      cancelled = true;
    };
  }, [bookNumber, urlType]);

  const changeFontSize = (delta: number) => {
    setFontScale((prev) => {
      const next = Math.min(FONT_MAX, Math.max(FONT_MIN, prev + delta));
      localStorage.setItem(FONT_KEY, String(next));
      return next;
    });
  };

  const fetchPage = useCallback(
    async (target: number) => {
      if (!content || target < 1 || target > content.pages.length) return;
      setPageLoading(true);
      setPageError(false);
      try {
        // الكتاب كامل محمّل في الذاكرة — ابحث عن الصفحة مباشرة
        const page = content.pages.find((p) => p.page_number === target);
        if (!page) throw new Error("page not found");
        setCurrentPage(page);
        setPageNum(page.page_number);
        // حدّث "آخر قراءة" بالصفحة الجديدة
        saveLastRead({
          bookNumber,
          bookName,
          bookAuthor,
          urlType,
          page: page.page_number,
          totalPages: content.pages.length,
        });
        const el = document.getElementById("book-content");
        if (el) (el as HTMLElement).scrollTo({ top: 0, behavior: "smooth" });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        setPageError(true);
      } finally {
        setPageLoading(false);
      }
    },
    [content, bookNumber, urlType],
  );

  const handleTocClick = (page: number) => {
    setTocOpen(false);
    fetchPage(page);
  };

  // التنقّل بالكيبورد
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
      if (isInput || tocOpen || pageLoading || !content) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        fetchPage(pageNum + 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        fetchPage(pageNum - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pageNum, content, tocOpen, pageLoading, fetchPage]);

  // ===== شاشة التحميل الأولية =====
  if (loading) {
    return <InitialLoading bookName={bookName} t={t} />;
  }

  if (error || !content) {
    return (
      <div className="container-x py-20 text-center">
        <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
        <h1 className="mb-3 font-display text-2xl font-bold text-ink">{t("book_unavailable_title")}</h1>
        <p className="mb-6 text-ink-soft">{t("book_unavailable_desc")}</p>
        <Link
          href="/books"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald px-5 py-2.5 font-bold text-paper"
        >
          {t("book_back_to_library")}
        </Link>
      </div>
    );
  }

  const totalPages = content.pages.length;

  return (
    <div className="container-x py-8">
      {/* رأس الكتاب */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-rule pb-5">
        <div className="flex items-start gap-4">
          <BookCover bookName={bookName} size="lg" className="flex-shrink-0 shadow-lg" />
          <div>
            <h1 className="font-display text-2xl font-bold leading-tight text-ink">{bookName}</h1>
            <p className="mt-1 text-[0.92rem] font-semibold text-emerald">{bookAuthor}</p>
            <p className="mt-1 text-[0.78rem] text-ink-faint">
              {t("book_page")} {pageNum} {t("book_of")} {totalPages.toLocaleString(locale === "ar" ? "ar-EG" : "en")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTocOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-rule bg-paper px-4 py-2 text-[0.86rem] font-semibold text-ink-soft transition-colors hover:border-emerald hover:text-emerald"
          >
            <List className="h-4 w-4" />
            {t("book_toc")}
          </button>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-xl border border-rule bg-paper px-4 py-2 text-[0.86rem] font-semibold text-ink-soft transition-colors hover:border-emerald hover:text-emerald"
          >
            <X className="h-4 w-4" />
            {t("book_back")}
          </Link>
        </div>
      </div>

      {/* شريط الأدوات */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rule bg-paper p-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => fetchPage(pageNum - 1)}
            disabled={pageNum <= 1 || pageLoading}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.86rem] font-semibold text-ink-soft transition-colors hover:bg-bg hover:text-emerald disabled:opacity-40"
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
                if (!isNaN(v) && v !== currentPage?.page_number) fetchPage(v);
              }}
              onKeyDown={(e) => e.key === "Enter" && fetchPage(pageNum)}
              className="w-20 rounded-lg border border-rule bg-bg px-3 py-1.5 text-center text-[0.86rem] outline-none focus:border-emerald"
            />
            <span className="text-[0.82rem] text-ink-faint">/ {totalPages.toLocaleString(locale === "ar" ? "ar-EG" : "en")}</span>
          </div>
          <button
            onClick={() => fetchPage(pageNum + 1)}
            disabled={pageNum >= totalPages || pageLoading}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.86rem] font-semibold text-ink-soft transition-colors hover:bg-bg hover:text-emerald disabled:opacity-40"
          >
            {t("book_next")}
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
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
      <article id="book-content" className="min-h-[50vh] rounded-2xl border border-rule bg-paper p-6 lg:p-10">
        {pageLoading ? (
          <div className="flex flex-col items-center justify-center gap-5 py-20">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-2xl bg-emerald/20" />
              <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-emerald/10 text-emerald">
                <BookOpen className="h-8 w-8" strokeWidth={1.5} />
              </div>
            </div>
            <div className="text-center">
              <p className="font-display text-lg font-bold text-ink">{t("book_loading")}</p>
              <div className="mt-2 flex items-center justify-center gap-1.5">
                <span className="h-2 w-2 animate-bounce rounded-full bg-emerald [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-emerald [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-emerald" />
              </div>
            </div>
          </div>
        ) : pageError ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-red-700">
            <AlertCircle className="h-8 w-8" />
            <p className="text-[0.9rem]">{t("book_error")}</p>
            <button
              onClick={() => fetchPage(pageNum)}
              className="mt-2 rounded-lg bg-emerald px-4 py-2 text-[0.82rem] font-bold text-paper"
            >
              {t("book_retry")}
            </button>
          </div>
        ) : currentPage ? (
          <div
            className="book-content prose-rtl max-w-none font-quran leading-loose text-ink"
            style={{ fontSize: `${fontScale}rem` }}
            dangerouslySetInnerHTML={{ __html: currentPage.text }}
          />
        ) : null}
      </article>

      {/* تنقّل سفلي */}
      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={() => fetchPage(pageNum - 1)}
          disabled={pageNum <= 1 || pageLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-deep px-5 py-2.5 text-[0.86rem] font-bold text-paper transition-colors hover:bg-emerald disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
          {t("book_prev")}
        </button>
        <button
          onClick={() => fetchPage(pageNum + 1)}
          disabled={pageNum >= totalPages || pageLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-emerald to-emerald-bright px-5 py-2.5 text-[0.86rem] font-bold text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-40"
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
              <h3 className="font-display text-xl font-bold text-ink">{t("book_toc")}</h3>
              <button
                onClick={() => setTocOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full bg-bg text-ink-soft hover:bg-paper-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-0.5">
              {toc.length === 0 ? (
                <p className="py-8 text-center text-[0.86rem] text-ink-faint">{t("book_toc_empty")}</p>
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
                        : "text-ink-soft hover:bg-bg hover:text-emerald",
                    )}
                  >
                    <span className="block leading-snug">{item.text}</span>
                    <span className="mt-0.5 block text-[0.7rem] text-ink-faint">{t("book_page")} {item.page}</span>
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
   شاشة التحميل الأولية (أثناء جلب الكتاب كاملًا)
   ========================================================================== */
function InitialLoading({ bookName, t }: { bookName: string; t: (key: string) => string }) {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center gap-6 py-20">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-3xl bg-emerald/20" />
        <div className="relative">
          <BookCover bookName={bookName} size="lg" className="opacity-90" />
        </div>
      </div>
      <div className="text-center">
        <h2 className="font-display text-xl font-bold text-ink">{t("book_opening")}</h2>
        <p className="mt-1.5 text-[0.86rem] text-ink-faint">{t("book_opening_desc")}</p>
        <div className="mt-4 flex items-center justify-center gap-1.5">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-emerald [animation-delay:-0.3s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-emerald [animation-delay:-0.15s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-emerald" />
        </div>
      </div>
    </div>
  );
}
