/**
 * ربط التطبيقات بمكتبات Flutter المستخدمة فيها (حسب packageName في /api/packages).
 * لا يوفّر الـ API أي ربط بين التطبيقات والحزم، لذا تُعرَّف العلاقة هنا.
 * الإضافة لتطبيق جديد = سطر واحد.
 */
export const APP_PACKAGES: Record<string, string[]> = {
  quran: [
    "quran_library",
    "floating_menu_expendable",
    "hijri_date",
    "flexible_sheet",
  ],
  azkary: [
    "hijri_date",
  ],
  nahawi: [
    "hijri_date",
  ],
  sunnati: [
    "hijri_date",
  ],
  aqim: [
    "floating_menu_expendable",
    "hijri_date",
    "flexible_sheet",
  ],
  "zad-alMuslim": [
    "hijri_date",
  ],
};
