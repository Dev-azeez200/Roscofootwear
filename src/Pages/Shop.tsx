import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../assets/products";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import { FaTableList } from "react-icons/fa6";
import { MdArrowDropDown } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedProductId = Number(searchParams.get("product"));
  const [selectedCategory, setSelectedCategory] = useState("All Footwear");
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortBy, setSortBy] = useState("featured");
  const [gridView, setGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (selectedCategory !== "All Footwear") {
      data = data.filter((item) => item.category === selectedCategory);
    }

    if (selectedSizes.length) {
      data = data.filter((item) =>
        item.sizes.some((size) => selectedSizes.includes(size)),
      );
    }

    if (selectedColors.length) {
      data = data.filter((item) => selectedColors.includes(item.color));
    }

    if (selectedMaterials.length) {
      data = data.filter((item) => selectedMaterials.includes(item.material));
    }

    data = data.filter((item) => item.price <= maxPrice);

    if (selectedProductId) {
      data = data.filter((item) => item.id === selectedProductId);
    }

    switch (sortBy) {
      case "low":
        data.sort((a, b) => a.price - b.price);
        break;
      case "high":
        data.sort((a, b) => b.price - a.price);
        break;
      case "az":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return data;
  }, [
    selectedCategory,
    selectedSizes,
    selectedColors,
    selectedMaterials,
    maxPrice,
    sortBy,
    selectedProductId,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <section className="mx-auto px-4 lg:px-13 py-14">
      <div className="text-center mb-14">
        <h1 className="text-2xl lg:text-4xl font-semibold text-rosco">
          Summer Curations
        </h1>

        <p className="text-black mt-4">
          Discover the intersection of artisanal heritage and contemporary
          silhouettes.
        </p>

        <p className="text-black">Effortless luxury for the modern nomad.</p>

        {selectedProductId > 0 && (
          <button
            onClick={() => setSearchParams({})}
            className="mt-5 text-xs font-medium uppercase tracking-[0.15em] text-gray-500 underline underline-offset-4 hover:text-black"
          >
            View all products
          </button>
        )}
      </div>

      <div className="border-y border-gray-200 py-4 px-3 mb-10">
        <div className="flex justify-between md:flex-row md:items-center md:justify-between gap-5">
          <p className="uppercase tracking-[0.18em] text-xs text-black font-medium">
            Showing {displayedProducts.length} of {filteredProducts.length}{" "}
            Products
          </p>

          <div className="flex items-center gap-5">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent pr-8 text-sm font-medium outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="low">Price Low - High</option>
                <option value="high">Price High - Low</option>
                <option value="az">A - Z</option>
                <option value="za">Z - A</option>
              </select>

              <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                <MdArrowDropDown />
              </span>
            </div>

            <div className="h-6 w-px bg-gray-300" />

            <div className="flex items-center gap-2">
              <button
                onClick={() => setGridView(true)}
                className={`p-2 transition ${
                  gridView
                    ? "text-black hover:cursor-pointer"
                    : "text-gray-600 hover:text-black hover:cursor-pointer"
                }`}
              >
                <RxDashboard />
              </button>

              <button
                onClick={() => setGridView(false)}
                className={`p-2 transition ${
                  !gridView
                    ? "text-black hover:cursor-pointer"
                    : "text-gray-600 hover:text-black hover:cursor-pointer"
                }`}
              >
                <FaTableList />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        <aside className="hidden lg:block col-span-3">
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedMaterials={selectedMaterials}
            setSelectedMaterials={setSelectedMaterials}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </aside>

        <div className="col-span-10 relative left-3 lg:col-span-9 md:col-span-12 overflow-hidden">
          <div
            className={
              gridView
                ? "grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4"
                : "space-y-6"
            }
          >
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} grid={gridView} />
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-14">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-full transition ${
                  currentPage === index + 1
                    ? "bg-rosco text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
