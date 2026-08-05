import DownloadRedirectClient from "./download-redirect-client";

export const dynamic = "force-dynamic";

/**
 * صفحة تحويل التحميل.
 *
 * تُدار بالكامل client-side لأن طبقة OpenNext/Cloudflare Server Components
 * لم تكن قادرة على إتمام الـ fetch+redirect بشكل موثوق (استثناءات SSR صامتة).
 * في المتصفح: navigator.userAgent + fetch("/api/apps") يعملان بشكل موثوق.
 */
export default async function DownloadRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DownloadRedirectClient slug={slug} />;
}
