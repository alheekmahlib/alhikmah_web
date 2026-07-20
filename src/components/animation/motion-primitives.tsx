"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  animate,
  useInView,
  type Variants,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ==========================================================================
   مكوّنات الأنميشن القابلة لإعادة الاستخدام (بأسلوب bdsn.club)
   ========================================================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

export const revealVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  },
  "fade-up": {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  },
  right: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  },
  left: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: EASE },
    },
  },
};

type RevealVariant = keyof typeof revealVariants;

/* ==========================================================================
   <MotionReveal>
   ========================================================================== */
interface MotionRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export function MotionReveal({
  children,
  variant = "up",
  delay = 0,
  className,
  once = true,
  amount = 0.2,
}: MotionRevealProps) {
  return (
    <motion.div
      className={className}
      variants={revealVariants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   <MotionStagger> + <MotionStaggerItem>
   ========================================================================== */
interface MotionStaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
}

export function MotionStagger({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0,
  amount = 0.15,
}: MotionStaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionStaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <motion.div className={className} variants={revealVariants.up}>{children}</motion.div>;
}

/* ==========================================================================
   <SplitText> — تقسيم النص لأنميشن دخول
   ========================================================================== */
interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.08,
}: SplitTextProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: 0,
                transition: { duration: 0.7, ease: EASE },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ==========================================================================
   <MagneticButton>
   ========================================================================== */
interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function MagneticButton({
  children,
  strength = 0.3,
  className,
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 15, stiffness: 200 });
  const sy = useSpring(y, { damping: 15, stiffness: 200 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn(
        "relative inline-flex cursor-pointer items-center justify-center",
        className,
      )}
    >
      {children}
    </motion.a>
  );
}

/* ==========================================================================
   <ParallaxLayer>
   ========================================================================== */
export function ParallaxLayer({
  children,
  speed = 0.5,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   <Counter>
   ========================================================================== */
export function Counter({
  to,
  duration = 1.5,
  className,
  format = "ar",
}: {
  to: number;
  duration?: number;
  className?: string;
  format?: "ar" | "en";
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    format === "ar"
      ? Math.round(v).toLocaleString("ar-EG")
      : Math.round(v).toLocaleString("en"),
  );
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration, ease: EASE });
    return () => controls.stop();
  }, [inView, to, duration, count]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
}

/* ==========================================================================
   <Marquee> — شريط لانهائي
   ========================================================================== */
export function Marquee({
  children,
  className,
  speed = 30,
  direction = "left",
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
}) {
  return (
    <div className={cn("flex overflow-hidden", className)}>
      <motion.div
        className="flex shrink-0 items-center"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
