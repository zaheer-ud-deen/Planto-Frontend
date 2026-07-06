import bagIcon from "../assets/bag.png";

const TopSellingCard = ({ product }) => {
  return (
    
    <article className="relative w-[290px] rounded-[56px] border border-white/25 bg-white/[0.045] px-[40px] pb-3 pt-[170px] text-white shadow-2xl shadow-black/20 backdrop-blur-sm h-full mx-auto ">
      <img
        src={product.image}
        alt={product.title}
        className="absolute left-1/2 top-[-73px] h-[210px] w-[210px] max-w-none -translate-x-1/2 object-contain"
      />

      <div className="relative">
        <h3 className="text-[27px] font-normal leading-tight text-white/80">
          {product.title}
        </h3>
        <p className="mt-6 text-[13px] leading-[1.25] text-white/70">
          {product.description}
        </p>

        <div className="mt-7 flex items-center justify-between gap-6 pb-7">
          <p className="text-[20px] font-normal leading-none text-white/80">
            {product.price}
          </p>
          <button
            type="button"
            aria-label={`Add ${product.title} to cart`}
            className="grid h-[32px] w-[32px] place-items-center rounded-xl border border-white/70 text-white transition hover:border-green-500 hover:bg-green-700"
          >
            <img src={bagIcon} alt="" className="h-[15px] w-[15px] object-contain" />
          </button>
        </div>
      </div>
    </article>
   
  );
};

export default TopSellingCard;