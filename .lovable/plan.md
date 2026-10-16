# À Votre Santé Café website

## Design concept
- Display: Fraunces headlines with DM Sans for all supporting text.
- Light palette: the requested warm cream and espresso; dark palette: roasted brown and soft cream.
- Motion: restrained fades and image reveals, with reduced-motion support and no added animation framework.
- Navigation: persistent café wordmark and clear routes; route changes stay immediate and accessible.
- Imagery: only the four café photos found in its public Zomato listing; no stock or invented imagery.

## Build
- Replace the home placeholder and create Home, Menu, Gallery, About, Reviews, Visit, and a styled not-found page using the existing TanStack Start framework.
- Build shared navigation/footer, responsive theme controls, and source-led café content. Use the provided Zomato photo URLs as the four available café images.
- Extract all item names, prices, and listed descriptions from Zomato’s online order listing into a data file; label it as an online listing, preserve unknown prices as unavailable, and do not invent menu items, reviews, venue history, or amenities.
- Add menu search, vegetarian filter, category navigation, gallery filtering/lightbox, source-backed review/rating display, hours with Asia/Kolkata open status, directions/call links, and a WhatsApp enquiry form.
- Add page-specific metadata, menu print styling, a sitemap, and a concise editing README. Keep implementation compatible with the project’s fixed stack and semantic design tokens.
- Verify the route set, menu extraction counts, build diagnostics, tests, and the primary page interactions.

## Source limitations
- Public listings disagree on ratings and hours. Show source-specific ratings instead of blending them; use the Zomato hours with a clear source caveat.
- Google Maps menu photos, the full 15–20-photo gallery, a complete official menu, and independently verifiable short reviews were not available from the accessible sources. Clearly disclose these gaps; do not simulate the requested complete extraction.
- The 4.6 rating and 296 Google review count are reported by Restaurant Guru, not directly verified from Google Maps; identify the source accordingly.