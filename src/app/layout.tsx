import type { Metadata } from "next";
import "./globals.css";

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
        <div className="phone-frame">
          {children}
        </div>
      </body>
    </html>
  );
}
