'use client';

import type { Attachment, Message } from 'ai';
import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { ChatHeader } from "@/components/chat-header";
import type { Vote } from "@/lib/db/schema";
import { fetcher, generateUUID } from "@/lib/utils";
import { MultimodalInput } from "./multimodal-input";
import { Messages } from "./messages";
import { VisibilityType } from "./visibility-selector";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function Chat({
  id,
  initialMessages,
  selectedChatModel,
  selectedVisibilityType,
  isReadonly,
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedChatModel: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const { mutate } = useSWRConfig();
  const [hasInsufficientCredits, setHasInsufficientCredits] = useState(false);
  const router = useRouter();

  // Fetch credits to determine if input should be disabled
  const { data: creditsData } = useSWR("/api/credits", fetcher, {
    refreshInterval: 10000,
  });

  const credits = creditsData?.credits ?? 100;

  // Update insufficient credits state when credits change
  useEffect(() => {
    setHasInsufficientCredits(credits <= 0);
  }, [credits]);

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    reload,
  } = useChat({
    id,
    body: { id, selectedChatModel: selectedChatModel },
    initialMessages,
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    generateId: generateUUID,
    onFinish: () => {
      mutate("/api/history");
    },
    onError: (error) => {
      // Check if error is due to insufficient credits
      if (error.message?.includes("Insufficient credits")) {
        setHasInsufficientCredits(true);
        toast.error(
          "Insufficient credits. Please add more credits to continue."
        );
      } else {
        toast.error("An error occurred, please try again!");
      }
    },
  });

  const { data: votes } = useSWR<Array<Vote>>(
    `/api/vote?chatId=${id}`,
    fetcher
  );

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader
          chatId={id}
          selectedModelId={selectedChatModel}
          selectedVisibilityType={selectedVisibilityType}
          isReadonly={isReadonly}
        />

        <Messages
          chatId={id}
          isLoading={isLoading}
          votes={votes}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
        />

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          {!isReadonly && !hasInsufficientCredits && (
            <MultimodalInput
              chatId={id}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              stop={stop}
              attachments={attachments}
              setAttachments={setAttachments}
              messages={messages}
              setMessages={setMessages}
              append={append}
            />
          )}
          {hasInsufficientCredits && (
            <div className="text-center py-4 px-6 mx-auto my-4 max-w-md border border-red-300 rounded-lg bg-red-50 dark:bg-red-950 dark:border-red-800">
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
                You&apos;re out of credits
              </h3>
              <p className="text-red-600 dark:text-red-300 mb-2">
                Your initial 100 credits have been used. Purchase more credits
                to continue chatting with Helia AI.
              </p>
              <p className="text-xs text-red-500 dark:text-red-400 mb-4">
                Each AI response costs 1 credit. New users get 100 credits for
                free upon sign-up.
              </p>
              <button
                onClick={() => router.push("/buy-credits")}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors"
              >
                Buy Credits Now
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
