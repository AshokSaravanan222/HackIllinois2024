import React, { useState }from 'react';
import { useParams } from 'react-router-dom';
import image from "./Outfit1.png";
import { api } from "../../convex/_generated/api";
import { useAction } from "convex/react";
import { Id } from 'convex/_generated/dataModel';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const OutfitPage: React.FC = () => {
  const { outfitId } = useParams<{ outfitId: string }>();
  const sendChatOutfit = useAction(api.openai.sendChatOutfit);

  const [text, setText] = useState(" "); // Add this line
  const [isLoading, setIsLoading] = useState(false); // Add this line

  const navigate = useNavigate();

  // Function to handle navigation
  const goToHomePage = () => {
    navigate("/");
  };

  const handleGenerateText= async () => {
    setIsLoading(true); // Start loading
    try {
      const text = await sendChatOutfit({"imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg", "outfitId": (outfitId as string) });
      setText(text);

    } catch (error) {
      console.error("Failed to get text:", error);
    } finally {
      setIsLoading(false); // Stop loading whether it's successful or fails
    }
  };

  

  return (
    <div>
      <p>Outfit Features: {outfitId}</p>
      {image && <img src={image} alt="Generated Outfit" />}
      
      <Button onClick={handleGenerateText} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Text'}
      </Button>

      <p>{text}</p>

    </div>
  );
};

export default OutfitPage;
