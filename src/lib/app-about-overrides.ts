/**
 * ترجمات نص "نبذة عن التطبيق" (aboutApp) على مستوى الموقع.
 *
 * الـ API يُرجع aboutApp نصًا عربيًا فقط، لذا تُخزَّن ترجمات اللغات الأخرى هنا
 * (مفتاح slug ثم رمز لغة الموقع) — مسودات تُراجَع وتُعدَّل بحرية.
 * إدراج سلبة ar هنا يجعلها تسبق نص الـ API فتُعرض فورًا دون انتظار تحديثه.
 *
 * تحافظ كل ترجمة على بنية المصدر كي تُعرض بنفس الشكل:
 * - أسطر فارغة بين المقاطع
 * - نقاط الميزات تبدأ بالعلامة ۞ ويتبعها "اسم الميزة: الوصف"
 * - العناوين الفرعية أسطر تنتهي بنقطتين ":"
 */
export const APP_ABOUT_OVERRIDES: Record<string, Partial<Record<string, string>>> = {
  quran: {
    ar: `تطبيق «القرآن الكريم - مكتبة الحكمة»: اقرأ القرآن الكريم واسمعه واحفظه بفهم أعمق — مصحف وتلاوة وتفسير وتجويد في تطبيق واحد يعمل دون إنترنت، مع مداد، مساعدك الذكي للبحث المعرفي.

يعتمد التطبيق على مصحف مجمع الملك فهد لطباعة المصحف الشريف، بواجهة عصرية سهلة تُعنى بالتفاصيل:

۞ مصحف كامل بلا إنترنت: مصحف مطابق للمصحف العثماني.
۞ تلاوة كلمة بكلمة: تعلّم النطق الصحيح مع نخبة من أشهر القراء.
۞ التفسير والإعراب: افهم معاني كل كلمة وتصريفها وإعرابها.
۞ التجويد والقراءات العشر: أحكام واضحة وقراءات متقنة.
۞ حفظ منظّم: علامات مرجعية، آيات متشابهات، ومراجعة أسهل.

۞ معلم القرآن:
۞ تسميع: الكلمات مخفية وتظهر أثناء تلاوتك.
۞ مصحح التلاوة: الآيات ظاهرة مع تصحيح فوري لكل كلمة خاطئة حتى تُتلى صحيحة.
۞ معلم القرآن: القارئ يتلو الآية ثم تتلوها أنت وتتكرر حتى تتقنها.

۞ أذكار حصن المسلم: أذكار يومية بالمفضلة والتنقل السريع.

۞ مكتبة إسلامية:
۞ موسوعة شاملة للكتب الإسلامية.
۞ استعراض الكتب حسب التصنيف.
۞ البحث داخل الكتاب نفسه، وليس فقط في عناوين الكتب.
۞ البحث عن عناوين الفصول والموضوعات.
۞ إمكانية الوصول إلى فهرس المحتويات والتنقل إلى فصل أو موضوع معين.
۞ قراءة الكتب في واجهة صفحات قابلة للتنقل.
۞ حفظ آخر موضع وصلت إليه في الكتاب للمتابعة لاحقًا.
۞ وجود قسم خاص بالكتب التي تمت قراءتها مؤخرًا أو تنزيلها.

۞ مداد — المساعد الذكي:
۞ بحث معرفي عبر الإنترنت يعتمد بيانات مركز التفسير للدراسات القرآنية.
۞ بدّل بين نماذج البحث بما يناسب احتياجك.
۞ انتقل من الإجابة إلى الكتاب واقرأ النص كاملاً في سياقه.

۞ المصحف الصوتي:
۞ الاستماع إلى السور كاملة من خلال قائمة السور.
۞ دعم عدد كبير من القرّاء.
۞ تنزيل السورة على الجهاز للاستماع إليها لاحقًا دون اتصال.
۞ حفظ آخر سورة وموقع استماع.

۞ وضع ليلي وتخصيص كامل لتجربة قراءة مريحة.
۞ والكثير من المميزات الأخرى.

حمّل الآن واجعل القرآن رفيقك في كل لحظة.`,

    en: `The "Holy Quran — Alheekmah Library" app: Read, listen to, and memorize the Holy Quran with a deeper understanding — a mushaf, recitation, tafsir, and tajweed in a single app that works offline, with Midad, your smart companion for knowledge search.

The app is built on the King Fahd Complex mushaf, with a modern, easy interface that cares about the details:

۞ Complete offline mushaf: A mushaf identical to the Uthmani mushaf.
۞ Word-by-word recitation: Learn the correct pronunciation with a selection of the most famous reciters.
۞ Tafsir and i'rab: Understand the meaning, derivation, and syntax of every word.
۞ Tajweed and the Ten Qira'at: Clear rules and precise recitations.
۞ Organized memorization: Bookmarks, similar verses, and easier review.

۞ The Quran Teacher:
۞ Tasmee' (recitation testing): The words are hidden and appear as you recite.
۞ Recitation corrector: The verses remain visible, with instant correction of every wrong word until it is recited correctly.
۞ The Quran Teacher: The reciter recites the verse, then you recite it after him, and it repeats until you master it.

۞ Hisn al-Muslim adhkar: Daily remembrances with favorites and quick navigation.

۞ Islamic library:
۞ A comprehensive encyclopedia of Islamic books.
۞ Browse books by category.
۞ Search inside the book itself, not only in book titles.
۞ Search for chapter and topic titles.
۞ Access the table of contents and jump to a specific chapter or topic.
۞ Read books in a navigable, page-based interface.
۞ Save the last position you reached in the book to continue later.
۞ A dedicated section for recently read or downloaded books.

۞ Midad — the smart assistant:
۞ Knowledge search over the internet powered by data from the Tafsir Center for Quranic Studies.
۞ Switch between search models to suit your needs.
۞ Go from the answer to the book and read the full text in its context.

۞ The audio mushaf:
۞ Listen to full surahs through the surah list.
۞ Support for a large number of reciters.
۞ Download a surah to your device to listen to it later without a connection.
۞ Saves the last surah and listening position.

۞ Night mode and full customization for a comfortable reading experience.
۞ And many more features.

Download now and make the Quran your companion in every moment.`,

    es: `La aplicación «Corán Sagrado — Biblioteca Alheekmah»: lee, escucha y memoriza el Corán Sagrado con una comprensión más profunda — mus'haf, recitación, tafsir y taywid en una sola aplicación que funciona sin conexión, con Midad, tu asistente inteligente de búsqueda de conocimiento.

La aplicación se basa en el mus'haf del Complejo del Rey Fahd, con una interfaz moderna y sencilla que cuida los detalles:

۞ Mus'haf completo sin conexión: un mus'haf idéntico al mus'haf utmani.
۞ Recitación palabra por palabra: aprende la pronunciación correcta con una selección de los recitadores más famosos.
۞ Tafsir e i'rab: comprende el significado, la flexión y la sintaxis de cada palabra.
۞ Taywid y las diez qira'at: reglas claras y recitaciones precisas.
۞ Memorización organizada: marcadores, aleyas similares y repaso más fácil.

۞ El maestro del Corán:
۞ Tasmī' (repaso de recitación): las palabras están ocultas y aparecen mientras recitas.
۞ Corrector de recitación: las aleyas permanecen visibles, con corrección instantánea de cada palabra incorrecta hasta que se recite correctamente.
۞ El maestro del Corán: el recitador recita la aleya, luego la recitas tú, y se repite hasta que la domines.

۞ Adhkar de Hisn al-Muslim: recordatorios diarios con favoritos y navegación rápida.

۞ Biblioteca islámica:
۞ Una enciclopedia completa de libros islámicos.
۞ Explora los libros por categoría.
۞ Búsqueda dentro del propio libro, no solo en los títulos.
۞ Búsqueda de títulos de capítulos y temas.
۞ Acceso a la tabla de contenidos y salto a un capítulo o tema concreto.
۞ Lectura de libros en una interfaz de páginas navegable.
۞ Guardado del último punto alcanzado en el libro para continuar más tarde.
۞ Una sección especial para los libros leídos o descargados recientemente.

۞ Midad — el asistente inteligente:
۞ Búsqueda de conocimiento en internet con datos del Centro de Tafsir para Estudios Coránicos.
۞ Cambia entre modelos de búsqueda según tus necesidades.
۞ Pasa de la respuesta al libro y lee el texto completo en su contexto.

۞ El mus'haf de audio:
۞ Escucha las suras completas desde la lista de suras.
۞ Soporte para un gran número de recitadores.
۞ Descarga la sura en el dispositivo para escucharla más tarde sin conexión.
۞ Guardado de la última sura y de la posición de escucha.

۞ Modo nocturno y personalización completa para una lectura cómoda.
۞ Y muchas más funciones.

Descárgala ahora y haz del Corán tu compañero en cada momento.`,

    tr: `«Kur'an-ı Kerim — Hikmet Kütüphanesi» uygulaması: Kur'an-ı Kerim'i daha derin bir anlayışla okuyun, dinleyin ve ezberleyin — internetsiz çalışan tek uygulamada mushaf, tilavet, tefsir ve tecvid, ayrıca bilgi aramada akıllı asistanınız Midad ile birlikte.

Uygulama, Kral Fahd Mushaf Basım Kompleksi mushafını temel alır; ayrıntılara özen gösteren modern ve kullanımı kolay bir arayüze sahiptir:

۞ İnternetsiz eksiksiz mushaf: Osmanî mushafla birebir aynı bir mushaf.
۞ Kelime kelime tilavet: En ünlü hâfızlardan oluşan seçkin bir kadroyla doğru telaffuzu öğrenin.
۞ Tefsir ve irab: Her kelimenin anlamını, sarfını ve irabını kavrayın.
۞ Tecvid ve On Kıraat: Açık hükümler ve titiz kıraatler.
۞ Düzenli ezber: Yer imleri, benzer ayetler ve daha kolay tekrar.

۞ Kur'an öğretmeni:
۞ Tesmia (okuma dinleme): Kelimeler gizlidir ve siz tilavet ederken görünür.
۞ Tilavet düzeltici: Ayetler görünür durumdadır; yanlış okunan her kelime, doğru okunana kadar anında düzeltilir.
۞ Kur'an öğretmeni: Hâfız ayeti okur, ardından siz okursunuz; iyice öğrenene kadar tekrarlanır.

۞ Hisnü'l-Müslim zikirleri: Favoriler ve hızlı gezinme ile günlük zikirler.

۞ İslam kütüphanesi:
۞ İslami kitaplar için kapsamlı bir ansiklopedi.
۞ Kitapları kategorilere göre keşfedin.
۞ Yalnızca kitap başlıklarında değil, kitabın içinde de arama.
۞ Bab ve konu başlıklarında arama.
۞ İçindekiler bölümüne erişin ve belirli bir bab ya da konuya gidin.
۞ Kitapları, sayfalar arasında gezinilebilen bir arayüzde okuyun.
۞ Kitapta kaldığınız son yeri, sonra devam etmek için kaydedin.
۞ Son zamanlarda okunan ya da indirilen kitaplar için özel bir bölüm.

۞ Midad — akıllı asistan:
۞ Tefsir Merkezi Kur'an Çalışmaları verilerine dayanan internet tabanlı bilgi arama.
۞ İhtiyacınıza göre arama modelleri arasında geçiş yapın.
۞ Cevaptan kitaba geçin ve metni bağlamı içinde eksiksiz okuyun.

۞ Sesli mushaf:
۞ Sure listesinden surelerin tamamını dinleyin.
۞ Çok sayıda hâfız desteği.
۞ Sureyi daha sonra internetsiz dinlemek üzere cihazınıza indirin.
۞ Son dinlenen sureyi ve dinleme konumunu kaydeder.

۞ Gece modu ve rahat bir okuma deneyimi için eksiksiz kişiselleştirme.
۞ Ve daha birçok özellik.

Hemen indirin ve Kur'an'ı her anınızın yol arkadaşı yapın.`,

    ur: `«قرآن کریم — مكتبة الحکمة» ایپ: قرآن کریم کو گہری سمجھ کے ساتھ پڑھیں، سنیں اور یاد کریں — ایک ہی ایپ میں مصحف، تلاوت، تفسیر اور تجوید جو انٹرنیٹ کے بغیر کام کرتی ہے، اور ساتھ مداد — علمی تلاش کے لیے آپ کا ذاتی معاون۔

یہ ایپ ملک فہد کمپلکس کے مصحف پر مبنی ہے، اور جدید و آسان انٹرفیس رکھتی ہے جو تفصیل کا خیال رکھتا ہے:

۞ مکمل آف لائن مصحف: عثمانی مصحف کے مطابق مصحف۔
۞ لفظ بہ لفظ تلاوت: مشہور قاریوں کے منتخب مجموعے کے ساتھ درست تلفظ سیکھیں۔
۞ تفسیر و اعراب: ہر لفظ کا معنی، صرف اور اعراب سمجھیں۔
۞ تجوید اور دس قراءتیں: واضح احکام اور محتاط قراءتیں۔
۞ منظم حفظ: نشانیاں، مشابہ آیات اور آسان مراجعہ۔

۞ معلم القرآن:
۞ سماعی: الفاظ چھپے ہوتے ہیں اور آپ کی تلاوت کے دوران ظاہر ہوتے ہیں۔
۞ مصحح تلاوت: آیات نظر آتی رہتی ہیں اور ہر غلط لفظ کی فوری اصلاح ہوتی ہے یہاں تک کہ وہ درست پڑھی جائے۔
۞ معلم القرآن: قاری آیت تلاوت کرتا ہے پھر آپ اس کی تلاوت کرتے ہیں، اور یہ سلسلہ اس وقت تک دہرایا جاتا ہے جب تک آپ اسے مکمل طرح سیکھ نہ لیں۔

۞ حصن المسلم کے اذکار: پسندیدہ فہرست اور تیز منتقلی کے ساتھ روزانہ اذکار۔

۞ اسلامی لائبریری:
۞ اسلامی کتب کی جامع انسائیکلوپیڈیا۔
۞ درجہ بندی کے مطابق کتب دیکھیں۔
۞ صرف کتابوں کے عنوانات میں نہیں بلکہ کتاب کے اندر بھی تلاش۔
۞ ابواب اور موضوعات کے عنوانات کی تلاش۔
۞ فہرست مضامین تک رسائی اور کسی مخصوص باب یا موضوع پر منتقلی۔
۞ ایسے صفحاتی انٹرفیس میں کتب پڑھیں جس میں آسانی سے منتقل ہو سکیں۔
۞ کتاب میں اپنا آخری مقام محفوظ کریں تاکہ بعد میں وہیں سے جاری رکھیں۔
۞ حال ہی میں پڑھی گئی یا ڈاؤن لوڈ کی گئی کتب کے لیے مخصوص سیکشن۔

۞ مداد — ذاتی معاون:
۞ تفسیر مرکز برائے قرآنی مطالعات کے مواد پر مبنی انٹرنیٹ علمی تلاش۔
۞ اپنی ضرورت کے مطابق تلاش کے ماڈل بدلیں۔
۞ جواب سے کتاب پر جائیں اور مکمل متن اس کے سیاق میں پڑھیں۔

۞ صوتی مصحف:
۞ سورتوں کی فہرست کے ذریعے مکمل سورتیں سنیں۔
۞ بڑی تعداد میں قاریوں کی معاونت۔
۞ سورت کو ڈیوائس پر ڈاؤن لوڈ کریں تاکہ بعد میں انٹرنیٹ کے بغیر سنیں۔
۞ آخری سورت اور سننے کے مقام کی حفاظت۔

۞ رات کا موڈ اور آرام دہ مطالعے کے لیے مکمل تخصیص۔
۞ اور بھی بہت سی خصوصیات۔

ابھی ڈاؤن لوڈ کریں اور قرآن کو ہر لمحے اپنا ساتھی بنائیں۔`,

    id: `Aplikasi "Al-Qur'an — Perpustakaan Alheekmah": Baca, dengarkan, dan hafalkan Al-Qur'an dengan pemahaman yang lebih dalam — mushaf, tilawah, tafsir, dan tajwid dalam satu aplikasi yang bekerja tanpa internet, bersama Midad, asisten cerdas Anda untuk penelusuran pengetahuan.

Aplikasi ini berbasis mushaf Kompleks Percetakan Al-Qur'an Raja Fahd, dengan antarmuka modern yang mudah digunakan dan memperhatikan detail:

۞ Mushaf lengkap tanpa internet: Mushaf yang identik dengan mushaf Utsmani.
۞ Tilawah kata demi kata: Pelajari pelafalan yang benar bersama pilihan qari terkemuka.
۞ Tafsir dan i'rab: Pahami makna, sharf, dan i'rab setiap kata.
۞ Tajwid dan Sepuluh Qira'at: Hukum yang jelas dan bacaan yang cermat.
۞ Hafalan terorganisir: Penanda ayat, ayat mutasyabihat, dan murajaah yang lebih mudah.

۞ Pengajar Al-Qur'an:
۞ Tasmee (setoran hafalan): Kata-kata disembunyikan dan muncul saat Anda membaca.
۞ Koreksi tilawah: Ayat-ayat tetap tampak, dengan koreksi instan untuk setiap kata yang salah hingga terbaca dengan benar.
۞ Pengajar Al-Qur'an: Qari membacakan ayat, lalu Anda mengikuti, dan diulang hingga Anda menguasainya.

۞ Adzkar Hisnul Muslim: Dzikir harian dengan fitur favorit dan navigasi cepat.

۞ Perpustakaan Islam:
۞ Ensiklopedia lengkap buku-buku Islam.
۞ Jelajahi buku berdasarkan kategori.
۞ Pencarian di dalam buku itu sendiri, bukan hanya pada judul buku.
۞ Pencarian judul bab dan topik.
۞ Akses ke daftar isi dan berpindah ke bab atau topik tertentu.
۞ Membaca buku dalam antarmuka halaman yang mudah dinavigasi.
۞ Menyimpan posisi terakhir yang Anda capai dalam buku untuk dilanjutkan nanti.
۞ Bagian khusus untuk buku yang baru dibaca atau diunduh.

۞ Midad — asisten cerdas:
۞ Penelusuran pengetahuan berbasis data Pusat Tafsir untuk Studi Al-Qur'an.
۞ Ganti model pencarian sesuai kebutuhan Anda.
۞ Lanjutkan dari jawaban ke kitab dan baca teks lengkap dalam konteksnya.

۞ Mushaf audio:
۞ Dengarkan surat lengkap melalui daftar surat.
۞ Dukungan untuk banyak qari.
۞ Unduh surat ke perangkat untuk didengarkan nanti tanpa koneksi.
۞ Menyimpan surat terakhir dan posisi terakhir didengarkan.

۞ Mode malam dan kustomisasi penuh untuk pengalaman membaca yang nyaman.
۞ Dan masih banyak fitur lainnya.

Unduh sekarang dan jadikan Al-Qur'an teman setia Anda di setiap saat.`,

    ku: `ئەپی «قورئانی پیرۆز — کتێبخانەی حیکمە»: قورئانی پیرۆز بە تێگەیشتنی قووڵترەوە بخوێنەرەوە، بیبیستە و لەبەری بکە — لە یەک ئەپدا موسحەف و قیڕائەت و تەفسیر و تەجوید کە بەبێ ئینتەرنێت کار دەکات، لەگەڵ میداد، یاریدەدەری زیرەکەت بۆ گەڕانی زانیاری.

ئەپەکە پشتی بە موسحەفی کۆمپلێکسی شا فەهد بەستووە، بە ڕووکارێکی نوێ و ئاسان کە گرنگی بە وردەکارییەکان دەدات:

۞ موسحەفی تەواو بەبێ ئینتەرنێت: موسحەفێک کە لەگەڵ موسحەفی عوسمانیدا تەواو دەچێت.
۞ قیڕائەت وشە بە وشە: لەگەڵ دیارترین قورئانخوەنەکاندا خوێندنەوەی ڕاست فێر بە.
۞ تەفسیر و ئیعراب: واتا و سەرف و ئیعرابی هەر وشەیەک تێبگە.
۞ تەجوید و دە قیڕائەت: حوکمی ڕوون و قیڕائەتی ورد و نزیک.
۞ لەبەرکردنی ڕێکخراو: نیشانەکردن، ئایەتە هاوشێوەکان و چاپکردنی ئاسانتر.

۞ مامۆستای قورئان:
۞ تەسمیع: وشەکان دەشاردرێنەوە و لە کاتی خوێندنەوەتدا دەردەکەون.
۞ ڕاستکەرەوەی قیڕائەت: ئایەتەکان دیارن و بۆ هەر وشەیەکی هەڵە ڕاستکردنەوەی خێرا دەکرێت هەتا بە دروستی دەخوێنرێتەوە.
۞ مامۆستای قورئان: قورئانخوەن ئایەتەکە دەخوێنێتەوە، پاشان تۆ دەیخوێنیتەوە، و ئەمە دووبارە دەبێتەوە هەتا بە تەواوی فێری دەبیت.

۞ زیکرەکانی حیسنول موسلیم: زیکری ڕۆژانە لەگەڵ دڵخوازەکان و گەڕانی خێرا.

۞ کتێبخانەی ئیسلامی:
۞ ئینسایکلۆپیدیایەکی تەواو بۆ کتێبە ئیسلامییەکان.
۞ بینینی کتێبەکان بەپێی پۆلێنکردن.
۞ گەڕان لە ناو کتێبەکە خۆیدا، نەک تەنها لە ناونیشانەکانیدا.
۞ گەڕان بەدوای ناونیشانی بەشەکان و بابەتەکاندا.
۞ گەیشتن بە پێڕستی ناوەڕۆک و بردنی بۆ بەش یان بابەتێکی دیاریکراو.
۞ خوێندنەوەی کتێبەکان لە ڕووکاری پەڕەکاندا کە دەکرێت بۆماوەی بچیت.
۞ پاشەکەوتکردنی دوایین شوێن کە گەیشتوویەتی لە کتێبەکەدا بۆ بەردەوامبوون دواتر.
۞ بەشێکی تایبەت بە کتێبەکانی ئەم دواییە خوێندراو یان داگیراوان.

۞ میداد — یاریدەدەری زیرەک:
۞ گەڕانی زانیاری لە ئینتەرنێتدا بە پشتبەستن بە داتای ناوەندی تەفسیر بۆ لێکۆڵینەوە قورئانییەکان.
۞ لە نێو مۆدێلەکانی گەڕاندا بگۆڕە بۆ ئەوەی لەگەڵ پێداویستییەکەت بگونجێت.
۞ لە وەڵامەوە بڕۆ سەر کتێب و دەقی تەواو لە چوارچێوەکەیدا بخوێنەرەوە.

۞ موسحەفی دەنگی:
۞ گوێگرتن لە سورەتە تەواوەکان لە ڕێگەی لیستی سورەتەکانەوە.
۞ پشتگیری ژمارەیەکی زۆر لە قورئانخوەنان.
۞ داگرتنی سورەت لەسەر ئامێرەکەت بۆ گوێگرتن دواتر بەبێ ئینتەرنێت.
۞ پاشەکەوتکردنی دوایین سورەت و شوێنی گوێگرتن.

۞ دۆخی شەوانە و دڵخوازکردنی تەواو بۆ خوێندنەوەیەکی ئاسان.
۞ و تایبەتمەندی زۆر زیاتر.

ئێستا دابگرە و قورئان لە هەر ساتێکدا بکە بە هاوڕێی خۆت.`,

    so: `Barnaamijka "Qur'aanka Kariimka — Maktabadda Alheekmah": Akhri, dhageyso, oo xifdi Qur'aanka Kariimka ah oo fahin dheeraad ah leh — musxaf, akhri (tilawa), fasir iyo tajwiid oo dhan hal barnaamij oo shaqeeya internet la'aan, iyo Midad, kaaliyahaaga caqliga leh ee raadinta aqoonta.

Barnaamijku wuxuu ku salaysan yahay musxafka Isku-xirka Boqor Fahd ee daabacaadda Musxafka Sharafka ah, isla markaasna leh interface casri ah oo fudud oo dherer u saaraya faahfaahinta:

۞ Musxaf buuxa internet la'aan: musxaf la mid ah musxafka Uthmani.
۞ Akhrin erey erey: Baro dubabbista saxda ah iyadoo laga soo dooratay qurra'yada ugu caansan.
۞ Fasir iyo iraab: Fahmo macnaha, sarfka iyo iraabka erey kasta.
۞ Tajwiid iyo Tobane Qiraa'aad: Xeerar cad iyo qiraa'aad sax ah.
۞ Xifdin habaysan: Calaamado wax lagu xardhay, aayado isle'eg, iyo dib-u-eegis aasaan ah.

۞ Baraye Qur'aanka:
۞ Tasmii (xajiinta akhriska): Ereyada waa la qariyaa waxayna muuqdaan inta aad akhrinayso.
۞ Hagaajiyaha akhriska: Aayadaha waa muuqdaan, erey kasta oo qaldanna waxaa si degdeg ah loo hagaajiyaa ilaa ay sax datay.
۞ Baraye Qur'aanka: Qaarihii wuxuu aayadda akhriyaa, ka dib adiga ayaa akhriyaa, waxaana loo celiyaa ilaa aad gaadho heer aad u fiican.

۞ Adkaarta Xisnul Muslim: Adkaar maalinle ah oo leh kuwa aad dooratay iyo u gudubka degdegga ah.

۞ Maktabad Islaamka:
۞ Ensiklopediya oo dhan oo ku saabsan kutubta Islaamka.
۞ Fiiri kutubta ay ku horreeyaan qaybaha.
۞ Raadin gudaha kitaabka laftiisa, oo aan ahayn magacaabaha kutubta oo keliya.
۞ Raadin magacaabaha cutubyada iyo mawduucyada.
۞Hel fahfahinta tusmada qoraalka oo u gudub cutub ama mawduuc gaar ah.
۞ Akhri kutubta interface bogag ah oo si fudud loo dhaqaajin karo.
۞ Kaydi meesha uu akhriskaagu ku dhacay ee ugu dambeysay si aad u sii waddo marka dambe.
۞ Qayb gaar ah oo lagu kaydiyay kutubta dhawaan la akhriyay ama la shubay.

۞ Midad — kaaliyaha caqliga leh:
۞ Raadin aqoon oo ku shaqeeya internetka, laguna salaynayo xogta Xarunta Fasirka ee Barashada Qur'aanka.
۞ U beddel qaababka raadinta sida uu ugu habboon yahay baahidaada.
۞ Ka jawaabta u gudub kitaabka oo akhri qoraalka oo dhan si macquul ah.

۞ Musxafka codka:
۞ Dhageyso suuradaha oo dhan iyada oo laga soo marayo liiska suuradaha.
۞ Taageero tiro badan oo qurra'yo ah.
۞ Shub suuradda gudaha aaladda si aad ugu dhageysato marka dambe oo aan internet lahayn.
۞ Kaydi suuradda ugu dambeysay iyo meeshii aad ka dhageysanaysey.

۞ Hab habeenkii iyo habayn buuxda ee akhris aasaan u noqda.
۞Iyo sifooyin badan oo kale.

Hadda shub oo dhig Qur'aanka inuu noqdo saaxiibkaaga waqtiga kasta.`,

    tl: `Ang app na "Banal na Qur'an — Alheekmah Library": Basahin, pakinggan, at memorahin ang Banal na Qur'an nang may mas malalim na pag-unawa — mushaf, pagbigkas, tafsir, at tajwid sa iisang app na gumagana nang offline, kasama ang Midad, ang iyong matalinong katulong sa paghahanap ng kaalaman.

Naka-base ang app sa mushaf ng King Fahd Complex para sa Pagpi-print ng Banal na Qur'an, na may moderno at madaling gamiting interface na nagmamalasakit sa mga detalye:

۞ Kumpletong mushaf nang offline: Mushaf na katulad ng mushaf na Uthmani.
۞ Pagbigkas salita-sa-salita: Matuto ng tamang pagbigkas kasama ang mga pinakatanyag na tagapagbasa.
۞ Tafsir at i'rab: Unawain ang kahulugan, anyo (sarf), at balarila ng bawat salita.
۞ Tajwid at Sampung Qira'at: Malinaw na alituntunin at tumpak na pagbasa.
۞ Maayos na memorasyon: Mga bookmark, magkakatulad na talata, at mas madaling pagbabalik-aral.

۞ Guro ng Qur'an:
۞ Tasmee (pagsusuri ng pagbigkas): Nakatago ang mga salita at lumilitaw habang nagbubigkas ka.
۞ Tagapagtama ng pagbigkas: Nakikita ang mga talata, na may agarang pagtama sa bawat maling salita hanggang sa mabasa ito nang tama.
۞ Guro ng Qur'an: Binibigkas ng tagapagbasa ang talata, pagkatapos ay ikaw naman ang babigkas, at inuulit ito hanggang sa malinang mo ito.

۞ Mga adhkar ng Hisn al-Muslim: Pang-araw-araw na pag-aalaala na may mga paborito at mabilis na pag-navigate.

۞ Islamic library:
۞ Komprehensibong ensayklopidya ng mga Islamikong aklat.
۞ Mag-browse ng mga aklat ayon sa kategorya.
۞ Paghahanap sa loob mismo ng aklat, hindi lamang sa mga pamagat ng aklat.
۞ Paghahanap sa mga pamagat ng kabanata at paksa.
۞ Pag-access sa talahanayan ng nilalaman at pagpunta sa isang partikular na kabanata o paksa.
۞ Pagbasa ng mga aklat sa interface na may mga pahinang nagagawang libutin.
۞ Pag-save ng huling posisyong narating mo sa aklat para ipagpatuloy sa ibang pagkakataon.
۞ Espesyal na seksyon para sa mga aklat na kamakailang nabasa o na-download.

۞ Midad — ang matalinong katulong:
۞ Paghahanap ng kaalaman sa internet na nakabatay sa datos ng Tafsir Center for Quranic Studies.
۞ Magpalipat-lipat ng mga modelo ng paghahanap ayon sa iyong pangangailangan.
۞ Mula sa sagot, puntahan ang aklat at basahin ang buong teksto sa konteksto nito.

۞ Audio na mushaf:
۞ Makinig sa buong mga surah sa pamamagitan ng listahan ng mga surah.
۞ Suporta para sa malaking bilang ng mga tagapagbasa.
۞ I-download ang surah sa iyong device para makinig sa ibang pagkakataon nang walang koneksyon.
۞ Nagse-save ng huling surah at posisyon ng pakikinig.

۞ Night mode at kumpletong pag-customize para sa komportableng pagbasa.
۞At marami pang iba.

I-download ngayon at gawing kasama ang Qur'an sa bawat sandali.`,

    be: `"পবিত্র কুরআন — আলহিকমাহ লাইব্রেরি" অ্যাপ: গভীর উপলব্ধির সাথে পবিত্র কুরআন পড়ুন, শুনুন ও হিফজ করুন — একটি অ্যাপেই মুসহাফ, তিলাওয়াত, তাফসির ও তাজবিদ, যা ইন্টারনেট ছাড়াই কাজ করে, সাথে মিদাদ — জ্ঞান অনুসন্ধানে আপনার স্মার্ট সহকারী।

অ্যাপটি বাদশাহ ফাহদ কুরআন প্রিন্টিং কমপ্লেক্সের মুসহাফের ওপর ভিত্তি করে তৈরি, আধুনিক ও সহজ ইন্টারফেসসহ, যা খুঁটিনাটির যত্ন নেয়:

۞ সম্পূর্ণ অফলাইন মুসহাফ: উসমানি মুসহাফের সাথে সম্পূর্ণ সঙ্গতিপূর্ণ মুসহাফ।
۞ শব্দে শব্দে তিলাওয়াত: সবচেয়ে বিখ্যাত ক্বারিদের নির্বাচিত তিলাওয়াতে সঠিক উচ্চারণ শিখুন।
۞ তাফসির ও ই'রাব: প্রতিটি শব্দের অর্থ, সরফ ও ই'রাব বুঝুন।
۞ তাজবিদ ও দশ ক্বিরাআত: স্পষ্ট বিধান ও নিখুঁত ক্বিরাআত।
۞ সুশৃঙ্খল হিফজ: বুকমার্ক, সাদৃশ্যপূর্ণ আয়াত ও সহজ পুনরালোচনা।

۞ কুরআন শিক্ষক:
۞ তাসমী (তিলাওয়াত পরীক্ষা): শব্দগুলো লুকানো থাকে এবং আপনার তিলাওয়াতের সময় প্রকাশ পায়।
۞ তিলাওয়াত সংশোধক: আয়াতগুলো দৃশ্যমান থাকে এবং প্রতিটি ভুল শব্দের তাৎক্ষণিক সংশোধন হয়, যতক্ষণ না তা সঠিকভাবে পড়া হয়।
۞ কুরআন শিক্ষক: ক্বারি আয়াতটি পড়ে শোনান, তারপর আপনি পড়েন, এবং আয়ত্ত না হওয়া পর্যন্ত তা পুনরাবৃত্তি হয়।

۞ হিসনুল মুসলিমের যিকর: প্রিয় তালিকা ও দ্রুত নেভিগেশনসহ দৈনিক যিকরসমূহ।

۞ ইসলামী লাইব্রেরি:
۞ ইসলামী বইয়ের একটি বিস্তৃত বিশ্বকোষ।
۞ বিভাগ অনুযায়ী বই ব্রাউজ করুন।
۞ শুধু বইয়ের শিরোনামে নয়, বইয়ের ভেতরেই অনুসন্ধান।
۞অধ্যায় ও বিষয়ের শিরোনাম অনুসন্ধান।
۞ সূচিপত্রে প্রবেশাধিকার এবং নির্দিষ্ট কোনো অধ্যায় বা বিষয়ে যাওয়া।
۞ পৃষ্ঠা অনুযায়ী নেভিগেট করার সুবিধাসহ ইন্টারফেসে বই পড়া।
۞ পরে চালিয়ে যাওয়ার জন্য বইয়ে আপনার শেষ অবস্থান সংরক্ষণ।
۞ সম্প্রতি পড়া বা ডাউনলোড করা বইয়ের জন্য আলাদা বিভাগ।

۞ মিদাদ — স্মার্ট সহকারী:
۞ তাফসির সেন্টার ফর কুরআনিক স্টাডিজের তথ্যের ওপর ভিত্তি করে ইন্টারনেটে জ্ঞান অনুসন্ধান।
۞ আপনার প্রয়োজন অনুযায়ী সার্চ মডেল পরিবর্তন করুন।
۞ উত্তর থেকে কিতাবে চলে যান এবং পূর্ণ প্রসঙ্গে মূল পাঠ পড়ুন।

۞ অডিও মুসহাফ:
۞ সূরার তালিকা থেকে সম্পূর্ণ সূরা শুনুন।
۞প্রচুর সংখ্যক ক্বারির সমর্থন।
۞ পরে ইন্টারনেট ছাড়া শোনার জন্য সূরা ডিভাইসে ডাউনলোড করুন।
۞শেষ সূরা ও শোনার অবস্থান সংরক্ষণ।

۞ নাইট মোড ও আরামদায়ক পড়ার অভিজ্ঞতার জন্য সম্পূর্ণ কাস্টমাইজেশন।
۞আরও অনেক ফিচার।

এখনই ডাউনলোড করুন এবং কুরআনকে করে নিন প্রতিটি মুহূর্তের সঙ্গী।`,
  },

  azkary: {
    ar: `تطبيق «أذكاري من الكتاب والسنة» هو رفيقك اليومي للأذكار والأدعية، يجمع أذكار القرآن الكريم والسنة النبوية في واجهة سهلة ومريحة، مع أدوات للحفظ والمشاركة والتذكير.
يقدم التطبيق مجموعة واسعة من الأذكار والأدعية المأثورة، مصنفة بحسب المناسبات والأوقات والحالات المختلفة:

۞ أذكار منظمة وسهلة القراءة:
۞ أذكار متنوعة من الكتاب والسنة.
۞ تصفح الأذكار حسب التصنيف والموضوع.
۞ عرض كل مجموعة من الأذكار في صفحة مستقلة.
۞ إظهار عدد مرات تكرار الذكر.
۞ عرض مصدر الذكر ومرجعه.
۞ تصميم مريح للقراءة باللغة العربية.
۞ إمكانية تكبير أو تصغير حجم الخط بما يناسبك.
۞ إضافة أي ذكر إلى قائمة المفضلة بضغطة واحدة.
۞ إنشاء تذكيرات شخصية للأذكار.

۞ المشاركة والنسخ:
۞ مشاركة الذكر كنص مع الآخرين.
۞ إنشاء صورة جميلة تحتوي على الذكر ومشاركته عبر التطبيقات المختلفة.
۞ نسخ نص الذكر إلى الحافظة بسهولة.

أذكاري من الكتاب والسنة ليس مجرد قائمة أذكار، بل تطبيق يومي يساعدك على المحافظة على الذكر والدعاء، والوصول السريع إلى الأذكار المأثورة، وحفظ ما تحب منها، ومشاركتها، وتلقي التذكيرات في الأوقات التي تختارها.
حمّل تطبيق أذكاري من الكتاب والسنة واجعل الذكر رفيقك في كل يوم.`,

    en: `The "Azkary from the Quran and Sunnah" app is your daily companion for adhkar and duas. It brings together the remembrances of the Holy Quran and the Prophetic Sunnah in an easy, comfortable interface, with tools for saving, sharing, and reminders.
The app offers a wide collection of authentic adhkar and duas, categorized by occasions, times, and different situations:

۞ Organized, easy-to-read adhkar:
۞ A variety of adhkar from the Quran and Sunnah.
۞ Browse adhkar by category and topic.
۞ Each group of adhkar is displayed on its own page.
۞ Display of the number of times each dhikr is repeated.
۞ Display of the source and reference of each dhikr.
۞ A comfortable design for reading in Arabic.
۞ Increase or decrease the font size as suits you.
۞ Add any dhikr to your favorites with a single tap.
۞ Create personal reminders for adhkar.

۞ Sharing and copying:
۞ Share a dhikr as text with others.
۞ Create a beautiful image containing the dhikr and share it through different apps.
۞ Easily copy the text of a dhikr to the clipboard.

Azkary from the Quran and Sunnah is not just a list of adhkar; it is a daily app that helps you stay consistent in dhikr and dua, quickly reach authentic remembrances, save the ones you love, share them, and receive reminders at the times you choose.
Download the Azkary from the Quran and Sunnah app and make dhikr your companion every day.`,

    es: `La aplicación «Azkary del Corán y la Suna» es tu compañero diario de adhkar y súplicas: reúne los adhkar del Corán Sagrado y de la Suna profética en una interfaz sencilla y cómoda, con herramientas para guardar, compartir y recibir recordatorios.
La aplicación ofrece una amplia colección de adhkar y súplicas transmitidos, clasificados según ocasiones, momentos y situaciones diferentes:

۞ Adhkar organizados y fáciles de leer:
۞ Adhkar variados del Corán y la Suna.
۞ Explora los adhkar por categoría y tema.
۞ Cada grupo de adhkar se muestra en una página independiente.
۞ Muestra del número de veces que se repite cada dhikr.
۞ Muestra de la fuente y la referencia de cada dhikr.
۞ Un diseño cómodo para la lectura en árabe.
۞ Aumenta o reduce el tamaño de la letra a tu gusto.
۞ Añade cualquier dhikr a tus favoritos con un solo toque.
۞ Crea recordatorios personalizados para los adhkar.

۞ Compartir y copiar:
۞ Comparte un dhikr como texto con otras personas.
۞ Crea una imagen bonita que contenga el dhikr y compártela a través de diferentes aplicaciones.
۞ Copia fácilmente el texto del dhikr al portapapeles.

Azkary del Corán y la Suna no es solo una lista de adhkar, sino una aplicación diaria que te ayuda a mantener la constancia en el dhikr y la súplica, llegar rápidamente a los adhkar transmitidos, guardar los que más te gusten, compartirlos y recibir recordatorios en los momentos que elijas.
Descarga la aplicación Azkary del Corán y la Suna y haz del dhikr tu compañero de cada día.`,

    tr: `«Azkary — Kur'an ve Sünnet'ten Zikirler» uygulaması, zikir ve dualardaki günlük yol arkadaşınızdır; Kur'an-ı Kerim'in ve Peygamber Sünneti'nin zikirlerini kolay ve rahat bir arayüzde bir araya getirir; kaydetme, paylaşma ve hatırlatma araçlarıyla birlikte.
Uygulama; vesilelere, vakitlere ve farklı durumlara göre sınıflandırılmış, geniş bir rivayet edilen zikir ve dua koleksiyonu sunar:

۞ Düzenli ve okunması kolay zikirler:
۞ Kur'an ve Sünnet'ten çeşitli zikirler.
۞ Zikirleri kategoriye ve konuya göre keşfedin.
۞ Her zikir grubu kendi sayfasında gösterilir.
۞ Her zikrin kaç kez tekrarlanacağının gösterilmesi.
۞ Her zikrin kaynağının ve referansının gösterilmesi.
۞ Arapça okuma için rahat bir tasarım.
۞ Yazı boyutunu dilediğiniz gibi büyütün veya küçültün.
۞ Herhangi bir zikri tek dokunuşla favorilerinize ekleyin.
۞ Zikirler için kişisel hatırlatıcılar oluşturun.

۞ Paylaşma ve kopyalama:
۞ Bir zikri metin olarak başkalarıyla paylaşın.
۞ Zikri içeren güzel bir görsel oluşturun ve farklı uygulamalar üzerinden paylaşın.
۞ Zikrin metnini kolayca panoya kopyalayın.

«Azkary — Kur'an ve Sünnet'ten Zikirler» yalnızca bir zikir listesi değildir; zikir ve duada devamlılık göstermenize, rivayet edilen zikirlere hızlıca ulaşmanıza, sevdiklerinizi kaydetmenize, paylaşmanıza ve seçtiğiniz vakitlerde hatırlatıcı almanıza yardımcı olan günlük bir uygulamadır.
«Azkary — Kur'an ve Sünnet'ten Zikirler» uygulamasını hemen indirin ve zikri her gününüzün yol arkadaşı yapın.`,

    ur: `«اذکاری من الكتاب والسنة» ایپ اذکار و ادعیہ میں آپ کی روزانہ ساتھی ہے، جو قرآن کریم اور سنت نبوی کے اذکار کو آسان اور آرام دہ انٹرفیس میں یکجا کرتی ہے، حفظ، شیئرنگ اور یاد دہانی کے آلات کے ساتھ۔
یہ ایپ مأثر اذکار و ادعیہ کا وسیع مجموعہ پیش کرتی ہے، جو مختلف مواقع، اوقات اور حالات کے مطابق درجہ بند کیے گئے ہیں:

۞ منظم اور پڑھنے میں آسان اذکار:
۞ کتاب و سنت سے متنوع اذکار۔
۞ درجہ بندی اور موضوع کے مطابق اذکار دیکھیں۔
۞ ہر گروہ کے اذکار کا الگ صفحے پر ظاہر ہونا۔
۞ ذکر کے تکرار کی تعداد کا ظاہر ہونا۔
۞ ذکر کے مصدر اور حوالے کا ظاہر ہونا۔
۞ عربی مطالعے کے لیے آرام دہ ڈیزائن۔
۞ فونٹ کا سائز اپنی ضرورت کے مطابق بڑھائیں یا گھٹائیں۔
۞ کسی بھی ذکر کو ایک ہی دباؤ پر پسندیدہ فہرست میں شامل کریں۔
۞ اذکار کے لیے ذاتی یاد دہانیاں بنائیں۔

۞ شیئرنگ اور نقل:
۞ ذکر کو متن کی صورت میں دوسروں کے ساتھ شیئر کریں۔
۞ ذکر پر مشتمل خوبصورت تصویر بنائیں اور مختلف ایپس کے ذریعے شیئر کریں۔
۞ ذکر کا متن آسانی سے کلپ بورڈ پر نقل کریں۔

اذکاری من الكتاب والسنة محض اذکار کی فہرست نہیں، بلکہ روزانہ کا ایپ ہے جو آپ کو ذکر و دعا پر مستقل رہنے، مأثر اذکار تک تیز رسائی حاصل کرنے، پسندیدہ اذکار محفوظ کرنے، انہیں شیئر کرنے اور اپنے منتخب کردہ اوقات میں یاد دہانیاں وصول کرنے میں مدد دیتا ہے۔
اذکاری من الكتاب والسنة ایپ ڈاؤن لوڈ کریں اور ذکر کو ہر دن اپنا ساتھی بنائیں۔`,

    id: `Aplikasi "Azkary dari Al-Qur'an dan Sunnah" adalah teman harian Anda untuk adzkar dan doa. Aplikasi ini menghimpun adzkar dari Al-Qur'an dan Sunnah Nabi dalam antarmuka yang mudah dan nyaman, dilengkapi fitur untuk menyimpan, membagikan, dan pengingat.
Aplikasi ini menawarkan kumpulan adzkar dan doa yang dituntunkan secara lengkap, diklasifikasikan berdasarkan kesempatan, waktu, dan berbagai situasi:

۞ Adzkar yang tertata dan mudah dibaca:
۞ Adzkar beragam dari Al-Qur'an dan Sunnah.
۞ Telusuri adzkar berdasarkan kategori dan topik.
۞ Setiap kelompok adzkar ditampilkan di halamannya sendiri.
۞ Menampilkan jumlah pengulangan setiap dzikir.
۞ Menampilkan sumber dan referensi setiap dzikir.
۞ Desain yang nyaman untuk membaca dalam bahasa Arab.
۞ Perbesar atau perkecil ukuran huruf sesuai kenyamanan Anda.
۞ Tambahkan dzikir apa pun ke daftar favorit dengan sekali ketuk.
۞ Buat pengingat pribadi untuk adzkar.

۞ Berbagi dan menyalin:
۞ Bagikan dzikir sebagai teks kepada orang lain.
۞ Buat gambar yang indah berisi dzikir dan bagikan melalui berbagai aplikasi.
۞ Salin teks dzikir ke papan klip dengan mudah.

Azkary dari Al-Qur'an dan Sunnah bukan sekadar daftar adzkar, melainkan aplikasi harian yang membantu Anda konsisten berdzikir dan berdoa, mengakses adzkar yang dituntunkan dengan cepat, menyimpan yang Anda sukai, membagikannya, dan menerima pengingat pada waktu yang Anda pilih.
Unduh aplikasi Azkary dari Al-Qur'an dan Sunnah dan jadikan dzikir teman Anda setiap hari.`,

    ku: `ئەپی «أذكاري من الكتاب والسنة» ڕۆژانە هاوڕێی تۆیە بۆ زیکر و دوعا؛ زیکرەکانی قورئانی پیرۆز و سوننەتی پێغەمبەر لە ڕووکارێکی ئاسان و ئارامدا کۆدەکاتەوە، لەگەڵ ئامرازی پاشەکەوتکردن، هاوبەشکردن و بیرخستنەوە.
ئەپەکە کۆمەڵێکی فراوانی زیکر و دوعای مەنسوب پێشکەش دەکات، کە بەپێی بۆنە و کات و حاڵەتە جیاوازەکان پۆلێن کراون:

۞ زیکری ڕێکخراو و ئاسان بۆ خوێندنەوە:
۞ زیکری جۆراوجۆر لە قورئان و سوننەتەوە.
۞ بینینی زیکرەکان بەپێی پۆلێن و بابەت.
۞ پیشاندانی هەر کۆمەڵێک زیکر لە پەڕەیەکی سەربەخۆدا.
۞ پیشاندانی ژمارەی دووبارەکردنەوەی زیکر.
۞ پیشاندانی سەرچاوە و ئاماژەی زیکرەکە.
۞ دیزاینێکی ئارام بۆ خوێندنەوە بە زمانی عەرەبی.
۞ گەورەکردن یان بچووککردنی قەبارەی فۆنت بەپێی ئارەزووی خۆت.
۞ زیادکردنی هەر زیکرێک بۆ لیستی دڵخوازەکان بە یەک کلیک.
۞ دروستکردنی بیرخستنەوەی کەسی بۆ زیکرەکان.

۞ هاوبەشکردن و لەبەرگرتنەوە:
۞ هاوبەشکردنی زیکرەکە وەک دەق لەگەڵ ئەوانی تر.
۞ دروستکردنی وێنەیەکی جوان کە زیکرەکەی تێدایە و هاوبەشکردنی بە ئەپە جیاوازەکان.
۞ لەبەرگرتنەوەی دەقی زیکرەکە بۆ کلیپبۆرد بە ئاسانی.

«أذكاري من الكتاب والسنة» تەنها لیستێکی زیکر نییە، بەڵکو ئەپێکی ڕۆژانەیە کە یارمەتیت دەدات بەردەوام بیت لە زیکر و دوعادا، خێرا بگەیتە زیکرە مەنسوبەکان، ئەوانەی حەزدەکەیت پاشەکەوت بکەیت، هاوبەشیان بکەیت، و لە کاتەکانی هەڵبژاردت بیرخستنەوە وەربگریت.
ئێستا ئەپی «أذكاري من الكتاب والسنة» دابگرە و زیکر بکە بە هاوڕێی ڕۆژانەت.`,

    so: `Barnaamijka "Azkary — Adkaarta Kitaabka iyo Sunnadda" waa saaxiibkaaga maalinlaha ee adkaarta iyo baryada; wuxuu midaysiiyaa adkaarta Qur'aanka Kariimka iyo Sunnadda Nebiga interface fudud oo aasaan ah, oo leh qalab kaydin, wadaagid iyo xasuus-qor.
Barnaamijku wuxuu bixiyaa urur ballaaran oo adkaar iyo baryo la soo gaadhay ah, oo la kala saaray sida munaasabadaha, waqtigyada iyo xaaladaha kala duwan:

۞ Adkaar habaysan oo akhris fudud:
۞ Adkaar kala duwan oo ka soo jeeda Kitaabka iyo Sunnadda.
۞ Fiiri adkaarta ay ku horreeyaan qaybaha iyo mawduucyada.
۞ Koox kasta oo adkaar ah waxaa lagu muujiyaa bog gaar ah.
۞ Muujinta tirada la celinayo adkaarta.
۞ Muujinta asalka iyo tixraaca adkaarta.
۞ Naqshad aasaan oo loogu talagalay akhriska af-Carabiga.
۞ Weyntee ama yaree cabbirka qoraalka sida kugu habboon.
۞ Ku dar adkaar kasta liiska kuwa aad dooratay hal taabasho.
۞ Abuur xasuus-qor gaar ah oo adkaarta ah.

۞ Wadaagista iyo koobiyeentada:
۞ Wadaag adkaarta sida qoraal dadka kale.
۞ Samee sawir qurux badan oo adkaarta ku jira oo ku wadaag barnaamijyada kala duwan.
۞ Koobiye qoraalka adkaarta si fudud.

"Azkary — Adkaarta Kitaabka iyo Sunnadda" ma aha oo keliya liis adkaar ah, waa barnaamij maalinle ah kuu caawiya inaad adkaarta iyo baryada sii waddo, aad degdeg u gaadho adkaarta la soo gaadhay, aad kaydiso kuwa aad jeceshahay, aad wadaagto, iyo inaad helo xasuus-qor waqtiga aad doorato.
Shub hadda barnaamijka "Azkary — Adkaarta Kitaabka iyo Sunnadda" oo dhig adkaarta inay noqoto saaxiibkaaga maalin kasta.`,

    tl: `Ang app na "Azkary mula sa Aklat at Sunnah" ang iyong pang-araw-araw na kasama sa mga adhkar at panalangin. Pinagsasama-sama nito ang mga adhkar mula sa Banal na Qur'an at sa Sunnah ng Propeta sa isang madali at komportableng interface, kasama ang mga tool para sa pag-save, pagbabahagi, at pagpapaalala.
Nag-aalok ang app ng malawak na koleksyon ng mga adhkar at panalangin mula sa tradisyon, na inuri ayon sa mga okasyon, oras, at iba't ibang sitwasyon:

۞ Maayos at madaling basahing mga adhkar:
۞ Iba't ibang adhkar mula sa Aklat at Sunnah.
۞ Mag-browse ng mga adhkar ayon sa kategorya at paksa.
۞ Ipinapakita ang bawat grupo ng mga adhkar sa sarili nitong pahina.
۞ Ipinapakita ang bilang ng pag-uulit ng bawat dhikr.
۞ Ipinapakita ang pinagmulan at sanggunian ng bawat dhikr.
۞ Komportableng disenyo para sa pagbasa sa Arabic.
۞ Palakihin o paliitin ang laki ng font ayon sa nababagay sa iyo.
۞ Magdagdag ng anumang dhikr sa iyong mga paborito nang iisang tap.
۞ Gumawa ng mga personal na paalala para sa mga adhkar.

۞ Pagbabahagi at pagkopya:
۞ Ibahagi ang dhikr bilang teksto sa iba.
۞ Gumawa ng magandang larawan na naglalaman ng dhikr at ibahagi ito sa iba't ibang app.
۞ Madaling kopyahin ang teksto ng dhikr sa clipboard.

Ang "Azkary mula sa Aklat at Sunnah" ay hindi lamang isang listahan ng mga adhkar, kundi isang pang-araw-araw na app na tumutulong sa iyo na manatili sa dhikr at panalangin, mabilis na maabot ang mga adhkar mula sa tradisyon, i-save ang mga gusto mo, ibahagi ang mga ito, at tumanggap ng mga paalala sa mga oras na pipiliin mo.
I-download ngayon ang app na "Azkary mula sa Aklat at Sunnah" at gawing kasama ang dhikr sa bawat araw.`,

    be: `"আজকারি — কুরআন ও সুন্নাহ থেকে" অ্যাপ হলো যিকর ও দোয়ার আপনার দৈনিক সঙ্গী। এটি পবিত্র কুরআন ও নবীজীর সুন্নাহর যিকরসমূহকে একটি সহজ ও আরামদায়ক ইন্টারফেসে একত্র করে, সাথে সংরক্ষণ, শেয়ার ও রিমাইন্ডারের সুবিধা।
অ্যাপটি প্রসিদ্ধ যিকর ও দোয়ার একটি বিস্তৃত সংকলন উপস্থাপন করে, যা বিভিন্ন উপলক্ষ্য, সময় ও পরিস্থিতি অনুযায়ী শ্রেণিবদ্ধ:

۞ সুশৃঙ্খল ও সহজপাঠ্য যিকরসমূহ:
۞ কুরআন ও সুন্নাহ থেকে নানা ধরনের যিকর।
۞ বিভাগ ও বিষয় অনুযায়ী যিকর ব্রাউজ করুন।
۞ প্রতিটি গ্রুপের যিকর আলাদা পৃষ্ঠায় দেখানো হয়।
۞ প্রতিটি যিকর কতবার পড়তে হবে তার সংখ্যা প্রদর্শন।
۞ প্রতিটি যিকরের উৎস ও সূত্র প্রদর্শন।
۞ আরবি পড়ার জন্য আরামদায়ক ডিজাইন।
۞ আপনার সুবিধামতো ফন্টের আকার বড় বা ছোট করুন।
۞ এক ট্যাপে যেকোনো যিকর প্রিয় তালিকায় যোগ করুন।
۞ যিকরের জন্য ব্যক্তিগত রিমাইন্ডার তৈরি করুন।

۞ শেয়ার ও কপি:
۞ যিকরটি টেক্সট হিসেবে অন্যদের সাথে শেয়ার করুন।
۞ যিকরসহ সুন্দর একটি ছবি তৈরি করে বিভিন্ন অ্যাপে শেয়ার করুন।
۞ যিকরের টেক্সট সহজেই ক্লিপবোর্ডে কপি করুন।

"আজকারি — কুরআন ও সুন্নাহ থেকে" কেবল একটি যিকরের তালিকা নয়, বরং একটি দৈনিক অ্যাপ যা যিকর ও দোয়ায় ধারাবাহিকতা রাখতে, প্রসিদ্ধ যিকরসমূহে দ্রুত পৌঁছাতে, পছন্দেরগুলো সংরক্ষণ ও শেয়ার করতে এবং আপনার নির্বাচিত সময়ে রিমাইন্ডার পেতে সাহায্য করে।
এখনই "আজকারি — কুরআন ও সুন্নাহ থেকে" অ্যাপটি ডাউনলোড করুন এবং যিকরকে করে নিন প্রতিদিনের সঙ্গী।`,
  },

  nahawi: {
    ar: `تطبيق «نحويّ: النحو العربي» يقدم محتوى متخصصًا في النحو واللغة العربية، ومن أبرز مميزاته:

۞ مكتبة تضم 53 كتابا:
۞ 27 كتابًا في النحو واللغة.
۞ 24 كتابًا أو قسمًا للشروحات.
۞ متنان من نظم النحو.

۞ تصفح الكتب حسب الأقسام والفصول.
۞ قراءة المحتوى صفحةً صفحة.
۞ عرض عناوين الفصول والحواشي والشروحات.
۞ حفظ آخر موضع قراءة للمتابعة لاحقًا.
۞ إضافة علامات مرجعية للصفحات والفصول المهمة.
۞ قسم خاص بالكتب المحفوظة في العلامات المرجعية.
۞ البحث داخل الكتب والشروحات.
۞ البحث في الشعر والأبيات والتفسيرات.
۞ الاستماع إلى محتوى بعض الكتب والقصائد.
۞ تحميل بعض المواد الصوتية والاستماع إليها لاحقًا.
۞ التحكم في حجم الخط وتخصيص تجربة القراءة.
۞ نسخ محتوى الكتاب أو الأبيات.
۞ مشاركة المحتوى كصورة.
۞ دعم الوضع الفاتح والداكن.
۞ دعم العربية والإنجليزية والبنغالية.
۞ واجهة متجاوبة للهواتف والأجهزة المكتبية.`,

    en: `The "Nahawi: Arabic Grammar" app offers specialized content in Arabic grammar and language, with these notable features:

۞ A library of 53 books:
۞ 27 books on grammar and language.
۞ 24 books or sections of commentaries.
۞ Two matns on grammar in verse form.

۞ Browse books by sections and chapters.
۞ Read content page by page.
۞ View chapter titles, marginal notes, and commentaries.
۞ Save your last reading position to continue later.
۞ Add bookmarks to important pages and chapters.
۞ A dedicated section for books saved in bookmarks.
۞ Search inside books and commentaries.
۞ Search in poetry, verses, and their explanations.
۞ Listen to the content of selected books and poems.
۞ Download selected audio materials and listen to them later.
۞ Control the font size and customize your reading experience.
۞ Copy book content or verses.
۞ Share content as an image.
۞ Support for light and dark modes.
۞ Support for Arabic, English, and Bengali.
۞ A responsive interface for phones and desktop devices.`,

    es: `La aplicación «Nahawi: Gramática Árabe» ofrece contenido especializado en gramática y lengua árabes, y entre sus características más destacadas:

۞ Una biblioteca con 53 libros:
۞ 27 libros de gramática y lengua.
۞ 24 libros o secciones de comentarios.
۞ Dos matn de gramática en verso.

۞ Explora los libros por secciones y capítulos.
۞ Lee el contenido página por página.
۞ Consulta los títulos de los capítulos, las notas marginales y los comentarios.
۞ Guarda tu última posición de lectura para continuar más tarde.
۞ Añade marcadores a las páginas y capítulos importantes.
۞ Una sección especial para los libros guardados en marcadores.
۞ Búsqueda dentro de los libros y los comentarios.
۞ Búsqueda en la poesía, los versos y sus explicaciones.
۞ Escucha el contenido de algunos libros y poemas.
۞ Descarga algunos materiales de audio y escúchalos más tarde.
۞ Controla el tamaño de la letra y personaliza tu experiencia de lectura.
۞ Copia el contenido del libro o los versos.
۞ Comparte el contenido como imagen.
۞ Soporte para los modos claro y oscuro.
۞ Soporte para árabe, inglés y bengalí.
۞ Una interfaz adaptable para móviles y dispositivos de escritorio.`,

    tr: `«Nahawi: Arapça Nahiv» uygulaması, Arapça nahiv ve dil alanında uzmanlaşmış içerik sunar; öne çıkan özellikleri arasında:

۞ 53 kitaplık bir kütüphane:
۞ Nahiv ve dil üzerine 27 kitap.
۞ 24 kitap veya şerh bölümü.
۞ Nahivden manzum iki metn.

۞ Kitapları bölümlere ve bablara göre keşfedin.
۞ İçeriği sayfa sayfa okuyun.
۞ Bab başlıklarını, kenar notlarını ve şerhleri görüntüleyin.
۞ Okuduğunuz son yeri daha sonra devam etmek için kaydedin.
۞ Önemli sayfa ve bablar için yer imleri ekleyin.
۞ Yer imlerinde kayıtlı kitaplar için özel bir bölüm.
۞ Kitapların ve şerhlerin içinde arama.
۞ Şiirlerde, beyitlerde ve açıklamalarında arama.
۞ Bazı kitapların ve şiirlerin içeriğini dinleyin.
۞ Bazı sesli materyalleri indirin ve daha sonra dinleyin.
۞ Yazı boyutunu kontrol edin ve okuma deneyiminizi özelleştirin.
۞ Kitap içeriğini veya beyitleri kopyalayın.
۞ İçeriği görsel olarak paylaşın.
۞ Açık ve karanlık mod desteği.
۞ Arapça, İngilizce ve Bengalce desteği.
۞ Telefonlar ve masaüstü cihazlar için duyarlı bir arayüz.`,

    ur: `«نحوی: النحو العربی» ایپ عربی نحو اور زبان میں ماہرانہ مواد پیش کرتی ہے، اور اس کی نمایاں خصوصیات میں شامل ہیں:

۞ 53 کتب پر مشتمل لائبریری:
۞ نحو اور زبان پر 27 کتب۔
۞ 24 کتب یا شروحات کے اجزاء۔
۞ منظوم نحو کے دو متون۔

۞ کتب کو ابواب اور فصلوں کے مطابق دیکھیں۔
۞ مواد کو صفحہ بہ صفحہ پڑھیں۔
۞ فصلوں کے عناوین، حواشی اور شروحات کا ظاہر ہونا۔
۞ آخری مقام قرأت محفوظ کرنے کی سہولت تاکہ بعد میں جاری رکھیں۔
۞ اہم صفحات اور فصلوں کے لیے نشانیاں لگائیں۔
۞ نشانیوں میں محفوظ کتب کے لیے مخصوص سیکشن۔
۞ کتب اور شروحات کے اندر تلاش۔
۞ شعر، ابیات اور تفاسیر میں تلاش۔
۞ بعض کتب اور قصائد کے مواد کو سنیں۔
۞ بعض صوتی مواد ڈاؤن لوڈ کریں اور بعد میں سنیں۔
۞ فونٹ سائز پر قابو اور مطالعے کی تجربہ کی تخصیص۔
۞ کتاب کے مواد یا ابیات کی نقل۔
۞ مواد کو تصویر کی صورت شیئر کریں۔
۞ روشن اور تاریک موڈ کی معاونت۔
۞ عربی، انگریزی اور بنگالی کی معاونت۔
۞ موبائل اور ڈیسک ٹاپ کے لیے موافق انٹرفیس۔`,

    id: `Aplikasi "Nahawi: Nahwu Bahasa Arab" menyajikan konten khusus tentang nahwu dan bahasa Arab, dan berikut sejumlah fitur utamanya:

۞ Perpustakaan berisi 53 kitab:
۞ 27 kitab tentang nahwu dan bahasa.
۞ 24 kitab atau bagian syarah (penjelasan).
۞ Dua matan nahwu berbentuk nazam (bersajak).

۞ Telusuri kitab berdasarkan bagian dan bab.
۞ Baca konten halaman demi halaman.
۞ Tampilkan judul bab, catatan pinggir, dan syarah.
۞ Simpan posisi baca terakhir untuk dilanjutkan nanti.
۞ Tambahkan penanda pada halaman dan bab penting.
۞ Bagian khusus untuk kitab yang tersimpan di penanda.
۞ Pencarian di dalam kitab dan syarah.
۞ Pencarian dalam syair, bait, dan penjelasannya.
۞ Dengarkan konten sejumlah kitab dan qasidah.
۞ Unduh sejumlah materi audio dan dengarkan nanti.
۞ Atur ukuran huruf dan sesuaikan pengalaman membaca.
۞ Salin konten kitab atau bait.
۞ Bagikan konten sebagai gambar.
۞ Dukungan mode terang dan gelap.
۞ Dukungan bahasa Arab, Inggris, dan Bengali.
۞ Antarmuka responsif untuk ponsel dan perangkat desktop.`,

    ku: `ئەپی «نحويّ: النحو العربي» ناوەڕۆکی تایبەت بە نەحو و زمانی عەرەبی پێشکەش دەکات، و لە دیارترین تایبەتمەندییەکانی:

۞ کتێبخانەیەک کە 53 کتێبی تێدایە:
۞ 27 کتێب لە نەحو و زماندا.
۞ 24 کتێب یان بەش بۆ شەرحەکان.
۞ دوو مەتنی نەحو بە شێوەی شیعر.

۞ گەڕان بەدوای کتێبەکاندا بەپێی بەشەکان و بابەتەکان.
۞ خوێندنەوەی ناوەڕۆک پەڕە بە پەڕە.
۞ پیشاندانی ناونیشانی بابەتەکان و لێدوانەکان و شەرحەکان.
۞ پاشەکەوتکردنی دوایین شوێنی خوێندنەوە بۆ بەردەوامبوون دواتر.
۞ زیادکردنی نیشانە بۆ پەڕە و بابەتە گرنگەکان.
۞ بەشێکی تایبەت بە کتێبە پاشەکەوتکراوەکان لە نیشانەکاندا.
۞ گەڕان لە ناو کتێب و شەرحەکاندا.
۞ گەڕان لە شیعر و دێڕەکان و لێکدانەوەکاندا.
۞ گوێگرتن لە ناوەڕۆکی هەندێک کتێب و پارچە شیعرەکان.
۞ داگرتنی هەندێک مادەی دەنگی و گوێگرتن دواتر.
۞ کۆنترۆڵکردنی قەبارەی فۆنت و دڵخوازکردنی ئەزموونی خوێندنەوە.
۞ لەبەرگرتنەوەی ناوەڕۆکی کتێب یان دێڕەکان.
۞ هاوبەشکردنی ناوەڕۆک وەک وێنە.
۞ پشتگیری دۆخی ڕووناک و تاریک.
۞ پشتگیری زمانەکانی عەرەبی و ئینگلیزی و بەنگالی.
۞ ڕووکارێکی گونجاو بۆ مۆبایل و کۆمپیوتەر.`,

    so: `Barnaamijka "Nahawi: Naxwaha Carabiga" wuxuu bixiyaa wax ku takhasusan naxwaha iyo luuqadda Carabiga, waxaana ka mid ah astaamaha ugu muhiimsan:

۞ Maktabad ka kooban 53 kitaab:
۞ 27 kitaab oo naxwe iyo luuqad ah.
۞ 24 kitaab ama qaybood oo sharaxyo ah.
۞ Laba matn oo naxwe ah oo gabay nooc ah.

۞ Fiiri kutubta ay ku horreeyaan qaybaha iyo cutubyada.
۞ Akhri qoraalka bog bog.
۞ Muuji cinwaanka cutubyada, faallooyinka iyo sharaxyada.
۞ Kaydi meeshii aad ka jirtay akhriska ugu dambeysay si aad u sii waddo marka dambe.
۞ Ku dar calaamado boggaga iyo cutubyada muhiimka ah.
۞ Qayb gaar ah oo kutub ku kaydsan calaamadaha.
۞ Raadin gudaha kutubta iyo sharaxyada.
۞ Raadin gabayada, erayada iyo sharaxaheeda.
۞ Dhageyso qoraalka qaar ka mid ah kutubta iyo gabayada.
۞ Shub qaar ka mid ah maaddooyinka codka oo dhageyso marka dambe.
۞ Xakamee cabbirka qoraalka oo habe akhriskaaga.
۞ Koobiye qoraalka kitaabka ama erayada.
۞ Wadaag qoraalka sida sawir.
۞ Taageero hab iftiin iyo madow.
۞ Taageero luuqadaha Carabiga, Ingiriisiga iyo Bangaaliga.
۞ Interface isku dhufan oo telefoonada iyo kombuyuutarada ah.`,

    tl: `Ang app na "Nahawi: Arabic Grammar" ay nag-aalok ng espesyal na nilalaman sa Arabic grammar (nahwu) at wika, at narito ang ilan sa mga pangunahing feature nito:

۞ Isang library na may 53 aklat:
۞ 27 aklat sa grammar at wika.
۞ 24 aklat o seksyon ng mga komentaryo.
۞ Dalawang matn ng nahwu sa anyong tula.

۞ I-browse ang mga aklat ayon sa mga seksyon at kabanata.
۞ Basahin ang nilalaman nang pahina-pahina.
۞ Ipakita ang mga pamagat ng kabanata, mga margin note, at komentaryo.
۞ I-save ang huling posisyon ng pagbasa para ipagpatuloy sa ibang pagkakataon.
۞ Magdagdag ng mga bookmark sa mahahalagang pahina at kabanata.
۞ Espesyal na seksyon para sa mga aklat na naka-save sa mga bookmark.
۞ Paghahanap sa loob ng mga aklat at komentaryo.
۞ Paghahanap sa tula, mga taludtod, at mga paliwanag.
۞ Makinig sa nilalaman ng ilang aklat at mga tula.
۞ I-download ang ilang audio na materyales at pakinggan sa ibang pagkakataon.
۞ Kontrolin ang laki ng font at i-customize ang karanasan sa pagbasa.
۞ Kopyahin ang nilalaman ng aklat o mga taludtod.
۞ Ibahagi ang nilalaman bilang larawan.
۞ Suporta sa light at dark mode.
۞ Suporta sa Arabic, Ingles, at Bengali.
۞ Responsibong interface para sa mga telepono at desktop device.`,

    be: `"নাহাওয়ি: আরবি ব্যাকরণ (নাহু)" অ্যাপ আরবি নাহু ও ভাষা বিষয়ে বিশেষায়িত কনটেন্ট উপস্থাপন করে, এর উল্লেখযোগ্য বৈশিষ্ট্যগুলোর মধ্যে রয়েছে:

۞ 53টি কিতাবের একটি লাইব্রেরি:
۞ নাহু ও ভাষা নিয়ে 27টি কিতাব।
۞ 24টি কিতাব বা শরাহর অংশ।
۞ নাহুর ছন্দোবদ্ধ দুটি মাতন।

۞ বিভাগ ও অধ্যায় অনুযায়ী কিতাব ব্রাউজ করুন।
۞ পৃষ্ঠা ধরে ধরে কনটেন্ট পড়ুন।
۞ অধ্যায়ের শিরোনাম, পার্শ্বটীকা ও শরাহ প্রদর্শন।
۞ পরে চালিয়ে যাওয়ার জন্য সর্বশেষ পড়ার অবস্থান সংরক্ষণ।
۞ গুরুত্বপূর্ণ পৃষ্ঠা ও অধ্যায়ে বুকমার্ক যোগ করুন।
۞ বুকমার্কে সংরক্ষিত কিতাবের জন্য আলাদা বিভাগ।
۞ কিতাব ও শরাহর ভেতরে অনুসন্ধান।
۞ কবিতা, পঙ্‌ক্তি ও ব্যাখ্যায় অনুসন্ধান।
۞ কিছু কিতাব ও কবিতার কনটেন্ট শুনুন।
۞ কিছু অডিও উপকরণ ডাউনলোড করে পরে শুনুন।
۞ ফন্টের আকার নিয়ন্ত্রণ ও পড়ার অভিজ্ঞতা কাস্টমাইজ করুন।
۞ কিতাবের কনটেন্ট বা পঙ্‌ক্তি কপি করুন।
۞ কনটেন্ট ছবি হিসেবে শেয়ার করুন।
۞ লাইট ও ডার্ক মোড সমর্থন।
۞ আরবি, ইংরেজি ও বাংলা ভাষার সমর্থন।
۞ মোবাইল ও ডেস্কটপ ডিভাইসের জন্য রেসপন্সিভ ইন্টারফেস।`,
  },

  sunnati: {
    ar: `تطبيق «سُنتي - مكتبة الحكمة» هو مكتبة متخصصة في الحديث الشريف، ومن أبرز مميزاته:

۞ مكتبة واسعة من كتب الحديث، منظمة وسهلة التصفح.
۞ قراءة الأحاديث بتنسيق واضح ومريح.
۞ البحث عن الأحاديث بخيارات متقدمة.
۞ بحث مدعوم بالذكاء الاصطناعي عن الحديث أو شرحه.
۞ البحث داخل كتب الحديث وشروحها.
۞ حفظ آخر موضع قراءة للمتابعة لاحقًا.
۞ إضافة الأحاديث المهمة إلى العلامات المرجعية.
۞ الوصول السريع إلى الأحاديث المحفوظة.
۞ مشاركة الحديث كنص.
۞ مشاركة الحديث على شكل صورة.
۞ واجهة مناسبة للدارسين والمهتمين بعلم الحديث.`,

    en: `The "Sunnati — Alheekmah Library" app is a library specialized in the noble Hadith, and among its most notable features:

۞ A wide library of hadith books, organized and easy to browse.
۞ Read hadiths in a clear, comfortable format.
۞ Search for hadiths with advanced options.
۞ AI-powered search for a hadith or its explanation.
۞ Search inside hadith books and their commentaries.
۞ Save your last reading position to continue later.
۞ Add important hadiths to bookmarks.
۞ Quick access to your saved hadiths.
۞ Share a hadith as text.
۞ Share a hadith as an image.
۞ An interface suited for students and everyone interested in the science of hadith.`,

    es: `La aplicación «Sunnati — Biblioteca Alheekmah» es una biblioteca especializada en el Hadiz, y entre sus características más destacadas:

۞ Una amplia biblioteca de libros de hadiz, organizada y fácil de explorar.
۞ Lee hadices en un formato claro y cómodo.
۞ Busca hadices con opciones avanzadas.
۞ Búsqueda de un hadiz o de su explicación con apoyo de la inteligencia artificial.
۞ Búsqueda dentro de los libros de hadiz y sus comentarios.
۞ Guarda tu última posición de lectura para continuar más tarde.
۞ Añade los hadices importantes a los marcadores.
۞ Acceso rápido a los hadices guardados.
۞ Comparte un hadiz como texto.
۞ Comparte un hadiz en forma de imagen.
۞ Una interfaz adecuada para estudiantes y interesados en la ciencia del hadiz.`,

    tr: `«Sünneti — Hikmet Kütüphanesi» uygulaması, hadis ilmine özelleşmiş bir kütüphanedir; öne çıkan özellikleri arasında:

۞ Hadis kitaplarından oluşan geniş, düzenli ve keşfetmesi kolay bir kütüphane.
۞ Hadisleri açık ve rahat bir düzende okuyun.
۞ Gelişmiş seçeneklerle hadis arama.
۞ Bir hadisi veya şerhini yapay zekâ destekli arama.
۞ Hadis kitaplarının ve şerhlerinin içinde arama.
۞ Okuduğunuz son yeri daha sonra devam etmek için kaydedin.
۞ Önemli hadisleri yer imlerine ekleyin.
۞ Kayıtlı hadislere hızlı erişim.
۞ Bir hadisi metin olarak paylaşın.
۞ Bir hadisi görsel olarak paylaşın.
۞ Hadis ilmiyle ilgilenen öğrencilere ve meraklılara uygun bir arayüz.`,

    ur: `«سُنتي - مكتبة الحکمة» ایپ علم حدیث میں مخصوص لائبریری ہے، اور اس کی نمایاں خصوصیات میں شامل ہیں:

۞ کتب حدیث کی وسیع لائبریری، منظم اور دیکھنے میں آسان۔
۞ احادیث کو واضح اور آرام دہ تنسیق کے ساتھ پڑھیں۔
۞ ترقی یافتہ اختیارات کے ساتھ احادیث کی تلاش۔
۞ حدیث یا اس کی شرح کی تلاش میں مصنوعی ذہانت کی معاونت۔
۞ کتب حدیث اور ان کی شروحات کے اندر تلاش۔
۞ آخری مقام قرأت محفوظ کرنے کی سہولت تاکہ بعد میں جاری رکھیں۔
۞ اہم احادیث کو نشانیوں میں شامل کریں۔
۞ محفوظ احادیث تک تیز رسائی۔
۞ حدیث کو متن کی صورت شیئر کریں۔
۞ حدیث کو تصویر کی صورت شیئر کریں۔
۞ طلبہ اور علم حدیث میں دلچسپی رکھنے والوں کے لیے موزوں انٹرفیس۔`,

    id: `Aplikasi "Sunnati — Perpustakaan Alheekmah" adalah perpustakaan yang khusus membahas hadis, dan berikut sejumlah fitur utamanya:

۞ Perpustakaan luas berisi kitab-kitab hadis, tertata dan mudah dijelajahi.
۞ Baca hadis dalam format yang jelas dan nyaman.
۞ Cari hadis dengan opsi lanjutan.
۞ Pencarian hadis atau syarahnya yang didukung kecerdasan buatan.
۞ Pencarian di dalam kitab-kitab hadis dan syarahnya.
۞ Simpan posisi baca terakhir untuk dilanjutkan nanti.
۞ Tambahkan hadis penting ke penanda.
۞ Akses cepat ke hadis yang tersimpan.
۞ Bagikan hadis sebagai teks.
۞ Bagikan hadis dalam bentuk gambar.
۞ Antarmuka yang cocok untuk penuntut ilmu dan pecinta ilmu hadis.`,

    ku: `ئەپی «سُنتي - مكتبة الحكمة» کتێبخانەیەکی تایبەتە بە حەدیس، و لە دیارترین تایبەتمەندییەکانی:

۞ کتێبخانەیەکی فراوانی کتێبەکانی حەدیس، ڕێکخراو و ئاسان بۆ بینین.
۞ خوێندنەوەی حەدیسەکان بە فۆرماتێکی ڕوون و ئارام.
۞ گەڕان بەدوای حەدیسەکاندا بە هەڵبژاردەی پێشکەوتوو.
۞ گەڕان بە پشتگیری ژیریی دەستکرد بەدوای حەدیس یان شەرحه‌کەیدا.
۞ گەڕان لە ناو کتێبەکانی حەدیس و شەرحەکانیاندا.
۞ پاشەکەوتکردنی دوایین شوێنی خوێندنەوە بۆ بەردەوامبوون دواتر.
۞ زیادکردنی حەدیسە گرنگەکان بۆ نیشانەکان.
۞ گەیشتنی خێرا بە حەدیسە پاشەکەوتکراوەکان.
۞ هاوبەشکردنی حەدیسەکە وەک دەق.
۞ هاوبەشکردنی حەدیسەکە بە شێوەی وێنە.
۞ ڕووکارێکی گونجاو بۆ خوێندکاران و ئارەزوومەندانی زانستی حەدیس.`,

    so: `Barnaamijka "Sunnati — Maktabadda Alheekmah" waa maktabad ku takhasushay Xadiiska, waxaana ka mid ah astaamaha ugu muhiimsan:

۞ Maktabad ballaaran oo kutubta xadiiska ah, oo habaysan oo fudud in la fiiriyo.
۞ Akhri xadiisyada qaab cad oo aasaan ah.
۞ Raadi xadiisyada ikhtiyaaro horumarineed leh.
۞ Raadin xadiis ama sharaxiisa oo taageeraysan AI-da.
۞ Raadin gudaha kutubta xadiiska iyo sharaxyada.
۞ Kaydi meeshii aad ka jirtay akhriska ugu dambeysay si aad u sii waddo marka dambe.
۞ Ku dar xadiisyada muhiimka ah calaamadaha.
۞ Hel si degdeg ah xadiisyada aad kaydisay.
۞ Wadaag xadiis sida qoraal.
۞ Wadaag xadiis sida sawir.
۞ Interface ku habboon ardayda iyo kuwa xiiseynaya cilmiga xadiiska.`,

    tl: `Ang app na "Sunnati — Alheekmah Library" ay isang libraryang espesyal sa Hadith, at narito ang ilan sa mga pangunahing feature nito:

۞ Malawak na library ng mga aklat ng hadith, maayos at madaling i-browse.
۞ Basahin ang mga hadith sa malinaw at komportableng format.
۞ Maghanap ng mga hadith gamit ang mga advanced na opsyon.
۞ Paghahanap ng hadith o ng paliwanag nito na suportado ng artificial intelligence.
۞ Paghahanap sa loob ng mga aklat ng hadith at mga komentaryo nito.
۞ I-save ang huling posisyon ng pagbasa para ipagpatuloy sa ibang pagkakataon.
۞ Magdagdag ng mahahalagang hadith sa mga bookmark.
۞ Mabilis na ma-access ang mga naka-save na hadith.
۞ Ibahagi ang hadith bilang teksto.
۞ Ibahagi ang hadith bilang larawan.
۞ Interface na angkop para sa mga mag-aaral at mga interesado sa agham ng hadith.`,

    be: `"সুন্নাতি — আলহিকমাহ লাইব্রেরি" অ্যাপ হাদিসশাস্ত্রে বিশেষায়িত একটি লাইব্রেরি, এর উল্লেখযোগ্য বৈশিষ্ট্যগুলোর মধ্যে রয়েছে:

۞ হাদিসের কিতাবের একটি বিস্তৃত লাইব্রেরি — সুশৃঙ্খল ও সহজে ব্রাউজ করার মতো।
۞ স্পষ্ট ও আরামদায়ক ফরম্যাটে হাদিস পড়ুন।
۞ উন্নত অপশনসহ হাদিস অনুসন্ধান।
۞ হাদিস বা এর ব্যাখ্যা খুঁজতে কৃত্রিম বুদ্ধিমত্তার (AI) সহায়তা।
۞ হাদিসের কিতাব ও শরাহর ভেতরে অনুসন্ধান।
۞ পরে চালিয়ে যাওয়ার জন্য সর্বশেষ পড়ার অবস্থান সংরক্ষণ।
۞ গুরুত্বপূর্ণ হাদিসগুলো বুকমার্কে যোগ করুন।
۞ সংরক্ষিত হাদিসে দ্রুত প্রবেশ।
۞ হাদিসটি টেক্সট হিসেবে শেয়ার করুন।
۞ হাদিসটি ছবি আকারে শেয়ার করুন।
۞ হাদিসশাস্ত্রের ছাত্রদের ও আগ্রহীদের জন্য উপযুক্ত ইন্টারফেস।`,
  },

  aqim: {
    ar: `تطبيق «أَقِم - مكتبة الحكمة» هو تطبيق شامل لمواقيت الصلاة والقبلة، ومن أبرز مميزاته:

۞ عرض مواقيت الصلاة بدقة حسب الموقع الجغرافي.
۞ تحديد الموقع تلقائيًا أو اختياره يدويًا من الخريطة.
۞ دعم تحديث المواقيت عند السفر أو تغيير المكان.
۞ إشعارات أوقات الصلاة.
۞ تشغيل الأذان عند دخول وقت الصلاة.
۞ اختيار أصوات مختلفة للأذان وتنزيلها.
۞ إشعارات خاصة بوقت الإقامة.
۞ عدّاد تنازلي للصلاة القادمة.
۞ عرض التاريخ الهجري.
۞ بوصلة دقيقة لتحديد اتجاه القبلة.
۞ عرض اتجاه القبلة على الخريطة.
۞ إمكانية البحث عن مواقيت الصلاة في مدن مختلفة وحفظ المدن.
۞ خيارات متعددة لحساب مواقيت الصلاة.
۞ ضبط مواعيد الصلاة يدويًا عند الحاجة.
۞ دعم إعدادات المذاهب، مثل المذهب الحنفي.
۞ قسم لتعليم الصلاة.
۞ عرض السنن المتعلقة بالصلاة والتنبيه على بعض البدع.
۞ تقويم رمضان.
۞ تذكير السحور والإفطار.
۞ تسجيل أيام الصيام ومتابعة التقدم.
۞ متتبع لعدد ختمات القرآن.
۞ مشاركة وقت الصلاة القادمة كنص أو صورة.
۞ إضافة ويدجت لعرض مواقيت الصلاة على الشاشة الرئيسية.
۞ دعم العمل في الخلفية لتحديث المواقيت وجدولة التنبيهات.
۞ دعم عدة لغات، منها العربية والإنجليزية والكردية والأردية والتركية والماليزية وغيرها.
۞ واجهة بسيطة وسهلة الاستخدام.
۞ دعم الوضع الداكن وتخصيص المظهر.
۞ يعمل على الهواتف وبعض أنظمة سطح المكتب.
۞ يراعي الخصوصية ولا يجمع بيانات شخصية غير ضرورية.`,

    en: `The "Aqim — Alheekmah Library" app is a comprehensive app for prayer times and qibla, and among its most notable features:

۞ Accurate prayer times based on your geographic location.
۞ Automatic location detection or manual selection from the map.
۞ Prayer times update when you travel or change location.
۞ Prayer time notifications.
۞ Adhan playback when the prayer time enters.
۞ Choose different adhan sounds and download them.
۞ Special notifications for the iqama time.
۞ Countdown to the next prayer.
۞ Hijri date display.
۞ An accurate compass to find the qibla direction.
۞ Qibla direction shown on the map.
۞ Search prayer times in different cities and save your cities.
۞ Multiple prayer time calculation methods.
۞ Manually adjust prayer times when needed.
۞ Support for madhhab settings, such as the Hanafi madhhab.
۞ A section for learning how to pray.
۞ Sunnahs related to prayer, with warnings about certain innovations.
۞ Ramadan calendar.
۞ Suhoor and iftar reminders.
۞ Record fasting days and track your progress.
۞ A tracker for the number of Quran khatmas you complete.
۞ Share the next prayer time as text or an image.
۞ A widget to show prayer times on the home screen.
۞ Background operation for updating times and scheduling alerts.
۞ Support for several languages, including Arabic, English, Kurdish, Urdu, Turkish, Malay, and more.
۞ A simple, easy-to-use interface.
۞ Dark mode and appearance customization.
۞ Works on phones and some desktop systems.
۞ Respects your privacy and collects no unnecessary personal data.`,

    es: `La aplicación «Aqim — Biblioteca Alheekmah» es una aplicación completa para los horarios de oración y la qibla, y entre sus características más destacadas:

۞ Horarios de oración precisos según tu ubicación geográfica.
۞ Detección automática de la ubicación o selección manual en el mapa.
۞ Los horarios se actualizan al viajar o cambiar de lugar.
۞ Notificaciones de los horarios de oración.
۞ Reproducción del adhan al entrar la hora de la oración.
۞ Elección de distintos sonidos de adhan y descarga de ellos.
۞ Notificaciones especiales para la hora del iqama.
۞ Cuenta atrás para la próxima oración.
۞ Mostrar la fecha hégira.
۞ Brújula precisa para determinar la dirección de la qibla.
۞ Dirección de la qibla mostrada en el mapa.
۞ Búsqueda de horarios de oración en distintas ciudades y guardado de ciudades.
۞ Varias opciones de cálculo de los horarios de oración.
۞ Ajuste manual de los horarios cuando sea necesario.
۞ Soporte de ajustes de madhab, como el madhab hanafí.
۞ Una sección para aprender a rezar.
۞ Sunnas relacionadas con la oración y advertencias sobre ciertas innovaciones.
۞ Calendario de Ramadán.
۞ Recordatorios del suhur y del iftar.
۞ Registro de los días de ayuno y seguimiento del progreso.
۞ Un contador del número de jatmas del Corán completadas.
۞ Comparte la hora de la próxima oración como texto o imagen.
۞ Un widget para mostrar los horarios de oración en la pantalla de inicio.
۞ Funcionamiento en segundo plano para actualizar horarios y programar avisos.
۞ Soporte de varios idiomas, entre ellos árabe, inglés, kurdo, urdu, turco, malayo y otros.
۞ Una interfaz sencilla y fácil de usar.
۞ Modo oscuro y personalización del aspecto.
۞ Funciona en teléfonos y en algunos sistemas de escritorio.
۞ Respeta tu privacidad y no recoge datos personales innecesarios.`,

    tr: `«Aqim — Hikmet Kütüphanesi» uygulaması, namaz vakitleri ve kıble için kapsamlı bir uygulamadır; öne çıkan özellikleri arasında:

۞ Coğrafi konuma göre doğru namaz vakitleri.
۞ Otomatik konum belirleme veya haritadan elle seçim.
۞ Seyahat ederken veya yer değiştirdiğinde vakitlerin güncellenmesi.
۞ Namaz vakti bildirimleri.
۞ Namaz vakti girdiğinde ezanın çalınması.
۞ Farklı ezan seslerinden seçim yapma ve bunları indirme.
۞ Kamet vaktine özel bildirimler.
۞ Sonraki namaza geri sayım.
۞ Hicri tarihi gösterme.
۞ Kıble yönünü bulmak için hassas bir pusula.
۞ Kıble yönünün harita üzerinde gösterimi.
۞ Farklı şehirlerde namaz vakitlerini arama ve şehirleri kaydetme.
۞ Birden fazla namaz vakti hesaplama yöntemi.
۞ Gerektiğinde vakitleri elle ayarlama.
۞ Mezhep ayarları desteği, örneğin Hanefî mezhebi.
۞ Namaz kılmayı öğrenmek için bir bölüm.
۞ Namazla ilgili sünnetler ve bazı bid'atler konusunda uyarılar.
۞ Ramazan takvimi.
۞ Sahur ve iftar hatırlatıcıları.
۞ Oruç günlerini kaydetme ve ilerlemeyi takip etme.
۞ Tamamlanan hatim sayısı için bir takipçi.
۞ Sonraki namaz vaktini metin veya görsel olarak paylaşma.
۞ Ana ekranda vakitleri gösteren bir widget.
۞ Vakitleri güncellemek ve bildirimleri planlamak için arka planda çalışma.
۞ Arapça, İngilizce, Kürtçe, Urduca, Türkçe, Malayca ve daha birçok dil desteği.
۞ Basit ve kullanımı kolay bir arayüz.
۞ Karanlık mod ve görünüm kişiselleştirme.
۞ Telefonlarda ve bazı masaüstü sistemlerinde çalışır.
۞ Gizliliğinize saygı duyar ve gereksiz kişisel veri toplamaz.`,

    ur: `«اقم - مكتبة الحکمة» ایپ مواقیتِ نماز اور قبلہ کے لیے جامع ایپ ہے، اور اس کی نمایاں خصوصیات میں شامل ہیں:

۞ جغرافیائی مقام کے مطابق درست نماز کے اوقات۔
۞ مقام کی خودکار شناخت یا نقشے سے دستی انتخاب۔
۞ سفر یا مقام کی تبدیلی پر اوقات کی تازہ کاری۔
۞ اوقاتِ نماز کی اطلاعات۔
۞ وقتِ نماز کے داخل ہونے پر اذان چلانا۔
۞ اذان کی مختلف آوازیں منتخب کرنا اور انہیں ڈاؤن لوڈ کرنا۔
۞ وقتِ اقامت کے لیے مخصوص اطلاعات۔
۞ اگلی نماز کے لیے الٹی گنتی۔
۞ ہجری تاریخ کا ظاہر ہونا۔
۞ قبلہ کے رخ کی نشاندہی کے لیے درست قطب نما۔
۞ نقشے پر قبلہ کے رخ کا ظاہر ہونا۔
۞ مختلف شہروں میں اوقاتِ نماز کی تلاش اور شہروں کی محفوظ کاری۔
۞ اوقاتِ نماز کے حساب کے متعدد اختیارات۔
۞ ضرورت کے وقت اوقات کا دستی سیٹ کرنا۔
۞ مسلک کی ترتیبات کی معاونت، جیسے مسلکِ حنفی۔
۞ نماز سیکھنے کا سیکشن۔
۞ نماز سے متعلق سنن کا ذکر اور بعض بدعات پر تنبیہ۔
۞ تقویمِ رمضان۔
۞ سحور و افطار کی یاد دہانی۔
۞ روزے کے دنوں کا ریکارڈ اور پیش رفت کی نگرانی۔
۞ ختماتِ قرآن کی تعداد کا ٹریکر۔
۞ اگلے وقتِ نماز کو متن یا تصویر کی صورت شیئر کرنا۔
۞ مرکزی اسکرین پر اوقاتِ نماز دکھانے کے لیے ویجٹ۔
۞ اوقات کی تازہ کاری اور اطلاعات کی شیڈولنگ کے لیے پس منظر میں کام کرنا۔
۞ متعدد زبانوں کی معاونت، بشمول عربی، انگریزی، کردش، اردو، ترکش، ملے اور دیگر۔
۞ سادہ اور آسان استعمال کا انٹرفیس۔
۞ تاریک موڈ اور ظاہری شکل کی تخصیص۔
۞ موبائل فونز اور بعض ڈیسک ٹاپ نظاموں پر کام کرتا ہے۔
۞ رازداری کا خیال رکھتا ہے اور غیر ضروری ذاتی معلومات جمع نہیں کرتا۔`,

    id: `Aplikasi "Aqim — Perpustakaan Alheekmah" adalah aplikasi lengkap untuk jadwal shalat dan arah kiblat, dan berikut sejumlah fitur utamanya:

۞ Jadwal shalat akurat sesuai lokasi geografis Anda.
۞ Deteksi lokasi otomatis atau pilihan manual dari peta.
۞ Jadwal diperbarui saat bepergian atau berpindah tempat.
۞ Notifikasi waktu shalat.
۞ Adzan diputar saat waktu shalat masuk.
۞ Pilihan berbagai suara adzan dan mengunduhnya.
۞ Notifikasi khusus untuk waktu iqamah.
۞ Hitungan mundur menuju shalat berikutnya.
۞ Tampilan tanggal Hijriah.
۞ Kompas akurat untuk menentukan arah kiblat.
۞ Arah kiblat ditampilkan di peta.
۞ Pencarian jadwal shalat di berbagai kota dan penyimpanan kota.
۞ Berbagai pilihan perhitungan jadwal shalat.
۞ Penyesuaian jadwal secara manual bila diperlukan.
۞ Dukungan pengaturan mazhab, seperti mazhab Hanafi.
۞ Bagian untuk belajar cara shalat.
۞ Sunnah-sunnah terkait shalat dan peringatan atas beberapa bid'ah.
۞ Kalender Ramadan.
۞ Pengingat sahur dan berbuka.
۞ Catatan hari-hari puasa dan pemantauan kemajuan.
۞ Pelacak jumlah khataman Al-Qur'an.
۞ Bagikan waktu shalat berikutnya sebagai teks atau gambar.
۞ Widget untuk menampilkan jadwal shalat di layar utama.
۞ Berjalan di latar belakang untuk memperbarui jadwal dan menjadwalkan notifikasi.
۞ Dukungan beberapa bahasa, termasuk Arab, Inggris, Kurdi, Urdu, Turki, Melayu, dan lainnya.
۞ Antarmuka sederhana dan mudah digunakan.
۞ Mode gelap dan kustomisasi tampilan.
۞ Berjalan di ponsel dan sebagian sistem desktop.
۞ Menghargai privasi dan tidak mengumpulkan data pribadi yang tidak diperlukan.`,

    ku: `ئەپی «ئەقیم - کتێبخانەی حیکمە» ئەپێکی جامعە بۆ کاتەکانی نوێژ و قبڵە، و لە دیارترین تایبەتمەندییەکانی:

۞ پیشاندانی کاتەکانی نوێژ بە وردی بەپێی شوێنی جوگرافی.
۞ دیاریکردنی شوێن بە خۆکاری یان هەڵبژاردنی بە دەست لە نەخشەوە.
۞ نوێکردنەوەی کاتەکان لە کاتی گەشت یان گۆڕینی شوێندا.
۞ ئاگادارکردنەوەکانی کاتی نوێژ.
۞ لێدانی بانگ کە کاتی نوێژ دەچێتەوە.
۞ هەڵبژاردنی دەنگە جیاوازەکانی بانگ و داگرتنیان.
۞ ئاگادارکردنەوەی تایبەت بە کاتی ئیقامە.
۞ ژماردنی پاشەکشە بۆ نوێژی داهاتوو.
۞ پیشاندانی بەرواری کۆچی.
۞ قوتبنماییەکی ورد بۆ دیاریکردنی ئاڕاستەی قبڵە.
۞ پیشاندانی ئاڕاستەی قبڵە لەسەر نەخشە.
۞ گەڕان بەدوای کاتەکانی نوێژدا لە شارە جیاوازەکان و پاشەکەوتکردنی شارەکان.
۞ هەڵبژاردەی جۆراوجۆر بۆ حیسابکردنی کاتەکانی نوێژ.
۞ ڕێکخستنی کاتەکان بە دەست لە کاتی پێویستدا.
۞ پشتگیری ڕێکخستنەکانی مەزهەب، وەک مەزهەبی حەنەفی.
۞ بەشێک بۆ فێربوونی نوێژ.
۞ پیشاندانی سوننەتەکانی پەیوەندیدار بە نوێژ و ئاگادارکردنەوە لە هەندێک بدعە.
۞ ڕۆژژمێری ڕەمەزان.
۞ بیرخستنەوەی سەحەر و ئیفطار.
۞ تۆمارکردنی ڕۆژەکانی ڕۆژوو و بەدواداچوونی پێشکەوتن.
۞ بەدواداچوونی ژمارەی خەتمەکانی قورئان.
۞ هاوبەشکردنی کاتی نوێژی داهاتوو وەک دەق یان وێنە.
۞ زیادکردنی ویدجیت بۆ پیشاندانی کاتەکانی نوێژ لەسەر شاشەی سەرەکی.
۞ کارکردن لە پاشبنەمدا بۆ نوێکردنەوەی کاتەکان و ڕێکخستنی ئاگادارکردنەوەکان.
۞ پشتگیری چەند زمانێک، لەوانە عەرەبی، ئینگلیزی، کوردی، ئوردی، تورکی، مالایی و تر.
۞ ڕووکارێکی سادە و ئاسان بۆ بەکارهێنان.
۞ پشتگیری دۆخی تاریک و دڵخوازکردنی ڕووکار.
۞ لەسەر مۆبایل و هەندێک لە سیستەمەکانی کۆمپیوتەر کاردەکات.
۞ پارێزگاری لە تایبەتمەندی کەسایەتی دەکات و داتای کەسی ناپێویست کۆناکاتەوە.`,

    so: `Barnaamijka "Aqim — Maktabadda Alheekmah" waa barnaamij ballaaran oo ah waqtigyada salaadda iyo qiblada, waxaana ka mid ah astaamaha ugu muhiimsan:

۞ Muuji waqtiga salaadda si sax ah ayadoo lagu saleynayo goobtaada juqraafi ahaan.
۞ Goorme goobta otomaatig ah ama xulo gacanta ka mid ah khariiradda.
۞ Cusbooneysiinta waqtiyada marka aad safar kacdo ama meel aad ka guurto.
۞ Ogeysiisyada waqtigyada salaadda.
۞ Dhigi aadaanka marka waqtiga salaadda uu galmo.
۞ Dooro codyo kala duwan oo aadaan ah oona shubo.
۞ Ogeysiis gaar ah oo waqtiga iqaamada ah.
۞ Tiro-gelid hoos u dhac ah salaadda xigta.
۞ Muuji taariikhda Hijriga.
۞ Busul sax ah oo lagu ogaado jiheeca qiblada.
۞ Muuji jiheeca qiblada bogga khariiradda.
۞ Raadi waqtigyada salaadda magaalooyin kala duwan oo kaydi magaalooyinka.
۞ Ikhtiyaaro badan oo lagu xisaabiyo waqtigyada salaadda.
۞ Habe waqtigyada gacanta haad marka loo baahdo.
۞ Taageero hababka madhabka, sida madhabka Xanafiga.
۞ Qayb lagu barto sida loo tukado.
۞ Muuji sunnaha la xidhiidha salaadda iyo digniin ku saabsan qaar ka mid ah bido'da.
۞ Calendar-ka Ramadaanka.
۞ Xasuus-qor suxuurtii iyo aftirkii.
۞ Diari maalmaha soonka oo kormeere horumarka.
۞ Lanjari lambar khadanka Qur'aanka ee la dhammaystiray.
۞ Wadaag waqtiga salaadda xigta sida qoraal ama sawir.
۞ Widget lagu muujiyo waqtigyada salaadda shaashadda hore.
۞ Shaqayn gadaal si loo cusbooneysiiyo waqtiyada loona qorsheeyo ogeysiisyada.
۞ Taageero luuqado badan, waxaana ka mid ah Carabiga, Ingiriisiga, Kurdishka, Urdu-ga, Turkiga, Malaayga iyo kuwa kale.
۞ Interface fudud oo sahlan oo la isticmaali karo.
۞ Taageero hab madow iyo habayn muuqaalka.
۞ Wuxuu ka shaqeeyaa taleefannada iyo qaar ka mid ah nidaamyada kombuyuutarka.
۞ Wuxuu ixtiraamayaa asturnaantaada oo aanu ururin xog shakhsi ah aan loo baahnayn.`,

    tl: `Ang app na "Aqim — Alheekmah Library" ay isang komprehensibong app para sa mga oras ng panalangin at qibla, at narito ang ilan sa mga pangunahing feature nito:

۞ Tumpak na mga oras ng panalangin batay sa iyong heograpikal na lokasyon.
۞ Awtomatikong pag-detect sa lokasyon o manu-manong pagpili mula sa mapa.
۞ Ina-update ang mga oras kapag nagbiyahe o nagpalit ng lugar.
۞ Mga notipikasyon sa oras ng panalangin.
۞ Pagtugtog ng adhan kapag pumasok na ang oras ng panalangin.
۞ Pumili ng iba't ibang tunog ng adhan at i-download ang mga ito.
۞ Espesyal na notipikasyon para sa oras ng iqama.
۞ Countdown sa susunod na panalangin.
۞ Pagpapakita ng Hijri na petsa.
۞ Tumpak na compass para matukoy ang direksyon ng qibla.
۞ Ipinapakita ang direksyon ng qibla sa mapa.
۞ Maghanap ng mga oras ng panalangin sa iba't ibang lungsod at i-save ang mga lungsod.
۞ Maraming opsyon sa pagkalkula ng mga oras ng panalangin.
۞ Manu-manong pag-ayos ng mga oras kapag kinakailangan.
۞ Suporta sa mga setting ng madhhab, tulad ng Hanafi na madhhab.
۞ Seksyon para sa pag-aaral kung paano manalangin.
۞ Mga sunnah na may kaugnayan sa panalangin at babala sa ilang mga bid'ah.
۞ Kalendaryo ng Ramadan.
۞ Mga paalala sa suhoor at iftar.
۞ Itala ang mga araw ng pag-aayuno at subaybayan ang progreso.
۞ Tracker para sa bilang ng natapos na khatma ng Qur'an.
۞ Ibahagi ang oras ng susunod na panalangin bilang teksto o larawan.
۞ Widget para ipakita ang mga oras ng panalangin sa home screen.
۞ Pagtatrabaho sa background para i-update ang mga oras at i-schedule ang mga abiso.
۞ Suporta sa ilang wika, kabilang ang Arabic, Ingles, Kurdish, Urdu, Turkish, Malay, at iba pa.
۞ Simple at madaling gamitin na interface.
۞ Suporta sa dark mode at pag-customize ng itsura.
۞ Gumagana sa mga telepono at sa ilang desktop na sistema.
۞ Ginagalang ang iyong privacy at hindi nangongolekta ng hindi kinakailangang personal na datos.`,

    be: `"আকিম — আলহিকমাহ লাইব্রেরি" অ্যাপ নামাজের সময়সূচি ও কিবলার জন্য একটি সম্পূর্ণ অ্যাপ, এর উল্লেখযোগ্য বৈশিষ্ট্যগুলোর মধ্যে রয়েছে:

۞ ভৌগোলিক অবস্থান অনুযায়ী নির্ভুল নামাজের সময়সূচি।
۞ স্বয়ংক্রিয় অবস্থান শনাক্তকরণ বা ম্যাপ থেকে হাতে নির্বাচন।
۞ ভ্রমণ বা স্থান পরিবর্তনের সময় সময়সূচির আপডেট।
۞ নামাজের সময়ের বিজ্ঞপ্তি।
۞ নামাজের সময় হলে আযান বাজানো।
۞ আযানের বিভিন্ন সাউন্ড নির্বাচন ও ডাউনলোড।
۞ ইকামতের সময়ের জন্য বিশেষ বিজ্ঞপ্তি।
۞ পরবর্তী নামাজের জন্য কাউন্টডাউন।
۞ হিজরি তারিখ প্রদর্শন।
۞ কিবলার দিক নির্ণয়ে নির্ভুল কম্পাস।
۞ ম্যাপে কিবলার দিক প্রদর্শন।
۞ বিভিন্ন শহরে নামাজের সময় খোঁজা ও শহর সংরক্ষণ।
۞ নামাজের সময় গণনার একাধিক পদ্ধতি।
۞ প্রয়োজনে সময়সূচি হাতে সমন্বয়।
۞ মাযহাব সেটিংস সমর্থন, যেমন হানাফি মাযহাব।
۞ নামাজ শেখার বিভাগ।
۞ নামাজ-সংক্রান্ত সুন্নাহ প্রদর্শন ও কিছু বিদআত সম্পর্কে সতর্কতা।
۞ রমজান ক্যালেন্ডার।
۞ সেহরি ও ইফতারের রিমাইন্ডার।
۞ রোজার দিনগুলো রেকর্ড করা ও অগ্রগতি ট্র্যাক করা।
۞ কুরআন খতমের সংখ্যার ট্র্যাকার।
۞ পরবর্তী নামাজের সময় টেক্সট বা ছবি হিসেবে শেয়ার করা।
۞ হোম স্ক্রিনে নামাজের সময় দেখানোর উইজেট।
۞ সময়সূচি আপডেট ও বিজ্ঞপ্তি শিডিউল করতে ব্যাকগ্রাউন্ডে চলা।
۞ একাধিক ভাষার সমর্থন, যার মধ্যে আরবি, ইংরেজি, কুর্দি, উর্দু, তুর্কি, মালয় প্রভৃতি।
۞ সহজ ও ব্যবহারবান্ধব ইন্টারফেস।
۞ ডার্ক মোড ও চেহারা কাস্টমাইজেশন সমর্থন।
۞ ফোন এবং কিছু ডেস্কটপ সিস্টেমে চলে।
۞ গোপনীয়তার যত্ন নেয় এবং অপ্রয়োজনীয় ব্যক্তিগত তথ্য সংগ্রহ করে না।`,
  },

  "zad-alMuslim": {
    ar: `تطبيق «زاد المسلم - مكتبة الحكمة» هو تطبيق إسلامي شامل، ومن أبرز مميزاته:

۞ القرآن الكريم كاملًا.
۞ الاستماع إلى التلاوات بأصوات عدد من القراء.
۞ عرض تفاسير متنوعة للآيات.
۞ أوقات الصلاة بدقة حسب الموقع.
۞ تنبيهات ذكية لمواعيد الصلوات.
۞ تحديد اتجاه القبلة.
۞ مجموعة واسعة من الأذكار اليومية.
۞ مكتبة إسلامية تضم كتب التفسير وكتب الحديث الشريف.
۞ الاستماع إلى السور القرآنية.
۞ واجهة تجمع العبادات والمحتوى الديني في تطبيق واحد.
۞ لا تتم مشاركة بيانات المستخدمين مع جهات خارجية، وفق معلومات المتجر.`,

    en: `The "Zad al-Muslim — Alheekmah Library" app is a comprehensive Islamic app, and among its most notable features:

۞ The complete Holy Quran.
۞ Listen to recitations with the voices of a number of reciters.
۞ A variety of tafsirs for the verses.
۞ Accurate prayer times based on location.
۞ Smart alerts for prayer times.
۞ Qibla direction finder.
۞ A wide collection of daily adhkar.
۞ An Islamic library containing tafsir books and books of the noble Hadith.
۞ Listen to Quranic surahs.
۞ An interface that brings worship and religious content together in one app.
۞ User data is not shared with third parties, according to store information.`,

    es: `La aplicación «Zad al-Muslim — Biblioteca Alheekmah» es una aplicación islámica completa, y entre sus características más destacadas:

۞ El Corán Sagrado completo.
۞ Escucha recitaciones con las voces de varios recitadores.
۞ Una variedad de tafsires para las aleyas.
۞ Horarios de oración precisos según la ubicación.
۞ Alertas inteligentes para los horarios de las oraciones.
۞ Determinación de la dirección de la qibla.
۞ Una amplia colección de adhkar diarios.
۞ Una biblioteca islámica que incluye libros de tafsir y libros del Hadiz.
۞ Escucha de las suras coránicas.
۞ Una interfaz que reúne la adoración y el contenido religioso en una sola aplicación.
۞ Los datos de los usuarios no se comparten con terceros, según la información de la tienda.`,

    tr: `«Zad al-Muslim — Hikmet Kütüphanesi» uygulaması kapsamlı bir İslami uygulamadır; öne çıkan özellikleri arasında:

۞ Kur'an-ı Kerim'in tamamı.
۞ Birçok hâfızın sesiyle tilavetleri dinleme.
۞ Ayetler için çeşitli tefsirler.
۞ Konuma göre doğru namaz vakitleri.
۞ Namaz vakitleri için akıllı bildirimler.
۞ Kıble yönünü bulma.
۞ Geniş bir günlük zikir koleksiyonu.
۞ Tefsir kitaplarını ve hadis kitaplarını içeren bir İslam kütüphanesi.
۞ Kur'an surelerini dinleme.
۞ İbadeti ve dini içeriği tek uygulamada bir araya getiren bir arayüz.
۞ Mağaza bilgilerine göre kullanıcı verileri üçüncü taraflarla paylaşılmaz.`,

    ur: `«زاد المسلم - مكتبة الحکمة» ایپ جامع اسلامی ایپ ہے، اور اس کی نمایاں خصوصیات میں شامل ہیں:

۞ مکمل قرآن کریم۔
۞ متعدد قراء کی آوازوں میں تلاوتوں کی سماعت۔
۞ آیات کے متعدد تفاسیر کا ظاہر ہونا۔
۞ مقام کے مطابق درست اوقاتِ نماز۔
۞ اوقاتِ نماز کے لیے ذکی تنبیہات۔
۞ قبلہ کے رخ کی نشاندہی۔
۞ روزانہ اذکار کا وسیع مجموعہ۔
۞ تفاسیر اور کتبِ حدیث شریف پر مشتمل اسلامی لائبریری۔
۞ قرآنی سورتوں کی سماعت۔
۞ عبادات اور مذہبی مواد کو ایک ایپ میں یکجا کرنے والا انٹرفیس۔
۞ اسٹور کی معلومات کے مطابق صارفین کا ڈیٹا فریق ثالث کے ساتھ شیئر نہیں کیا جاتا۔`,

    id: `Aplikasi "Zad al-Muslim — Perpustakaan Alheekmah" adalah aplikasi Islami yang lengkap, dan berikut sejumlah fitur utamanya:

۞ Al-Qur'an lengkap.
۞ Dengarkan tilawah dengan suara sejumlah qari.
۞ Tampilkan berbagai tafsir untuk ayat-ayat.
۞ Jadwal shalat akurat sesuai lokasi.
۞ Peringatan cerdas untuk jadwal shalat.
۞ Penentu arah kiblat.
۞ Kumpulan luas adzkar harian.
۞ Perpustakaan Islam berisi kitab tafsir dan kitab hadis.
۞ Dengarkan surat-surat Al-Qur'an.
۞ Antarmuka yang menyatukan ibadah dan konten keagamaan dalam satu aplikasi.
۞ Data pengguna tidak dibagikan kepada pihak ketiga, sesuai informasi toko.`,

    ku: `ئەپی «زاد المسلم - کتێبخانەی حیکمە» ئەپێکی ئیسلامی جامعە، و لە دیارترین تایبەتمەندییەکانی:

۞ قورئانی پیرۆز بە تەواوی.
۞ گوێگرتن لە قیڕائەتان بە دەنگی ژمارەیەک لە قورئانخوەنان.
۞ پیشاندانی تەفسیرە جیاوازەکانی ئایەتەکان.
۞ کاتەکانی نوێژ بە وردی بەپێی شوێن.
۞ ئاگادارکردنەوەی زیرەکانە بۆ کاتەکانی نوێژ.
۞ دیاریکردنی ئاڕاستەی قبڵە.
۞ کۆمەڵێکی فراوانی زیکرە ڕۆژانەکان.
۞ کتێبخانەیەکی ئیسلامی کە کتێبەکانی تەفسیر و کتێبەکانی حەدیسی شەریف لەخۆدەگرێت.
۞ گوێگرتن لە سورەتە قورئانییەکان.
۞ ڕووکارێک کە عیبادەت و ناوەڕۆکی ئایینی لە یەک ئەپدا کۆدەکاتەوە.
۞ بەپێی زانیارییەکانی فرۆشگە، داتای بەکارهێنەران لەگەڵ لایەنە دەرەکییەکان هاوبەش ناکرێت.`,

    so: `Barnaamijka "Zad al-Muslim — Maktabadda Alheekmah" waa barnaamij Islaami oo dhan, waxaana ka mid ah astaamaha ugu muhiimsan:

۞ Qur'aanka Kariimka oo dhameystiran.
۞ Dhageyso akhrisyada codka qurra'yo ka mid ah.
۞ Muuji fasiro kala duwan oo aayadaha ah.
۞ Waqtigyada salaadda si sax ah ayadoo lagu saleynayo goobta.
۞ Ogeysiis caqli leh oo waqtigyada salaadda ah.
۞ Goorme jiheeca qiblada.
۞ Urur ballaaran oo ah adkaarta maalinlaha.
۞ Maktabad Islaamka oo ka kooban kutubta fasirka iyo kutubta Xadiiska.
۞ Dhageyso suuradaha Qur'aanka.
۞ Interface isku xidha cibaadada iyo waxa diinta ah hal barnaamij.
۞ Xogta isticmaalayaasha lama wadaago cid dibada ah, sida ay qoran tahay xogta dukaanka.`,

    tl: `Ang app na "Zad al-Muslim — Alheekmah Library" ay isang komprehensibong Islamic na app, at narito ang ilan sa mga pangunahing feature nito:

۞ Ang kumpletong Banal na Qur'an.
۞ Makinig sa mga tilawah gamit ang mga boses ng ilang tagapagbasa.
۞ Ipinapakita ang iba't ibang tafsir para sa mga talata.
۞ Tumpak na mga oras ng panalangin batay sa lokasyon.
۞ Matalinong mga abiso para sa mga oras ng panalangin.
۞ Pagtukoy sa direksyon ng qibla.
۞ Malawak na koleksyon ng mga pang-araw-araw na adhkar.
۞ Islamic library na naglalaman ng mga aklat ng tafsir at mga aklat ng Hadith.
۞ Makinig sa mga surah ng Qur'an.
۞ Interface na nagsasama ng pagsamba at relihiyosong nilalaman sa iisang app.
۞ Hindi ibinabahagi ang datos ng mga gumagamit sa mga third party, ayon sa impormasyon ng store.`,

    be: `"জাদ আল-মুসলিম — আলহিকমাহ লাইব্রেরি" অ্যাপ একটি সম্পূর্ণ ইসলামী অ্যাপ, এর উল্লেখযোগ্য বৈশিষ্ট্যগুলোর মধ্যে রয়েছে:

۞ সম্পূর্ণ পবিত্র কুরআন।
۞ একাধিক ক্বারির কণ্ঠে তিলাওয়াত শোনা।
۞ আয়াতসমূহের বিভিন্ন তাফসির প্রদর্শন।
۞ অবস্থান অনুযায়ী নির্ভুল নামাজের সময়।
۞ নামাজের সময়ের জন্য স্মার্ট বিজ্ঞপ্তি।
۞ কিবলার দিক নির্ণয়।
۞ দৈনিক যিকরের বিস্তৃত সংকলন।
۞ তাফসির ও হাদিসের কিতাবসহ ইসলামী লাইব্রেরি।
۞ কুরআনের সূরাসমূহ শোনা।
۞ ইবাদত ও ধর্মীয় কনটেন্ট একটি অ্যাপে একত্রকারী ইন্টারফেস।
۞ স্টোরের তথ্য অনুযায়ী ব্যবহারকারীদের তথ্য তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।`,
  },
};
