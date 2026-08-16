/** ข้อมูลโปรเจกต์: Masseuseshop (AWS Cloud Project) — Layout 2, เน้นฝั่ง cloud/deployment ตามที่ขอ */

import type { Project } from "@/lib/types";
import type { CaseStudyLayout2 } from "@/lib/case-studies/layout-2";
import { DIAGRAM_GRADIENTS } from "@/lib/case-studies/layout-2";

const IMG = "/work/Masseuseshop";

const SUMMARY =
  "A team-built booking platform for a Thai massage service, where I focused on AWS cloud infrastructure, CI/CD automation, and deployment.";

export const card: Project = {
  slug: "masseuseshop",
  title: "Masseuseshop",
  category: "AWS Cloud Project",
  summary: SUMMARY,
  coverUrl: `${IMG}/Logo.png`,
  videoUrl: "",
  role: "Full-Stack & Deployment",
  year: 2025,
  tools: ["Python", "React", "AWS"],
  featured: true,
};

export const caseStudy: CaseStudyLayout2 = {
  layout: 2,
  slug: "masseuseshop",
  title: "Masseuseshop",
  eyebrow: "AWS Cloud Project",
  summary: SUMMARY,
  tools: ["Python", "React", "AWS"],
  startDate: "Nov 2025",
  endDate: "Dec 2025",
  teamType: "Team Project",
  role: "Full-Stack & Deployment",
  repoUrl: "https://github.com/Jxwgame/Cloud-Masseuse-shop.git",
  overview:
    "Contributed to Masseuseshop, a team-built online booking platform for a Thai massage service. Took ownership of the AWS cloud infrastructure and deployment pipeline, alongside full-stack development work on the application itself.",
  responsibility:
    "Designed and built the AWS infrastructure end-to-end: a [[vpc]]VPC[[/vpc]] with [[subnet]]public and private subnets[[/subnet]], an internal [[nlb]]Network Load Balancer[[/nlb]], and a [[nat_gateway]]NAT Gateway[[/nat_gateway]] to keep the [[ec2]]EC2[[/ec2]] backend and [[rds]]RDS[[/rds]] database isolated from direct internet access. Exposed the API through an [[api_gateway]]API Gateway[[/api_gateway]] REST API connected over a VPC Link, and served the frontend as a static site on [[amazon_s3]]Amazon S3[[/amazon_s3]] behind [[cloudfront]]CloudFront[[/cloudfront]]. Set up a [[ci_cd]]CI/CD[[/ci_cd]] pipeline with AWS [[aws_deployment_services]]CodePipeline, CodeBuild, and CodeDeploy[[/aws_deployment_services]] to automate builds and deployments, with [[cloudwatch]]CloudWatch[[/cloudwatch]] monitoring the pipeline and infrastructure. Also contributed to full-stack development of the booking application.",
  highlights: [
    "Designed a VPC network with public/private subnets, an internal NLB, and a NAT Gateway to isolate the backend and database from direct internet exposure",
    "Built a CI/CD pipeline with AWS CodePipeline, CodeBuild, and CodeDeploy for automated build, artifact storage, and deployment",
    "Served the frontend as a static site on Amazon S3 behind CloudFront, with the backend exposed through an API Gateway REST API over a VPC Link",
    "Deployed the backend on EC2 with RDS as the managed database layer",
    "Set up AWS CloudWatch to monitor the CI/CD pipeline and application infrastructure",
    "Contributed to full-stack development of the booking application",
  ],
  impact: [
    "Kept backend and database resources in private subnets, reducing direct exposure to the public internet",
    "Automated the build-to-deploy pipeline, cutting down manual release steps",
    "Gained hands-on experience designing and operating a production-style AWS architecture as part of a team project",
  ],
  mainDiagram: { label: "Architecture Diagram", gradient: DIAGRAM_GRADIENTS[0], image: `${IMG}/Diagram.png` },
  diagramShots: [],
  techStack: [
    { name: "Python", image: "image%20(6).png" },
    { name: "React", image: "image%20(7).png" },
    { name: "AWS", image: "image%20(24).png" },
  ],
  metrics: [{ icon: "uptime", value: "TODO", label: "TODO" }],
  takeaways: [
    {
      icon: "automation",
      title: "CI/CD Automation",
      description: "Automated build and deployment with AWS CodePipeline, CodeBuild, and CodeDeploy, reducing manual release steps.",
    },
    {
      icon: "scalable",
      title: "Layered Network Design",
      description: "Separated public and private subnets with an internal NLB and NAT Gateway to keep the backend and database off the public internet.",
    },
    {
      icon: "observability",
      title: "Infrastructure Monitoring",
      description: "Used AWS CloudWatch to monitor the CI/CD pipeline and backend infrastructure health.",
    },
  ],
};
