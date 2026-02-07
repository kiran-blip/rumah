"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useConversations } from "@/hooks/use-conversations";
import { MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function MessagesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { conversations, loading } = useConversations();

  if (authLoading || loading) {
    return (
      <div className="pt-14 pb-20">
        <div className="px-5 py-6">
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        </div>
        <div className="px-5 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl animate-pulse">
              <div className="w-12 h-12 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-14 pb-20 flex flex-col items-center justify-center min-h-screen px-8 text-center">
        <MessageCircle className="h-12 w-12 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Sign in to message</h2>
        <p className="text-gray-400 text-sm mb-6">Connect with landlords and tenants on Rumah</p>
        <button
          onClick={() => router.push("/login")}
          className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-full"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="pt-14 pb-20">
      <div className="px-5 py-6">
        <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
      </div>

      {conversations.length === 0 ? (
        <div className="px-5 text-center py-12">
          <MessageCircle className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400">No conversations yet</p>
        </div>
      ) : (
        <div className="px-5 space-y-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => router.push(`/messages/${conv.id}`)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <span className="text-blue-600 font-bold text-sm">
                  {(conv.other_user_name || "?").charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-800">{conv.other_user_name}</p>
                {conv.last_message && (
                  <p className="text-xs text-gray-400 truncate">{conv.last_message}</p>
                )}
              </div>
              <span className="text-xs text-gray-300">
                {formatDistanceToNow(new Date(conv.updated_at + "Z"), { addSuffix: false })}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
