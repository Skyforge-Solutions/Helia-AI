import { tool } from "ai";
import { z } from "zod";

interface UpdateDocumentProps {
  session: any;
  dataStream: any;
}

// Stub implementation that indicates the feature has been removed
export const updateDocument = ({ session, dataStream }: UpdateDocumentProps) =>
  tool({
    description: "This feature has been deprecated and is no longer available.",
    parameters: z.object({
      id: z.string().describe("The ID of the document to update"),
      description: z
        .string()
        .describe("The description of changes that need to be made"),
    }),
    execute: async ({ id, description }) => {
      return {
        error:
          "The document update feature has been deprecated and removed from the application.",
      };
    },
  });
