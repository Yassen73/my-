/**
 * components/ServicesSection.tsx
 * ================================
 * سكشن الباقات والأسعار.
 * بيعرض 3 باقات بمميزاتها وأسعارها.
 * الباقة الأكتر مبيعاً بتكون highlighted.
 */

"use client";

import { Check, Zap, Crown, Rocket } from "lucide-react";

// ===== Pricing Plans Data =====
// بيانات الباقات في مكان واحد - سهل التعديل
const plans = [
  {
    id: "starter",
    icon: Zap,
    name: "Starter",
    nameAr: "الباقة الأساسية",
    price: "2,500",
    currency: "جنيه",
    period: "للفيديو",
    description: "مثالية للمشاريع الناشئة والأفراد اللي عايزين يبدأوا",
    popular: false, // مش الأكتر مبيعاً
    features: [
      "فيديو واحد بجودة Full HD",
      "مدة الفيديو حتى 60 ثانية",
      "3 مراجعات مجانية",
      "تسليم خلال 72 ساعة",
      "موسيقى تصويرية مرخصة",
      "ملفات متعددة الصيغ",
    ],
    cta: "ابدأ الآن",
  },
  {
    id: "pro",
    icon: Crown,
    name: "Professional",
    nameAr: "الباقة الاحترافية",
    price: "5,500",
    currency: "جنيه",
    period: "للفيديو",
    description: "الأنسب للشركات اللي تريد محتوى احترافي ومؤثر",
    popular: true, // ✅ الأكتر مبيعاً - هيبقى مميز
    features: [
      "فيديو بجودة 4K Ultra HD",
      "مدة الفيديو حتى 3 دقائق",
      "مراجعات غير محدودة",
      "تسليم خلال 48 ساعة",
      "تصميم مخصص بهوية علامتك",
      "Avatar AI ناطق بصوتك",
      "ترجمة لـ 3 لغات",
      "دعم أولوية على واتساب",
    ],
    cta: "احجز باقتك",
  },
  {
    id: "enterprise",
    icon: Rocket,
    name: "Enterprise",
    nameAr: "باقة المؤسسات",
    price: "تواصل معنا",
    currency: "",
    period: "",
    description: "حلول مخصصة للشركات الكبيرة والمشاريع الضخمة",
    popular: false,
    features: [
      "فيديوهات غير محدودة شهرياً",
      "فريق مخصص لمشروعك",
      "إنتاج على مدار الساعة",
      "تسليم خلال 24 ساعة",
      "استراتيجية محتوى مجانية",
      "تكامل مع منصاتك التسويقية",
      "تقارير أداء أسبوعية",
      "مدير حساب مخصص",
    ],
    cta: "احجز استشارة مجانية",
  },
];

export default function ServicesSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      {/* خلفية الـ Section */}
      <div className="absolute inset-0 bg-dark-800/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* ===== Section Header ===== */}
        <div className="text-center mb-16">
          <span className="section-tag justify-center">
            <span className="w-8 h-px bg-brand" />
            الباقات والأسعار
            <span className="w-8 h-px bg-brand" />
          </span>
          <h2 className="section-title mb-4">
            استثمر في محتوى
            <span className="text-gradient"> يُحوّل المشاهدين</span>
          </h2>
          <p className="font-body text-white/50 max-w-xl mx-auto text-lg">
            اختار الباقة المناسبة لاحتياجاتك. كل الباقات تشمل ضمان جودة كامل.
          </p>
        </div>

        {/* ===== Pricing Cards Grid ===== */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`
                  relative glass-card p-8 flex flex-col
                  ${plan.popular
                    ? "border-brand/40 bg-dark-700/80" // الكارد المميز
                    : "border-white/5 bg-dark-700/30"   // الكارد العادي
                  }
                `}
              >
                {/* ===== Popular Badge ===== */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-brand text-black font-mono text-xs font-bold px-4 py-1 tracking-wider uppercase">
                      الأكتر مبيعاً ✦
                    </span>
                  </div>
                )}

                {/* Glow للكارد المميز */}
                {plan.popular && (
                  <div className="absolute inset-0 bg-brand/3 pointer-events-none" />
                )}

                {/* ===== Card Header ===== */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    {/* Icon */}
                    <div
                      className={`
                        w-10 h-10 flex items-center justify-center mb-3
                        ${plan.popular ? "bg-brand text-black" : "bg-dark-500 text-brand"}
                      `}
                    >
                      <Icon size={18} />
                    </div>
                    <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">
                      {plan.name}
                    </p>
                    <h3 className="font-display font-700 text-xl text-white">
                      {plan.nameAr}
                    </h3>
                  </div>
                </div>

                {/* ===== Price ===== */}
                <div className="mb-6 pb-6 border-b border-white/5">
                  {plan.currency ? (
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-800 text-4xl text-white">
                        {plan.price}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-body text-sm text-brand">
                          {plan.currency}
                        </span>
                        <span className="font-body text-xs text-white/30">
                          {plan.period}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="font-display font-700 text-2xl text-brand">
                      {plan.price}
                    </span>
                  )}
                  <p className="font-body text-sm text-white/40 mt-2">
                    {plan.description}
                  </p>
                </div>

                {/* ===== Features List ===== */}
                <ul className="flex flex-col gap-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {/* Checkmark Icon */}
                      <div
                        className={`
                          flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5
                          ${plan.popular ? "text-brand" : "text-white/40"}
                        `}
                      >
                        <Check size={14} />
                      </div>
                      <span className="font-body text-sm text-white/70">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* ===== CTA Button ===== */}
                <button
                  onClick={scrollToContact}
                  className={`
                    w-full py-3 font-display text-sm tracking-wider uppercase
                    transition-all duration-300
                    ${plan.popular
                      ? "btn-primary justify-center"
                      : "border border-white/10 text-white/60 hover:border-brand/40 hover:text-brand"
                    }
                  `}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* ===== Bottom Note ===== */}
        <p className="text-center font-body text-sm text-white/30 mt-10">
          ✦ كل الأسعار قابلة للتفاوض للمشاريع الكبيرة والعقود طويلة المدى
        </p>
      </div>
    </section>
  );
}
