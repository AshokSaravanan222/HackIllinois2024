import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  outfits: defineTable({ // Assuming 'outfits' is the table you want to use
    desc: v.string(),
    id: v.string(),
    imageLink: v.string(),
    // Add additional fields here as needed, e.g., images, tags, etc.
    // Example: image: v.string(), tags: v.array(v.string()),
  }),
});
