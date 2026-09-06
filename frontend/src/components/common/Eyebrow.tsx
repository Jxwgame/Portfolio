import { cn } from "@/lib/utils";

/** ป้ายกำกับตัวเล็กเหนือหัวข้อ พร้อมเส้นลากตามดีไซน์อ้างอิง */
export function Eyebrow({
  children,
  align = "left",
  className,
}: {
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const line = "h-px flex-1 max-w-[120px] bg-[var(--line)]";

  return (
    <p
      className={cn(
        "portfolio-label flex items-center gap-3.5 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-rust",
        align === "center" && "justify-center",
        className,
      )}
    >
      {align === "center" && <span className={line} aria-hidden="true" />}
      {children}
      <span className={line} aria-hidden="true" />
    </p>
  );
}
