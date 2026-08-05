// أنواع البيانات المشتركة عبر الموقع

export interface Book {
  bookNumber: number;
  bookName: string;
  bookFullName: string;
  author: string;
  aboutBook: string;
  bookType: string; // "tafsir" | "hadiths" | ... (١٨ نوعًا في v2)
  PageTotal: number;
}

// فئة كتب في collections_v2 (قسم مثل: تفسير، حديث، فقه...)
export interface BookCategory {
  type: string; // المعرف التقني: "tafsir", "hadiths", "aqeedah"...
  urlType: string; // يُستخدم في رابط التحميل: r2.dev/{urlType}/{bookNumber}.json
  booksType: Book[];
}

// بيانات الكتاب المحمّلة من GitHub (البنية الفعلية: array يبدأ من [0])
export interface BookContent {
  info: BookInfo;
  pages: PageContent[];
}

export interface BookInfo {
  title: string;
  author: string;
  about: string;
  url: string;
  id: string;
  toc: unknown[]; // متداخل بعمق
  all_pages: number;
  volumes?: Record<string, [number, number]>;
}

export interface PageContent {
  page_number: number;
  page: number;
  text: string;
}

// عنصر فهرس مسطّح بعد التحويل
export interface TocItem {
  page: number;
  text: string;
  depth: number;
}

export interface AthkarItem {
  category: string;
  count: string;
  description: string;
  reference: string;
  zekr: string;
}

/** حقل نصي متعدد اللغات من الـ API (مثل appName و body). */
export interface LocalizedField {
  lang: string;
  name?: string; // يُستخدم في appName
  value?: string; // يُستخدم في body / aboutApp
}

export interface AppInfo {
  id: number;
  /** معرّف فريد في الرابط: /download/{slug} */
  slug: string;
  /** اسم التطبيق متعدد اللغات [{lang, name}] */
  appName: LocalizedField[];
  companyName?: string;
  /** الوصف متعدد اللغات [{lang, value}] */
  body: LocalizedField[];
  /** نبذة إضافية متعددة اللغات [{lang, value}] */
  aboutApp?: LocalizedField[];
  appLogo?: string;
  appBanner?: string;
  /** معرض الصور (5 صور في الـ API الجديد) */
  banners?: string[];
  tags?: string[];
  dynamicLink?: string;
  privacyPolicyHtml?: string;
  urlAppStore?: string;
  urlPlayStore?: string;
  urlAppGallery?: string;
  urlMacAppStore?: string;
}

export interface DevelopersData {
  updatedAt: string;
  sections: DeveloperSection[];
}

export interface DeveloperSection {
  slug: "libraries" | "api" | "downloads";
  enabled: boolean;
  type: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  items: DeveloperItem[];
}

export interface DeveloperItem {
  id: string;
  enabled: boolean;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  // مكتبات
  bannerUrl?: string;
  logoUrl?: string;
  docsUrl?: string;
  githubUrl?: string;
  downloadUrl?: string;
  readmeUrl?: string;
  screenshots?: string[];
  // API
  baseUrl?: string;
  version?: string;
  endpoints?: {
    method: string;
    path: string;
    summary: { en: string; ar: string };
  }[];
}
