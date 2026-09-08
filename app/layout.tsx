import type { Metadata, Viewport } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { screeners } from "./data/products";
import { SITE_NAME, SITE_URL } from "./lib/site";
import "./globals.css";
import Script from "next/script";

const title = "Grizzly Screeners for Topsoil & Rock | DeSite Products";
const description =
  "Compare DeSite SLG 56, SLG 78 and SLG 108 grizzly screeners for topsoil, rock, mulch and aggregate. Explore specs, pricing and request a delivered quote.";

const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "DeSite Grizzly Screeners — SLG 56, SLG 78 and SLG 108 for topsoil, mulch and rock",
};

const gaId = "G-SD8L625JWL";
// Reference the existing Product and WebPage IDs from StructuredData rather
// than duplicating their specifications or currency-dependent offers.
const screenerCatalog = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/#grizzly-screeners`,
  name: "DeSite Grizzly Screeners",
  description,
  verification: {
  google: "iRRc6BdbwG9tYPD3edWW84_fYIX2SuNyTUoDBJlofvM",
  },
  url: `${SITE_URL}/#equipment`,
  mainEntityOfPage: { "@id": `${SITE_URL}/#webpage` },
  numberOfItems: screeners.length,
  itemListOrder: "https://schema.org/ItemListUnordered",
  itemListElement: screeners.map((screener, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@id": `${SITE_URL}/#${screener.slug}`,
      name: `DeSite ${screener.name} Grizzly Screener`,
      url: `${SITE_URL}/#${screener.slug}`,
    },
  })),
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | DeSite Grizzly Screeners" },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Construction and landscaping equipment",
  // Descriptive vocabulary only; meta keywords are not a Google ranking signal.
  keywords: [
    "grizzly screeners",
    "grizzly screener",
    "grizzly screen",
    "topsoil screener",
    "rock screener",
    "bucket screener",
    "bucket-fed screener",
    "portable grizzly screener",
    "skid steer screener",
    "mini excavator screener",
    "excavator grizzly screener",
    "aggregate screener",
    "compost screener",
    "mulch screener",
    "dirt screener",
    "gravel screener",
    "grizzly screeners for sale",
    "spring suspension grizzly",
    "square mesh screener",
    "DeSite SLG 56",
    "DeSite SLG 78",
    "DeSite SLG 108",
    "DeSite Products",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    locale: "en_US",
    siteName: SITE_NAME,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
    // Make full snippets and large previews available to supporting crawlers.
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#052356",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-ink text-white antialiased">
        <script
          id="grizzly-screeners-catalog"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(screenerCatalog).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-base focus:font-bold focus:text-navy"
        >
          Skip to content
        </a>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yf9wk0mou1");
          `}
        </Script>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
