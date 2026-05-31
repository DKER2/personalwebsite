# AI Developer Freelance Website Redesign

**Date:** 2025-05-23
**Author:** OpenCode
**Status:** Approved — Ready for Implementation

## Goal

Transform the existing personal portfolio website into a client-facing landing page that positions Dang Huy Phuong as an AI Developer for hire. The primary objective is to convert visitors into freelance leads by clearly communicating services, showcasing relevant work, and providing clear calls-to-action.

## Current State

The existing site is a standard developer portfolio with:
- Homepage containing: Animation, Profile Picture, Experience timeline, Project timeline, Education timeline
- Header with scroll navigation and resume download
- Posts section for blog/technical writing
- Footer with social links
- Light theme with white backgrounds

## Target State

### Site Structure

| Route | Content |
|-------|---------|
| `/` | Homepage — Hero, Services, Selected Work, Tech Stack, CTA |
| `/experience` | Full work history timeline (moved from homepage) |
| `/posts` | Blog/technical writing (unchanged) |
| `/posts/:postName` | Post detail (unchanged) |

### Homepage Sections (in order)

1. **Header** — Sticky. Logo: "Dang Huy Phuong | AI Developer". Nav: Services, Work, Experience (link to /experience), Posts, Contact. CTA: "Hire Me" button.
2. **Hero** — Large headline "AI Developer for Hire", subtitle "Custom Models · AI Integration · Intelligent Automation", two CTAs: "Book a Free Consultation" (primary) and "View My Work" (secondary).
3. **Services** — Three cards:
   - Custom AI Models: Train and deploy models tailored to business needs (NLP, computer vision)
   - AI Integration: Embed AI into existing apps, APIs, and workflows
   - Intelligent Automation: Build self-improving systems that cut costs and save time
4. **Selected Work** — 3 featured case studies from experience (Hypotenuse, Nanolumi, Privyr/Traveloka) highlighting AI-relevant work with business outcomes
5. **Tech Stack** — Pills/tags showing: Python, FastAPI, PyTorch, React, AWS, Docker
6. **CTA Section** — "Ready to Build Something Intelligent?", subtitle, "Schedule a Call" button
7. **Footer** — Updated date, social links

### Experience Page (`/experience`)

- Full vertical timeline with all work history (same `TimeLine` component)
- Includes current Hypotenuse, Nanolumi, Privyr, Traveloka, Continental, URECA, Serversam, Hexagon entries
- Clean, dedicated page with breathing room

### Navigation Changes

- Header nav items scroll to homepage sections OR link to routes
- "Hire Me" button scrolls to bottom CTA on homepage
- "Experience" nav item links to `/experience`
- "Posts" nav item links to `/posts`
- Mobile hamburger menu behavior unchanged

### What Changes

**Homepage:**
- Keep: Animation (update titles to AI-focused), ProfilePicture, Services, Selected Work, Tech Stack, CTA, Footer
- Remove: Full Experience timeline, Project section, Education section
- Add: Services section, Selected Work section, Tech Stack section, CTA section
- Modify: Header (add Hire Me CTA, update nav), Hero copy

**Experience Page:**
- New route `/experience`
- Reuses existing `TimeLine` component with full `experience` data
- Simple page with Header + Timeline + Footer

**Animation Component:**
- Update `StringsToRender` to: "AI DEVELOPER", "CUSTOM MODELS", "INTEGRATION EXPERT", "INTELLIGENT AUTOMATION"

### Color Palette (Light Theme)

| Role | Color | Hex |
|------|-------|-----|
| Background | White | `#FFFFFF` |
| Section Alternate | Light Gray | `#F8F9FA` |
| Primary Text | Dark Navy | `#1A1A2E` |
| Secondary Text | Medium Gray | `#555555` |
| Accent / CTA | Teal/Green | `#00B894` |
| Borders | Light Gray | `#E5E5E5` |

### Typography

- Headlines: Bold, large (existing `font-weight: 700` pattern)
- Body: System font stack (existing)
- Accent color for CTAs and highlights only

## Content

### Hero Headline
"AI Developer for Hire"

### Hero Subtitle
"Custom Models · AI Integration · Intelligent Automation"

### Primary CTA
"Book a Free Consultation"

### Secondary CTA
"View My Work"

### Services

**Custom AI Models**
Train and deploy models tailored to your business needs. From NLP to computer vision.

**AI Integration**
Embed AI into your existing apps, APIs, and workflows. Seamless, scalable, secure.

**Intelligent Automation**
Build self-improving systems that cut costs, save time, and boost efficiency.

### Selected Work (3 featured)

1. **Hypotenuse** — AI-powered ecommerce platform. Enhanced system reliability to 99.99% SLA. Architected AI feedback loops for proactive learning. Streamlined end-to-end user journeys.
2. **Nanolumi** — Job management system with Django/React. Drove 90% bug reduction through comprehensive testing. Reduced 30% cloud costs via new data analytics architecture.
3. **Privyr** — CRM system with AI-driven analytics. 300% improvement in lead-to-sale conversion. Scalable Django/Vue.js stack serving thousands of organizations.

### Tech Stack Tags
Python, FastAPI, PyTorch, React, AWS, Docker

### Bottom CTA
"Ready to Build Something Intelligent?"
"Book a free 30-minute consultation. No commitment."
"Schedule a Call"

## Implementation Notes

- Reuse existing `TimeLine`, `ProfilePicture`, `Animation`, `Header`, `Footer` components
- Create new: `Services`, `SelectedWork`, `TechStack`, `CTASection` components
- Create new page: `ExperiencePage`
- Update `App.js` routes
- Update header navigation logic (scroll vs link)
- Keep Tailwind CSS for styling
- Keep responsive design patterns

## Out of Scope

- Backend changes (contact form handling, booking system)
- New blog posts
- Dark mode toggle
- Animation beyond existing fade-in
- Multi-language support
