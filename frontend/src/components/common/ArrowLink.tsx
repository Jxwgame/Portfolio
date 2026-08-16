import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * ลิงก์ "ไปต่อ" ที่ใช้ซ้ำทุก section
 * variant "dot" = จุดกลมสีส้ม (ใช้ในหัว section), "outline" = ปุ่มขอบบาง
 */
export function ArrowLink({
  href,
  children,
  variant = "dot",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dot" | "outline";
  className?: string;
}) {
  if (variant === "outline") {
    return (
      <Link
        href={href}
        className={cn(
          "group inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5",
          "font-mono text-xs uppercase tracking-[0.14em] transition hover:-translate-y-0.5",
          className,
        )}
      >
        {children}
        <span className="grid size-6 place-items-center rounded-full border border-current">
          <ArrowRight className="size-3" aria-hidden="true" />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em]",
        className,
      )}
    >
      {children}
      <span className="grid size-7 place-items-center rounded-full bg-rust text-white transition group-hover:translate-x-1">
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
