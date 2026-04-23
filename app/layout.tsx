import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Vibe Music",
  description: "Weather and location based YouTube music recommendation app."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
