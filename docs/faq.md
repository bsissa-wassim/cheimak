# FAQ

The `#faq` section follows packages and precedes contact; the founder section
still follows contact directly. It reuses the four questions and qualifications
from the [GlowLink reference](https://glowlink-seven.vercel.app/#faq): medical
assessment, stay duration, postoperative support and pending hotel arrangements.
The live reference HTML was checked with Node fetch on 25 October 2026 after
the web reader could not open the page. French wording comes from the archived
EN/FR source dictionary, with the original accents preserved.

Each answer uses native `details` / `summary`, all initially closed. Multiple
answers can remain open. Questions are keyboard-focusable native controls with
browser-managed expanded state. No redundant button roles or scripted ARIA state
are added. The existing global focus styling and reduced-motion rules apply.
The global language switch changes summary text spans and answer paragraphs
without replacing the disclosure elements or changing their open state.

The section uses the existing accordion styles, Georgia/Arial typography and
sage surface. Heading and answers form two columns on desktop and stack below
760px. A native contact link leads to `#quote`. No form fields are changed,
and no message, reservation, fixed stay duration or new hotel partnership is
introduced. No new script, dependency, image or FAQ structured data is added.

All six existing regression tests pass, including EN/FR hook coverage. Both HTML
documents pass ID, fragment and label/ARIA checks. Source checks confirm four
native disclosures, all initially closed, and the preserved section order.
Eight CSS files parse with resolved token references; `language.js` passes its
syntax check. The five changed page/style/script resources return HTTP 200 with
correct MIME types and contents. Rendered browser interactions/layout remain
unverified because the connected preview helper was unavailable. All header
navigation destinations are implemented after the addition of `#stay`.
