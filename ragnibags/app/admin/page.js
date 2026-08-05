"use client";

import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/config";

const emptyForm = {
  name: "",
  category: CATEGORIES[0],
  mrp: "",
  offerPrice: "",
  description: "",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(null); // null = checking
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((d) => setAuthed(Boolean(d.authed)))
      .catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (authed) loadProducts();
  }, [authed]);

  async function loadProducts() {
    setLoadingProducts(true);
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      // ignore
    } finally {
      setLoadingProducts(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (res.ok) {
      setAuthed(true);
    } else {
      setLoginError(data.error || "Login fail hua");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }

  async function handleAddProduct(e) {
    e.preventDefault();
    setFormError("");
    setSuccessMsg("");

    if (!form.name || !form.offerPrice) {
      setFormError("Bag ka naam aur offer price zaroori hai");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        imageBase64: imagePreview || null,
        imageFilename: imageFile?.name || null,
      };
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Kuch galat ho gaya");
      } else {
        setSuccessMsg("Bag add ho gayi! GitHub par commit ho chuka hai.");
        setForm(emptyForm);
        setImageFile(null);
        setImagePreview("");
        loadProducts();
      }
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Ye bag delete karni hai?")) return;
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadProducts();
  }

  if (authed === null) {
    return (
      <div className="max-w-md mx-auto px-5 py-24 text-center text-ink/50">
        Check ho raha hai...
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto px-5 py-24">
        <h1 className="font-display italic text-3xl mb-6 text-center">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full border border-espresso/20 rounded-sm px-4 py-3 focus:border-brass outline-none"
          />
          {loginError && (
            <p className="text-rust text-sm">{loginError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-espresso text-canvas font-bold py-3 rounded-sm hover:bg-saddle transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-5 py-14">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-display italic text-3xl">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-saddle hover:text-rust font-medium"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display text-xl mb-4">Nayi Bag Add Karein</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-ink/50 mb-1.5">
                Bag ka Naam
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-espresso/20 rounded-sm px-4 py-2.5 focus:border-brass outline-none"
                placeholder="Classic Leather Backpack"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-ink/50 mb-1.5">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-espresso/20 rounded-sm px-4 py-2.5 focus:border-brass outline-none bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink/50 mb-1.5">
                  MRP (₹) — cut hoga
                </label>
                <input
                  type="number"
                  value={form.mrp}
                  onChange={(e) => setForm({ ...form, mrp: e.target.value })}
                  className="w-full border border-espresso/20 rounded-sm px-4 py-2.5 focus:border-brass outline-none"
                  placeholder="999"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink/50 mb-1.5">
                  Offer Price (₹)
                </label>
                <input
                  type="number"
                  value={form.offerPrice}
                  onChange={(e) =>
                    setForm({ ...form, offerPrice: e.target.value })
                  }
                  className="w-full border border-espresso/20 rounded-sm px-4 py-2.5 focus:border-brass outline-none"
                  placeholder="699"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-ink/50 mb-1.5">
                Description (optional)
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="w-full border border-espresso/20 rounded-sm px-4 py-2.5 focus:border-brass outline-none resize-none"
                placeholder="Genuine leather, 20L capacity..."
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-ink/50 mb-1.5">
                Bag ki Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm"
              />
              {imagePreview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="preview"
                  className="mt-3 w-32 h-32 object-cover rounded-sm border border-espresso/10"
                />
              )}
            </div>

            {formError && <p className="text-rust text-sm">{formError}</p>}
            {successMsg && (
              <p className="text-saddle text-sm font-medium">{successMsg}</p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-brass text-espresso font-bold py-3 rounded-sm hover:bg-espresso hover:text-canvas transition-colors disabled:opacity-50"
            >
              {saving ? "Save ho raha hai..." : "Bag Add Karein"}
            </button>
          </form>
        </div>

        <div>
          <h2 className="font-display text-xl mb-4">
            Sabhi Bags ({products.length})
          </h2>
          {loadingProducts ? (
            <p className="text-ink/40 text-sm">Load ho raha hai...</p>
          ) : products.length === 0 ? (
            <p className="text-ink/40 text-sm">Abhi koi bag add nahi hui.</p>
          ) : (
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 border border-espresso/10 rounded-sm p-3"
                >
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 object-cover rounded-sm shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-saddle/10 rounded-sm shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{p.name}</p>
                    <p className="text-xs text-ink/50">
                      {p.category} · ₹{p.offerPrice}
                      {p.mrp ? (
                        <span className="line-through ml-1 text-ink/30">
                          ₹{p.mrp}
                        </span>
                      ) : null}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-rust text-xs font-semibold hover:underline shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
