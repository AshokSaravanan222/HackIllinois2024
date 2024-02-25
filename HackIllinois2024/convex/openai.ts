"use node";
import OpenAI from "openai";
import { ChatCompletion, ImagesResponse } from "openai/resources";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Component, useState } from "react";
import { Id } from "./_generated/dataModel";

export const sendDallEOutfit = action({
  args: {
    age: v.number(),
    desc: v.string(),
    gender: v.string(),
    occasion: v.string(),
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
        prompt: prompt,
        model: "dall-e-2",
        n: 1,
        quality: "standard",
        response_format: "url",
        size: "256x256"
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

      // Write storageId as the body of the message to the Convex database.
      await ctx.runMutation(internal.outfits.sendDallEOutfit, {
        imageId: storageId,
        age: args.age,
        desc: args.desc,
        gender: args.gender,
        occasion: args.occasion
      });

      return storageId
      // Use the response here, for example, save the image URL
    } catch (error) {
      console.error("Failed to generate image:", error);
      // Handle the error appropriately
    }
  },
});

export const sendChatOutfit = action({

  args: {
    outfitId: v.string(),
    imgUrl: v.string(),
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

      const response: ChatCompletion = await openai.chat.completions.create({
        "model" : "gpt-4-vision-preview",
        "messages": [
          {
            "role": "user",
            "content": [
              {"type": "text", "text": "Describe this image."},
              {
                "type": "image_url",
                "image_url": {
                  "url": args.imgUrl,
                },
              },
            ],
          }
        ],
        "max_tokens": 300,
      });
      console.log(response);
      const responseText = response.choices[0].message.content;

      await ctx.runMutation(internal.outfits.sendChatOutfit, {
        id: args.outfitId,
        text: responseText
      });

      return responseText
      // Use the response here, for example, save the image URL
    } catch (error) {
      console.error("Failed to generate image:", error);
      // Handle the error appropriately
    }
  },
});
