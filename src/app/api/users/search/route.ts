import { NextResponse } from "next/server";
import getDb from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (q.length < 2) {
    return NextResponse.json({ users: [] });
  }

  const db = getDb();
  const users = db.prepare(
    "SELECT id, name, role, image FROM users WHERE name LIKE ? AND id != ? LIMIT 10"
  ).all(`%${q}%`, session.id);

  return NextResponse.json({ users });
}
