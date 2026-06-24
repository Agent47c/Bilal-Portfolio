

---

## Background Colors

| Token | Hex | Usage |
|---|---|---|
| Background primary | `#080B14` | Page background |
| Background cards | `#0F1320` | Card surfaces |
| Background hover | `#161B2E` | Card hover state |

---

## Accent Colors

| Name | Base | Light | Usage |
|---|---|---|---|
| Violet | `#7C3AED` | `#A78BFA` | Primary brand, buttons, links |
| Cyan | `#06B6D4` | `#38BDF8` | Secondary accent, borders, badges |
| Emerald | `#059669` | `#34D399` | Success states, skill tags |
| Amber | `#D97706` | `#FBBF24` | CTA buttons, warm highlights |
| Rose | `#DC2626` | `#F87171` | Alerts, bold accents only |

---

## Text Colors

| Token | Value | Usage |
|---|---|---|
| Text primary | `#FFFFFF` | Headings, important text |
| Text secondary | `rgba(255,255,255,0.55)` | Body copy, descriptions |
| Text muted | `rgba(255,255,255,0.28)` | Captions, meta info |

---

## Borders

| Token | Value | Usage |
|---|---|---|
| Border default | `rgba(255,255,255,0.07)` | Card borders |
| Border hover | `rgba(167,139,250,0.35)` | Hover glow (violet) |

---

## Gradients

```css
/* Hero heading — apply to key phrase in h1 */
background: linear-gradient(135deg, #A78BFA 0%, #38BDF8 50%, #34D399 100%);

/* Logo / brand — animate background-position */
background: linear-gradient(135deg, #A78BFA, #38BDF8, #34D399);
background-size: 300% 300%;

/* CTA primary button */
background: linear-gradient(135deg, #7C3AED, #06B6D4);

/* Top accent bar */
background: linear-gradient(90deg, #7C3AED, #06B6D4, #34D399, #F59E0B, #EF4444);
background-size: 300% 100%;
```

---

## Ambient Orbs

Place these as `position: absolute` children inside your hero section. Set the parent to `position: relative; overflow: hidden`.

```css
/* Orb 1 — Violet, top-left */
width: 220px; height: 220px;
background: #7C3AED;
border-radius: 50%;
filter: blur(60px);
opacity: 0.35;
top: -60px; left: -40px;
animation: orb 8s ease-in-out infinite;

/* Orb 2 — Cyan, top-right */
width: 180px; height: 180px;
background: #06B6D4;
filter: blur(60px);
opacity: 0.35;
top: 20px; right: -30px;
animation: orb 10s ease-in-out infinite reverse;

/* Orb 3 — Amber, bottom-center */
width: 140px; height: 140px;
background: #F59E0B;
filter: blur(60px);
opacity: 0.30;
bottom: 40px; left: 30%;
animation: orb 12s ease-in-out infinite;
```

```css
/* Orb float keyframe */
@keyframes orb {
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(30px, -20px) scale(1.1); }
  66%  { transform: translate(-20px, 15px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}
```

---

## Animations

```css
/* Animated gradient text (logo, headings) */
@keyframes gradShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
/* Apply: animation: gradShift 4s ease infinite; */

/* Slide-in on page load — stagger with delay */
@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Badge: 0s delay | H1: 0.1s | Body: 0.2s | CTA: 0.3s | Stats: 0.4s */

/* Live dot pulse (available badge) */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.7; transform: scale(0.95); }
}
/* Apply: animation: pulse 2s ease-in-out infinite; */

/* Cursor blink on hero heading */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
/* Apply: animation: blink 1s step-end infinite; */

/* Swatch shimmer effect */
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
/* Apply: animation: shimmer 2.5s infinite; */

/* Card hover */
/* transition: transform 0.25s ease, border-color 0.25s ease; */
/* on hover: transform: translateY(-4px); */

/* Button hover */
/* transition: transform 0.2s; */
/* on hover: transform: scale(1.04); */
```

---

## Typography

```css
/* Hero H1 */
font-size: 48px;      /* desktop */
font-weight: 700;
color: #FFFFFF;
line-height: 1.25;

/* Gradient on key phrase inside H1 */
background: linear-gradient(135deg, #A78BFA 0%, #38BDF8 50%, #34D399 100%);
background-clip: text;
-webkit-background-clip: text;
color: transparent;
background-size: 300% 300%;
animation: gradShift 5s ease infinite;

/* Body text */
font-size: 15px;
color: rgba(255,255,255,0.55);
line-height: 1.7;

/* Badge / pill text */
font-size: 11px;
font-weight: 500;
border-radius: 20px;
```

---

## Card Style

```css
.card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 20px;
  transition: transform 0.25s ease, border-color 0.25s ease;
}
.card:hover {
  transform: translateY(-4px);
  border-color: rgba(167,139,250,0.4);
}
```

---

## Badge / Pill Styles

```css
/* Violet */
background: rgba(124,58,237,0.15);
color: #C4B5FD;
border: 1px solid rgba(124,58,237,0.30);

/* Cyan */
background: rgba(6,182,212,0.12);
color: #7DD3FC;
border: 1px solid rgba(6,182,212,0.20);

/* Emerald */
background: rgba(52,211,153,0.10);
color: #6EE7B7;
border: 1px solid rgba(52,211,153,0.18);

/* Amber */
background: rgba(245,158,11,0.12);
color: #FCD34D;
border: 1px solid rgba(245,158,11,0.20);
```

---

## Layout Rules

```
- Orbs:    position: absolute | pointer-events: none | z-index: 0
- Content: position: relative | z-index: 2
- Never use pure black (#000000) — use #080B14 as darkest bg
- Never use pure white for body text — use rgba(255,255,255,0.55)
- Gradient text requires: background-clip: text + color: transparent
- Footer tagline: "Made by a human. Fueled by curiosity."
```

---

## Color Psychology Reference

| Color | Psychological Effect | Source |
|---|---|---|
| Violet `#7C3AED` | Creativity, ambition, originality | Elliot & Maier, 2014 |
| Cyan `#06B6D4` | Trust, clarity, calm — #1 globally for "trustworthy" | Hallock Color Survey |
| Emerald `#34D399` | Growth, energy, progress | Labrecque & Milne, 2012 |
| Amber `#F59E0B` | Warmth, urgency — draws eye without aggression | Labrecque & Milne, 2012 |
| Void bg `#080B14` | Focus, expertise, premium feel | Lichtle, 2007 |
| Ambient orbs | Human authorship signal — AI sites use flat backgrounds | UX convention |

---

*Copy this file and paste it at the start of any AI prompt when building your portfolio.*