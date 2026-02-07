"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

type Step = "role" | "details" | "how-it-works";

export default function OnboardingPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<"tenant" | "landlord" | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const tenantPoints = [
    { bold: "Verified landlords & listings", detail: "Every home is posted by a real, verified landlord." },
    { bold: "Thoughtful matching", detail: "We focus on fit, not first-come-first-served." },
    { bold: "Respectful communication", detail: "No spam, no ghosting, no pressure tactics." },
  ];

  const landlordPoints = [
    { bold: "Verified tenants only", detail: "Identity-checked, real people — no time-wasters." },
    { bold: "Curated introductions", detail: "We focus on fit, not volume." },
    { bold: "Simple, human communication", detail: "No spam. No mass enquiries." },
  ];

  const handleSignup = async () => {
    if (!role || !name.trim() || !email.trim()) return;
    setLoading(true);
    setError("");

    const err = await signup(name.trim(), email.trim(), role);
    if (err) {
      setError(err);
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  if (step === "role") {
    return (
      <div className="flex flex-col min-h-screen pt-14">
        <div className="flex-1 flex flex-col justify-center px-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">I&apos;m a...</h1>
          <p className="text-gray-400 text-sm mb-10">Choose how you&apos;ll use Rumah</p>

          <div className="space-y-4">
            <button
              onClick={() => { setRole("tenant"); setStep("details"); }}
              className="w-full py-4 px-6 border-2 border-gray-200 rounded-2xl text-left hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
            >
              <span className="text-lg font-bold text-gray-800 group-hover:text-blue-600">Tenant</span>
              <p className="text-sm text-gray-400 mt-0.5">I&apos;m looking for a place to rent</p>
            </button>

            <button
              onClick={() => { setRole("landlord"); setStep("details"); }}
              className="w-full py-4 px-6 border-2 border-gray-200 rounded-2xl text-left hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
            >
              <span className="text-lg font-bold text-gray-800 group-hover:text-blue-600">Landlord</span>
              <p className="text-sm text-gray-400 mt-0.5">I have a property to list</p>
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-blue-600 font-semibold hover:underline"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === "details") {
    return (
      <div className="flex flex-col min-h-screen pt-14">
        <div className="flex-1 flex flex-col justify-center px-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Hi :) Welcome
          </h1>
          <p className="text-gray-400 text-sm mb-8">Tell us about yourself</p>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 p-3 rounded-xl mb-4">{error}</p>
          )}

          <div className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <button
            onClick={() => setStep("how-it-works")}
            disabled={!name.trim() || !email.trim()}
            className="w-full mt-8 py-3.5 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-900 transition-colors disabled:opacity-50"
          >
            Continue
          </button>

          <button
            onClick={() => setStep("role")}
            className="w-full mt-3 py-3 text-gray-500 text-sm font-medium hover:text-gray-700"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // how-it-works
  const points = role === "landlord" ? landlordPoints : tenantPoints;

  return (
    <div className="flex flex-col min-h-screen pt-14">
      <div className="flex-1 flex flex-col justify-center px-8">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-12 leading-tight">
          Great! Here&apos;s how Rumah works for {role === "landlord" ? "landlords" : "tenants"}
        </h1>

        <div className="space-y-8 text-center mb-12">
          {points.map((point, i) => (
            <div key={i}>
              <p className="font-bold text-lg text-gray-800">{point.bold}</p>
              <p className="text-gray-500 italic mt-1">{point.detail}</p>
            </div>
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 p-3 rounded-xl mb-4">{error}</p>
        )}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full py-3.5 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-900 transition-colors disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Get Started"}
        </button>

        <button
          onClick={() => setStep("details")}
          className="w-full mt-3 py-3 text-gray-500 text-sm font-medium hover:text-gray-700"
        >
          Back
        </button>
      </div>
    </div>
  );
}
