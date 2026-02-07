"use client";

import ListingFeed from "@/components/feed/listing-feed";
import CreateFAB from "@/components/create/create-fab";

export default function HomePage() {
  return (
    <div className="pt-[104px] pb-20">
      <ListingFeed />
      <CreateFAB />
    </div>
  );
}
