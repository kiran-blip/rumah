"use client";

import { useState, useEffect, useCallback } from "react";
import { Listing, FeedFilter } from "@/lib/types";

export function useListings(filter: FeedFilter = "for-you") {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/listings?filter=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setListings(data.listings);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return { listings, loading, refetch: fetchListings };
}
