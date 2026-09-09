import Hero from "./components/Hero";
import Difference from "./components/Difference";
import Products from "./components/Products";
import ModelSection from "./components/ModelSection";
import { screeners } from "./data/products";
import TrustBar from "./components/TrustBar";
import Videos from "./components/Videos";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import QuoteForm from "./components/QuoteForm";
import { getCurrency } from "./lib/currency.server";
import StructuredData from "./components/StructuredData";

export default async function Home() {
  // Resolved once and handed down, so every price on the page agrees.
  const currency = await getCurrency();

  return (
    <>
      <StructuredData currency={currency} />
      <Hero />
      <Difference />
      <Products currency={currency} />
      {screeners.map((model, i) => (
        <ModelSection
          key={model.slug}
          model={model}
          currency={currency}
          tone={i % 2 === 0 ? "dark" : "darker"}
        />
      ))}
      <TrustBar />
      <Videos />
      <Testimonials />
      <Faq />
      <QuoteForm currency={currency} />
    </>
  );
}
