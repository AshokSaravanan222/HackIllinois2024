
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/typography/link";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card";

function App() {
  // Fetching a list of items (assuming each item has a 'value' property)
  const outfits = useQuery(api.myFunctions.listOutfits, { count: 3 });
  const addOutfit = useMutation(api.myFunctions.addOutfit);

  return (
    <main className="container max-w-2xl mx-auto flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">StyleUp</h1>
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

      {/* Additional content */}
      <p>Edit <code>convex/myFunctions.ts</code> to change your backend</p>
      <p>Edit <code>src/App.tsx</code> to change your frontend</p>
      <p>Check out <Link target="_blank" href="https://docs.convex.dev/home">Convex docs</Link></p>
    </main>
  );
}

export default App;
