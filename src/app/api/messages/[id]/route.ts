import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import getDb from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();

  const messages = db.prepare(
    "SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC"
  ).all(id);

  return NextResponse.json({ messages });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id: conversationId } = await params;
  const { content } = await req.json();

  if (!content?.trim()) {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  const db = getDb();
  const msgId = uuid();

  db.prepare("INSERT INTO messages (id, conversation_id, sender_id, content) VALUES (?, ?, ?, ?)").run(
    msgId, conversationId, session.id, content.trim()
  );

  db.prepare("UPDATE conversations SET updated_at = datetime('now') WHERE id = ?").run(conversationId);

  const message = db.prepare("SELECT * FROM messages WHERE id = ?").get(msgId);
  return NextResponse.json({ message }, { status: 201 });
}
