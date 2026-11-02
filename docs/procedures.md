# Interventions

The `#procedures` section follows the trust strip and precedes contact. It keeps
the five choices already present in the enquiry form: BBL, liposuction, tummy
tuck / abdominoplasty, rhinoplasty and breast augmentation. The existing hero,
compact header and founder section after contact are retained.

The gallery uses three images followed by two wider images on desktop, two
columns on tablets and one column on small screens. Editorial captions use the
existing Georgia/Arial typography and brand colors. Motion is disabled for
reduced-motion preferences. Captions, link names, image alternatives and the
medical-assessment qualification support EN/FR. Image provenance is recorded in
the project documentation; visible generation notes were removed at the user’s request.

Each image/caption is a native `#quote` link. With JavaScript, ordinary activation
also selects the corresponding canonical form option and clears an outdated
prepared draft. Other entered details are preserved. Modified clicks retain
normal browser behavior. Selecting an intervention never submits the form or
opens WhatsApp/email. Without JavaScript, links still lead to contact and its
manual contact options.

Five photorealistic AI illustrations of human subjects are included locally.
The original nose portrait is retained; four new images match its ivory studio
background, natural skin texture, cream/sage clothing and fine contour accents.
They are not patient images, surgical planning diagrams or treatment results;
see [current provenance and final prompts](procedures-images-realistic.md).
The [first lifestyle set](procedures-images.md) and
[mannequin set](procedures-images-surgical.md) are retained as earlier versions.
Images are lazy loaded and include intrinsic dimensions. Original PNGs are
retained; format/size optimization remains part of the performance phase.

Verification: six contact/founder regression tests pass, covering bilingual
content, draft handoff and procedure preselection, including modified clicks,
unknown/disabled options, preserving input and clearing stale drafts.
All eight stylesheets parse, six JavaScript files pass syntax checks, local
image dimensions match the HTML, and both documents pass unique-ID/ARIA/label
reference checks. All 31 local HTTP URLs return 200 with correct CSS/JS MIME
types. All header navigation destinations are now implemented.
No enquiry is sent by these checks. A browser was unavailable in the connected
UI inventory; rendered layout, keyboard behavior in-browser and Lighthouse
remain unverified.
