import { useState } from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import type { Product } from "../types/product";

const products: Product[] = [
  // PAGE 1
  {
    id: 101,
    name: "Ava Black Heel",
    category: "Women",
    price: 45000,
    image: assets.womanFoot4,
    collection: "Women's Collection",
    color: "Black",
    material: "Leather",
    sizes: [38, 39, 40, 41],
  },
  {
    id: 102,
    name: "Luna Leather Sandal",
    category: "Women",
    price: 38000,
    image: assets.womanFoot4,
    collection: "Women's Collection",
    color: "Brown",
    material: "Leather",
    sizes: [38, 39, 40, 41],
  },
  {
    id: 103,
    name: "Nova Court Sneaker",
    category: "Women",
    price: 52000,
    image: assets.womanFoot4,
    collection: "Women's Collection",
    color: "White",
    material: "Canvas",
    sizes: [38, 39, 40, 41],
  },
  {
    id: 104,
    name: "Highline Leather Boot",
    category: "Women",
    price: 65000,
    image: assets.womanFoot4,
    collection: "Women's Collection",
    color: "Black",
    material: "Leather",
    sizes: [38, 39, 40, 41],
  },
  {
    id: 105,
    name: "Ava Black Heel",
    category: "Women",
    price: 45000,
    image: assets.womanFoot4,
    collection: "Women's Collection",
    color: "Black",
    material: "Leather",
    sizes: [38, 39, 40, 41],
  },
  {
    id: 106,
    name: "Luna Leather Sandal",
    category: "Women",
    price: 38000,
    image: assets.womanFoot4,
    collection: "Women's Collection",
    color: "Brown",
    material: "Leather",
    sizes: [38, 39, 40, 41],
  },
  {
    id: 107,
    name: "Nova Court Sneaker",
    category: "Women",
    price: 52000,
    image: assets.womanFoot4,
    collection: "Women's Collection",
    color: "White",
    material: "Canvas",
    sizes: [38, 39, 40, 41],
  },
  {
    id: 108,
    name: "Highline Leather Boot",
    category: "Women",
    price: 65000,
    image: assets.womanFoot4,
    collection: "Women's Collection",
    color: "Black",
    material: "Leather",
    sizes: [38, 39, 40, 41],
  },

  // PAGE 2
  {
    id: 109,
    name: "Sienna Classic Heel",
    category: "Women",
    price: 48000,
    image: assets.womanFoot1,
    collection: "Women's Collection",
    color: "Black",
    material: "Leather",
    sizes: [38, 39, 40, 41],
  },
  {
    id: 110,
    name: "Amara Strappy Sandal",
    category: "Women",
    price: 42000,
    image: assets.womanFoot2,
    collection: "Women's Collection",
    color: "Brown",
    material: "Leather",
    sizes: [38, 39, 40, 41],
  },
  {
    id: 111,
    name: "Luna White Sneaker",
    category: "Women",
    price: 55000,
    image: assets.womanFoot3,
    collection: "Women's Collection",
    color: "White",
    material: "Canvas",
    sizes: [38, 39, 40, 41],
  },
  {
    id: 112,
    name: "Monaco Leather Boot",
    category: "Women",
    price: 70000,
    image: assets.womanFoot4,
    collection: "Women's Collection",
    color: "Black",
    material: "Leather",
    sizes: [38, 39, 40, 41],
  },
  {
    id: 113,
    name: "Sienna Classic Heel",
    category: "Women",
    price: 48000,
    image: assets.womanFoot4,
    collection: "Women's Collection",
    color: "Black",
    material: "Leather",
    sizes: [38, 39, 40, 41],
  },
  {
    id: 114,
    name: "Amara Strappy Sandal",
    category: "Women",
    price: 42000,
    image: assets.womanFoot4,
    collection: "Women's Collection",
    color: "Brown",
    material: "Leather",
    sizes: [38, 39, 40, 41],
  },
  {
    id: 115,
    name: "Luna White Sneaker",
    category: "Women",
    price: 55000,
    image: assets.womanFoot4,
    collection: "Women's Collection",
    color: "White",
    material: "Canvas",
    sizes: [38, 39, 40, 41],
  },
  {
    id: 116,
    name: "Monaco Leather Boot",
    category: "Women",
    price: 70000,
    image: assets.womanFoot4,
    collection: "Women's Collection",
    color: "Black",
    material: "Leather",
    sizes: [38, 39, 40, 41],
  },
];

const Women = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const currentProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const changePage = (page: number) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-7xl px-5 pt-4 sm:px-8 lg:px-10">
        <div className="flex items-center gap-1 text-[12px] text-gray-400 sm:text-[9px]">
          <Link to="/" className="hover:text-black">
            Home
          </Link>

          <span className="text-black">Women's Footwear</span>
        </div>
      </div>

      {/* Header */}
      <section className="mx-auto max-w-7xl px-5 pb-5 pt-4 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          <h1 className="text-[11px] font-medium uppercase tracking-[0.18em] sm:text-xs">
            Women's Footwear
          </h1>

          <button className="rounded-sm border border-gray-300 px-2 py-1 text-[7px] uppercase tracking-[0.12em] text-gray-600 transition hover:border-black hover:text-black">
            Filter & Sort
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1  gap-x-3 gap-y-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-10">
          {currentProducts.map((product) => (
            <div key={product.id} className="group">
              <Link
                to={`/shop?product=${product.id}`}
                className="block overflow-hidden rounded-[4px] bg-[#f3f3f3]"
              >
                <div className="aspect-[1/1.08] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </Link>

              <div className="pt-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-[10px] font-medium leading-3 text-black sm:text-[9px]">
                      {product.name}
                    </h2>
                  </div>

                  <p className="text-[8px] font-medium text-black sm:text-[9px]">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>

                <Link
                  to={`/shop?product=${product.id}`}
                  className="mt-2 flex h-10 w-full items-center justify-center rounded-[3px] bg-black text-[12px] font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#D4AF37]"
                >
                  View in Shop
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl items-center justify-center px-5 py-12">
        <div className="flex items-center gap-5 text-[8px]">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`text-black transition hover:text-[#0f7a52] text-3xl  ${
              currentPage === 1 ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            <IoIosArrowBack />
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                onClick={() => changePage(page)}
                className={`flex h-4 w-4 items-center justify-center rounded-full transition-all ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "text-gray-500 hover:text-[#0f7a52]"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`text-black transition hover:text-[#0f7a52] text-3xl ${
              currentPage === totalPages ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Women;
