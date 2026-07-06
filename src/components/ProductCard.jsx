// components/ProductCard.jsx
import bagIcon from "../assets/bag.png";

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
            <img src={bagIcon} alt="bag" className="w-4 h-4" />
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

export default ProductCard;