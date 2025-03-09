'use client';

import type { ChatRequestOptions, CreateMessage, Message } from 'ai';
import cx from 'classnames';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import {
  type Dispatch,
  memo,
  ReactNode,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { nanoid } from 'nanoid';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { sanitizeUIMessages } from '@/lib/utils';

import {
  ArrowUpIcon,
  MessageIcon,
  PenIcon,
  SparklesIcon,
  StopIcon,
  SummarizeIcon,
} from "./icons";
import { UseChatHelpers } from "@ai-sdk/react";

type ToolProps = {
  description: string;
  icon: ReactNode;
  selectedTool: string | null;
  setSelectedTool: Dispatch<SetStateAction<string | null>>;
  isToolbarVisible?: boolean;
  setIsToolbarVisible?: Dispatch<SetStateAction<boolean>>;
  isAnimating: boolean;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  onClick: ({
    appendMessage,
  }: {
    appendMessage: UseChatHelpers["append"];
  }) => void;
};

const Tool = ({
  description,
  icon,
  selectedTool,
  setSelectedTool,
  isToolbarVisible,
  setIsToolbarVisible,
  isAnimating,
  append,
  onClick,
}: ToolProps) => {
  const handleSelect = () => {
    // This is expected to be implemented by callers
    onClick?.({ appendMessage: append });
    setSelectedTool(description);

    if (setIsToolbarVisible) {
      setIsToolbarVisible(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative"
    >
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              disabled={isAnimating}
              onClick={handleSelect}
              className={cx(
                "flex items-center justify-center size-10 border-none bg-background dark:text-white text-black rounded-full shadow-md hover:bg-zinc-100 dark:hover:bg-zinc-800",
                {
                  "bg-zinc-100 dark:bg-zinc-800":
                    description === selectedTool && isToolbarVisible,
                }
              )}
            >
              {icon}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            className="border-none shadow-md bg-background text-sm px-2 py-1 dark:text-white text-black"
          >
            {description}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
};

// Simplified toolbar with basic functionality
export type ToolbarItem = {
  description: string;
  icon: ReactNode;
  onClick: ({
    appendMessage,
  }: {
    appendMessage: UseChatHelpers["append"];
  }) => void;
};

export const PureToolbar = ({
  isToolbarVisible,
  setIsToolbarVisible,
  append,
  isLoading,
  stop,
  setMessages,
}: {
  isToolbarVisible: boolean;
  setIsToolbarVisible: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  stop: () => void;
  setMessages: Dispatch<SetStateAction<Message[]>>;
}) => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(toolbarRef, () => {
    setIsToolbarVisible(false);
  });

  useEffect(() => {
    if (isLoading) {
      setIsToolbarVisible(false);
    }
  }, [isLoading, setIsToolbarVisible]);

  // Simplified default tools
  const defaultTools: ToolbarItem[] = [
    {
      description: "Suggest a creative response",
      icon: <SparklesIcon />,
      onClick: ({ appendMessage }) => {
        appendMessage({
          id: nanoid(),
          role: "user",
          content: "Suggest a creative response to the conversation so far.",
        });
      },
    },
    {
      description: "Summarize the conversation",
      icon: <SummarizeIcon />,
      onClick: ({ appendMessage }) => {
        appendMessage({
          id: nanoid(),
          role: "user",
          content: "Summarize the key points of our conversation so far.",
        });
      },
    },
  ];

  return (
    <div
      className={cx(
        "flex transition-transform fixed bottom-[80px] md:bottom-[88px] right-4 md:right-6 z-10",
        {
          "opacity-0 pointer-events-none": !isToolbarVisible,
        }
      )}
      ref={toolbarRef}
    >
      <div className="relative p-2 rounded-full flex flex-col gap-2 items-center">
        {isLoading ? (
          <button
            className="size-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-md shadow-red-200"
            onClick={() => stop()}
          >
            <StopIcon />
          </button>
        ) : (
          <AnimatePresence>
            {defaultTools.map((tool) => (
              <Tool
                key={tool.description}
                description={tool.description}
                icon={tool.icon}
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
                isToolbarVisible={isToolbarVisible}
                setIsToolbarVisible={setIsToolbarVisible}
                isAnimating={isAnimating}
                append={append}
                onClick={tool.onClick}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export const Toolbar = memo(PureToolbar);
