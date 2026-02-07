export interface User {
  id: string;
  email: string;
  name: string;
  role: "tenant" | "landlord" | null;
  image: string | null;
  created_at: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  area: string;
  price: number;
  bedrooms: number;
  floor: string | null;
  available_from: string;
  image_url: string | null;
  tags: string;
  author_id: string;
  author_name: string;
  verified: number;
  interest_count: number;
  created_at: string;
}

export interface Conversation {
  id: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
  updated_at: string;
  other_user_name?: string;
  other_user_id?: string;
  last_message?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export type FeedFilter = "for-you" | "recent" | "cheapest";
