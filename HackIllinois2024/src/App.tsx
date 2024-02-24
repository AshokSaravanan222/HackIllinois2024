
// import { useMutation, useQuery, useAction} from "convex/react";
// import { api } from "../convex/_generated/api";
// import { Button } from "@/components/ui/button";
// import { Link } from "@/components/typography/link";
// import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card";

// function App() {
//   // Fetching a list of items (assuming each item has a 'value' property)
//   const outfits = useQuery(api.myFunctions.listOutfits, { count: 3 });
//   const addOutfit = useMutation(api.myFunctions.addOutfit);
//   const generateImage = useAction(api.openai.chat);

//   return (
//     <main className="container max-w-2xl mx-auto flex flex-col gap-8">
//       <h1 className="text-4xl font-extrabold my-8 text-center">Styl</h1>
//       <Button onClick={() => addOutfit({ "desc": "Description from button", "id": "1112", "imageLink": "Link to img"})}>
//         Add a random outfit
//       </Button>

//       {/* Display cards dynamically */}
//       <div className="flex flex-wrap justify-center gap-4">
//         {outfits?.map((outfit, index) => (
//           <Card key={index} className="max-w-sm">
//             <CardHeader>
//               <CardTitle>Outfit {index + 1}</CardTitle>
//               <CardDescription>{outfit.desc}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               Value: {outfit.id}
//             </CardContent>
//             <CardFooter>
//               {/* Footer content like buttons or links for actions related to the card */}
//             </CardFooter>
//           </Card>
//         ))}
//       </div>


//       <Button onClick={() => {
//         const url = generateImage({ "prompt": "Generate an image of an bannana"});
        
//        }}>
//         Add a random outfit
//       </Button>

//       {/* Additional content */}
//       <p>Edit <code>convex/myFunctions.ts</code> to change your backend</p>
//       <p>Edit <code>src/App.tsx</code> to change your frontend</p>
//       <p>Check out <Link target="_blank" href="https://docs.convex.dev/home">Convex docs</Link></p>
//     </main>
//   );
// }

// export default App;





// import { useMutation, useQuery, useAction } from "convex/react";
// import { api } from "../convex/_generated/api";
// import { Button } from "@/components/ui/button";
// import { Link } from "@/components/typography/link";
// import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card";
// import React, { useState } from 'react';

// function App() {
//   const outfits = useQuery(api.myFunctions.listOutfits, { count: 3 });
//   const addOutfit = useMutation(api.myFunctions.addOutfit);
//   const generateImage = useAction(api.openai.chat);
//   const [prompt, setPrompt] = useState(''); // State for user's prompt

//   // Function to handle image generation based on user's prompt
//   const handleGenerateImage = async () => {
//     // Call the generateImage action with the user's prompt
//     const fullPrompt = "Generate an image of a person ${prompt}";
//     const url = await generateImage({ fullPrompt });
//     // Reset the prompt input after generating the image
//     setPrompt('');
//   };

//   return (
//     <main className="container max-w-2xl mx-auto flex flex-col gap-8">
//       <h1 className="text-4xl font-extrabold my-8 text-center">Styl</h1>
//       <Button onClick={() => addOutfit({ "desc": "Description from button", "id": "1112", "imageLink": "Link to img"})}>
//         Add a random outfit
//       </Button>

//       {/* Display cards dynamically */}
//       <div className="flex flex-wrap justify-center gap-4">
//         {outfits?.map((outfit, index) => (
//           <Card key={index} className="max-w-sm">
//             <CardHeader>
//               <CardTitle>Outfit {index + 1}</CardTitle>
//               <CardDescription>{outfit.desc}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               Value: {outfit.id}
//             </CardContent>
//             <CardFooter>
//               {/* Footer content like buttons or links for actions related to the card */}
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       {/* Input for user's prompt */}
//       <input 
//         type="text" 
//         placeholder="Occasion Description:" 
//         value = {prompt}

//         onChange={(e) => setPrompt(e.target.value)} 
//         className="text-input"
//       />

//       {/* Button to generate the image */}
//       <Button onClick={handleGenerateImage}>
//         Generate Outfit
//       </Button>

//       {/* Additional content */}
//       <p>Edit <code>convex/myFunctions.ts</code> to change your backend</p>
//       <p>Edit <code>src/App.tsx</code> to change your frontend</p>
//       <p>Check out <Link target="_blank" href="https://docs.convex.dev/home">Convex docs</Link></p>
//     </main>
//   );
// }

// export default App;




// import React, { useState } from 'react';
// import { useMutation, useQuery, useAction } from "convex/react";
// import { api } from "../convex/_generated/api";
// import { Button } from "@/components/ui/button";
// import { Link } from "@/components/typography/link";
// import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card";
// import './App.css'; // Assuming your styles are defined in App.css

// function App() {
//   const outfits = useQuery(api.myFunctions.listOutfits, { count: 3 });
//   const addOutfit = useMutation(api.myFunctions.addOutfit);
//   const generateImage = useAction(api.openai.chat);
//   const [prompt, setPrompt] = useState(''); // State for user's prompt
//   const [budget, setBudget] = useState(''); // State for user's budget
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   const handleGenerateImage = async () => {
//     const fullPrompt = `Stylish outfit idea for ${prompt} within budget ${budget}`;
//     try {
//       const url: string = await generateImage({ prompt: fullPrompt });
//       setImageUrl(url);
//       setPrompt('');
//       setBudget(''); // Reset the budget input after generating the image
//     } catch (error) {
//       console.error("Failed to generate image:", error);
//       setImageUrl(null);
//     }
//   };

//   return (
//     <main className="container max-w-2xl mx-auto flex flex-col gap-8">
//       <h1 className="text-4xl font-extrabold my-8 text-center">Styl</h1>
//       {/* Other components remain unchanged */}

//       {/* Container for input fields with specific sizing */}
//       <div className="inputs-container">
//         <input 
//           type="text" 
//           placeholder="Occasion Description:" 
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)} 
//           className="text-input occasion-input"
//         />
//         <input 
//           type="text" 
//           placeholder="Budget:" 
//           value={budget}
//           onChange={(e) => setBudget(e.target.value)} 
//           className="text-input budget-input"
//         />
//       </div>

//       <Button onClick={handleGenerateImage}>
//         Generate Outfit
//       </Button>

//       {imageUrl && <img src={imageUrl} alt="Generated Outfit" />}
//       {/* Additional content remains unchanged */}
//     </main>
//   );
// }

// export default App;




// import React, { useState } from 'react';
// import { useMutation, useQuery, useAction } from "convex/react";
// import { api } from "../convex/_generated/api";
// import { Button } from "@/components/ui/button";
// import { Link } from "@/components/typography/link";
// import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card";
// import './App.css'; // Assuming your styles are defined in App.css

// function App() {
//   const outfits = useQuery(api.myFunctions.listOutfits, { count: 3 });
//   const addOutfit = useMutation(api.myFunctions.addOutfit);
//   const generateImage = useAction(api.openai.chat);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   // State for each input
//   const [occasion, setOccasion] = useState('');
//   const [accessories, setAccessories] = useState('');
//   const [gender, setGender] = useState('');
//   const [budget, setBudget] = useState('');
//   // Other states and hooks remain unchanged

//   // Adjust your handleGenerateImage function as needed
//   const handleGenerateImage = async () => {
//         const fullPrompt = `I want an image of an entire college ${gender}, but I only them to appear in the image once. I want the image to depict what this person might wear for a ${occasion}, with the following accessor: ${accessories}, and I do not want the individual clothing items to appear in the image.`

//       try {
//       const url: string = await generateImage({ prompt: fullPrompt });
//       setImageUrl(url);
//       setOccasion('');
//       setAccessories('');
//       setGender('');
//       setBudget(''); // Reset the budget input after generating the image
//     } catch (error) {
//       console.error("Failed to generate image:", error);
//       setImageUrl(null);
//     }
//   };

//   return (
//     <main className="container max-w-2xl mx-auto flex flex-col gap-8">
//       <h1 className="text-4xl font-extrabold my-8 text-center">Styl</h1>
//       {/* Other components remain unchanged */}

//       {/* Container for input fields with specific sizing */}
//       <div className="inputs-container">
//         <input 
//           type="text" 
//           placeholder="Occasion Description:" 
//           value={occasion}
//           onChange={(e) => setOccasion(e.target.value)} 
//           className="text-input occasion-input"
//         />
//         <input 
//           type="text" 
//           placeholder="Accessories:" 
//           value={accessories}
//           onChange={(e) => setAccessories(e.target.value)} 
//           className="text-input accessories-input"
//         />
//         <input 
//           type="text" 
//           placeholder="Gender:" 
//           value={gender}
//           onChange={(e) => setGender(e.target.value)} 
//           className="text-input gender-input"
//         />
//         <input 
//           type="text" 
//           placeholder="Budget:" 
//           value={budget}
//           onChange={(e) => setBudget(e.target.value)} 
//           className="text-input budget-input"
//         />
//       </div>

//       <Button onClick={handleGenerateImage}>
//         Generate Outfit
//       </Button>
//       {/* Display the generated image if available and other additional content */}
//     </main>
//   );
// }

// export default App;




// import React, { useState } from 'react';
// import { useMutation, useQuery, useAction } from "convex/react";
// import { api } from "../convex/_generated/api";
// import { Button } from "@/components/ui/button";
// import { Link } from "@/components/typography/link";
// import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card";
// import './App.css'; // Assuming your styles are defined in App.css

// function App() {
//   const outfits = useQuery(api.myFunctions.listOutfits, { count: 3 });
//   const addOutfit = useMutation(api.myFunctions.addOutfit);
//   const generateImage = useAction(api.openai.chat);
//   const [prompt, setPrompt] = useState(''); // State for user's prompt
//   const [budget, setBudget] = useState(''); // State for user's budget
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   const handleGenerateImage = async () => {
//     const fullPrompt = `Stylish outfit idea for ${prompt} within budget ${budget}`;
//     try {
//       const url: string = await generateImage({ prompt: fullPrompt });
//       setImageUrl(url);
//       setPrompt('');
//       setBudget(''); // Reset the budget input after generating the image
//     } catch (error) {
//       console.error("Failed to generate image:", error);
//       setImageUrl(null);
//     }
//   };

//   return (
//     <main className="container max-w-2xl mx-auto flex flex-col gap-8">
//       <h1 className="text-4xl font-extrabold my-8 text-center">Styl</h1>
//       {/* Other components remain unchanged */}

//       {/* Container for input fields with specific sizing */}
//       <div className="inputs-container">
//         <input 
//           type="text" 
//           placeholder="Occasion Description:" 
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)} 
//           className="text-input occasion-input"
//         />
//         <input 
//           type="text" 
//           placeholder="Budget:" 
//           value={budget}
//           onChange={(e) => setBudget(e.target.value)} 
//           className="text-input budget-input"
//         />
//       </div>

//       <Button onClick={handleGenerateImage}>
//         Generate Outfit
//       </Button>

//       {imageUrl && <img src={imageUrl} alt="Generated Outfit" />}
//       {/* Additional content remains unchanged */}
//     </main>
//   );
// }

// export default App;




import React, { useState } from 'react';
import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { useQuery, useAction } from "convex/react";
import { api, internal} from "../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/typography/link";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card";
import './App.css'; // Assuming your styles are defined in App.css
import Carousel from "./Carousel";

import React, { useState } from 'react';
import { Input } from "./components/ui/input";

function App() {
  const outfits = useQuery(api.myFunctions.listOutfits, { count: 3 });
  const addOutfit = useMutation(api.myFunctions.addOutfit);
  const generateImage = useAction(api.openai.chat);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // State for each input
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

  // Adjust your handleGenerateImage function as needed
  const outfits = useQuery(api.outfits.listOutfits, { count: 3 });
  const sendDallEOutfit = useAction(api.openai.sendDallEOutfit);

  const [isLoading, setIsLoading] = useState(false); // Add this line
  const [prompt, setPrompt] = useState(''); // State for user's prompt
  const [image, setImage] = useState<string | null>(null); // dict mapping each storage id to each one of the img urls

  const handleGenerateImage = async () => {
        const fullPrompt = `I want an image of an entire college ${gender}, but I only them to appear in the image once. I want the image to depict what this person might wear for a ${occasion}, with the following accessor: ${accessories}, and I do not want the individual clothing items to appear in the image.`

      try {
      const url: string = await generateImage({ prompt: fullPrompt });
      setImageUrl(url);
      setOccasion('');
      setAccessories('');
      setGender('');
      setBudget(''); // Reset the budget input after generating the image
    setIsLoading(true); // Start loading
    try {
      await sendDallEOutfit({ age: 5, desc: "test", gender: "M", occasion: "italtian"});
      setImage(null);
    } catch (error) {
      console.error("Failed to generate image:", error);
      setImageUrl(null);
      setImage(null); // Reset or handle the image URL state in case of an error
    } finally {
      setIsLoading(false); // Stop loading whether it's successful or fails
    }
    setPrompt(''); // Optionally reset the prompt input after generating the image
  };
  
  return (
    <main className="container max-w-2xl mx-auto flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">Styl</h1>

      <div className="App">
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



      {/* Container for input fields with specific sizing */}
      <div className="inputs-container">
        <input 
          type="text" 
          placeholder="Occasion Description:" 
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)} 
          className="text-input occasion-input"
        />
        <input 
          type="text" 
          placeholder="Accessories:" 
          value={accessories}
          onChange={(e) => setAccessories(e.target.value)} 
          className="text-input accessories-input"
        />
        <input 
          type="text" 
          placeholder="Gender:" 
          value={gender}
          onChange={(e) => setGender(e.target.value)} 
          className="text-input gender-input"
        />
        <input 
          type="text" 
          placeholder="Budget:" 
          value={budget}
          onChange={(e) => setBudget(e.target.value)} 
          className="text-input budget-input"
        />
      </div>

      <Button onClick={handleGenerateImage}>
        Generate Outfit
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
      {/* Display the generated image if available and other additional content */}
    </main>
  );
}

export default App;
