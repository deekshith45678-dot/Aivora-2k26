# Smart AgriSense — Delivery TODO

- [ ] **Role selection and OTP entry** — The first screen offers Farmer Login and Customer Login. After selecting a role, initial login asks only for full name, mobile number with country code, and OTP verification. Development OTP mode is clearly labelled, with expiry/retry copy and no production secret in the client. Role-specific dashboard routing is preserved in session state.

- [ ] **Ten-language experience** — English, Telugu, Hindi, Tamil, Kannada, Malayalam, Marathi, Bengali, Gujarati, and Punjabi are selectable from the entry view and dashboard shell. The selection persists across sessions and updates the primary navigation, actions, dashboard copy, alerts, assistant, and marketplace labels.

- [ ] **Farmer dashboard** — Show farm identity, location, crop stage, weather status, soil health summary, irrigation recommendation, nutrient guidance, disease/recommendation history, market access, and daily tasks. Demo readings and sample data are visibly labelled; new-farmer empty state is available.

- [ ] **Crop advisor** — Accept soil type/pH, NPK, temperature, humidity, rainfall, season, location, and water availability. Return ranked crops with transparent rule-based explanations, constraints, and missing-measurement guidance; do not claim unsupported model accuracy.

- [ ] **Disease and soil intelligence seams** — Provide leaf-upload entry, validation/error state, explicit model-unavailable state, soil measurement entry, history visualization, units, and distinctions between entered, simulated, and future sensor readings.

- [ ] **Weather and alerts** — Provide current conditions/forecast framing, location permission/manual location controls, and graceful unavailable/stale/network states without fabricating live data.

- [ ] **Multilingual assistant** — Provide an interactive assistant with selected-language context, farm-aware prompt framing, safe topic boundaries, voice fallback copy, and a clear path to managed LLM/Speech integration.

- [ ] **Marketplace and input store** — Customers can browse, filter, search, add to cart, manage quantities, and start test checkout. Farmer inventory is represented with sample produce and transparent demo labels. Input-store categories cover seeds, nutrients, irrigation, and tools.

- [ ] **Backend and persistence seams** — Keep Express/tRPC/Drizzle wiring intact, extendable to users, farms, crops, soil readings, disease analyses, recommendations, listings, products, carts, orders, and notifications. Keep secrets in environment variables and document required credentials.

- [ ] **Validation and delivery** — Add route manifest, run typecheck/build, verify health and route manifest responses, inspect responsive behavior, and document exact test results and deployment instructions. Do not claim unexecuted checks passed.
