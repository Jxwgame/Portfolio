import { Reveal } from "@/components/motion/Reveal";
import type { Experience } from "@/lib/types";

/** ไทม์ไลน์แนวตั้ง เส้นเดียว จุดสีส้มต่อ item — ใช้ในหน้า /about */
export function Timeline({ experiences }: { experiences: Experience[] }) {
  return (
    <ol className="relative border-l border-line pl-8">
      {experiences.map((exp, i) => (
        <Reveal as="li" key={`${exp.company}-${exp.startDate}`} delay={i * 80} className="pb-10 last:pb-0">
          <span className="absolute -left-[5px] mt-1.5 size-2.5 rounded-full bg-rust" />
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            {exp.startDate} to {exp.endDate || "Present"}
          </p>
          <h3 className="mt-1.5 font-heading text-[1.05rem] uppercase tracking-[0.04em]">
            {exp.role} · {exp.company}
          </h3>
          <p className="mt-2 max-w-[60ch] leading-[1.75] text-muted">{exp.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
