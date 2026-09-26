import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
