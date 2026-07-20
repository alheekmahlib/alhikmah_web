"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/ui/page-header";

type Status = "idle" | "loading" | "success" | "error";

export function ContactPageContent() {
  const t = useTranslations();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/haozo89@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...form,
            _captcha: "false",
            _cc: "solteam.contact@gmail.com",
          }),
        },
      );
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const fieldCls =
    "w-full rounded-xl border border-rule bg-paper px-4 py-3 text-[0.92rem] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-emerald";

  return (
    <>
      <PageHeader
        eyebrow={t("contact_page_eyebrow")}
        title={t("contact_page_title")}
        lede={t("contact_page_lede")}
      />

      <section className="container-x py-10">
        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1fr_1.5fr]">
          {/* معلومات التواصل */}
          <Reveal variant="right">
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 font-display text-xl font-bold text-ink">
                  {t("contact_info_title")}
                </h3>
                <p className="text-[0.92rem] leading-relaxed text-ink-soft">
                  {t("contact_info_desc")}
                </p>
              </div>

              <div className="rounded-2xl border border-rule bg-paper p-5">
                <div className="mb-2 text-[0.78rem] font-semibold uppercase tracking-wide text-emerald-deep">
                  {t("contact_email_label")}
                </div>
                <a
                  href="mailto:solteam.contact@gmail.com"
                  className="text-[0.92rem] font-bold text-ink hover:text-emerald-deep"
                >
                  solteam.contact@gmail.com
                </a>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-emerald-deep to-emerald p-6 text-center text-emerald-soft">
                <div className="font-quran text-4xl">۞</div>
                <p className="mt-2 font-quran text-lg italic">
                  {t("contact_quote")}
                </p>
              </div>
            </div>
          </Reveal>

          {/* النموذج */}
          <Reveal variant="left">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-rule bg-paper p-6 lg:p-8"
            >
              {status === "success" && (
                <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  <span className="text-[0.9rem] font-semibold">
                    {t("contact_success")}
                  </span>
                </div>
              )}
              {status === "error" && (
                <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-[0.9rem] font-semibold">
                    {t("contact_error")}
                  </span>
                </div>
              )}

              <div className="grid gap-4">
                <div>
                  <label className="mb-1.5 block text-[0.86rem] font-semibold text-ink">
                    {t("contact_name")}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t("contact_name_ph")}
                    className={fieldCls}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[0.86rem] font-semibold text-ink">
                    {t("contact_email")}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t("contact_email_ph")}
                    className={fieldCls}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[0.86rem] font-semibold text-ink">
                    {t("contact_subject")}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder={t("contact_subject_ph")}
                    className={fieldCls}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[0.86rem] font-semibold text-ink">
                    {t("contact_message")}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t("contact_message_ph")}
                    className={`${fieldCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-emerald to-emerald-bright px-6 py-3.5 font-bold text-paper shadow-lg shadow-emerald/30 transition-all hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("sending")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t("send")}
                    </>
                  )}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
