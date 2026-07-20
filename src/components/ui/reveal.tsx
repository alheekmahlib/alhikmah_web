"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "right" | "left" | "zoom";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number; // بالمللي ثانية
  as?: ElementType;
  className?: string;
}

const variantClass: Record<RevealVariant, string> = {
  up: "reveal",
  right: "reveal-right",
  left: "reveal-left",
  zoom: "reveal-zoom",
};

/**
 * مكوّن يكشف العنصر تدريجيًا عند ظهوره في الشاشة أثناء التمرير.
 * يحترم prefers-reduced-motion تلقائيًا عبر CSS.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  as,
  className,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target); // مرّة واحدة فقط
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(variantClass[variant], visible && "in-view", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * مكوّن يطبّق stagger (ظهور متتابع) على أطفاله.
 * يلفّ كل طفل بـ Reveal مع تأخير متزايد.
 */
interface StaggerProps {
  children: ReactNode;
  baseDelay?: number;
  step?: number; // الفاصل بين كل عنصر وآخر (ms)
}

export function Stagger({
  children,
  baseDelay = 0,
  step = 90,
}: StaggerProps) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <>
      {items.map((child, i) => (
        <Reveal key={i} delay={baseDelay + i * step}>
          {child}
        </Reveal>
      ))}
    </>
  );
}
