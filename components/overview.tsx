import { motion } from "framer-motion";
import { SunIcon } from "lucide-react";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="relative rounded-xl p-6 flex flex-col gap-6 leading-relaxed text-center max-w-xl">
        {/* Helia AI Title with Icon */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Adjusted icon for better visibility */}
          <SunIcon
            className="text-zinc-400 dark:text-zinc-600 opacity-40 dark:opacity-60"
            size={60} // Slightly larger for clarity
            style={{
              position: "absolute",
              top: "-75px", // Adjusted to avoid overlap
              left: "50%",
              transform: "translateX(-50%)", // Centered properly
              filter: "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4))", // Dark mode contrast
            }}
          />
          <p
            className="text-3xl font-bold tracking-wide relative text-zinc-700 dark:text-zinc-300"
            style={{
              textShadow:
                "1px 1px 2px rgba(0, 0, 0, 0.3), -1px -1px 1px rgba(255, 255, 255, 0.5)",
            }}
          >
            Welcome to Helia AI
          </p>
        </div>

        {/* Helia AI Description */}
        <p className="text-lg text-zinc-700 dark:text-zinc-300">
          Your AI-powered parenting assistant, designed to help with digital
          safety, emotional growth, family bonding, and mindfulness.
        </p>

        {/* Credit Usage Info */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Start by asking a question or selecting one of the suggested topics
          below. Each response uses <strong>1 credit</strong> from your account.
        </p>
      </div>
    </motion.div>
  );
};
