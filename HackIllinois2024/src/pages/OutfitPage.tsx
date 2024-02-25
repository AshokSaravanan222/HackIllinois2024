import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
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
// import Exa, { SearchResponse, SearchResult } from "exa-js";
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import RetailersDisplay from '@/Retailers';


const OutfitPage: React.FC = () => {
  const location = useLocation();
  const { outfitId } = location.state || {};
  const imgUrl = useQuery(api.outfits.getOutfitImageLink, { outfitId: outfitId });
  const outfitDesc = useQuery(api.outfits.getOutfitDesc, { outfitId: outfitId });
  // const outfitInfo = useQuery(api.outfits.getOutfitInfo, { outfitId: outfitId });

  const sendChatOutfit = useAction(api.openai.sendChatOutfit);
  const [text, setText] = useState(" ");
  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [image, setImage] = useState<string | null>(null);

  // const exa = new Exa("542b09d5-db6d-4e5a-964e-e42a38603cf2");
  const [isOpen, setIsOpen] = useState(false); // State to track the modal open status
  // const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/'); // Adjust the path as needed for your home screen
  };

  // useEffect(() => {
  //   const fetchSearchResults = async (text: string) => {
  //     const DEPLOYMENT_NAME = "https://watchful-mandrill-798.convex.cloud/exaSearch"; // Replace with your actual deployment name
  //     try {
  //       const response = await fetch(DEPLOYMENT_NAME, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ query: text }),
  //       });
        
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch search results");
  //       }
  //       const data = await response.json();
  //       console.log(data)
  //       // Use the data as needed in your component
  //     } catch (error) {
  //       console.error("Error fetching search results:", error);
  //     }
  //   };
    
  //   fetchSearchResults(`major retailers selling ${text} for ${outfitInfo?.gender} aged ${outfitInfo?.age} and for the ${outfitInfo?.occasion}`);
  // }, [isOpen, text]);
  

  useEffect(() => {
    if (imgUrl) {
      setImage(imgUrl);
      setIsLoadingImage(false);
      if (outfitDesc) {
        setText(outfitDesc);
      } else {
        handleGenerateText();
      }
      
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
    <div className='relative'>
      <button 
        onClick={handleBackClick} 
        className="absolute top-4 left-4 flex items-center justify-center p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-label="Go back"
      >
        <ArrowLeftIcon width={24} height={24} />
      </button>
      {isLoadingImage ? (
        <div className='center'>
          <p className="text-lg font-semibold">Getting your image...</p>
        </div>

      ) : (
        <div className="h-screen flex">
          <div className="flex-grow flex items-center justify-center p-4" style={{ maxWidth: '85%' }}>
          <div className="text-2xl">
            {/* Adjusted for bold and moved up */}
            {isLoadingText ? (
                <p className="text-lg font-semibold">Finding your style...</p>
            ) : (
              <div className='p-10'>
                <h2 className="font-bold mb-3 text-3xl" style={{ marginBottom: '1.5rem' }}>You would look stylish wearing:</h2>
                {/* Modify the Dialog component to include search results */}
                {splitAndTrimString(text).map((text, index) => (
                  <Dialog key={index} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      {/* Wrap the text with a <span> and apply underline class to it */}
                      <span className="text-3xl my-3 cursor-pointer underline inline-block">
                        <p>{text}</p> {/* Ensure the <p> tag is the only child of <span> */}
                      </span>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[80vh] flex flex-col">
                      <DialogTitle>{text}</DialogTitle>
                      <DialogDescription>
                        Find stores near you.
                      </DialogDescription>
                      <div className="flex-grow overflow-auto">
                        <RetailersDisplay searchQuery={text} />
                      </div>
                      <DialogClose className="mt-4 self-end">Close</DialogClose>
                    </DialogContent>
                  </Dialog>
                ))}
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
