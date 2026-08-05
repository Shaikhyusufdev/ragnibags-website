"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { CATEGORIES } from "@/lib/config";

export default function ProductsGrid({ products }) {
  const searchParams = useSearchParams();
  const initial = searchParams.get("category") || "All";
  const [active, setActive] = useState(initial);

  const filtered = useMemo(() => {
    if (active === "All") return products;
    return products.filter((p) => p.category === active);
  }, [products, active]);

  return (
    <div>
      <div className="flex gap-2.5 overflow-x-auto pb-3 mb-8 scrollbar-none">
        {["All", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              active === cat
                ? "bg-espresso text-canvas border-espresso"
                : "border-espresso/20 hover:border-brass"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-espresso/20 rounded-md p-16 text-center">
          <p className="text-ink/50">Is category me abhi koi bag nahi hai.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
