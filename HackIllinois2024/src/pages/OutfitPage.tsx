import React, { useState } from 'react';
import { useParams, useNavigate, useLocation} from 'react-router-dom';
import image from "./Outfit1.png";
import { api } from "../../convex/_generated/api";
import { useAction } from "convex/react";
import { Id } from 'convex/_generated/dataModel';
import { Button } from "@/components/ui/button";

const OutfitPage: React.FC = () => {
  const location = useLocation();
  const { outfitId } = location.state || {};

  const getImageLink = useAction(api.outfits.getOutfitImageLink);
  const sendChatOutfit = useAction(api.openai.sendChatOutfit);
  const [text, setText] = useState(" ");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateText = async () => {
    setIsLoading(true);
    try {


      const generatedText = await sendChatOutfit({ imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg", outfitId: outfitId});
      setText(generatedText);
    } catch (error) {
      console.error("Failed to get text:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex">
      <div className="flex-grow flex items-center justify-center p-4" style={{ maxWidth: '85%' }}>
        <div className="text-2xl">
          <h2 className="font-bold mb-2" style={{ marginBottom: '2rem' }}>You would look stylish wearing:</h2> {/* Adjusted for bold and moved up */}
          <ul className="leading-10">
            <li>Light-wash denim jacket, classic fit.</li>
            <li>Grey crew-neck sweater, simple design.</li>
            <li>High-waisted denim jeans, matching jacket.</li>
            <li>White low-top sneakers, clean look.</li>
            <li>Dark leather belt, silver rectangular buckle.</li>
            <li>Brown leather tote bag, unstructured style.</li>
          </ul>
        </div>
      </div>
      <img src={image} alt="Outfit" className="object-contain self-center rounded-lg" style={{ maxHeight: '70%', marginTop: '10%', marginBottom: '10%', marginRight: '20%' }} />
    </div>
  );
};

export default OutfitPage;
