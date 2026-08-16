import type { Metadata } from "next";

import { ArrowLink } from "@/components/common/ArrowLink";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { TH_HELP } from "@/lib/i18n/th";

export const metadata: Metadata = {
  title: "Help",
  alternates: {
    canonical: "/th/help",
    languages: { en: "/help", th: "/th/help" },
  },
};

/** เวอร์ชันไทยของหน้า Help — คู่กับ src/app/help/page.tsx ตัวอังกฤษ ยังเป็น placeholder รอเนื้อหา FAQ จริง */
export default function ThaiHelpPage() {
  return (
    <main lang="th">
      <PageHero
        eyebrow={TH_HELP.hero.eyebrow}
        title={TH_HELP.hero.title}
        description={TH_HELP.hero.description}
      />

      <Section theme="light">
        <Container>
          <p className="max-w-[60ch] leading-[1.75] text-muted">{TH_HELP.body}</p>
          <ArrowLink href={TH_HELP.linkHref} className="mt-8">
            {TH_HELP.linkLabel}
          </ArrowLink>
        </Container>
      </Section>
    </main>
  );
}
