"use client";

/**
 * إدارة "آخر قراءة" — يحفظ الكتب المفتوحة وصفحاتها في localStorage.
 * مطابق لمنطق BooksLastRead في تطبيق القرآن الكريم.
 */

export interface LastReadEntry {
  bookNumber: number;
  bookName: string;
  bookAuthor: string;
  urlType: string;
  page: number;
  totalPages: number;
  updatedAt: number; // timestamp
}

const STORAGE_KEY = "alheekmah-last-read";
const MAX_ENTRIES = 10;

export function getLastReadBooks(): LastReadEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const entries: LastReadEntry[] = JSON.parse(raw);
    return entries.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}

export function saveLastRead(entry: Omit<LastReadEntry, "updatedAt">): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getLastReadBooks();
    // أزِل الكتاب إن كان موجودًا مسبقًا (لإعادة ترتيبه في المقدمة)
    const filtered = existing.filter((e) => e.bookNumber !== entry.bookNumber);
    // أضِف في المقدمة
    const newEntry: LastReadEntry = { ...entry, updatedAt: Date.now() };
    const updated = [newEntry, ...filtered].slice(0, MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // تجاهل أخطاء localStorage (مثل امتلاء المساحة)
  }
}

export function removeFromLastRead(bookNumber: number): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getLastReadBooks();
    const filtered = existing.filter((e) => e.bookNumber !== bookNumber);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch {
    // تجاهل
  }
}
