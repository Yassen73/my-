/**
 * app/page.tsx
 * ============
 * الصفحة الرئيسية - بتجمع كل الـ Sections مع بعض.
 * 
 * ترتيب السكشنز:
 * 1. Navbar (فوق الكل - fixed)
 * 2. Hero
 * 3. Services / Pricing
 * 4. Portfolio
 * 5. Contact Form
 * 6. Footer
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// ===== الصفحة الرئيسية =====
// Server Component بطبيعتها في Next.js App Router
// الـ Client Components (اللي فيها useState/useEffect) موجودة في الـ Components نفسها
export default function HomePage() {
  return (
    <main>
      {/* شريط التنقل الثابت */}
      <Navbar />

      {/* ===== Sections ===== */}
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
