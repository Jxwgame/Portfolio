import { TrainFront, type LucideIcon } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
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
      <div className="flex items-center justify-between gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <span className="hidden size-10 shrink-0 place-items-center rounded-full border border-rust/50 bg-ink text-rust shadow-[0_0_18px_rgb(232_155_60/0.16)] lg:grid">
          <TrainFront className="size-5" aria-hidden="true" />
        </span>
      </div>

      <ol className="relative mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        <span
          aria-hidden="true"
          className="absolute inset-x-[12.5%] top-[17px] hidden h-5 lg:block"
        >
          {/* หมอนรถไฟ — เส้นบาง ห่าง ๆ พาดระหว่างราง ไม่ให้ทึบจนดูเป็นแถบกันขวาง */}
          <span className="absolute inset-0 rounded-full border-y border-ink/10 bg-ink/[0.04] shadow-[inset_0_1px_2px_rgb(10_18_32/0.08)]" />
          <span className="absolute inset-x-1 top-1/2 h-3 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,rgb(232_155_60/0.62)_0_2px,transparent_2px_14px)]" />
          {/* รางคู่บน-ล่าง */}
          <span className="absolute inset-x-0 top-0.5 h-0.5 rounded-full bg-ink/75 shadow-[0_1px_0_rgb(255_255_255/0.55)]" />
          <span className="absolute inset-x-0 bottom-0.5 h-0.5 rounded-full bg-ink/75 shadow-[0_-1px_0_rgb(255_255_255/0.55)]" />
        </span>

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
