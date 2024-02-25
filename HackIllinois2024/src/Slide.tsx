import React, { FC } from 'react';

interface SlideProps {
  imageUrl: string;
  text: string;
}

const Slide: FC<SlideProps> = ({ imageUrl }) => {
  return (
    <div className="flex w-full">
      <div className="aspect-w-2 aspect-h-1 flex-none w-1/2 h-auto">
        <img src={imageUrl} alt="" className="object-cover h-full w-full" />
      </div>
    </div>
  );
};

export default Slide;
