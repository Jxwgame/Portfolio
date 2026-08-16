import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** รวมคลาส Tailwind โดยให้คลาสที่ส่งมาทีหลังชนะคลาสเดิมที่ขัดกัน */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
