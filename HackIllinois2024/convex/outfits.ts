import { v } from "convex/values";
import { query, mutation, internalMutation, action } from "./_generated/server";
import { Id } from "./_generated/dataModel";


export const sendDallEOutfit = internalMutation(
  async (ctx, { imageId , age , desc, gender, occasion }) => {
    const outfit = { imageId: (imageId as Id<"_storage">), age: (age as number), desc: (desc as string) , gender: (gender as string), occasion: (occasion as string) };
    await ctx.db.insert("outfits", outfit);
  }
);

export const sendChatOutfit = internalMutation(
  async (ctx, {outputId, text}) => {
    // update the id of the existing document, with the output id
  }
);

export const listOutfits = query({
  // Validators for arguments.
  args: {
    count: v.number(),
  },

  // Function implementation.
  handler: async (ctx, args) => {
    // Read the database to get outfits.
    const outfits = await ctx.db.query("outfits").collect();

    // Get outfits with image URLs.
    const outfitsWithImageURLs = await Promise.all(
      outfits.map(async (outfit) => ({
        ...outfit,
        imageUrl: await ctx.storage.getUrl(outfit.imageId),
      }))
    );
    
    // Shuffle the array of outfits with image URLs.
    const shuffledOutfits = outfitsWithImageURLs.sort(() => 0.5 - Math.random());

    // Determine the number of outfits to return based on args.count or the maximum available.
    const count = Math.min(args.count, shuffledOutfits.length);

    // Return a random selection of outfits based on the count.
    return shuffledOutfits.slice(0, count);
  },
});


