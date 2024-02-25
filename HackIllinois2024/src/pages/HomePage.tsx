import { useQuery, useAction } from "convex/react";
import { api, internal } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import React, { useState } from 'react';
import { Input } from "../components/ui/input";
import '../App.css'; // Assuming your styles are defined in App.css
import Carousel from "../Carousel";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from '../components/ui/select'; // Update the path accordingly

function HomePage() {
  const outfits = useQuery(api.outfits.listOutfits, { count: 3 });
  const sendDallEOutfit = useAction(api.openai.sendDallEOutfit);

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
  const navigate = useNavigate();

  // Function to handle navigation
  const goToOutfitPage = (outfitId: string) => {
    navigate(`/outfit/${outfitId}`);
  };

  const FruitSelect: React.FC = () => {
    const [value, setValue] = React.useState('');
  
    return (
      <Select onValueChange={setValue}>
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="mango">Mango</SelectItem>
            </SelectGroup>
        </SelectContent>
      </Select>


    );
  };


  const handleGenerateImage = async () => {
    setIsLoading(true); // Start loading
    try {
      const storageId = await sendDallEOutfit({ age: 17, desc: accessories, gender: gender, occasion: occasion});

      setOccasion('');
      setAccessories('');
      setGender('');
      setBudget(''); // Reset the budget input after generating the image
    
      goToOutfitPage('outfitid1')
      
    } catch (error) {
      console.error("Failed to generate image:", error);
    } finally {
      setIsLoading(false); // Stop loading whether it's successful or fails
    }
  };
  
  return (
<div className="App">
    <main className="container max-w-7xl mx-auto flex flex-col gap-8 p-4">
      <h1 className="text-9xl font-bold my-8 text-center">styl</h1>
      <header className="App-header mb-4">
        <h2 className="text-2xl">Previous</h2>
        <Carousel images={images} />
      </header>

      {/* Display cards dynamically */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {outfits?.map((outfit, index) => (
          <Link to={`/outfit/${outfit._id}`} key={index} className="overflow-hidden rounded-lg shadow-lg block text-current no-underline">
            <div className="relative">
              <div className="h-60 bg-cover bg-center" style={{ backgroundImage: `url(${outfit.imageUrl})` }}></div>
              <div className="p-4 bg-white bg-opacity-75">
                <CardHeader>
                  <CardTitle>{outfit.occasion}</CardTitle>
                  <CardDescription>{outfit.desc}</CardDescription>
                </CardHeader>
                <CardFooter>
                  {/* Footer content */}
                </CardFooter>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Inputs and other content */}
      <div className="flex flex-col gap-4">
        {/* Your inputs and other components here */}
        <Input 
        type="text" 
        placeholder="Occasion Description:" 
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)} 
        className="text-input"
      />

      <Input 
       type="text" 
       placeholder="Accessories:" 
       value={accessories}
       onChange={(e) => setAccessories(e.target.value)} 
       className="text-input"
      />

      <Input 
         type="text" 
         placeholder="Gender:" 
         value={gender}
         onChange={(e) => setGender(e.target.value)} 
         className="text-input"
      />

      <Input 
       type="text" 
          placeholder="Budget:" 
          value={budget}
          onChange={(e) => setBudget(e.target.value)} 
          className="text-input"
      />
        {/* Repeat for other inputs */}
        <FruitSelect />
        <Button onClick={handleGenerateImage} disabled={isLoading}>{isLoading ? 'Generating...' : 'Generate Outfit'}</Button>
        <Button onClick={() => goToOutfitPage("outfit1")}>{"Go to outfitid1"}</Button>
        {isLoading && <div>Loading...</div>}
      </div>
    </main>
  </div>
  );
}

export default HomePage;
