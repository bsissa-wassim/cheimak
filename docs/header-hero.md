# Phase 4 — Header and hero

## Implemented

`index.html` now contains the original lowercase wordmark and supplied monogram,
sticky header, five-item section navigation, EN/FR buttons, quote CTAs, full-width
hero and the existing trust strip immediately below it. The trust strip gives
the hero's experience/scroll links a real local destination.

The hero keeps the existing English and French copy and uses the coastal-bedroom
photograph supplied by the user from the project root. It retains the
Mediterranean direction, Tunis-to-North-America detail and geographic coordinates.
No new medical claims were added. The supplied monogram and coastal-bedroom
photograph are integrated; both original reference photographs remain archived.
The trust strip repeats the
reference's existing statements; the audit's qualification about independent
verification of medical claims still applies.

## Design and responsive decisions

- Arial/Georgia, the audited sage/champagne identity, thin separators and square
  buttons remain. At the user's request, the supplied GL monogram replaces the
  reference's sparkle SVG. Live GlowLink text remains beside it. CSS frames the
  original PNG without distorting it; the header uses its matching #F7F5F0 canvas
  color so no rectangular image background is visible.
- At the user's request, the desktop header is compact: a 64px minimum inner
  height, smaller proportional monogram, 22px GlowLink wordmark, tighter link
  spacing and a text-only quote CTA. The 1280px wide alignment is retained.
  The hero copy aligns to the 1120px content container.
- Hero text has a maximum 640px measure independent of the container's left
  padding. This corrects the reference's border-box text-width constraint while
  retaining its composition and fluid heading range.
- The original shade stops are preserved. Copy is placed on the quieter left
  side of the supplied photo. Mobile image positioning follows the reference.
- At 1000px the navigation moves to a horizontally scrolling second row. This
  begins earlier than the reference's 760px change to accommodate the larger
  12px navigation text, 44px language targets and longer French labels.
- At 600px the header quote button is hidden to leave room for the logo and
  accessible language buttons. Hero and fixed mobile quote CTAs remain visible
  according to their normal layout. At 760px and below the bottom quote CTA uses
  the original fixed pattern, with device safe-area spacing and body clearance.
- Hero height is a minimum, never a fixed content clip. Copy and actions wrap;
  the mobile footer can also wrap instead of reducing text below 12px.
- The mobile trust strip preserves the original horizontal scrolling pattern.
  Navigation and trust scrollbars remain discoverable rather than being hidden.
- The two-row tablet/mobile header has only 4px top padding and no extra nav-row
  padding. Links and language controls retain 44px minimum target heights. Static
  anchor-offset fallbacks are 65px on desktop and 96px below 1000px; JavaScript
  still measures the real header after layout/language changes.

The exact crops, line breaks, text contrast over the photo and fit at desktop,
tablet, mobile and enlarged text still need rendered browser review.

## Interactions

`js/language.js` owns the EN/FR dictionaries and delegates language-button clicks.
All Phase 4 copy, accessibility labels, hero alternative text, document language,
page title and description update. Text changes target dedicated spans rather
than replacing links or SVGs. Unsupported locales leave the document unchanged.
Like the original, language selection is in memory and reload returns to English.

English content is server-readable HTML. With no JavaScript, the decorative
language-control space stays reserved but its controls are hidden; the English
page and native navigation remain available. The component review has no language
group and is therefore unaffected by initialization.

`js/navigation.js` measures actual header height and exposes `--header-height`
for scroll offsets. Resize Observer responds to wrapping, language and font-size
changes. A native resize/language-event fallback handles browsers without that
API. No scroll loop, menu state machine or third-party code is required.

The hero image is now a native image with intrinsic dimensions, high fetch
priority and an early preload. It is the supplied, unmodified 2.46 MB PNG; responsive
conversion and measured performance belong to Phase 7. Its new descriptive alt
text describes the scene without asserting a confirmed hotel or location.

## Section destinations

The quote/contact section has since been prioritized from Phase 5. All `#quote`
CTAs now target its form; see `docs/contact.md` for the draft-based workflow.
The other existing destinations are `#top`, `#main-content` and `#experience`.

The original `#procedures`, `#stay`, `#surgeon`, `#packages` and `#faq` links are
retained for their later sections. Those five destinations remain unimplemented.
No dummy sections or external redirects conceal that phased work. The complete
website is not ready for publication.

## Verification

At the Phase 4 checkpoint: all five JavaScript files passed syntax checks; all seven stylesheets
parse and required token references resolve. Both HTML documents have one H1
and unique IDs. All 20 page/style/module/icon/image resources return HTTP 200
with correct CSS/JavaScript MIME types. Hero dimensions, high priority and the
matching preload are verified in markup.

Unit-level DOM fixtures built from the real markup exercise 25 paired EN/FR
keys and 28 translation/control hooks, metadata, alt/ARIA attributes, selected
button states, delegated clicks, unsupported locales, header-height updates and
the Resize Observer fallback. These checks passed. They are not browser execution
or viewport-layout tests.

Browser inventory returned no available browser surface. No desktop, tablet or
mobile screenshots, computed-style checks or live interaction results are claimed.
Source, CSS syntax, translation/module logic and HTTP checks are recorded in
the README. Visual approval remains outstanding before declaring Phase 4 fully
reviewed. Review at 1440, 1024, 1000, 768, 760, 600, 390, 375 and 320px widths,
in both languages, with keyboard navigation and enlarged browser text.
