import { describe, expect, it } from "vitest";
import { parseAboutBlocks, resolveAboutApp } from "@/lib/app-about";
import { getLocalizedField } from "@/lib/platform-detect";
import type { AppInfo } from "@/lib/types";

describe("parseAboutBlocks", () => {
  it("يفكّك نصًا كاملًا إلى فقرات وعناوين ونقاط (بنية aboutApp الفعلية)", () => {
    const raw = [
      "تطبيق «القرآن الكريم»: اقرأ واحفظ بفهم أعمق.",
      "",
      "يعتمد التطبيق على مصحف مجمع الملك فهد، بواجهة تُعنى بالتفاصيل:",
      "۞ مصحف كامل بلا إنترنت: حمّل السور واستمع إليها.",
      "۞ تلاوة كلمة بكلمة.",
      "",
      "۞ مداد — المساعد الذكي:",
      "۞ بحث معرفي عبر الإنترنت.",
      "",
      "من مكتبة الحكمة.",
    ].join("\n");

    expect(parseAboutBlocks(raw)).toEqual([
      { type: "paragraph", text: "تطبيق «القرآن الكريم»: اقرأ واحفظ بفهم أعمق." },
      { type: "subheading", text: "يعتمد التطبيق على مصحف مجمع الملك فهد، بواجهة تُعنى بالتفاصيل" },
      { type: "bullet", lead: "مصحف كامل بلا إنترنت", text: "حمّل السور واستمع إليها." },
      { type: "bullet", text: "تلاوة كلمة بكلمة." },
      { type: "subheading", text: "مداد — المساعد الذكي" },
      { type: "bullet", text: "بحث معرفي عبر الإنترنت." },
      { type: "paragraph", text: "من مكتبة الحكمة." },
    ]);
  });

  it("يحوّل نقطة تنتهي بنقطتين إلى عنوان فرعي لا إلى نقطة", () => {
    const blocks = parseAboutBlocks("۞ المداد:\n۞ ميزة: وصف");
    expect(blocks[0]).toEqual({ type: "subheading", text: "المداد" });
    expect(blocks[1]).toEqual({ type: "bullet", lead: "ميزة", text: "وصف" });
  });

  it("يتجاهل الأسطر الفارغة والنص الفارغ", () => {
    expect(parseAboutBlocks("")).toEqual([]);
    expect(parseAboutBlocks("  \n\n   \n")).toEqual([]);
  });

  it("يدعم علامات نقاط بديلة (•) والنقطتين اللاتينيتين", () => {
    const blocks = parseAboutBlocks("• Feature: description");
    expect(blocks[0]).toEqual({ type: "bullet", lead: "Feature", text: "description" });
  });
});

describe("resolveAboutApp", () => {
  const baseApp = {
    id: 1,
    slug: "quran",
    appName: [],
    body: [],
  } as unknown as AppInfo;

  it("يُرجع النص العربي الخام للعربية فقط (عند غياب ترجمة الموقع)", () => {
    const app = { ...baseApp, slug: "future-app", aboutApp: "نص عربي كامل" };
    expect(resolveAboutApp(app, "ar")).toBe("نص عربي كامل");
    expect(resolveAboutApp(app, "en")).toBe("");
  });

  it("يُقدّم ترجمة الموقع (override) على مصدر الـ API", () => {
    const app = { ...baseApp, aboutApp: "نص عربي كامل" };
    // ترجمة موجودة في APP_ABOUT_OVERRIDES لـ slug=quran
    expect(resolveAboutApp(app, "en")).toContain("King Fahd Complex");
    expect(resolveAboutApp(app, "tr")).toContain("Kur'an-ı Kerim");
  });

  it("يقرأ من مصفوفة اللغات إن أعادها الـ API", () => {
    const app = {
      ...baseApp,
      slug: "not-overridden",
      aboutApp: [
        { lang: "ar", value: "عربي" },
        { lang: "en", value: "English text" },
      ],
    };
    expect(resolveAboutApp(app, "en")).toBe("English text");
    // لا سلسلة عربية خام ولا ترجمة → فارغ (القسم يُخفى)
    expect(resolveAboutApp(app, "tr")).toBe("عربي"); // fallback العربية ضمن المصفوفة
  });

  it("يعيد نصًا فارغًا عند غياب الحقل كليًا", () => {
    // slug بلا override في APP_ABOUT_OVERRIDES وبلا aboutApp
    expect(resolveAboutApp({ ...baseApp, slug: "no-about-app" }, "ar")).toBe("");
    expect(resolveAboutApp({ ...baseApp, slug: "no-about-app" }, "en")).toBe("");
  });
});

describe("getLocalizedField — مطابقة رموز اللغات", () => {
  const field = [
    { lang: "ar", value: "عربي" },
    { lang: "ph", value: "Tagalog text" },
    { lang: "bn", value: "বাংলা" },
  ];

  it("يطابق tl مع ph (الفلبينية)", () => {
    expect(getLocalizedField(field, "tl")).toBe("Tagalog text");
  });

  it("يطابق be مع bn (البنغالية)", () => {
    expect(getLocalizedField(field, "be")).toBe("বাংলা");
  });

  it("يسقط على العربية عند غياب الترجمة", () => {
    expect(getLocalizedField(field, "fr")).toBe("عربي");
  });

  it("يطابق اللغة مباشرة عندما تتطابق الرموز", () => {
    expect(getLocalizedField(field, "ar")).toBe("عربي");
  });
});
