/**
 * lib/supabase.ts
 * ===============
 * هنا بنعمل اتصال واحد مع Supabase ونستخدمه في كل الأماكن.
 * فكرة الـ Singleton Pattern: مرة واحدة بس بنعمل الاتصال.
 */

import { createClient } from "@supabase/supabase-js";

// ===== متغيرات البيئة =====
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// التحقق من وجود المتغيرات أثناء التطوير
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "❌ مش لاقي متغيرات Supabase! اتأكد من ملف .env.local"
  );
}

// ===== إنشاء الـ Client =====
// createClient بيعمل اتصال مع قاعدة البيانات
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ===== تعريف نوع بيانات العميل =====
// TypeScript Interface بتحدد شكل البيانات اللي هنبعتها
export interface LeadData {
  name: string;        // اسم العميل
  industry: string;    // مجاله
  whatsapp: string;    // رقم الواتساب
}
