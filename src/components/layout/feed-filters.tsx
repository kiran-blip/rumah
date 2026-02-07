"use client";

import { FeedFilter } from "@/lib/types";

const filters: { value: FeedFilter; label: string }[] = [
  { value: "for-you", label: "For You" },
  { value: "recent", label: "Recent" },
  { value: "cheapest", label: "Cheapest" },
];

interface FeedFiltersProps {
  active: FeedFilter;
  onChange: (filter: FeedFilter) => void;
}

export default function FeedFilters({ active, onChange }: FeedFiltersProps) {
  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 w-full max-w-lg z-30 bg-white border-b border-gray-100">
      <div className="flex px-5">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            className={`flex-1 py-3 text-sm font-medium text-center relative transition-colors ${
              active === f.value ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {f.label}
            {active === f.value && (
              <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
