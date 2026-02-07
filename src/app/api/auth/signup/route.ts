import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import getDb from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { name, email, role } = await req.json();
  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const db = getDb();
  const existing = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (existing) {
    return NextResponse.json({ error: "Email already registered. Try logging in." }, { status: 400 });
  }

  const id = uuid();
  db.prepare("INSERT INTO users (id, email, name, role) VALUES (?, ?, ?, ?)").run(id, email.toLowerCase(), name, role || null);

  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  await createSession({ id, email: email.toLowerCase(), name, role: role || null });

  return NextResponse.json({ user });
}
