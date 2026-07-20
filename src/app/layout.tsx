import "./globals.css";
import { Zain, Noto_Naskh_Arabic } from "next/font/google";

// ===== خطوط عربية (الهوية الجديدة v2) =====
// Zain: الخط الأساسي للنصوص والعناوين (modern sans-serif Arabic + Latin)
// الأوزان المتاحة: 200, 300, 400, 700, 800, 900 (لا يوجد 500/600)
const zain = Zain({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-zain",
  display: "swap",
});

// Noto Naskh Arabic: خط النسخ لصفحات الكتب والآيات
const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-naskh",
  display: "swap",
});

/**
 * Root Layout — يحتوي <html> و <body> (متطلب Next.js 16).
 * القيم الابتدائية: العربية RTL. تُحدَّث ديناميكيًا حسب اللغة.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${zain.variable} ${naskh.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
