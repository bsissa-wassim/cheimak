# Original image assets

Unmodified copies of the reference images retrieved during Phase 1:

| File | Dimensions | Original bytes | Use |
| --- | --- | --- | --- |
| `glowlink-tunis-recovery.png` | 1312 × 816 | 1,580,863 | Original reference hero, retained for review |
| `glowlink-tunis-terrace.png` | 1264 × 848 | 1,932,911 | Stay |

Source: https://glowlink-seven.vercel.app/ (24 October 2026).
Original hashes are in `audit/audit-evidence.json`.

These files do not establish a confirmed hotel partnership or verified
location. Preserve the reference's accommodation-availability qualification.
Responsive optimized derivatives will be evaluated in the image-performance phase.

## Supplied logo

`glowlink-monogram.png` is an unchanged copy of the user's
`GlowLink — Monogramme premium final (1).png` (2000 × 2000, 236,726 bytes).
It replaces the sparkle mark in the website header, beside the GlowLink wordmark.
The header's CSS clips empty canvas around the monogram while preserving its
proportions. The header background matches the image's opaque `#F7F5F0` canvas.
The original root file is retained.

## Supplied hero photograph

`coastal-bedroom.png` is an unchanged copy of the user's
`Chambre côtière luxueuse face à la mer.png` (1672 × 941, 2,456,771 bytes).
It is the current website hero image, with a matching preload and localized
English/French alternative text. Its intrinsic dimensions are declared in HTML;
the existing cover framing and overlays remain in use. The root original and
the previous reference image are retained.

## Supplied founder portrait

`founder-v2.jpeg` is an unchanged copy of the new `fondatrice.jpeg` supplied in
the project root on 25 October 2026 (1122 × 1402, 285,037 bytes). It replaces the
earlier portrait in the founder section, with lazy loading, intrinsic dimensions
and EN/FR alternative text. The versioned filename avoids reusing the browser's
cached earlier image. `founder.jpeg` retains the previous portrait; the demo HTML
remains a reference and its embedded image is not used at runtime.

## Intervention illustrations

`procedures/bbl.png`, `procedures/liposuction.png`, `procedures/tummy-tuck.png`,
`procedures/rhinoplasty.png` and `procedures/breast-augmentation.png` are new
illustrations generated with the built-in ImageGen tool on 24 October 2026.
All five unchanged PNGs are 1086 × 1448 pixels. These are AI-generated
illustrations, not patients or surgical results; provenance is documented here.
See [the complete prompts and provenance](../../docs/procedures-images.md).

### Earlier surgery-focused set

The earlier mannequin gallery used `procedures/bbl-surgical.png`,
`procedures/liposuction-surgical.png`, `procedures/tummy-tuck-surgical.png`,
`procedures/rhinoplasty-surgical.png` and
`procedures/breast-augmentation-surgical.png`, generated on 25 October 2026
with built-in ImageGen. The first three are 1086 × 1448; the last two are
1586 × 992 pixels. These unchanged PNGs show one synthetic profile portrait and
four clothed mannequins with subtle sage anatomical-zone outlines.
The first lifestyle images above are retained as earlier versions.
See [the mannequin prompts and provenance](../../docs/procedures-images-surgical.md).

### Current photorealistic set

The four mannequins are replaced by `procedures/bbl-realistic.png`,
`procedures/liposuction-realistic.png`, `procedures/tummy-tuck-realistic.png`
and `procedures/breast-augmentation-realistic.png`, generated with built-in
ImageGen on 25 October 2026 using the retained `rhinoplasty-surgical.png` as
the style reference. All five gallery images now depict human subjects in
the same photographic style. They are synthetic illustrations, not patients.
The first three new PNGs are 1086 × 1448 pixels; the fourth is 1586 × 992.
See [current prompts and provenance](../../docs/procedures-images-realistic.md).

## Official surgeon portrait

`dr-taher-djemal.webp` is an unchanged 468 × 468 pixel, 18,408 byte copy of the
portrait published on [Dr Djemal’s official website](https://www.drdjemal.com/wp-content/uploads/2023/06/dr-taher-djemal.webp),
retrieved on 25 October 2026. It appears in `#surgeon`, with lazy loading and
EN/FR alternative text. See [section sources and integration](../../docs/surgeon.md).

## Earlier stay illustration — concierge service

`stay-concierge.png` is a new photographic illustration created on 25 October 2026
with the built-in ImageGen tool. Its 1448 × 1086 PNG is copied unchanged into this
folder. The supplied coastal-bedroom image was a reference for colors, light and
Mediterranean hospitality style. The image depicts a fictional coordinator
welcoming a guest, with an itinerary folder and suitcase. This previous version
is retained but is no longer used in the stay section. It does not depict actual
clients, staff or a confirmed hotel partner.
The discarded video brief was deleted; no video was generated or added.

### Final generation prompt

Use case: photorealistic-natural. Create a new premium editorial photograph for the 'Your stay' section of GlowLink, a medical-travel logistics and health-concierge agency. The reference coastal-bedroom image is a style reference for warm ivory, natural stone, muted sage, Mediterranean daylight and understated comfort; it is not an edit target. Show the SERVICE and human support, not only a landscape. In a serene upscale Tunisian accommodation lounge opening onto a sunlit Mediterranean terrace, a professional female travel-care coordinator, about 40, wearing a sage linen blazer over an ivory top, is welcoming an adult female guest, about 50, who is seated comfortably in a cream linen armchair. They make natural friendly eye contact while reviewing a simple blank itinerary folder together. A single elegant closed carry-on suitcase sits discreetly beside the guest, suggesting a carefully coordinated arrival. White plaster arches, natural stone and a small cobalt-blue architectural accent softly evoke coastal Tunisia; a glimpse of calm blue sea is visible through the terrace doorway. Warm, reassuring, personal service, realistic human hands and skin texture, natural ordinary body proportions. Frame both people from head to below knees with space around them, documentary hospitality photography, soft diffuse light, restrained warm color grading, authentic relaxed gestures. Landscape 4:3 composition suited to a large website feature image. No surgery, treatment, medical equipment, wounds, white coats, nursing uniforms, hospital beds, text, visible writing, signage, brands or watermarks. This is an illustrative fictional scene, not an actual patient, real staff member or confirmed hotel partner.


## Current stay image — Tunisian courtyard

`stay-courtyard.png` is a new 1448 × 1086 photographic illustration generated on
25 October 2026 with the built-in ImageGen tool, without reference images.
The selected PNG was copied unchanged into `assets/images/`. It replaces the
concierge scene with a people-free Tunisian guesthouse courtyard: white arches,
a cobalt-blue door, terracotta flooring, shaded seating and a sea view. This is
a fictional accommodation inspired by coastal Tunisia, not a specific real
property or confirmed partner. The EN/FR alt text and caption match this new
image. Generation notes are kept in documentation, with the visible AI notices
removed at the user’s request. The existing hero bedroom is retained.

### Final courtyard generation prompt

Use case: photorealistic-natural. Create a brand-new premium architectural editorial photograph for the 'Your stay' section of GlowLink, a medical-travel coordination website. Show only a beautiful quiet accommodation setting in coastal Tunisia, with absolutely no people. Distinct from a contemporary bedroom: an intimate traditional Tunisian boutique guesthouse courtyard opening toward the Mediterranean, inspired by the white-and-blue architecture of Sidi Bou Said. White limewashed arches and sculpted plaster walls, a beautifully crafted cobalt-blue wooden door and subtle blue window frames, warm terracotta floor tiles, pale natural stone, one mature olive tree in a terracotta pot, a small jasmine vine. Under the shaded arcade, two elegant cream linen lounge chairs and a low handcrafted wooden table create a comfortable place to rest. A folded neutral throw sits neatly on one chair; no luggage or personal belongings. A small glimpse of the blue sea is framed by the courtyard archway, a calm authentic Tunisian atmosphere rather than an extravagant resort. Soft late-afternoon sunlight, delicate architectural shadows, natural material textures, restrained sand/ivory/sage tones balanced with cobalt-blue details. Exceptionally realistic professional hospitality photography, 35mm lens, eye-level perspective, elegant uncluttered composition, no artificial glossy rendering. Landscape 4:3 composition, showing the setting clearly and leaving breathing room around the furniture. No people, faces, bodies, silhouettes, figures in reflections, staff, guests, pets, beds, medical equipment, writing, logos, signage or watermarks. This is an illustrative fictional accommodation, not a confirmed hotel partner.

# Senior & Smile hero

The current full-width hero is `senior-smile-hero-wide.png`. It and the new dental
room and family images are documented with their prompts in
[Senior & Smile images](../../docs/smile-images.md). The earlier portrait below
is now used in the senior-support gallery card.

`senior-smile-hero.png` was generated with the built-in ImageGen tool for the
Senior & Smile page. Fictional illustrative subjects; no actual clients, staff
or treatment results are represented. The original remains in the generated-images
directory as `exec-cfa2e4c6-8905-4a46-b86a-5ffe491fb9be.png`.

Final generation prompt:

> Use case: photorealistic-natural. Asset type: editorial website hero photograph for GlowLink Senior & Smile, a dental care coordination and senior support service. Create a premium, completely photorealistic candid portrait of an elegant woman in her late 60s with naturally silver shoulder-length hair and a relaxed genuine smile, sitting beside a similarly aged man in a calm Mediterranean courtyard. Both fully clothed in natural linen, one pastel blue shirt and one ivory shirt, subtle deep forest green foliage. Real skin texture, age lines, natural teeth, warm and dignified, never over-retouched. The woman is the main subject, both faces visible and close to the center, chest-up, generous breathing space above heads. Tall 4:5 editorial composition suitable for a website split hero, soft morning daylight, pale limestone architecture softly out of focus, sophisticated quiet atmosphere. No text, no logos, no watermark, no medical equipment, no uniforms, no depiction of a procedure, no before/after. Fictional illustrative subjects, not actual clients or staff.

