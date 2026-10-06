import { FiHeart, FiEye, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

interface Props {
  product: Product;
  grid: boolean;
}

const ProductCard = ({ product, grid }: Props) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!grid) {
    return (
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 md:grid md:grid-cols-2 gap-6 bg-gray-100 rounded-xl overflow-hidden">
        <div className="w-full h-72 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full  object-cover hover:scale-110 transition duration-500"
          />
        </div>

        <div className="flex flex-col justify-center p-6 flex-1">
          <p className="uppercase tracking-[4px] text-xs text-black font-medium">
            {product.collection}
          </p>

          <h2 className="text-2xl mt-2 font-medium">{product.name}</h2>

          <p className="text-gray-500 mt-2">{product.category}</p>

          <p className="mt-4 text-2xl font-semibold">₦{product.price}</p>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-white text-black shadow font-semibold rounded-xl hover:bg-rosco hover:text-white px-6 py-3 w-fit transition-all duration-300"
          >
            Add To Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-xl">
        {product.badge && (
          <span className="absolute top-5 left-5 z-20 rounded-full bg-black px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            {product.badge}
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-70 md:h-80 lg:h-75 rounded-xl object-cover transition duration-400 group-hover:scale-105"
        />

        <div className="absolute right-5 top-5 flex flex-col gap-3 opacity-0 transition duration-300 group-hover:opacity-100">
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-rosco hover:text-white"
            onClick={() => toggleWishlist(product)}
            aria-label={
              isInWishlist(product.id)
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
          >
            <FiHeart
              className={
                isInWishlist(product.id) ? "fill-current text-red-500" : ""
              }
            />
          </button>

          {/* ViewProduct */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-rosco hover:text-white"
            onClick={() => navigate(`/viewproduct?product=${product.id}`)}
            aria-label={`View ${product.name}`}
          >
            <FiEye />
          </button>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-rosco hover:text-white"
            onClick={() => addToCart(product)}
          >
            <FiShoppingBag />
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-[15px] uppercase tracking-[0.28em] text-black">
          {product.collection}
        </p>

        <h3 className="mt-2 text-xl font-medium leading-tight text-black">
          {product.name}
        </h3>

        <p className="mt-1 text-xl font-semibold text-black">
          ₦{product.price.toFixed(2)}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-rosco"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
