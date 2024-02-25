import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { api } from "../../convex/_generated/api";
import { useAction, useQuery } from "convex/react";
import { Button } from "@/components/ui/button";

const OutfitPage: React.FC = () => {
  const location = useLocation();
  const { outfitId } = location.state || {};
  const imgUrl = useQuery(api.outfits.getOutfitImageLink, { outfitId: outfitId });
  const sendChatOutfit = useAction(api.openai.sendChatOutfit);
  const [text, setText] = useState(" ");
  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (imgUrl) {
      setImage(imgUrl);
      setIsLoadingImage(false);
      handleGenerateText();
    }
  }, [imgUrl]);

  function splitAndTrimString(inputString: string): string[] {
    // Check if the string contains any periods. If not, return the original string in an array.
    if (!inputString.includes('.')) {
      return [inputString.trim()];
    }
    // Split the string by periods and trim each substring
    const trimmedSubstrings = inputString.split('.').map(substring => substring.trim());
  
    // Filter out any empty strings that may have been created by consecutive periods
    const nonEmptySubstrings = trimmedSubstrings.filter(substring => substring !== '');
  
    return nonEmptySubstrings;
  }

  const handleGenerateText = async () => {
    setIsLoadingText(true);
    try {
      const gptDesc = await sendChatOutfit({ imgUrl: imgUrl!, outfitId: outfitId!})
      setText(gptDesc!);
    } catch (error) {
      console.error("Failed to get text:", error);
    } finally {
      setIsLoadingText(false);
    }
  };

  return (
    <div>
      {isLoadingImage ? (
        <p>Getting your image</p>
      ) : (
        <div className="h-screen flex">
          <div className="flex-grow flex items-center justify-center p-4" style={{ maxWidth: '85%' }}>
          <div className="text-2xl">
            {/* Adjusted for bold and moved up */}
            {isLoadingText ? (
                <p className="text-lg font-semibold">Finding your style...</p>
            ) : (
              <div>
                <h2 className="font-bold mb-3 text-3xl" style={{ marginBottom: '1.5rem' }}>You would look stylish wearing a:</h2>
                {splitAndTrimString(text).map((text, index) => (
                    <div key={index}>
                      <p className="text-3xl my-3">{text}</p>
                    </div>
                  ))}
                {/* <ul className="leading-10">
                  <li>Light-wash denim jacket, classic fit.</li>
                  <li>Grey crew-neck sweater, simple design.</li>
                  <li>High-waisted denim jeans, matching jacket.</li>
                  <li>White low-top sneakers, clean look.</li>
                  <li>Dark leather belt, silver rectangular buckle.</li>
                  <li>Brown leather tote bag, unstructured style.</li>
                </ul> */}
              </div>
            )}

          </div>
        </div>
        <img src={image!} alt="Outfit" className="object-contain self-center rounded-lg" style={{ maxHeight: '70%', marginTop: '10%', marginBottom: '10%', marginRight: '20%' }} />
      </div>
      )}
      
    </div>
  );
};

export default OutfitPage;
