"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Howl } from "howler";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Search,
  Volume2,
  VolumeX,
  Repeat,
  Repeat1,
  ChevronDown,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SURAH_RECITERS, getSurahAudioUrl, type Surah } from "@/lib/audio-data";
import surahsData from "@/data/quran-surahs.json";
import { cn } from "@/lib/utils";

const surahs = surahsData as Surah[];

type RepeatMode = "off" | "one" | "all";
const STORAGE_RECITER = "alheekmah-reciter-index";
const fmt = (s: number) => {
  if (!s || isNaN(s) || s === Infinity) return "0:00";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${m}:${String(sec).padStart(2, "0")}`;
};

export function AudioPlayer() {
  const [currentSurah, setCurrentSurah] = useState(1);
  const [reciterIndex, setReciterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const repeatModeRef = useRef<RepeatMode>("off");
  const [searchQuery, setSearchQuery] = useState("");
  const [reciterDropdown, setReciterDropdown] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(true);

  const howlRef = useRef<Howl | null>(null);
  const rafRef = useRef<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_RECITER);
    if (saved) {
      const idx = parseInt(saved, 10);
      if (!isNaN(idx) && idx >= 0 && idx < SURAH_RECITERS.length) setReciterIndex(idx);
    }
  }, []);

  // إغلاق الـ dropdown عند النقر خارجه
  useEffect(() => {
    if (!reciterDropdown) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setReciterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [reciterDropdown]);

  // إزالة التشكيل للبحث
  const removeDiacritics = (text: string) => text.replace(/[\u0617-\u061A\u064B-\u0652\u0640\u0670]/g, "");

  const filteredSurahs = surahs.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = removeDiacritics(searchQuery.trim().toLowerCase());
    const nameClean = removeDiacritics(s.name);
    return nameClean.includes(q) || s.englishName.toLowerCase().includes(q) || String(s.number) === q;
  });

  const playSurah = useCallback(
    (surahNum: number, reciterIdx: number, autoplay = true) => {
      if (howlRef.current) { howlRef.current.unload(); howlRef.current = null; }
      cancelAnimationFrame(rafRef.current);
      const url = getSurahAudioUrl(reciterIdx, surahNum);
      setIsLoading(true); setCurrentTime(0); setDuration(0); setHasInteracted(true);
      const sound = new Howl({ src: [url], format: ["mp3"], html5: true, rate: speed, volume: muted ? 0 : volume });
      howlRef.current = sound;
      sound.once("load", () => { setIsLoading(false); setDuration(sound.duration()); if (autoplay) { sound.play(); setIsPlaying(true); } });
      sound.once("loaderror", () => { setIsLoading(false); setIsPlaying(false); });
      sound.on("play", () => { setIsPlaying(true); const u = () => { setCurrentTime(sound.seek() as number); rafRef.current = requestAnimationFrame(u); }; u(); });
      sound.on("pause", () => setIsPlaying(false));
      sound.on("end", () => {
        setIsPlaying(false); cancelAnimationFrame(rafRef.current);
        const mode = repeatModeRef.current;
        if (mode === "one") {
          // تكرار نفس السورة
          sound.seek(0);
          sound.play();
          setIsPlaying(true);
        } else if (mode === "all") {
          // تكرار القائمة: السورة التالية أو العودة للأولى
          const next = surahNum < 114 ? surahNum + 1 : 1;
          setCurrentSurah(next);
          playSurah(next, reciterIdx, true);
        } else {
          // off: السورة التالية فقط (بدون تكرار)
          if (surahNum < 114) {
            setCurrentSurah(surahNum + 1);
            playSurah(surahNum + 1, reciterIdx, true);
          }
        }
      });
      setCurrentSurah(surahNum);
    },
    [speed, volume, muted],
  );

  const togglePlay = () => {
    if (!howlRef.current) { playSurah(currentSurah, reciterIndex, true); return; }
    if (isPlaying) howlRef.current.pause(); else howlRef.current.play();
  };
  const playNext = () => { const n = currentSurah < 114 ? currentSurah + 1 : 1; playSurah(n, reciterIndex, true); };
  const playPrev = () => { const p = currentSurah > 1 ? currentSurah - 1 : 114; playSurah(p, reciterIndex, true); };
  const changeSpeed = () => { const sp = [0.75, 1, 1.25, 1.5, 2]; const ns = sp[(sp.indexOf(speed) + 1) % sp.length]; setSpeed(ns); if (howlRef.current) howlRef.current.rate(ns); };
  const toggleMute = () => { const m = !muted; setMuted(m); if (howlRef.current) howlRef.current.volume(m ? 0 : volume); };
  const selectReciter = (idx: number) => { setReciterIndex(idx); localStorage.setItem(STORAGE_RECITER, String(idx)); setReciterDropdown(false); if (howlRef.current) playSurah(currentSurah, idx, isPlaying); };
  const cycleRepeat = () => {
    const next = repeatMode === "off" ? "one" : repeatMode === "one" ? "all" : "off";
    repeatModeRef.current = next;
    setRepeatMode(next);
  };
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!howlRef.current || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    // في RTL: النقطة 0 هي على اليمين، لذا نحسب من اليمين
    const isRTL = document.documentElement.dir === "rtl";
    const pct = isRTL ? (r.right - e.clientX) / r.width : (e.clientX - r.left) / r.width;
    const t = Math.max(0, Math.min(1, pct)) * duration;
    howlRef.current.seek(t);
    setCurrentTime(t);
  };

  useEffect(() => () => { if (howlRef.current) howlRef.current.unload(); cancelAnimationFrame(rafRef.current); }, []);

  const cs = surahs.find((s) => s.number === currentSurah);
  const reciter = SURAH_RECITERS[reciterIndex];
  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col pb-28">
      {/* ===== رأس: عنوان + dropdown القراء ===== */}
      <div className="container-x pt-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-extrabold text-ink lg:text-3xl">المصحف الصوتي</h1>
            <p className="mt-1 text-[0.86rem] text-ink-soft">استمع للقرآن الكريم بأصوات نخبة من القرّاء</p>
          </div>

          {/* Dropdown القراء */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setReciterDropdown(!reciterDropdown)}
              className="flex items-center gap-2.5 rounded-xl border border-rule bg-paper px-4 py-2.5 transition-colors hover:border-emerald"
            >
              <div className="grid h-8 w-8 place-items-center rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/slider-icon.svg" alt="" className="h-7 w-7" style={{ filter: "brightness(0) saturate(100%) invert(29%) sepia(15%) saturate(748%) hue-rotate(95deg) brightness(93%) contrast(88%)" }} />
              </div>
              <div className="hidden text-start sm:block">
                <p className="text-[0.62rem] uppercase tracking-wide text-ink-faint">القارئ</p>
                <p className="font-display text-[0.86rem] font-bold text-ink">{reciter.arabicName}</p>
              </div>
              <ChevronDown className={cn("h-4 w-4 text-ink-faint transition-transform", reciterDropdown && "rotate-180")} />
            </button>

            {/* القائمة المنسدلة */}
            <AnimatePresence>
              {reciterDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  data-lenis-prevent
                  className="absolute left-0 top-full z-50 mt-2 max-h-80 w-72 overflow-y-auto rounded-2xl border border-rule bg-paper p-2 shadow-2xl"
                >
                  {SURAH_RECITERS.map((r) => (
                    <button
                      key={r.index}
                      onClick={() => selectReciter(r.index)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors",
                        r.index === reciterIndex ? "bg-emerald/8" : "hover:bg-bg-warm",
                      )}
                    >
                      <span className={cn("grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg text-[0.72rem] font-bold", r.index === reciterIndex ? "bg-emerald text-paper-fixed" : "bg-bg-warm text-ink-soft")}>
                        {r.index + 1}
                      </span>
                      <div className="flex-1">
                        <p className={cn("font-display text-[0.88rem] font-bold", r.index === reciterIndex ? "text-emerald" : "text-ink")}>{r.arabicName}</p>
                        <p className="text-[0.66rem] text-ink-faint">{r.name}</p>
                      </div>
                      {r.index === reciterIndex && <Check className="h-4 w-4 text-emerald" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ===== قائمة السور ===== */}
      <div className="container-x mt-6 flex-1">
        {/* البحث */}
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="ابحث عن سورة..."
            className="w-full rounded-xl border border-rule bg-paper py-2.5 pr-10 pl-4 text-[0.9rem] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-emerald"
          />
        </div>

        {/* شبكة السور */}
        <div data-lenis-prevent className="grid max-h-[calc(100vh-22rem)] grid-cols-1 gap-2 overflow-y-auto pb-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSurahs.map((surah) => {
            const isCurrent = surah.number === currentSurah;
            return (
              <button
                key={surah.number}
                onClick={() => playSurah(surah.number, reciterIndex, true)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-3 text-start transition-all duration-300",
                  isCurrent
                    ? "border-emerald bg-emerald/8 shadow-sm"
                    : "border-rule bg-paper hover:-translate-y-0.5 hover:border-emerald/30 hover:shadow-sm",
                )}
              >
                {/* رقم السورة بزخرفة sora_num.svg */}
                <div className="relative grid h-11 w-11 flex-shrink-0 place-items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/surah-num.svg"
                    alt=""
                    className="absolute inset-0 h-full w-full"
                    style={{ filter: "brightness(0) saturate(100%) invert(33%) sepia(60%) saturate(460%) hue-rotate(95deg) brightness(95%) contrast(92%)", opacity: isCurrent ? 1 : 0.5 }}
                  />
                  <span className="relative z-10 flex items-center justify-center font-display text-[0.82rem] font-bold text-emerald" style={{ marginTop: "2px" }}>
                    {surah.number}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className={cn("truncate font-surah-name text-[1.9rem] leading-tight", isCurrent ? "text-emerald" : "text-ink")}>{`surah${String(surah.number).padStart(3, "0")}`}</p>
                  <p className="truncate text-[0.8rem] text-ink-faint">{surah.englishName} · {surah.ayahCount} آية · {surah.revelationType === "Meccan" ? "مكية" : "مدنية"}</p>
                </div>
                {isCurrent && isPlaying && (
                  <div className="flex items-center gap-0.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} className="block w-0.5 rounded-full bg-emerald" animate={{ height: [6, 14, 6] }} transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }} />
                    ))}
                  </div>
                )}
                {isCurrent && !isPlaying && <Play className="h-4 w-4 flex-shrink-0 fill-emerald text-emerald" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== المشغّل السفلي (sticky) ===== */}
      <AnimatePresence>
        {hasInteracted && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[100] border-t border-rule bg-bg/95 backdrop-blur-xl"
          >
            <div className="container-x py-3">
              <div className="flex items-center gap-4">
                {/* اسم السورة */}
                <div className="hidden min-w-0 flex-shrink-0 sm:block lg:w-48">
                  <AnimatePresence mode="wait">
                    <motion.div key={currentSurah} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                      <p className="truncate font-surah-name text-[1.8rem] leading-tight text-ink">{cs ? `surah${String(cs.number).padStart(3, "0")}` : ""}</p>
                      <p className="truncate text-[0.8rem] text-ink-faint">{cs?.englishName} · {reciter.arabicName}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* أزرار + شريط */}
                <div className="flex flex-1 items-center gap-3">
                  {/* السابق */}
                  <button onClick={playPrev} className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-bg-warm hover:text-emerald" aria-label="prev">
                    <SkipForward className="h-4 w-4" />
                  </button>

                  {/* تشغيل */}
                  <button onClick={togglePlay} disabled={isLoading} className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-emerald text-paper-fixed shadow-emerald transition-all hover:scale-105 disabled:opacity-60" aria-label="play">
                    {isLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-paper-fixed border-t-transparent" />
                    ) : isPlaying ? (
                      <Pause className="h-5 w-5 fill-current" />
                    ) : (
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    )}
                  </button>

                  {/* التالي */}
                  <button onClick={playNext} className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-bg-warm hover:text-emerald" aria-label="next">
                    <SkipBack className="h-4 w-4" />
                  </button>

                  {/* شريط التقدّم */}
                  <div className="flex flex-1 items-center gap-2">
                    <span className="hidden w-10 text-end text-[0.68rem] tabular-nums text-ink-faint sm:block">{fmt(currentTime)}</span>
                    <div onClick={seek} className="group relative h-1.5 flex-1 cursor-pointer rounded-full bg-bg-warm">
                      <div className="absolute inset-y-0 right-0 rounded-full bg-emerald transition-all" style={{ width: `${progress}%` }} />
                      <div className="absolute top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-paper opacity-0 shadow ring-2 ring-emerald transition-opacity group-hover:opacity-100" style={{ right: `${progress}%` }} />
                    </div>
                    <span className="hidden w-10 text-[0.68rem] tabular-nums text-ink-faint sm:block">{fmt(duration)}</span>
                  </div>
                </div>

                {/* أدوات يمين */}
                <div className="flex flex-shrink-0 items-center gap-1">
                  <button onClick={cycleRepeat} className={cn("grid h-8 w-8 place-items-center rounded-lg transition-colors", repeatMode !== "off" ? "bg-emerald/10 text-emerald" : "text-ink-faint hover:bg-bg-warm")} aria-label="repeat">
                    {repeatMode === "one" ? <Repeat1 className="h-3.5 w-3.5" /> : <Repeat className="h-3.5 w-3.5" />}
                  </button>
                  <button onClick={changeSpeed} className="rounded-md border border-rule bg-paper px-1.5 py-1 text-[0.66rem] font-bold text-ink-soft transition-colors hover:border-emerald hover:text-emerald" aria-label="speed">{speed}×</button>
                  <button onClick={toggleMute} className="grid h-8 w-8 place-items-center rounded-lg text-ink-faint transition-colors hover:bg-bg-warm" aria-label="vol">
                    {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {/* شريط التقدّم للجوال (تحت الأزرار) */}
              <div className="mt-2 flex items-center gap-2 sm:hidden">
                <span className="w-8 text-end text-[0.62rem] tabular-nums text-ink-faint">{fmt(currentTime)}</span>
                <div onClick={seek} className="relative h-1 flex-1 cursor-pointer rounded-full bg-bg-warm">
                  <div className="absolute inset-y-0 right-0 rounded-full bg-emerald" style={{ width: `${progress}%` }} />
                </div>
                <span className="w-8 text-[0.62rem] tabular-nums text-ink-faint">{fmt(duration)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
