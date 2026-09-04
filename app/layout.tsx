import type { Metadata, Viewport } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SITE_NAME, SITE_URL } from "./lib/site";
import "./globals.css";

const title = "Grizzly Screeners | DeSite SLG Bucket-Fed Topsoil & Rock";
const description =
  "DeSite builds three bucket-fed grizzly screeners for topsoil, mulch, rock and aggregate: the SLG 56, SLG 78 and SLG 108. No engine, no hydraulics — a tilting square-mesh deck on spring suspension, loaded straight from the bucket.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | DeSite Grizzly Screeners" },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Construction and landscaping equipment",
  /**
   * Search engines stopped weighting this tag years ago, but it costs nothing
   * and it keeps the vocabulary we are targeting in one readable place.
   */
  keywords: [
    "grizzly screener",
    "grizzly screeners",
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
    "screener for sale",
    "vibrating grizzly screen",
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
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-base focus:font-bold focus:text-navy"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
