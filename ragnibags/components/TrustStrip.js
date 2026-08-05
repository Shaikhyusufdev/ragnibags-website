const items = [
  { label: "Cash on Delivery", note: "Poore India me" },
  { label: "Quality Assured", note: "Har bag check karke bhejte hain" },
  { label: "Easy Exchange", note: "7 din ke andar" },
  { label: "WhatsApp Support", note: "Seedha baat karein" },
];

export default function TrustStrip() {
  return (
    <section className="bg-espresso/5 border-y border-espresso/10">
      <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-display text-lg mb-1">{item.label}</p>
            <p className="text-xs text-ink/50">{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
