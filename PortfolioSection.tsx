/**
 * components/PortfolioSection.tsx
 * =================================
 * سكشن البورتفوليو لعرض الأعمال السابقة.
 * حالياً بيستخدم Placeholders - هتستبدلها بفيديوهاتك الحقيقية.
 *
 * إزاي تضيف فيديوهاتك:
 * 1. ارفع الـ Thumbnail على /public/portfolio/
 * 2. ضيف رابط الفيديو في الـ portfolioItems array
 * 3. غير الـ Placeholder بـ <video> أو <Image>
 */

"use client";

import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";

// ===== Portfolio Categories (فلاتر التصنيف) =====
const categories = ["الكل", "تسويق", "تعليم", "منتجات", "سوشيال ميديا"];

// ===== Portfolio Items Data =====
// هتستبدل هنا ببيانات الفيديوهات الحقيقية
const portfolioItems = [
  {
    id: 1,
    title: "حملة إطلاق منتج - علامة تجارية",
    category: "تسويق",
    duration: "00:45",
    // thumbnailUrl: "/portfolio/video-1-thumb.jpg" // ← ضيف الصورة هنا
    // videoUrl: "https://..." // ← ضيف رابط الفيديو هنا
    gradient: "from-blue-600/20 to-purple-600/20",
  },
  {
    id: 2,
    title: "فيديو تعليمي - كورس أونلاين",
    category: "تعليم",
    duration: "02:30",
    gradient: "from-brand/20 to-orange-500/20",
  },
  {
    id: 3,
    title: "إعلان منتج - ريلز إنستغرام",
    category: "منتجات",
    duration: "00:30",
    gradient: "from-pink-600/20 to-rose-600/20",
  },
  {
    id: 4,
    title: "محتوى سوشيال - تيك توك",
    category: "سوشيال ميديا",
    duration: "00:60",
    gradient: "from-cyan-600/20 to-blue-600/20",
  },
  {
    id: 5,
    title: "فيديو شركة - Corporate Intro",
    category: "تسويق",
    duration: "01:30",
    gradient: "from-green-600/20 to-emerald-600/20",
  },
  {
    id: 6,
    title: "إعلان خدمة - Explainer Video",
    category: "منتجات",
    duration: "00:90",
    gradient: "from-amber-600/20 to-brand/20",
  },
];

export default function PortfolioSection() {
  // ===== State: الفلتر المختار =====
  const [activeCategory, setActiveCategory] = useState("الكل");

  // ===== Filter Logic =====
  // بيفلتر الفيديوهات حسب الكاتيجوري المختارة
  const filteredItems = portfolioItems.filter(
    (item) =>
      activeCategory === "الكل" || item.category === activeCategory
  );

  return (
    <section id="portfolio" className="relative py-24 md:py-32 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ===== Section Header ===== */}
        <div className="text-center mb-12">
          <span className="section-tag justify-center">
            <span className="w-8 h-px bg-brand" />
            أعمالنا
            <span className="w-8 h-px bg-brand" />
          </span>
          <h2 className="section-title mb-4">
            فيديوهات صنعت
            <span className="text-gradient"> فرقاً حقيقياً</span>
          </h2>
          <p className="font-body text-white/50 max-w-xl mx-auto">
            نماذج من مشاريعنا السابقة في مختلف القطاعات
          </p>
        </div>

        {/* ===== Category Filter Buttons ===== */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-5 py-2 font-mono text-xs tracking-widest uppercase
                transition-all duration-200 border
                ${activeCategory === cat
                  ? "bg-brand text-black border-brand"       // Active state
                  : "bg-transparent text-white/40 border-white/10 hover:border-brand/30 hover:text-brand" // Inactive
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ===== Portfolio Grid ===== */}
        {/*
          CSS Grid مع Auto-fit:
          - على الموبايل: عمود واحد
          - على التابلت: عمودين
          - على الديسكتوب: تلاتة أعمدة
        */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>

        {/* ===== "More Coming" Note ===== */}
        <div className="text-center mt-12">
          <p className="font-body text-sm text-white/30">
            ✦ المزيد من الأعمال قريباً — تواصل معنا لمشاهدة الكاملة
          </p>
        </div>
      </div>
    </section>
  );
}

// ===== Portfolio Card Component =====
// كومبوننت منفصل للكارد عشان الكود يبقى نظيف
function PortfolioCard({ item }: { item: typeof portfolioItems[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="video-placeholder glass-card group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ===== Placeholder Background ===== */}
      {/*
        هنا بتضيف الـ Thumbnail:
        استبدل الـ div ده بـ:
        <Image src={item.thumbnailUrl} alt={item.title} fill className="object-cover" />
      */}
      <div
        className={`
          absolute inset-0 bg-gradient-to-br ${item.gradient}
          transition-opacity duration-300
          ${isHovered ? "opacity-100" : "opacity-60"}
        `}
      />

      {/* Grid Pattern على الـ Placeholder */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* ===== Play Button (يظهر على الـ Hover) ===== */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-300
          ${isHovered ? "opacity-100 scale-100" : "opacity-60 scale-90"}
        `}
      >
        <div className="w-14 h-14 bg-brand/90 flex items-center justify-center glow-brand">
          <Play size={20} className="text-black" fill="black" />
        </div>
      </div>

      {/* ===== Card Info (أسفل الكارد) ===== */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-900/90 to-transparent">
        <div className="flex items-end justify-between">
          <div>
            {/* Category Tag */}
            <span className="font-mono text-xs text-brand mb-1 block">
              {item.category}
            </span>
            {/* Title */}
            <h3 className="font-display font-700 text-sm text-white leading-tight">
              {item.title}
            </h3>
          </div>
          {/* Duration */}
          <span className="font-mono text-xs text-white/40 ml-2 flex-shrink-0">
            {item.duration}
          </span>
        </div>
      </div>

      {/* ===== External Link Icon ===== */}
      <div
        className={`
          absolute top-3 right-3 w-8 h-8 bg-dark-900/80 flex items-center justify-center
          transition-opacity duration-200
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
      >
        <ExternalLink size={14} className="text-white/60" />
      </div>
    </div>
  );
}
