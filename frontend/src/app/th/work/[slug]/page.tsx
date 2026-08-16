import { notFound } from "next/navigation";

import { CaseStudyLayoutOne } from "@/components/work/layout-1/CaseStudyLayoutOne";
import { CaseStudyLayoutTwo } from "@/components/work/layout-2/CaseStudyLayoutTwo";
import { CaseStudyLayoutThree } from "@/components/work/layout-3/CaseStudyLayoutThree";
import { getAllCaseStudySlugs, getCaseStudy } from "@/lib/case-studies";
import { localizeCaseStudyForThai } from "@/lib/i18n/caseStudies.th";

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/th/work/[slug]">) {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  return {
    title: study?.title ?? "Project",
    alternates: {
      canonical: `/th/work/${slug}`,
      languages: { en: `/work/${slug}`, th: `/th/work/${slug}` },
    },
  };
}

/** เวอร์ชันไทยของหน้ารายละเอียดโปรเจกต์ — คู่กับ src/app/work/[slug]/page.tsx ตัวอังกฤษ
 * ใช้ getCaseStudy ตัวเดียวกัน แล้วผสานคำแปลไทยผ่าน localizeCaseStudyForThai ก่อนส่งให้ layout เดิม พร้อม lang="th" */
export default async function ThaiProjectDetailPage(props: PageProps<"/th/work/[slug]">) {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const localized = localizeCaseStudyForThai(study);

  if (localized.layout === 2) return <CaseStudyLayoutTwo study={localized} lang="th" />;
  if (localized.layout === 3) return <CaseStudyLayoutThree study={localized} lang="th" />;
  return <CaseStudyLayoutOne study={localized} lang="th" />;
}
