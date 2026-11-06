# Prompt used to design FoodBridge

Design a polished, responsive one-page homepage for FoodBridge, a social-impact platform that connects surplus food from restaurants, hotels, events, and households with NGOs and community kitchens.

Brand direction: warm editorial, not a generic green startup. Paper background (#f3eee6), cocoa ink (#1c1612), saffron (#e7a23a), chili (#a33b2c), and leaf green (#234c38). Headlines in Fraunces, interface text in Outfit. A bridge-arch mark as the logo. No stock photos; use type, tickets, and simple line icons.

Voice: short, concrete, kitchen-hour language. Headline: "The last service can be the next meal." Avoid startup jargon.

Sections, in order:

1. Sticky nav with Problem, Solution, How it works, Tonight, Impact, Stories, and a "List surplus" action.
2. Hero with the headline, a supporting line, two calls to action (donate food, partner or volunteer), and a dark "Tonight in Bengaluru" ticket board.
3. A metric strip: meals redirected, donor kitchens, receiving groups, median time to claim. Label pilot metrics honestly.
4. Problem: global food waste (about one third of food produced is lost or wasted, FAO) beside the local timing gap — surplus stays invisible until it is too late to serve.
5. Solution: three stops — donor kitchen, FoodBridge, community table.
6. How it works: list, match nearby, coordinate pickup, log the meals. Each step has a time cue.
7. Features: donation listing, NGO partners, pickup windows, volunteers, diet and allergen notes.
8. Interactive board: filter veg, mixed, or open tickets; claim a pickup; post a new listing from a dialog. All state stays in the browser. Say clearly that nothing is sent to a real kitchen.
9. Impact: a 72% claimed-before-close ring and live counts from the demo board, plus a note that the headline metrics are a designed city-pilot snapshot.
10. Three illustrative stories from a chef, an NGO coordinator, and a volunteer. Label them as illustrative.
11. Closing call to action and a footer with navigation and contact.

Interactions must work on desktop and mobile: sticky nav, mobile menu, dialogs, filters, claim buttons, count-up on the metric strip, and a visible focus state. Respect prefers-reduced-motion.

Keep it one page, static, and deployable on Vercel or Render with no build step.
