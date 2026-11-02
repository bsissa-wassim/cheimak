# GlowLink: two connected experiences

`index.html` is Health & Aesthetic. `senior-smile.html` is Senior & Smile,
covering dental care coordination and senior support. A direct button in the
upper-right header links each page to the other and preserves the chosen language.

Both pages use the same CSS files and components. Their main sections follow
exactly the same order: full-width photographic hero, trust strip, five photographic
services, stay, care team, three accompaniment cards, four FAQs, contact and founder.
The founder portrait, compact blue book, automatic chapters and plain previous/next
controls are reused. Only the copy and relevant images differ.

The senior care-team section explains the roles of the dental professionals and
GlowLink. It does not reuse the aesthetic surgeon's identity, credentials or clinics.
Smile, Senior and Senior & Smile cards introduce topics to discuss; they do not
claim fixed inclusions, rates or an unconfirmed clinician.

`js/smile-page-copy.js` supplies prefixed EN/FR copy for the shared page components.
`js/universes-copy.js` supplies the senior form labels and page metadata. The contact
form retains its separate draft-only behavior in `js/senior.js`: name, email, phone,
country, topic and optional message. Care and package links preselect the topic.
The fixed mobile enquiry link hides when the contact section is in view.

The current panoramic hero is `assets/images/senior-smile-hero-wide.png` (1672 x 941).
The dental-room and family-discussion images are also generated illustrations;
see [image provenance and final prompts](smile-images.md). They do not represent
actual clients, professionals or partner facilities. Original generated files remain
in the generated-images directory.

Native navigation, FAQs and founder text remain readable without JavaScript.
Direct contact links are available when draft preparation is unavailable.

Browser automation is unavailable in this environment. Node tests, HTML/CSS and
local HTTP checks are used; rendered desktop/mobile layout remains unverified.
