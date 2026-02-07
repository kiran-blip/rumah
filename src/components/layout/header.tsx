"use client";

import Link from "next/link";
import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-5 h-14">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight" style={{ color: "#1a3fc7" }}>
            RUMAH
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Search className="h-5 w-5 text-gray-600" />
          </button>
          <Link href="/notifications" className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <Bell className="h-5 w-5 text-gray-600" />
          </Link>
        </div>
      </div>
    </header>
  );
}
