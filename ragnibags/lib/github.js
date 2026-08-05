const API = "https://api.github.com";

function headers() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
  };
}

function repoBase() {
  return `${API}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents`;
}

function branch() {
  return process.env.GITHUB_BRANCH || "main";
}

function envReady() {
  return Boolean(
    process.env.GITHUB_TOKEN &&
      process.env.GITHUB_OWNER &&
      process.env.GITHUB_REPO
  );
}

async function getFile(path) {
  if (!envReady()) return null;
  const res = await fetch(`${repoBase()}/${path}?ref=${branch()}`, {
    headers: headers(),
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub read failed (${res.status}): ${body}`);
  }
  return res.json();
}

async function putFile(path, contentBase64, message, sha) {
  const body = { message, content: contentBase64, branch: branch() };
  if (sha) body.sha = sha;
  const res = await fetch(`${repoBase()}/${path}`, {
    method: "PUT",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitHub write failed (${res.status}): ${errText}`);
  }
  return res.json();
}

async function deleteFile(path, message, sha) {
  const res = await fetch(`${repoBase()}/${path}`, {
    method: "DELETE",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({ message, sha, branch: branch() }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitHub delete failed (${res.status}): ${errText}`);
  }
  return res.json();
}

export async function getProducts() {
  try {
    const file = await getFile("data/products.json");
    if (!file) return [];
    const json = Buffer.from(file.content, "base64").toString("utf-8");
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("getProducts error:", e.message);
    return [];
  }
}

export async function saveProducts(products) {
  const file = await getFile("data/products.json");
  const content = Buffer.from(JSON.stringify(products, null, 2)).toString(
    "base64"
  );
  return putFile(
    "data/products.json",
    content,
    "chore: update products.json",
    file?.sha
  );
}

// base64Data: raw base64 (no "data:image/png;base64," prefix)
export async function uploadImage(filename, base64Data) {
  const path = `public/products-images/${filename}`;
  const existing = await getFile(path);
  await putFile(
    path,
    base64Data,
    `chore: upload product image ${filename}`,
    existing?.sha
  );
  return `https://raw.githubusercontent.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/${branch()}/${path}`;
}

export function githubEnvReady() {
  return envReady();
}
