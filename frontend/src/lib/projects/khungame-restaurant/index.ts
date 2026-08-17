/** ข้อมูลโปรเจกต์: Khungame Restaurant (KitchenHome) — Layout 1 */

import type { Project } from "@/lib/types";
import type { CaseStudyLayout1 } from "@/lib/case-studies/layout-1";
import { SHOT_GRADIENTS } from "@/lib/case-studies/layout-1";

const IMG = "/work/Restaurant";

const SUMMARY =
  "KitchenHome is an online food ordering platform for a restaurant, with menu browsing by category, cart checkout, order status tracking, saved delivery addresses, and a membership points card.";

export const card: Project = {
  slug: "khungame-restaurant",
  title: "Khungame Restaurant",
  category: "Food Ordering Platform",
  summary: SUMMARY,
  coverUrl: `${IMG}/Logo.png`,
  videoUrl: "",
  role: "Full-Stack Developer (Team Project)",
  year: 2023,
  tools: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  featured: true,
};

export const caseStudy: CaseStudyLayout1 = {
  layout: 1,
  slug: "khungame-restaurant",
  title: "Khungame Restaurant",
  eyebrow: "Food Ordering Platform",
  tags: ["Food Ordering", "Full-Stack Web App"],
  summary: SUMMARY,
  description:
    "KitchenHome is an online ordering site for a restaurant: customers browse a categorized menu (recommended, fried, soups, seafood, steak, dessert, drinks), add items to a cart, and check out. Signed-in customers manage saved delivery addresses, track order status through preparing/delivering stages, review past orders, and earn points on a membership card redeemable for discount codes. This was a team academic project. I worked across both the frontend pages and the [[php]]PHP[[/php]]/[[mysql]]MySQL[[/mysql]] backend.",
  highlights: [
    "Categorized menu with add-to-cart ordering",
    "Order status tracking (received / preparing / delivering)",
    "Order history for past purchases",
    "Saved delivery addresses with add/remove",
    "Membership points card with redeemable discount codes",
    "Contact page with store hours, phone/email, and map location",
  ],
  tools: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  startDate: "2023",
  endDate: "2023",
  projectType: "Academic Team Project",
  liveUrl: "#",
  sourceUrl: "https://github.com/Jxwgame/RestaurantWeb.git",
  shots: [
    { label: "Khungame Restaurant Logo", gradient: SHOT_GRADIENTS[0], image: `${IMG}/Logo.png` },
    { label: "Homepage Hero", gradient: SHOT_GRADIENTS[0], image: `${IMG}/SPC%231%20DLP%20(2).png` },
    { label: "About / Menu / Order Highlights", gradient: SHOT_GRADIENTS[1], image: `${IMG}/SPC%231%20DLP%20(4).png` },
    { label: "Menu & Ordering", gradient: SHOT_GRADIENTS[2], image: `${IMG}/SPC%231%20DLP%20(5).png` },
    { label: "Contact & Location", gradient: SHOT_GRADIENTS[3], image: `${IMG}/SPC%231%20DLP%20(6).png` },
    { label: "Saved Addresses", gradient: SHOT_GRADIENTS[0], image: `${IMG}/SPC%231%20DLP%20(7).png` },
    { label: "Order History", gradient: SHOT_GRADIENTS[1], image: `${IMG}/SPC%231%20DLP%20(8).png` },
    { label: "Order Status Tracking", gradient: SHOT_GRADIENTS[2], image: `${IMG}/SPC%231%20DLP%20(9).png` },
  ],
  phases: [
    {
      title: "Planning & Schema",
      description: "Mapped out menu categories, cart flow, and the MySQL schema for orders, addresses, and membership points.",
      status: "done",
    },
    {
      title: "Menu & Cart",
      description: "Built categorized menu browsing (recommended, fried, soups, seafood, steak, dessert, drinks) with add-to-cart ordering.",
      status: "done",
    },
    {
      title: "Checkout & Order Tracking",
      description: "Implemented checkout, saved delivery addresses, and order status tracking through received / preparing / delivering.",
      status: "done",
    },
    {
      title: "Accounts & Membership",
      description: "Added order history and a membership points card redeemable for discount codes.",
      status: "done",
    },
  ],
  techStack: [
    {
      group: "Frontend",
      items: [
        { name: "HTML", image: "HTML.webp" },
        { name: "CSS", image: "CSS.webp" },
        { name: "JavaScript", image: "JavaScript-logo.webp" },
      ],
    },
    {
      group: "Backend",
      items: [
        { name: "PHP", image: "image%20(5).webp" },
        { name: "MySQL", image: "image%20(14).webp" },
      ],
    },
  ],
};
