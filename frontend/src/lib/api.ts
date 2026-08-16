import "server-only";

import type { Experience, Home, Project, Skill } from "./types";

/**
 * URL ของ Go API — อ่านฝั่ง server เท่านั้น (ไม่ใช่ NEXT_PUBLIC_*)
 * ทำให้ปลายทางจริงไม่ถูกส่งไปกับ bundle ของ browser
 */
export const API_BASE = process.env.API_URL ?? "http://localhost:8080";

type FetchOptions = {
  /** วินาทีที่ถือว่าข้อมูลยังสด (ISR) — ใส่ 0 เพื่อไม่ cache */
  revalidate?: number;
};

async function getJSON<T>(path: string, { revalidate = 60 }: FetchOptions = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    next: revalidate > 0 ? { revalidate } : undefined,
    cache: revalidate > 0 ? undefined : "no-store",
  });

  if (!res.ok) {
    throw new Error(`API ${path} responded with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function getHome() {
  return getJSON<Home>("/api/v1/home", { revalidate: 60 });
}

/** รอ promise เดิมให้เสร็จ แต่บังคับว่าใช้เวลารวมไม่ต่ำกว่า ms — กัน loading.tsx (app/loading.tsx)
 * โผล่มาแว้บเดียวจนมองไม่ทันตอนข้อมูลมาจาก fetch cache ของ getHome() (revalidate: 60) ที่ตอบเกือบจะทันที */
export async function withMinDelay<T>(promise: Promise<T>, ms: number): Promise<T> {
  const [result] = await Promise.all([promise, new Promise((resolve) => setTimeout(resolve, ms))]);
  return result;
}

export function getProjects(category?: string) {
  const qs = category ? `?category=${encodeURIComponent(category)}` : "";
  return getJSON<{ projects: Project[] }>(`/api/v1/projects${qs}`, { revalidate: 60 });
}

/** คืน null เมื่อไม่พบ เพื่อให้หน้า /work/[slug] เรียก notFound() ได้ */
export async function getProject(slug: string): Promise<Project | null> {
  const res = await fetch(`${API_BASE}/api/v1/projects/${encodeURIComponent(slug)}`, {
    next: { revalidate: 300 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Project API responded with ${res.status}`);
  return res.json() as Promise<Project>;
}

export function getExperience() {
  return getJSON<{ experiences: Experience[]; skills: Skill[] }>("/api/v1/experience", {
    revalidate: 300,
  });
}
