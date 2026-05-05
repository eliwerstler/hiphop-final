# Website Spec: "Value and Values in Hip Hop"
## Instructions for Claude Code

---

## Overview

Build a multi-page website for a collaborative academic project on money, values, and religion in hip hop culture. The site should feel like an interactive mixtape — bold and expressive but clean and navigatable. The design itself should echo the themes: the visual language of hip hop culture, commercialization, and its evolution over decades. This is a shell — all artifact slots should be clearly marked placeholders that can be swapped in later with real media. Do not write any real body copy or artifact descriptions — use clearly labeled placeholder text throughout.

---

## Tech Stack

- HTML, CSS, vanilla JavaScript (no frameworks)
- All in a single repository, multi-page (separate HTML files per group member)
- Must support embedded video (YouTube/Vimeo iframes) and images natively, inline on the page — no links out, no "click to open," media should feel like it lives on the page
- Mobile responsive

---

## Site Structure

```
index.html          → Landing page (the "mixtape")
eli.html            → Eli Werstler's chapter
riley.html          → Riley Chapuis's chapter
noah.html           → Noah Bernstein's chapter
jack.html           → Jack Lobel's chapter
style.css           → Global styles (shared across all pages)
[name].css          → Individual chapter stylesheets (one per person)
```

---

## Global Design Language

- **Palette:** Dark background (near black), high contrast typography (off-white/cream), with one bold accent color used sparingly — leave accent color as a CSS variable `--accent` so it can be swapped easily
- **Typography:** Mix of a strong display/headline font and a clean readable body font — suggest pairing something with weight and personality for headings with something neutral and legible for body/annotations
- **Texture:** Subtle grain or noise overlay on backgrounds to give warmth — avoid flat sterile digital look
- **Feel:** Like a premium editorial magazine that grew up on hip hop. Not a school project. Not a generic portfolio site.
- **No generic stock UI** — avoid Bootstrap defaults, cookie-cutter nav bars, or anything that reads as a template

---

## Page 1: Landing Page (`index.html`)

### Concept
The landing page is a **mixtape interface**. It should look and feel like a physical mixtape or album — a cassette tape visual, a tracklist, a title. The "tracks" on the tracklist are the four group members' chapters. Clicking a track takes you to that person's page.

### Layout
- **Hero section:** Large stylized title — "Value and Values in Hip Hop" — with a subtitle placeholder: `[GROUP SUBTITLE PLACEHOLDER]`. Below the title, a short one-liner placeholder: `[ONE LINE PROJECT DESCRIPTION PLACEHOLDER]`
- **Cassette / mixtape visual:** A prominent illustrated or CSS-rendered cassette tape (or mixtape aesthetic element) as the centerpiece of the page. This can be CSS art, an SVG, or a placeholder `[CASSETTE ILLUSTRATION PLACEHOLDER]` if illustration is out of scope — but make the layout designed around it
- **Tracklist:** Below or beside the cassette, a styled tracklist of four "tracks," formatted like a real tracklist (track number, title, artist name, runtime placeholder):
  - `01 — [ELI'S CHAPTER TITLE PLACEHOLDER] — Eli Werstler — 0:00`
  - `02 — [RILEY'S CHAPTER TITLE PLACEHOLDER] — Riley Chapuis — 0:00`
  - `03 — [NOAH'S CHAPTER TITLE PLACEHOLDER] — Noah Bernstein — 0:00`
  - `04 — [JACK'S CHAPTER TITLE PLACEHOLDER] — Jack Lobel — 0:00`
- Each track is clickable and routes to the corresponding chapter page
- Hover state on each track should feel tactile — like pressing play
- **Footer:** `[COURSE NAME PLACEHOLDER] | [SEMESTER PLACEHOLDER] | Columbia University`

### Navigation
- No persistent navbar — the landing page IS the navigation hub
- Each chapter page has a "back to tracklist" button that returns to `index.html`

---

## Page 2: Eli Werstler — `eli.html`

### Topic
The corporate crossover from spiritually charged, community-rooted hip hop to a globalized, multi-billion-dollar industry. The arc: **Community → Hustle → Mogul.**

### Unique Stylistic Direction
Eli's page should feel like it's tracking a transformation — the design itself should shift as you scroll. Consider:
- The top of the page feels raw, gritty, street-level (rough textures, compressed typography, tight layout)
- As you scroll down through the three "eras" (Community / Hustle / Mogul), the design gradually becomes sleeker, more corporate, more polished — like the page is commercializing in real time
- This is the core visual concept for this page — implement it structurally

### Layout
- **Page header:** `[ELI'S CHAPTER TITLE PLACEHOLDER]` — Eli Werstler
- **Three era sections**, each clearly delineated:
  1. **Era 1 — Community (1990s):** `[ERA 1 INTRO TEXT PLACEHOLDER]` + artifact slots (see below)
  2. **Era 2 — Hustle (2000s):** `[ERA 2 INTRO TEXT PLACEHOLDER]` + artifact slots
  3. **Era 3 — Mogul (2010s–2020s):** `[ERA 3 INTRO TEXT PLACEHOLDER]` + artifact slots
- Each era has **3–4 artifact slots** (see Artifact Slot spec below)
- A short **era label** (e.g., "The Community Era") should be visually prominent as a section header

### Artifact Slots (per era)
Each artifact slot should support:
- **Video embed** (YouTube/Vimeo iframe, autoplay muted on scroll-into-view if possible, or a prominent play button)
- **Image display** (full-bleed or contained, depending on slot)
- Each slot has:
  - `[ARTIFACT TITLE PLACEHOLDER]`
  - `[ARTIFACT TYPE PLACEHOLDER — e.g., Music Video / Advertisement / Song]`
  - `[ARTIFACT DATE PLACEHOLDER]`
  - `[ARTIFACT ANNOTATION PLACEHOLDER — 2-3 sentences]`

---

## Page 3: Riley Chapuis — `riley.html`

### Topic
Personal brands, purchased entry into the hip hop community, association of values and beliefs — e.g., Yeezy.

### Unique Stylistic Direction
Riley's page is about personal branding, so the page itself should feel like a **brand lookbook or campaign page** — think high fashion editorial, bold product photography framing, clean white space punctuated by striking visuals. The aesthetic should mirror the luxury brand world that rappers have entered and created.

### Layout
- **Page header:** `[RILEY'S CHAPTER TITLE PLACEHOLDER]` — Riley Chapuis
- **Intro section:** `[INTRO TEXT PLACEHOLDER]`
- **Brand/artifact grid:** A gallery-style layout — large image/video tiles arranged in an editorial grid (not a boring equal grid — varied sizes, some full-width, some side-by-side)
- Each tile is an artifact slot:
  - `[ARTIFACT TITLE PLACEHOLDER]`
  - `[ARTIFACT TYPE PLACEHOLDER]`
  - `[ARTIFACT DATE PLACEHOLDER]`
  - `[ARTIFACT ANNOTATION PLACEHOLDER]`
- Aim for **8–10 artifact slots** in the grid
- Video embeds should sit flush and naturally within the grid tiles

---

## Page 4: Noah Bernstein — `noah.html`

### Topic
Production — Def Jam, specifically Rick Rubin, using elements of rock production (one subversive genre) to promote the commercial success of hip hop (another subversive genre).

### Unique Stylistic Direction
Noah's page is about production and sound — it should feel like a **recording studio or mixing board**. Think dark, technical, behind-the-scenes. Consider a layout inspired by a DAW (digital audio workstation) — horizontal tracks, waveform-like visual elements, a sense of layers and channels. This is the most "behind the scenes" chapter, so the visual language should reflect the machinery of music production.

### Layout
- **Page header:** `[NOAH'S CHAPTER TITLE PLACEHOLDER]` — Noah Bernstein
- **Intro section:** `[INTRO TEXT PLACEHOLDER]`
- **"Track lanes" layout:** Artifacts arranged in horizontal rows/lanes, like tracks in a DAW, each lane labeled:
  - `[LANE LABEL PLACEHOLDER — e.g., Artist / Album / Interview / Commercial]`
- Each lane contains **2–3 artifact slots**
- Aim for **3–4 lanes**, ~8–10 total artifact slots
- Each artifact slot:
  - `[ARTIFACT TITLE PLACEHOLDER]`
  - `[ARTIFACT TYPE PLACEHOLDER]`
  - `[ARTIFACT DATE PLACEHOLDER]`
  - `[ARTIFACT ANNOTATION PLACEHOLDER]`

---

## Page 5: Jack Lobel — `jack.html`

### Topic
Management — how the pursuit of commercial success brings together people of different religions, cultures, and values in the hip hop industry, as exemplified by the relationship between managers and artists.

### Unique Stylistic Direction
Jack's page is about relationships, negotiation, and the human web behind hip hop's commercial world. It should feel like a **relationship map or dossier** — think investigative journalism, a cork board with strings connecting people, or a deal memo. Human, relational, slightly conspiratorial in a fun way.

### Layout
- **Page header:** `[JACK'S CHAPTER TITLE PLACEHOLDER]` — Jack Lobel
- **Intro section:** `[INTRO TEXT PLACEHOLDER]`
- **Dossier / relationship layout:** Artifacts presented as "case files" or "profiles" — each artifact slot styled like a document card or dossier entry
- Each artifact slot:
  - `[ARTIFACT TITLE PLACEHOLDER]`
  - `[ARTIFACT TYPE PLACEHOLDER]`
  - `[ARTIFACT DATE PLACEHOLDER]`
  - `[ARTIFACT ANNOTATION PLACEHOLDER]`
- Aim for **8–10 artifact slots**
- Video and image embeds sit inside the dossier cards naturally

---

## Artifact Slot — Global Spec

Every artifact slot across all pages must:
1. **Support video embeds** — YouTube and Vimeo iframes, sized responsively, with a clear `[VIDEO EMBED PLACEHOLDER — paste iframe here]` comment in the HTML
2. **Support images** — with a clear `[IMAGE PLACEHOLDER — replace src]` comment and a visible placeholder box (styled, not just a broken image icon)
3. **Have a type toggle** — the slot should be able to render as either video or image without restructuring the HTML. Use a simple class system: `.artifact-video` vs `.artifact-image`
4. **Display annotation text** below the media with placeholder: `[ANNOTATION PLACEHOLDER]`
5. **Display metadata** (title, type, date) above the media with placeholders

---

## Navigation Between Pages

- Each chapter page has a persistent **minimal footer bar** with:
  - "← Back to Tracklist" link (returns to `index.html`)
  - The four group member names as links to each other's pages
- Keep it unobtrusive — this is not a navbar, it lives at the bottom

---

## Placeholder Convention

Use this consistent format for all placeholders throughout the HTML so they're easy to find and replace:

```
[PLACEHOLDER — description of what goes here]
```

All placeholders should be visually obvious in the rendered page — style them with a subtle highlight or dashed border so developers/editors can see at a glance what still needs to be filled in.

---

## Things NOT to Do

- Do not write any real body copy, essay text, or artifact descriptions — placeholders only
- Do not use Bootstrap, Tailwind, or any CSS framework
- Do not use a generic nav bar at the top of every page
- Do not make the individual pages look the same as each other — each should feel distinct
- Do not link out to external content — all media should be embedded inline
- Do not make it look like a school project or a template

---

## Deliverables

- `index.html`
- `eli.html`
- `riley.html`
- `noah.html`
- `jack.html`
- `style.css` (global)
- `eli.css`, `riley.css`, `noah.css`, `jack.css` (individual chapter styles)
