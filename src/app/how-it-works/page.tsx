"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function HowItWorksContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "tenant";

  const tenantContent = {
    title: "Great! Here's how Rumah works for tenants",
    points: [
      {
        bold: "Verified landlords & listings",
        detail: "Every home is posted by a real, verified landlord.",
      },
      {
        bold: "Thoughtful matching",
        detail: "We focus on fit, not first-come-first-served.",
      },
      {
        bold: "Respectful communication",
        detail: "No spam, no ghosting, no pressure tactics.",
      },
    ],
  };

  const landlordContent = {
    title: "Great! Here's how Rumah works for landlords",
    points: [
      {
        bold: "Verified tenants only",
        detail: "Identity-checked, real people — no time-wasters.",
      },
      {
        bold: "Curated introductions",
        detail: "We focus on fit, not volume.",
      },
      {
        bold: "Simple, human communication",
        detail: "No spam. No mass enquiries.",
      },
    ],
  };

  const content = role === "landlord" ? landlordContent : tenantContent;

  return (
    <div className="flex flex-col min-h-screen px-8 pt-16 fade-in">
      <h1 className="text-3xl font-extrabold text-gray-800 leading-tight mb-12">
        {content.title}
      </h1>

      <div className="flex flex-col gap-6 text-center">
        {content.points.map((point, i) => (
          <div key={i} className="slide-in" style={{ animationDelay: `${i * 0.15}s` }}>
            <p className="font-bold text-lg text-gray-800">{point.bold}</p>
            <p className="text-gray-500 italic">{point.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto pb-10 pt-12">
        <button
          className="btn-dark"
          onClick={() => router.push("/dashboard")}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <HowItWorksContent />
    </Suspense>
  );
}
