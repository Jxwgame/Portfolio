/** ข้อมูลโปรเจกต์: Saha Pathanapibul Public Company Limited — รอข้อมูลจริง (Layout 3) */

import type { Project } from "@/lib/types";
import type { CaseStudyLayout3 } from "@/lib/case-studies/layout-3";
import { NIGHT_GRADIENTS } from "@/lib/case-studies/layout-3";

const IMG = "/work/saha-pathanapibul";

export const card: Project = {
  slug: "saha-pathanapibul",
  title: "Saha Pathanapibul Public Company Limited",
  category: "Infrastructure",
  summary:
    "Interned as a Network Engineer at Saha Pathanapibul Public Company Limited, working alongside senior Network Engineers and System Engineers.",
  coverUrl: `${IMG}/SPC_First.jpg`,
  videoUrl: "",
  role: "Network Engineer Intern",
  year: 2026,
  tools: ["Cisco", "Huawei", "MikroTik", "Linux"],
  featured: true,
};

export const caseStudy: CaseStudyLayout3 = {
  layout: 3,
  slug: "saha-pathanapibul",
  title: "Saha Pathanapibul Public Company Limited",
  eyebrow: "Network & Infrastructure Internship",
  summary: "A hands-on Network Engineer internship spanning network operations and data center infrastructure.",
  tools: ["Linux", "Huawei", "Cisco", "MikroTik", "Ruijie", "TP-Link", "EVE-NG", "GNS3", "Google Workspace", "Microsoft Office"],
  startDate: "Apr 2026",
  endDate: "Jul 2026",
  teamType: "IT Infrastructure & Operation",
  role: "Network Engineer Intern",
  overview:
    "Interned as a Network Engineer at Saha Pathanapibul Public Company Limited, working alongside senior Network Engineers and System Engineers to support the organization's IT infrastructure operations, and contributed to a [[dlp]]Data Loss Prevention (DLP)[[/dlp]] proof-of-concept evaluation.",
  responsibility:
    "Worked within the assigned scope, covering the installation and maintenance of network equipment, device configuration, and updates to [[network_topology]]network topology[[/network_topology]] documentation. The work also included installing, decommissioning, and maintaining equipment in the company's data center, as well as contributing to a Data Loss Prevention (DLP) [[poc]]proof of concept[[/poc]] that evaluated Google Workspace DLP and Safetica for the organization's data protection needs.",
  highlights: [
    "Installed and maintained network equipment",
    "Configured network devices and kept topology documentation up to date",
    "Installed and decommissioned data center hardware",
    "Maintained server racks nearing end of service lifecycle",
    "Ran a DLP proof-of-concept comparing Google Workspace DLP and Safetica",
  ],
  impact: [
    "Strengthened network and data center reliability through accurate, up-to-date topology documentation",
    "Supported equipment lifecycle management across the data center",
    "Gained hands-on, production-level experience across multi-vendor network infrastructure",
    "Contributed evaluation findings to a DLP PoC comparing Google Workspace DLP and Safetica for organization-wide data protection",
  ],
  heroShots: [
    { label: "SPC Head Office", gradient: NIGHT_GRADIENTS[0], image: `${IMG}/SPC_First.jpg` },
    { label: "SPC Signboard", gradient: NIGHT_GRADIENTS[1], image: `${IMG}/SPC_Second.png` },
    { label: "Internship Team", gradient: NIGHT_GRADIENTS[2], image: `${IMG}/SPC_Four.png` },
    { label: "Event Hall Setup", gradient: NIGHT_GRADIENTS[3], image: `${IMG}/SPC_Image3.png` },
  ],
  galleryShots: [
    { label: "Data Center Aisle", gradient: NIGHT_GRADIENTS[3], image: `${IMG}/presentation-9.png`, category: "Data Center" },
    { label: "Rack Overview", gradient: NIGHT_GRADIENTS[0], image: `${IMG}/presentation.png`, category: "Data Center" },
    { label: "Device Configuration", gradient: NIGHT_GRADIENTS[1], image: `${IMG}/presentation-1.png`, category: "Data Center" },
    { label: "Patch Panel", gradient: NIGHT_GRADIENTS[2], image: `${IMG}/presentation-2.png`, category: "Data Center" },
    { label: "Server Hardware Maintenance", gradient: NIGHT_GRADIENTS[3], image: `${IMG}/presentation-3.png`, category: "Data Center" },
    { label: "Rack Cable View", gradient: NIGHT_GRADIENTS[0], image: `${IMG}/presentation-4.png`, category: "Data Center" },
    { label: "Switch Cable Bundling", gradient: NIGHT_GRADIENTS[1], image: `${IMG}/presentation-6.png`, category: "Data Center" },
    { label: "Core Switch Uplinks", gradient: NIGHT_GRADIENTS[2], image: `${IMG}/presentation-7.png`, category: "Data Center" },
    { label: "Workstation & ID Badge", gradient: NIGHT_GRADIENTS[0], image: `${IMG}/presentation-10.jpg`, focus: "center 85%", category: "Data Center" },
    { label: "SPC Fair Network Planning", gradient: NIGHT_GRADIENTS[4], image: `${IMG}/presentation-5.png`, category: "Site" },
    { label: "Sahapat Delivery PoS Setup", gradient: NIGHT_GRADIENTS[1], image: `${IMG}/presentation-11.png`, category: "Site" },
    { label: "Facility Expansion Site", gradient: NIGHT_GRADIENTS[3], image: `${IMG}/presentation-8.png`, category: "Site" },
    { label: "Data Loss Prevention Dashboard", gradient: NIGHT_GRADIENTS[2], image: `${IMG}/presentation-12.png`, category: "DLP" },
    { label: "Data Classification Report", gradient: NIGHT_GRADIENTS[3], image: `${IMG}/presentation-13.png`, category: "DLP" },
  ],
  galleryTotal: 14,
  techStack: [
    { name: "Linux", image: "image%20(27).webp" },
    { name: "Huawei", image: "Huawei.webp" },
    { name: "Cisco", image: "Cisco.webp" },
    { name: "MikroTik", image: "image%20(23).webp" },
    { name: "Ruijie", image: "image%20(22).webp" },
    { name: "TP-Link", image: "image%20(20).webp" },
    { name: "EVE-NG", image: "image%20(30).webp" },
    { name: "GNS3", image: "image%20(31).webp" },
    { name: "Google Workspace", image: "image%20(44).webp" },
    { name: "Microsoft Office", image: "image%20(45).webp" },
    { name: "Safetica" },
  ],
};
