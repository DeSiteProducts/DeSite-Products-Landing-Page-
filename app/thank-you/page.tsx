import type { Metadata } from "next";
import ThankYou from "../components/ThankYou";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your DeSite grizzly screener quote request has been received.",
  // A confirmation page has nothing to offer a searcher, and an indexed one
  // would bring in visitors who never submitted anything.
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return <ThankYou />;
}
