import { setRequestLocale } from "next-intl/server";
import { AudioPlayer } from "@/components/sound/audio-player";

export default async function SoundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AudioPlayer />;
}
