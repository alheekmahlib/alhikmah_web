/**
 * بيانات القراء والمصادر الصوتية للمصحف الصوتي.
 * مستخرجة من quran_library/lib/src/audio/constants/readers_constants.dart
 */

export interface Reciter {
  index: number;
  name: string;
  arabicName: string;
  // مسار القارئ في CDN
  readerNamePath: string;
  // مصدر الـ URL الأساسي
  url: string;
}

// مصادر السور الكاملة
const SURAH_SOURCES = {
  TARTEEL: "https://audio-cdn.tarteel.ai/quran/surah/",
  QURANICAUDIO: "https://download.quranicaudio.com/quran/",
  MP3QURAN_16: "https://server16.mp3quran.net/",
  MP3QURAN_12: "https://server12.mp3quran.net/",
  MP3QURAN_6: "https://server6.mp3quran.net/",
  MP3QURAN_11: "https://server11.mp3quran.net/",
} as const;

/**
 * ٢١ قارئًا للسور الكاملة.
 */
export const SURAH_RECITERS: Reciter[] = [
  { index: 0, name: "Abdul Basit", arabicName: "عبد الباسط عبد الصمد", readerNamePath: "abdulBasit/murattal/mp3/", url: SURAH_SOURCES.TARTEEL },
  { index: 1, name: "Minshawy", arabicName: "محمد صديق المنشاوي", readerNamePath: "minshawy/murattal/mp3/", url: SURAH_SOURCES.TARTEEL },
  { index: 2, name: "Husary", arabicName: "محمود خليل الحصري", readerNamePath: "mahmood_khaleel_al-husaree_iza3a/", url: SURAH_SOURCES.QURANICAUDIO },
  { index: 3, name: "Al-Ajamy", arabicName: "أحمد بن علي العجمي", readerNamePath: "ahmed_ibn_3ali_al-3ajamy/", url: SURAH_SOURCES.QURANICAUDIO },
  { index: 4, name: "Al-Muaiqly", arabicName: "ماهر المعيقلي", readerNamePath: "maher_almu3aiqly/year1440/", url: SURAH_SOURCES.QURANICAUDIO },
  { index: 5, name: "Ash-Shuraym", arabicName: "سعود الشريم", readerNamePath: "saudAlShuraim/murattal/mp3/", url: SURAH_SOURCES.TARTEEL },
  { index: 6, name: "Al-Ghamadi", arabicName: "سعد الغامدي", readerNamePath: "ghamadi/murattal/mp3/", url: SURAH_SOURCES.TARTEEL },
  { index: 7, name: "Al-3azzawi", arabicName: "مصطفى العززاوي", readerNamePath: "mustafa_al3azzawi/", url: SURAH_SOURCES.QURANICAUDIO },
  { index: 8, name: "Al-Qatami", arabicName: "ناصر القطامي", readerNamePath: "nasser_bin_ali_alqatami/", url: SURAH_SOURCES.QURANICAUDIO },
  { index: 9, name: "Kurdi", arabicName: "قادر الكردي", readerNamePath: "peshawa/Rewayat-Hafs-A-n-Assem/", url: SURAH_SOURCES.MP3QURAN_16 },
  { index: 10, name: "Taher", arabicName: "شيرزاد طاهر", readerNamePath: "taher/", url: SURAH_SOURCES.MP3QURAN_12 },
  { index: 11, name: "Al-Aloosi", arabicName: "عبد الرحمن العوسي", readerNamePath: "aloosi/", url: SURAH_SOURCES.MP3QURAN_6 },
  { index: 12, name: "Al-Yamani", arabicName: "وديع اليمني", readerNamePath: "wdee3/", url: SURAH_SOURCES.MP3QURAN_6 },
  { index: 13, name: "Ad-Dussary", arabicName: "ياسر الدوسري", readerNamePath: "yasser_ad-dussary/", url: SURAH_SOURCES.QURANICAUDIO },
  { index: 14, name: "Al-Juhaynee", arabicName: "عبد الله الجهني", readerNamePath: "abdullaah_3awwaad_al-juhaynee/", url: SURAH_SOURCES.QURANICAUDIO },
  { index: 15, name: "Abbad", arabicName: "فارس عباد", readerNamePath: "fares/", url: SURAH_SOURCES.QURANICAUDIO },
  { index: 16, name: "Ayyoob", arabicName: "محمد أيوب", readerNamePath: "muhammad_ayyoob_hq/", url: SURAH_SOURCES.QURANICAUDIO },
  { index: 17, name: "Al-Muaiqly Mujawwad", arabicName: "ماهر المعيقلي - مجود", readerNamePath: "maher/", url: SURAH_SOURCES.MP3QURAN_12 },
  { index: 18, name: "An-Nufais", arabicName: "أحمد النفيس - مجود", readerNamePath: "nufais/Rewayat-Hafs-A-n-Assem/", url: SURAH_SOURCES.MP3QURAN_16 },
  { index: 19, name: "Ad-Dussary Mujawwad", arabicName: "ياسر الدوسري - مجود", readerNamePath: "yasser/", url: SURAH_SOURCES.MP3QURAN_11 },
  { index: 20, name: "Ali Jaber", arabicName: "علي جابر", readerNamePath: "ali_jaber/", url: SURAH_SOURCES.QURANICAUDIO },
];

/**
 * يبني رابط صوتي لسورة كاملة من قارئ محدد.
 * @param reciterIndex فهرس القارئ (0-20)
 * @param surahNumber رقم السورة (1-114)
 * @returns رابط MP3 كامل
 */
export function getSurahAudioUrl(reciterIndex: number, surahNumber: number): string {
  const reciter = SURAH_RECITERS[reciterIndex] ?? SURAH_RECITERS[0];
  const paddedNumber = String(surahNumber).padStart(3, "0");
  return `${reciter.url}${reciter.readerNamePath}${paddedNumber}.mp3`;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  ayahCount: number;
}
