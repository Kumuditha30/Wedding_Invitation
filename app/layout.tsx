import type { Metadata } from "next";
import { publicSiteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(publicSiteUrl),
  title: "Sachintha & Ranumi | Homecoming",
  description:
    "A special homecoming wedding celebration for Sachintha & Ranumi — December 5th, 2026.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
