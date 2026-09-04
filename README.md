# DeSite-Products-Landing-Page-
## Landing page — DeSite SLG Screeners

```bash
npm run dev
```

Home sections: video hero, the DeSite difference (five points, each with a
photo gallery), the three machines, industries strip, videos in action,
testimonials, FAQ and quote form.

Each model also has its own page at `/models/<slug>` (`slg-108`, `slg-78`,
`slg-56`), generated statically from `app/models/[slug]/page.tsx`: headline
specs and price, features, materials, the full spec sheet and every video
tagged with that model. The header and footer live in `app/layout.tsx`, so they
are shared by every page.

### Editable content

- `app/data/products.ts` — the three models, their specs and the comparison
  table. All three entries use real data from desiteproducts.com
  (`/slg-108/`, `/slg-78static/`, `/slg-56/`).
- Phone numbers (877-254-7903, 806-500-3915) and the Levelland, TX location are
  the ones published on those pages; there is no email address on the site, so
  the form is the only written channel.
- `app/data/videos.ts` — the Vimeo gallery (20 clips from the DeSite Products
  account). The section shows 6 and reveals the rest behind "Show all".
  To add one: copy the number from the Vimeo URL into `vimeoId`, then pull the
  title, runtime and thumbnail from
  `https://vimeo.com/api/oembed.json?url=https://vimeo.com/<id>`.
  If the embed shows a privacy error, whitelist the site's domain under the
  video's "Where can this be embedded?" setting on Vimeo.

- `app/components/BackgroundVideo.tsx` — the Vimeo loop behind the hero
  (`vimeoId` is set where it is used, in `Hero.tsx`). Muted, no controls, and
  replaced by the poster frame for visitors who ask for reduced motion. The
  scrim is layered so the centred copy keeps its contrast without flattening
  the footage.
- `app/data/difference.ts` — the five DeSite differences. **To add photos**,
  drop the files in `public/images` and append them to that entry's `images`
  array (`{ src, alt }`); each block renders them as a gallery, so a difference
  can carry as many photos as you have. A block with no photos falls back to
  the illustration named in `art`.
- `app/data/equipment.ts` — the carrier machines shown in the SLG 108 card.
  `scale` is the machine's size relative to the biggest one in the row, so the
  lineup reads to scale; the images are cropped to the machine itself.
 Rendered at the top of
  the page inside `Products.tsx`, above the model cards.
- The testimonials in `Testimonials.tsx` are **placeholders** and must be
  replaced with real quotes before going live.

### Quote form

The form is a seven-question qualifier defined in `app/data/qualify.ts`: what
machine loads it, material, volume, product size, moisture, whether they sell
the product and timeline. The answers to the carrier and volume questions carry
a `model`, and `recommendModel()` uses them to suggest a machine live as the
visitor answers. Add, remove or reword questions in that file and the flow, the
progress bar and the email body follow.

`POST /api/contact` sends the lead over SMTP, with the answers laid out under a
"Qualification" heading. Without these variables the lead is only logged to the
console (the page keeps working):

```
SMTP_HOST=smtp.provider.com
SMTP_PORT=587
SMTP_USER=user
SMTP_PASS=password
CONTACT_TO=sales@desiteproducts.com
CONTACT_FROM=web@desiteproducts.com
```
