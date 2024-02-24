import { v } from "convex/values";
import { query, mutation, internalMutation, action } from "./_generated/server";
import { Id } from "./_generated/dataModel";


export const sendDallEOutfit = internalMutation(
  async (ctx, { imageId , age , desc, gender, occasion }) => {
    const outfit = { imageId: (imageId as Id<"_storage">), age: (age as number), desc: (desc as string) , gender: (gender as string), occasion: (occasion as string) };
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

