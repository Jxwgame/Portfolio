import { notFound } from "next/navigation";

import { CaseStudyLayoutOne } from "@/components/work/layout-1/CaseStudyLayoutOne";
import { CaseStudyLayoutTwo } from "@/components/work/layout-2/CaseStudyLayoutTwo";
import { CaseStudyLayoutThree } from "@/components/work/layout-3/CaseStudyLayoutThree";
import { getAllCaseStudySlugs, getCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  return { title: study?.title ?? "Project" };
}

/**
 * หน้ารายละเอียดโปรเจกต์ (case study) — แต่ละโปรเจกต์เลือก layout ของตัวเองได้ (ตอนนี้มี 2 จาก 3 แบบที่กำลังออกแบบ)
 * ตอนนี้ดึงจาก mock data ล้วน ๆ (lib/case-studies) รอ backend เพิ่ม field จริงทีหลัง
 */
export default async function ProjectDetailPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  if (study.layout === 2) return <CaseStudyLayoutTwo study={study} />;
  if (study.layout === 3) return <CaseStudyLayoutThree study={study} />;
  return <CaseStudyLayoutOne study={study} />;
}
