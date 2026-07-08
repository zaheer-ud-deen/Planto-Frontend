import bgImage from "../assets/bg.png";
import calatheaImage from "../assets/hero.png";
import Gold from "../assets/Gold.png";
import review from "../assets/review.png";
import Rose from "../assets/Rose.png";
import bag from "../assets/bag.png";
import TopSellingCard from "../components/TopSellingCard";
import TrendyHousePlant from "../components/TrendyHousePlant";
import Testimonials from "../components/Testimonials";
import BestO2 from "../components/BestO2";
import Footer from "../components/Footer";
import vectorLeft from "../assets/Vector 4.svg";
import vectorRight from "../assets/Vector 3.svg";
import roseImage from "../assets/Rose.png";
import goldImage from "../assets/Gold.png";
import calathea from "../assets/calathea.png";
import cal from "../assets/cal.png";
import show from "../assets/show.png";
import calat from "../assets/calat.png";
import { useState } from "react";

const hero = {
  title: "Breath Natural",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  author: "Max Luke",
  testimonial:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
  plantLabel: "Trendy House Plant",
  plantName: "Calathea Plant",
  plantImage: calatheaImage,
};

const products = [
  {
    title: "For Small Desk Ai Plant",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: "Rs. 599/-",
    image: Rose,
    imagePosition: "left",
  },
  {
    title: "For Large Desk Ai Plant",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: "Rs. 599/-",
    image: Gold,
    imagePosition: "right",
  },
];

const topSellingProducts = [
  {
    title: "Desk plant",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: "Rs. 359/-",
    image: roseImage,
  },
  {
    title: "Calathea plant",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: "Rs. 459/-",
    image: calathea,
  },
  {
    title: "Calathea Ai plant",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: "Rs. 959/-",
    image: goldImage,
  },
  {
    title: "Cal 874 plant",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: "Rs. 959/-",
    image: cal,
  },
  {
    title: "Show plant",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: "Rs. 559/-",
    image: show,
  },
  {
    title: "Show plant",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: "Rs. 559/-",
    image: calat,
  },
];

const ProductCard = ({ product }) => {
  const imageFirst = product.imagePosition === "left";

  return (
    <article className="grid min-h-[30px] items-center gap-8 rounded-[58px] border border-white/35 bg-white/[0.055] px-7 py-7 text-white backdrop-blur-sm lg:grid-cols-[360px_1fr] max-w-[90%] mx-auto">
      {imageFirst && (
        <img
          src={product.image}
          alt={product.title}
          className="mx-[auto] h-60 w-60 object-contain lg:-mt-30 lg:h-72 lg:w-72"
        />
      )}

      <div className={imageFirst ? "lg:pl-4" : "lg:pl-10"}>
        
        <h3 className="text-xl font-semibold">{product.title}</h3>
        <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">
          {product.description}
        </p>
        <p className="mt-4 text-xl font-bold">{product.price}</p>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg border border-white/45 px-5 py-2 text-sm text-white transition hover:border-green-500 hover:bg-green-700"
          >
            Buy Now
          </button>
          <div className="flex items-center gap-2">
            <img src={bag} alt="bag" className="w-4 h-4" />
            <span>Bag</span>
          </div>
        </div>
      </div>

      {!imageFirst && (
        <img
          src={product.image}
          alt={product.title}
          className="mx-auto h-60 w-60 object-contain lg:order-last lg:-mt-44 lg:h-72 lg:w-72"
        />
      )}
    </article>
  );
};

const Home = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  // const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  
  const nextCard = () => {
  setCurrentCardIndex((prev) => (prev + 1) % topSellingProducts.length);
};

const prevCard = () => {
  setCurrentCardIndex((prev) => 
    prev === 0 ? topSellingProducts.length - 1 : prev - 1
  );
};
// const nextReview = () => {
//   if (currentReviewIndex < testimonials.length - 1) {
//     setCurrentReviewIndex(currentReviewIndex + 1);
//   }
// };

// const prevReview = () => {
//   if (currentReviewIndex > 0) {
//     setCurrentReviewIndex(currentReviewIndex - 1);
//   }
// };
const nextProduct = () => {
  setCurrentProductIndex((prev) => (prev + 1) % products.length);
};

const prevProduct = () => {
  setCurrentProductIndex((prev) => 
    prev === 0 ? products.length - 1 : prev - 1
  );
};

  return (
    <>
    
      <main className="relative min-h-screen overflow-hidden bg-[#172218] text-white">
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-82px] h-[980px] w-auto max-w-none -translate-x-1/2 object-contain opacity-90 sm:h-[1080px] lg:top-[-90px] lg:h-[1180px]"
      />
      <div className="absolute inset-0 bg-[#172218]/18" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(23,34,24,0)_0%,rgba(23,34,24,0.06)_42%,rgba(23,34,24,0.54)_100%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 sm:px-8 lg:px-3">
        <section className="grid items-start gap-12 lg:grid-cols-[1fr_380px]">
          <div className="max-w-3xl pl-6">
            <h1 className="text-5xl font-bold leading-none text-white sm:text-6xl lg:text-7xl mt-30px">
              {hero.title}
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/75 sm:text-base max-w-md">
              {hero.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="rounded-lg border border-white/40 px-7 py-2 text-sm font-medium text-white transition hover:border-green-500 hover:bg-green-700"
              >
                Explore
              </button>
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/65 text-white transition hover:border-green-500 hover:bg-green-700"
                aria-label="Play live demo"
              >
                <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-white" />
              </button>
              <span className="text-sm font-medium text-white/80">
                Live Demo...
              </span>
            </div>

            <article className="mt-12 max-w-sm rounded-[22px] border border-white/25 bg-white/[0.06] p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <img
                  src={review}
                  alt={hero.author}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-base font-semibold text-white">
                    {hero.author}
                  </h2>
                  <p className="text-sm leading-none text-yellow-400">
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/65">
                {hero.testimonial}
              </p>
            </article>
          </div>

          <TrendyHousePlant />
        </section>

        <section className="mt-8">
  <h2 className="text-center text-3xl font-bold text-white sm:text-4xl pb-16">
    Our Trendy plants
  </h2>

  {/* DESKTOP VIEW - Show both products */}
  <div className="hidden lg:block mt-4 space-y-30 max-w-5xl mx-auto">
    {products.map((product) => (
      <ProductCard key={`${product.title}-${product.imagePosition}`} product={product} />
    ))}
  </div>

  {/* MOBILE VIEW - Carousel with loop */}
  <div className="lg:hidden mt-10 px-4">
    <div className="flex justify-center">
      <ProductCard product={products[currentProductIndex]} />
    </div>

    {/* Navigation Arrows */}
    <div className="flex justify-center gap-6 mt-8">
      <button
        onClick={prevProduct}
        className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transition-all hover:bg-green-500 hover:border-green-500 cursor-pointer"
      >
        ←
      </button>
      
      <button
        onClick={nextProduct}
        className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transition-all hover:bg-green-500 hover:border-green-500 cursor-pointer"
      >
        →
      </button>
    </div>

    {/* Dots Indicator */}
    <div className="flex justify-center gap-2 mt-6">
      {products.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentProductIndex(index)}
          className={`h-2 rounded-full transition-all duration-300
            ${currentProductIndex === index 
              ? 'w-6 bg-green-500' 
              : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
        />
      ))}
    </div>
  </div>
</section>

        <section id="more" className="relative mt-24 py-16">
          <div className="absolute left-1/2 top-0 h-full w-screen -translate-x-1/2 bg-black/10" />

          <div className="relative flex items-center justify-center gap-1 pb-40">
            <img
              src={vectorLeft}
              alt="Decorative left vector"
              className="h-12 w-12 object-contain"
            />
            <h2 className="text-center text-3xl font-bold text-white drop-shadow-xl sm:text-4xl">
              Our Top Selling
            </h2>
            <img
              src={vectorRight}
              alt="Decorative right vector"
              className="h-12 w-12 object-contain"
            />
          </div>

          <section id="more" className="relative mt-4 -mb-20">
  {/* Header  */}
  <div className="relative flex items-center justify-center">
    {/* Your existing header decoration */}

    
    
    {/* Your existing header decoration */}
  </div>

  {/* DESKTOP VIEW (3 columns) - Hidden on mobile */}
  <div className="hidden lg:block relative mt-20">
    <div className="grid grid-cols-1 gap-18 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4">
      {topSellingProducts.map((product, index) => (
        <TopSellingCard key={index} product={product} />
      ))}
    </div>
  </div>

  {/* MOBILE VIEW (Carousel) - Only visible on mobile */}
  <div className="lg:hidden relative -mt-10 px-4">
    {/* Current Card */}
    <div className="flex justify-center">
      <TopSellingCard product={topSellingProducts[currentCardIndex]} />
    </div>

    {/* Arrows */}
    <div className="flex justify-center gap-6 mt-8">
      <button
        onClick={prevCard}
        // disabled={currentCardIndex === 0}
        className={`w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transition-all
          ${currentCardIndex === 0 
            ? 'opacity-30 cursor-not-allowed' 
            : 'hover:bg-green-500 hover:border-green-500 cursor-pointer'
          }`}
      >
        ←
      </button>
      
      <button
        onClick={nextCard}
        // disabled={currentCardIndex === topSellingProducts.length - 1}
        className={`w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transition-all
          ${currentCardIndex === topSellingProducts.length - 1 
            ? 'opacity-30 cursor-not-allowed' 
            : 'hover:bg-green-500 hover:border-green-500 cursor-pointer'
          }`}
      >
        →
      </button>
    </div>

    {/* Dots Indicator */}
    <div className="flex justify-center gap-2 mt-6">
      {topSellingProducts.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentCardIndex(index)}
          className={`h-2 rounded-full transition-all
            ${currentCardIndex === index 
              ? 'w-6 bg-green-500' 
              : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
        />
      ))}
    </div>
  </div>
</section>
        </section>

        <Testimonials />
        <BestO2 />
      </div>
    </main>
    <Footer />
    </>
  );
};

export default Home;