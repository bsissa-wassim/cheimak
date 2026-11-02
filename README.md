# GlowLink

Static website using HTML5, CSS3 and vanilla JavaScript ES modules.
No framework, package installation or browser runtime dependency is required.
Production files are prepared with Node.js: `node scripts/build.mjs`.

The current theme uses green `#244C42` and pastel blue `#D5EAF2`, with white
and light-blue surfaces. Shared tokens also cover the founder book and contact form.

Two linked experiences are now available: `index.html` for **Health & Aesthetic**
and `senior-smile.html` for **Senior & Smile** (dental care coordination and senior
support). The experience selector preserves the chosen language. Senior enquiries
have their own WhatsApp/email draft form; see [the two-page integration](docs/senior-smile.md).
Both experiences now share the same section order and CSS components, including
the full-width photographic hero, five-image service gallery, stay, team profile,
three accompaniment cards, FAQ, contact and the founder's automatic book.

## Current phase

The header, bilingual controls, hero and trust strip are implemented. The contact
section has now been prioritized from Phase 5: the `#quote` form prepares a
WhatsApp message or email draft in EN/FR. The `#procedures` section now presents
five interventions with local illustrative images, bilingual captions and links
that preselect the procedure in the contact form. See [interventions](docs/procedures.md)
and [current image provenance and prompts](docs/procedures-images-realistic.md).
Other content sections remain pending.
The `#stay` section uses a generated Tunisian guesthouse courtyard with no people,
with EN/FR copy and the accommodation-availability qualification. Its traditional
white arches, blue door and terracotta distinguish it from the hero bedroom.
The surgeon profile is implemented at `#surgeon` with the official portrait,
bilingual qualifications and links; see [surgeon integration](docs/surgeon.md).
The `#packages` section presents Essential, Comfort and VIP & Private Care in
EN/FR with enquiry links and the original conditions; see [packages](docs/packages.md).
The `#faq` section adds four bilingual native disclosures and a contact link;
see [FAQ behavior](docs/faq.md).
The founder section follows contact and presents the supplied personal biography
as an automatic three-chapter book in the pastel-blue panel beside the portrait.
It includes a progress line, manual controls, EN/FR copy and a health-concierge mission;
see [founder integration](docs/founder.md).
See [contact behavior and verification](docs/contact.md) and
[header/hero decisions and limits](docs/header-hero.md).
See [the design-system notes](docs/design-system.md) and
[the internal review page](review/design-system.html).

The project lives directly in `D:\GLowLink`, so an additional nested `glowlink/`
directory would be redundant. `audit/` contains source evidence and documentation,
not production dependencies. Do not deploy the audit archive with the website.

## Structure and responsibilities

```text
index.html
css/
  variables.css
  base.css
  layout.css
  components.css
  founder.css
  animations.css
  responsive.css
js/
  main.js
  navigation.js
  animations.js
  language.js
  contact.js
  founder.js
assets/
  fonts/
  images/
  icons/
audit/
docs/
review/
tests/
```

| File | Responsibility |
| --- | --- |
| `index.html` | Semantic, crawlable English markup, metadata, local resources and the module entry point |
| `css/variables.css` | Brand colors, font stacks and semantic type/spacing/layout tokens |
| `css/base.css` | Reset, native element defaults and accessibility foundations |
| `css/layout.css` | Containers, section spacing, grids and alignment |
| `css/components.css` | Reusable links, buttons, labels, cards, disclosures and fields |
| `css/founder.css` | Isolated styles from the supplied founder demo |
| `css/animations.css` | Motion and reduced-motion overrides |
| `css/responsive.css` | Responsive adjustments, loaded last |
| `js/main.js` | Single module entry point and minimal initialization |
| `js/navigation.js` | Navigation enhancements when header markup exists |
| `js/language.js` | EN/FR content, language controls and document language |
| `js/contact.js` | Form validation and WhatsApp/email draft handoff |
| `js/founder.js` | Founder vision disclosure, synchronized with global language |
| `js/animations.js` | Optional observer-driven enhancements |
| `assets/fonts/` | Reserved; the audited fonts are system stacks with no font downloads |
| `assets/images/` | Original images and later responsive derivatives |
| `assets/icons/` | Original favicon/touch icons and future SVG assets as needed |

Navigation, language and contact modules now handle header measurement, EN/FR
switching and quote-draft preparation. Scroll animations remain a later phase.
The founder module handles the supplied section's vision disclosure.
Shared component styles work without JavaScript, including native disclosures.
`review/review.css` styles only the review document and is not a website dependency.

## Local preview

From the project directory, run:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Open http://127.0.0.1:8080/. Stop the server with Ctrl+C.
The component review is at http://127.0.0.1:8080/review/design-system.html.
Use HTTP rather than double-clicking the HTML file: native ES modules require
HTTP serving in typical browser configurations.

## Hosting

Vercel configuration is included in `vercel.json`:

| Setting | Value |
| --- | --- |
| Framework preset | Other |
| Root directory | Project root |
| Build command | `node scripts/build.mjs` |
| Output directory | `dist` |
| Install command | Empty; no dependencies |

The build follows local page, stylesheet, module and asset references from both
HTML entry points. It fails on missing files and copies only the referenced
public files into `dist/`, along with `robots.txt`. Audits, review pages, tests,
documentation, supplied root originals and unused images stay out of the public
output. No SPA rewrite or server-side runtime is required.

Run `node scripts/build.mjs` to prepare the same output locally. Deploy the project
root with Vercel (the configuration supplies the build settings), or upload the
contents of `dist/` to another static host. A Vercel account/project has not been
linked and no deployment has been initiated by this configuration step.

The 17 current regression tests pass. Rendered desktop/mobile browser verification
remains outstanding. The contact forms prepare WhatsApp/email drafts and do not
submit to a backend. Current source PNGs are large; image compression is a further
performance improvement rather than a hosting requirement.

## Decisions carried forward from the audit

- Arial body/interface and Georgia editorial headings; no substituted web font.
- All ten root colors match the deployed reference, not approximations.
- Shared typography, spacing, grids and component styles are implemented.
- Supporting text is larger and uses darker existing source shades; form
  controls use 16px text. See the design-system notes for all refinements.
- Brand colors in the reference differ from the brief's historical values;
  preserve the deployed identity unless a change is explicitly approved.
- Original images and icons are copied locally; framework bundles stay in `audit/`.
- The supplied GL monogram is integrated in the header, with proportional CSS
  framing and a matching opaque background; the original file is retained.
- Preserve medical qualifications, real contact destinations and the draft-based
  enquiry workflow when those sections are implemented.

## Validation and next phase

Phase 2 checks passed: all 16 page/style/script/icon HTTP resources returned
200, all five JavaScript files passed syntax checks, module import paths resolve,
and script responses have a JavaScript MIME type. All six copied image/icon
assets match the originals byte for byte. The shell contains one H1 and has no
framework or external runtime resources. Browser execution, visual review and
Lighthouse have not been verified.

Phase 3 checks passed: seven CSS files parse, required token references resolve,
both HTML documents have unique IDs and matching fragment/label targets, and
all 20 review-page resources return HTTP 200 with correct CSS/JS MIME types.
All 40 distinct CSS color literals come from the audited reference. Tested
small-text color pairs have at least 5.33:1 calculated contrast across the
declared light surfaces. These checks do not establish a rendered browser review.

Phase 4 adds the original header/hero and the trust-strip destination. EN/FR
switching includes metadata, accessibility labels and image alternative text.
Syntax, CSS parsing/token references and all 20 HTTP resources pass. Unit DOM
fixtures cover 25 paired translation keys, 28 hooks, delegated controls and the
header-height observer/fallback. Hero preload, priority and dimensions are
checked in source. These are not rendered-browser interaction/layout tests.
The contact section now resolves the quote destination. Its three regression
tests pass (`node --test tests/contact.test.mjs`, Node.js 22+), covering localized
and encoded draft generation, validation gates, manual fallback, stale-draft
clearing and mobile-CTA behavior using DOM fixtures. Current source checks pass:
five JavaScript files, seven CSS files, form labels/ARIA references and 22 static
HTTP resources. No enquiry is submitted during these checks.

All header navigation destinations are now implemented. The
rendered-browser review still remains outstanding; see
`audit/GlowLink-Design-Audit.md` for the evidence and limitation.

Founder integration checks pass: five combined contact/founder tests, eight CSS
files, scoped founder rules, unchanged supplied portrait and 25 static HTTP
resources. The repeated founder wordmark and ABOUT/OUR STORY labels were removed
at the user's request. Visual browser verification remains outstanding.

Intervention integration checks pass: six combined contact/founder tests,
including procedure selection without losing existing enquiry details or
launching a draft. The five local PNG illustrations are lazy loaded with their
intrinsic dimensions declared. Image provenance is recorded in the project documentation.
Image optimization and rendered-browser verification remain outstanding.

The current gallery uses five photorealistic human illustrations in the same
style as the nose portrait: ivory backgrounds, natural skin texture, cream/sage
clothing and fine sage contour lines. Four local `-realistic.png` files replace
the mannequins; `rhinoplasty-surgical.png` remains the reference nose image.
Earlier versions are retained. EN/FR image alternatives and intrinsic dimensions
match the current files. See [prompts and provenance](docs/procedures-images-realistic.md).

Surgeon integration checks pass: six regression tests, six JavaScript syntax
checks, eight CSS files, HTML references/image dimensions and 32 local HTTP URLs.
The portrait is an unchanged local copy from the doctor's official website.
Rendered-browser verification remains pending; see [surgeon notes](docs/surgeon.md).

Package integration checks pass: six regression tests, JavaScript syntax, eight
CSS files, HTML references and 32 local HTTP URLs. All three offers retain their
source inclusions and conditions; enquiry buttons use native contact links.
Browser layout verification remains pending; see [package notes](docs/packages.md).

FAQ integration checks pass: six regression tests, language-module syntax, eight
CSS files, HTML references and HTTP checks for all five changed runtime files.
Four native disclosures work independently of JavaScript; rendered-browser
interaction/layout verification remains pending. See [FAQ notes](docs/faq.md).

Founder book checks pass: ten regression tests covering page navigation,
language changes, focus, autoplay/visibility/pause behavior, reduced motion and
animation fallback. CSS, HTML, portrait integrity and changed HTTP resources
also pass source checks. Rendered-browser verification remains pending.
