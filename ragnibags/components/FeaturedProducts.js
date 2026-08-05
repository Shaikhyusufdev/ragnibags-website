import Link from "next/link";
import ProductCard from "./ProductCard";

export default function FeaturedProducts({ products }) {
  return (
    <section className="max-w-6xl mx-auto px-5 py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="font-tag text-xs uppercase tracking-widest text-saddle mb-2">
            Naye Aaye Hain
          </p>
          <h2 className="font-display italic text-3xl md:text-4xl">
            Latest Bags
          </h2>
        </div>
        <Link
          href="/products"
          className="text-sm font-semibold text-saddle hover:text-rust hidden sm:block"
        >
          Sabhi Dekhein →
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="border border-dashed border-espresso/20 rounded-md p-12 text-center">
          <p className="text-ink/50">
            Bags jald hi add ki jayengi. Admin panel se pehla product upload
            karein.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
