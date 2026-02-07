"use client";

import { Listing } from "@/lib/types";
import { Heart, Clock, BadgeCheck, Bed, Building2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ListingCardProps {
  listing: Listing;
  onInterest?: () => void;
}

export default function ListingCard({ listing, onInterest }: ListingCardProps) {
  const tags = listing.tags ? listing.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const bedroomLabel = listing.bedrooms === 0 ? "Studio" : `${listing.bedrooms}-bed`;
  const timeAgo = formatDistanceToNow(new Date(listing.created_at + "Z"), { addSuffix: true });

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Image area */}
      <div className="h-44 relative" style={{
        background: `linear-gradient(135deg, ${stringToColor(listing.area)} 0%, ${stringToColor(listing.title)} 50%, ${stringToColor(listing.description)} 100%)`,
      }}>
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full text-gray-700">
            {listing.area}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <button
            onClick={onInterest}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
            &pound;{listing.price.toLocaleString()}/mo
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-1">{listing.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{listing.description}</p>

        {/* Details row */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            {bedroomLabel}
          </span>
          {listing.floor && (
            <span className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {listing.floor} floor
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            from {listing.available_from}
          </span>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex items-center gap-2">
            {listing.verified === 1 && (
              <BadgeCheck className="h-4 w-4 text-blue-500" />
            )}
            <span className="text-xs text-gray-500">{listing.author_name}</span>
            {listing.verified === 1 && (
              <span className="text-xs text-blue-500 font-medium">Verified</span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              {listing.interest_count}
            </span>
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 30%, 75%)`;
}
