"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function RoleSelectPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center min-h-screen px-8 fade-in">
      <div className="flex-1" />

      <div className="mb-20">
        <Logo />
      </div>

      <div className="w-full max-w-xs flex flex-col gap-10">
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

      <div className="flex-1" />
    </div>
  );
}
