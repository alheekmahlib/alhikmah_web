import type { ReactNode } from "react";
import type { AppInfo } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * أزرار متاجر التنزيل بأيقوناتها الحقيقية (SVG مضمّنة بلا اعتمادية إضافية).
 * أسماء المتاجر أسماء أعلام تبقى كما هي في كل اللغات.
 */

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.205a1.49 1.49 0 0 1 0 2.591zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
    </svg>
  );
}

/** حقيبة AppGallery (هواوي): الحقيبة بلون الزر والابتسامة بلون خلفية الزر. */
function AppGalleryIcon({ className, smile }: { className?: string; smile: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M5 7a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v6.6a8 8 0 0 1-4.5 7.2l-.4.2a3.4 3.4 0 0 1-4.2 0l-.4-.2A8 8 0 0 1 5 13.6V7Z"
      />
      <path
        d="M8 12.4c2.4 1.7 5.6 1.7 8 0"
        fill="none"
        stroke={smile}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

type StoreVariant = "solid" | "onDark";

interface StoreLink {
  href: string;
  label: string;
  icon: ReactNode;
}

export function StoreButtons({
  app,
  variant = "solid",
  className,
}: {
  app: AppInfo;
  variant?: StoreVariant;
  className?: string;
}) {
  // لون ابتسامة أيقونة AppGallery يطابق خلفية الزر ليظهر الحفر
  const smile = variant === "solid" ? "#1b4332" : "#fffef8";

  const links: StoreLink[] = [];
  if (app.urlAppStore) {
    links.push({ href: app.urlAppStore, label: "App Store", icon: <AppleIcon className="h-5 w-5" /> });
  }
  if (app.urlPlayStore) {
    links.push({ href: app.urlPlayStore, label: "Google Play", icon: <GooglePlayIcon className="h-[18px] w-[18px]" /> });
  }
  if (app.urlAppGallery) {
    links.push({ href: app.urlAppGallery, label: "AppGallery", icon: <AppGalleryIcon className="h-5 w-5" smile={smile} /> });
  }
  if (app.urlMacAppStore) {
    links.push({ href: app.urlMacAppStore, label: "Mac App Store", icon: <AppleIcon className="h-5 w-5" /> });
  }

  if (links.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {links.map(({ href, label, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2.5 rounded-xl px-5 py-3 text-[0.88rem] font-bold transition-all duration-200 hover:-translate-y-0.5",
            variant === "solid"
              ? "bg-emerald-deep text-paper-fixed shadow-emerald hover:bg-emerald"
              : "bg-paper-fixed text-emerald-deep shadow-lg hover:bg-emerald-light-fixed",
          )}
        >
          {icon}
          {label}
        </a>
      ))}
    </div>
  );
}
