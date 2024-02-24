import React from 'react';
import { useParams } from 'react-router-dom';
import image from "./Outfit1.png";


const OutfitPage: React.FC = () => {
  const { outfitId } = useParams<{ outfitId: string }>();

  return (
    <div>
      <p>Outfit Features: {outfitId}</p>
      {image && <img src={image} alt="Generated Outfit" />}
      

    </div>
  );
};

export default OutfitPage;
