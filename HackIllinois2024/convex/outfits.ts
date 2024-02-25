import { v } from "convex/values";
import { query, internalMutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";


export const sendDallEOutfit = internalMutation(
  async (ctx, { imageId , age , accessories, gender, occasion }) => {
    const outfit = { imageId: (imageId as Id<"_storage">), age: (age as number), accessories: (accessories as string) , gender: (gender as string), occasion: (occasion as string), gptDesc: ""};
    const id = await ctx.db.insert("outfits", outfit);
    return { id }
  }
);

export const sendChatOutfit = internalMutation(
  async (ctx, {outfitId, text}) => {
    const outfitIdJSON = {id: (outfitId as Id<"outfits">) }
    const value = {gptDesc: (text as string)};
    await ctx.db.patch(outfitIdJSON.id, value);
    return value;
  }
);

export const searchLinks = internalMutation(
  async (ctx, {outfitId, text}) => {
    const outfitIdJSON = {id: (outfitId as Id<"outfits">) }
    const value = {gptDesc: (text as string)};
    await ctx.db.patch(outfitIdJSON.id, value);
    return value;
  }
);

export const getOutfitImageLink = query({
  // Validators for arguments.
  args: {
    outfitId: v.id("outfits")
  },
  // Function implementation.
  handler: async (ctx, args) => {
    const outfit = await ctx.db.get(args.outfitId);
    return ctx.storage.getUrl(outfit!.imageId);
  },
});

export const getOutfitDesc = query({
  // Validators for arguments.
  args: {
    outfitId: v.id("outfits")
  },
  // Function implementation.
  handler: async (ctx, args) => {
    const outfit = await ctx.db.get(args.outfitId);
    return outfit?.gptDesc
  },
});

export const getOutfitInfo = query({
  // Validators for arguments.
  args: {
    outfitId: v.id("outfits")
  },
  // Function implementation.
  handler: async (ctx, args) => {
    const outfit = await ctx.db.get(args.outfitId);
    return outfit;
  },
});


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


