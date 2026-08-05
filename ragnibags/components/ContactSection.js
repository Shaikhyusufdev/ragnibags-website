"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/config";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Namaste, mera naam ${name || "___"} hai.\n${
      msg || "Mujhe bags ke baare me jaankari chahiye."
    }`;
    window.open(whatsappLink(text), "_blank");
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-espresso text-canvas rounded-lg p-8 md:p-14 grid md:grid-cols-2 gap-10"
      >
        <div>
          <p className="font-tag text-xs uppercase tracking-widest text-brass mb-3">
            Baat Karein
          </p>
          <h2 className="font-display italic text-3xl md:text-4xl mb-4">
            Koi Sawal Hai? Seedha Message Karein.
          </h2>
          <p className="text-canvas/60 leading-relaxed">
            Bulk order, custom design ya koi bhi jaankari chahiye — humein
            WhatsApp par likhein, hum jald hi reply karenge.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-canvas/50 mb-1.5">
              Aapka Naam
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-canvas/10 border border-canvas/20 rounded-sm px-4 py-3 text-canvas placeholder:text-canvas/30 focus:border-brass outline-none"
              placeholder="Ravi Kumar"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-canvas/50 mb-1.5">
              Message
            </label>
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={4}
              className="w-full bg-canvas/10 border border-canvas/20 rounded-sm px-4 py-3 text-canvas placeholder:text-canvas/30 focus:border-brass outline-none resize-none"
              placeholder="Mujhe travel bag ke baare me jaankari chahiye..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-brass text-espresso font-bold py-3.5 rounded-sm hover:bg-canvas transition-colors"
          >
            WhatsApp Par Bhejein
          </button>
        </form>
      </motion.div>
    </section>
  );
}
