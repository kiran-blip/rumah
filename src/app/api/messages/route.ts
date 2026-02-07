import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import getDb from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const db = getDb();
  const conversations = db.prepare(`
    SELECT c.*,
      CASE WHEN c.user1_id = ? THEN u2.name ELSE u1.name END AS other_user_name,
      CASE WHEN c.user1_id = ? THEN c.user2_id ELSE c.user1_id END AS other_user_id,
      (SELECT content FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) AS last_message
    FROM conversations c
    JOIN users u1 ON c.user1_id = u1.id
    JOIN users u2 ON c.user2_id = u2.id
    WHERE c.user1_id = ? OR c.user2_id = ?
    ORDER BY c.updated_at DESC
  `).all(session.id, session.id, session.id, session.id);

  return NextResponse.json({ conversations });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { userId } = await req.json();
  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const db = getDb();

  const existing = db.prepare(`
    SELECT * FROM conversations
    WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)
  `).get(session.id, userId, userId, session.id);

  if (existing) {
    return NextResponse.json({ conversation: existing });
  }

  const id = uuid();
  db.prepare("INSERT INTO conversations (id, user1_id, user2_id) VALUES (?, ?, ?)").run(id, session.id, userId);

  const conversation = db.prepare("SELECT * FROM conversations WHERE id = ?").get(id);
  return NextResponse.json({ conversation }, { status: 201 });
}
