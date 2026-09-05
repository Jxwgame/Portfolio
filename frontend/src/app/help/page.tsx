import type { Metadata } from "next";

import { ArrowLink } from "@/components/common/ArrowLink";
import { SiteUpdateLog } from "@/components/help/SiteUpdateLog";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { getHelp } from "@/lib/api";

export const metadata: Metadata = {
  title: "About site",
  alternates: {
    canonical: "/help",
    languages: { en: "/help", th: "/th/help" },
  },
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/** หน้า Help — บันทึกการอัปเดตเว็บอ่านจาก SQLite ผ่าน /api/v1/help
 * เพิ่มแถวในฐานข้อมูลแล้วขึ้นเองทั้งหน้านี้และ /th/help โดยไม่ต้องแก้โค้ด */
export default async function HelpPage() {
  const { updates } = await getHelp("en");

  return (
    <main lang="en">
      <PageHero
        eyebrow="About site"
        title="Site updates"
        description="A log of everything that has changed on this site, newest first"
      />

      <SiteUpdateLog
        updates={updates}
        copy={{
          eyebrow: "Changelog",
          heading: "What's new on this site",
          description:
            "Every update to this site is recorded here, straight from the database that powers the rest of the pages.",
          kinds: { feature: "New", improvement: "Improved", fix: "Fixed", content: "Content" },
          empty: "No updates have been recorded yet.",
          months: MONTHS,
          all: "All",
          summary: "{count} updates · latest {date}",
          showMore: "Show {count} older",
          showLess: "Show fewer",
          emptyFiltered: "No updates of this type yet.",
        }}
      />

      <Section theme="sand" size="compact">
        <Container>
          <p className="max-w-[60ch] leading-[1.75] text-muted">
            Have a question, or want to discuss an opportunity? Send me a message through the
            contact page.
          </p>
          <ArrowLink href="/contact" className="mt-8">
            Go to contact
          </ArrowLink>
        </Container>
      </Section>
    </main>
  );
}
