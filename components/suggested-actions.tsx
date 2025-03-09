'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { memo } from 'react';

interface SuggestedActionsProps {
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  // const suggestedActions = [
  //   {
  //     title: "What is Helia AI?",
  //     label: "Tell me about your capabilities",
  //     action: "What is Helia AI? Tell me about your capabilities.",
  //   },
  //   {
  //     title: "How do credits work?",
  //     label: "Explain the credit system",
  //     action: "How do credits work in Helia AI? Explain the credit system.",
  //   },
  //   {
  //     title: "Can you summarize",
  //     label: "long scientific papers?",
  //     action: "Can you summarize long scientific papers? How does that work?",
  //   },
  //   {
  //     title: "What data sources",
  //     label: "do you use for information?",
  //     action: "What data sources do you use for information?",
  //   },
  // ];
  const suggestedActions = [
    {
      title: "Helia Sun Shield 🛡️",
      label: "What’s the best way to monitor my child’s screen time?",
      action: "What’s the best way to monitor my child’s screen time?",
    },
    {
      title: "Helia Growth Ray 💡",
      label: "What's the best way to boost my child's self-esteem?",
      action: "What's the best way to boost my child's self-esteem?",
    },
    {
      title: "Helia Sunbeam 🎙️",
      label: "How can I build a stronger emotional connection with my child?",
      action: "How can I build a stronger emotional connection with my child?",
    },
    {
      title: "Helia Inner Dawn 🧘",
      label: "How do I stay patient with my child when I'm overwhelmed?",
      action: "How do I stay patient with my child when I'm overwhelmed?",
    },
  ];

  return (
    <div
      data-testid="suggested-actions"
      className="grid sm:grid-cols-2 gap-3 w-full"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? "hidden sm:block" : "block"}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, "", `/chat/${chatId}`);

              append({
                role: "user",
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start whitespace-normal"
          >
            <span className="font-medium break-words w-full">
              {suggestedAction.title}
            </span>
            <span className="text-muted-foreground break-words w-full overflow-hidden">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
