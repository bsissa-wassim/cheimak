# Image delivery optimization

All photos are retained. Original PNG/JPEG files are unchanged; HTML now uses
sibling WebP delivery files. ImageGen source provenance still applies to the
illustrated originals. Conversion changes encoding, not composition or dimensions.

- Full-resolution conversion: WebP quality 88 for heroes and founder, 85 for
  supporting imagery; Pillow encoder method 6 and original color profiles.
- Supporting photos wider than 640px also have a 640px-wide WebP, keeping aspect
  ratio, selected through native srcset/sizes. Existing optimized doctor portrait
  is reused unchanged.
- Hero photos keep full source resolution, preload references, eager loading and
  high fetch priority. They have no duplicate source-format preload.
- Supporting images retain native lazy loading to prioritize the first screen.
- The production builder includes every srcset candidate and excludes unreferenced
  originals. No additional libraries or browser JavaScript are required.

Full-resolution photo files total about 25.96 MB before conversion and 1.88 MB
after conversion (92.8% reduction). Including responsive variants and other site
resources, the production output is about 2.6 MB versus 26.2 MB previously.
These are file sizes, not measured browser loading times.

Per-file encoding settings, dimensions, byte counts and derivative paths are
recorded in image-optimization.json. The original files remain in assets/images.

Validation: all 17 regression tests pass; intrinsic dimensions, srcset candidate
widths, hero priority/preloads and all production resource references are valid.
Rendered-image review and real network timing were not measured in a browser.
