# Surgeon section

The `#surgeon` destination is implemented between interventions and contact.
The founder section still follows contact directly. No new JavaScript is needed:
the profile is visible without scripts and uses the existing EN/FR system.

The design pairs an official square portrait with the name, specialty, brief bio,
four qualifications, official-site link and an enquiry link to `#quote`.
The experience band retains the source's 30+ years. The clinic details retain
the source's Centre Médical Hannibal / Clinique Myron and Lac 2 location.
Below 760px the portrait and copy stack, with existing shared section spacing,
Georgia/Arial typography and brand colors. Intrinsic dimensions and lazy loading
are declared on the portrait. The external link uses `noopener noreferrer`.

## Sources and portrait provenance

Checked on 25 October 2026:

- [GlowLink reference](https://glowlink-seven.vercel.app/#surgeon): section identity, professional claims, clinic names and official link. Live HTML was retrieved directly with Node fetch after the web reader could not open the page.
- [Official homepage](https://www.drdjemal.com/): portrait, specialty, experience and practice location.
- [Official CV](https://www.drdjemal.com/le-docteur-cv/): education, international clinical experience and association role. These are the doctor's published statements, not independent credential verification.
- [Official portrait file](https://www.drdjemal.com/wp-content/uploads/2023/06/dr-taher-djemal.webp): unchanged local copy at `assets/images/dr-taher-djemal.webp`, 468 × 468 pixels, 18,408 bytes. No generated doctor image or retouching is used.

Qualifications are briefly paraphrased in EN/FR. No guarantees of treatment
results, new certifications or additional clinic partnerships have been added.
The official website remains available for the full professional profile.

## Verification

All six existing contact/founder regression tests pass, including translation-hook
coverage and enquiry behavior. Both HTML documents pass ID, label/ARIA and image
dimension checks. Eight CSS files parse with resolved token references; six JS
files pass syntax checks. All 32 local HTTP URLs return 200 with correct CSS/JS
MIME types. Section order is procedures → surgeon → contact → founder.

Rendered-browser layout and Lighthouse remain unverified: the Windows preview
helper could not initialize, reporting a missing kernel-assets path. Source and
HTTP checks above are not browser interaction or screenshot verification.
All header navigation destinations are implemented after the stay section was added.
