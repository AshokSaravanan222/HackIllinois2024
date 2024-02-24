import { useQuery, useAction } from "convex/react";
import { api, internal} from "../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card";
import React, { useState } from 'react';
import { Input } from "./components/ui/input";
import './App.css'; // Assuming your styles are defined in App.css
import Carousel from "./Carousel";

function App() {
  const outfits = useQuery(api.outfits.listOutfits, { count: 3 });
  const sendDallEOutfit = useAction(api.openai.sendDallEOutfit);
  
  const [image, setImage] = useState<string | null>(null); // dict mapping each storage id to each one of the img urls
  const [occasion, setOccasion] = useState('');
  const [accessories, setAccessories] = useState('');
  const [gender, setGender] = useState('');
  const [budget, setBudget] = useState('');

  const images = [
    "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const [isLoading, setIsLoading] = useState(false); // Add this line


  const handleGenerateImage = async () => {
    setIsLoading(true); // Start loading
    try {
      const image = await sendDallEOutfit({ age: 17, desc: accessories, gender: gender, occasion: occasion});

      setImage(image);
      setOccasion('');
      setAccessories('');
      setGender('');
      setBudget(''); // Reset the budget input after generating the image

    } catch (error) {
      console.error("Failed to generate image:", error);
      setImage(null); // Reset or handle the image URL state in case of an error
    } finally {
      setIsLoading(false); // Stop loading whether it's successful or fails
    }
  };
  
  return (
    <div className="App">
    <main className="container max-w-2xl mx-auto flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">Styl</h1>

      <header className="App-header">
        <h1>PREVIOUSLY CREATED OUTFITS</h1>
      </header>
      <main>
        <Carousel images={images} />
      </main>

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
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)} 
        className="text-input occasion-input"
      />

      <Input 
       type="text" 
       placeholder="Accessories:" 
       value={accessories}
       onChange={(e) => setAccessories(e.target.value)} 
       className="text-input accessories-input"
      />

      <Input 
         type="text" 
         placeholder="Gender:" 
         value={gender}
         onChange={(e) => setGender(e.target.value)} 
         className="text-input gender-input"
      />

      <Input 
       type="text" 
          placeholder="Budget:" 
          value={budget}
          onChange={(e) => setBudget(e.target.value)} 
          className="text-input budget-input"
      />

      {/* Button to generate the image */}
      <Button onClick={handleGenerateImage} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Outfit'}
      </Button>

      {/* Display the generated image if available */}
      {image && <img src={image} alt="Generated Outfit" />}

      {/* Optionally show a loading text or spinner */}
      {isLoading && <div>Loading...</div>}
    </main>
  </div>
  );
}

export default App;
