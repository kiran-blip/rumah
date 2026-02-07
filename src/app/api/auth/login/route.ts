import { NextResponse } from "next/server";
import getDb from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const db = getDb();
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase()) as Record<string, string> | undefined;
  if (!user) {
    return NextResponse.json({ error: "No account found. Sign up first." }, { status: 404 });
  }

  await createSession({ id: user.id, email: user.email, name: user.name, role: user.role || null });

  return NextResponse.json({ user });
}
