"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import useSWR from "swr";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function CreditsDisplay({ className }: { className?: string }) {
  const router = useRouter();
  const [showAnimation, setShowAnimation] = useState(false);
  const [previousCredits, setPreviousCredits] = useState<number | null>(null);

  // Fetch credits from the API
  const { data, error, mutate } = useSWR("/api/credits", fetcher, {
    refreshInterval: 0, // Don't auto-refresh, we'll handle that
    revalidateOnFocus: false,
    dedupingInterval: 10000, // Only refetch at most every 10 seconds
  });

  const credits = data?.credits ?? 100; // Default to 100 if not loaded yet
  const isLowCredits = credits <= 20; // Consider 20 or fewer as "low"
  const isNewUser = !data && previousCredits === null; // If data is not yet loaded and no previous credits seen

  // Show animation when credits change
  useEffect(() => {
    if (isNewUser) {
      // Show welcome animation for new users
      setShowAnimation(true);
      // Change the animation style for welcome (will be implemented in the JSX)
      setTimeout(() => setShowAnimation(false), 3000); // Longer animation for welcome
    } else if (previousCredits !== null && previousCredits > credits) {
      // Show deduction animation
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 1500);
    }

    if (previousCredits !== credits) {
      setPreviousCredits(credits);
    }
  }, [credits, previousCredits, isNewUser]);

  // Watch for new assistant messages in the DOM to refresh credits
  useEffect(() => {
    // Function to refresh credits after a delay
    const refreshCredits = () => {
      // Wait a bit for the backend to update
      setTimeout(() => {
        mutate();
      }, 1000);
    };

    // Watch for DOM changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          // If a new message with role=assistant was added, refresh credits
          const assistantMessages = document.querySelectorAll(
            '[data-message-role="assistant"]'
          );
          if (assistantMessages.length > 0) {
            refreshCredits();
          }
        }
      }
    });

    // Start observing
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [mutate]);

  // Handle error
  if (error) {
    console.error("Failed to load credits", error);
  }

  // Warn user when credits are low
  useEffect(() => {
    if (credits <= 10 && credits > 0) {
      toast.warning(`You have only ${credits} credits remaining!`);
    } else if (credits === 0) {
      toast.error("You have no credits left. Please add more to continue.");
    }
  }, [credits]);

  // Handle buy credits click
  const handleBuyCredits = () => {
    router.push("/buy-credits");
  };

  return (
    <div
      className={cn(
        "relative flex items-center gap-1.5 py-1.5 px-3 rounded-md h-[34px]",
        className,
        {
          "bg-red-700 dark:bg-red-300 text-zinc-50 dark:text-zinc-900":
            credits === 0,
          "bg-yellow-600 dark:bg-yellow-300 text-zinc-50 dark:text-zinc-900":
            isLowCredits && credits > 0,
          "bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900":
            !isLowCredits && credits > 0,
        }
      )}
    >
      {credits === 0 ? (
        <button
          onClick={handleBuyCredits}
          className="text-sm font-medium flex items-center gap-1"
        >
          <span>💰</span>
          <span>Buy Credits</span>
        </button>
      ) : (
        <>
          <span className="text-sm font-medium">💰</span>
          <span className="text-sm font-medium">{credits}</span>
          {isLowCredits && (
            <button
              onClick={handleBuyCredits}
              className="ml-2 text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-1.5 py-0.5 rounded"
            >
              Buy More
            </button>
          )}
          <AnimatePresence>
            {showAnimation && (
              <motion.div
                className={cn(
                  "absolute font-bold text-sm",
                  isNewUser
                    ? "text-green-500 -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                    : "text-amber-500 -top-5 -right-2"
                )}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: isNewUser ? -5 : -10 }}
                exit={{ opacity: 0 }}
                transition={{ duration: isNewUser ? 0.5 : 1 }}
              >
                {isNewUser ? "Welcome! +100 credits" : "-1"}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
