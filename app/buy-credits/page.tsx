"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import { creditPackages, CreditPackage } from "@/lib/constants";

// Fetch function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BuyCreditsPage() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch current credits
  const { data, error } = useSWR("/api/credits", fetcher);
  const credits = data?.credits ?? 0;

  const handlePurchase = async () => {
    if (!selectedPackage) {
      toast.error("Please select a package first");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/credits/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packageId: selectedPackage }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to process payment");
      }

      // Update credits in UI
      mutate("/api/credits");

      toast.success(`Successfully purchased credits!`);

      // Redirect back to chat after a short delay
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 text-white">
      <Toaster position="top-center" />
      <div className="w-full max-w-md p-8 mx-auto bg-zinc-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-2 text-center">Buy Credits</h1>
        <p className="text-sm text-zinc-400 mb-6 text-center">
          Each AI response costs 1 credit. New users get 100 free credits upon
          registration.
        </p>

        <div className="mb-6 text-center">
          <span className="text-sm text-zinc-400">Your current balance</span>
          <div className="text-3xl font-bold flex items-center justify-center gap-2">
            <span className="text-amber-400">💰</span>
            <span>{credits} credits</span>
          </div>
        </div>

        <div className="grid gap-4 mb-8">
          {creditPackages.map((pkg: CreditPackage) => (
            <button
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`p-4 border rounded-lg flex items-center justify-between transition-colors ${
                selectedPackage === pkg.id
                  ? "bg-blue-600 border-blue-400"
                  : "bg-zinc-700 border-zinc-600 hover:bg-zinc-600"
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{pkg.credits} Credits</span>
                <span className="text-sm text-zinc-300">
                  {pkg.id === "basic" && "Best for beginners"}
                  {pkg.id === "standard" && "Most popular"}
                  {pkg.id === "premium" && "Best value"}
                </span>
              </div>
              <div className="text-xl font-bold">${pkg.price}</div>
            </button>
          ))}
        </div>

        <button
          onClick={handlePurchase}
          disabled={!selectedPackage || isProcessing}
          className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${
            !selectedPackage || isProcessing
              ? "bg-zinc-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isProcessing ? "Processing..." : "Purchase Now"}
        </button>

        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-zinc-400 hover:text-zinc-300 text-sm"
          >
            Return to Chat
          </button>
        </div>
      </div>
    </div>
  );
}
