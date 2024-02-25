"use node";
import OpenAI from "openai";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const sendDallEOutfit = action({
  args: {
    age: v.number(),
    accessories: v.string(),
    gender: v.string(),
    occasion: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error(
          "Add your OPENAI_API_KEY as an env variable in the " +
            "[dashboard](https://dasboard.convex.dev)"
        );
      }
      const openai = new OpenAI({ apiKey });

      const prompt = `Generate a vertical image of a ${args.age}-year college ${args.gender}, who wants to wear, ${args.accessories} to a ${args.occasion}, where the image only includes one person.`

      // Check if the prompt is offensive.
      const modResponse = await openai.moderations.create({"input": prompt});
      const modResult = modResponse.results[0];
      if (modResult.flagged) {
        throw new Error(
          `Your prompt was flagged: ${JSON.stringify(modResult.categories)}`
        );
      }


      const response = await openai.images.generate({
        prompt: prompt,
        model: "dall-e-2",
        n: 1,
        quality: "standard",
        response_format: "url",
      });
      console.log(response);
      const dallEImageUrl = response.data[0]["url"]!;

      // Download the image
      const imageResponse = await fetch(dallEImageUrl);
      if (!imageResponse.ok) {
        throw new Error(`failed to download: ${imageResponse.statusText}`);
      }

      // Store the image to Convex storage.
      const image = await imageResponse.blob();
      // TODO update storage.store to accept whatever kind of Blob is returned from node-fetch
      const storageId = await ctx.storage.store(image as Blob);
      
      // defining outfit object
      const outfit = {
        imageId: storageId,
        age: args.age,
        accessories: args.accessories,
        gender: args.gender,
        occasion: args.occasion
      }

      // Write storageId as the body of the message to the Convex database.
      const { id } = (await ctx.runMutation(internal.outfits.sendDallEOutfit, outfit) as {id: Id<"outfits">});
      return id;
      // Use the response here, for example, save the image URL
    } catch (error) {
      console.error("Failed to generate image:", error);
      // Handle the error appropriately
    }
  },
});

export const sendChatOutfit = action({
  args: {
    outfitId: v.id("outfits"),
    imgUrl: v.string(),
  },

  handler: async (ctx, args) => {
    try {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error(
          "Add your OPENAI_API_KEY as an env variable in the " +
            "[dashboard](https://dasboard.convex.dev)"
        );
      }
      const openai = new OpenAI({ apiKey });

      const response = await openai.chat.completions.create({
        "model" : "gpt-4-vision-preview",
        "messages": [
          {
            "role": "user",
            "content": [
              {"type": "text", "text": "Desribe only each article of clothing in 8 words or less, seperating each one by a period."},
              {
                "type": "image_url",
                "image_url": {
                  "url": args.imgUrl, // if this is not valid we have to convert to b64
                },
              },
            ],
          }
        ],
        "max_tokens": 300,
      });
      console.log(response);
      const responseText = response.choices[0].message.content;
      console.log(responseText);

      const input = {
        outfitId: args.outfitId,
        text: responseText!
      }
      
      const { gptDesc } = (await ctx.runMutation(internal.outfits.sendChatOutfit, input) as {gptDesc: string});
      return gptDesc;

      // Use the response here, for example, save the image URL
    } catch (error) {
      console.error("Failed to generate image:", error);
      // Handle the error appropriately
    }
  },
});
