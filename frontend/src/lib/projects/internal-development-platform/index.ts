/** ข้อมูลโปรเจกต์: Internal Development Platform (Layout 2) ทำระหว่างฝึกงานที่ Saha Pathanapibul รับผิดชอบคนเดียว */

import type { Project } from "@/lib/types";
import type { CaseStudyLayout2 } from "@/lib/case-studies/layout-2";
import { DIAGRAM_GRADIENTS } from "@/lib/case-studies/layout-2";

const IMG = "/work/Internal-development-platform";

export const card: Project = {
  slug: "internal-development-platform",
  title: "Internal Development Platform",
  category: "Platform Engineering",
  summary:
    "Solo-built internal developer platform with self-service project scaffolding, multi-environment deployment pipelines, and infrastructure visibility. Built with Go, Next.js, and PostgreSQL, deployed via Docker on Proxmox during my network engineering internship.",
  coverUrl: `${IMG}/IDP-cover.png`,
  videoUrl: "",
  role: "Network Engineer Intern",
  year: 2026,
  tools: ["Go", "Next.js", "PostgreSQL", "Redis", "Docker", "Proxmox", "Nginx"],
  featured: true,
};

export const caseStudy: CaseStudyLayout2 = {
  layout: 2,
  slug: "internal-development-platform",
  title: "Internal Development Platform",
  eyebrow: "Software Development Project",
  summary:
    "A self-service internal developer platform built during my Saha Pathanapibul internship. Lets teams scaffold projects from templates, deploy across dev, staging, and production, and monitor pipeline and infrastructure health in one place.",
  tools: ["Go", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Redis", "Docker", "Nginx", "Proxmox"],
  startDate: "Apr 2026",
  endDate: "Jul 2026",
  teamType: "Solo Project",
  role: "Network Engineer Intern",
  repoUrl: "https://gitlab.com/theerapatsangsee/internal-development-platform.git",
  overview:
    "Alongside my core network engineering duties at Saha Pathanapibul, I designed and built an internal developer platform (codename BEAVWORKS). It gives engineering teams a self-service way to spin up projects from starter templates, connect repositories, and deploy to multiple environments, while giving platform admins visibility into [[runner]]runner[[/runner]] health, deploy targets, and access control.",
  responsibility:
    "Developed this as a solo project, taking responsibility for the design and development of its core components: the Go backend, [[postgresql]]PostgreSQL[[/postgresql]] schema, and Next.js/TypeScript frontend. The work also included project [[scaffolding]]scaffolding[[/scaffolding]] from templates, repository connections using [[ssh_deploy_key]]SSH deploy keys[[/ssh_deploy_key]], a multi-environment deployment pipeline with approvals for protected environments, infrastructure and deploy target management, role-based access control, and an [[tamper_evident_audit_log]]append-only audit log[[/tamper_evident_audit_log]].",
  highlights: [
    "Built a self-service project bootstrap flow with 10+ starter templates (Go API, Node.js API, React SPA, Vue, Angular, Next.js, Python Django/Flask, and more)",
    "Designed a multi-environment deployment pipeline (dev/staging/production) with validate, build, and deploy stages plus rollback support",
    "Added an approval workflow for deploys to protected environments",
    "Built a platform-wide health dashboard surfacing runner status, concurrency slots, and deploy target utilization",
    "Implemented role-based access control with owner/leader/developer/auditor roles and access requests",
    "Built an append-only, tamper-evident audit log covering every platform action",
  ],
  impact: [
    "Helped standardize how internally developed and hosted software is managed",
    "Helped IT infrastructure staff track systems and services faster when issues arose",
    "Helped allocate software and network deployment resources more systematically",
    "Strengthened deploy security and traceability with role-based access control and an append-only audit log",
  ],
  conceptOverview: {
    eyebrow: "Project Overview",
    title: "From Scaffold to Production",
    description:
      "A self-service pipeline that takes a project from its first commit to a live, monitored deployment on its own. Every step is validated, tested in each environment before going live, and watched over the whole way.",
    features: [
      {
        icon: "validate",
        title: "Validate First",
        description: "Every deploy runs through validate, build, and deploy stages before it ships.",
      },
      {
        icon: "environments",
        title: "Multi-Environment",
        description: "Promote the same build safely across dev, staging, and production.",
      },
      {
        icon: "traceability",
        title: "Full Traceability",
        description: "An append-only audit log records every action on the platform.",
      },
      {
        icon: "governance",
        title: "Governed by Design",
        description: "Role-based access and approval workflows protect sensitive environments.",
      },
    ],
    impact: {
      title: "Why It Matters",
      description:
        "Helped bring the organization's engineering standards under consistent control and practice at every stage, replacing ad hoc, manual project setup and deploys with a single self-service platform. Gave engineering teams a repeatable, standardized path from a blank repository to a running, monitored deployment in production.",
    },
    secondary: {
      title: "One Platform, Every Stage",
      description:
        "Beyond the deploy pipeline itself, the platform ties scaffolding, infrastructure, and governance into one system, from picking a starter template to tracking deployment status and catching issues before they reach production.",
    },
    panels: [
      {
        number: 1,
        title: "Validate, Build & Deploy",
        description: "Every deploy runs through validation and build, then promotes across dev, staging, and production.",
        image: `${IMG}/IDP-22.png`,
        span: "full",
      },
      {
        number: 2,
        title: "Platform Ecosystem",
        description: "Scaffolding, deployments, and infrastructure all run through one unified platform.",
        image: `${IMG}/IDP-11.png`,
        span: "half",
      },
      {
        number: 3,
        title: "End-to-End Flow",
        description: "From picking a template to a monitored production deployment, the complete cycle.",
        image: `${IMG}/IDP-33.png`,
        span: "half",
      },
    ],
  },
  features: [
    {
      title: "Self-Service Project Scaffolding",
      description:
        "Teams pick a starter template (Go API, Node.js API, React SPA, Vue, Angular, Next.js, Python Django/Flask, and more) built to the organization's development standards to enforce security and code quality from the start, and get a new project bootstrapped automatically, with the repository connected and a starter package generated in minutes.",
      gradient: DIAGRAM_GRADIENTS[0],
      images: [`${IMG}/IDP-4.png`],
    },
    {
      title: "Multi-Environment Deployment Pipeline",
      description:
        "Every deploy runs through validate, build, and deploy stages across dev, staging, and production, with full logs per stage and one-click [[rollback]]rollback[[/rollback]] when a release fails.",
      gradient: DIAGRAM_GRADIENTS[1],
      images: [`${IMG}/IDP-2.png`],
    },
    {
      title: "Platform Health at a Glance",
      description:
        "A platform-wide dashboard surfaces runner status, concurrency slots, and deploy target utilization, so bottlenecks like an unreachable runner or a full queue are visible before they block a deploy.",
      gradient: DIAGRAM_GRADIENTS[2],
      images: [`${IMG}/IDP-3.png`],
    },
    {
      title: "Governance Built In",
      description:
        "Role-based access (owner, leader, developer, auditor) and an append-only audit log record every action on the platform, from account changes to deploy approvals, for full accountability.",
      gradient: DIAGRAM_GRADIENTS[3],
      images: [`${IMG}/IDP-6.png`],
    },
  ],
  mainDiagram: { label: "Internal Development Platform", gradient: DIAGRAM_GRADIENTS[0], image: `${IMG}/Internal-development-platform.png` },
  diagramShots: [
    { label: "Project Overview", gradient: DIAGRAM_GRADIENTS[1], image: `${IMG}/IDP-1.png` },
    { label: "Deployment Pipeline", gradient: DIAGRAM_GRADIENTS[2], image: `${IMG}/IDP-2.png` },
    { label: "Platform Health Dashboard", gradient: DIAGRAM_GRADIENTS[3], image: `${IMG}/IDP-3.png` },
    { label: "Project Templates", gradient: DIAGRAM_GRADIENTS[0], image: `${IMG}/IDP-4.png` },
    { label: "Deployment Targets", gradient: DIAGRAM_GRADIENTS[1], image: `${IMG}/IDP-5.png` },
    { label: "Audit Log Detail", gradient: DIAGRAM_GRADIENTS[2], image: `${IMG}/IDP-6.png` },
  ],
  techStack: [
    { name: "Go", image: "image%20(3).png" },
    { name: "Next.js", image: "image%20(9).png" },
    { name: "TypeScript", image: "image%20(13).png" },
    { name: "Tailwind CSS", image: "image%20(11).png" },
    { name: "PostgreSQL", image: "image%20(15).png" },
    { name: "Redis", image: "Redis.png" },
    { name: "Docker", image: "image%20(2).png" },
    { name: "Nginx", image: "Nginx.webp" },
    { name: "Proxmox", image: "proxmox.png" },
  ],
  metrics: [{ icon: "uptime", value: "TODO", label: "TODO" }],
  takeaways: [
    {
      icon: "automation",
      title: "End-to-End Self-Service Platform",
      description: "Replaced manual project setup and deploys with a self-service flow, from templated scaffolding to a full deployment pipeline.",
    },
    {
      icon: "scalable",
      title: "Full-Stack System Ownership",
      description: "Designed and built the entire platform, from Go backend and PostgreSQL schema to Next.js frontend.",
    },
    {
      icon: "observability",
      title: "Built-In Governance",
      description: "Backed every deploy and platform action with RBAC, deploy approvals, and an append-only audit log for accountability.",
    },
  ],
};
