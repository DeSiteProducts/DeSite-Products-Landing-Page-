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

export default function Home() {
  return (
    <>
      <Hero />
      <Difference />
      <Products />
      {screeners.map((model, i) => (
        <ModelSection key={model.slug} model={model} tone={i % 2 === 0 ? "dark" : "darker"} />
      ))}
      <TrustBar />
      <Videos />
      <Testimonials />
      <Faq />
      <QuoteForm />
    </>
  );
}
