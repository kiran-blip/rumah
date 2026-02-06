"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex flex-col min-h-screen px-8 pt-16 fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
          Hi :)
        </h1>
        <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
          Welcome
        </h1>
        <p className="text-gray-400 mt-2">Let&apos;s create an account</p>
      </div>

      <div className="w-full flex flex-col gap-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Email or Phone Number"
            className="input-underline"
          />
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Full Name"
            className="input-underline"
          />
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Username"
            className="input-underline"
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input-underline pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 p-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {showPassword ? (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              ) : (
                <>
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </>
              )}
            </svg>
          </button>
          <p className="text-xs text-gray-400 mt-1">Must contain a number and least of 6 characters</p>
        </div>

        <div className="relative mt-2">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            className="input-underline pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 p-2"
            style={{ top: "calc(50% - 10px)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {showConfirm ? (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              ) : (
                <>
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </>
              )}
            </svg>
          </button>
          <p className="text-xs text-gray-400 mt-1">Must contain a number and least of 6 characters</p>
        </div>

        <button
          className="btn-dark mt-6"
          onClick={() => router.push("/role-select")}
        >
          Sign Up
        </button>
      </div>

      <div className="mt-auto pb-8 text-center">
        <p className="text-sm text-gray-500">
          Have an account?{" "}
          <button
            onClick={() => router.push("/")}
            className="text-gray-800 font-bold hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}
