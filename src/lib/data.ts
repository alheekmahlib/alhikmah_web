import collectionsData from "@/data/collections_v2.json";
import athkarData from "@/data/athkar.json";
import developersData from "@/data/developers.json";
import type {
  Book,
  BookCategory,
  BookContent,
  BookInfo,
  PageContent,
  TocItem,
  AthkarItem,
  DevelopersData,
  DeveloperSection,
} from "./types";

// ===== المكتبة الإسلامية (collections_v2) =====
const categories = collectionsData as BookCategory[];

// مصدر محتوى الكتب على R2 (Cloudflare)
// نستخدم proxy عبر rewrites في next.config.ts لتجاوز CORS:
// المتصفح يطلب /r2-books/{urlType}/{bookNumber}.json
// وNext.js يوجّه الطلب إلى R2 دون كشف النطاق الخارجي
const BOOK_R2_BASE = "/r2-books";

// ====== نظام تخزين مؤقت للكتب عبر Cache API ======
// أول فتح: يحمّل الملف كاملًا (قد يكون بطيئًا للكتب الكبيرة)
// كل فتح لاحق: فوري من Cache Storage
const CACHE_NAME = "alheekmah-books-v1";

async function getCachedBook(
  url: string,
): Promise<Array<{ info: BookInfo; pages: PageContent[] }> | null> {
  // هذه الدالة تعمل فقط في المتصفح (client-side).
  // على الخادم، الـ url النسبي "/r2-books/..." لن يعمل.
  if (typeof window === "undefined") return null;

  try {
    // 1. جرّب Cache API أولاً (الأسرع — فوري)
    if (typeof caches !== "undefined") {
      try {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(url);
        if (cached) {
          const text = await cached.text();
          const parsed = JSON.parse(text);
          return Array.isArray(parsed) ? parsed : [parsed];
        }
      } catch {
        // Cache API قد تفشل (private mode) — تابع للشبكة
      }
    }

    // 2. ابذل طلبًا للشبكة
    const res = await fetch(url);
    if (!res.ok) {
      console.error("[getCachedBook] HTTP error:", res.status, url);
      return null;
    }
    const text = await res.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.error("[getCachedBook] JSON parse error:", e);
      return null;
    }
    const data = Array.isArray(parsed) ? parsed : [parsed];

    // 3. خزّن في Cache API للاستخدام القادم
    if (typeof caches !== "undefined" && data) {
      try {
        const cache = await caches.open(CACHE_NAME);
        const responseToCache = new Response(text, {
          headers: { "Content-Type": "application/json" },
        });
        await cache.put(url, responseToCache);
      } catch {
        // تجاهل
      }
    }

    return data;
  } catch (e) {
    console.error("[getCachedBook] error:", e);
    return null;
  }
}

export function getAllCategories(): BookCategory[] {
  return categories;
}

export function getCategoryByType(type: string): BookCategory | undefined {
  return categories.find((c) => c.type === type);
}

export function getAllBooks(): Book[] {
  return categories.flatMap((c) => c.booksType);
}

export function getBooksByType(type: string): Book[] {
  const cat = getCategoryByType(type);
  return cat ? cat.booksType : [];
}

// أسماء عربية للفئات (للعرض)
export const CATEGORY_NAMES_AR: Record<string, string> = {
  tafsir: "التفسير",
  hadiths: "الحديث",
  "shuruh_al-hadiths": "شروح الحديث",
  aqeedah: "العقيدة",
  "asul_el-feqh": "أصول الفقه",
  eulum_alfiqh_wal_awaeid_alfiqhia: "علوم الفقه والعوائد الفقهية",
  fegh_hanafi: "الفقه الحنفي",
  fegh_maliki: "الفقه المالكي",
  fegh_shafii: "الفقه الشافعي",
  fegh_hanbali: "الفقه الحنبلي",
  general_fegh: "الفقه العام",
  fegh_masayil: "مسائل فقهية",
  alsiyasat_alshareiat_walqada: "السياسة الشرعية والقضاء",
  alfarayid_walwasaya: "الفرائد والوصايا",
  alraqayiq_waladab_waladhkar: "الرقائق والأدب والأذكار",
  alsiyrat_alnabawia: "السيرة النبوية",
  history: "التاريخ",
  altarajim_waltabaqat: "التراجم والطبقات",
};

export function getBook(number: number): Book | undefined {
  return getAllBooks().find((b) => b.bookNumber === number);
}

/**
 * يجد urlType (مجلد R2) لكتاب محدد عبر البحث في كل الفئات.
 */
export function getUrlTypeForBook(bookNumber: number): string | undefined {
  for (const cat of categories) {
    if (cat.booksType.some((b) => b.bookNumber === bookNumber)) {
      return cat.urlType;
    }
  }
  return undefined;
}

// ===== تحميل محتوى الكتاب من Cloudflare R2 =====
// الرابط: {R2_BASE}/{urlType}/{bookNumber}.json

/**
 * يبني رابط تحميل كتاب من R2.
 */
export function getBookContentUrl(bookNumber: number, urlType: string): string {
  return `${BOOK_R2_BASE}/${urlType}/${bookNumber}.json`;
}

/**
 * يجلب محتوى كتاب كامل (client-side، مع Cache API للأداء الفوري لاحقًا).
 */
export async function fetchBookContent(
  bookNumber: number,
  urlType: string,
): Promise<BookContent | null> {
  try {
    const url = getBookContentUrl(bookNumber, urlType);
    const raw = await getCachedBook(url);
    if (!raw) return null;
    const item = Array.isArray(raw) ? raw[0] : (raw as { info: BookInfo; pages: PageContent[] });
    if (!item?.info || !item?.pages) return null;
    return { info: item.info, pages: item.pages };
  } catch {
    return null;
  }
}

/**
 * يجلب صفحة واحدة من كتاب (client-side، يعمل على Cloudflare).
 * يستخدم Cache API — الصفحة الثانية فورية بعد أول جلب.
 */
export async function fetchBookPageClient(
  bookNumber: number,
  pageNumber: number,
  urlType: string,
): Promise<{ page: PageContent; totalPages: number } | null> {
  try {
    const url = getBookContentUrl(bookNumber, urlType);
    const raw = await getCachedBook(url);
    if (!raw) return null;
    const item = Array.isArray(raw) ? raw[0] : raw;
    if (!item?.pages) return null;
    const page = item.pages.find((p) => p.page_number === pageNumber);
    if (!page) return null;
    return { page, totalPages: item.pages.length };
  } catch {
    return null;
  }
}

/**
 * يسطّح فهرس الكتاب المتداخل إلى قائمة خطية مع مستوى التداخل (depth).
 * بنية toc معقدة: مصفوفة عناصرها إما {page,text} أو مصفوفات فرعية.
 */
export function flattenToc(toc: unknown[]): TocItem[] {
  const result: TocItem[] = [];
  function walk(items: unknown[], depth: number) {
    for (const item of items) {
      if (Array.isArray(item)) {
        walk(item, depth + 1);
      } else if (item && typeof item === "object" && "text" in item && "page" in item) {
        const obj = item as { page: number; text: string };
        result.push({ page: obj.page, text: obj.text, depth });
      }
    }
  }
  walk(toc, 0);
  return result;
}

// ===== الأذكار =====
const athkar = athkarData as {
  categories: string[];
  count: number;
  grouped: Record<string, AthkarItem[]>;
};

export function getAthkarCategories(): string[] {
  return athkar.categories;
}

export function getAthkarByCategory(category: string): AthkarItem[] {
  return athkar.grouped[category] ?? [];
}

export function getAllAthkar(): AthkarItem[] {
  return Object.values(athkar.grouped).flat();
}

// دعاء اليوم (حتمي حسب التاريخ — مطابق لمنطق Flutter الأصلي)
export function getDailyDua(date = new Date()): AthkarItem {
  const all = getAllAthkar();
  if (all.length === 0) {
    return {
      category: "",
      count: "1",
      description: "",
      reference: "",
      zekr: "",
    };
  }
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const seed = date.getFullYear() * 367 + dayOfYear;
  return all[seed % all.length];
}

// ===== المطورون =====
const developers = developersData as DevelopersData;

export function getDevelopersData(): DevelopersData {
  return developers;
}

export function getDeveloperSection(
  slug: "libraries" | "api" | "downloads",
): DeveloperSection | undefined {
  return developers.sections.find((s) => s.slug === slug && s.enabled);
}
