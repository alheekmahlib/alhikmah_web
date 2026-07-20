import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API/internal routes (/api, /_next, /_vercel)
  // - Static files (anything with a dot: /favicon.ico, /fonts/*.ttf, /icons/*)
  // - /download/* (معالج بشكل مستقل بدون locale)
  // - /r2-books/* (proxy لبيانات الكتب)
  matcher: ["/((?!api|_next|_vercel|fonts|icons|download|r2-books|.*\\..*).*)"],
};
