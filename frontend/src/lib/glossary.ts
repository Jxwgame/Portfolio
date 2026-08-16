/**
 * คำศัพท์เทคนิคที่ใช้กับ <Term>/<GlossaryText> — เพิ่ม entry ใหม่ที่นี่แล้วอ้างด้วย key
 * ในเนื้อหา project ผ่าน marker [[key]]คำที่แสดง[[/key]]
 */
export const GLOSSARY = {
  nlp: {
    term: "NLP (Natural Language Processing)",
    definition:
      "Technology that helps computers understand, interpret, and generate human language.",
  },
  line_liff: {
    term: "LINE LIFF",
    definition:
      "A framework for running web apps inside LINE, with access to LINE login and user context.",
  },
  pdpa: {
    term: "PDPA",
    definition:
      "Thailand's personal data protection law. It sets rules for collecting, using, sharing, and securing personal data.",
  },
  rbac: {
    term: "RBAC (Role-Based Access Control)",
    definition:
      "An access model that grants permissions according to a user's assigned role rather than person by person.",
  },
  audit_log: {
    term: "Audit Log",
    definition:
      "A chronological record of actions and events used to trace who did what and when.",
  },
  entra_id: {
    term: "Microsoft Entra ID",
    definition:
      "Microsoft's cloud identity service for managing users, sign-ins, applications, and access policies.",
  },
  graph_api: {
    term: "Microsoft Graph API",
    definition:
      "Microsoft's API for securely accessing data and activity across services such as Entra ID and Microsoft 365.",
  },
  opensearch: {
    term: "OpenSearch",
    definition:
      "A search and analytics engine used to store, query, and analyze large volumes of logs and events.",
  },
  prometheus: {
    term: "Prometheus",
    definition:
      "A monitoring system that collects time-series metrics and supports alerting and operational queries.",
  },
  grafana: {
    term: "Grafana",
    definition:
      "A visualization platform for exploring metrics and logs through dashboards, panels, and alerts.",
  },
  observability: {
    term: "Observability",
    definition:
      "The ability to understand a system's internal state from signals such as metrics, logs, and traces.",
  },
  ingestion_pipeline: {
    term: "Ingestion Pipeline",
    definition:
      "A repeatable flow that collects data from a source, processes it, and sends it to storage or analysis tools.",
  },
  retry_backoff: {
    term: "Retry and Backoff",
    definition:
      "A failure-handling pattern that retries an operation while increasing the delay between attempts.",
  },
  ci_cd: {
    term: "CI/CD",
    definition:
      "Automated practices for testing, building, and delivering software changes reliably and frequently.",
  },
  ssh_deploy_key: {
    term: "SSH Deploy Key",
    definition:
      "An SSH key that gives a service controlled access to a specific code repository for automated deployments.",
  },
  tamper_evident_audit_log: {
    term: "Append-Only, Tamper-Evident Audit Log",
    definition:
      "An event record that allows new entries but prevents silent changes to existing history, making tampering detectable.",
  },
  scaffolding: {
    term: "Scaffolding",
    definition:
      "Generating a project's starter structure and configuration from a reusable template.",
  },
  runner: {
    term: "Runner",
    definition:
      "A worker that executes automated jobs such as validation, builds, tests, and deployments.",
  },
  rollback: {
    term: "Rollback",
    definition:
      "Restoring a system to a previous known-good version after a release fails or causes problems.",
  },
  vpc: {
    term: "VPC (Virtual Private Cloud)",
    definition:
      "A logically isolated network in a cloud environment where resources and traffic rules are controlled.",
  },
  subnet: {
    term: "Public and Private Subnets",
    definition:
      "Smaller network segments inside a VPC. Public subnets can route to the internet, while private subnets keep resources isolated.",
  },
  nlb: {
    term: "NLB (Network Load Balancer)",
    definition:
      "A service that distributes network connections across multiple application targets for availability and scale.",
  },
  nat_gateway: {
    term: "NAT Gateway",
    definition:
      "A managed gateway that lets resources in private subnets reach the internet without accepting direct inbound connections.",
  },
  ec2: {
    term: "Amazon EC2",
    definition:
      "AWS virtual servers used to run applications with configurable computing, storage, and networking resources.",
  },
  rds: {
    term: "Amazon RDS",
    definition:
      "A managed AWS service for running relational databases with automated maintenance and backup options.",
  },
  api_gateway: {
    term: "Amazon API Gateway",
    definition:
      "A managed service for publishing, securing, and routing requests to application APIs.",
  },
  amazon_s3: {
    term: "Amazon S3",
    definition:
      "AWS object storage for files such as static website assets, uploads, backups, and build artifacts.",
  },
  cloudfront: {
    term: "Amazon CloudFront",
    definition:
      "A content delivery network that caches and serves content from locations closer to users.",
  },
  aws_deployment_services: {
    term: "CodePipeline, CodeBuild, and CodeDeploy",
    definition:
      "AWS services that coordinate releases, build and test code, and deploy application versions to target environments.",
  },
  cloudwatch: {
    term: "Amazon CloudWatch",
    definition:
      "AWS monitoring for metrics, logs, dashboards, and alerts from applications and cloud resources.",
  },
  dlp: {
    term: "DLP (Data Loss Prevention)",
    definition:
      "Security tools and policies that detect sensitive data, such as customer records or internal files, and block it from leaving an organization without authorization.",
  },
  poc: {
    term: "PoC (Proof of Concept)",
    definition:
      "A small, focused implementation used to test whether an idea or technology is practical before wider adoption.",
  },
  network_topology: {
    term: "Network Topology",
    definition:
      "A map of how network devices, connections, and traffic paths are arranged.",
  },
  patch_panel: {
    term: "Patch Panel",
    definition:
      "A rack-mounted panel that organizes physical network cables and connects them to switches or other equipment.",
  },
  core_switch_uplink: {
    term: "Core Switch and Uplink",
    definition:
      "A core switch carries central network traffic. An uplink connects it to another switch or a higher network layer.",
  },
  eve_ng_gns3: {
    term: "EVE-NG and GNS3",
    definition:
      "Network emulation tools used to build and test virtual device topologies before changing real infrastructure.",
  },
  api: {
    term: "API (Application Programming Interface)",
    definition:
      "A defined way for software systems to request data or actions from one another.",
  },
  docker: {
    term: "Docker",
    definition:
      "A platform for packaging an application and its dependencies into portable, isolated containers.",
  },
  nginx: {
    term: "Nginx",
    definition:
      "A web server and reverse proxy commonly used to route traffic, serve static files, and handle TLS connections.",
  },
  proxmox: {
    term: "Proxmox",
    definition:
      "A virtualization platform for managing virtual machines, containers, storage, and clustered servers.",
  },
  postgresql: {
    term: "PostgreSQL",
    definition:
      "An open-source relational database known for reliability, strong data integrity, and advanced SQL features.",
  },
  redis: {
    term: "Redis",
    definition:
      "An in-memory data store commonly used for caching, queues, sessions, and fast temporary data access.",
  },
  sqlite: {
    term: "SQLite",
    definition:
      "A lightweight relational database stored in a single file and embedded directly in an application.",
  },
  php: {
    term: "PHP",
    definition:
      "A server-side programming language commonly used to build dynamic websites and web application backends.",
  },
  mysql: {
    term: "MySQL",
    definition:
      "A relational database used to store and query structured application data with SQL.",
  },
  rate_limit: {
    term: "Rate Limit",
    definition:
      "A control that restricts how many requests a user or system can make within a set period.",
  },
  honeypot: {
    term: "Honeypot",
    definition:
      "A decoy system or service designed to attract and observe suspicious activity without exposing real assets.",
  },
} as const;

export type GlossaryKey = keyof typeof GLOSSARY;
