# Momentus

Marketing site for Momentus — GEO × Paid agency that engineers AI visibility (ChatGPT, Perplexity, Gemini) and harvests the trust with paid.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + custom design tokens
- **Framer Motion** for animations + scroll choreography
- **Lenis** for smooth-scroll
- Magic UI primitives (MIT) inlined: Marquee, BorderBeam, NumberTicker, Spotlight

## Run locally

```bash
npm install --legacy-peer-deps
npm run dev
```

Site runs on `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## Configuration

The Calendly URL is centralized in [`lib/config.ts`](lib/config.ts).

## Deploy

One-click deploy via Vercel — point at this repo, no env vars required.
