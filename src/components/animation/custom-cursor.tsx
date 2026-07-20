"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * مؤشر مخصص خفيف — دائرة تتبع الفأرة بـ spring physics.
 * - يكبر/يتلوّن عند المرور فوق عناصر تفاعلية
 * - يُخفى على الأجهزة اللمسية ومع prefers-reduced-motion
 *
 * مستوحى من bdsn.club لكن أبسط (دائرة واحدة فقط، لا أقلام/شعارات متعددة).
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // قيم الحركة
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // spring للمتابعة السلسة (lerp-like)
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    // تعطيل على touch و reduced-motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isTouch || prefersReduced) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    function move(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // تحقّق إن كان المؤشر فوق عنصر تفاعلي
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='hover']",
      );
      setHovering(isInteractive);
    }

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
      style={{ x, y }}
    >
      <motion.div
        className="rounded-full border-2"
        animate={{
          width: hovering ? 48 : 28,
          height: hovering ? 48 : 28,
          backgroundColor: hovering
            ? "rgba(45, 106, 79, 0.15)"
            : "rgba(45, 106, 79, 0)",
          borderColor: hovering
            ? "rgba(45, 106, 79, 0.9)"
            : "rgba(45, 106, 79, 0.5)",
          translateX: hovering ? -24 : -14,
          translateY: hovering ? -24 : -14,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
    </motion.div>
  );
}
