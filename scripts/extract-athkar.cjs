// سكربت استخراج بيانات الأذكار من ملفات Dart الأصلية إلى JSON
const fs = require("fs");
const SRC = "/Users/hawazenmahmood/Documents/GitHub/alheekmahlib_website";
const OUT = "src/data/athkar.json";

// 1) استخراج الفئات من all_azkar.dart (double-quoted strings)
const catsSrc = fs.readFileSync(
  SRC + "/lib/presentation/athkar_screen/models/all_azkar.dart",
  "utf8",
);
const categories = [];
const catRe = /"([^"]+)"/g;
let cm;
while ((cm = catRe.exec(catsSrc)) !== null) {
  const c = cm[1].trim();
  if (c && !categories.includes(c)) categories.push(c);
}

// 2) استخراج الأذكار من azkar_list.dart
// نقسم الملف على } لنحصل على كتل، ثم نستخرج الحقول من كل كتلة
const azkarSrc = fs.readFileSync(
  SRC + "/lib/presentation/athkar_screen/models/azkar_list.dart",
  "utf8",
);

const items = [];
const blocks = azkarSrc.split(/^\s*\},?\s*$/m);
for (const block of blocks) {
  const item = {};
  // نمط يطابق "key": "value" حيث value قد يمتد عبر أسطر
  const re = /"(category|count|description|reference|zekr)"\s*:\s*"((?:[^"\\]|\\.)*)"/gs;
  let m;
  while ((m = re.exec(block)) !== null) {
    item[m[1]] = m[2]
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }
  if (item.zekr && item.category) items.push(item);
}

// 3) تجميع حسب الفئة
const grouped = {};
for (const cat of categories) {
  grouped[cat] = items.filter((i) => i.category === cat);
}

const out = { categories, count: items.length, grouped };
fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log("✓ athkar.json:", items.length, "athkar in", categories.length, "categories");
console.log("✓ أول فئة:", categories[0], "→", grouped[categories[0]].length, "ذكر");
console.log("✓ عينة:", JSON.stringify(items[0], null, 2).slice(0, 200));
