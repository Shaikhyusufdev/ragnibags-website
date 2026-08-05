import { cookies } from "next/headers";
import { isAuthed } from "@/lib/auth";
import {
  getProducts,
  saveProducts,
  uploadImage,
  githubEnvReady,
} from "@/lib/github";

export async function GET() {
  const products = await getProducts();
  return Response.json({ products });
}

export async function POST(req) {
  if (!isAuthed(cookies())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!githubEnvReady()) {
    return Response.json(
      {
        error:
          "GitHub env variables (GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO) set nahi hain. README dekhein.",
      },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { name, category, mrp, offerPrice, description, imageBase64, imageFilename } = body;

    if (!name || !offerPrice) {
      return Response.json(
        { error: "Bag ka naam aur offer price zaroori hai" },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (imageBase64 && imageFilename) {
      const raw = imageBase64.includes(",")
        ? imageBase64.split(",")[1]
        : imageBase64;
      const safeName = `${Date.now()}-${imageFilename.replace(
        /[^a-zA-Z0-9.\-_]/g,
        ""
      )}`;
      imageUrl = await uploadImage(safeName, raw);
    }

    const products = await getProducts();
    const newProduct = {
      id: Date.now().toString(),
      name,
      category: category || "Other",
      mrp: mrp ? Number(mrp) : null,
      offerPrice: Number(offerPrice),
      description: description || "",
      image: imageUrl,
      createdAt: new Date().toISOString(),
    };

    products.unshift(newProduct);
    await saveProducts(products);

    return Response.json({ ok: true, product: newProduct });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  if (!isAuthed(cookies())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await req.json();
    const products = await getProducts();
    const filtered = products.filter((p) => p.id !== id);
    await saveProducts(filtered);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
