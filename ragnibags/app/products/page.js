import { Suspense } from "react";
import { getProducts } from "@/lib/github";
import ProductsGrid from "@/components/ProductsGrid";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sabhi Bags — Ragni Bags",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="max-w-6xl mx-auto px-5 py-14">
      <p className="font-tag text-xs uppercase tracking-widest text-saddle mb-2">
        Poora Collection
      </p>
      <h1 className="font-display italic text-4xl mb-10">Sabhi Bags</h1>
      <Suspense fallback={null}>
        <ProductsGrid products={products} />
      </Suspense>
    </section>
  );
}
