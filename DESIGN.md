---
version: "alpha"
name: wedding
description: >
  Omnixys Wedding — cinematic event/RSVP experience. Dark-only,
  gold-tinted editorial luxury aesthetic with Playfair Display serif
  and Lato sans. Sharp corners, custom cinematic easing, disabled
  ripples, and cinematic-opacity surfaces (backgroundImage: none).
colors:
  # Palette (dark-only theme)
  primary: "#d8b879"
  secondary: "#f1ece2"
  background-default: "#050506"
  background-paper: "#0d0c0c"
  text-primary: "#f1ece2"
  text-secondary: "rgba(255, 255, 255, 0.58)"
  # Derived cinematic tints
  gold: "#d8b879"
  cream: "#f1ece2"
  surface-elevated: "#0d0c0c"
  surface-muted: "rgba(255, 255, 255, 0.58)"
typography:
  body:
    fontFamily: "var(--font-sans), Lato, Arial, sans-serif"
    fontSize: 16px
    lineHeight: 1.85
  h1:
    fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif"
    fontWeight: 500
    fontSize: clamp(3.5rem, 9vw, 10rem)
    lineHeight: 0.92
  h2:
    fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif"
    fontWeight: 400
    fontSize: clamp(2.4rem, 4.6vw, 4.8rem)
    lineHeight: 0.94
  h3:
    fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif"
    fontWeight: 400
    fontSize: clamp(2.6rem, 3vw, 3rem)
    lineHeight: 1.0
  label:
    fontWeight: 700
    fontSize: 0.5rem
    lineHeight: 1.0
    letterSpacing: 0.5px
  body-muted:
    fontWeight: 300
    fontSize: 0.76rem
    lineHeight: 1.7
  body-copy:
    fontWeight: 300
    fontSize: 0.88rem
    lineHeight: 1.8
  caption:
    fontWeight: 700
    fontSize: 0.55rem
    lineHeight: 1.3
rounded:
  base: 2px
  dialog: 2px
  button: 2px
  input: 2px
spacing:
  unit: 8px
  section-gap: clamp(3rem, 6vw, 6rem)
  chapter-padding: clamp(5rem, 10vw, 9rem)
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background-default}"
    rounded: "{rounded.base}"
    border: "none"
    boxShadow: "none"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.background-default}"
    rounded: "{rounded.base}"
  paper:
    backgroundColor: "{colors.background-paper}"
    rounded: "{rounded.base}"
    backgroundImage: "none"
  accordion:
    backgroundImage: "none"
    shadow: "none"
---

## Overview

Wedding is Omnixys' cinematic wedding RSVP and invitation platform. It is a
**dark-only, gold-tinted, editorial luxury** experience: deep near-black
surfaces, a warm champagne-gold primary, Playfair Display serif for display
typography, and Lato for UI labels and body copy. Every surface is flat — no
ripples, no shadows, no background gradients. Motion is subtle and cinematic
via a custom MUI easing set and CSS-module/framer-motion orchestration.

This is a **storytelling** design, not an operational one: chapters, hero
moments, slow reveals. Preserve the editorial cadence.

## Colors

| Token | Value | Role |
|-------|-------|------|
| Primary (Gold) | `#d8b879` | CTA backgrounds, gold accents, interactive highlights |
| Secondary (Cream) | `#f1ece2` | Secondary CTAs, light text fills |
| Background Default | `#050506` | Page/chapter background, near-black |
| Background Paper | `#0d0c0c` | Elevated surfaces, cards, dialogs |
| Text Primary | `#f1ece2` | Body copy, headings, labels |
| Text Secondary | `rgba(255,255,255,0.58)` | Muted captions, subtitles |

Golds and creams should always dominate over near-black surfaces; never invert
the balance.

## Typography

- **Display (serif)**: `var(--font-serif)` → `Playfair Display` (400/500/600/700)
- **UI/body (sans)**: `var(--font-sans)` → `Lato` (300/400/700)

| Role | Family | Weight | Size | Line Height |
|------|--------|--------|------|-------------|
| Hero/eis | Serif | 400 | clamp(3.5rem, 9vw, 10rem) | 0.92 |
| h1 | Serif | 400/500 | clamp(2.4rem, 4.6vw, 4.8rem) | 0.94 |
| h2 | Serif | 400 | clamp(2.6rem, 3vw, 3rem) | 1.0 |
| Body copy | Sans | 300 | 0.88rem | 1.8 |
| Muted caption | Sans | 300 | 0.76rem | 1.7 |
| Overline/label | Sans | 700 | 0.5rem | 1.0 |

**Overlines** (small caps-style labels) are a recurring motif — 700 weight,
letter-spaced, sans serif. Use sparingly as chapter/section labels.

## Layout

- **Spacing unit**: 8px
- **Section gap**: `clamp(3rem, 6vw, 6rem)` between chapters
- **Chapter padding**: `clamp(5rem, 10vw, 9rem)` for major sections
- **Typography scale**: Headings use `clamp()` and scale with viewport — never fixed rem for display text
- **Mobile-first bottom sheet**: RSVP form uses a full-screen bottom sheet on mobile

## Elevation & Depth

- **No shadows**: `MuiPaper` and `MuiAccordion` force `backgroundImage: none` — surfaces are flat
- **Elevation via contrast**: depth comes from the near-black `#050506` vs `#0d0c0c` paper dichotomy, not box-shadow
- **Depth via motion**: cinematic easing (see transition) creates the depth feel instead of shadows

## Shapes

- **Base radius**: `2px` (near-sharp, editorial)
- Applies to buttons, inputs, dialogs, papers — everything

## Components

### Buttons

- **Rounded**: `2px` (sharp, editorial)
- **Ripple**: disabled (`MuiButtonBase disableRipple: true`)
- **Note**: Button composition uses individual unstyled buttons (not MUI Grid) — see `src/components/*.tsx`

### Papers / Cards

- **backgroundImage**: `none`
- **background**: `theme.palette.background.paper` (`#0d0c0c`)
- **Radius**: `2px`

### Accordion

- **backgroundImage**: `none` — flat, no gradient overlay

### Inputs & Form (RSVP)

- First/last name, email, phone fields with country-code select
- Phone type toggle: WhatsApp / SMS / Call
- Guests can be added/removed via array (react-hook-form useFieldArray)

## Transitions & Motion

| Easing | Value |
|--------|-------|
| easeInOut | `cubic-bezier(0.65, 0, 0.35, 1)` |
| easeOut | `cubic-bezier(0.16, 1, 0.3, 1)` |
| easeIn | `cubic-bezier(0.7, 0, 0.84, 0)` |
| sharp | `cubic-bezier(0.22, 1, 0.36, 1)` |

Cinematic, not playful. Motion should feel like a film transition — slow, graceful,
with gentle acceleration. No bouncy springs, no infinite loops, no confetti.
CSS Modules + framer-motion orchestrating AnimatePresence for chapter transitions.

## Do's and Don'ts

### Do

- Keep the dark → gold → cream hierarchy intact
- Use Playfair for display, Lato for UI
- Use `var(--font-serif)` and `var(--font-sans)` CSS variables sourced from `next/font/google`
- Keep surfaces flat (no shadows, no gradients)
- Use the custom easing curves for all transitions
- Respect the chapter-based storytelling rhythm

### Don't

- Introduce a light mode — the experience is dark-only by design
- Add box shadows to papers/cards
- Hardcode fonts as `"Playfair Display"` strings — always `var(--font-serif)` / `var(--font-sans)` (they're next/font instances)
- Add `@mui/icons-material` icons — the design uses inline SVG (`react-icons`) and CSS-module art
- Add ripple effects (`disableRipple: true` is the default)
- Use `cubic-bezier(0.25, 0.1, 0.25, 1)` (default MUI) — always use the custom set
- Use rem display sizes — `clamp()` for all headings

### Anti-AI-Slop

- No hero-with-center-text over gradients — chapters are structured, editorial
- No emoji icons, no rounded-3xl cards (radius is 2px), no Inter
- No "AI purple" anywhere — gold `#d8b879`, cream `#f1ece2`, near-black surfaces
- No confetti/party animations — this is a wedding *film*, not a gaming site

## Responsive Behavior

- **Breakpoints**: Standard MUI
- **Mobile**: Sin leaves full-viewport, RSVP form becomes a bottom sheet, navbar collapses to floating chapter menu
- **Touch targets**: Minimum 44px
- **Typography**: `clamp()` everywhere for fluid display text

## Known Gaps

- Theme is expression-only (no `palette` custom augmentation) — custom tokens live in CSS Modules and `next/font` variables, not the MUI theme
- Wedding `Lato`/`Playfair` fonts are loaded per-app via `next/font`; the theme references them by CSS variable name — a rename in `fonts.ts` would break theming
- Some components (RSVP form, chapter sections) use CSS Modules for art-directional layout, bypassing theme tokens — keep palette/typography tokens in the theme, layout in CSS Modules

## Agent Prompt Guide

**Quick reference for coding agents:**
- Primary: `#d8b879` (gold) · Secondary: `#f1ece2` (cream) · Bg: `#050506`/`#0d0c0c`
- Display: `var(--font-serif)` (Playfair) · UI: `var(--font-sans)` (Lato)
- Radius: `2px` everywhere
- No shadows, no ripples, backgroundImage `none` on Paper/Accordion
- Use custom easing curves, not MUI defaults
- No `@mui/icons-material`; use `react-icons`/inline SVG
- Interactive hover states use `rgba(255,255,255,0.58)` muted text and gold `#d8b879` accents