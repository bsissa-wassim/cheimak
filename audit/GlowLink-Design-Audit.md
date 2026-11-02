# GlowLink Design Audit — Phase 1

Reference: https://glowlink-seven.vercel.app/  
Audit date: 24 October 2026  
Scope: existing design, content, source assets and interaction logic. No website implementation.

## Finding and verification status

Preserve the existing pairing of **Georgia editorial headings and Arial interface/body text**, the warm off-white surfaces, muted green controls, champagne details, Mediterranean accommodation imagery, and restrained ruled layouts. The source is already close to the requested visual direction. Refinement should concentrate on readability, composition, image delivery and interaction feedback.

The deployed CSS uses **#405A4C** for the main dark sage and **#BBA77D** for gold. The brief's **#45594D** and **#B5A784** do not appear in the retrieved stylesheet. This is a real difference between the known brand references and this deployment; do not silently replace the deployment's colors during reproduction.

**Verified:** live HTTP retrieval of HTML, the linked CSS, all seven linked JavaScript chunks, both CSS-referenced photographs and four declared icon files. Original photographs were visually inspected. HTML anchors, CSS declarations, localization dictionaries and contact logic were inspected directly. Source snapshots and hashes accompany this report.

**Not verified:** the rendered page, computed styles, actual platform font selection, viewport screenshots, keyboard/screen-reader operation, live EN/FR clicks, draft opening, network waterfall, Lighthouse or Core Web Vitals. Browser inventory returned no available surfaces; attempts to open Chrome and the in-app browser both returned unavailable. Web retrieval tools could not open the URL, but direct Node HTTP retrieval succeeded. All dimensions below are **CSS declarations or explicitly labeled arithmetic derived from them**, not browser measurements. This report is the source-and-asset audit; Phase 1's rendered review remains outstanding. No findings below should be represented as passed browser tests.

## 1. Evidence and existing implementation

The reference is a Next.js/React application with Turbopack chunks and generated utility CSS. Its main visual rules are custom class rules after the generated CSS layers. The future HTML/CSS/vanilla-JavaScript restriction applies to the rebuild, not to this reference.

Primary evidence:

| Evidence | Purpose |
| --- | --- |
| `reference.html` | Server-delivered English markup, section order, metadata, link targets, labels and form fields |
| `29him74hxu3x8.css` | Exact deployed CSS, including responsive rules and custom properties |
| `brand-styles-readable.txt` | Readable derivative of the custom CSS for review; the original remains authoritative |
| `2pylnqsx19y71.js` | EN/FR content, language state, form behavior and page component |
| `025093854zscm.js` | Shared code, including the Vercel Analytics integration |
| `reference-content-en.txt` | Extracted English text for content comparison; consult HTML for structure |
| `asset-manifest.json` | Retrieved media paths, HTTP status, dimensions and byte sizes |
| `audit-evidence.json` | SHA-256 hashes, asset/source sizes, anchor checks, full custom hex palette and contrast calculations |

Source links: [deployed page](https://glowlink-seven.vercel.app/), [stylesheet](https://glowlink-seven.vercel.app/_next/static/immutable/chunks/29him74hxu3x8.css), [application JavaScript](https://glowlink-seven.vercel.app/_next/static/immutable/chunks/2pylnqsx19y71.js). These chunk URLs identify this snapshot and may change with a later deployment.

## 2. Typography

### Exact families and font delivery

| Role | Declared family |
| --- | --- |
| Body, buttons, inputs, selects and textareas | `Arial, Helvetica, sans-serif` |
| Hero and editorial H2 headings | `Georgia, Times New Roman, serif` |
| Procedure names, surgeon name, package names, journey headings and FAQ questions | `Georgia, Times New Roman, serif` |
| Wordmark | Inherited Arial stack, 600 weight |

There is **no `@font-face`**, font-file URL, external font stylesheet or font preload in the retrieved page/CSS. No WOFF, WOFF2, TTF or OTF asset is referenced. The fonts are supplied by the visitor's system. Available proprietary font files and licensing cannot be inferred from that. Do not download or fabricate local font files for Phase 3 without an appropriate source and license.

The generated theme contains a system sans stack starting with `-apple-system`, but the later explicit body and form-control declarations override that for the visible page. It is not evidence that Inter, Mulish, Muli or Poppins is used. None should be substituted.

Arial/Georgia are the first choices; actual glyph rendering depends on installed fonts and fallbacks. No browser-level resolved font was available for verification.

### Type specifications

| Element | Desktop source | At ≤760px / ≤390px | Weight, spacing and line height |
| --- | --- | --- | --- |
| Wordmark | 24px | 21px | 600; −0.08em; inherited 1.5 line height |
| Main navigation | 12px; 10px at ≤1000px | 10px | 400; inherited 1.5 |
| Language buttons | 11px | 11px | Active 700; inactive 400 |
| Hero eyebrow | 10px | 10px | 600; uppercase; +0.17em; inherited 1.5 |
| Hero H1 | `clamp(51px, 6.5vw, 82px)` | `clamp(54px, 12vw, 76px)`; 51px at ≤390px | 400; −0.045em; 0.99 |
| Hero body | 15px | 13px | 400; 1.8 |
| General eyebrow | 9px | 9px | 700; uppercase; +0.18em; inherited 1.5 |
| Difference H2 | `clamp(30px, 3vw, 40px)` | 31px | 400; −0.045em; 1.12 |
| General section H2 | `clamp(36px, 4.3vw, 54px)` | 40px | 400; −0.045em; 1.07 |
| Stay H2 | `clamp(38px, 4.1vw, 55px)` | 43px | 400; −0.045em; 1.04 |
| Surgeon H2 | Same desktop rule as stay | 41px | 400; −0.045em; 1.04 |
| Quote H2 | `clamp(41px, 4.5vw, 59px)` | 47px | 400; −0.045em; 1.02 |
| Difference body | 13px | 12px | 400; 1.9 |
| General heading body | 13px | 13px | 400; 1.8 |
| Stay/surgeon body | 13px | 13px | 400; 1.9 |
| Procedure name | 19px | 18px | 400; 1.16 |
| Procedure description | 10px | 10px | 400; inherited 1.5 |
| Surgeon name | 23px | 23px | 400; inherited 1.5 |
| Package name | 25px | 24px | 400; −0.03em; 1.14 |
| Package points/subtitle | 10px | 10px | Points 1.6; subtitle inherited 1.5 |
| Journey H3 | 20px | 18px | 400; 1.2 |
| Journey body | 10px | 10px | 400; 1.8 |
| FAQ question | 17px | 15px | 400; inherited 1.5 |
| FAQ answer | 11px | 10px | 400; 1.85 |
| Quote body | 12px | 12px | 400; 1.85 |
| Form labels / input text | 10px / 11px | Same | 400; inherited 1.5 |
| Button | 12px | Header 9px; main buttons 12px | 600; inherited 1.5 |
| Form privacy / footer legal | 9px | 9px | 400; 1.6 / 1.7 |

Other distinctive microtype: hero location 10px, +0.07em (9px mobile); scroll prompt 9px, +0.12em; hero caption 8px, +0.15em; footer labels 8px, +0.15em. The design's character comes from large, tightly tracked regular-weight serif headings alongside unusually small sans-serif supporting text.

The stylesheet resets heading weights, so regular Georgia is intentional. Observed declared page weights are 400, 600 and 700, with native select-option behavior and utility rules also present. No downloadable font weight set exists in the source.

## 3. Exact color inventory

### Root palette

| Token | Exact value | Existing role |
| --- | --- | --- |
| `--background` | #FBFAF7 | Main warm off-white page |
| `--foreground` | #26332D | Main dark green text |
| `--sage` | #657D6E | Icons, secondary green, focus borders, featured package border |
| `--sage-dark` | #405A4C | Primary buttons, wordmark, links and active language |
| `--sage-pale` | #EDF1EB | Stay/FAQ surfaces, procedure arrow circles, outline hover |
| `--cream` | #F7F5EF | Clinic information surface |
| `--gold` | #BBA77D | Wordmark accent and selected hover/icon details |
| `--rose` | #F3E9E6 | Declared; no use found in custom page rules |
| `--line` | #E4E5DE | Primary separators and borders |
| `--muted` | #747B73 | Main supporting copy |

### Surfaces, buttons and borders outside root tokens

| Role | Exact values |
| --- | --- |
| White panels, trust strip, fields | #FFFFFF |
| Header surface / bottom line | #FBFAF7F7 / #26332D12 |
| Hero fallback background | #65786C |
| Light hero CTA / hover | #F8F6EE / #FFFFFF |
| Primary/header button hover | #32483B |
| Procedure hover | #F4F5F0 |
| Package section | #F3F2EC |
| Quote section | #E9EEE8 |
| Stay notice panel | #FFFFFF9E |
| Footer | #27372E |
| Brand / intro circle border | #D8DDD5 / #D9DFD6 |
| FAQ rules | #D8DED6 |
| Outline button / step circle / step connector | #D7DDD5 / #D7DDD4 / #E1E4DD |
| Field border / mobile nav rule | #E1E5DE / #EEEEE8 |
| Footer brand circle / legal rule | #FFFFFF3B / #FFFFFF26 |
| Text selection background / foreground | #D8E2D7 / #26332D |

### Text and decorative variants

| Role | Exact values |
| --- | --- |
| Navigation / trust strip | #566159 / #59665E |
| General eyebrow / hero eyebrow | #8D927F / #EEE9DC |
| Inactive language / slash | #8A9089 / #B2B4AD |
| Procedure numbers / descriptions | #A5A99F / #898E85 |
| Lists / package points | #58635B / #5F685F |
| Stay note / surgeon emblem caption | #72796E / #737D72 |
| Clinic small text / package index / package subtitle | #82877E / #A3A79D / #7B8179 |
| Medical/package disclaimers | #838980 |
| FAQ body / quote body / response note | #717970 / #6E786F / #627367 |
| Form label / invalid select / checkbox label / privacy | #59645B / #92978E / #737C73 / #969A91 |
| Hero paragraph / secondary link | #FFFFFFD9 / #FFFFFFE6 |
| Hero location / scroll / caption | #FFFC / #FFFFFFBF / #FFFFFFAB |
| Hero decorative champagne | #D5C39B |
| Footer main / brand / wordmark gold | #F6F5EF / #F8F7F1 / #CBB98F |
| Footer paragraph / labels / links | #BBC3BA / #A9B5AA / #F1F1E9 |
| Footer legal / copyright / privacy summary | #AAB4AA / #C5CABF / #E9EDE7 |

The machine-readable evidence includes the complete unique custom hex list, including transparent values. Generated utility styles additionally declare destructive red #B63C3C and lab/alpha variants; these were not found on the main page's rendered HTML classes and are not a new GlowLink brand color.

### Overlays and shadows

- Desktop hero: left-to-right gradient `#1A2A22C2 0%`, `#1A2A228A 36%`, `#1A2A2214 75%`; second gradient transparent through 68%, then `#18251F4F 100%`.
- Mobile hero: `#1A2A22BF` to `#1A2A2259 80%`; second gradient transparent through 45%, then `#18251F61`.
- Stay photo: transparent to `#21332914`.
- Form focus ring: `0 0 0 2px #657D6E1F`.
- Featured package shadow: `0 15px 40px #2F433617`.
- Form panel shadow: `0 10px 40px #2A3A2F0F`.
- Mobile fixed CTA shadow: `0 7px 22px #1A2A223D`.
- Surgeon emblem uses #EDF1EB, white, transparency, and #657D6E1F/#657D6E2B rings.

The reference does use restrained functional image gradients and a radial emblem. Preserving those is consistent with avoiding unnecessary new gradients.

## 4. Layout, geometry and responsive behavior

### Header and hero

- Header: sticky, top 0, z-index 20; desktop height 82px; flex row; logo left, navigation centered, language and CTA right; gap 26px.
- Header/footer horizontal inset: `max(5.25vw, 50vw - 640px)`, which aligns a maximum 1280px inner region on wide screens. At ≤1000px the header instead uses 28px side padding.
- Desktop navigation gap: `clamp(16px, 2.1vw, 32px)`; 14px at ≤1000px.
- Brand mark: outlined circle 34×34px, 17px sparkle SVG at 1.4px stroke; logo gap 10px. Mobile circle 30×30px.
- Hero: full width; minimum height `clamp(550px, 67vw, 700px)`, not a fixed height. Its content may make it taller.
- Hero image: cover; position `50% 53%`; scale 1.01; full-bleed background with separate shade layer.
- Hero copy: `width:min(620px,60%)`; padding top `clamp(82px,11vw,142px)`, bottom 122px and left `max(10.2vw,50vw - 560px)`. Global border-box means this width includes the inset; it is not a 620px text measure.
- H1 margin 27px above / 22px below; paragraph maximum width 430px. Hero CTA row margin-top 34px and gap 28px; location margin-top 54px.
- Hero footer: scroll prompt bottom 29px; right-side editorial label and coordinates bottom 30px with 34px gap.
- Trust strip: white, bottom rule, 24px padding, icon/text row and a fluid 30–126px gap.

### Main section system

| Section | Desktop rules | At ≤760px |
| --- | --- | --- |
| Shared shell | `min(1120px,100% - 64px)` | `100% - 44px` |
| Difference | 66px / 1fr / 1fr; gap 25px; top/bottom 100/86px | 45px / 1fr; gaps 12/16px; 68/62px; body beneath heading in column 2 |
| Procedures | 5 equal columns; margin-top 40px; ruled edges; min-height 178px per item; section top/bottom 25/112px | 2 columns; fifth spans both; 145px minimum; 30px grid margin; section 8/73px |
| Stay | Full-width 1fr/1fr; photo min-height 590px; copy padding 80px and `clamp(44px,8vw,112px)` | Stacked; photo min-height 340px; copy padding 58px 24px 66px |
| Surgeon | 40% / 1fr plus 8% column gap; 120/120px | Stacked; gap 42px; 76/78px |
| Surgeon emblem | Circular, square aspect, max 330px; decorative inner rings | Max `min(250px,72vw)` |
| Credentials | 2 equal columns; gap 13px 22px | Still 2 columns; 13px gap; 9px text |
| Packages | Background band; 105/110px; 3 columns; 18px gap; grid margin-top 50px | 75/78px; 1 column; 13px gap; margin-top 32px |
| Package panel | Min-height 415px; padding 34px 30px 30px | Auto minimum; padding 28px 23px 23px |
| Journey | 110/115px; 4 columns; 27px gap; grid margin-top 56px | 76/80px; 2 columns; gap 32px 18px; margin-top 38px |
| FAQ | 104/110px; .7fr / 1fr; 9% gap; heading sticky at top 120px | 74/78px; 1 column; gap 30px; heading static |
| Quote | Padding 110px 32px; inner max 1080px; .82fr / 1.18fr; 9% gap | Padding 74px 22px; 1 column; gap 32px |
| Form | White panel padding 32px; 2 field columns; gap 15px 14px | Panel 23px 18px; 1 column; full-width submit |
| Footer | 58px top / 24px bottom; 1.3fr / 1fr / .7fr; gap 70px | 47px top / 87px bottom; 2 columns; brand full-width; single column at ≤390px |

At ≤1000px the shell becomes `min(100% - 56px,900px)`, stay copy side padding 48px, package side padding 22px and quote gap 6%. Shell sizing therefore changes at 1000px as well as 760px.

### Responsive breakpoints and mobile navigation

- **1000px:** tighter desktop/tablet header and layout spacing.
- **760px:** most major layouts stack; the navigation becomes a second, horizontally scrollable row. There is **no hamburger menu or mobile drawer** in the current implementation.
- Mobile header: wraps, auto height, minimum 72px, padding 13px 20px 0. Its actual two-row height is not established by the minimum.
- Mobile hero: minimum `calc(88svh - 72px)`; image position 57% (vertical defaults to center); copy width 90%, padding top `clamp(85px,21vw,145px)`, sides 24px, bottom 115px. Stay image position becomes `50% 59%`.
- Mobile hero actions wrap; the editorial caption hides its first text item but retains coordinates.
- Trust highlights become a horizontally scrolling row with hidden scrollbar.
- Fixed mobile CTA: z-index 19, 48px high, left/right 14px, bottom 12px, visible throughout the page at ≤760px.
- **390px:** H1 becomes 51px, the header actions tighten and the footer becomes one column.
- Anchor offset: 96px desktop / 116px mobile. Compare against actual wrapped header height in the pending browser review.

### Source-derived sizing examples, not rendered measurements

| Viewport width | Shared shell width | Hero H1 | Hero minimum height |
| --- | --- | --- | --- |
| 1440px | 1120px | 82px | 700px |
| 1024px | 960px | 66.56px | 686.08px |
| 768px | 712px | 51px | 550px |
| 390px | 346px | 51px | Depends on viewport height: `88svh - 72px` |
| 375px | 331px | 51px | Same mobile formula |

The hero H1 rule jumps at the 760px breakpoint (the mobile formula is larger), and changes again at 390px. Those are useful visual-review points; they are not proof of overflow.

### Shared visual patterns

Mostly square corners for buttons, image regions, cards and fields. Circles are reserved for the logo, section mark, procedure arrows, journey numbers and surgeon emblem. Although `--radius:.65rem` exists in generated utilities, the main page is not a rounded-card design.

Buttons: 1px transparent border, 15px vertical / 20px horizontal padding, 14px internal gap, 15px arrow; the header uses 12px / 16px padding. No custom button border radius is declared. Form fields are explicitly radius 0, minimum 43px high, with 11px / 12px padding; textarea minimum 84px.

Procedure presentation is a single numbered editorial strip, not five image cards. Journey markers are 38px circles with thin horizontal connectors on desktop. The Comfort package is distinguished by a sage border, slight shadow, dark CTA and top-right popularity ribbon. Stay uses the strongest image/text split; the surgeon profile uses an emblem rather than a portrait.

## 5. Photography and brand assets

| Asset | Verified size | Existing use |
| --- | --- | --- |
| `/glowlink-tunis-recovery.png` | 1312×816; 1,580,863 bytes; PNG | Hero background; ratio about 1.608:1 |
| `/glowlink-tunis-terrace.png` | 1264×848; 1,932,911 bytes; PNG | Stay background; ratio about 1.491:1 |
| `/icon-light-32x32.png` | 32×32; 566 bytes | Light-scheme favicon |
| `/icon-dark-32x32.png` | 32×32; 585 bytes | Dark-scheme favicon |
| `/icon.svg` | 1,304 bytes | SVG favicon |
| `/apple-icon.png` | 180×180; 2,626 bytes | Apple touch icon |

Both photographs and all icons returned HTTP 200. Total photograph payload is **3,513,774 bytes**: approximately **3.51 MB** decimal / **3.35 MiB**. These are downloaded file sizes, not a complete browser transfer budget.

The hero source shows a warm cream bedroom with a sage bed throw, wood-framed glazing, plants, balcony and a water view. It provides quiet space on the left, where the deployed text and gradient sit. The stay image shows a terrace and infinity pool, olive trees, natural stone/wood, calm water and a distant waterfront skyline. Together they establish hospitality and recovery rather than operating-room imagery.

Their filenames and labels associate them with Tunis/Tunisia, but the files alone do not verify a real hotel, photographer, geographic location, image license or photographic provenance. Do not present them as a confirmed accommodation partner. Keep the current availability qualification.

No procedure images, surgeon portrait, testimonials, before/after imagery, clinic logos or separate header logo file are referenced by the page. This is an inventory of referenced assets, not a claim that no other file exists on the server.

The on-page identity is live text plus an inline **Lucide sparkle SVG** inside an outlined circle. Other icons are inline Lucide-style outline SVGs with round caps/joins. Preserve these SVG shapes and the current wordmark proportions; there is no evidence of a different hidden logo asset.

The requested future photographic procedure presentation would be a deliberate enhancement requiring suitable new assets. It cannot be described as reproduction of existing procedure photography.

## 6. Content inventory and constraints

| Section | Existing content and behavior |
| --- | --- |
| Header | Brand home anchor, five section links, EN/FR buttons, free-quote CTA |
| Hero | Existing glow-up headline, coordinated aesthetic-care/Mediterranean message, quote and experience links, Tunis-to-Canada/USA location, coordinates |
| Trust strip | Surgical experience, personal coordination and Tunis location; extra section before Difference |
| Difference | Brief personal-coordination statement; sparkle mark, heading and supporting paragraph |
| Procedures | BBL/Brazilian Butt Lift, liposuction, tummy tuck/abdominoplasty, rhinoplasty, breast augmentation; all links go to quote; medical-assessment qualification |
| Your Stay | Tunis lake district/northern suburbs, transfers, postoperative assistance and concierge; explicit hotel partners still being finalized |
| Surgeon | Dr. Taher Djemal, role, biography, four credentials, official site, named clinics/address and experience emblem |
| Packages | Essential, Comfort, VIP & Private Care; personalized quotes and no fixed prices; medical/availability qualification |
| Journey | Initial quote conversation → medical evaluation → stay planning if appropriate → arrival/support in Tunis |
| FAQ | Four topics: safety, length of stay, postoperative support, unconfirmed accommodation arrangements |
| Quote/contact | Follow-up expectation of 24 hours; six user fields, WhatsApp checkbox, draft-opening flow and third-party privacy explanation |
| Footer | Brand statement, real contact links, social profiles, medical-tourism disclaimer, privacy disclosure and current-year copyright |

### Surgeon and clinic claims to preserve as existing copy

The reference states more than 30 years of experience; graduation from the Faculty of Medicine of Tunis; French College of Plastic Surgery in Paris and University of Nancy; international experience at Hôpital Foch and in Baltimore; and presidency of the Tunisian Association of Plastic Surgeons since 2004. It names Centre Médical Hannibal and Clinique Myron at Les Berges du Lac 2, Tunis.

These are recorded claims from the existing site, **not independently verified credentials or current appointments** in this audit. Preserve the supplied wording and qualified context; add no certification, affiliation or outcome claims. The existing outbound profile link is https://www.drdjemal.com/.

### Package inclusions

| Package | Existing inclusions |
| --- | --- |
| Essential | Aesthetic surgery; 4-star hotel; private airport/clinic/hotel transfers |
| Comfort | Aesthetic surgery; 4- or 5-star hotel; VIP private transfers; onsite assistance and concierge 24/7 |
| VIP & Private Care | Aesthetic surgery; 5-star luxury hotel; VIP transfers; private nurse at hotel 24/7; premium postoperative follow-up |

The FAQ qualifies the VIP nurse as optional and subject to availability/care plan, whereas the package bullet is more categorical. Preserve the qualification and resolve this copy inconsistency before final publication; do not silently promise confirmed care arrangements.

### Real contact and social destinations

- Email: `info.glowlink@gmail.com`.
- Telephone: `+1 (514) 570-3037`, `tel:+15145703037`.
- WhatsApp: `https://wa.me/15145703037`.
- Instagram: `https://www.instagram.com/glowlink_tunisie/`.
- TikTok: `https://www.tiktok.com/@glowlink00`.

The footer has no repeated section-navigation list. Its only internal navigation is the brand link to `#top`; the privacy content is an expandable disclosure within footer `#privacy`. Do not inventory nonexistent footer navigation or a separate privacy page.

## 7. Functional inventory

### Anchors and navigation

All eight unique fragment targets referenced by HTML exist: `#top`, `#procedures`, `#stay`, `#surgeon`, `#packages`, `#faq`, `#quote`, `#experience`. Native CSS smooth scrolling is enabled. All procedure and package CTAs target the quote section; source logic does not select the clicked procedure or package in the form.

Desktop header remains sticky. Mobile preserves the same links in a horizontally scrollable second row and adds the persistent bottom CTA. There is no active-section tracking, drawer state or custom anchor script in the application code.

### EN/FR

- English is server-rendered and is the initial React state.
- Language buttons switch the in-memory dictionary and set `document.documentElement.lang` to `en` or `fr`.
- `aria-pressed` and an active class expose the selected language.
- Both dictionaries cover the principal headings, paragraphs, lists, FAQ, form labels/options and legal text.
- No application `localStorage`, session storage, locale route or locale query parameter was found. Reload returns to English.
- Page title/description remain English after a dictionary switch according to the inspected code.
- Some details remain English: hero geography and editorial caption, brand home label, language group label and highlights region label. Contact details and proper names appropriately remain stable.
- French procedure labels map to stable English option values in quote payloads. Country values, unlike procedures, are the displayed translated text.

No live language toggle was clicked; these are source-traced behaviors.

### Quote form

Required: full name (`autocomplete=name`), email (`type=email`, `autocomplete=email`), phone (`type=tel`, `autocomplete=tel`), country and procedure. Optional: message textarea. Country choices: Canada, United States, Other. Procedure choices include the five existing procedures and Other. WhatsApp capability checkbox is checked initially.

The form relies on native required-field and email validation. Phone is a required telephone field with no custom number-validation pattern in the retrieved markup.

On valid submit, source logic prevents default submission, trims fields, composes a localized text request and includes the name, email, phone, country, procedure and optional note:

1. If WhatsApp is checked, opens `https://wa.me/15145703037?text=…` in a new context with URL-encoded content and `noopener,noreferrer`.
2. If unchecked, assigns a `mailto:info.glowlink@gmail.com` URL with encoded subject/body to the current location.
3. Sets a success-state flag and shows a `role=status` message. WhatsApp mode also provides fallback email/phone wording.

There is no backend submission, enquiry database, application `fetch()` call or application storage in this flow. The user must send the message/draft in the destination app. This audit did not fill or submit a medical enquiry and did not open WhatsApp or a mail client.

The success flag is unconditional: it does not establish whether a popup was blocked, WhatsApp opened, a mail handler exists, or anything was sent. Suggested refinement is precise, non-misleading draft-handoff feedback and a direct retry/fallback link.

The general page includes a Vercel Analytics component; its code injects `/_vercel/insights/script.js`. That is separate from form storage. Its runtime execution, tracking requests and deployed endpoint behavior were not verified. Do not broaden the existing enquiry-storage statement into an unsupported claim of no analytics or no third-party requests.

### FAQ and privacy

Four native `details`/`summary` FAQ disclosures and one footer privacy disclosure. Each can open independently; no shared `name` or JavaScript enforces a one-open-at-a-time accordion. Chevron rotation is animated; the answer panel itself has no authored smooth height transition. Native disclosure semantics provide a useful accessible starting point, but keyboard/screen-reader behavior still needs browser testing.

## 8. Existing animation and interaction style

- Main navigation/footer color transitions toward gold on hover.
- Buttons transition background, color and transform over 200ms; hover moves upward 2px.
- Procedure rows transition background and padding over 200ms; bottom padding increases 5px on hover, which can alter layout rather than only compositing.
- Text-link arrows translate 4px over 200ms.
- FAQ/privacy chevrons rotate 180 degrees over 200ms when open.
- Hero image has a static 1.01 scale, not an animated zoom.
- No application Intersection Observer, scroll reveal, parallax, cursor follower or JavaScript animation loop was found.
- Reduced-motion rules disable smooth scrolling and reduce transition durations to 0.01ms. A separate generated shimmer rule exists, but the page does not use its class.

The appropriate extension is subtle focus/hover/reveal work that leaves content visible and layout stable. No new animation is required to establish luxury.

## 9. Refinement opportunities grounded in the evidence

### First priority: preserve identity and improve readability

Retain the serif/sans pairing and current heading rhythm. Several functional and supporting texts are 8–11px. Increase carefully, especially mobile form inputs, FAQ answers, credentials and privacy/disclaimer text. The current 11px mobile inputs should also be tested for focus zoom on mobile Safari. Improving small text matters more than enlarging already-large headings.

Contrast calculations from exact opaque source colors:

| Text/surface | Calculated ratio |
| --- | --- |
| Main #26332D on #FBFAF7 | 12.62:1 |
| White on primary #405A4C | 7.54:1 |
| Nav #566159 on #FBFAF7 | 6.19:1 |
| Muted #747B73 on #FBFAF7 | 4.17:1 |
| Procedure descriptor #898E85 on #FBFAF7 | 3.21:1 |
| Eyebrow #8D927F on #FBFAF7 | 3.07:1 |
| Privacy #969A91 on white | 2.87:1 |

These are mathematical color comparisons, not a browser accessibility score. The latter four are below the usual 4.5:1 normal-text review target. Prefer an already verified darker green for small text, with the final choice visually validated. Hero contrast varies with the image crop and overlay, so it cannot be reduced to the same static calculation here.

### Second priority: visual composition and content clarity

- Keep the hero image/message/geographic detail and left-aligned composition. Validate Georgia line breaks in EN and FR at wide, tablet and narrow sizes; use text measure and fluid type adjustments only after reviewing screenshots.
- Maintain ruled procedure organization. If adding the requested photographs later, use a restrained editorial presentation with appropriate assets and preserve all five names and the assessment note. Avoid inventing before/after or clinical-outcome content.
- Retain the two existing Mediterranean scenes and their warm stone, wood, sage and water palette. Keep accommodation clearly illustrative until arrangements are finalized.
- Preserve the surgeon emblem until an authentic authorized portrait exists. Do not create a stand-in portrait.
- Keep package inclusions and personalized quote logic, while aligning nurse/availability qualifications across sections.
- Avoid adding redundant navigation, feature-card sections, testimonials or credentials merely to fill space.

### Third priority: interaction and mobile polish

- Verify wrapped header height against the 116px mobile anchor offset and `88svh - 72px` hero formula.
- Check horizontal-nav discoverability, focus visibility, touch targets and French label fit. Preserve the navigation structure; a drawer would be a separate design choice, not an existing behavior.
- Test the persistent mobile CTA against the keyboard, form actions, footer, device safe areas and short landscape screens. No safe-area inset rule or quote-section hide logic is currently present.
- Complete EN/FR detail labels and metadata behavior; choose an explicit persistence/localized-URL approach later if required.
- Keep native disclosures and keyboard operation. Add smooth panel motion only if it remains discreet and compatible with reduced motion.
- Replace unconditional draft-open certainty with accurate feedback and usable fallback links.
- Consider carrying a procedure selection into the quote form when its CTA is clicked. Package context would require an explicit representation in the enquiry message; neither currently exists.
- A skip link is absent. Native field focus styling exists, but custom focus-visible treatment is not consistently authored across navigation and buttons. Review before changing browser defaults.

### Fourth priority: delivery and performance

- Derive responsive WebP/AVIF versions from the originals, preserving quality and crop direction. The two PNGs are the largest known assets at 3.51 MB combined.
- The hero is a CSS background: there is no image preload/fetch-priority instruction for it in HTML. Consider early image discovery and prioritization in the rebuild.
- Neither photograph uses `picture`, `srcset`, explicit image-element dimensions or `loading=lazy`; they are CSS backgrounds with minimum-height layout regions. Noncritical-image loading should be deliberate in the static version.
- Preserve system font stacks to avoid unnecessary font downloads. Local WOFF2 is not applicable unless appropriate licensed originals become available.
- The retrieved first-party HTML-linked resources total roughly 603 kB of JavaScript (decoded file bytes, including the noModule chunk), about 39 kB CSS and 40 kB HTML. A modern browser would not normally download the noModule chunk. These are not compressed transfer measurements and exclude dynamically requested resources.
- The static rebuild can remove the React/Next runtime and unused generated utility rules while reproducing the visual rules. Do not copy framework bundles into the production static site.
- Preserve semantic content and native form/disclosure semantics. English metadata and one H1 are present; no canonical, Open Graph, alternate-language or structured-data markup was found in the retrieved head. Add only accurate metadata appropriate to the eventual hosting URL.

No Lighthouse score, LCP, CLS or INP was measured. The requested goals remain future measurements, not achieved results.

## 10. Identity elements to hold fixed

1. Georgia editorial headings and Arial body/interface typography, with their established regular-weight contrast.
2. Lowercase green/champagne wordmark, sparkle outline mark and restrained line icons.
3. Warm off-white, sage, dark forest and muted champagne visual identity; record the deployed/brief color difference before any replacement.
4. Existing English and French messaging, all five procedures, three package tiers and four-step journey.
5. Mediterranean hospitality photography, quiet spatial composition, thin rules, mostly square geometry and restrained circles.
6. Tunis/Tunisia connection to Canada and the USA, including the editorial location/coordinate detail.
7. Real contact/social links and the original WhatsApp/email draft workflow.
8. Medical assessment, individual variation, coordinator/provider distinction, accommodation availability and third-party privacy disclosures.
9. Only existing supported professional and clinic claims; no invented prices, outcomes, partners or testimonials.

## 11. Validation still required before closing Phase 1

Review the deployed original in a functioning browser at representative desktop, tablet and mobile dimensions, including 1440px, 1024px, 768px, 760px, 390px and 375px widths. Capture screenshots and computed styles for the header, hero, procedure grid, stay crop, surgeon area, package panels, FAQ and quote/footer. Check the exact breakpoints on either side when diagnosing changes.

Verify EN/FR toggling and reload behavior; anchor clearance; horizontal navigation; tab order/focus; independent FAQ expansion; privacy disclosure; native invalid-form handling; bottom-CTA overlap; and motion reduction. Contact destination construction is already source-traced. Draft opening can be tested with synthetic nonsensitive data without sending a message; actual sending is unnecessary for an audit.

This is the remaining evidence gap, not a reason to guess at rendered results. Phase 2 architecture and all website implementation remain unstarted. The design direction above is ready for review; the full Phase 1 rendered comparison has not been signed off.
