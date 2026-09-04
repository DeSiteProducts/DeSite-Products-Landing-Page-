import type { Metadata, Viewport } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const title = "DeSite SLG Screeners | Bucket-fed topsoil and rock screening";
const description =
  "Three DeSite SLG screeners for topsoil, mulch and rock: mini, compact and full-size. No engine, no hydraulics — a tilting mesh deck on spring suspension, fed straight from the bucket.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | DeSite SLG Screeners" },
  description,
  keywords: [
    "topsoil screener",
    "rock screener",
    "bucket screener",
    "skid steer screener",
    "mini excavator screener",
    "DeSite SLG",
    "DeSite Products",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    siteName: "DeSite Products",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
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
