import { faqs } from "../data/faqs";
import { comparisonRows, screeners } from "../data/products";
import { videos } from "../data/videos";
import { absolute, PHONES, SITE_NAME, SITE_URL } from "../lib/site";
import { CURRENCIES, type Currency } from "../lib/currency";

/**
 * JSON-LD for the whole page.
 *
 * This is what turns a blue link into a result with a price, a star of
 * specifications, an expandable FAQ or a video thumbnail. Google reads it, the
 * visitor never sees it, and it has to describe what is actually on the page —
 * marking up a price the page does not show is what gets a site penalised.
 */
export default function StructuredData({ currency }: { currency: Currency }) {
  const organisation = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "US manufacturer of bucket-fed grizzly screeners for topsoil, mulch, rock and aggregate.",
    telephone: PHONES,
    contactPoint: PHONES.map((telephone) => ({
      "@type": "ContactPoint",
      telephone,
      contactType: "sales",
      areaServed: ["US", "CA"],
      availableLanguage: "English",
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };

  const products = screeners.map((s) => {
    // The comparison table is the fullest spec list we publish; feeding it in
    // as properties is what makes the model eligible for a detailed result.
    const properties = comparisonRows
      .map((row) => {
        const value = row.values[screeners.indexOf(s)];
        return value && value !== "yes"
          ? { "@type": "PropertyValue", name: row.label, value }
          : null;
      })
      .filter(Boolean);

    return {
      "@type": "Product",
      "@id": `${SITE_URL}/#${s.slug}`,
      name: `DeSite ${s.name} Grizzly Screener`,
      alternateName: [s.name, `DeSite ${s.name}`],
      sku: s.slug.toUpperCase(),
      category: "Grizzly screener",
      description: `${s.family} bucket-fed grizzly screener. ${s.highlights.join(". ")}.`,
      image: absolute(s.image),
      brand: { "@type": "Brand", name: SITE_NAME },
      manufacturer: { "@id": `${SITE_URL}/#organization` },
      material: s.bestFor.join(", "),
      additionalProperty: properties,
      offers: {
        "@type": "Offer",
        url: `${SITE_URL}/#${s.slug}`,
        // The currency here is the one the visitor is actually being shown.
        price: s.prices[currency],
        priceCurrency: CURRENCIES[currency].code,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@id": `${SITE_URL}/#organization` },
        priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      },
      warranty: {
        "@type": "WarrantyPromise",
        durationOfWarranty: { "@type": "QuantitativeValue", value: 5, unitCode: "ANN" },
      },
    };
  });

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqs(currency).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const videoObjects = videos
    .filter((v) => v.vimeoId && v.thumb)
    .map((v) => ({
      "@type": "VideoObject",
      name: v.title,
      description: `${v.title} — DeSite grizzly screener in action.`,
      thumbnailUrl: v.thumb,
      contentUrl: `https://vimeo.com/${v.vimeoId}`,
      embedUrl: `https://player.vimeo.com/video/${v.vimeoId}`,
      duration: v.seconds ? `PT${Math.floor(v.seconds / 60)}M${v.seconds % 60}S` : undefined,
      uploadDate: "2025-01-01",
      publisher: { "@id": `${SITE_URL}/#organization` },
    }));

  const page = {
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: `${SITE_URL}/`,
    name: "DeSite Grizzly Screeners",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organisation, website, page, ...products, faqPage, ...videoObjects],
  };

  return (
    <script
      type="application/ld+json"
      // Server-rendered from our own data — there is no user input in here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
