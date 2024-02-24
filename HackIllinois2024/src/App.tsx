
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




import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/typography/link";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card";
import React, { useState } from 'react';

function App() {
  const outfits = useQuery(api.myFunctions.listOutfits, { count: 3 });
  const addOutfit = useMutation(api.myFunctions.addOutfit);
  const generateImage = useAction(api.openai.chat);
  const [prompt, setPrompt] = useState(''); // State for user's prompt
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State to store the generated image URL

  const handleGenerateImage = async () => {
    const fullPrompt = `Stylish outfit idea for ${prompt}`;
    try {
      const url: string = await generateImage({ prompt: fullPrompt });
      setImageUrl(url); // Store the generated image URL in state
      setPrompt(''); // Optionally reset the prompt input after generating the image
    } catch (error) {
      console.error("Failed to generate image:", error);
      setImageUrl(null); // Reset or handle the image URL state in case of an error
    }
  };

  return (
    <main className="container max-w-2xl mx-auto flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">Styl</h1>
      <Button onClick={() => addOutfit({ "desc": "Description from button", "id": "1112", "imageLink": "Link to img"})}>
        Add a random outfit
      </Button>

      {/* Display cards dynamically */}
      <div className="flex flex-wrap justify-center gap-4">
        {outfits?.map((outfit, index) => (
          <Card key={index} className="max-w-sm">
            <CardHeader>
              <CardTitle>Outfit {index + 1}</CardTitle>
              <CardDescription>{outfit.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              Value: {outfit.id}
            </CardContent>
            <CardFooter>
              {/* Footer content like buttons or links for actions related to the card */}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Input for user's prompt */}
      <input 
        type="text" 
        placeholder="Occasion Description:" 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)} 
        className="text-input"
      />

      {/* Button to generate the image */}
      <Button onClick={handleGenerateImage}>
        Generate Outfit
      </Button>

      {/* Display the generated image if available */}
      {imageUrl && <img src={imageUrl} alt="Generated Outfit" />}

      {/* Additional content */}
      <p>Edit <code>convex/myFunctions.ts</code> to change your backend</p>
      <p>Edit <code>src/App.tsx</code> to change your frontend</p>
      <p>Check out <Link target="_blank" href="https://docs.convex.dev/home">Convex docs</Link></p>
    </main>
  );
}

export default App;
