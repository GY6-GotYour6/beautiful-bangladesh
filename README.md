# Beautiful Bangladesh

Next.js 16 + Payload 3 (SQLite) tourism site. Public pages are Figma **Designs** canvas exports scaled via `FigmaSection` / `FigmaFrame`, with a sticky HTML `SiteHeader`.

## Run

```bash
npm install
npm run dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin  

## Structure

- `src/components/landing/` — `FigmaFrame` / `FigmaSection` / `FigmaStack` + landing page
- `src/components/nav/` — sticky site header (desktop + mobile drawer)
- `src/lib/nav-config.ts` — nav links, active routes, header clip
- `src/lib/landing-content.ts` — destination slug metadata for static routes
- `public/landing/figma/designs/` — Designs canvas WebP exports (landing / explore / destination / mobile)

## Routes

| Path | Status |
|------|--------|
| `/` | Landing (Designs) |
| `/explore` | Destination index (Designs) |
| `/destinations/[slug]` | Destination details template (Designs) |
| `/cms` | CMS destinations list |
| `/cms/destinations/[slug]` | CMS record editor |
| `/cms/structure` | CMS content structure spec |
| `/admin` | Payload CMS |

Fonts: Outfit (body) + Caveat (script accents) as free stand-ins for Otterco/Haffer.
