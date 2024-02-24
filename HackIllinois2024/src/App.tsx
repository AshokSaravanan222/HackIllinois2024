import { useQuery, useAction } from "convex/react";
import { api, internal} from "../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/typography/link";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card";
import React, { useState } from 'react';
import { Input } from "./components/ui/input";

function App() {
  const outfits = useQuery(api.outfits.listOutfits, { count: 3 });
  const sendDallEOutfit = useAction(api.openai.sendDallEOutfit);

  const [isLoading, setIsLoading] = useState(false); // Add this line
  const [prompt, setPrompt] = useState(''); // State for user's prompt
  const [image, setImage] = useState<string | null>(null); // dict mapping each storage id to each one of the img urls

  const handleGenerateImage = async () => {
    setIsLoading(true); // Start loading
    try {
      await sendDallEOutfit({ age: 5, desc: "test", gender: "M", occasion: "italtian"});
      setImage(null);
    } catch (error) {
      console.error("Failed to generate image:", error);
      setImage(null); // Reset or handle the image URL state in case of an error
    } finally {
      setIsLoading(false); // Stop loading whether it's successful or fails
    }
    setPrompt(''); // Optionally reset the prompt input after generating the image
  };
  
  return (
    <main className="container max-w-2xl mx-auto flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">Styl</h1>

      {/* Display cards dynamically */}
      <div className="flex flex-wrap justify-center gap-4">
        {outfits?.map((outfit, index) => (
          <Card key={index} className="max-w-sm">
            <img src={outfit.imageUrl!} alt={outfit.desc} height="300px" width="auto" />;
            <CardHeader>
              <CardTitle>{outfit.desc}</CardTitle>
              <CardDescription>{outfit.occasion}</CardDescription>
            </CardHeader>
            <CardContent>
              Occasion: {outfit.occasion}
              Age: {outfit.age}
              Gender: {outfit.gender}
            </CardContent>
            <CardFooter>
              {/* Footer content like buttons or links for actions related to the card */}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Input for user's prompt */}
      <Input 
        type="text" 
        placeholder="Occasion Description:" 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)} 
        className="text-input"
      />

      {/* Button to generate the image */}
      <Button onClick={handleGenerateImage} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Outfit'}
      </Button>

      {/* Display the generated image if available */}
      {image && <img src={image} alt="Generated Outfit" />}

      {/* Optionally show a loading text or spinner */}
      {isLoading && <div>Loading...</div>}

      {/* Additional content */}
      <p>Edit <code>convex/myFunctions.ts</code> to change your backend</p>
      <p>Edit <code>src/App.tsx</code> to change your frontend</p>
      <p>Check out <Link target="_blank" href="https://docs.convex.dev/home">Convex docs</Link></p>
    </main>
  );
}

export default App;
