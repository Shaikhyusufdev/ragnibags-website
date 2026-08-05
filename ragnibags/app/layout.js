import { Fraunces, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { BUSINESS_NAME, BUSINESS_TAGLINE } from "@/lib/config";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  weight: ["400", "500", "600", "700"],
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "700"],
});

export const metadata = {
  title: `${BUSINESS_NAME} — ${BUSINESS_TAGLINE}`,
  description:
    "Backpacks, handbags, travel bags aur bahut kuch — sab kuch ek jagah, best price aur offers ke saath.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body
        className={`${fraunces.variable} ${workSans.variable} ${jbMono.variable} font-body bg-canvas text-ink antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
