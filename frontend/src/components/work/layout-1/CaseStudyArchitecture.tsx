import { ArrowRight, Boxes } from "lucide-react";

import { CaseStudyCard } from "./CaseStudyCard";

type Node = { label: string; sublabel?: string };

function ArchNode({ label, sublabel }: Node) {
  return (
    <div className="grid min-w-[104px] place-items-center rounded-lg border border-line bg-[var(--bg)] px-4 py-3 text-center">
      <p className="font-heading text-[12px] font-bold uppercase tracking-[0.02em]">{label}</p>
      {sublabel && <p className="mt-0.5 font-mono text-[10px] text-muted">{sublabel}</p>}
    </div>
  );
}

export function CaseStudyArchitecture({ nodes }: { nodes: Node[] }) {
  return (
    <CaseStudyCard icon={Boxes} title="Architecture Overview">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex items-center gap-3">
            {i > 0 && <ArrowRight className="size-4 shrink-0 text-rust" aria-hidden="true" />}
            <ArchNode {...node} />
          </div>
        ))}
      </div>
    </CaseStudyCard>
  );
}
