"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function RoleSelectPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 fade-in">
      <div className="mb-16">
        <Logo />
      </div>

      <div className="w-full max-w-sm flex flex-col gap-8">
        <button
          className="btn-dark text-lg py-5"
          onClick={() => router.push("/how-it-works?role=tenant")}
        >
          I&apos;m a tenant
        </button>

        <button
          className="btn-dark text-lg py-5"
          onClick={() => router.push("/how-it-works?role=landlord")}
        >
          I&apos;m a landlord
        </button>
      </div>
    </div>
  );
}
