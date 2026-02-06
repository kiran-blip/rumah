"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function ForgotPasswordPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen px-8 fade-in">
      <div className="flex justify-end pt-4">
        <Logo size="small" />
      </div>

      <div className="mt-16 mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
          Oh, no !
        </h1>
        <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
          I forgot
        </h1>
        <p className="text-gray-400 mt-4 text-sm leading-relaxed">
          Enter your email, phone, or username and we&apos;ll send you a link to change a new password
        </p>
      </div>

      <div className="w-full flex flex-col gap-6 mt-8">
        <input
          type="text"
          placeholder="Username, Email or Phone Number"
          className="input-underline"
        />

        <button
          className="btn-dark"
          onClick={() => router.push("/")}
        >
          Forgot Password
        </button>
      </div>

      <div className="mt-auto pb-8 text-center">
        <p className="text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-gray-800 font-bold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
