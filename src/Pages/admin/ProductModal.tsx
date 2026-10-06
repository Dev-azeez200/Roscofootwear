import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { FiX, FiUploadCloud } from "react-icons/fi";
import type { AdminProduct } from "./Product";

type Props = {
  product: AdminProduct;
  onClose: () => void;
  onSave: (product: AdminProduct) => void;
};

const ProductModal = ({ product, onClose, onSave }: Props) => {
  const [draft, setDraft] = useState<AdminProduct>(product);

  // Close modal when pressing the Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const update = <K extends keyof AdminProduct>(
    key: K,
    value: AdminProduct[K],
  ) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  //
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        update("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(draft);
  };

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {product.id ? "Edit Product" : "Add Product"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form Fields */}
        <div className="mt-5 grid gap-4 text-gray-700">
          {/* File Input & Preview */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Product Image
            </label>
            <div className="flex items-center gap-4">
              {draft.image ? (
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                  <img
                    src={draft.image}
                    alt="Product preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-400">
                  <FiUploadCloud size={24} />
                </div>
              )}

              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus-within:ring-2 focus-within:ring-black">
                <span>{draft.image ? "Change Image" : "Choose Image"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          {/* Product Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Product Name
            </label>
            <input
              required
              type="text"
              value={draft.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Nike Air Max"
              className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* SKU & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                SKU
              </label>
              <input
                required
                type="text"
                value={draft.sku}
                onChange={(e) => update("sku", e.target.value)}
                placeholder="SKU-1029"
                className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                Category
              </label>
              <input
                required
                type="text"
                value={draft.category}
                onChange={(e) => update("category", e.target.value)}
                placeholder="Footwear"
                className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                Price (₦)
              </label>
              <input
                required
                min="0"
                type="number"
                value={draft.price || ""}
                onChange={(e) => update("price", Number(e.target.value))}
                placeholder="0.00"
                className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                Stock Quantity
              </label>
              <input
                required
                min="0"
                type="number"
                value={draft.stock || ""}
                onChange={(e) => update("stock", Number(e.target.value))}
                placeholder="0"
                className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3 border-t pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white shadow transition hover:bg-gray-800"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductModal;
