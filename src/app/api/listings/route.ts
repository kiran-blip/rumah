import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import getDb from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") || "for-you";
  const area = searchParams.get("area");

  const db = getDb();
  let query = "SELECT * FROM listings";
  const params: string[] = [];

  if (area) {
    query += " WHERE area = ?";
    params.push(area);
  }

  switch (filter) {
    case "cheapest":
      query += " ORDER BY price ASC";
      break;
    case "recent":
      query += " ORDER BY created_at DESC";
      break;
    default:
      query += " ORDER BY interest_count DESC, created_at DESC";
  }

  query += " LIMIT 20";
  const listings = db.prepare(query).all(...params);

  return NextResponse.json({ listings });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { title, description, area, price, bedrooms, floor, available_from, image_url, tags } = body;

  if (!title || !description || !area || !price || bedrooms === undefined || !available_from) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const db = getDb();
  const id = uuid();
  db.prepare(`INSERT INTO listings (id, title, description, area, price, bedrooms, floor, available_from, image_url, tags, author_id, author_name, verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`).run(
    id, title, description, area, price, bedrooms, floor || null, available_from, image_url || null, tags || "", session.id, session.name
  );

  const listing = db.prepare("SELECT * FROM listings WHERE id = ?").get(id);
  return NextResponse.json({ listing }, { status: 201 });
}
