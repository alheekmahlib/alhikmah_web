import { setRequestLocale, getTranslations } from "next-intl/server";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/ui/page-header";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const faqKeys = [
    "faq_free",
    "faq_tafsir",
    "faq_apps",
    "faq_api",
    "faq_contact",
    "faq_data",
    "faq_offline",
  ] as const;

  return (
    <>
      <PageHeader
        eyebrow={t("faq_page_eyebrow")}
        title={t("faq_page_title")}
        lede={t("faq_page_lede")}
      />

      <section className="container-x py-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-3.5">
          {faqKeys.map((k, i) => (
            <Reveal key={k} variant="up" delay={i * 60}>
              <details
                open={i === 0}
                className="group overflow-hidden rounded-2xl border border-rule bg-paper transition-colors hover:border-emerald-soft open:border-emerald open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-bold text-ink">
                  {t(`${k}_q`)}
                  <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-paper-2 text-emerald-deep transition-all duration-300 group-open:rotate-45 group-open:bg-emerald group-open:text-paper">
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </summary>
                <div className="px-5 pb-6 text-[0.96rem] leading-relaxed text-ink-soft">
                  {t(`${k}_a`)}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
