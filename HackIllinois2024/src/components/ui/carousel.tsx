// // Carousel.tsx
// import React, { useState } from 'react';
// import { api } from "convex/_generated/api";
// import { useQuery } from 'convex/react';
// import { Slide } from '../../types'; // Assuming you've defined your types in a separate file

// const Carousel: React.FC = () => {
//     const numSlides = 10;
//   const slidesQuery = useQuery(api.myFunctions.listPreviews, {count: numSlides});
//   const [activeSlide, setActiveSlide] = useState(0);

//   const nextSlide = () => {
//     setActiveSlide((currentSlide) => (currentSlide + 1) % slidesQuery?.length);
//   };

//   const prevSlide = () => {
//     setActiveSlide((currentSlide) => (currentSlide - 1 + slidesQuery.?length) % slidesQuery.data.length);
//   };

//   if (slidesQuery.isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (slidesQuery.error) {
//     return <div>Error fetching slides.</div>;
//   }

//   return (
//     <div className="relative">
//       <div className="flex overflow-hidden">
//         {slidesQuery.data.map((slide: Slide, index: number) => (
//           <div key={slide.id} className={`w-full ${index === activeSlide ? 'block' : 'hidden'}`}>
//             <h2>{slide.title}</h2>
//             <p>{slide.content}</p>
//           </div>
//         ))}
//       </div>
//       <button onClick={prevSlide} className="absolute left-0">Prev</button>
//       <button onClick={nextSlide} className="absolute right-0">Next</button>
//     </div>
//   );
// };

// export default Carousel;


