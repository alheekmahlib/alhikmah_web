import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// روابط موافقة لـ next-intl (تضيف locale تلقائيًا)
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
