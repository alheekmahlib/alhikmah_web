import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Check, Target, Heart, Users, Award } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/ui/page-header";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const values = [
    { icon: Target, titleKey: "about_value_1_title", descKey: "about_value_1_desc" },
    { icon: Heart, titleKey: "about_value_2_title", descKey: "about_value_2_desc" },
    { icon: Users, titleKey: "about_value_3_title", descKey: "about_value_3_desc" },
    { icon: Award, titleKey: "about_value_4_title", descKey: "about_value_4_desc" },
  ];

  const stats = [
    { num: "2M+", key: "about_stat_1" },
    { num: "10+", key: "about_stat_2" },
    { num: "4", key: "about_stat_3" },
    { num: "100%", key: "about_stat_4" },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("about_page_eyebrow")}
        title={t("about_page_title")}
        lede={t("about_page_lede")}
      />

      {/* القصة */}
      <section className="container-x py-12">
        <div className="mx-auto max-w-3xl">
          <Reveal variant="up">
            <p className="mb-6 text-lg leading-loose text-ink-soft">
              {t("about_page_story_1")}
            </p>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <p className="mb-6 leading-loose text-ink-soft">
              {t("about_page_story_2")}
            </p>
          </Reveal>
          <Reveal variant="up" delay={200}>
            <p className="leading-loose text-ink-soft">
              {t("about_page_story_3")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* الإحصائيات */}
      <section className="container-x py-8">
        <Reveal variant="zoom">
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-rule bg-paper p-8 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-4xl font-bold text-emerald-deep">
                  {s.num}
                </div>
                <div className="mt-2 text-[0.82rem] text-ink-faint">
                  {t(s.key)}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* القيم */}
      <section className="container-x py-12">
        <Reveal variant="up">
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-ink">
            {t("about_values_title")}
          </h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <Reveal key={value.titleKey} variant="up" delay={i * 90}>
                <div className="rounded-2xl border border-rule bg-paper p-6 text-center transition-colors hover:border-emerald-soft">
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-deep to-emerald text-emerald-soft">
                    <Icon className="h-7 w-7" strokeWidth={1.6} />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-ink">
                    {t(value.titleKey)}
                  </h3>
                  <p className="text-[0.86rem] leading-relaxed text-ink-soft">
                    {t(value.descKey)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* رؤيتنا */}
      <section className="container-x py-12">
        <Reveal variant="zoom">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-deep to-emerald p-10 text-center lg:p-14">
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 0L50 30L80 40L50 50L40 80L30 50L0 40L30 30Z' fill='none' stroke='%23E8C97A' stroke-width='1'/%3E%3C/svg%3E\")",
                backgroundSize: "70px",
              }}
            />
            <div className="relative z-10 mx-auto max-w-2xl">
              <span className="font-quran text-5xl text-emerald">۞</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-emerald-soft">
                {t("about_vision_title")}
              </h2>
              <p className="mt-5 text-lg leading-loose text-emerald-soft/90">
                {t("about_vision_text")}
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
