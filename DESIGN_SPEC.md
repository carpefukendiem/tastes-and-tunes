# Tastes & Tunes Santa Barbara — Design Spec & Cursor Build Bible

**Repo:** https://github.com/carpefukendiem/tastes-and-tunes
**Goal:** Pixel-accurate, mobile-first, responsive Next.js site matching the festival mockup.
**Status:** Living document — this is the single source of truth. Keep it in the repo root.

---

## 0. How to use this document

This doc has two halves:

- **Sections 1–9** = the *spec* (design system + exact content + per-section layout). Cursor reads this for context.
- **Section 11** = the *phased prompt sequence*. You paste **one phase at a time** into Cursor. Do **not** paste the whole thing at once — scoped prompts produce dramatically better output.

### The iteration loop (Claude ⇄ Cursor)
1. Paste a Phase prompt into Cursor → let it build.
2. Run `npm run dev`, look at the result.
3. Paste back to Claude: **(a)** a screenshot of the rendered section, **(b)** any terminal/console errors, **(c)** the component file if it's visibly wrong.
4. Claude returns pixel-level corrections + the next phase prompt.
5. Repeat until the section matches, then move on.

---

> ## ⚠️ READ FIRST — v2 ASSET UPDATE
> The real provided assets have been inspected. **Section 2A and "PHASE A" + "REVISED PHASE NOTES" at the end of this document are AUTHORITATIVE and supersede any conflicting earlier text** — specifically: ignore the lucide-icon recreation, the hand-built artist cards, and the 18-tile restaurant grid. Use the provided composed image tiles instead. Run **PHASE A before PHASE 0**.

## 1. Tech stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4** (CSS-first config via `@theme`) — or v3 if Cursor prefers; spec works with either
- **Framer Motion** — scroll reveals, hover, optional hero parallax
- **next/font** (Google Fonts) — see §3
- **next/image** — all raster assets
- **lucide-react** — for the 6 experience icons (recreated, not sliced)
- ESLint + Prettier
- Deploy target: **Vercel**

Single landing page (`app/page.tsx`) composed of section components. Nav links are in-page anchors (`#about`, `#experience`, etc.).

---

## 2. Asset manifest & folder structure

```
/public
  /assets
    /brand
      logo-badge.png            # oval "1st Annual" badge (transparent)
      wordmark.png              # optional: "TASTES & TUNES" treatment if not recreating with font
    /hero
      hero-scene.png            # full sunset/stage/surfer illustration (transparent or full-bleed)
      hero-scene@2x.png         # optional retina
    /illustrations
      van-scene.png             # VW van + palms + sunset + guitarist
      book-heart.png            # impact section book-with-heart graphic
    /artists
      billy-idol.jpg
      berlin.jpg
      sugar-ray.jpg
    /restaurants                # 18 logos, transparent PNG, trimmed tight
      tre-lune.png  luckys.png  sama-sama.png  bettina.png  the-lark.png
      el-rincon-bohemio.png  lure.png  bluewater.png  santo-mezcal.png
      intermezzo.png  pascucci.png  secret-bao.png  bibi-ji.png
      black-sheep.png  sb-fish-market.png  ca-dario.png  jills-place.png  surfhouse.png
    /partners
      literacy-foundation.png   # logo (white version for dark bg)
    /textures
      paper-grain.png           # subtle tiling grain overlay (or generate via SVG)
```

**Recreate in code (do NOT slice):** the 6 experience icons (lucide + colored circles), all wave/torn-paper section dividers (inline SVG), squiggle underlines (SVG), grain overlay (CSS/SVG noise).

**Naming rules:** lowercase, kebab-case, no spaces. Restaurant logos trimmed to content edges with ~8px transparent padding.

> If real restaurant logos aren't available yet, Cursor should render text placeholders styled as logo cards so layout is correct; swap in real art later.

---

## 3. Design system

### 3.1 Color tokens
```css
@theme {
  /* Surfaces */
  --color-cream:        #F5ECD6;  /* primary light section bg */
  --color-cream-dark:   #EADFC2;  /* alt cream / card bg on cream */
  --color-navy:         #07313C;  /* dark section bg */
  --color-navy-deep:    #052831;  /* darkest / footer */

  /* Brand */
  --color-teal:         #1A9BA6;
  --color-teal-dark:    #0E6E78;
  --color-teal-light:   #7FCBD4;
  --color-coral:        #E94E35;
  --color-coral-light:  #F26A4F;
  --color-magenta:      #A6248F;
  --color-purple:       #6E2C8B;
  --color-gold:         #F2A638;

  /* Text */
  --color-ink:          #15292E;  /* dark text on cream */
  --color-paper:        #FBF5E6;  /* light text on dark */
}
```

### 3.2 Signature gradients
```css
/* Hero sky (top → horizon) */
--grad-sunset: linear-gradient(180deg, #B83A24 0%, #E14B2A 35%, #F3922A 70%, #F7C24A 100%);
/* Sponsor cards */
--grad-presenting: linear-gradient(150deg, #A6248F 0%, #6E2C8B 100%);
--grad-premiere:   linear-gradient(150deg, #F26A4F 0%, #E0432A 100%);
--grad-supporting: linear-gradient(150deg, #1FA6B0 0%, #0E6E78 100%);
```

### 3.3 Typography
Load via `next/font/google`. Starting recommendation — swap for true brand fonts if you have them.

| Token | Font | Use |
|---|---|---|
| `--font-poster` | **Bevan** | Huge vintage display ("A TWO-DAY", section poster headers). Hero wordmark uses the sliced logo image if available. |
| `--font-heading` | **Oswald** (600/700) | Condensed uppercase labels ("EXPERIENCE IT ALL", card titles) |
| `--font-script` | **Kaushan Script** | Script accents ("by the Sea", "Oceanfront Flavors…") |
| `--font-body` | **Libre Franklin** | Body copy, nav, buttons, captions |

**Responsive type scale** (use `clamp`):
```css
--fs-hero:    clamp(3.5rem, 11vw, 8rem);    /* TASTES / TUNES */
--fs-display: clamp(2rem, 5vw, 3.75rem);    /* section poster headers */
--fs-h2:      clamp(1.5rem, 3vw, 2.5rem);
--fs-script:  clamp(1.5rem, 3.5vw, 2.75rem);
--fs-lead:    clamp(1rem, 1.4vw, 1.25rem);
--fs-body:    1rem;
--fs-small:   0.8125rem;
```

### 3.4 Radii, shadows, spacing
```css
--radius-card: 20px;
--radius-pill: 999px;
--shadow-card: 0 10px 30px rgba(0,0,0,.18);
--shadow-cta:  0 8px 20px rgba(0,0,0,.25);
--section-py:  clamp(3rem, 7vw, 6rem);  /* vertical section padding */
--maxw:        1200px;                  /* content container */
```

### 3.5 Signature visual treatments (build as code)
- **Torn-paper / wave dividers** between sections: full-bleed inline SVG strips (~60–120px tall) colored to match the *next* section, layered at section boundaries. Cream↔teal and cream↔navy transitions use torn-paper edges; the hero uses a breaking-wave bottom edge.
- **Grain overlay:** a `::after` pseudo-element on cream sections with a tiling noise PNG at ~6% opacity, or an SVG `feTurbulence` filter.
- **Squiggle underlines:** small hand-drawn SVG wave under headers like "EXPERIENCE IT ALL" and "ARTISTS UNDER CONSIDERATION".
- **Pill buttons:** fully rounded, uppercase Oswald, letter-spacing 0.04em, hover `translateY(-2px)` + `--shadow-cta`.

---

## 4. Global components

- `Container` — max-width `--maxw`, responsive horizontal padding.
- `Section` — wraps content, handles bg color + `--section-py` + optional grain + top/bottom divider slots.
- `Divider` — renders the SVG wave/torn edge; props: `variant` (`wave` | `torn`), `topColor`, `bottomColor`.
- `Button` — variants: `waitlist` (magenta→purple), `sponsor` (coral), `explore` (teal), `gold`. Pill shape.
- `Header` — sticky, transparent over hero then solid navy on scroll; desktop nav + hamburger drawer on mobile.
- `Footer` — navy CTA band + waitlist form + socials + location + copyright.
- `SectionHeader` — poster/heading text with optional script accent + squiggle underline.

---

## 5–9. Section-by-section spec

> **Exact copy is authoritative — do not paraphrase.** All "Cabrillo Blvd" standardized.

### Section: Header / Nav
- Sticky top. Over hero: transparent bg. After ~80px scroll: `--color-navy` bg + subtle shadow.
- Left: `logo-badge.png` (clickable → top).
- Center/right nav (desktop): `HOME · ABOUT · EXPERIENCE · LINEUP · VENDORS · SPONSOR · IMPACT · FAQ`, Libre Franklin, uppercase, letter-spacing, paper color; active link has teal underline.
- Right: **JOIN THE WAITLIST →** button (`waitlist` variant).
- Mobile (<1024px): logo + hamburger → slide-in drawer (navy) with nav links stacked + waitlist button.

### Section 1 — HERO  (`#home`)
- Background: `--grad-sunset`; `hero-scene.png` composited (band/stage/surfer/crowd/palms/sailboat). Breaking-wave bottom edge into the cream intro section.
- Left column copy:
  - Eyebrow: **1ST ANNUAL** (gold, Oswald, letter-spaced)
  - Wordmark: **TASTES** / **& TUNES** / **SANTA BARBARA** (use sliced `wordmark.png` if available; else Bevan with the `&` and "Santa Barbara" in script/gold)
  - Script (upper-right of scene): *Oceanfront Flavors. Unforgettable Sounds.* (`--font-script`, cream)
  - Detail line: **• FALL 2026 •** / **CHASE PALM PARK** / `ON CABRILLO BLVD, SANTA BARBARA`
  - CTA row (pills): **JOIN THE WAITLIST** (waitlist) · **BECOME A SPONSOR** (sponsor) · **EXPLORE THE EXPERIENCE** (explore)
- Optional flourish: subtle parallax on scene layers; gentle CSS wave motion.
- Mobile: scene becomes top banner image, copy stacks below, CTAs full-width stacked.

### Section 2 — CULINARY & MUSIC BY THE SEA  (`#about`)
- Background: `--color-cream` + grain.
- Left: `van-scene.png` illustration.
- Right: header **A** *TWO-DAY* (coral) **CULINARY & MUSIC** (ink) *by the Sea* (script), then body:
  > Tastes & Tunes Santa Barbara brings together the best of our coastal community—extraordinary food, world-class wines, craft cocktails & beer, iconic live music, and one-of-a-kind local makers in a stunning oceanfront setting.
- Mobile: van image stacks above text.

### Section 3 — EXPERIENCE IT ALL  (`#experience`)
- Background: `--color-teal` with torn-paper top/bottom edges. Squiggle accents around header.
- Header: **EXPERIENCE IT ALL** (cream, poster), squiggle underline.
- 6 items, each = colored circle + lucide icon + number/label. Desktop: 6 across; tablet: 3×2; mobile: 2×3 (or 1 col).
  1. Circle **magenta**, icon `ChefHat` — **30+** / FINE DINING ESTABLISHMENTS
  2. Circle **gold**, icon `Wine` — **12+** / WINERIES
  3. Circle **teal-light**, icon `Martini` — COCKTAILS & CRAFT BEER
  4. Circle **purple**, icon `Guitar` — LIVE MUSICAL ENTERTAINMENT
  5. Circle **coral**, icon `ShoppingBag` — LOCAL MAKERS & MERCHANDISE
  6. Circle **gold**, icon `BookOpen` — PHILANTHROPIC COMPONENT BENEFITING THE LITERACY FOUNDATION
- Labels: Oswald uppercase, cream.

### Section 4 — ARTISTS UNDER CONSIDERATION  (`#lineup`)
- Background: `--color-navy`.
- Header (left): **ARTISTS** (cream) **UNDER CONSIDERATION** (teal) with purple squiggle underline. Sub: *Final lineup to be announced!*
- 3 artist cards (rounded, thick colored border + photo + name banner):
  - **BILLY IDOL** — magenta border
  - **BERLIN** / WITH TERRI NUNN — teal border
  - **SUGAR RAY** / WITH MARK McGRATH — gold border
- Desktop: 3 across (slightly offset/tilted like mockup optional). Mobile: stacked or horizontal snap-scroll.

### Section 5 — SAVOR THE SB FOOD SCENE  (`#vendors`)
- Background: `--color-cream` + grain, torn edges.
- Left column: **SAVOR THE** (coral) / **SANTA BARBARA FOOD SCENE** (ink, poster) + body:
  > Featuring top restaurants, chefs, wineries, breweries & makers. More to be announced!
- Right: grid of 18 restaurant logo "cards" (white rounded tiles, soft shadow). Desktop 6 cols × 3 rows; tablet 3–4 cols; mobile 2 cols.
- Below grid (script, centered): *And many more local favorites!*

### Section 6 — PARTNER WITH PURPOSE  (`#sponsor`)
- Background: `--color-navy-deep`.
- Left: **PARTNER WITH** (coral, smaller) **PURPOSE** (cream, large poster) + body:
  > Align your brand with Santa Barbara's premier culinary & music experience:
- 3 sponsor cards (rounded, gradient bg, white text, bulleted benefits):
  - **PRESENTING SPONSOR** · **$50,000** · `--grad-presenting`
    - Top billing on all event materials · Premier logo placement · Stage recognition · VIP experiences & hospitality · 10 complimentary VIP tickets/day
  - **PREMIERE SPONSOR** · **$15,000** · `--grad-premiere`
    - Prominent logo placement · Onsite signage · Social media & website recognition · 6 complimentary VIP tickets/day
  - **SUPPORTING SPONSOR** · **$10,000** · `--grad-supporting`
    - Logo placement on select materials · Onsite signage · Website recognition · 4 complimentary VIP tickets/day
- Gold circular stamp badge: **CUSTOM PACKAGES AVAILABLE** (rough-circle outline, gold).
- Mobile: cards stack full-width.

### Section 7 — MAKING WAVES / IMPACT  (`#impact`)
- Background: teal→cream transition with wave divider.
- Left: **MAKING WAVES.** / **MAKING A DIFFERENCE.** (poster).
- Center: `book-heart.png` illustration.
- Right: **A PORTION OF FESTIVAL PROCEEDS BENEFITS THE LITERACY FOUNDATION.** (Oswald) + body:
  > Supporting literacy programs that empower children and adults through education, opportunity, and community.
- `literacy-foundation.png` logo block (navy panel).

### Section 8 — FOOTER / WAITLIST CTA  (`#faq` anchor lives here too)
- Background: `--color-navy-deep`, wave top edge.
- Left: **BE PART OF SOMETHING UNFORGETTABLE** (poster, cream).
- Center: **JOIN THE WAITLIST FOR EARLY ACCESS TO TICKETS, VIP EXPERIENCES & UPDATES!** + email input (placeholder `Email Address`) + **JOIN NOW →** button. (Wire to a no-op/console handler for now; note where to connect a real provider.)
- Right top: **FOLLOW THE VIBES** + social icons: Instagram, Facebook, X, YouTube (lucide / brand SVGs).
- Right: location pin — **CHASE PALM PARK** / ON CABRILLO BLVD / SANTA BARBARA, CA.
- Bottom bar: `© 2026 Tastes & Tunes Santa Barbara  |  All Rights Reserved  |  info@tastesandtunessb.com`

---

## 10. Animation, responsive & quality

### Animation (Framer Motion)
- Sections fade + slide-up on `whileInView` (once, `margin: -80px`), stagger children (icons, cards).
- Buttons/cards: hover lift + shadow; cards on cream get slight scale.
- Hero: optional layered parallax + slow wave drift. Respect `prefers-reduced-motion`.

### Breakpoints
- `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280. Mobile-first; design *up* from 375px.
- Nav → hamburger below `lg`. Icon row 6→3→2. Sponsor/artist cards stack below `md`. Restaurant grid 6→4→2.

### Accessibility & performance
- Semantic landmarks, alt text on every image, focus-visible rings, AA contrast (watch cream text on teal).
- `next/image` with sizes; lazy-load below-fold; preload hero. Target Lighthouse ≥90 across the board.

---

## 11. PHASED CURSOR PROMPTS (paste one at a time)

> After each phase, send Claude: screenshot + errors + the file if off. Then request the next phase.

### PHASE 0 — Scaffold
```
Initialize a Next.js 15 project (App Router, TypeScript, ESLint) into this existing repo without overwriting README.md or .git. Install and configure: Tailwind CSS, framer-motion, lucide-react, prettier. Set up next/font/google for Bevan, Oswald, Kaushan Script, and Libre Franklin exposed as CSS variables --font-poster, --font-heading, --font-script, --font-body. Create the folder structure: app/, components/, components/sections/, lib/, public/assets/{brand,hero,illustrations,artists,restaurants,partners,textures}. Add a placeholder app/page.tsx and confirm `npm run dev` boots with no errors. Do not build any sections yet.
```

### PHASE 1 — Design tokens + global primitives
```
Read DESIGN_SPEC.md sections 3 and 4. Implement the full color/gradient/radius/shadow/type-scale token system in the Tailwind theme + globals.css exactly as specified. Build these reusable components with TypeScript props: Container, Section (bg + padding + optional grain + divider slots), Divider (variant wave|torn, topColor, bottomColor — inline SVG), Button (variants waitlist|sponsor|explore|gold, pill, hover lift), SectionHeader (poster + optional script accent + SVG squiggle underline). Add a paper-grain overlay utility. Create a temporary demo page rendering one of each so I can review. No real content yet.
```

### PHASE 2 — Header / Nav
```
Read DESIGN_SPEC.md §4 + the Header spec. Build a sticky Header: transparent over hero, solid --color-navy after 80px scroll. Desktop nav links (HOME ABOUT EXPERIENCE LINEUP VENDORS SPONSOR IMPACT FAQ) as in-page anchors with teal active underline, logo-badge.png on the left (use a placeholder box if image missing), JOIN THE WAITLIST button on the right. Below lg: hamburger opening a navy slide-in drawer with stacked links + button. Fully keyboard accessible.
```

### PHASE 3 — Hero
```
Read the HERO spec (Section 1). Build the hero with --grad-sunset background and hero-scene.png composited (placeholder full-bleed block if missing). Implement the wordmark, eyebrow, script line, FALL 2026 / CHASE PALM PARK / CABRILLO BLVD detail, and the three pill CTAs (waitlist, sponsor, explore). Add a breaking-wave SVG bottom edge into cream. Framer Motion entrance. Mobile: scene as top banner, copy + stacked full-width CTAs below.
```

### PHASE 4 — Culinary & Music by the Sea
```
Read Section 2. Build the cream intro section with grain, van-scene.png on the left (placeholder if missing) and the right-column header ("A TWO-DAY" coral / "CULINARY & MUSIC" ink / "by the Sea" script) + the exact body paragraph. Stack image-above-text on mobile. Torn-paper top edge.
```

### PHASE 5 — Experience It All
```
Read Section 3. Build the teal section with torn-paper top/bottom edges and the EXPERIENCE IT ALL header + squiggle. Render the 6 items exactly (colored circle + lucide icon + number/label) per the spec list. Grid 6→3→2 responsive with staggered reveal.
```

### PHASE 6 — Artists Under Consideration
```
Read Section 4. Build the navy section: header (ARTISTS cream / UNDER CONSIDERATION teal + purple squiggle), "Final lineup to be announced!", and 3 bordered artist cards (Billy Idol magenta, Berlin/Terri Nunn teal, Sugar Ray/Mark McGrath gold) using the artist images (placeholders if missing) with name banners. 3-across desktop, stacked/snap-scroll mobile.
```

### PHASE 7 — Savor the Food Scene
```
Read Section 5. Build the cream section with torn edges: left header (SAVOR THE coral / SANTA BARBARA FOOD SCENE ink) + body, right = responsive grid of 18 white rounded logo tiles (6→4→2 cols) using /public/assets/restaurants images; render styled text placeholders for any missing logo. Centered script line "And many more local favorites!" below.
```

### PHASE 8 — Partner With Purpose
```
Read Section 6. Build the navy-deep sponsor section: left header + body, then 3 gradient sponsor cards (Presenting $50k, Premiere $15k, Supporting $10k) with exact bullet benefits, plus the gold "CUSTOM PACKAGES AVAILABLE" rough-circle stamp. Cards 3-across desktop, stacked mobile, hover lift.
```

### PHASE 9 — Impact + Footer
```
Read Sections 7 and 8. Build the Making Waves impact band (book-heart illustration, literacy foundation copy + logo, wave divider) and the footer CTA (BE PART OF SOMETHING UNFORGETTABLE, waitlist email form with console handler + a TODO comment for the email provider, FOLLOW THE VIBES socials, location block, copyright bar). Wave top edge into the footer.
```

### PHASE 10 — Polish pass
```
Full polish: verify every section against DESIGN_SPEC.md, add prefers-reduced-motion handling, fix contrast issues (cream-on-teal), set next/image sizes + lazy-loading + hero preload, add alt text + focus-visible + semantic landmarks, smooth-scroll anchor offsets for the sticky header, and run a Lighthouse pass targeting ≥90. Report any remaining gaps vs the spec.
```

---

## 12. Open items to confirm
- Hero vs footer street name: standardized to **Cabrillo Blvd** (real SB street). Confirm.
- Waitlist form backend (Mailchimp / ConvertKit / custom API)? Currently stubbed.
- Real restaurant logos vs sliced-from-mockup (sliced will look soft).
- Exact brand fonts — current Google Font picks are close approximations.

---

# ===== v2: REAL ASSETS (AUTHORITATIVE) =====

## 2A. Real asset map & integration rules

All source images live in `/images` (committed to the repo). They are **all flat RGB (no transparency)** with a background baked in, so each must sit on a section whose background matches. Several are fully composed tiles (text + art already rendered).

### Move/rename map  (source `/images/*` → `/public/assets/*`)

| Source file | → Destination | What it is | Baked bg | Used in |
|---|---|---|---|---|
| `hero-bg.png` | `hero/hero-bg.png` | Full sunset/stage/surfer scene, **no text** | full scene | Hero (full-bleed) |
| `vw-van-graphic.png` | `illustrations/vw-van.png` | VW van + palms + guitarist | cream | Intro |
| `wave-graphic.png` | `illustrations/wave.png` | Big breaking wave | cream | Decorative accent / divider |
| `palm-trees-graphic.png` | `illustrations/palm-trees.png` | Palm silhouettes | cream | Decorative accent |
| `book-with-heart.png` | `illustrations/book-with-heart.png` | Open book + heart + waves | cream | Impact |
| `chefs-hat-icon-graphic.png` | `icons/dining.png` | Vintage circular badge | cream | Experience #1 |
| `wine-icon-graphic.png` | `icons/wineries.png` | Badge | cream | Experience #2 |
| `mixed-drinks.png` | `icons/cocktails.png` | Badge | cream | Experience #3 |
| `guitar-on-the-beach.png` | `icons/music.png` | Badge | cream | Experience #4 |
| `bag-shopping.png` | `icons/makers.png` | Badge | cream | Experience #5 |
| `book-with-sun-icon.png` | `icons/philanthropy.png` | Badge | cream | Experience #6 |
| `billy-idol-guest.png` | `artists/billy-idol.png` | Composed card, **name baked in** | navy + cream brush frame | Artists |
| `berlin-with-terri-nunn.png` | `artists/berlin.png` | Composed card | navy + frame | Artists |
| `Sugar-Ray.png` | `artists/sugar-ray.png` | Composed card | navy + frame | Artists |
| `Artists-Under-Construction.png` | `headers/artists-header.png` | "ARTISTS UNDER CONSIDERATION" + squiggle + "Final lineup to be announced!" | navy panel w/ thin cream margin | Artists header |
| `savor-the-santa-barbara-food-scene.png` | `headers/savor-block.png` | Full "SAVOR THE…" heading + body + squiggle (portrait) | cream torn paper | Food scene left col |
| `and-many-more-local-favorites.png` | `headers/and-many-more.png` | Script line | near-white | Food scene footer line |
| `logobanner3.png` | `restaurants/row-1.png` | Top row: Tre Lune · Lucky's · Sama Sama Kitchen · Bettina · The Lark · El Rincon Bohemio | cream tiles | Food scene |
| `logobanner2.png` | `restaurants/row-2.png` | Mid row: Lure Fish House · Bluewater Grill · Santo Mezcal · Intermezzo · Pascucci · Secret Bao | cream tiles | Food scene |
| `logobanner1.png` | `restaurants/row-3.png` | Bottom row: BiBi Ji · The Black Sheep · Santa Barbara Fish Market · Ca'Dario · Jill's Place · Boathouse | cream tiles | Food scene |
| `website homepage  image.png` | **DELETE** | exact duplicate of Billy Idol | — | — |
| `website-mockup.png` | leave in `/images` | full reference mockup, do not ship | — | — |

### Background-matching rules (critical, because nothing is transparent)
- **Hero** → `hero-bg.png` is full-bleed background; typeset the wordmark/CTAs on top (no text asset exists).
- **Intro section bg = cream** → `vw-van.png` blends seamlessly.
- **Experience section bg = teal** → icon badges have a *cream* square bg, so render each inside a **circular mask**: container `border-radius:50%; overflow:hidden;` with the `next/image` set to `object-fit:cover`. If a faint cream ring shows at the circle edge, scale the image ~108–110% to push it out. The badge interiors (teal/coral/navy) read well on the teal band.
- **Artists section bg = navy** → the 3 artist tiles already have navy backgrounds and blend. The header tile (`artists-header.png`) has a thin cream outer margin: **crop it** with `object-fit:cover` + ~106% scale so only its navy panel shows.
- **Food scene bg = cream** → `savor-block.png`, the 3 `row-*.png` banners, and `and-many-more.png` all sit on cream and blend. Stack rows top→bottom in order row-1, row-2, row-3. On mobile the banners scale down as single strips (keep aspect ratio; they remain legible).
- **Impact section bg = cream** → `book-with-heart.png` blends. Typeset the "MAKING WAVES…" header (no asset).
- **Sponsors & Footer** → no assets; build entirely in code per Sections 6 & 8.
- `wave.png` / `palm-trees.png` are cream-bg decorative extras — use only on cream sections (e.g. a wave flourish near a divider), never on dark.

### Accessibility for baked-in-text images
Because headings/copy are rendered inside images (`savor-block`, `artists-header`, `and-many-more`, artist names), every one must have descriptive `alt`, **and** the section must include a visually-hidden real heading (`<h2 className="sr-only">`) with the same text for SEO and screen readers.

### Still-missing assets → typeset/build in code
Oval logo badge (header) · "TASTES & TUNES SANTA BARBARA" hero wordmark · "1ST ANNUAL" eyebrow + FALL 2026/CHASE PALM PARK detail · "EXPERIENCE IT ALL" header · entire sponsor section (header + 3 cards + CUSTOM PACKAGES stamp) · "MAKING WAVES. MAKING A DIFFERENCE." header · Literacy Foundation logo (placeholder) · footer.

### Optimization note
Source PNGs are ~1–3 MB each (~40 MB total). `next/image` will resize on demand, but consider converting to WebP/AVIF to shrink the repo and speed builds. Optional, can be a later pass.

---

## PHASE A — ASSET PIPELINE (run BEFORE Phase 0)

```
Read DESIGN_SPEC.md section 2A. The repo has source images in /images. Set up the public asset pipeline automatically:

1. Create the folder structure under public/assets: hero, illustrations, icons, artists, headers, restaurants, partners.

2. Create and run a script scripts/sync-assets.sh that copies and renames the images from /images into public/assets exactly per the §2A move/rename map (idempotent — safe to re-run). Then delete the duplicate "images/website homepage  image.png". Leave images/website-mockup.png in place as reference. Print a summary of copied files.

3. Create lib/assets.ts: a typed manifest exporting each logical asset with { src, alt, w, h, bakedBg } where bakedBg is 'cream' | 'navy' | 'scene' | 'white'. Pull alt text from the §2A descriptions (e.g. artist names, restaurant lists per row). Components must import paths from here, never hardcode strings.

4. Do NOT build any UI sections yet. Just confirm the files exist in public/assets and that lib/assets.ts type-checks.
```

Here is the exact copy script to use in step 2 (paste into `scripts/sync-assets.sh`):

```bash
#!/usr/bin/env bash
set -euo pipefail
SRC=images; DST=public/assets
mkdir -p "$DST"/{hero,illustrations,icons,artists,headers,restaurants,partners}
cp "$SRC/hero-bg.png"                            "$DST/hero/hero-bg.png"
cp "$SRC/vw-van-graphic.png"                     "$DST/illustrations/vw-van.png"
cp "$SRC/wave-graphic.png"                       "$DST/illustrations/wave.png"
cp "$SRC/palm-trees-graphic.png"                 "$DST/illustrations/palm-trees.png"
cp "$SRC/book-with-heart.png"                    "$DST/illustrations/book-with-heart.png"
cp "$SRC/chefs-hat-icon-graphic.png"             "$DST/icons/dining.png"
cp "$SRC/wine-icon-graphic.png"                  "$DST/icons/wineries.png"
cp "$SRC/mixed-drinks.png"                        "$DST/icons/cocktails.png"
cp "$SRC/guitar-on-the-beach.png"                "$DST/icons/music.png"
cp "$SRC/bag-shopping.png"                        "$DST/icons/makers.png"
cp "$SRC/book-with-sun-icon.png"                 "$DST/icons/philanthropy.png"
cp "$SRC/billy-idol-guest.png"                   "$DST/artists/billy-idol.png"
cp "$SRC/berlin-with-terri-nunn.png"             "$DST/artists/berlin.png"
cp "$SRC/Sugar-Ray.png"                          "$DST/artists/sugar-ray.png"
cp "$SRC/Artists-Under-Construction.png"         "$DST/headers/artists-header.png"
cp "$SRC/savor-the-santa-barbara-food-scene.png" "$DST/headers/savor-block.png"
cp "$SRC/and-many-more-local-favorites.png"      "$DST/headers/and-many-more.png"
cp "$SRC/logobanner3.png"                        "$DST/restaurants/row-1.png"
cp "$SRC/logobanner2.png"                        "$DST/restaurants/row-2.png"
cp "$SRC/logobanner1.png"                        "$DST/restaurants/row-3.png"
rm -f "$SRC/website homepage  image.png"
echo "✓ Assets synced to public/assets"
```

---

## REVISED PHASE NOTES (override the matching phases above)

**PHASE 3 (Hero):** Use `public/assets/hero/hero-bg.png` as the full-bleed background (it contains the whole illustrated scene, no text). Typeset all hero text on top: "1ST ANNUAL" eyebrow, the "TASTES & TUNES / SANTA BARBARA" wordmark (Bevan + script ampersand + gold "Santa Barbara"), the script tagline, the FALL 2026 / CHASE PALM PARK / CABRILLO BLVD line, and the 3 pill CTAs. Add a header logo placeholder (text logo) until a badge PNG is supplied.

**PHASE 5 (Experience):** Do NOT use lucide. Use the six provided icon badges (`icons/dining|wineries|cocktails|music|makers|philanthropy.png`) rendered as circular-masked images on the teal band, per §2A. Typeset the "EXPERIENCE IT ALL" header + squiggle. Labels/numbers per Section 3 list.

**PHASE 6 (Artists):** Do NOT build card chrome or name banners — the three tiles are already composed (names + borders baked in). Lay `artists/billy-idol.png`, `artists/berlin.png`, `artists/sugar-ray.png` in a responsive row on the navy section. Place `headers/artists-header.png` as the section header (cropped to its navy panel per §2A). Add sr-only headings.

**PHASE 7 (Food scene):** Do NOT build an 18-tile grid. Left column = `headers/savor-block.png`. Right column = the three banners stacked in order `restaurants/row-1.png`, `row-2.png`, `row-3.png`. Below them, centered, `headers/and-many-more.png`. All on the cream section. Maintain each image's aspect ratio; scale down gracefully on mobile. Add an sr-only `<h2>` "Savor the Santa Barbara Food Scene" and list the restaurant names in visually-hidden text.

**PHASE 9 (Impact):** Use `illustrations/book-with-heart.png` (cream bg → blends). Typeset the "MAKING WAVES. MAKING A DIFFERENCE." header and the Literacy Foundation copy; use a placeholder for the foundation logo until supplied.
