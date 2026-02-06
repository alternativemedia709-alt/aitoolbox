import type { CollectionConfig } from "payload";

export const ToolRuns: CollectionConfig = {
  slug: "tool-runs",
  admin: {
    useAsTitle: "tool",
  },
  fields: [
    {
      name: "tool",
      type: "select",
      required: true,
      options: [
        { label: "Image", value: "image" },
        { label: "Article", value: "article" },
        { label: "Social", value: "social" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "queued",
      options: [
        { label: "Queued", value: "queued" },
        { label: "Running", value: "running" },
        { label: "Completed", value: "completed" },
        { label: "Failed", value: "failed" },
      ],
    },
    {
      name: "input",
      type: "json",
    },
    {
      name: "output",
      type: "json",
    },
    {
      name: "owner",
      type: "relationship",
      relationTo: "users",
    },
  ],
};
