# Packages

The `#packages` section follows the surgeon profile and precedes contact. It
preserves the three offers from the [GlowLink reference](https://glowlink-seven.vercel.app/#packages),
whose live HTML was retrieved on 25 October 2026 using Node fetch after the web
reader could not open the page. The archived EN/FR application dictionaries
provide the French copy. No prices, discounts or new inclusions are invented.

- Essential: surgery, 4-star accommodation and private airport/clinic/hotel transfers.
- Comfort: surgery, 4- or 5-star accommodation, VIP transfers and 24/7 assistance/concierge.
- VIP & Private Care: surgery, luxury 5-star accommodation, VIP transfers, a private nurse at the hotel 24/7 and premium postoperative follow-up.

Comfort retains the source's “Most popular” treatment. All offers are subject to
the visible medical-assessment, availability and individual-needs qualification.
The hotel's star categories do not identify or confirm additional hotel partners.

The section uses the existing package-card/check-list components, brand colors
and Georgia/Arial typography. Three equal-width cards stack below 760px. The
shared flex layout keeps enquiry buttons at the bottom of each desktop card.
All text and distinct enquiry-link accessible names support EN/FR.

Each enquiry is a native `#quote` link, matching the reference behavior. It leads
to contact without submitting, opening another app, resetting a previously
chosen procedure or changing entered form details. It does not preselect a
package in the form. No new JavaScript, dependency or image is required.

Verification passes: six existing regression tests, six JavaScript syntax checks,
eight parsed CSS files with resolved token references, both HTML documents'
IDs/labels/ARIA/image dimensions, and 32 local HTTP URLs with correct CSS/JS MIME
types. Source checks confirm three offers, 3/4/5 inclusions, three native enquiry
links, one featured offer, visible conditions and the preserved section order.
Browser layout review remains pending because the connected Windows preview
helper was unavailable. All header navigation destinations are now implemented.
