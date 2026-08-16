import { TriangleAlert, Wrench, Zap } from "lucide-react";

import { CaseStudyCard } from "./CaseStudyCard";
import type { CaseStudyChallenge } from "@/lib/case-studies/layout-1";
import { cn } from "@/lib/utils";

export function CaseStudyChallenges({ items, className }: { items: CaseStudyChallenge[]; className?: string }) {
  return (
    <CaseStudyCard icon={Wrench} title="Challenges & Solutions" className={cn("h-full", className)}>
      <ul className="grid gap-5">
        {items.map((item) => (
          <li key={item.challenge} className="grid gap-2.5 border-t border-line pt-5 first:border-t-0 first:pt-0">
            <div className="flex gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sun/15 text-sun">
                <TriangleAlert className="size-4" aria-hidden="true" />
              </span>
              <p className="pt-1.5 text-[13px] leading-[1.6] text-fg">
                <span className="font-bold">Challenge: </span>
                {item.challenge}
              </p>
            </div>
            <div className="flex gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-rust/15 text-rust">
                <Zap className="size-4" aria-hidden="true" />
              </span>
              <p className="pt-1.5 text-[13px] leading-[1.6] text-muted">
                <span className="font-bold text-fg">Solution: </span>
                {item.solution}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </CaseStudyCard>
  );
}
