import { Reveal } from "@/components/ui/reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
}

/**
 * عنوان موحّد لأعلى كل صفحة داخلية.
 */
export function PageHeader({ eyebrow, title, lede }: PageHeaderProps) {
  return (
    <section className="container-x pt-12 lg:pt-16">
      <Reveal variant="up">
        <div className="border-b border-rule pb-6 text-center">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-3 font-display text-[2rem] font-bold leading-tight text-ink lg:text-6">
            {title}
          </h1>
          {lede && (
            <p className="mx-auto mt-3 max-w-xl text-[1rem] text-ink-soft">
              {lede}
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
