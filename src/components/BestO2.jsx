import { useState } from "react";
import showImage from "../assets/carosel.png";
import vectorLeft from "../assets/Vector 4.svg";
import vectorRight from "../assets/Vector 3.svg";

const BestO2Slides = [
  {
    id: 1,
    title: "We Have Small And Best O2 Plants Collection's",
    description1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    description2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    image: showImage,
  },
  {
    id: 2,
    title: "Premium Air Purifying Plants For Your Home",
    description1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    description2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    image: showImage,
  },
  {
    id: 3,
    title: "Natural Green Solution For Indoor Spaces",
    description1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    description2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    image: showImage,
  },
];

const BestO2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BestO2Slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + BestO2Slides.length) % BestO2Slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const slide = BestO2Slides[currentSlide];

  return (
    <section className="relative mt-4 py-16">
      <div className="relative flex items-center justify-center gap-1 mb-14">
        <img
          src={vectorLeft}
          alt="Decorative left vector"
          className="h-12 w-12 object-contain"
        />
        <h2 className="text-center text-3xl font-bold text-white drop-shadow-xl sm:text-4xl whitespace-nowrap">
          Our Best o2
        </h2>
        <img
          src={vectorRight}
          alt="Decorative right vector"
          className="h-12 w-12 object-contain"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="relative rounded-[64px] border border-white/25 bg-white/[0.045] backdrop-blur-sm overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch p-0">
            {/* Plant Image - Overflows top */}
            <div className="relative flex items-center justify-center lg:justify-start lg:pl-6 overflow-visible h-full min-h-[380px]">
              <img
                src={slide.image}
                alt="Best O2 Plant"
                className="absolute pb-1 h-[340px] w-[340px] md:h-[500px] md:w-[420px] object-contain pb-15"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-8 lg:p-12 lg:pl-8">
              <h3 className="text-13xl lg:text-14xl font-bold text-white/75  leading-tight mb-6">
                {slide.title}
              </h3>

              <p className="text-base text-white/75 leading-relaxed mb-4">
                {slide.description1}
              </p>

              <p className="text-base text-white/75 leading-relaxed mb-8">
                {slide.description2}
              </p>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  className="rounded-lg border border-white/40 px-7 py-2 text-sm font-medium text-white transition hover:border-green-500 hover:bg-green-700"
                >
                  Explore
                </button>

                <div className="flex items-center gap-4">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transition-all text-white hover:bg-green-500 hover:border-green-500 cursor-pointer"
                  >
                    ←
                  </button>

                  <span className="text-white/80 text-sm font-medium">
                    {String(currentSlide + 1).padStart(2, "0")}/0{BestO2Slides.length}
                  </span>

                  <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transition-all text-white hover:bg-green-500 hover:border-green-500 cursor-pointer"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {BestO2Slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition ${
                index === currentSlide
                  ? "h-3 w-8 rounded-full bg-white/80"
                  : "h-3 w-3 rounded-full bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestO2;
