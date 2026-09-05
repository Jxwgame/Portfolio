/** ข้อมูลโปรเจกต์: ERP-Hotel (DD-Resort) — Layout 4 */

import type { Project } from "@/lib/types";
import type { CaseStudyLayout4 } from "@/lib/case-studies/layout-4";

const IMG = "/work/erp-hotel";

export const card: Project = {
  slug: "erp-hotel",
  title: "ERP-Hotel",
  category: "Hotel Operations Platform",
  summary:
    "A modular hotel ERP/PMS that connects booking, front-desk operations, stays, billing, room management, and reporting in one operational workflow. Built with Go, Next.js, and PostgreSQL as a modular monolith.",
  coverUrl: `${IMG}/Logo-1.png`,
  videoUrl: "",
  role: "Full-Stack Engineer & System Designer",
  year: 2026,
  tools: ["Next.js", "TypeScript", "Go", "PostgreSQL", "Docker"],
  featured: true,
};

export const caseStudy: CaseStudyLayout4 = {
  layout: 4,
  slug: "erp-hotel",
  title: "ERP-Hotel",
  eyebrow: "Hotel Operations ERP / PMS",
  summary:
    "A hotel ERP/PMS connecting bookings, guest stays, room management, billing, and performance analytics. Future plans include AI-assisted analysis and room access integration.",
  tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Go", "Gin", "PostgreSQL", "Docker"],
  startDate: "Aug 2026",
  endDate: "Present",
  teamType: "Personal Project",
  role: "Full-Stack Engineer & System Designer",
  repoUrl: "https://github.com/Jxwgame/ERP-Hotel",
  overview:
    "ERP-Hotel (DD-Resort) connects hotel bookings, guest stays, billing, and payments in one system. Current features cover room types and rates, multi-room bookings, check-in, room assignment and changes, walk-ins, day-use stays, Folios, Invoices, Payments, and [[night_audit]]Night Audit[[/night_audit]]. Supporting features include guest records, maintenance, income and expenses, reports, analytics, notifications, user permissions, and audit logs. AI-assisted analysis and Room Access are planned extensions and are not yet implemented.",
  responsibility:
    "Designed and built the system solo, from the domain model to the English/Thai interface. Next.js, React, and TypeScript power the frontend; [[go]]Go[[/go]] and Gin power a [[modular_monolith]]modular monolith[[/modular_monolith]] backend with a shared [[postgresql]]PostgreSQL[[/postgresql]] database accessed through sqlc and pgx. Frontdesk coordinates cross-module workflows within transactions, with [[idempotency]]idempotency[[/idempotency]] protection on selected operations. In the development configuration, Nginx routes browser requests to the frontend or API, while server-side reads call the API directly. Nginx and PostgreSQL run through [[docker]]Docker[[/docker]] Compose.",
  highlights: [
    "Built a Booking → Stay → Folio → Invoice → Payment workflow with cross-module transactions and duplicate-request protection on selected operations",
    "Built front-desk tools for check-in, check-out, room changes, walk-ins, day-use stays, and the daily Night Audit close",
    "Built a rate calendar with per-room-type pricing plans and a price-check tool that runs the same calculation the booking engine uses",
    "Built a live room-status board covering occupied, ready-to-sell, awaiting cleaning, being cleaned, and out-of-order states",
    "Built reports and business analytics with occupancy, ADR, RevPAR, revenue mix by room type and booking channel, and break-even tracking",
    "Built guest analysis with new vs returning guest trends, stay frequency, lead time, and per-guest stay history",
    "Built maintenance and expense management, plus a monthly income, expense, and profit view",
    "Shipped a responsive English and Thai interface with light and dark themes for day-to-day hotel operations",
  ],
  impact: [
    "Replaced spreadsheet and paper-based front-desk work with one system covering booking through to payment",
    "Gave staff a single live view of room status, arrivals, departures, and overdue check-outs at any moment of the day",
    "Made revenue visible the same day through business performance analytics, without waiting for the Night Audit to close",
    "Kept sensitive money and system actions accountable through role-based permissions and an append-only audit log",
  ],
  heroStats: ["18 screens", "9 modules", "Solo build", "English & Thai"],
  heroWall: [
    `${IMG}/Home-1.png`,
    `${IMG}/Room.png`,
    `${IMG}/Schedule.png`,
    `${IMG}/Reservation.png`,
    `${IMG}/Rates.png`,
    `${IMG}/Bill-1.png`,
    `${IMG}/Bill-2.png`,
    `${IMG}/Report-1.png`,
    `${IMG}/Report-2.png`,
    `${IMG}/Analysis-1.png`,
    `${IMG}/Analysis-3.png`,
    `${IMG}/Account.png`,
  ],
  workflow: {
    eyebrow: "One workflow",
    description:
      "The main guest journey runs from reserving a room type to assigning a physical room, recording stay charges, and settling an invoice. Deposits and partial payments can occur before check-out. Night Audit is a separate daily process that posts room charges, records daily statistics, and advances the hotel's business date; a stay can span several business dates.",
    stages: [
      { number: "01", title: "Booking", description: "Availability checked, rate quoted, booking created." },
      { number: "02", title: "Check-in", description: "Assign a room, open the stay, and optionally collect a key deposit." },
      { number: "03", title: "In house", description: "Room status, moves, and extras posted day by day." },
      { number: "04", title: "Folio", description: "Every charge tagged with the staff member who posted it." },
      { number: "05", title: "Invoice / Payment", description: "Issue the invoice, record payments, and apply or return deposits as appropriate." },
      { number: "06", title: "Night Audit", description: "Post room charges, record daily statistics, and advance the business date." },
    ],
  },
  architecture: {
    eyebrow: "System architecture",
    title: "One request path, one database",
    description:
      "Staff reach the system through Nginx, which serves the Next.js interface and proxies the Go API behind it. The [[modular_monolith]]modular monolith[[/modular_monolith]] keeps the front-desk workflow beside the core modules and a shared foundation, and everything writes through one repository layer into [[postgresql]]PostgreSQL[[/postgresql]].",
    image: `${IMG}/Diagram.png`,
    notes: [
      {
        title: "Request path",
        description:
          "Nginx in front, Next.js for the interface with server-side reads, and a Go and Gin REST API behind everything that writes.",
      },
      {
        title: "Modular monolith",
        description:
          "Cross-module front-desk workflows sit above the core modules and a shared foundation of identity, audit, business date, and notifications.",
      },
      {
        title: "Drawn as planned, not shipped",
        description:
          "Room access through an MQTT gateway and AI-assisted analysis appear on the diagram as future work, marked apart from what is running today.",
      },
    ],
  },
  modules: [
    {
      number: "01",
      name: "Home",
      title: "The shortcuts a working day needs",
      description:
        "The hub the front desk keeps open for the whole shift, gathering the actions a working day actually calls for into a single place: selling a walk-in, opening a day-use stay, taking an advance booking, and checking a guest in, each of them one click away.",
      display: "annotated",
      screens: [
        { image: `${IMG}/Home-1.png`, label: "Home · Shortcuts & Today's Numbers" },
        { image: `${IMG}/Home-2.png`, label: "Home · In-House Rooms & Alerts" },
      ],
      annotations: [
        {
          number: 1,
          description:
            "Today's occupancy, rooms sold, guests in house, and how many rooms housekeeping still has to clean. Figures to decide with rather than to study.",
          box: { x: 13.9, y: 8.7, w: 84.6, h: 11.4 },
        },
        {
          number: 2,
          description: "Walk-in sale, day-use stay, advance booking, and check-in. One click each, no menu hunting.",
          box: { x: 13.9, y: 49.7, w: 67.5, h: 11.2 },
        },
        {
          number: 3,
          description:
            "Rooms approaching check-out time, the ones already overdue, the live room grid, and the in-house list with a check-out button on every row.",
          box: { x: 13.9, y: 63.1, w: 67.5, h: 35.5 },
        },
      ],
    },
    {
      number: "02",
      name: "Rooms",
      title: "Every room, and the state it is in",
      description:
        "A live board of every room: occupied, ready to sell, waiting to be cleaned, being cleaned, or out of order. Housekeeping updates a room straight from its card, and the panel beside it keeps a running count per status and per room type, with each type's price and how many are still free.",
      display: "deck",
      screens: [{ image: `${IMG}/Room.png`, label: "Rooms · Status Board" }],
    },
    {
      number: "03",
      name: "Bookings",
      title: "Two views of the same nights",
      description:
        "The schedule lays every stay out as rooms against dates so what is free reads at a glance. The booking form checks availability for a date range, then creates the booking with the guest, room type, rate plan, channel, and number of guests, or finds an existing one by booking number. The price comes from the active rate plan, with a manual override when the front desk needs one.",
      display: "deck",
      screens: [
        { image: `${IMG}/Schedule.png`, label: "Bookings · Schedule" },
        { image: `${IMG}/Reservation.png`, label: "Bookings · Availability & New Booking" },
      ],
      aside: {
        title: "Reads from",
        items: ["Room availability", "Rate plans", "Guest directory"],
      },
    },
    {
      number: "04",
      name: "Room Rates",
      title: "One calculation, quoted and charged",
      description:
        "A month calendar showing the nightly price of every room type at a glance, with separate plans for standard year-round pricing and walk-in sales, and markers for today, weekends, and weekdays. A price-check tool runs the same calculation the booking engine uses, so the number staff quote is the number the guest is actually charged.",
      display: "deck",
      screens: [{ image: `${IMG}/Rates.png`, label: "Room Rates · Price Calendar" }],
    },
    {
      number: "05",
      name: "Finance",
      title: "From open Folio to settled balance",
      description:
        "Every stay opens a Folio that collects room charges and extras day by day, each line tagged with the staff member who posted it. From there the balance moves on to Invoice and Payment, with individual lines cancellable and key deposits taken, returned, or forfeited separately. A daily overview lists open and closed Folios, filtered by day, week, or month.",
      display: "deck",
      screens: [
        { image: `${IMG}/Bill-1.png`, label: "Finance · Folio List" },
        { image: `${IMG}/Bill-2.png`, label: "Finance · Folio Detail & Charges" },
      ],
    },
    {
      number: "06",
      name: "Reports",
      title: "Daily records, explained through KPIs",
      description:
        "Reports use daily statistics recorded by Night Audit. Analytics derives KPIs such as occupancy, ADR, and RevPAR when reports are read, so formula corrections can also affect historical results. Period comparisons and breakdowns by room type, booking channel, and sales method help explain revenue alongside overnight and day-use activity.",
      display: "deck",
      screens: [
        { image: `${IMG}/Report-1.png`, label: "Reports · Occupancy & Revenue KPIs" },
        { image: `${IMG}/Report-2.png`, label: "Reports · Revenue Trend & Mix" },
        { image: `${IMG}/Report-3.png`, label: "Reports · Overnight, Day-Use & Maintenance" },
        { image: `${IMG}/Report-4.png`, label: "Reports · Revenue Breakdown" },
      ],
      aside: {
        title: "Based on",
        items: ["Night Audit", "Business date", "Daily statistics"],
      },
    },
    {
      number: "07",
      name: "Business Performance",
      title: "Current performance, with AI planned next",
      description:
        "The current dashboard calculates income, expenses, occupancy, ADR, RevPAR, and break-even progress from available operational data without waiting for Night Audit. These are calculated metrics, not AI-generated insights. The next planned step is AI-assisted analysis of data prepared through the Analytics Service, with results shown for management review.",
      aside: {
        title: "Future AI analysis — not yet implemented",
        items: [
          "Hotel data → aggregated metrics and historical trends → AI analysis → management dashboard",
          "Proposed use cases: explain trends, detect anomalies, and forecast revenue or occupancy",
          "Insights and recommendations support human review and decisions",
        ],
      },
      display: "deck",
      screens: [
        { image: `${IMG}/Analysis-1.png`, label: "Business Performance · Live KPIs" },
        { image: `${IMG}/Analysis-2.png`, label: "Business Performance · Occupancy & ADR" },
        { image: `${IMG}/Analysis-3.png`, label: "Business Performance · Break-Even" },
      ],
    },
    {
      number: "08",
      name: "Guest Analysis",
      title: "Who is actually staying here",
      description:
        "New versus returning guests over time, the guest mix by booking channel, average length of stay and booking lead time, and a per-guest profile showing how often someone comes back, which room type they prefer, and their full stay history.",
      display: "deck",
      screens: [
        { image: `${IMG}/Analysis-4.png`, label: "Guest Analysis · New vs Returning" },
        { image: `${IMG}/Analysis-5.png`, label: "Guest Analysis · Guest Profile" },
      ],
    },
    {
      number: "09",
      name: "Accounting",
      title: "Where the money actually goes",
      description:
        "A monthly income-and-expense view showing revenue, expenses, net profit, and margin. Category breakdowns cover costs such as payroll, utilities, maintenance, housekeeping, and marketing. This is a simple management view, not a full general ledger.",
      display: "deck",
      screens: [{ image: `${IMG}/Account.png`, label: "Accounting · Monthly Profit & Loss" }],
    },
  ],
  /**
   * ภาพแท็บเล็ตกับโทรศัพท์ยังไม่ได้แคปมาใส่ — ระหว่างนี้จะขึ้นเป็นแผ่นเปล่าพร้อมป้ายชื่อ ขนาดกรอบเท่าของจริง
   * พอมีไฟล์แล้วใส่ image: `${IMG}/Home-Tablet.png` และ `${IMG}/Home-Phone.png` ได้เลย ไม่ต้องแก้อย่างอื่น
   */
  responsive: {
    eyebrow: "Responsive",
    title: "The same shift, on whatever is at hand",
    description:
      "The front desk runs on a desktop all day, but the same screens are used away from the counter, so every module is built for tablet and phone widths as well.",
    devices: [
      {
        device: "desktop",
        label: "Desktop",
        image: `${IMG}/Home-1.png`,
        focus: "top left",
        note: "The full workspace: navigation pinned open, the day's numbers across the top, and the in-house list beside the room grid.",
      },
      {
        device: "tablet",
        label: "Tablet",
        image: `${IMG}/iPad.jpeg`,
        note: "Business Performance at tablet width: the sidebar collapses to icons and the metric cards reflow, for checking the day away from the counter.",
      },
      {
        device: "phone",
        label: "Phone",
        image: `${IMG}/Samsung.jpeg`,
        note: "The home screen on a phone: shortcuts and the checkout list stack into a single column, for staff working on the floor rather than at the front desk.",
      },
    ],
  },
  screenIndex: {
    eyebrow: "All-screen",
    title: "The whole system on one sheet",
    description:
      "These screens show the current hotel operations interface. Supporting features include the front-desk workspace, guest directory, maintenance tickets, user roles, and activity logs. The AI Analysis and Room Access sections of the architecture diagram describe future plans, not features shown in these screenshots.",
    shots: [
      { image: `${IMG}/Home-1.png`, label: "Home" },
      { image: `${IMG}/Home-2.png`, label: "Home · alerts" },
      { image: `${IMG}/Room.png`, label: "Rooms" },
      { image: `${IMG}/Schedule.png`, label: "Schedule" },
      { image: `${IMG}/Reservation.png`, label: "Booking" },
      { image: `${IMG}/Rates.png`, label: "Rates" },
      { image: `${IMG}/Bill-1.png`, label: "Folio list" },
      { image: `${IMG}/Bill-2.png`, label: "Folio detail" },
      { image: `${IMG}/Report-1.png`, label: "Report · KPI" },
      { image: `${IMG}/Report-2.png`, label: "Report · mix" },
      { image: `${IMG}/Report-3.png`, label: "Report · segments" },
      { image: `${IMG}/Report-4.png`, label: "Report · breakdown" },
      { image: `${IMG}/Analysis-1.png`, label: "Performance" },
      { image: `${IMG}/Analysis-2.png`, label: "Occupancy & ADR" },
      { image: `${IMG}/Analysis-3.png`, label: "Break-even" },
      { image: `${IMG}/Analysis-4.png`, label: "Guest mix" },
      { image: `${IMG}/Analysis-5.png`, label: "Guest profile" },
      { image: `${IMG}/Account.png`, label: "Accounting" },
    ],
  },
  techStack: [
    { name: "Next.js", image: "image%20(9).webp" },
    { name: "React", image: "image%20(7).webp" },
    { name: "TypeScript", image: "image%20(13).webp" },
    { name: "Tailwind CSS", image: "image%20(11).webp" },
    { name: "Material UI" },
    { name: "Go", image: "image%20(3).webp" },
    { name: "Gin" },
    { name: "PostgreSQL", image: "image%20(15).webp" },
    { name: "sqlc" },
    { name: "goose" },
    { name: "Docker", image: "image%20(2).webp" },
  ],
  takeaways: [
    {
      icon: "scalable",
      title: "One Domain, Many Modules",
      description:
        "Built the backend as a modular monolith so booking, stays, billing, and the back office share one transactional database while keeping clear module boundaries.",
    },
    {
      icon: "automation",
      title: "Operations Without Gaps",
      description:
        "Built Night Audit to post room charges, resolve no-shows and open day-use stays, record daily statistics, and advance the business date. A one-shot command supports scheduled execution; configuring the OS schedule is a deployment step.",
    },
    {
      icon: "observability",
      title: "Numbers the Same Day",
      description:
        "Paired reports based on Night Audit records with a current business-performance view, so staff can review occupancy, revenue, and break-even progress before the day is closed.",
    },
    {
      icon: "observability",
      title: "Future: AI-Assisted Analysis",
      description:
        "Plan to use data prepared through the Analytics Service for AI-assisted trend explanations, anomaly detection, and revenue or occupancy forecasts. These are proposed use cases, not implemented features. Insights would appear on a management dashboard for human review.",
    },
    {
      icon: "automation",
      title: "Future: Room Access",
      description:
        "Plan to coordinate room access permissions with check-in and check-out. The diagram illustrates an Encoder issuing keycards and MQTT connecting through a Gateway to the Locks in rooms A1, A2, and A3. This is a proposed integration; the final topology depends on the selected hardware and access system.",
    },
  ],
};
