import type { Metadata } from "next";

import { ArrowLink } from "@/components/common/ArrowLink";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Help",
  alternates: {
    canonical: "/help",
    languages: { en: "/help", th: "/th/help" },
  },
};

/** หน้า Help — ยังเป็น placeholder รอเนื้อหา FAQ จริง */
export default function HelpPage() {
  return (
    <main lang="en">
      <PageHero
        eyebrow="Help"
        title="Help & FAQ"
        description="Frequently asked questions and contact guidance are coming soon"
      />

      <Section theme="light">
        <Container>
          <p className="max-w-[60ch] leading-[1.75] text-muted">
            In the meantime, if you have a question or want to discuss an opportunity, send me a
            message through the contact page.
          </p>
          <ArrowLink href="/contact" className="mt-8">
            Go to contact
          </ArrowLink>
        </Container>
      </Section>
    </main>
  );
}
