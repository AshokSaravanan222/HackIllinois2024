"use node";
import OpenAI from "openai";
import { ImagesResponse } from "openai/resources";
import { action } from "./_generated/server";
import { v } from "convex/values";

// Initialize the OpenAI client with the given API key
const apiKey = "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";
const openai = new OpenAI({ apiKey });

export const chat = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const apiKey = "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";
      if (!apiKey) {
        throw new Error(
          "Add your OPENAI_API_KEY as an env variable in the " +
            "[dashboard](https://dasboard.convex.dev)"
        );
      }
      const openai = new OpenAI({ apiKey });

      const prompt = `I want an image of an entire college ${args.gender}, but I only them to appear in the image once. I want the image to depict what this person might wear for a ${args.occasion}, with the following accessor: ${args.desc}, and I do not want the individual clothing items to appear in the image.`

      // Check if the prompt is offensive.
      const modResponse = await openai.moderations.create({"input": prompt});
      const modResult = modResponse.results[0];
      if (modResult.flagged) {
        throw new Error(
          `Your prompt was flagged: ${JSON.stringify(modResult.categories)}`
        );
      }

      const response: ImagesResponse = await openai.images.generate({
        prompt: args.prompt,
        model: "dall-e-2",
        n: 1,
        quality: "standard",
        response_format: "url",
        size: "256x256"
      });
      console.log(response);
      console.log(response.data[0].url);
      return response.data[0].url
      // Use the response here, for example, save the image URL
    } catch (error) {
      console.error("Failed to generate image:", error);
      // Handle the error appropriately
    }
  },
});
