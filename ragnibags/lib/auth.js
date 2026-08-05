import crypto from "crypto";

export const SESSION_COOKIE = "ragni_admin_token";

export function expectedToken() {
  return crypto
    .createHash("sha256")
    .update(process.env.ADMIN_PASSWORD || "no-password-set")
    .digest("hex");
}

export function isAuthed(cookieStore) {
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return Boolean(token) && token === expectedToken();
}
