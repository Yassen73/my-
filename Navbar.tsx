/**
 * components/Navbar.tsx
 * =====================
 * شريط التنقل العلوي (Navigation Bar)
 * - شفاف في البداية
 * - يصبح معتم لما المستخدم ينزل للأسفل
 * - يحتوي على لينكات للسكشنز المختلفة
 */

"use client"; // هذا الكومبوننت بيستخدم useState - لازم يشتغل على الـ Client

import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

// ===== Navigation Links Data =====
// بدل ما تكتبهم مكررين، خليناهم في Array
const navLinks = [
  { label: "الخدمات", href: "#services" },
  { label: "أعمالنا", href: "#portfolio" },
  { label: "الأسعار", href: "#pricing" },
  { label: "تواصل معنا", href: "#contact" },
];

export default function Navbar() {
  // ===== State =====
  const [isMenuOpen, setIsMenuOpen] = useState(false);   // هل قائمة الموبايل مفتوحة؟
  const [isScrolled, setIsScrolled] = useState(false);   // هل المستخدم نزل للأسفل؟

  // ===== Effect: متابعة الـ Scroll =====
  useEffect(() => {
    const handleScroll = () => {
      // لو نزل أكتر من 50px - شغّل الخلفية المعتمة
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Cleanup - مهم عشان تمنع Memory Leaks
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===== Smooth Scroll Function =====
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // اغلق قائمة الموبايل بعد الضغط
    }
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50               /* ثابت فوق كل حاجة */
        transition-all duration-500                    /* Animation انتقال سلس */
        ${isScrolled
          ? "bg-dark-900/95 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent py-5"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* ===== Logo ===== */}
        <button
          onClick={() => scrollToSection("#hero")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-brand flex items-center justify-center">
            <Zap size={16} className="text-black" fill="black" />
          </div>
          <span className="font-display font-800 text-lg tracking-wider">
            VIZION<span className="text-brand">AI</span>
          </span>
        </button>

        {/* ===== Desktop Navigation (شاشات كبيرة بس) ===== */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="
                text-white/60 hover:text-brand font-body text-sm
                transition-colors duration-200 relative
                after:absolute after:bottom-0 after:left-0 after:right-0 
                after:h-px after:bg-brand after:scale-x-0 
                after:transition-transform after:duration-200
                hover:after:scale-x-100
              "
            >
              {link.label}
            </button>
          ))}

          {/* CTA Button في الـ Nav */}
          <button
            onClick={() => scrollToSection("#contact")}
            className="btn-primary text-xs py-2 px-5"
          >
            ابدأ مشروعك
          </button>
        </div>

        {/* ===== Mobile Menu Button (موبايل بس) ===== */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white/70 hover:text-brand transition-colors"
          aria-label="فتح القائمة"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ===== Mobile Menu Dropdown ===== */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300
          ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          bg-dark-800/98 backdrop-blur-xl border-b border-white/5
        `}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-white/70 hover:text-brand font-body text-base py-2 text-right
                         transition-colors duration-200 border-b border-white/5 last:border-0"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("#contact")}
            className="btn-primary text-sm py-3 mt-2 justify-center"
          >
            ابدأ مشروعك الآن
          </button>
        </div>
      </div>
    </nav>
  );
}
