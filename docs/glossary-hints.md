# Glossary Hint Feature — Status & Handoff

Feature: technical jargon in project case studies (e.g. "DLP") gets a clickable
hint that pops up a plain-language definition, for non-technical readers.

## Status

Implemented and verified for **one term** (`dlp`) on **one project** (Saha
Pathanapibul, layout-3). Click-to-toggle, click-outside-to-close,
Escape-to-close, and edge-aware popover alignment all confirmed working (both
via automated DOM checks and by the user directly, screenshots in chat
history). Definition copy has been through one revision round (see decision
#5) and is currently approved. Everything else described below is still
open.

## Architecture

- [`frontend/src/lib/glossary.ts`](../frontend/src/lib/glossary.ts) — central
  dictionary: `{ key: { term, definition } }`. Add new terms here.
- [`frontend/src/components/common/Term.tsx`](../frontend/src/components/common/Term.tsx)
  — the clickable trigger + popover (client component).
- [`frontend/src/components/common/GlossaryText.tsx`](../frontend/src/components/common/GlossaryText.tsx)
  — parses `[[key]]label[[/key]]` markers inside a plain string and swaps the
  matched span for a `<Term>`; everything else passes through unchanged.
- **Marking convention**: in a content file (e.g.
  `frontend/src/lib/projects/*/index.ts`), wrap only the *specific occurrence*
  you want to hint: `[[dlp]]Data Loss Prevention (DLP)[[/dlp]]`. Other
  mentions of the same term elsewhere in the same string/project are left as
  plain text on purpose — see decision #1 below.
- **Render wiring**: any field that might contain a marker must be rendered
  via `<GlossaryText text={study.field} />` instead of `{study.field}`.
  Currently wired into
  [`CaseStudyInfoCards3.tsx`](../frontend/src/components/work/layout-3/CaseStudyInfoCards3.tsx)
  for the `overview` and `responsibility` fields only.

## Design decisions locked in (don't relitigate without reason)

1. **Manual marking, not auto-detection.** Chosen specifically so a term
   repeated many times in one project (DLP appears ~6 times in the Saha
   Pathanapibul content) doesn't light up every single occurrence — only the
   marked one(s) do.
2. **Click-to-toggle, not hover.** Required for mobile/touch, which has no
   hover state.
3. **Visual style: accent-colored text, not underline.** User explicitly
   rejected a dotted underline. Current implementation: `text-rust` +
   `hover:text-rust-deep`, no text-decoration, `cursor-help`. This was chosen
   from 4 presented options (icon badge / colored text / pill / solid
   underline).
4. **Popover matches the existing card visual language**: `rounded-xl
   border-line bg-surface`, term label styled like other section labels
   (`font-mono uppercase`), definition in `text-muted`.
5. **Definition writing style**: short, plain sentences. **No em-dash
   parenthetical interruptions** (e.g. "data — like X — from leaving" was
   rejected as sounding AI-generated). Use commas or two sentences instead.
   Keep tone consistent with the rest of the site's copy
   (direct, technical-but-accessible). **Apply this rule to every new
   definition added to `glossary.ts`** — the `dlp` entry was already rewritten
   to comply; don't reintroduce em-dashes when adding the rest of the terms
   below.

## Environment gotcha discovered this session (read before touching Term.tsx)

`<button>` defaults to `display: inline-block` in the browser. In this
project's dev/preview setup, overriding that with Tailwind's `.inline`
utility class **did not take effect**, and even an explicit inline
`style={{ display: "inline" }}` attribute on the `<button>` **also failed to
override it** — which is unusual, since inline styles normally beat any
stylesheet rule. Root cause was not fully diagnosed (suspected Tailwind v4
cascade-layer interaction specific to this environment, unconfirmed).

**Symptom if this regresses**: a multi-word term (e.g. "Data Loss Prevention
(DLP)") gets shoved onto its own line as one rigid block instead of wrapping
naturally like normal text mid-sentence.

**Workaround in place**: the trigger is a `<span role="button" tabIndex={0}
onClick=... onKeyDown={... Enter/Space ...}>`, not a `<button>`. A `<span>` is
`display: inline` by default with nothing to override. If you touch
`Term.tsx`, keep this pattern — don't swap back to `<button>` without
re-verifying wrapping at a narrow width (test: shrink the containing card and
check `element.getClientRects().length > 1` for a multi-word term).

## Testing caveat found this session (not a shipped bug — read before assuming the feature is broken)

While re-verifying after the copy fix, the automated browser tool used in
this session (Claude's sandboxed Browser pane, not a real end-user browser)
repeatedly failed to hydrate the `/work/[slug]` page's main content on the
client — every element inside `<main>` (image carousel, lightbox, the Term
trigger, etc.) had no React event handlers attached, while the shared
Sidebar/Header/Footer chrome around it hydrated fine. This reproduced after a
full dev-server restart *and* a `.next` cache wipe, so it isn't ordinary HMR
staleness.

The browser console showed repeated `WebSocket connection to
'ws://localhost:3000/_next/hmr?...' failed` errors, so the most likely
explanation is that this sandboxed browser's network setup can't reliably
reach the dev server's HMR/WebSocket endpoint, which appears to cascade into
broken client hydration for that route specifically in this tool.

**This is very likely a quirk of the automated testing tool, not a real
bug**: the user independently tested the same page in an actual browser
earlier in this session (see the screenshots they shared) and the DLP hint
click/popover worked correctly there. If a future agent verifies this page
with the same sandboxed Browser tool and sees non-interactive buttons, don't
assume the code regressed — check for the same WebSocket/HMR error pattern
first, and prefer asking the user to confirm in their own browser over
trusting this tool's hydration state for this specific route.

## Outstanding work

1. **Populate the rest of the glossary** — only `dlp` exists in
   `glossary.ts` so far. Full candidate list below, compiled from every
   project's content earlier in this session.
2. **Wire `GlossaryText` into layout-1 and layout-2** — only layout-3's
   `CaseStudyInfoCards3.tsx` uses it right now. Other case-study text fields
   (layout-1: `description`; layout-2: `overview`, `responsibility`,
   feature `description`s) render plain strings with no glossary support.
3. **Decide + apply which occurrence to mark, per term, per project** — this
   is an inherently manual/editorial step (that's the point of "manual
   mark"), needs doing project-by-project as terms are added.
4. **Not yet verified**: a real touch tap on an actual mobile device (only
   simulated via DOM/CSS + resize checks so far), and the popover in
   `.theme-light` / `.theme-sand` sections (only tested in whichever theme
   this project's info-card section happens to render in — verify
   `text-muted`/`bg-surface`/`border-line` still read well against light
   backgrounds).

## Candidate glossary terms (not yet in `glossary.ts`), by project

**Cancer Patient Healthcare Systems** — NLP, LINE LIFF, PDPA, RBAC
(role-based access control), Audit Log

**Grafana Identity Monitoring** — Microsoft Entra ID, Microsoft Graph API,
OpenSearch, Prometheus, Grafana, Observability, Ingestion Pipeline,
Retry/Backoff

**Internal Development Platform** — CI/CD, SSH Deploy Key, Append-only /
Tamper-evident Audit Log, Scaffolding, Runner, Rollback

**Masseuseshop (AWS)** — VPC, Public/Private Subnet, NLB (Network Load
Balancer), NAT Gateway, EC2, RDS, API Gateway, Amazon S3, CloudFront,
CodePipeline / CodeBuild / CodeDeploy, CloudWatch

**Saha Pathanapibul** — DLP (done), PoC, Network Topology, Patch Panel, Core
Switch / Uplink, EVE-NG / GNS3

**Cross-project / general** — API, Docker, Nginx, Proxmox, PostgreSQL,
Redis, SQLite, MySQL, Rate Limit, Honeypot
