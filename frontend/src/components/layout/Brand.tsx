import Link from "next/link";

import { cn } from "@/lib/utils";

/** ชื่อแบรนด์ ใช้ทั้งบน Header และ Footer */
export function Brand({
  name,
  className,
  href = "/",
  onClick,
  compact = false,
}: {
  name: string;
  className?: string;
  href?: string;
  onClick?: () => void;
  compact?: boolean;
}) {
  return (
    <Link href={href} onClick={onClick} className={cn("flex items-center", className)}>
      <span
        className={cn(
          "block font-heading font-bold uppercase tracking-[0.1em] leading-tight",
          compact ? "text-[18px]" : "text-[22px]",
        )}
      >
        {name}
      </span>
    </Link>
  );
}
