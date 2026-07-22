import { setRequestLocale, getTranslations } from "next-intl/server";
import { Target, Heart, Users, Award, Sparkles, BookOpen, Globe, Shield } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/ui/page-header";
import { Logo } from "@/components/layout/logo";

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

  // مميزات بديل للإحصائيات
  const features = [
    { icon: Globe, titleKey: "about_stat_2", desc: "بما فيها العربية والإنجليزية والتركية والأردية" },
    { icon: Shield, titleKey: "about_stat_4", desc: "بدون إعلانات أو اشتراكات، احتسابًا لوجه الله" },
    { icon: BookOpen, titleKey: "about_stat_3", desc: "للقرآن والأذكار والقلايد والنحو وغيرها" },
    { icon: Sparkles, titleKey: "about_value_4_title", desc: "مكتبات وواجهات برمجية مفتوحة للمطورين" },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("about_page_eyebrow")}
        title={t("about_page_title")}
        lede={t("about_page_lede")}
      />

      {/* القصة + الشعار */}
      <section className="container-x py-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          {/* النص */}
          <div>
            <Reveal variant="up">
              <p className="mb-5 text-[1.05rem] leading-[2] text-ink-soft">
                {t("about_page_story_1")}
              </p>
            </Reveal>
            <Reveal variant="up" delay={100}>
              <p className="mb-5 leading-[2] text-ink-soft">
                {t("about_page_story_2")}
              </p>
            </Reveal>
            <Reveal variant="up" delay={200}>
              <p className="leading-[2] text-ink-soft">
                {t("about_page_story_3")}
              </p>
            </Reveal>
          </div>

          {/* الشعار */}
          <Reveal variant="zoom" delay={150}>
            <div className="relative mx-auto flex items-center justify-center py-8">
              {/* ۞ دوّارة خلفية */}
              <div className="pointer-events-none absolute opacity-[0.08]">
                <span className="font-naskh text-[8rem] leading-none text-emerald">۞</span>
              </div>
              <div className="relative z-10">
                <Logo height={100} className="text-emerald drop-shadow-lg" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* المميزات — بديل الإحصائيات */}
      <section className="container-x py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={i} variant="up" delay={i * 80}>
                <div className="group rounded-2xl border border-rule bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-md">
                  <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-emerald/8 text-emerald transition-colors group-hover:bg-emerald group-hover:text-paper-fixed">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </div>
                  <h3 className="mb-1.5 font-display text-base font-bold text-ink">
                    {t(f.titleKey)}
                  </h3>
                  <p className="text-[0.82rem] leading-relaxed text-ink-soft">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* القيم */}
      <section className="container-x py-14">
        <Reveal variant="up">
          <div className="mb-10 text-center">
            <span className="eyebrow">{t("about_eyebrow")}</span>
            <h2 className="mt-3 font-display text-[2rem] font-extrabold text-ink">
              {t("about_values_title")}
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <Reveal key={value.titleKey} variant="up" delay={i * 90}>
                <div className="group rounded-2xl border border-rule bg-paper p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-lg">
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-emerald/8 text-emerald transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald group-hover:text-paper-fixed">
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

      {/* رؤيتنا — أنيقة بدون خلفية خضراء */}
      <section className="container-x py-14">
        <Reveal variant="up">
          <div className="relative overflow-hidden rounded-3xl border border-emerald/15 bg-paper p-10 text-center lg:p-16">
            {/* زخرفة ۞ */}
            <div className="pointer-events-none absolute right-8 top-6 opacity-[0.05]">
              <span className="font-naskh text-[7rem] leading-none text-emerald">۞</span>
            </div>
            <div className="relative z-10 mx-auto max-w-2xl">
              <span className="eyebrow">{t("about_vision_title")}</span>
              <p className="mt-5 text-[1.2rem] leading-[2.2] text-ink">
                {t("about_vision_text")}
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
