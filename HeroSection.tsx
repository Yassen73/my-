/**
 * components/HeroSection.tsx
 * ==========================
 * الـ Hero Section - أول حاجة بيشوفها الزائر.
 * لازم تكون:
 * ✅ جذابة جداً
 * ✅ تعبر عن هوية الوكالة
 * ✅ فيها Call To Action واضح
 * ✅ Animated بطريقة Smooth
 */

"use client";

import { ArrowLeft, Play, Sparkles, TrendingUp, Clock } from "lucide-react";

// ===== Stats Data =====
// الأرقام اللي بتظهر في الـ Hero
const stats = [
  { value: "+200", label: "فيديو منتج", icon: Play },
  { value: "48h", label: "وقت التسليم", icon: Clock },
  { value: "+50", label: "عميل سعيد", icon: TrendingUp },
];

export default function HeroSection() {
  // Function للـ Smooth Scroll للـ Contact Section
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPortfolio = () => {
    document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="
        relative min-h-screen flex flex-col justify-center
        overflow-hidden grid-bg noise-overlay
        pt-20 pb-16
      "
    >
      {/* ===== Background Glow Effects ===== */}
      {/* Glow كبير في الوسط */}
      <div
        className="
          absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[600px] rounded-full
          bg-brand/5 blur-[120px]
          animate-glow-pulse pointer-events-none
        "
      />
      {/* Glow صغير على اليمين */}
      <div
        className="
          absolute top-1/4 right-0
          w-[300px] h-[300px] rounded-full
          bg-brand/3 blur-[80px]
          pointer-events-none
        "
      />

      {/* ===== Main Content ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-4xl">

          {/* ===== Badge / Tag ===== */}
          <div className="animate-slide-up delay-100 inline-flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2 border border-brand/30 bg-brand/5 px-4 py-2">
              <Sparkles size={14} className="text-brand" />
              <span className="font-mono text-xs text-brand tracking-widest uppercase">
                أول وكالة AI للفيديو في مصر
              </span>
            </div>
          </div>

          {/* ===== Main Heading ===== */}
          {/*
            العنوان الرئيسي - لازم يكون:
            - كبير وجريء
            - يحتوي على الـ Value Proposition
            - يستخدم Gradient على الكلمة المهمة
          */}
          <h1 className="animate-slide-up delay-200 font-display font-800 leading-[1.05] mb-6">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white">
              فيديوهات تصنع
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gradient glow-text">
              الفرق الحقيقي
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white/20">
              بالذكاء الاصطناعي.
            </span>
          </h1>

          {/* ===== Subtitle ===== */}
          <p className="animate-slide-up delay-300 font-body text-white/50 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            نحوّل أفكارك إلى فيديوهات احترافية باستخدام أحدث تقنيات الـ AI.
            محتوى يبهر جمهورك ويضاعف مبيعاتك — في أقل من 48 ساعة.
          </p>

          {/* ===== CTA Buttons ===== */}
          <div className="animate-slide-up delay-400 flex flex-wrap gap-4 mb-16">
            {/* Primary CTA */}
            <button
              onClick={scrollToContact}
              className="btn-primary group"
            >
              <span>ابدأ مشروعك الآن</span>
              {/* السهم بيتحرك على الـ Hover */}
              <ArrowLeft
                size={16}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={scrollToPortfolio}
              className="
                inline-flex items-center gap-2 px-8 py-4
                border border-white/10 text-white/70 hover:text-white
                hover:border-white/30 font-display text-sm tracking-wider uppercase
                transition-all duration-300
              "
            >
              <Play size={14} fill="currentColor" />
              <span>شوف أعمالنا</span>
            </button>
          </div>

          {/* ===== Stats Row ===== */}
          {/* بيانات إثبات المصداقية (Social Proof) */}
          <div className="animate-slide-up delay-500 flex flex-wrap gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                {/* الرقم */}
                <span className="font-mono text-3xl font-bold text-brand">
                  {stat.value}
                </span>
                {/* الوصف */}
                <span className="font-body text-sm text-white/40 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Decorative Line at Bottom ===== */}
      {/* خط رفيع باللون الذهبي في الأسفل */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
    </section>
  );
}
