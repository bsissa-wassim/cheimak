# Contact section

The contact section was prioritized at the user's request before the other
Phase 5 sections. Its `#quote` target connects the header, hero and mobile CTAs
to the real form. Other unfinished sections remain separate work.

## Presentation

The existing pale-sage contact surface contains editorial copy and real contact
links on the left, with the white form panel on the right. It stacks at 760px.
The source's 24-hour response wording and privacy explanation are preserved.
Fields use explicit labels, 16px input text, native validation and visible focus.

Required fields: full name, email, phone, country and procedure. The message is
optional. Country/procedure choices match the audited reference. Values remain
stable when EN/FR option labels change; entered information is not reset.

## Draft workflow

- WhatsApp checked: prepares a message to `https://wa.me/15145703037`.
- WhatsApp unchecked: prepares an email to `info.glowlink@gmail.com`.
- Input is trimmed, localized and URL-encoded. Country/procedure payload labels
  follow the selected language. All existing form information is included.
- The user reviews and sends the draft in the destination app. Opening a draft
  never produces a claim that the enquiry has been sent.
- Retry and email-fallback links remain available when opening an app is blocked
  or unavailable. A null popup return is not treated as proof of failure/success.
- Editing or resetting clears the old generated links and status. Changing
  language refreshes a prepared draft without launching an app again.

There is no submission endpoint, database, fetch request, enquiry storage or
analytics event in this flow. Required-field/email validation is native. The
fieldset stays disabled until the submission handler is attached, so unavailable
JavaScript cannot cause an accidental native form submission. Direct WhatsApp,
email and phone links and a noscript explanation provide alternatives.

The always-present status element uses native live-region semantics. The fixed
mobile CTA hides while the contact section intersects the viewport. A form-focus
fallback covers environments without Intersection Observer. Body safe-area
clearance remains in place.

## Files

`index.html` owns the semantic form. `js/contact.js` builds encoded draft links
and handles the form. `js/language.js` contains both dictionaries; `js/main.js`
initializes the feature. Existing CSS files contain layout/component/responsive
rules. No runtime dependencies or build tools were added.

## Verification

Run the regression checks with Node.js 22 or newer:

```text
node --test tests/contact.test.mjs
```

Three tests pass, covering dictionary/markup completeness, fixed recipients and
encoded payloads, optional notes, localized choices, validation gating, both
channels, manual retry, stale-link clearing, language changes and mobile-CTA
observer/focus behavior. Tests use synthetic information and DOM fixtures; they
do not open external applications or send messages.

All five JavaScript files pass syntax checks. Seven stylesheets parse and CSS
tokens resolve. Form labels, ARIA references and local resources resolve. All
22 static resources return HTTP 200 with correct CSS/JS MIME types. The five
unimplemented content-section targets remain explicitly pending.

No browser surface is available in this environment. Actual desktop/mobile
composition, keyboard/screen-reader behavior, native browser validation messages,
virtual-keyboard overlap and app opening still need browser/device review.
