import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "rumah.db");

let db: Database.Database;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initDb();
    seedDb();
  }
  return db;
}

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      role TEXT,
      image TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS listings (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      area TEXT NOT NULL,
      price INTEGER NOT NULL,
      bedrooms INTEGER NOT NULL,
      floor TEXT,
      available_from TEXT NOT NULL,
      image_url TEXT,
      tags TEXT DEFAULT '',
      author_id TEXT NOT NULL,
      author_name TEXT NOT NULL,
      verified INTEGER DEFAULT 0,
      interest_count INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (author_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      user1_id TEXT NOT NULL,
      user2_id TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user1_id) REFERENCES users(id),
      FOREIGN KEY (user2_id) REFERENCES users(id),
      UNIQUE(user1_id, user2_id)
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      conversation_id TEXT NOT NULL,
      sender_id TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (conversation_id) REFERENCES conversations(id),
      FOREIGN KEY (sender_id) REFERENCES users(id)
    );

    CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id, created_at);
    CREATE INDEX IF NOT EXISTS idx_listings_created ON listings(created_at DESC);
  `);
}

function seedDb() {
  const count = db.prepare("SELECT COUNT(*) as c FROM users").get() as { c: number };
  if (count.c > 0) return;

  const { v4: uuid } = require("uuid");

  const sarahId = uuid();
  const jamesId = uuid();
  const priyaId = uuid();

  db.prepare("INSERT INTO users (id, email, name, role) VALUES (?, ?, ?, ?)").run(sarahId, "sarah@grayfield.co.uk", "Sarah K.", "landlord");
  db.prepare("INSERT INTO users (id, email, name, role) VALUES (?, ?, ?, ?)").run(jamesId, "james@email.com", "James T.", "landlord");
  db.prepare("INSERT INTO users (id, email, name, role) VALUES (?, ?, ?, ?)").run(priyaId, "priya@email.com", "Priya M.", "landlord");

  db.prepare(`INSERT INTO listings (id, title, description, area, price, bedrooms, floor, available_from, image_url, tags, author_id, author_name, verified, interest_count, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-2 hours'))`).run(
    uuid(), "Bright 2-bed with balcony", "Spacious 2-bedroom flat with floor-to-ceiling windows, pet friendly. Great natural light throughout the day. Modern kitchen with dishwasher.", "Shoreditch", 1950, 2, "12th", "2025-05-10", null, "Great light,Pet friendly", sarahId, "Sarah K.", 1, 5
  );

  db.prepare(`INSERT INTO listings (id, title, description, area, price, bedrooms, floor, available_from, image_url, tags, author_id, author_name, verified, interest_count, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-5 hours'))`).run(
    uuid(), "Cosy 1-bed on a quiet street", "Beautiful 1-bedroom with a private balcony overlooking a garden. Very quiet residential street, 5 min walk to Hackney Central station.", "Hackney", 1600, 1, "5th", "2025-06-01", null, "Quiet street,Balcony", jamesId, "James T.", 1, 3
  );

  db.prepare(`INSERT INTO listings (id, title, description, area, price, bedrooms, floor, available_from, image_url, tags, author_id, author_name, verified, interest_count, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-1 day'))`).run(
    uuid(), "Modern studio near Victoria Park", "Newly refurbished studio with open-plan living. Walking distance to Victoria Park and the canal. Bills included.", "Bow", 1350, 0, "3rd", "2025-05-15", null, "Bills included,Near park", priyaId, "Priya M.", 1, 8
  );

  db.prepare(`INSERT INTO listings (id, title, description, area, price, bedrooms, floor, available_from, image_url, tags, author_id, author_name, verified, interest_count, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-3 days'))`).run(
    uuid(), "Charming 3-bed Victorian house", "Stunning period conversion with original features. Private garden, two bathrooms, and a large living room. Close to Peckham Rye Park.", "Peckham", 2800, 3, null, "2025-06-15", null, "Garden,Period features,Two bathrooms", jamesId, "James T.", 1, 12
  );

  db.prepare(`INSERT INTO listings (id, title, description, area, price, bedrooms, floor, available_from, image_url, tags, author_id, author_name, verified, interest_count, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-6 hours'))`).run(
    uuid(), "Stylish 1-bed warehouse conversion", "Exposed brick, high ceilings, open plan. Great for professionals. Concierge, gym, and rooftop terrace in the building.", "Bermondsey", 1850, 1, "4th", "2025-05-20", null, "Warehouse,Gym,Concierge", sarahId, "Sarah K.", 1, 6
  );
}

export default getDb;
