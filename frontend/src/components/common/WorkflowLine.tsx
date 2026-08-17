import { type LucideIcon } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { RailTrack } from "@/components/common/RailTrack";
import { Reveal } from "@/components/motion/Reveal";

export type WorkflowStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/** สรุปวิธีทำงานเป็น "เส้นทางรถไฟ" 4 สถานี ให้เข้ากับธีม high-speed rail ของเว็บ — ใช้แทนกริดการ์ดธรรมดา */
export function WorkflowLine({ steps, eyebrow = "Workflow line" }: { steps: WorkflowStep[]; eyebrow?: string }) {
  return (
    <div>
      <div className="flex items-center gap-5">
        <Eyebrow className="shrink-0 [&>span]:hidden">{eyebrow}</Eyebrow>
        <span className="relative h-px flex-1 bg-[repeating-linear-gradient(90deg,rgb(10_18_32/0.34)_0_1px,transparent_1px_9px)]" aria-hidden="true">
          <span className="absolute -right-0.5 -top-1 size-2.5 rounded-full border-2 border-white bg-rust shadow-[0_0_0_1px_rgb(10_18_32/0.1)]" />
        </span>
      </div>

      <ol className="relative mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        <RailTrack className="absolute inset-x-[12.5%] top-[17px] hidden h-5 lg:block" />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 100}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 grid size-13 place-items-center rounded-full border-2 border-rust bg-ink font-station text-[13px] font-extrabold text-rust shadow-[0_5px_18px_rgb(10_18_32/0.28),0_0_0_4px_rgb(232_155_60/0.1)]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <span aria-hidden="true" className="h-5 w-px bg-ink/50" />
              <div className="grid size-10 place-items-center rounded-full border border-rust-deep bg-rust shadow-[0_5px_16px_rgb(232_155_60/0.4)]">
                <Icon className="size-5 text-white" strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-heading text-[1.15rem] font-extrabold uppercase tracking-[0.06em] text-ink">
                {step.title}
              </h3>
              <p className="mt-2.5 max-w-[24ch] text-[0.92rem] leading-[1.7] text-ink/65">
                {step.description}
              </p>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
