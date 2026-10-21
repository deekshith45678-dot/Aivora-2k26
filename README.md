# Smart AgriSense

Smart AgriSense is a responsive React/TypeScript farming assistant and farmer-to-customer marketplace built on the Manus Web starter (Vite, Express, tRPC, Drizzle, and MySQL-compatible managed database support).

## Current experience

The application opens with a role chooser for Farmer Login or Customer Login, followed by a phone-first OTP flow. The UI labels the OTP as development mode and uses the documented test code `2846` until a real SMS provider is configured. Customers land in the marketplace; farmers land in the field dashboard.

The farmer workspace includes a farm overview with labelled demo readings, soil and nutrient signals, crop stage cards, weather-provider state, daily tasks, decision history, and a transparent crop advisor. The marketplace supports search, simple filters, add-to-cart feedback, sample produce, and a sample agricultural input store. The assistant provides a safe local demo response and a visible managed-AI connection seam. Settings exposes all ten supported languages and clearly states provider availability.

Supported languages are English, Telugu, Hindi, Tamil, Kannada, Malayalam, Marathi, Bengali, Gujarati, and Punjabi. The selected language is persisted in local storage and updates the entry flow, navigation, key actions, settings, and assistant context label.

The multilingual layer now covers the visible farmer and customer journeys: role selection, OTP validation messages, dashboard headings and tasks, crop advisor guidance, marketplace and store messaging, assistant prompts and suggestions, order summaries, settings, and provider-state copy. Language changes are applied live without leaving the current screen and remain active after refresh.

## Run locally in the managed project

```bash
pnpm install
pnpm dev
```

The configured runtime is port 3000. Health is available at `/api/health`, and the route manifest is available at `/manus-routes.json`.

Useful checks:

```bash
pnpm check
pnpm build
pnpm test
```

## Provider integration notes

- **OTP:** connect a real SMS provider through server-side protected secrets. Keep expiry, retry limits, and rate limiting on the server; do not move the test code into production.
- **Weather:** connect a weather provider through the managed API Hub or a protected provider key. Replace demo forecast content only after the backend validates freshness and location.
- **AI assistant:** use the managed server-side LLM API with selected-language context. Persist conversations only after adding authenticated application tables.
- **Speech:** route browser recordings through the trusted server to the managed speech endpoint; show unsupported-format and upload-size errors.
- **Disease detection:** connect a trained backend model or multimodal service only when available. Keep the explicit unavailable state and request expert confirmation for uncertain results.
- **Payments:** the current cart/checkout surface is test-only. Enable Stripe or another official integration only with server-side payment verification; never collect card credentials in this app.

## Database direction

The starter's users table and managed database are already available. Before production use, add additive Drizzle migrations for phone verification, farmer profiles/farms, crops and growth stages, soil readings and sensor metadata, disease analyses, crop recommendations, weather alerts, listings, store products, carts, orders, and notifications. Add ownership checks to every farmer-owned mutation.

## Deployment

Use the existing Dockerfile and managed server deployment configuration. The production build is `pnpm build`, and the application starts with `pnpm start` while honoring `PORT`. Do not put provider keys in the browser bundle; configure them through protected environment variables.

## Validation evidence

- TypeScript diagnostics were registered by the managed sandbox before implementation.
- `pnpm check` completed successfully after the app implementation.
- `pnpm build` completed successfully; Vite emitted the frontend bundle and esbuild emitted `dist/index.js`.
- `pnpm test` completed successfully: 2 test files passed and 6 tests passed.
- The UI is intentionally explicit about demo data and unavailable provider states rather than claiming live weather, disease accuracy, SMS delivery, or money movement.
