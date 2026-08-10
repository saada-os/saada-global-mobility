# Saada Global Mobility — permanent project instructions

This is the official trilingual website for Saada Global Mobility, a Germany-focused consultancy supporting international professionals and employers with residence procedures, skilled immigration and authority processes.

## Non-negotiable rules

1. Preserve German, English and Arabic. When visible text changes, update all three languages in the same change.
2. Preserve correct Arabic right-to-left behavior and check the Arabic layout after every design change.
3. Do not invent qualifications, testimonials, case numbers, success rates, company clients, legal claims, prices, addresses, tax details or contact information.
4. Preserve the legal boundary: Salwa is not presented as a lawyer. The service does not include legal representation or court work, and authority decisions cannot be guaranteed.
5. Preserve the distinction between the free 15–20 minute introductory call and the paid case analysis/action plan from €250.
6. Preserve the navy, petrol-teal, warm ivory and gold brand system unless the owner explicitly asks to change it.
7. Preserve the supplied Saada logo. Do not redesign or replace it unless the owner explicitly asks.
8. The current hero portrait is an AI-generated placeholder and must never be described as Salwa. Replace it only when the owner uploads and identifies Salwa's approved photograph.
9. Do not connect a form, analytics service, external API, calendar or email provider without the owner's explicit approval.
10. The booking flow is a demonstration. Never claim that a real appointment or confirmation email was created until a real Calendly event link is configured and tested.
11. Keep the website accessible and responsive. Check desktop, mobile, keyboard navigation and readable color contrast.
12. Never delete working content or features merely to simplify a requested change.

## Safe editing workflow

- Explain the intended change briefly before implementing it.
- Make the smallest change that satisfies the request.
- Run `npm run build` after each completed change and fix any failure.
- Show the preview and summarize exactly what changed.
- Do not say the change is live until the owner presses Publish or explicitly asks you to publish it.
- If a request could change legal meaning, prices, business ownership, privacy handling or customer data collection, ask for confirmation first.

## Project structure

- `src/App.tsx`: all page content, translations and interactions.
- `src/styles.css`: visual system and responsive styling.
- `public/saada-logo-theme.webp`: approved theme-adapted logo.
- `public/hero-consultant-placeholder.webp`: temporary AI-generated portrait.

The project is a standard Vite + React + TypeScript website designed to work in Bolt and other common hosting platforms.
