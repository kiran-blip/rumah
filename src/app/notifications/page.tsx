"use client";

import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="pt-14 pb-20">
      <div className="px-5 py-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
      </div>

      <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
        <Bell className="h-10 w-10 text-gray-300 mb-3" />
        <p className="text-gray-400 font-medium">No notifications yet</p>
        <p className="text-gray-300 text-sm mt-1">We&apos;ll let you know when something happens</p>
      </div>
    </div>
  );
}
