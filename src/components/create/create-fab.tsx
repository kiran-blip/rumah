"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import CreateListingForm from "./create-listing-form";

export default function CreateFAB() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed z-30 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
        style={{
          bottom: "5.5rem",
          right: "max(1rem, calc((100vw - 32rem) / 2 + 1rem))",
        }}
      >
        <Plus className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Post a Listing</h2>
              <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <CreateListingForm onSuccess={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
