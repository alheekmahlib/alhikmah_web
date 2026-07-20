import { cn } from "@/lib/utils";

/**
 * غلاف كتاب بزخارف إسلامية — مطابق لتصميم BookCoverWidget في تطبيق القرآن الكريم.
 * - خلفية بلون أساسي (الأخضر الزمردي)
 * - زخرفة في الزاوية العلوية اليسرى + السفلية اليمنى
 * - شعار صغير أسفل اليسار
 * - اسم الكتاب في المنتصف (قبل رمز - أو =، محدود بـ ٣ كلمات)
 */
export function BookCover({
  bookName,
  className,
  size = "md",
}: {
  bookName: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const shortName = getShortName(bookName);

  const dimensions = {
    sm: { w: "w-20", h: "h-28", decoSize: "h-10 w-10", text: "text-[0.62rem]", pad: "p-1.5" },
    md: { w: "w-24", h: "h-32", decoSize: "h-12 w-12", text: "text-[0.72rem]", pad: "p-2" },
    lg: { w: "w-36", h: "h-48", decoSize: "h-20 w-20", text: "text-[0.92rem]", pad: "p-3" },
  }[size];

  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-emerald to-emerald-deep shadow-md",
        dimensions.w,
        dimensions.h,
        dimensions.pad,
        className,
      )}
    >
      {/* زخرفة الزاوية العلوية اليسرى (مدوّرة ١٨٠°) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/book-decoration.svg"
        alt=""
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-2 -left-2 rotate-180 opacity-30",
          dimensions.decoSize,
        )}
      />

      {/* زخرفة الزاوية السفلية اليمنى */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/book-decoration.svg"
        alt=""
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-2 -right-2 opacity-30",
          dimensions.decoSize,
        )}
      />

      {/* اسم الكتاب في المنتصف */}
      <p
        className={cn(
          "relative z-10 px-1 text-center font-display font-bold leading-tight text-emerald-light",
          dimensions.text,
        )}
      >
        {shortName}
      </p>
    </div>
  );
}

/**
 * يستخرج اسم الكتاب المختصر قبل رمز '-' أو '='، ويحدّده بـ ٣ كلمات.
 * مطابق لمنطق _getBookNameBeforeSymbol في BookCoverWidget.
 */
function getShortName(bookName: string): string {
  const dashIndex = bookName.indexOf("-");
  const equalIndex = bookName.indexOf("=");
  let splitIndex = -1;

  if (dashIndex !== -1 && equalIndex !== -1) {
    splitIndex = dashIndex < equalIndex ? dashIndex : equalIndex;
  } else if (dashIndex !== -1) {
    splitIndex = dashIndex;
  } else if (equalIndex !== -1) {
    splitIndex = equalIndex;
  }

  const text = splitIndex === -1 ? bookName.trim() : bookName.substring(0, splitIndex).trim();

  const words = text.split(" ").filter((w) => w.length > 0);
  return words.slice(0, 3).join(" ");
}
