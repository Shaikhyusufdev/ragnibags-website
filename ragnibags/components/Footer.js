import Link from "next/link";
import { BUSINESS_NAME, BUSINESS_TAGLINE, WHATSAPP_NUMBER } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-espresso text-canvas mt-24">
      <div className="stitch-border opacity-40" />
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display italic text-2xl mb-2">{BUSINESS_NAME}</p>
          <p className="text-canvas/60 text-sm max-w-xs">{BUSINESS_TAGLINE}</p>
        </div>

        <div>
          <p className="font-tag text-xs uppercase tracking-widest text-brass mb-3">
            Quick Links
          </p>
          <ul className="space-y-2 text-sm text-canvas/70">
            <li>
              <Link href="/" className="hover:text-brass">Home</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-brass">Sabhi Bags</Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-brass">Contact</Link>
            </li>
          </ul>
        </div>

        <div id="contact-info">
          <p className="font-tag text-xs uppercase tracking-widest text-brass mb-3">
            Contact
          </p>
          <ul className="space-y-2 text-sm text-canvas/70">
            <li>WhatsApp: +{WHATSAPP_NUMBER}</li>
            <li>Cash on Delivery available</li>
            <li>Har din 10 AM – 8 PM</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-canvas/40 text-xs pb-6">
        © {new Date().getFullYear()} {BUSINESS_NAME}. Sabhi rights reserved.
      </div>
    </footer>
  );
}
