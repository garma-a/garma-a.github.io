# QC Project Details Redesign (QC Project)

Date: 2026-04-20
Owner: Portfolio project (`/home/girgis/repo/work/domain`)
Status: Approved design, ready for implementation planning

## Problem Statement

The current project details view for `qc-project` is not technical enough for hiring review. It uses a large raw HTML string, mixes content and presentation, and does not clearly communicate engineering depth. It also has a broken login screenshot because `static/imgs/Qc_project_imges/001_login_page.png` is corrupted.

This redesign must make the page credible for HR and technical interviewers by presenting concrete architecture details, real code evidence from `QC_project`, and a structured narrative that explains system behavior.

## Goals

1. Present the project with a strong technical story, not generic portfolio text.
2. Replace raw `htmlContent` with a structured content model in `src/routes/projects/[slug]/+page.js`.
3. Render clear, reusable sections in `src/routes/projects/[slug]/+page.svelte`.
4. Add real code snippets sourced from `/home/girgis/repo/work/QC_project`.
5. Split screenshots into product UI and Swagger/API walkthrough groups with captions.
6. Fix the broken login screenshot by using the valid source image from `imgs/Qc_project_imges/001_login_page.png`.
7. Keep the page responsive and readable on desktop and mobile.

## Non-Goals

1. No changes to unrelated sections of the portfolio site.
2. No backend code changes inside `QC_project`; it is used as the technical source of truth.
3. No migration to markdown rendering for this iteration.

## Current State Summary

- Route data: `src/routes/projects/[slug]/+page.js`
  - Uses one `projectsData` object with `htmlContent` as a long interpolated HTML string.
  - Uses image paths under `${base}/imgs/Qc_project_imges/...`.
- Route UI: `src/routes/projects/[slug]/+page.svelte`
  - Renders high-level sections plus `{@html project.htmlContent}`.
  - Supports syntax highlighting using Highlight.js on mount.
- Asset issue:
  - `static/imgs/Qc_project_imges/001_login_page.png` is corrupted (24 bytes).
  - Valid source file exists at `imgs/Qc_project_imges/001_login_page.png`.

## Proposed Information Architecture

The project detail page will render a fixed, high-signal structure in this order:

1. Main Idea
2. Core Functionality
3. Tech Stack (by layer)
4. System Design
5. Data Flow
6. Engineering Challenges and Solutions
7. UI Screenshots
8. Swagger/API Screenshots with endpoint-focused captions
9. Code Snippets (real repository excerpts)
10. Business and Engineering Impact

This sequence supports both HR (outcomes, clarity) and technical reviewers (architecture evidence, implementation depth).

## Data Contract (Route Data Model)

`qc-project` in `+page.js` will move from a mixed model (`description` + `highlights` + `htmlContent`) to an explicit model:

```js
{
  title,
  subtitle,
  year,
  githubUrl,
  stack,
  description,
  mainIdea,
  coreFunctionality: [
    { title, points: [] }
  ],
  techStackByLayer: [
    { layer, technologies: [], rationale }
  ],
  systemDesign: [
    { module, responsibility, notes }
  ],
  dataFlow: [
    { step, description }
  ],
  engineeringChallenges: [
    { challenge, approach, outcome }
  ],
  imageGroups: {
    uiScreenshots: [{ src, title, caption }],
    swaggerScreenshots: [{ src, title, caption }]
  },
  codeSnippets: [
    { title, file, language, insight, code }
  ],
  impact: [
    { title, points: [] }
  ]
}
```

## Rendering Design (`+page.svelte`)

### Section rendering

Each major block will have dedicated markup instead of `{@html}`.

- Keep current hero and navigation.
- Keep existing stack badges, but add layer-level cards in the new stack section.
- Replace generic screenshot gallery with two distinct galleries:
  - Product Screens (UI behavior)
  - API Documentation Walkthrough (Swagger evidence)
- Add snippet cards under images, each containing:
  - snippet title
  - source file path
  - short technical insight
  - syntax-highlighted code block

### Styling and responsive behavior

- Reuse the current visual language and spacing scale to avoid design drift.
- Add small subsection headers and content cards for readability.
- Ensure code blocks scroll horizontally on small screens.
- Keep image cards stable with captions and `loading="lazy"`.
- Maintain mobile legibility by reducing dense multi-column layouts below tablet breakpoints.

## Technical Content Sources (QC repository)

The following files in `/home/girgis/repo/work/QC_project/apps/backend/src` will be used as snippet sources:

1. `auth/auth.service.ts`
   - Argon2 password verification and JWT token generation.
2. `main.ts`
   - Global `ValidationPipe`, versioned API prefix, Swagger setup.
3. `drizzle/schema.ts`
   - Core entities and relations (`users`, `machines`, `qc_tests`, `control_lots`, `qc_results`, `alerts`, join tables).
4. `qc-results/qc-results.service.ts`
   - Z-score evaluation, `PASS/WARNING/FAIL` logic, alert creation trigger.
5. `alerts/alerts.repository.ts` and `users/users.repository.ts`
   - Alert fan-out and assignment resolution by section/user mappings.
6. `machines/machines.service.ts`
   - Error mapping (`23503`, `23505`) to meaningful API exceptions.

Unit test evidence may also be referenced from:

- `machines/machines.service.spec.ts`
- `auth/auth.service.spec.ts`
- `qc-results/qc-results.service.spec.ts`

## Content Narrative by Section

### Main Idea

Describe the QC platform as a modular laboratory quality system focused on reliability, traceability, and fast anomaly handling.

### Core Functionality

Cover these capabilities explicitly:

- Authentication and authorization (JWT + role-based access)
- Machine registry and operational status tracking
- QC test and control lot lifecycle management
- QC result ingestion and statistical evaluation
- Alert generation, assignment, and resolution workflow
- User management with section assignments and soft deactivation

### Tech Stack by Layer

Break out stack rationale instead of listing tools only:

- API layer: NestJS, Swagger/OpenAPI
- Domain/application layer: modular service/repository architecture
- Data layer: PostgreSQL + Drizzle ORM
- Security: JWT, Passport strategy, Argon2
- Validation/error handling: class-validator + global exception filter
- Quality gates: Jest unit tests and CI workflow

### System Design

Document module boundaries and interactions:

- Controllers for HTTP contracts
- Services for business orchestration
- Repositories for database access
- Shared auth guards and decorators for cross-cutting security concerns

### Data Flow

Show concrete end-to-end flow:

1. User logs in and receives JWT.
2. Frontend calls protected endpoints with `Authorization: Bearer <token>`.
3. Technician records QC result against a control lot.
4. Service computes z-score from lot `mean` and `standardDeviation`.
5. Status is classified (`PASS`, `WARNING`, `FAIL`).
6. Warning/fail results trigger alerts with severity and corrective guidance.
7. Alerts are assigned to users mapped to the relevant section.
8. Users mark alerts as seen/resolved with timestamps and optional notes.

### Swagger Walkthrough

Every Swagger image gets a technical caption that explains:

- endpoint group purpose
- expected auth behavior
- representative status codes and contract expectations

### Impact

Frame outcomes as operational and engineering value:

- earlier detection of out-of-range QC behavior
- better auditability through consistent records and timestamps
- maintainable backend growth through modular boundaries and DTO-driven contracts

## Asset Fix Plan (Login Image)

1. Copy the valid image file from:
   - `imgs/Qc_project_imges/001_login_page.png`
2. Into the served static path:
   - `static/imgs/Qc_project_imges/001_login_page.png`
3. Keep existing page URL references unchanged so routing remains stable.

## Acceptance Criteria

1. Login screenshot renders correctly in project details.
2. Swagger login screenshots render correctly with captions.
3. Project details include all requested technical sections:
   - core functionality
   - main idea
   - tech stack
   - system design
   - data flow
   - engineering depth via snippets
4. Snippets are based on real code from `QC_project` and syntax highlighted.
5. Sections are readable and visually consistent on desktop and mobile.

## Risks and Mitigations

1. Risk: content becomes too dense for HR scanning.
   - Mitigation: use section summaries, concise bullets, and insight labels.
2. Risk: snippets become stale if source code evolves.
   - Mitigation: include file path references and prefer stable core logic excerpts.
3. Risk: layout bloat on mobile.
   - Mitigation: stack cards vertically and cap code block visual noise.

## Implementation Notes (For Planning Stage)

- Keep change scope limited to:
  - `src/routes/projects/[slug]/+page.js`
  - `src/routes/projects/[slug]/+page.svelte`
  - `static/imgs/Qc_project_imges/001_login_page.png`
- Preserve existing route behavior and slug mapping.
- Verify with local run and responsive checks before marking complete.
