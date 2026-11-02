# Founder section

The section is integrated immediately after contact (`#quote`), using
`GlowLink_Fondatrice_Demo.html` and the separately supplied `fondatrice.jpeg`.
The original reference files are retained at the project root.

The forest/champagne colors, portrait, caption, reveal control and mobile
portrait-first layout are retained. The biography uses the personal
presentation supplied by the user on 25 October 2026. As
subsequently requested, the repeated GlowLink wordmark, ABOUT label and OUR STORY
label are removed. The empty top row is removed as well; the existing header
EN/FR controls manage the whole page.

`css/founder.css` isolates the supplied styles inside `.founder` so they cannot
change the existing header, hero or contact section. The site font stack is
inherited. Heading levels are H2/H3 rather than adding another H1. Translation
hooks wrap individual text fragments to retain the supplied line break,
accent-colored phrase and decorative dot.

The current portrait is `assets/images/founder-v2.jpeg`, an unchanged copy of the
new root `fondatrice.jpeg`, 1122 × 1402 pixels, with lazy loading and
localized alternative text. It replaces the demo's embedded image. The founder’s
personal name is not inferred from the email attribution. The nursing experience,
Canadian master’s degree and older-adult care experience come from the user’s
supplied biography; no institution, date, certification or clinical guarantee is
invented.

The updated presentation has three layers:

- A three-page book in the pastel-blue panel, on the left of the portrait. Each page
  contains its chapter number, location, heading and a single paragraph: clinical
  work internationally, education in Canada, and founding GlowLink.
- A first-person introduction below the book/portrait, with role, guiding quote,
  concise summary and expandable personal commitment.
- A visible mission panel explaining logistical coordination and health concierge
  services, with a native link back to contact.

The portrait and pastel-blue panel share equal desktop columns with a 500px minimum
height and content-driven expansion. The portrait remains stationary while pages
turn. On small screens it retains the existing 435px portrait-first composition.
All three chapter elements size the same grid cell after enhancement, so the
panel does not jump when a different paragraph or language is shown. Inactive
pages are visually hidden, inert and excluded from assistive reading.

Automatic page turns loop through the chapters, with a reading-progress line and
a delay of 7–12 seconds based on paragraph length. An IntersectionObserver starts
turning only when at least a quarter of the book is visible; unsupported browsers
start without that viewport guard. The first chapter animates immediately on
entering view, before its reading interval. Pointer hover, keyboard focus and
manual navigation do not pause automatic switching. Off-screen or background
documents suspend unnecessary timers and resume when visible. The Play/Pause button was
removed at the user’s request; the progress line remains. Previous/Next and
arrow/Home/End keys remain available;
focus transfers to an enabled control at the first/last chapter.
Previous/Next use borderless text and arrows, with visible keyboard focus.

The page-turn animation uses an optional Web Animations API perspective rotation,
with a pronounced fold and light/shade transition lasting 950ms.
It is cancelled before another turn. Reduced-motion preference disables the
turning animation while automatic chapter changes continue. Changing that
preference cancels any active turn when motion is reduced. Browsers without the
animation API still navigate normally. Automatic
turns are not live-announced; manual navigation announces the chapter and title.
Language changes preserve the current chapter and update labels/status.

The expandable commitment text develops the founder’s relationships with older
people and her focus on listening, empathy and individual needs. Both paragraphs
remain visible without JavaScript. All new copy is available in EN/FR, with
French accents preserved. Chapter headings use H4 beneath a visually hidden H3
and the founder H2. The book controls are hidden without JavaScript, and all
three paragraphs stay readable in sequence. Below 850px the introduction and
mission panels stack. Text height remains content-driven.

`js/founder.js` enhances the vision button, updates expansion/ARIA state and
keeps the correct EN/FR open/close label. Vision text is visible without
JavaScript, with the inactive button hidden. With JavaScript it starts collapsed.
Existing reduced-motion rules apply; portrait hover zoom is suppressed for
reduced motion.

Verification passes: ten contact/founder regression tests, both changed JS syntax
checks,
eight parsed stylesheets with resolved token references, HTML ID/label/ARIA and
fragment checks, all three chapters inside the pastel-blue panel and no-JS fallback,
plus HTTP
and MIME checks for changed runtime files and the portrait. The portrait matches
the user’s original byte for byte. Browser visual/device review remains
outstanding because the connected preview helper was unavailable.
All header navigation destinations, including `#stay`, are now implemented.

## Local preview troubleshooting

Open the site over HTTP, for example `http://127.0.0.1:8080/#founder`, with the
preview server running. A `file:///D:/GLowLink/index.html` address can block the
native JavaScript modules and leave the three fallback chapters static. From
the project folder, start the preview with
`python -m http.server 8080 --bind 127.0.0.1`. The user confirmed a `file://`
preview when reporting absent animation; HTTP page/script responses were then
verified. Browser-rendered animation remains unverified by the agent because the
connected browser helper could not initialize.

The book panel uses brand blue `#D5EAF2`, with a stronger `#C2E1ED` on the
turning pages. Text, navigation, focus and progress use green `#244C42`. A fine
border, inset page edge and soft card shadow define the book beside the portrait.

The card is centered at a maximum width of 1120px with compact book spacing.
The portrait minimum height is 500px on desktop and 360px on mobile; content
can increase the card height as needed. Body text stays at 14px.
