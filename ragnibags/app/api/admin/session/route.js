import { cookies } from "next/headers";
import { isAuthed } from "@/lib/auth";

export async function GET() {
  return Response.json({ authed: isAuthed(cookies()) });
}
