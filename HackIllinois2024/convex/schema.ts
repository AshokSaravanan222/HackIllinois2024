import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  outfits: defineTable({
    imageId: v.id("_storage"),
    age: v.number(),
    desc: v.string(),
    gender: v.string(),
    occasion: v.string(),
  },)
});