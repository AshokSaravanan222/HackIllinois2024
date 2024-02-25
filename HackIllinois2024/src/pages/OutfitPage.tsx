import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from "../../convex/_generated/api";
import { useAction, useQuery } from "convex/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '../components/ui/dialog'; // Adjust the import path according to your project structure
import Exa from "exa-js";


const OutfitPage: React.FC = () => {
  const location = useLocation();
  const { outfitId } = location.state || {};
  const imgUrl = useQuery(api.outfits.getOutfitImageLink, { outfitId: outfitId });
  const sendChatOutfit = useAction(api.openai.sendChatOutfit);
  const [text, setText] = useState(" ");
  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const exa = new Exa(process.env.EXA_API_KEY);
  const [isOpen, setIsOpen] = useState(false); // State to track the modal open status
  const [searchResults, setSearchResults] = useState([]);

  // Example function to extract domains from the file
  const extractDomains = (): string[] => {
    // This function should read from the uploaded text file and return an array of domains
    // For demonstration, returning a static list. Replace this logic as needed.
    return ['nytimes.com', 'wsj.com', 'target.com', 'macys.com', 'nordstrom.com'];
  };

  useEffect(() => {
    if (isOpen) {
      const fetchSearchResults = async () => {
        const domains = extractDomains(); // Call the function to extract domains from the file
        try {
          const response = await exa.search(text, {
            numResults: 5,
            includeDomains: domains,
          });
          setSearchResults(response); // Assuming 'response' is the array of search results
        } catch (error) {
          console.error("Failed to fetch search results:", error);
        }
      };

      fetchSearchResults();
    }
  }, [isOpen, text]); // Depend on isOpen and text state

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
      {/* Your existing component return code */}
      {/* Modify the Dialog component to include search results */}
      {splitAndTrimString(text).map((text, index) => (
        <Dialog key={index} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <p className="text-3xl my-3 cursor-pointer">{text}</p>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Outfit Detail</DialogTitle>
            <DialogDescription>
              This outfit includes {text}.
              {/* Display search results here */}
              <ul className="list-disc pl-5">
                {searchResults.map((result, index) => (
                  <li key={index}>{result.title} - {result.url}</li> // Adjust according to your actual result structure
                ))}
              </ul>
            </DialogDescription>
            <DialogClose className="close-button-styles">Close</DialogClose>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default OutfitPage;
