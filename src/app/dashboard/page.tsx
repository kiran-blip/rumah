"use client";

import BottomNav from "@/components/BottomNav";

const ShieldIcon = () => (
  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#3B82F6" />
      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#22c55e" className="shrink-0">
    <circle cx="12" cy="12" r="12" />
    <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const VerifiedBadge = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#3B82F6" className="shrink-0">
    <circle cx="12" cy="12" r="12" />
    <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Hi John! <span>&#128049;</span>
        </h1>
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#999">
            <circle cx="12" cy="8" r="4" />
            <path d="M20 21a8 8 0 10-16 0" />
          </svg>
        </div>
      </div>

      {/* Dashboard Card */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800">Your dashboard</h2>
          <ChevronRight />
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-gray-700">Pending verifications</p>
            <ChevronRight />
          </div>
          <div className="flex items-center gap-3 mb-3 bg-blue-50 rounded-xl p-3">
            <ShieldIcon />
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-800">Identity Verification</p>
              <p className="text-xs text-gray-500">In Progress</p>
            </div>
            <ChevronRight />
          </div>
          <button className="w-full py-3 text-center text-blue-500 font-medium text-sm border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
            Complete setup
          </button>
        </div>
      </div>

      {/* Messages Section */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800">Messages</h2>
          <div className="flex items-center gap-1">
            <span className="text-blue-500 text-sm font-medium">2 new</span>
            <ChevronRight />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#777">
                <circle cx="12" cy="8" r="4" />
                <path d="M20 21a8 8 0 10-16 0" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-800">Grayfield Apartments</p>
              <div className="flex items-center gap-1">
                <VerifiedBadge />
                <p className="text-xs text-gray-500">Sarah K.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold">2</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                <circle cx="5" cy="12" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Homes for you */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800">Homes for you</h2>
          <div className="flex items-center gap-1">
            <span className="text-gray-500 text-sm">View all</span>
            <ChevronRight />
          </div>
        </div>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div className="flex">
            <div className="w-32 h-32 bg-gray-200 shrink-0 overflow-hidden">
              <div
                className="w-full h-full"
                style={{
                  background: "linear-gradient(135deg, #c4b5a0 0%, #8b9dc3 50%, #a0b4c4 100%)",
                }}
              />
            </div>
            <div className="p-3 flex-1 min-w-0">
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-lg text-gray-800">2-be</span>
                <span className="text-gray-400 text-xs">| 12 th</span>
              </div>
              <p className="font-semibold text-gray-800">Shoreditch</p>
              <p className="text-blue-600 font-semibold text-sm">&pound;1,950/month</p>
              <div className="flex items-center gap-1 mt-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#999">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-xs text-gray-500">from 10 May 10</span>
              </div>
            </div>
          </div>
          <div className="px-4 pb-3 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <CheckCircle />
              <span className="text-sm text-gray-600">Great light + Pet friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <VerifiedBadge />
              <span className="text-sm text-gray-600">6-hour response | Verified Landlord</span>
            </div>
          </div>
        </div>

        {/* Second listing card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mt-4">
          <div className="flex">
            <div className="w-32 h-32 bg-gray-200 shrink-0 overflow-hidden">
              <div
                className="w-full h-full"
                style={{
                  background: "linear-gradient(135deg, #d4c5a9 0%, #7b8fa1 50%, #bcc7c9 100%)",
                }}
              />
            </div>
            <div className="p-3 flex-1 min-w-0">
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-lg text-gray-800">1-be</span>
                <span className="text-gray-400 text-xs">| 5 th</span>
              </div>
              <p className="font-semibold text-gray-800">Hackney</p>
              <p className="text-blue-600 font-semibold text-sm">&pound;1,600/month</p>
              <div className="flex items-center gap-1 mt-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#999">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-xs text-gray-500">from 1 Jun</span>
              </div>
            </div>
          </div>
          <div className="px-4 pb-3 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <CheckCircle />
              <span className="text-sm text-gray-600">Quiet street + Balcony</span>
            </div>
            <div className="flex items-center gap-2">
              <VerifiedBadge />
              <span className="text-sm text-gray-600">2-hour response | Verified Landlord</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
