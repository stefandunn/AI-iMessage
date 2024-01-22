import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.scss";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat AI - iMessage Style",
  description: "An AI chat app styled to look similar to iMessage.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
