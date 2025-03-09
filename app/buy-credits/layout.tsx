import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Credits - Helia AI",
  description: "Purchase credits to continue using Helia AI",
};

export default function BuyCreditsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
