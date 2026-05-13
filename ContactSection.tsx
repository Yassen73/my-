/**
 * components/ContactSection.tsx
 * ================================
 * فورم التواصل اللي بيبعت البيانات للـ API Route.
 * بيستخدم:
 * - React useState لإدارة الـ Form State
 * - Fetch API لإرسال البيانات للـ Backend
 * - Validation قبل الإرسال
 */

"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2, MessageCircle, User, Briefcase } from "lucide-react";

// ===== نوع البيانات للـ Form =====
interface FormData {
  name: string;
  industry: string;
  whatsapp: string;
}

// ===== نوع حالة الإرسال =====
type FormStatus = "idle" | "loading" | "success" | "error";

// ===== قائمة المجالات =====
const industries = [
  "اختر مجالك",
  "تجارة إلكترونية",
  "مطاعم وكافيهات",
  "عقارات",
  "تعليم وكورسات",
  "صحة وجمال",
  "رياضة وفيتنس",
  "سفر وسياحة",
  "تكنولوجيا",
  "خدمات مهنية",
  "أخرى",
];

export default function ContactSection() {
  // ===== State Management =====

  // بيانات الفورم
  const [formData, setFormData] = useState<FormData>({
    name: "",
    industry: "",
    whatsapp: "",
  });

  // حالة الإرسال: idle | loading | success | error
  const [status, setStatus] = useState<FormStatus>("idle");

  // رسالة الخطأ
  const [errorMessage, setErrorMessage] = useState("");

  // ===== Input Change Handler =====
  // بيعدّل الـ State لما المستخدم يكتب
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,    // ... spread operator: بيحتفظ بالقيم القديمة
      [name]: value,  // [name]: computed property name
    }));
  };

  // ===== Validation Function =====
  // بيتأكد من صحة البيانات قبل الإرسال
  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "من فضلك اكتب اسمك";
    if (formData.name.trim().length < 2) return "الاسم قصير جداً";
    if (!formData.industry || formData.industry === "اختر مجالك")
      return "من فضلك اختر مجالك";
    if (!formData.whatsapp.trim()) return "من فضلك اكتب رقم واتساب";

    // التحقق من رقم الواتساب
    const phoneClean = formData.whatsapp.replace(/\s|-/g, "");
    if (!/^[0-9+]{10,15}$/.test(phoneClean))
      return "رقم الواتساب غير صحيح (10-15 رقم)";

    return null; // null = الفورم صح
  };

  // ===== Submit Handler =====
  // بيبعت البيانات للـ API Route
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // منع الـ Default Browser Submit

    // 1. Validate
    const validationError = validateForm();
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    // 2. Set Loading State
    setStatus("loading");
    setErrorMessage("");

    try {
      // 3. إرسال البيانات للـ API Route
      const response = await fetch("/api/contact", {
        method: "POST",              // نوع الطلب
        headers: {
          "Content-Type": "application/json",  // بنقول للسيرفر إن البيانات JSON
        },
        body: JSON.stringify(formData),  // تحويل الـ Object لـ JSON String
      });

      // 4. تحليل الرد
      const data = await response.json();

      if (response.ok) {
        // ✅ نجح الإرسال
        setStatus("success");
        // مسح بيانات الفورم
        setFormData({ name: "", industry: "", whatsapp: "" });
      } else {
        // ❌ في خطأ من السيرفر
        setStatus("error");
        setErrorMessage(data.error || "حصل خطأ، حاول مرة تانية");
      }
    } catch {
      // ❌ خطأ في الشبكة أو الاتصال
      setStatus("error");
      setErrorMessage("مش قادر يتواصل مع السيرفر، تأكد من اتصالك بالإنترنت");
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* خلفية خاصة للسكشن ده */}
      <div className="absolute inset-0 bg-dark-800/30 grid-bg" />

      {/* Glow في الوسط */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ===== Left Side: Header & Info ===== */}
          <div>
            <span className="section-tag">
              <span className="w-8 h-px bg-brand" />
              تواصل معنا
            </span>
            <h2 className="section-title mb-6">
              حوّل فكرتك لـ
              <span className="text-gradient"> فيديو مبهر</span>
              <br />
              <span className="text-white/30">في 48 ساعة</span>
            </h2>
            <p className="font-body text-white/50 text-lg leading-relaxed mb-8">
              سجّل بياناتك وفريقنا هيتواصل معاك على الواتساب خلال ساعة لمناقشة
              مشروعك والبدء فوراً.
            </p>

            {/* ===== Why Us Points ===== */}
            <div className="space-y-4">
              {[
                "استشارة مجانية 100% بدون التزام",
                "رد خلال ساعة على الواتساب",
                "أول مراجعة على الفيديو مجانية",
                "ضمان استرداد كامل لو مش راضي",
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-brand/20 border border-brand/40 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-brand" />
                  </div>
                  <span className="font-body text-white/60 text-sm">{point}</span>
                </div>
              ))}
            </div>

            {/* ===== Direct WhatsApp Button ===== */}
            <a
              href="https://wa.me/201000000000" // ← غيّر الرقم ده برقمك
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-8 border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 px-6 py-3 transition-all duration-200"
            >
              <MessageCircle size={18} className="text-green-400" />
              <span className="font-body text-green-400 text-sm">
                أو تواصل مباشرة على واتساب
              </span>
            </a>
          </div>

          {/* ===== Right Side: Form ===== */}
          <div className="glass-card p-8 border-white/5">

            {/* ===== Success State ===== */}
            {status === "success" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="font-display font-700 text-xl text-white mb-2">
                  تم الإرسال بنجاح! 🎉
                </h3>
                <p className="font-body text-white/50 text-sm mb-6">
                  فريقنا هيتواصل معاك على الواتساب خلال ساعة
                </p>
                {/* زرار لإعادة الفورم */}
                <button
                  onClick={() => setStatus("idle")}
                  className="font-mono text-xs text-brand/70 hover:text-brand underline transition-colors"
                >
                  إرسال طلب جديد
                </button>
              </div>
            ) : (
              // ===== Form =====
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                {/* ===== Form Header ===== */}
                <div className="mb-6">
                  <h3 className="font-display font-700 text-lg text-white mb-1">
                    سجّل اهتمامك مجاناً
                  </h3>
                  <p className="font-body text-xs text-white/40">
                    بيانات آمنة ومش هتتشارك مع أي طرف ثالث
                  </p>
                </div>

                {/* ===== Name Field ===== */}
                <div>
                  <label className="block font-mono text-xs text-white/40 uppercase tracking-wider mb-2">
                    الاسم الكريم *
                  </label>
                  <div className="relative">
                    <User
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="اكتب اسمك هنا"
                      className="form-input pr-9"  // pr-9 = مسافة على اليمين للأيقونة
                      maxLength={50}
                      autoComplete="name"
                    />
                  </div>
                </div>

                {/* ===== Industry Field ===== */}
                <div>
                  <label className="block font-mono text-xs text-white/40 uppercase tracking-wider mb-2">
                    مجال نشاطك *
                  </label>
                  <div className="relative">
                    <Briefcase
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                    />
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="form-input pr-9 cursor-pointer appearance-none"
                    >
                      {industries.map((ind) => (
                        <option key={ind} value={ind === "اختر مجالك" ? "" : ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* ===== WhatsApp Field ===== */}
                <div>
                  <label className="block font-mono text-xs text-white/40 uppercase tracking-wider mb-2">
                    رقم واتساب *
                  </label>
                  <div className="relative">
                    <MessageCircle
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                    />
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="01xxxxxxxxx"
                      className="form-input pr-9"
                      maxLength={20}
                      autoComplete="tel"
                      dir="ltr"  // الأرقام من اليسار لليمين
                    />
                  </div>
                  <p className="font-body text-xs text-white/30 mt-1">
                    مثال: 01012345678 أو +201012345678
                  </p>
                </div>

                {/* ===== Error Message ===== */}
                {status === "error" && errorMessage && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-3">
                    <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                    <p className="font-body text-sm text-red-400">{errorMessage}</p>
                  </div>
                )}

                {/* ===== Submit Button ===== */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="
                    btn-primary w-full justify-center mt-2
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  "
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>جاري الإرسال...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>أرسل طلبك الآن</span>
                    </>
                  )}
                </button>

                {/* ===== Privacy Note ===== */}
                <p className="font-body text-xs text-white/20 text-center">
                  بالضغط على الزر فأنت توافق على التواصل معك عبر الواتساب
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
