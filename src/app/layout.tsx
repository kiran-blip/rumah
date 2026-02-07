import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/hooks/use-auth";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";

export const metadata: Metadata = {
  title: "Rumah - Verified Rental Community",
  description: "Join London's verified rental community. Verified landlords, thoughtful matching, respectful communication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="mx-auto w-full max-w-lg min-h-screen bg-white relative overflow-x-hidden shadow-sm">
            <Header />
            <main>{children}</main>
            <BottomNav />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
