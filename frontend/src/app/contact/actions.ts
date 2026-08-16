"use server";

import { API_BASE } from "@/lib/api";
import type { ContactInput } from "@/lib/types";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

// ข้อความ fallback ตอน backend ไม่ได้ส่ง error message มา หรือ request ยิงไม่ถึง server เลย
const FALLBACK_MESSAGES = {
  en: {
    error: "Unable to send your message. Please try again.",
    success: "Your message has been sent. Thank you!",
    network: "Unable to reach the server. Please try again.",
  },
  th: {
    error: "ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง",
    success: "ส่งข้อความของคุณเรียบร้อยแล้ว ขอบคุณครับ",
    network: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง",
  },
} as const;

/** ส่งฟอร์มไป POST /api/v1/contact ของ Go API — validation ตัวจริงอยู่ฝั่ง backend */
export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const locale = formData.get("locale") === "th" ? "th" : "en";
  const messages = FALLBACK_MESSAGES[locale];

  const input: ContactInput = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
    website: String(formData.get("website") ?? ""), // honeypot
  };

  try {
    const res = await fetch(`${API_BASE}/api/v1/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      cache: "no-store",
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      return {
        status: "error",
        message: body?.error || messages.error,
      };
    }

    return { status: "success", message: messages.success };
  } catch {
    return { status: "error", message: messages.network };
  }
}
