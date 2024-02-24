import React from 'react';
import { useParams } from 'react-router-dom';

const OutfitPage: React.FC = () => {
  const { outfitId } = useParams<{ outfitId: string }>();

  // Here you can fetch or determine the content based on outfitId
  // For simplicity, we'll just display the outfitId

  return (
    <div>
      <h1>Outfit Page</h1>
      <p>This is the page for outfit with ID: {outfitId}</p>
    </div>
  );
};

export default OutfitPage;
