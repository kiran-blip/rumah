"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { User, LogOut, Shield, ChevronRight } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="pt-14 pb-20">
        <div className="px-5 py-8 flex flex-col items-center animate-pulse">
          <div className="w-20 h-20 rounded-full bg-gray-200 mb-4" />
          <div className="h-5 bg-gray-200 rounded w-32 mb-2" />
          <div className="h-4 bg-gray-100 rounded w-24" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-14 pb-20 flex flex-col items-center justify-center min-h-screen px-8 text-center">
        <User className="h-12 w-12 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Your profile</h2>
        <p className="text-gray-400 text-sm mb-6">Sign in to manage your Rumah profile</p>
        <button
          onClick={() => router.push("/login")}
          className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-full"
        >
          Sign In
        </button>
        <button
          onClick={() => router.push("/onboarding")}
          className="mt-3 text-sm text-blue-600 font-medium hover:underline"
        >
          Create an account
        </button>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="pt-14 pb-20">
      {/* Profile header */}
      <div className="px-5 py-8 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <span className="text-blue-600 font-bold text-2xl">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
        <p className="text-sm text-gray-400">{user.email}</p>
        {user.role && (
          <span className="mt-2 text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium capitalize">
            {user.role}
          </span>
        )}
      </div>

      {/* Menu items */}
      <div className="px-5 space-y-1">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors">
            <Shield className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-800 flex-1 text-left">Identity Verification</span>
            <span className="text-xs text-gray-400 mr-1">Pending</span>
            <ChevronRight className="h-4 w-4 text-gray-300" />
          </button>
          <div className="border-t border-gray-50" />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="h-5 w-5 text-red-400" />
            <span className="text-sm font-medium text-red-500 flex-1 text-left">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
