# 🎬 VIZION AI — وكالة إنتاج فيديوهات الذكاء الاصطناعي

موقع One Page احترافي لوكالة AI Video في مصر — مبني بـ Next.js 14 + Tailwind CSS + Supabase.

---

## 🗂️ هيكل المشروع

```
ai-agency/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        ← الـ Backend API (بيستقبل بيانات الفورم)
│   ├── globals.css             ← الـ CSS الأساسي
│   ├── layout.tsx              ← إطار الصفحة (Metadata + Fonts)
│   └── page.tsx                ← الصفحة الرئيسية (بتجمع كل الـ Sections)
│
├── components/
│   ├── Navbar.tsx              ← شريط التنقل
│   ├── HeroSection.tsx         ← القسم الأول (Hero)
│   ├── ServicesSection.tsx     ← الباقات والأسعار
│   ├── PortfolioSection.tsx    ← الأعمال السابقة
│   ├── ContactSection.tsx      ← فورم التواصل
│   └── Footer.tsx              ← الفوتر
│
├── lib/
│   └── supabase.ts             ← اتصال Supabase
│
├── .env.local.example          ← نموذج متغيرات البيئة
├── tailwind.config.ts          ← إعدادات Tailwind
└── README.md                   ← أنت هنا 😊
```

---

## 🚀 خطوة 1: تشغيل المشروع محلياً

### المتطلبات
- Node.js v18+ (اتأكد بـ `node --version`)
- npm أو yarn

### خطوات التشغيل

```bash
# 1. ادخل على فولدر المشروع
cd ai-agency

# 2. ثبّت الـ Packages
npm install

# 3. انسخ ملف المتغيرات
cp .env.local.example .env.local

# 4. افتح .env.local وحط بيانات Supabase (اتبع الخطوة التالية)

# 5. شغّل السيرفر التطويري
npm run dev
```

افتح المتصفح على: **http://localhost:3000** 🎉

---

## 🗄️ خطوة 2: إعداد Supabase (قاعدة البيانات)

### 2.1 إنشاء مشروع جديد

1. روح على **https://supabase.com** وعمل حساب مجاني
2. اضغط **"New project"**
3. اختر اسم للمشروع وكلمة سر قوية
4. اختر Region قريب من مصر (اختر **EU West** أو **US East**)
5. انتظر 2 دقيقة لحد ما المشروع يتجهز ✅

### 2.2 إنشاء الجدول (leads table)

في الـ Dashboard، اضغط على **SQL Editor** وشغّل الـ Query ده:

```sql
-- إنشاء جدول العملاء المحتملين (Leads)
CREATE TABLE leads (
  id          BIGSERIAL PRIMARY KEY,          -- ID تلقائي
  name        TEXT NOT NULL,                  -- اسم العميل
  industry    TEXT NOT NULL,                  -- مجاله
  whatsapp    TEXT NOT NULL,                  -- رقم الواتساب
  created_at  TIMESTAMPTZ DEFAULT NOW()       -- وقت التسجيل
);

-- إضافة Row Level Security (حماية البيانات)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- السماح للـ Service Role بالكتابة فقط (من الـ Backend)
CREATE POLICY "service_role_insert" ON leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- منع أي قراءة من الـ Frontend مباشرة (حماية بيانات العملاء)
CREATE POLICY "no_public_read" ON leads
  FOR SELECT
  TO anon
  USING (false);
```

اضغط **Run** ✅

### 2.3 الحصول على مفاتيح Supabase

في الـ Dashboard:
1. اضغط **Project Settings** (أسفل الشريط الجانبي)
2. اضغط **API**
3. انسخ:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ سري جداً!

### 2.4 تحديث ملف .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

أعد تشغيل السيرفر بعد التغيير: `npm run dev`

---

## 🌐 خطوة 3: رفع الموقع على Vercel (مجاناً)

### الطريقة السهلة (من الـ Dashboard)

1. اعمل **push** للكود على GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial VIZION AI website"
   git remote add origin https://github.com/yourusername/vizion-ai.git
   git push -u origin main
   ```
   > ⚠️ تأكد إن `.env.local` موجود في `.gitignore` عشان مترفعش المفاتيح!

2. روح على **https://vercel.com** وسجّل بحساب GitHub

3. اضغط **"Add New Project"** واختر الـ Repository

4. في قسم **Environment Variables** أضف نفس المتغيرات من `.env.local`

5. اضغط **Deploy** 🚀

### الطريقة السريعة (من Terminal)

```bash
# ثبّت Vercel CLI
npm install -g vercel

# ادخل لحساب Vercel
vercel login

# ارفع المشروع
vercel

# اتبع التعليمات واضيف المتغيرات
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY

# Deploy للـ Production
vercel --prod
```

موقعك هيبقى على رابط زي: `https://vizion-ai.vercel.app` 🎉

---

## ✏️ تخصيص الموقع

### تغيير اسم الوكالة والألوان
- **الاسم:** ابحث عن "VIZION" في كل الملفات واستبدله
- **اللون الأساسي:** في `tailwind.config.ts` → `brand: { DEFAULT: "#F5C518" }`

### تغيير الأسعار
- ملف: `components/ServicesSection.tsx`
- ابحث عن `const plans = [...]`

### إضافة فيديوهاتك الحقيقية
- ملف: `components/PortfolioSection.tsx`
- ابحث عن `const portfolioItems = [...]`
- أضيف: `thumbnailUrl` و `videoUrl` لكل فيديو

### تغيير رقم الواتساب
- ملف: `components/ContactSection.tsx` → ابحث عن `wa.me/201000000000`
- ملف: `components/Footer.tsx` → نفس الشيء

---

## 🔍 عرض البيانات في Supabase

لما عميل يسجّل بياناته:
1. روح **Supabase Dashboard**
2. اضغط **Table Editor**
3. اختر جدول **leads**
4. هتشوف كل البيانات هناك ✅

---

## 🛡️ الأمان

| الإجراء | السبب |
|---------|-------|
| `SUPABASE_SERVICE_ROLE_KEY` في الـ Backend بس | سري جداً - لو اتسرب حد ممكن يمسح قاعدة البيانات كلها |
| Row Level Security على Supabase | بتمنع أي قراءة مباشرة من الـ Frontend |
| Validation في الـ API Route | بتمنع البيانات الغلط أو الـ Spam |
| `.env.local` في `.gitignore` | بتمنع رفع المفاتيح على GitHub |

---

## 📦 Scripts المتاحة

```bash
npm run dev      # شغّل السيرفر التطويري (http://localhost:3000)
npm run build    # ابني المشروع للـ Production
npm run start    # شغّل نسخة الـ Production محلياً
npm run lint     # افحص الكود عن أخطاء
```

---

## 🤝 محتاج مساعدة؟

لو واجهت أي مشكلة:
1. تأكد إن `node --version` >= 18
2. تأكد من صحة بيانات `.env.local`
3. تأكد إن جدول `leads` اتعمل في Supabase
4. شوف الـ Errors في Terminal و Browser Console
