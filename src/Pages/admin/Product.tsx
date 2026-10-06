import { useMemo, useState, useEffect, useRef } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiEdit2,
  FiEye,
  FiMoreHorizontal,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import catalogProducts from "../../assets/products";
import ProductModal from "./ProductModal";

type Status = "IN STOCK" | "LOW STOCK" | "OUT OF STOCK";

export type AdminProduct = {
  id: number;
  image: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: Status;
};

const getStatus = (stock: number): Status =>
  stock === 0 ? "OUT OF STOCK" : stock <= 10 ? "LOW STOCK" : "IN STOCK";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);

const initialProducts: AdminProduct[] = catalogProducts.map(
  (product, index) => {
    const stock = index % 7 === 0 ? 0 : index % 5 === 0 ? 8 : 15 + index * 3;
    return {
      id: product.id,
      image: product.image,
      name: product.name,
      sku: `RF-${String(product.id).padStart(3, "0")}`,
      category: product.category,
      price: product.price,
      stock,
      status: getStatus(stock),
    };
  },
);

const Product = () => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLTableCellElement | null>(null);

  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Category");
  const [stockStatus, setStockStatus] = useState("Stock Status");
  const [page, setPage] = useState(1);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [adding, setAdding] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((item) => item.category))],
    [products],
  );

  const filtered = useMemo(() => {
    return products.filter(
      (item) =>
        (item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.sku.toLowerCase().includes(search.toLowerCase())) &&
        (category === "Category" || item.category === category) &&
        (stockStatus === "Stock Status" ||
          item.status === stockStatus.toUpperCase()),
    );
  }, [products, search, category, stockStatus]);

  const perPage = Math.ceil(initialProducts.length / 2);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * perPage;
  const displayed = filtered.slice(start, start + perPage);

  const save = (item: AdminProduct) => {
    const updated = { ...item, status: getStatus(item.stock) };
    setProducts((all) =>
      all.some((product) => product.id === updated.id)
        ? all.map((product) => (product.id === updated.id ? updated : product))
        : [...all, updated],
    );
    setEditing(null);
    setAdding(false);
  };

  const remove = (id: number) => {
    setProducts((all) => all.filter((item) => item.id !== id));
    setActiveMenu(null);
    setPage(1);
  };

  const exportCSV = () => {
    // Escapes double quotes and wraps string fields in quotes to prevent CSV parsing errors
    const lines = filtered.map((item) =>
      [
        `"${item.sku.replace(/"/g, '""')}"`,
        `"${item.name.replace(/"/g, '""')}"`,
        `"${item.category.replace(/"/g, '""')}"`,
        item.price,
        item.stock,
        `"${item.status}"`,
      ].join(","),
    );

    const csvContent = [
      "SKU,Product,Category,Price (NGN),Stock,Status",
      ...lines,
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "products.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const newProduct: AdminProduct = {
    id: Date.now(),
    image: catalogProducts[0]?.image ?? "",
    name: "",
    sku: `RF-${Date.now().toString().slice(-6)}`,
    category: categories[0] ?? "Footwear",
    price: 0,
    stock: 0,
    status: "OUT OF STOCK",
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-medium tracking-tight text-black">
              Product Inventory
            </h1>
            <p className="mt-1 text-xs text-black">
              Manage your footwear catalog and stock levels.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="flex h-9 items-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              <FiDownload size={13} /> Export CSV
            </button>
            <button
              onClick={() => setAdding(true)}
              className="flex h-9 items-center gap-2 rounded-md bg-black px-4 text-xs font-medium text-white hover:bg-rosco"
            >
              <IoAdd size={16} /> Add New Product
            </button>
          </div>
        </div>

        <div className="mb-5 flex flex-col rounded-xl gap-10 border border-gray-100 bg-white p-2 shadow-sm lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={15}
            />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by product name or SKU..."
              className="h-9 w-full rounded-md bg-gray-50 pl-9 pr-3 text-xs outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-2 lg:pl-4 lg:pt-0">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="h-9 rounded-md border border-gray-200 px-3 text-[11px]"
            >
              <option>Category</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select
              value={stockStatus}
              onChange={(e) => {
                setStockStatus(e.target.value);
                setPage(1);
              }}
              className="h-9 rounded-md border border-gray-200 px-3 text-[11px]"
            >
              <option>Stock Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="min-w-0 overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gray-50">
                  {[
                    "Image",
                    "Product Name",
                    "SKU",
                    "Category",
                    "Price",
                    "Stock",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-3 py-3 text-left text-[9px] font-medium uppercase text-gray-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayed.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-3 py-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 rounded-sm object-cover"
                      />
                    </td>
                    <td className="max-w-[160px] px-3 py-3 text-[11px] font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-3 py-3 text-[10px] text-blue-900">
                      {item.sku}
                    </td>
                    <td className="px-3 py-3 text-[10px] text-gray-600">
                      {item.category}
                    </td>
                    <td className="px-3 py-3 text-[10px] font-medium">
                      {formatCurrency(item.price)}
                    </td>
                    <td
                      className={`px-3 py-3 text-[10px] font-medium ${
                        item.stock === 0 ? "text-red-500" : "text-gray-700"
                      }`}
                    >
                      {item.stock}
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={item.status} />
                    </td>
                    <td
                      className="relative px-3 py-3"
                      ref={activeMenu === item.id ? menuRef : null}
                    >
                      <button
                        onClick={() =>
                          setActiveMenu(activeMenu === item.id ? null : item.id)
                        }
                        className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                        aria-label={`Actions for ${item.name}`}
                      >
                        <FiMoreHorizontal size={16} />
                      </button>
                      {activeMenu === item.id && (
                        <div className="absolute right-3 top-10 z-20 w-28 rounded-md border border-gray-200 bg-white p-1 shadow-lg">
                          <button
                            onClick={() =>
                              navigate(`/viewproduct?product=${item.id}`)
                            }
                            className="flex w-full items-center gap-2 rounded px-2 py-2 text-xs hover:bg-gray-50"
                          >
                            <FiEye size={13} /> View
                          </button>
                          <button
                            onClick={() => {
                              setEditing(item);
                              setActiveMenu(null);
                            }}
                            className="flex w-full items-center gap-2 rounded px-2 py-2 text-xs hover:bg-gray-50"
                          >
                            <FiEdit2 size={13} /> Edit
                          </button>
                          <button
                            onClick={() => remove(item.id)}
                            className="flex w-full items-center gap-2 rounded px-2 py-2 text-xs text-red-600 hover:bg-red-50"
                          >
                            <FiTrash2 size={13} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {displayed.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-12 text-center text-sm text-gray-500"
                    >
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
            <p className="text-[10px] text-gray-500">
              Showing {filtered.length ? start + 1 : 0}–
              {Math.min(start + perPage, filtered.length)} of {filtered.length}{" "}
              products
            </p>
            <div className="flex gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className="flex h-7 w-7 items-center justify-center rounded border disabled:opacity-40"
              >
                <FiChevronLeft size={13} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => setPage(number)}
                    className={`h-7 w-7 rounded text-[10px] ${
                      currentPage === number ? "bg-black text-white" : ""
                    }`}
                  >
                    {number}
                  </button>
                ),
              )}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setPage(currentPage + 1)}
                className="flex h-7 w-7 items-center justify-center rounded border disabled:opacity-40"
              >
                <FiChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {(editing || adding) && (
        <ProductModal
          product={editing ?? newProduct}
          onClose={() => {
            setEditing(null);
            setAdding(false);
          }}
          onSave={save}
        />
      )}
    </div>
  );
};

const StatusBadge = ({ status }: { status: Status }) => {
  const colors: Record<Status, string> = {
    "IN STOCK": "bg-green-100 text-green-700",
    "LOW STOCK": "bg-yellow-100 text-yellow-700",
    "OUT OF STOCK": "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
};

export const ProductModalInternal = ({
  product,
  onClose,
  onSave,
}: {
  product: AdminProduct;
  onClose: () => void;
  onSave: (item: AdminProduct) => void;
}) => {
  const [draft, setDraft] = useState<AdminProduct>(product);

  const set = <K extends keyof AdminProduct>(key: K, value: AdminProduct[K]) =>
    setDraft((item) => ({ ...item, [key]: value }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(draft);
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl bg-white p-6"
      >
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">
            {product.name ? "Edit Product" : "Add Product"}
          </h2>
          <button type="button" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>
        <div className="mt-5 grid gap-4">
          <label className="text-xs font-medium">
            Product name
            <input
              required
              value={draft.name}
              onChange={(e) => set("name", e.target.value)}
              className="mt-1 block h-10 w-full rounded border px-3"
            />
          </label>
          <label className="text-xs font-medium">
            SKU
            <input
              required
              value={draft.sku}
              onChange={(e) => set("sku", e.target.value)}
              className="mt-1 block h-10 w-full rounded border px-3"
            />
          </label>
          <label className="text-xs font-medium">
            Category
            <input
              required
              value={draft.category}
              onChange={(e) => set("category", e.target.value)}
              className="mt-1 block h-10 w-full rounded border px-3"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-medium">
              Price (₦)
              <input
                required
                min="0"
                type="number"
                value={draft.price}
                onChange={(e) => set("price", Number(e.target.value))}
                className="mt-1 block h-10 w-full rounded border px-3"
              />
            </label>
            <label className="text-xs font-medium">
              Stock
              <input
                required
                min="0"
                type="number"
                value={draft.stock}
                onChange={(e) => set("stock", Number(e.target.value))}
                className="mt-1 block h-10 w-full rounded border px-3"
              />
            </label>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-black"
          >
            Cancel
          </button>
          <button className="bg-black text-white px-7 py-3 rounded-xl font-semibold shadow-xl hover:bg-[#D4AF37] hover:text-white transition-all">
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Product;
