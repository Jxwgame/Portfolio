import type { ReactNode } from "react";

import { GLOSSARY, type GlossaryKey } from "@/lib/glossary";
import { Term } from "@/components/common/Term";

/**
 * แปลง marker [[key]]คำที่แสดง[[/key]] ในเนื้อหา project เป็น <Term> คลิกได้
 * ใช้เมื่อต้องการ hint เฉพาะจุด (เช่น "DLP" ที่พูดถึงครั้งแรก) ไม่ให้ขึ้นซ้ำทุกครั้งที่คำนั้นปรากฏ
 */
export function GlossaryText({ text }: { text: string }) {
  const marker = /\[\[(\w+)\]\](.*?)\[\[\/\1\]\]/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = marker.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const [full, id, label] = match;
    nodes.push(id in GLOSSARY ? <Term key={key++} id={id as GlossaryKey}>{label}</Term> : label);
    lastIndex = match.index + full.length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return <>{nodes}</>;
}
