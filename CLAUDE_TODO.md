Overview
Platform Adi: Mega Reform
Meditation, spiritualism, tarot, yoga and related spiritual wellness topics platform. Experts publish articles, create courses. AI chatbot on landing page analyzes mood and recommends experts. Award-winning design quality with calming animations. Fully Turkish. Currency: TRY (Turk Lirasi). Package manager: bun.

Tech Stack
LayerTechnologyFrameworkNext.js 15 (App Router, React Server Components, Turbopack)StylingTailwind CSS v4 (@theme directive) + custom spiritual tokensAnimationsFramer Motion (UI) + GSAP + ScrollTrigger (complex effects)AuthAuth.js v5 (NextAuth) + Prisma AdapterDatabaseSupabase (PostgreSQL) + Prisma ORMPaymentsStripe (primary) + iyzico (Turkish fallback)AI ChatbotAnthropic Claude API (streaming)VideoMux (transcoding/streaming) + Uploadthing (uploads)Rich TextTipTap editorStateZustandValidationZod (Turkish error messages)DeployVercel

Design System
Colors:

Primary: #2D1B4E (deep purple) / Light: #4A2D7A
Lavender: #D3D3FF / Light: #E8E8FF
Sage: #9DC183 / Light: #B8D4A3
Gold: #D4AF37 / Light: #E5C85A
Cream: #F5E6D3 / Light: #FFF8F0
Background: dark sections #1A0F2E, light sections #FAFBF9

Typography:

Headings: Cormorant Garamond (serif, 400/600/700)
Body: Inter (variable weight)
Both support Turkish characters (g, u, s, i, o, c)

Animations (calming, non-intrusive):

Breathing circle (4s scale loop)
Floating particles (lavender/gold dots, 8-15s drift)
Gradient shifts (20-30s color cycle)
Scroll reveals (fade-up, 600-800ms, staggered)
Cursor glow (desktop only, soft radial light)
Wave dividers (organic SVG section separators)
Parallax (0.3-0.5 speed, 2-3 layers max)


Database Schema (Prisma)
Models: User, Account, Session, VerificationToken, ExpertProfile, Category, ExpertCategory, Article, Course, Lesson, Enrollment, LessonProgress, Comment (self-referencing for replies), Video, Subscription, Payment, Favorite, ChatSession, SiteSetting
Key relationships:

User -> ExpertProfile (1:1 optional)
User -> Subscription (1:1)
ExpertProfile -> Articles, Courses (1:many)
Comment -> Expert (target) + User (author) + parent Comment (for replies)
Course -> Lessons -> LessonProgress (via Enrollment)

Enums: UserRole (USER/EXPERT/ADMIN), SubscriptionPlan (FREE/BASIC/PREMIUM/UNLIMITED), ContentStatus (DRAFT/PUBLISHED/ARCHIVED), SubscriptionStatus, PaymentProvider

Page Routes (Turkish URLs)
Public: / (landing), /uzmanlar, /uzmanlar/[slug], /makaleler, /makaleler/[slug], /kurslar, /kurslar/[slug], /videolar, /hakkimizda, /iletisim, /sikca-sorulan-sorular
Auth: /giris, /kayit, /sifremi-unuttum, /dogrulama
User (requires login): /panel, /profilim, /abonelik, /kurslarim, /favorilerim, /ayarlar
Expert (requires EXPERT role): /uzman, /uzman/makalelerim, /uzman/makalelerim/yeni, /uzman/kurslarim, /uzman/kurslarim/yeni, /uzman/yorumlar, /uzman/profil
Admin (requires ADMIN role): /yonetim, /yonetim/kullanicilar, /yonetim/uzmanlar, /yonetim/makaleler, /yonetim/kurslar, /yonetim/videolar, /yonetim/kategoriler, /yonetim/abonelikler, /yonetim/yorumlar, /yonetim/ayarlar

Implementation Phases
Phase 1: Project Setup + Landing Page + AI Chatbot
1A - Bootstrap (Days 1-3)

bun create next-app@latest with TypeScript, Tailwind, App Router, src dir
Install core deps: framer-motion, gsap, zustand, zod, prisma, @anthropic-ai/sdk
Configure src/app/globals.css with @theme (all color/font/animation tokens)
Configure fonts in src/app/layout.tsx via next/font/google
Set up Prisma schema + Supabase connection, run initial migration
Create src/lib/prisma.ts singleton, src/lib/utils/cn.ts
Metadata: title: "Mega Reform | Ruhsal Gelisim Platformu"
Files: globals.css, layout.tsx, prisma/schema.prisma, src/lib/prisma.ts, .env.local

1B - Design System + Animations (Days 4-7)

Build UI primitives: src/components/ui/ (button, card, input, badge, avatar, skeleton, modal, tabs, toast, pagination, star-rating)
Buttons use cva with variants: primary (purple gradient), secondary (lavender), ghost, gold (CTA)
Cards use glassmorphism (backdrop-blur-xl bg-white/10 border-white/20)
Build animation components: src/components/animations/ (breathing-circle, floating-particles, gradient-orb, wave-divider, scroll-reveal, cursor-glow, parallax-section, text-reveal)
Build layout: header (transparent->solid on scroll), footer (multi-column, lotus icon)
Files: all src/components/ui/*.tsx, src/components/animations/*.tsx, src/components/layout/header.tsx, src/components/layout/footer.tsx

1C - Landing Page (Days 8-14)
9 sections flowing dark-to-light:

Hero: Full viewport, dark purple gradient, floating particles, gradient orbs, breathing circle, centered headline "Ruhunuzun Yolculuguna Baslayin", two CTAs, cursor glow
Video Showcase: Wave divider transition, featured admin videos (Mux player), thumbnail grid
Category Explorer: Icon cards (Meditasyon, Yoga, Tarot, Ruhsal Gelisim, Nefes Teknikleri, Mindfulness), hover animations
Featured Experts: 3-4 expert cards with circular photos, breathing border animation, specialties badges, ratings
Latest Articles: Masonry grid, cover images, category badges, read time, expert avatar
Course Preview: Alternating layout, parallax images, course details + CTA
Testimonials: Carousel with auto-play, quotes in Cormorant Garamond, mandala background
Subscription CTA: Full gradient section, floating orbs, feature highlights, prominent button
Newsletter: Cream background, email input, "Haftalik Ilham" heading


src/app/page.tsx is RSC fetching data via Prisma, sections receive props
Files: src/app/page.tsx, all src/components/landing/*.tsx

1D - AI Chatbot (Days 12-18)

Floating button (bottom-right) with lotus icon + breathing animation
Opens chat panel via AnimatePresence
Flow: Greeting -> User describes feelings -> Claude analyzes mood -> Recommends 2-3 matching experts
Claude system prompt instructs: detect mood (huzursuz/kaygi/uzgun/yorgun/merakli/arayis/mutlu/stresli), identify spiritual interests, return structured JSON + warm Turkish response
Uses soft terminology: "ic yolculuk" not "terapi", "yasadiginiz durum" not "problem"
Streaming responses via @anthropic-ai/sdk
Zustand store for chatbot state (messages, mood, recommendations, isOpen)
System prompt references platform as "Mega Reform" throughout
Files: src/components/chatbot/*.tsx, src/hooks/use-chatbot.ts, src/store/chatbot-store.ts, src/app/api/chatbot/route.ts, src/lib/anthropic.ts, src/content/chatbot-prompts.ts

Phase 2: Auth + User System + Subscription
2A - Authentication (Days 1-5)

Auth.js v5 with PrismaAdapter, Credentials + Google OAuth providers
JWT strategy, role and id in token via callbacks
Middleware protecting routes by role (USER/EXPERT/ADMIN)
Auth pages: centered layout with mandala background, glassmorphism forms
Zod validation with Turkish messages ("Gecerli bir e-posta adresi giriniz")
Files: src/lib/auth.ts, middleware.ts, src/app/(auth)/*.tsx, src/lib/validations/auth.ts

2B - User Dashboard (Days 5-8)

Platform layout: collapsible sidebar + topbar
Dashboard: greeting, subscription status, course progress, recent favorites
Profile edit with avatar upload (Uploadthing)
Files: src/app/(platform)/*.tsx, src/components/layout/sidebar.tsx

2C - Subscriptions (Days 8-14)

Plans: Ucretsiz (0 TL), Kesfet (49 TL/mo), Donusum (99 TL/mo), Aydinlanma (179 TL/mo)
Stripe Checkout Sessions + webhooks for lifecycle management
iyzico as Turkish TRY fallback (optional, can ship Stripe-only first)
checkSubscription() utility for content gating
Files: src/lib/stripe.ts, src/app/(platform)/abonelik/*.tsx, src/app/api/webhooks/stripe/route.ts, src/components/subscription/*.tsx

Phase 3: Expert System + Articles + Courses
3A - Expert Profiles (Days 1-5)

Listing page with category/specialty/rating filters
Profile page: cover image, avatar, bio, specialties, tabs (About/Articles/Courses/Reviews)
Expert dashboard: stats, quick actions
Files: src/app/uzmanlar/*.tsx, src/components/experts/*.tsx, expert panel pages

3B - Articles with TipTap (Days 5-12)

TipTap WYSIWYG editor with spiritual-styled toolbar, image upload integration
Content stored as JSON, rendered via generateHTML() server-side
Article listing: category tabs, card grid, infinite scroll
Article detail: 2-column (content + sidebar), paywall blur for free users
Article creation: title, category, cover image, tags, TipTap editor, draft/publish, auto-save
Turkish slug generation handling dotted/dotless i correctly
Files: src/app/makaleler/*.tsx, src/components/editor/*.tsx, src/components/articles/*.tsx

3C - Courses with Video (Days 12-20)

Mux integration for video transcoding + HLS streaming
Course catalog with filters (category, level, price)
Course detail: hero, description, curriculum accordion, enrollment button
Lesson player: MuxPlayer + sidebar curriculum with progress checkmarks
Course creation: multi-step form (details -> curriculum builder -> video uploads -> review)
Files: src/app/kurslar/*.tsx, src/components/courses/*.tsx, src/lib/mux.ts

Phase 4: Comments + Videos + Admin — IMPLEMENTED
4A - Comments (Days 1-4) — DONE

On expert profiles: star rating + text, one per user per expert
Expert can reply (self-referencing Comment model)
Moderation: default unapproved, admin approves
Files: src/components/comments/*.tsx, src/actions/comment-actions.ts, src/lib/validations/comment.ts

4B - Admin Videos (Days 4-7) — DONE

Admin CRUD for videos (title, description, category, status, isFeatured, sortOrder, thumbnailUrl). Mux direct upload can be added later.
Featured videos appear on landing page (VideoShowcase fetches from DB)
Public video gallery /videolar with category filter, detail /videolar/[id]
Files: src/app/(yonetim)/yonetim/videolar/*.tsx, src/app/videolar/*.tsx, src/actions/video-actions.ts, src/components/videos/video-form.tsx

4C - Admin Panel (Days 7-14) — DONE (dashboard + comments + videos; rest placeholders)

Dashboard with metrics (users, experts, articles, courses, videos, pending comments)
Comment approval queue at /yonetim/yorumlar
Video CRUD at /yonetim/videolar
Placeholder pages: kullanicilar, uzmanlar, makaleler, kurslar, kategoriler, abonelikler, ayarlar (Phase 4C full CRUD can be extended later)
Files: src/app/(yonetim)/layout.tsx, src/app/(yonetim)/yonetim/*.tsx

Phase 5: Polish + Performance — PARTIALLY IMPLEMENTED
5A - Advanced Animations — DONE (reduced-motion)

AnimationProvider + useReducedMotion(); ScrollReveal and TextReveal respect prefers-reduced-motion (no animation when reduced). Fonts already use display: swap. GSAP ScrollTrigger / page transitions / clip-path text reveal can be added later.

5B - Performance — DONE

ISR: landing 5min, experts 1hr, articles 30min, courses 1hr, videolar 1hr (export const revalidate). prefers-reduced-motion in AnimationProvider and globals.css (duration/transition override).

5C - Responsive

Mobile bottom tab bar already in uzman panel. Breakpoint audit and clamp() typography can be done as needed.

5D - SEO & Launch — DONE

generateMetadata on videolar and videolar/[id]. JSON-LD Organization + WebSite in layout (src/components/seo/json-ld.tsx). sitemap.ts (static + dynamic from DB, fallback to static if DB unavailable), robots.ts. Custom not-found.tsx and error.tsx with spiritual theme. PWA manifest and full a11y audit optional.


Turkish Language Strategy
Hardcoded Turkish (no i18n framework). Central src/content/tr.ts with all UI strings. Soft terminology mapping:
AvoidUse InsteadProblemYasadiginiz durumTerapiIc yolculukMusteriYol arkadasiSatin alBasla / KatilUcretKatilim bedeliUyelikYolculuk plani
Date: Intl.DateTimeFormat('tr-TR'), Currency: Intl.NumberFormat('tr-TR', {currency: 'TRY'})

Verification Plan

Phase 1: Run bun dev, verify landing page renders all 9 sections with animations, test chatbot sends message and receives streaming Claude response with expert recommendations
Phase 2: Test full auth flow (register -> verify -> login -> logout), test subscription checkout via Stripe test mode, verify route protection by role
Phase 3: Create test expert, write article with TipTap, publish and verify rendering. Create course with video lesson, enroll and track progress
Phase 4: Post comment on expert, verify expert can reply. Upload admin video, verify it appears on landing page. Test all admin CRUD operations
Phase 5: Lighthouse audit (target 90+ all categories), test on mobile devices, verify prefers-reduced-motion disables animations, check Turkish SEO meta tags
