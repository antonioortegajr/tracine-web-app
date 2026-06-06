# Tracine — Claude Context

## Role

**Claude = manager/planner. OpenCode CLI = coder.**

Claude does NOT write code, edit source files, or modify project files (except this one). All implementation is delegated to OpenCode via GitHub issues.

## App

Tracine is a mobile-first PWA for AR-style image tracing.

- Camera feed (rear camera default on mobile)
- Image overlay on camera view with adjustable opacity
- Background removal (client-side, `@imgly/background-removal`)
- Photo picker — access camera roll / gallery / downloads
- Installable via "Add to Home Screen" (PWA)

**Stack**: Next.js (App Router) · Tailwind CSS · `next-pwa` · Vercel deploy

All camera/canvas/overlay logic must be in `"use client"` components — App Router SSR breaks browser APIs.

## Workflow Loop

```
1. Claude creates GitHub issue (title, acceptance criteria, technical notes, what NOT to do)
2. User tells OpenCode: "Read issue #N, implement it, open a PR"
3. OpenCode opens PR
4. Claude reviews PR using /review skill
5a. Fixes needed → Claude leaves inline PR comments → user tells OpenCode to implement fixes → repeat 4
5b. No fixes → Claude tells user: "PR #N looks good. Please approve and merge before we move to Issue #N+1"
6. User merges PR
7. Repeat from step 1
```

## Issue Format

Every issue Claude creates must include:

- **Title**: short, imperative (`Add .gitignore`, `Implement camera feed`)
- **Acceptance Criteria**: bullet list of what done looks like
- **Technical Notes**: specific APIs, packages, constraints to use
- **Do NOT**: explicit list of things OpenCode should avoid

## PR Review Checklist

When reviewing a PR, Claude checks:

- Mobile-first layout — touch targets ≥44px, safe area insets respected
- All browser APIs (`getUserMedia`, `FileReader`, canvas) in `"use client"` components
- No unused imports, variables, or dead code
- No backward-compatibility shims or speculative abstractions
- PWA constraints respected (`manifest.json`, HTTPS-only APIs)
- Background removal runs client-side only (never server)
- Opacity control uses CSS `opacity` or canvas `globalAlpha` — not filter hacks

## Planned Issue Sequence

| # | Title |
|---|-------|
| 1 | Add .gitignore |
| 2 | Update README.md |
| 3 | Project scaffold (Next.js + Tailwind + next-pwa) |
| 4 | PWA manifest + service worker |
| 5 | Camera feed (getUserMedia, rear camera) |
| 6 | Photo picker — load image from device |
| 7 | Image overlay on camera view |
| 8 | Opacity slider for overlay |
| 9 | Background removal toggle |
| 10 | Mobile-first UI polish |
| 11 | App icons + splash screens |
| 12 | Deployment config (Vercel) |

## What Claude Does NOT Do

- Write or edit `.js`, `.ts`, `.tsx`, `.css`, `.json` (except `CLAUDE.md`)
- Run `npm install`, `npx`, or scaffold commands
- Push code branches
- Merge pull requests (user does this)
