import { cookies } from "next/headers";
import { expectedToken, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req) {
  if (!process.env.ADMIN_PASSWORD) {
    return Response.json(
      { error: "Server par ADMIN_PASSWORD set nahi hai." },
      { status: 500 }
    );
  }

  const { password } = await req.json();

  if (password && password === process.env.ADMIN_PASSWORD) {
    cookies().set(SESSION_COOKIE, expectedToken(), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return Response.json({ ok: true });
  }

  return Response.json({ error: "Password galat hai" }, { status: 401 });
}
