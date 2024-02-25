import React, { useState, FC, ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../src/components/ui/card";
import { Link } from 'react-router-dom';
import { Id } from 'convex/_generated/dataModel';

// Define the type for the props
interface CarouselProps {
  outfit: {
    imageUrl: string | null;
    _id: string;
    _creationTime: number;
    desc: string;
    occasion: string;
    imageId: Id<"_storage">;
    age: number;
    gender: string;
}
}

const Carousel: FC<CarouselProps> = ({ outfit }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 === outfits.length ? 0 : prevIndex + 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? outfits.length - 1 : prevIndex - 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 flex justify-between items-center">
        <Link to={`/outfit/outfitId1`} className="overflow-hidden rounded-lg shadow-lg block text-current no-underline">
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
      </div>
      {/* <div className="absolute bottom-0 flex justify-center w-full p-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${currentIndex === index ? 'bg-blue-700' : 'bg-gray-200'}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Carousel;
