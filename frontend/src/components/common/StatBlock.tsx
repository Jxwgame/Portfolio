import { CountUp } from "@/components/motion/CountUp";

/** การ์ดตัวเลขสถิติ — ใช้ในหน้า /about */
export function StatBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <p className="font-display text-[clamp(2rem,4vw,2.8rem)] leading-none text-rust">
        <CountUp to={value} />
      </p>
      <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        {label}
      </p>
    </div>
  );
}
