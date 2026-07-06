import { useState } from "react";
import t1 from "../assets/t1.png";
import t2 from "../assets/t2.png";
import t3 from "../assets/t3.png";
import vectorLeft from "../assets/Vector 4.svg";
import vectorRight from "../assets/Vector 3.svg";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Malaika javed",
    rating: 3,
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
    image: t1,
  },
  {
    name: "Zaheer Ud Deen",
    rating: 2,
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
    image: t2,
  },
  {
    name: "Sajida Wajid",
    rating: 1,
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
    image: t3,
  },
];

const Testimonials = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const nextReview = () => {
  setCurrentReviewIndex((prev) => (prev + 1) % testimonials.length);
};

const prevReview = () => {
  setCurrentReviewIndex((prev) => 
    prev === 0 ? testimonials.length - 1 : prev - 1
  );
};

  return (
    <section className="relative mt-24 py-16">
      <div className="relative flex items-center justify-center gap-6 mb-14">
        <img
          src={vectorLeft}
          alt="Decorative left vector"
          className="h-12 w-12 object-contain"
        />
        <h2 className="text-center text-3xl font-bold text-white drop-shadow-xl sm:text-4xl whitespace-nowrap">
          Customer Review
        </h2>
        <img
          src={vectorRight}
          alt="Decorative right vector"
          className="h-12 w-12 object-contain"
        />
      </div>

      {/* DESKTOP VIEW - 3 columns (hidden on mobile) */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* MOBILE VIEW - Carousel (only visible on mobile) */}
      <div className="lg:hidden max-w-7xl mx-auto px-4">
        <div className="flex justify-center">
          <TestimonialCard testimonial={testimonials[currentReviewIndex]} />
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={prevReview}
      //  disabled={currentReviewIndex === 0}     
            className={`w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transition-all
              ${currentReviewIndex === 0 
                ? 'opacity-30 cursor-not-allowed' 
                : 'hover:bg-green-500 hover:border-green-500 cursor-pointer'
              }`}
          >
            ←
          </button>
          
          <button
            onClick={nextReview}
            // disabled={currentReviewIndex === testimonials.length - 1}
            className={`w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transition-all
              ${currentReviewIndex === testimonials.length - 1 
                ? 'opacity-30 cursor-not-allowed' 
                : 'hover:bg-green-500 hover:border-green-500 cursor-pointer'
              }`}
          >
            →
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentReviewIndex(index)}
              className={`h-2 rounded-full transition-all duration-300
                ${currentReviewIndex === index 
                  ? 'w-6 bg-green-500' 
                  : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;