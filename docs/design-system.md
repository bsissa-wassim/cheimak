# GlowLink design foundation — Phase 3

## Scope

The six CSS files now contain the shared design system. The header, hero and
complete website sections are separate phases. `index.html` now includes the
Phase 4 header/hero; `review/design-system.html` is an internal component review,
marked `noindex, nofollow`, with no enquiry submission. Exclude `review/`,
`docs/` and `audit/` when publishing the website.

The review page can be opened at `/review/design-system.html` through the
static server described in the project README. It includes palette swatches,
type samples, buttons, image frames, all five procedure items, three package
presentations, native disclosures and native field samples.

## Palette and semantic tokens

`css/variables.css` defines the green and pastel-blue theme:

| Token | Value | Role |
| --- | --- | --- |
| `--brand-green` | `#244C42` | Headings, primary buttons, founder text |
| `--brand-blue` | `#D5EAF2` | Contact, FAQ, featured package, panel accents |
| `--brand-green-dark` | `#193C33` | Button hover and photographic overlays |
| `--brand-green-soft` | `#386B60` | Secondary green accents |
| `--brand-blue-light` | `#EDF6FA` | Header, stay and packages surfaces |
| `--brand-background` | `#F7FBFC` | Page background |
| `--brand-line` | `#B9D0D4` | Decorative rules |
| `--brand-muted` | `#4D6962` | Supporting text |

Semantic `--color-*` aliases cover surfaces, text, borders, buttons, focus,
selection, header, hero and footer. The founder section uses the same global
palette. Its book uses pastel blue with stronger `#C2E1ED` pages and green text,
navigation and progress. Its commitment button retains a green focus outline. Photographs and
the supplied logo artwork remain unchanged.

Small text uses dark greens on light surfaces. Input borders use `#65877F`,
separate from decorative rules. Focus uses a two-pixel green outline with a
four-pixel offset; the hero uses white focus outlines over the photograph.
Calculated contrast checks do not replace rendered accessibility testing.

## Typography

The exact source stacks remain:

```css
--font-body: Arial, Helvetica, sans-serif;
--font-editorial: Georgia, "Times New Roman", serif;
```

There are no downloaded fonts or new font weights. The source's 400, 600 and
700 weights are available as tokens. Editorial headings remain regular Georgia.

| Token / role | Value at a default 16px root |
| --- | --- |
| `--text-display` | `clamp(51px, 6.5vw, 82px)` |
| `--text-heading` | `clamp(36px, 4.3vw, 54px)` |
| `--text-intro` | `clamp(30px, 3vw, 40px)` |
| `--text-feature` | `clamp(38px, 4.1vw, 55px)` |
| `--text-quote` | `clamp(41px, 4.5vw, 59px)` |
| `--text-card` | 25px |
| `--text-procedure` | 19px |
| `--text-question` | 17px |
| `--text-lead` | Fluid 15–17px |
| `--text-body` | 14px |
| `--text-small` | 12px |
| `--text-control` | 16px |

CSS uses rem units for these values so browser text preferences remain relevant.
Editorial heading tracking stays at −0.045em, labels at +0.18em. Display line
height is 0.99, general headings 1.07 and body copy 1.8.

Compared with the reference, supporting text is larger and darker. Form controls
are 16px rather than 11px. The display scale retains the original desktop range
and runs continuously across mobile widths instead of jumping at 760px/390px.
Final EN/FR hero wrapping must be reviewed when the hero exists in Phase 4.

Use semantic heading elements for document structure. The `heading-display`,
`heading-intro`, `heading-feature` and `heading-quote` classes provide visual
sizes without forcing a particular heading level.

## Spacing and layout

The spacing scale is 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 112 and
120px at the default root size. It regularizes the reference's spacing without
adding oversized empty sections. Fluid section padding is 68–112px.

| Primitive | Responsibility |
| --- | --- |
| `section-shell` / `site-shell` | 1120px maximum width; fluid 22–32px side gutters |
| `section-shell--wide` | 1280px maximum width |
| `section-shell--narrow` | 680px maximum width |
| `section` / `section--compact` | Normal fluid / compact 48px section padding |
| `flow` | Consistent block rhythm, configurable with `--flow-space` |
| `copy-measure` | Restrained 43ch paragraph width |
| `grid` and `grid--two/three/four` | Shared equal-column grids with fluid gaps |
| `split` / `split--editorial` | Balanced or 40/60 image/text composition |
| `inline-group` | Wrapping rows for links/actions |
| `procedure-list` | Five-column ruled strip; two columns at ≤760px |
| `form-grid` / `form-field--wide` | Two-column fields with full-width options |

At 760px, two/three-column and split layouts become single-column, four-column
grids become two-column, forms stack and the fifth procedure spans the row.
At 390px, the four-column primitive becomes single-column. A 1000px breakpoint
tightens package padding. These retain source breakpoints as a starting point;
rendered content may justify targeted adjustments in later phases.

Grid tracks use `minmax(0, …)` and direct children can shrink. Labels wrap,
buttons allow wrapping, and controls use available width. Image frames reserve
their ratio; original image elements specify dimensions in the review page.
The default frame ratio is 1.49 and the wide variant is 1.608, derived from the
original photos. Neither is a finalized full-bleed hero crop.

## Components

| Component | Behavior and geometry |
| --- | --- |
| `skip-link` | Keyboard-visible link to main content |
| `nav-link` | 44px minimum block target; dark text; gold hover underline |
| `button` | Square, sage, at least 48px high; optional inline SVG |
| `button--light` / `button--outline` | Original light CTA / bordered presentation |
| `text-link` | Dark-sage text and restrained arrow treatment |
| `eyebrow` | Uppercase, tracked, 12px label |
| `image-frame` | Ratio-reserved, cover-cropped original photography |
| `procedure-item` | Number, circled arrow, serif name, sans descriptor, thin rules |
| `package-card` | Square white presentation; optional featured border/shadow |
| `check-list` | CSS-drawn decorative checks and readable list text |
| `accordion__item` | Native details/summary with optional decorative chevron |
| `field` / `field-control` | Explicit labels, 48px controls and visible focus |
| `checkbox-field` | Native checkbox and clickable wrapping label |
| `notice` / `form-privacy` | Quiet supporting information and readable disclosures |

The review-page links navigate locally to component examples. Native disclosures
and fields are operable without JavaScript. There is no form submit button or
contact handler on the review page. Package inclusions use original source copy
and retain the assessment/availability qualification.

## Motion

The source-like 200ms button/link/chevron feedback is centralized in
`css/animations.css`. Procedure hovers change background rather than padding,
avoiding the reference's layout-affecting hover. Pointer-only effects are inside
`@media (hover: hover)`. Reduced motion removes transitions, animation, hover
translation and smooth scrolling; disclosure state indicators still change.

No entrance reveals, image zoom, parallax, observers or JavaScript loops are
introduced in this phase. Their later implementation must leave content readable
without JavaScript.

## Verification limits

Completed checks: all seven stylesheets (including review-only styles) parse
without errors; required CSS token references resolve; all 40 distinct color
literals match colors present in the audited source after normalizing hex
notation. At the Phase 3 checkpoint, both HTML documents had one H1, unique IDs, valid local fragment
targets, matching explicit label targets and existing referenced resource paths.
All 20 page/style/script/icon/image HTTP resources return 200 with correct
CSS/JavaScript MIME types. Phase 4's intentional pending section destinations
are documented separately in `docs/header-hero.md`.

Across the five declared light surfaces, the tested normal-text color pairings
have a minimum calculated contrast of 5.33:1. White primary-button text is
7.54:1; control boundaries on white are 4.35:1. These results apply only to those
opaque source-color pairs, not overlays or unimplemented sections.

The browser inventory still reports no enabled browser. CSS syntax, token
references, HTML structure, resources and mathematical color contrast can be
checked here; visual screenshots, computed typography, keyboard/screen-reader
behavior, mobile overflow and Lighthouse cannot be signed off yet.

Before final visual approval, inspect the review page at 1440px, 1024px, 768px,
760px, 390px and 375px, plus increased browser text size, keyboard focus and
reduced motion. Header/hero work and its remaining visual review are described
in `docs/header-hero.md`.
