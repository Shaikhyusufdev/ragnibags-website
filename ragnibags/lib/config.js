// Yaha apni business details badal do
export const BUSINESS_NAME = "Ragni Bags";
export const BUSINESS_TAGLINE = "Ek Bag, Har Safar Ke Liye";

// WhatsApp number country code ke saath, bina + ya spaces ke. Example: "919876543210"
export const WHATSAPP_NUMBER = "919999999999";

export const CATEGORIES = [
  "Backpacks",
  "Handbags",
  "Travel & Luggage",
  "Office Bags",
  "School Bags",
  "Kids Bags",
  "Wallets & Pouches",
];

export function whatsappLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
