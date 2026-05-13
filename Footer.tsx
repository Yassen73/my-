/**
 * components/Footer.tsx
 * =====================
 * الـ Footer البسيط في نهاية الصفحة.
 */

import { Zap } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-8 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand flex items-center justify-center">
              <Zap size={12} className="text-black" fill="black" />
            </div>
            <span className="font-display font-800 text-sm tracking-wider">
              VIZION<span className="text-brand">AI</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="font-body text-xs text-white/30">
            © {currentYear} VIZION AI — جميع الحقوق محفوظة
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { label: "واتساب", href: "https://wa.me/201000000000" },
              { label: "إنستغرام", href: "#" },
              { label: "تيك توك", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-white/30 hover:text-brand transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
