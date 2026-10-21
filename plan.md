# Smart AgriSense — Implementation Plan

## Product scope
Smart AgriSense is a mobile-first farming assistant and marketplace with two role journeys: Farmer and Customer. The first view is a role chooser with language selection. The prototype keeps the requested security boundaries visible: OTP is clearly marked as development mode until a provider is configured, test checkout is clearly marked, and demo readings/listings are labelled.

## Implementation approach
- Build the core experience as a responsive React/TypeScript single-page app using the existing Vite/Express/tRPC/Drizzle starter.
- Use local UI state for the demonstrated role/OTP flow, language persistence, dashboard navigation, crop advisor, cart, and assistant demo so the project is immediately runnable without external credentials.
- Keep the app structured for backend expansion: server routers and Drizzle schema remain available for users, farms, listings, orders, soil readings, recommendations, and analyses; future providers can be added behind API seams.
- Use the built-in Lucide icon set, Recharts-compatible visual language, CSS gradients, and generated decorative texture-free shapes rather than stock imagery to keep the dashboard focused and fast.
- Provide explicit empty/error states for provider-dependent features instead of fabricating live weather, disease predictions, sensor readings, or payment confirmation.

## Project structure
- `client/src/App.tsx`: app shell, role/session state, route-level dashboard rendering.
- `client/src/pages/Home.tsx`: login, farmer dashboard, customer marketplace, store, crop advisor, assistant, and settings views.
- `client/src/index.css`: brand tokens, typography, layout, dashboard components, responsive behavior.
- `server/routers.ts`: existing tRPC boundary for future authenticated application procedures.
- `drizzle/schema.ts`: existing users table extended later with domain models.
- `public/manus-routes.json`: route manifest for the single-page route surface.
- `README.md`: setup, integration requirements, test evidence, and deployment notes.

## Design direction
Three possible directions: Harvest Atelier (0.06): editorial farm intelligence with paper-white surfaces and deep botanical green; Field Console (0.04): compact operational dashboard with high-contrast data blocks; Sunlit Cooperative (0.08): warm market-first interface with amber accents. Chosen: **Harvest Atelier**.

- **Design movement:** modern agrarian editorial, where field notes meet calm software instrumentation.
- **Core principles:** quiet confidence, data made human, clear next action, and generous breathing room.
- **Color philosophy:** deep forest green anchors trust and cultivation; lime/chartreuse is reserved for growth and active status; warm off-white keeps the interface tactile instead of clinical; amber appears only for attention and weather risk.
- **Layout paradigm:** a persistent left rail on desktop with a wide editorial canvas; stacked cards become a thumb-friendly timeline on mobile.
- **Signature elements:** a leaf-shaped brand mark, thin contour-line accents, and small “field note” labels that distinguish live, entered, and demo information.
- **Interaction philosophy:** every control should answer “what happens next?” with immediate state feedback; tabs are stable, cards are selectable, and destructive actions are visually quiet but explicit.
- **Animation:** short 160–220ms fades and lifts for cards, a gentle shimmer only for loading, and no looping motion that competes with weather or alert content.
- **Typography system:** Plus Jakarta Sans for UI copy, with a restrained serif-like display treatment achieved through weight and spacing rather than a second external font dependency; uppercase micro-labels use generous tracking.
- **Brand essence:** calm, practical intelligence for people growing, buying, and selling better. Personality: grounded, observant, encouraging.
- **Brand voice:** direct, warm, and specific. Example lines: “Your next best field move, in one view.” “Rain is a resource—plan around it.”
- **Wordmark & logo:** a two-leaf sprout tucked into the capital A, paired with a compact “AgriSense” wordmark.
- **Signature brand color:** `#195E3B`, a deep living green used for navigation, primary actions, and the brand mark.

## Build workflow
1. Implement the shell and core interactions in the existing starter.
2. Add the route manifest and project metadata.
3. Run typecheck and production build; fix actionable diagnostics.
4. Start the dev server, verify `/api/health` and `/manus-routes.json`, and inspect the rendered preview.
5. Commit intended files to the project’s canonical main branch so the checkpoint is recorded.

## Explicit provider boundaries
- Phone OTP: development OTP mode is labelled in the UI; real SMS needs a provider credential and server-side verification.
- Weather: live weather requires a configured external API or API Hub registration; the UI shows a not-connected state rather than fake live readings.
- Disease image model: unavailable state is shown unless a trained model is configured.
- AI assistant: demo response is available locally; production LLM calls should use the managed server-side LLM surface.
- Payments: test checkout only until a real provider is enabled and verified server-side.
