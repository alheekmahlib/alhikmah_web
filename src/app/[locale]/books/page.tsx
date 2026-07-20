import { setRequestLocale } from "next-intl/server";
import { BooksPageContent } from "@/components/sections/books-page-content";

export default async function BooksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BooksPageContent />;
}
