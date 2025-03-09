import { Artifact } from '@/components/create-artifact';
import { CopyIcon, RedoIcon, UndoIcon } from '@/components/icons';
import { ImageEditor } from '@/components/image-editor';
import { toast } from 'sonner';

// Define types to avoid TypeScript errors
interface StreamPart {
  type: string;
  content: unknown;
}

interface ArtifactState {
  content: string;
  isVisible: boolean;
  status: string;
  [key: string]: any;
}

interface VersionChangeHandler {
  (index: number): void;
}

export const imageArtifact = new Artifact({
  kind: "image",
  description: "Useful for image generation",
  onStreamPart: ({
    streamPart,
    setArtifact,
  }: {
    streamPart: StreamPart;
    setArtifact: (updater: (draft: ArtifactState) => ArtifactState) => void;
  }) => {
    if (streamPart.type === "image-delta") {
      setArtifact((draftArtifact: ArtifactState) => ({
        ...draftArtifact,
        content: streamPart.content as string,
        isVisible: true,
        status: "streaming",
      }));
    }
  },
  content: ImageEditor,
  actions: [
    {
      icon: RedoIcon,
      name: "Next Version",
      condition: ({
        handleVersionChange,
        currentVersionIndex,
      }: {
        handleVersionChange: VersionChangeHandler;
        currentVersionIndex: number;
      }) => {
        return (
          typeof handleVersionChange === "function" && currentVersionIndex < 2
        );
      },
      action: ({
        handleVersionChange,
        currentVersionIndex,
      }: {
        handleVersionChange: VersionChangeHandler;
        currentVersionIndex: number;
      }) => {
        handleVersionChange(currentVersionIndex + 1);
      },
    },
    {
      icon: UndoIcon,
      name: "Previous Version",
      condition: ({
        handleVersionChange,
        isCurrentVersion,
      }: {
        handleVersionChange: VersionChangeHandler;
        isCurrentVersion: boolean;
      }) => {
        return typeof handleVersionChange === "function" && !isCurrentVersion;
      },
      action: ({
        handleVersionChange,
      }: {
        handleVersionChange: VersionChangeHandler;
      }) => {
        handleVersionChange(0);
      },
    },
    {
      icon: CopyIcon,
      name: "Copy to Clipboard",
      action: ({ content }: { content: string }) => {
        navigator.clipboard.writeText(content);
        toast.success("Copied to clipboard");
      },
    },
  ],
});
