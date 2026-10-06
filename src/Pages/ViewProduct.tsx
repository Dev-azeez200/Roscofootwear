import { Link, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiHeart, FiShoppingBag } from "react-icons/fi";
import products from "../assets/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ViewProduct = () => {
  const [searchParams] = useSearchParams();
  const productId = Number(searchParams.get("product"));
  const product = products.find((item) => item.id === productId);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) {
    return (
      < div className="mx-auto min-h-screen max-w-7xl px-5 py-16 text-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 bg-black px-5 py-3 text-sm font-medium uppercase tracking-[0.12em] text-white"
        >
          <FiArrowLeft /> Back to Shop
        </Link>
      </ div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  return (
    < div className="mx-auto min-h-screen max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
      <Link
        to="/shop"
        className="mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-gray-500 transition hover:text-black"
      >
        <FiArrowLeft /> Back to Shop
      </Link>
      <section className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
        <div className="flex justify-center lg:justify-start">
          <div className="group relative w-full max-w-[480px] overflow-hidden rounded-2xl bg-[#F7F7F5]">
            <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-700 backdrop-blur-sm">
              {product.collection}
            </div>

            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-500">
            {product.collection}
          </p>

          <h1 className="mt-4 l text-xl font-medium tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
            {product.name}
          </h1>

          <p className="mt-4 text-sm uppercase tracking-[0.15em] text-gray-500">
            {product.category}
          </p>

          <div className="mt-7 border-y border-gray-200 py-5">
            <p className="text-2xl font-semibold tracking-tight text-gray-900">
              ₦{product.price.toLocaleString()}
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-5 border-b border-gray-200 pb-7 text-sm">``
            <div className="col-span-2">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                Available Sizes
              </p>
              <p className="text-gray-800">{product.sizes.join("  •  ")}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="inline-flex flex-1 items-center justify-center gap-3 rounded-lg bg-black px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-rosco hover:shadow-lg"
            >
              <FiShoppingBag className="text-base" />
              Add To Cart
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className="inline-flex items-center justify-center gap-3 rounded-lg border border-gray-300 px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-gray-900 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
            >
              <FiHeart
                className={`text-base transition-colors ${
                  inWishlist ? "fill-current text-rosco" : ""
                }`}
              />

              {inWishlist ? "Remove Wishlist" : "Add Wishlist"}
            </button>
          </div>
        </div>
      </section>
    </ div>
  );
};

export default ViewProduct;
