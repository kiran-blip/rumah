"use client";

import { useState } from "react";

interface CreateListingFormProps {
  onSuccess: () => void;
}

export default function CreateListingForm({ onSuccess }: CreateListingFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const body = {
      title: form.get("title"),
      description: form.get("description"),
      area: form.get("area"),
      price: Number(form.get("price")),
      bedrooms: Number(form.get("bedrooms")),
      floor: form.get("floor") || null,
      available_from: form.get("available_from"),
      tags: form.get("tags") || "",
    };

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        onSuccess();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create listing");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      {error && (
        <p className="text-sm text-red-500 bg-red-50 p-2 rounded-lg">{error}</p>
      )}

      <div>
        <label className="text-sm font-medium text-gray-700">Title</label>
        <input
          name="title"
          required
          placeholder="Bright 2-bed with balcony"
          className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          required
          rows={3}
          placeholder="Describe the property..."
          className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700">Area</label>
          <input
            name="area"
            required
            placeholder="Shoreditch"
            className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Price (&pound;/month)</label>
          <input
            name="price"
            type="number"
            required
            placeholder="1950"
            className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700">Bedrooms</label>
          <select
            name="bedrooms"
            required
            className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
          >
            <option value="0">Studio</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Floor</label>
          <input
            name="floor"
            placeholder="5th"
            className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Available from</label>
        <input
          name="available_from"
          type="date"
          required
          className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Tags (comma-separated)</label>
        <input
          name="tags"
          placeholder="Pet friendly, Balcony, Bills included"
          className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post Listing"}
      </button>
    </form>
  );
}
