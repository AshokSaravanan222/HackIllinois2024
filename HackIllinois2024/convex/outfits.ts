import { v } from "convex/values";
import { query, mutation, internalMutation, action } from "./_generated/server";

export const sendDallEOutfit = internalMutation(
  async (ctx, { imageId, age, desc, gender, occasion }) => {
    const outfit = { imageId: imageId, age: age, desc: desc, gender: gender, occasion: occasion };
    await ctx.db.insert("outfits", outfit);
  }
);

export const listOutfits = query({
  // Validators for arguments.
  args: {
    count: v.number(),
  },

  // Function implementation.
  handler: async (ctx, args) => {
    // Read the database as many times as you need here.
    // See https://docs.convex.dev/database/reading-data.
    const outfits = await ctx.db.query("outfits").collect();

    const outfitsWithImageURLs = await Promise.all(
      outfits.map(async (outfit) => ({
        ...outfit,
        imageUrl: await ctx.storage.getUrl(outfit.imageId),
      }))
    );

    return outfitsWithImageURLs;
  },
});

