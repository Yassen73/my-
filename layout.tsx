/**
 * app/layout.tsx
 * ==============
 * ده الـ Root Layout - الإطار الأساسي اللي كل الصفحات بتتغلف بيه.
 * هنا بنحدد:
 * - الـ Metadata (عنوان الموقع، الوصف، الـ SEO)
 * - الخطوط
 * - الـ CSS الأساسي
 */

import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

// ===== تحميل الخطوط من Google Fonts =====
// next/font بيحمل الخطوط محلياً على السيرفر - أسرع وأكثر خصوصية

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display", // CSS Variable هنستخدمها في Tailwind
  display: "swap",           // "swap" = بيعرض خط بديل لحد ما الخط الأصلي يتحمل
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

// ===== Metadata = معلومات الـ SEO =====
export const metadata: Metadata = {
  title: "VIZION AI | وكالة إنتاج فيديوهات الذكاء الاصطناعي",
  description:
    "أول وكالة متخصصة في إنتاج فيديوهات AI في مصر. محتوى احترافي بتقنيات الذكاء الاصطناعي في وقت قياسي.",
  keywords: ["فيديوهات AI", "ذكاء اصطناعي", "إنتاج فيديو", "مصر", "VIZION"],
  // Open Graph = البطاقة اللي بتظهر لما تشارك الموقع على السوشيال ميديا
  openGraph: {
    title: "VIZION AI | فيديوهات الذكاء الاصطناعي",
    description: "حوّل أفكارك لفيديوهات احترافية بالذكاء الاصطناعي",
    type: "website",
    locale: "ar_EG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // dir="rtl" = اتجاه النص من اليمين لليسار (عربي)
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body
        className={`
          ${syne.variable}    
          ${dmSans.variable}  
          font-body           
          bg-dark-900          
          text-white          
          overflow-x-hidden   
          antialiased         
        `}
      >
        {children}
      </body>
    </html>
  );
}
