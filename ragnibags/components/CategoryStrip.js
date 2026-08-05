import Link from "next/link";
import { CATEGORIES } from "@/lib/config";

export default function CategoryStrip() {
  return (
    <section className="bg-canvas py-10 border-b border-espresso/10">
      <div className="max-w-6xl mx-auto px-5">
        <p className="font-tag text-xs uppercase tracking-widest text-saddle mb-4">
          Category se Browse Karein
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className="shrink-0 border border-espresso/20 hover:border-brass hover:bg-espresso hover:text-canvas transition-colors px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
