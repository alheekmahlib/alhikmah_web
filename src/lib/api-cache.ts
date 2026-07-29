/**
 * وحدة تخزين مؤقت للبيانات الخارجية (client-side).
 *
 * تمنع "انفجار الطلبات" عند تبديل اللغة عبر ثلاث طبقات:
 *  1) ذاكرة الوحدة (module memory) — وصول فوري أثناء الجلسة.
 *  2) localStorage مع TTL — يبقى الكاش عبر إعادة التحميل.
 *  3) AbortController مع timeout — فلا يعلّق الطلب أبداً لو تأخّر/رُفض الـ upstream.
 *
 * كما تمنع تكرار الطلب نفسه (dedupe): إن طُلب نفس الرابط مرتين متزامنتين
 * يُنفَّذ مرة واحدة ويتشارك الطرفان النتيجة.
 *
 * ملاحظة: هذه الدوال تعمل في المتصفح فقط (تُستدعى داخل useEffect).
 */

const APPS_URL = "/api/apps";
const PACKAGES_URL = "/api/packages";

/** مدة صلاحية الكاش: 10 دقائق. */
const CACHE_TTL_MS = 10 * 60 * 1000;
/** أقصى انتظار لطلب الشبكة قبل إلغائه: 8 ثوانٍ. */
const REQUEST_TIMEOUT_MS = 8000;
const CACHE_PREFIX = "alheekmah-api-cache:";

type CacheEntry<T> = { data: T; timestamp: number };

// ===== ذاكرة الوحدة =====
// خريطة الطلبات الجارية لمنع التكرار (dedupe).
const inflight = new Map<string, Promise<unknown>>();
// ذاكرة الجلسة للوصول الفوري عبر تبديل اللغة دون ضرب localStorage.
const memoryCache = new Map<string, CacheEntry<unknown>>();

/** يقرأ الكاش من ذاكرة الوحدة إن كان صالحاً (ضمن TTL). */
function readMemory<T>(url: string): T | null {
  const entry = memoryCache.get(url) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() - entry.timestamp >= CACHE_TTL_MS) return null;
  return entry.data;
}

/** يكتب القيمة في ذاكرة الوحدة + localStorage (مع Toleration للأخطاء). */
function writeCache<T>(url: string, data: T): void {
  const entry: CacheEntry<T> = { data, timestamp: Date.now() };
  memoryCache.set(url, entry);
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      CACHE_PREFIX + url,
      JSON.stringify(entry),
    );
  } catch {
    // قد يفشل (private mode / امتلاء التخزين) — نتجاهل بأمان.
  }
}

/** يقرأ الكاش من localStorage. إن كان `allowStale=false` يعيد null عند انتهاء TTL. */
function readLocal<T>(url: string, allowStale = false): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_PREFIX + url);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry<T>;
    if (!allowStale && Date.now() - entry.timestamp >= CACHE_TTL_MS) {
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

/** ينفّذ طلب الشبكة مع إلغاء تلقائي بعد REQUEST_TIMEOUT_MS. */
async function fetchWithTimeout<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * الطلب الرئيسي مع كل طبقات الحماية.
 * الترتيب: ذاكرة الوحدة → localStorage → الشبكة (مع timeout)
 * وفي حال فشل الشبكة: إرجاع بيانات قديمة إن وُجدت، وإلا رمي الخطأ.
 */
async function cachedFetch<T>(url: string): Promise<T> {
  // 1) ذاكرة الوحدة (الأسرع — صفر I/O)
  const fromMemory = readMemory<T>(url);
  if (fromMemory !== null) return fromMemory;

  // 2) dedupe: إن كان نفس الطلب جارياً، شاركه النتيجة
  const existing = inflight.get(url);
  if (existing) return (await existing) as T;

  // 3) localStorage ضمن TTL → أعد فوراً واملأ الذاكرة
  const fromLocal = readLocal<T>(url, false);
  if (fromLocal !== null) {
    memoryCache.set(url, { data: fromLocal, timestamp: Date.now() });
    return fromLocal;
  }

  // 4) نفّذ طلب الشبكة (مع timeout)
  const promise = (async () => {
    try {
      const data = await fetchWithTimeout<T>(url);
      writeCache(url, data);
      return data;
    } catch (err) {
      // عند الفشل: جرّب بيانات قديمة حتى لو منتهية الصلاحية
      const stale = readLocal<T>(url, true);
      if (stale !== null) {
        memoryCache.set(url, { data: stale, timestamp: Date.now() });
        return stale;
      }
      throw err;
    }
  })();

  inflight.set(url, promise);
  try {
    return await promise;
  } finally {
    inflight.delete(url);
  }
}

/** يجلب بيانات التطبيقات (يُرجع الاستجابة الخام من /api/apps). */
export function fetchApps<T = unknown>(): Promise<T> {
  return cachedFetch<T>(APPS_URL);
}

/** يجلب بيانات الباقات (يُرجع الاستجابة الخام من /api/packages). */
export function fetchPackages<T = unknown>(): Promise<T> {
  return cachedFetch<T>(PACKAGES_URL);
}
