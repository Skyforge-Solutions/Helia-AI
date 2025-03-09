import { tool } from "ai";
import { z } from "zod";

interface CreateDocumentProps {
  session: any;
  dataStream: any;
}

// Stub implementation that indicates the feature has been removed
export const createDocument = ({ session, dataStream }: CreateDocumentProps) =>
  tool({
    description: "This feature has been deprecated and is no longer available.",
    parameters: z.object({
      title: z.string(),
      kind: z.string(),
    }),
    execute: async ({ title, kind }) => {
      return {
        error:
          "The document creation feature has been deprecated and removed from the application.",
      };
    },
  });
