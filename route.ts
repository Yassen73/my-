/**
 * app/api/contact/route.ts
 * ========================
 * ده الـ Backend (API Route) اللي بيستقبل بيانات الفورم
 * ويخزنها في Supabase.
 *
 * Next.js App Router بيستخدم نامينج خاص:
 * - POST  → بيستقبل بيانات جديدة
 * - GET   → بيجيب بيانات (مش محتاجينه هنا)
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// بنعمل client خاص بالـ Backend باستخدام الـ Service Role Key
// ده أقوى من الـ Anon Key وبيتجاوز قواعد الـ Row Level Security
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // مفتاح سري - للسيرفر بس!
);

// ===== POST Handler =====
// بيتشغل لما الفورم يتبعت
export async function POST(request: NextRequest) {
  try {
    // 1. استقبل البيانات من الـ Frontend
    const body = await request.json();
    const { name, industry, whatsapp } = body;

    // 2. التحقق من البيانات (Validation) - مش هنقبل بيانات ناقصة
    if (!name || !industry || !whatsapp) {
      return NextResponse.json(
        { error: "كل الحقول مطلوبة" },
        { status: 400 } // 400 = Bad Request
      );
    }

    // 3. التحقق من رقم الواتساب (لازم أرقام بس وبين 10-15 رقم)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(whatsapp.replace(/\s/g, ""))) {
      return NextResponse.json(
        { error: "رقم الواتساب غير صحيح" },
        { status: 400 }
      );
    }

    // 4. حفظ البيانات في Supabase
    // .from("leads") → اسم الجدول في قاعدة البيانات
    // .insert([...]) → بيضيف صف جديد
    const { data, error } = await supabaseAdmin
      .from("leads") // اسم الجدول اللي هتعمله في Supabase
      .insert([
        {
          name: name.trim(),           // trim() بتشيل المسافات الزيادة
          industry: industry.trim(),
          whatsapp: whatsapp.trim(),
          created_at: new Date().toISOString(), // وقت التسجيل
        },
      ])
      .select(); // بيرجع البيانات اللي اتحفظت

    // لو في error من Supabase
    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json(
        { error: "حصل خطأ في حفظ البيانات، حاول تاني" },
        { status: 500 } // 500 = Internal Server Error
      );
    }

    // 5. رد بنجاح على الـ Frontend
    return NextResponse.json(
      {
        success: true,
        message: "تم تسجيل بياناتك بنجاح! هنتواصل معاك قريباً",
        data: data,
      },
      { status: 201 } // 201 = Created
    );

  } catch (err) {
    // أي خطأ غير متوقع
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "حصل خطأ غير متوقع، حاول مرة تانية" },
      { status: 500 }
    );
  }
}
