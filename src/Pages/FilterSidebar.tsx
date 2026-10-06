import React from "react";

interface Props {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;

  selectedSizes: number[];
  setSelectedSizes: React.Dispatch<React.SetStateAction<number[]>>;

  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;

  selectedMaterials: string[];
  setSelectedMaterials: React.Dispatch<React.SetStateAction<string[]>>;

  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
}

const categories = [
  "All Footwear",
  "Minimalist Sneakers",
  "Heritage Loafers",
  "Modern Boots",
  "Resort Sandals",
  "Women",
];

const sizes = [39, 40, 41, 42, 43, 44, 45];

const colors = [
  {
    name: "Black",
    value: "#000",
  },
  {
    name: "White",
    value: "#fff",
  },
  {
    name: "Brown",
    value: "#7A4A2C",
  },
  {
    name: "Beige",
    value: "#D6C5A4",
  },
  {
    name: "Grey",
    value: "#B7B7B7",
  },
];

const materials = [
  "Full Grain Leather",
  "Suede",
  "Recycled Canvas",
  "Leather",
  "Canvas",
];

const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  selectedMaterials,
  setSelectedMaterials,
  maxPrice,
  setMaxPrice,
}: Props) => {
  const toggleSize = (size: number) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const toggleMaterial = (material: string) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const clearFilters = () => {
    setSelectedCategory("All Footwear");
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedMaterials([]);
    setMaxPrice(100000);
  };

  return (
    <div className="sticky top-24 space-y-10">
      {/* CATEGORY */}

      <div>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xs font-semibold tracking-[3px] uppercase">
            Category
          </h3>

          <button
            onClick={clearFilters}
            className="text-xs text-black hover:text-rosco"
          >
            Reset
          </button>
        </div>

        <div className="space-y-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`block text-sm transition ${
                selectedCategory === category
                  ? "font-semibold text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[3px] mb-5">
          Size (EU)
        </h3>

        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`h-11 border text-sm transition
              ${
                selectedSizes.includes(size)
                  ? "bg-rosco text-white hover:bg-rosco border-black"
                  : "hover:border-white hover:bg-rosco"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[3px] mb-5">
          Price
        </h3>

        <input
          type="range"
          min={100}
          max={100000}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-rosco"
        />

        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>₦100</span>

          <span>₦{maxPrice}</span>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[3px] mb-5">
          Finish
        </h3>

        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              style={{
                backgroundColor: color.value,
              }}
              className={`w-8 h-8 rounded-full border-2 transition
              ${
                selectedColors.includes(color.name)
                  ? "border-black scale-110"
                  : "border-gray-300"
              }
              ${color.name === "White" ? "border" : ""}
              `}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[3px] mb-5">
          Material
        </h3>

        <div className="space-y-4">
          {materials.map((material) => (
            <label
              key={material}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedMaterials.includes(material)}
                onChange={() => toggleMaterial(material)}
                className="accent-black"
              />

              <span className="text-sm text-gray-600">{material}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
