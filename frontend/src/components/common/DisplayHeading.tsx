import { cn } from "@/lib/utils";

/** หัวข้อตัวใหญ่แบบ condensed — ใช้กับ hero และหัวหน้าเพจเท่านั้น */
export function DisplayHeading({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-display text-[clamp(3.2rem,9vw,7.5rem)] uppercase leading-[0.86] tracking-[-0.01em]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
