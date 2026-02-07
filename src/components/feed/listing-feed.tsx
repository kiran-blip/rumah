"use client";

import { useState } from "react";
import { FeedFilter } from "@/lib/types";
import { useListings } from "@/hooks/use-listings";
import FeedFilters from "@/components/layout/feed-filters";
import ListingCard from "./listing-card";

function ListingSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-2/3" />
        <div className="flex gap-2">
          <div className="h-6 bg-gray-100 rounded-full w-16" />
          <div className="h-6 bg-gray-100 rounded-full w-16" />
        </div>
      </div>
    </div>
  );
}

export default function ListingFeed() {
  const [filter, setFilter] = useState<FeedFilter>("for-you");
  const { listings, loading, refetch } = useListings(filter);

  const handleInterest = async (listingId: string) => {
    await fetch(`/api/listings/${listingId}/interest`, { method: "POST" });
    refetch();
  };

  return (
    <>
      <FeedFilters active={filter} onChange={setFilter} />
      <div className="px-4 space-y-4">
        {loading ? (
          <>
            <ListingSkeleton />
            <ListingSkeleton />
            <ListingSkeleton />
          </>
        ) : listings.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg font-medium">No listings yet</p>
            <p className="text-sm mt-1">Check back soon for new homes</p>
          </div>
        ) : (
          listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onInterest={() => handleInterest(listing.id)}
            />
          ))
        )}
      </div>
    </>
  );
}
