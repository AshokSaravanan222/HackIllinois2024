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
