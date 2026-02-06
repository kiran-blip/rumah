"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import GoogleIcon from "@/components/GoogleIcon";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center min-h-screen px-8 fade-in">
      <div className="flex-1" />

      <div className="flex flex-col items-center gap-4 mb-12">
        <Logo />
        <p className="text-gray-500 text-sm">Join our verified rental community.</p>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="input-field"
        />
        <div className="relative">
          <input
            type="password"
            placeholder="Create Password"
            className="input-field pr-10"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>

        <div className="divider my-1">or</div>

        <button
          className="btn-google"
          onClick={() => router.push("/role-select")}
        >
          <GoogleIcon />
          Sign up with Google
        </button>
      </div>

      <div className="flex-1" />

      <div className="pb-2 text-center">
        <p className="text-xs text-gray-400 leading-relaxed">
          By signing up, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">Terms of
          Service</a>{" "}and{" "}
          <a href="#" className="text-gray-500 hover:underline">Privacy Policy</a>.
        </p>
      </div>

      <div className="pb-8 pt-1 text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-gray-800 font-semibold hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}
