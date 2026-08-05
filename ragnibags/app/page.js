import Hero from "@/components/Hero";
import CategoryStrip from "@/components/CategoryStrip";
import FeaturedProducts from "@/components/FeaturedProducts";
import TrustStrip from "@/components/TrustStrip";
import ContactSection from "@/components/ContactSection";
import { getProducts } from "@/lib/github";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  const featured = products.slice(0, 6);

  return (
    <>
      <Hero />
      <CategoryStrip />
      <FeaturedProducts products={featured} />
      <TrustStrip />
      <ContactSection />
    </>
  );
}
