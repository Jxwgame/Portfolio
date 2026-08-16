/** ข้อมูลโปรเจกต์: Grafana Identity Monitoring Dashboard (Layout 2) — ทำระหว่างฝึกงานที่ Saha Pathanapibul รับผิดชอบคนเดียว */

import type { Project } from "@/lib/types";
import type { CaseStudyLayout2 } from "@/lib/case-studies/layout-2";
import { DIAGRAM_GRADIENTS } from "@/lib/case-studies/layout-2";

const IMG = "/work/grafana";

export const card: Project = {
  slug: "grafana",
  title: "Grafana",
  category: "Monitoring & Observability",
  summary:
    "Solo-built an identity monitoring dashboard during my network engineering internship, pulling Microsoft Entra ID data through Microsoft Graph API and visualizing it with OpenSearch, Prometheus, and Grafana.",
  coverUrl: `${IMG}/Grafana-pok.png`,
  videoUrl: "",
  role: "Network Engineer Intern",
  year: 2026,
  tools: ["Python", "Grafana", "Prometheus", "OpenSearch", "Microsoft Graph API"],
  featured: true,
};

export const caseStudy: CaseStudyLayout2 = {
  layout: 2,
  slug: "grafana",
  title: "Grafana",
  eyebrow: "Identity & Access Monitoring",
  summary:
    "A self-driven observability project built during my Saha Pathanapibul internship, pulling Microsoft Entra ID identity data through Microsoft Graph API and visualizing it end-to-end with OpenSearch, Prometheus, and Grafana.",
  tools: ["Microsoft Entra ID", "Microsoft Graph API", "Python", "OpenSearch", "Prometheus", "Grafana"],
  startDate: "Apr 2026",
  endDate: "Jul 2026",
  teamType: "Solo Project",
  role: "Network Engineer Intern",
  repoUrl: "https://gitlab.com/theerapatsangsee-group/opensearch-monitor-account.git",
  overview:
    "Alongside my core network engineering duties during the internship at Saha Pathanapibul, I designed and built an identity monitoring dashboard — specialized security work the organization prioritized at the time — to give the IT team visibility into [[entra_id]]Microsoft Entra ID[[/entra_id]] activity, including sign-ins and access events, pulled directly from [[graph_api]]Microsoft Graph API[[/graph_api]].",
  responsibility:
    "Responsible for the architecture, data ingestion, and dashboard development for the monitoring system. This included building an [[ingestion_pipeline]]ingestion layer[[/ingestion_pipeline]] that authenticates with Microsoft Graph API and retrieves Entra ID data, indexing it in [[opensearch]]OpenSearch[[/opensearch]], configuring [[prometheus]]Prometheus[[/prometheus]] to scrape metrics from OpenSearch, and designing [[grafana]]Grafana[[/grafana]] dashboards for identity and access activity.",
  highlights: [
    "Built a full ingestion pipeline from Microsoft Graph API into OpenSearch",
    "Configured Prometheus to scrape identity metrics from OpenSearch",
    "Designed Grafana dashboards for Microsoft Entra ID sign-in and access activity",
    "Delivered the entire pipeline, from data ingestion to visualization",
  ],
  impact: [
    "Gave the IT team real-time visibility into Microsoft Entra ID sign-in and access activity, helping them spot unusual access faster",
    "Cut the time spent investigating identity and access events by consolidating data into a single dashboard instead of manual pulls from multiple sources",
    "Strengthened the organization's security monitoring with traceable visibility into foreign sign-ins, failed login attempts, and risky sign-in events",
  ],
  mainDiagram: { label: "Grafana Dashboard", gradient: DIAGRAM_GRADIENTS[0], image: `${IMG}/Grafana-pok.png` },
  diagramShots: [{ label: "Entra Sign-In Monitoring Architecture", gradient: DIAGRAM_GRADIENTS[1], image: `${IMG}/diagram.png` }],
  architectureDashboard: {
    architectureTitle: "Architecture Overview",
    architectureImage: { image: `${IMG}/diagram.png`, label: "Entra Sign-In Monitoring Architecture" },
    architectureDescription:
      "A Python collector authenticates against Microsoft Graph API and polls Entra ID sign-in logs on a rolling time window, with retry/backoff on API failure. Events pass through country-allowlist filter rules before being normalized and indexed into OpenSearch, with both raw and normalized indices backed up. Config-driven filters and index templates keep queries fast and rollovers safe, and the normalized data is queried and visualized in Grafana.",
    architectureStages: [
      { title: "Data Source", description: "Microsoft Entra ID sign-in logs, the raw identity events being monitored." },
      { title: "API Access", description: "Microsoft Graph API's /auditLogs/signIns endpoint, the only way to pull this data out." },
      { title: "Collection Pipeline", description: "Python collector with app-registration auth, time-window polling, and retry/backoff." },
      { title: "Storage", description: "OpenSearch raw and normalized indices, each with its own backup." },
      { title: "Processing", description: "Normalization, config-driven filters, and rollover-safe index templates." },
      { title: "Visualization", description: "Grafana dashboards, backed by Prometheus and OpenSearch as data sources." },
    ],
    dashboardTitle: "Operational Dashboards",
    dashboardImages: [
      { image: `${IMG}/Grafana-main.png`, label: "Pipeline Health & Freshness", span: "full" },
      { image: `${IMG}/Grafana.png`, label: "Foreign Sign-In Country Map" },
      { image: `${IMG}/Presentation_Theerapat_intern (6).png`, label: "Failed Sign-In Attempts & Account Lockouts", focus: "30% center" },
      { image: `${IMG}/Presentation_Theerapat_intern (7).png`, label: "Conditional Access Over Time" },
      { image: `${IMG}/Presentation_Theerapat_intern (8).png`, label: "At-Risk Sign-Ins & Risk Event Types", focus: "35% center" },
    ],
  },
  techStack: [
    { name: "Microsoft Entra ID" },
    { name: "Microsoft Graph API" },
    { name: "Python", image: "image%20(6).png" },
    { name: "OpenSearch", image: "Opensearch.png" },
    { name: "Prometheus", image: "image%20(29).png" },
    { name: "Grafana", image: "Grafana.png" },
  ],
  metrics: [{ icon: "uptime", value: "TODO", label: "TODO" }],
  takeaways: [
    {
      icon: "observability",
      title: "End-to-End Observability",
      description: "Improved the ability to monitor identity activity, from Graph API data ingestion to visualization in Grafana.",
    },
    {
      icon: "automation",
      title: "Automated Data Pipeline",
      description: "Automated the ingestion of Entra ID data through Microsoft Graph API into OpenSearch, removing the need for manual data pulls.",
    },
    {
      icon: "scalable",
      title: "Full Monitoring Stack Ownership",
      description: "Responsible for the monitoring system's architecture, data ingestion, and Grafana dashboards.",
    },
  ],
};
