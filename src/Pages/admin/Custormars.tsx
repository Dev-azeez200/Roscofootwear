import { useMemo, useState } from "react";
import assets from "../../assets/assets";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMoreVertical,
  FiSearch,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiX,
} from "react-icons/fi";

type CustomerStatus = "LOYAL" | "ACTIVE" | "NEW";

type Customer = {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  orders: number;
  spend: number;
  status: CustomerStatus;
  image?: string;
};

const customers: Customer[] = [
  {
    id: 1,
    name: "Alade Dc",
    email: "alade@example.com",
    joinDate: "Oct 12, 2020",
    orders: 14,
    spend: 84250,
    status: "LOYAL",
    image: assets.Cross,
  },
  {
    id: 2,
    name: "Sunmence",
    email: "sunmence@example.com",
    joinDate: "Jan 05, 2024",
    orders: 2,
    spend: 40000,
    status: "ACTIVE",
    image: assets.Cross,
  },
  {
    id: 3,
    name: "Sophia Alarie",
    email: "sophia@example.com",
    joinDate: "Oct 24, 2024",
    orders: 1,
    spend: 32000,
    status: "NEW",
  },
  {
    id: 4,
    name: "Mr Farinde",
    email: "SeniorCub@example.com",
    joinDate: "Nov 18, 2023",
    orders: 8,
    spend: 22180,
    status: "ACTIVE",
    image: assets.Cross,
  },
  {
    id: 5,
    name: "Mr Olawale",
    email: "olawale@example.com",
    joinDate: "Dec 02, 2023",
    orders: 11,
    spend: 100640,
    status: "LOYAL",
    image: assets.Cross,
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);

const Customers = () => {
  const [customerList, setCustomerList] = useState(customers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [spend, setSpend] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const filteredCustomers = useMemo(() => {
    return customerList.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || customer.status === status.toUpperCase();

      let matchesSpend = true;

      if (spend === "0 - 500") {
        matchesSpend = customer.spend <= 500;
      }

      if (spend === "500 - 2000") {
        matchesSpend = customer.spend > 500 && customer.spend <= 2000;
      }

      if (spend === "2000+") {
        matchesSpend = customer.spend > 2000;
      }

      return matchesSearch && matchesStatus && matchesSpend;
    });
  }, [customerList, search, status, spend]);

  const customersPerPage = Math.ceil(customerList.length / 2);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / customersPerPage),
  );
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * customersPerPage;
  const displayedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + customersPerPage,
  );

  const getStatusStyle = (customerStatus: CustomerStatus) => {
    switch (customerStatus) {
      case "LOYAL":
        return "bg-green-100 text-green-700";

      case "ACTIVE":
        return "bg-blue-100 text-blue-700";

      case "NEW":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "";
    }
  };

  return (
    <section className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-medium tracking-tight text-black">
              Customer Directory
            </h1>

            <p className="mt-1 max-w-md text-sm leading-5 text-gray-500">
              Manage your customer relationships and lifetime value.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-3 rounded-xl border border-gray-200 bg-white p-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_110px_110px]">
            {/* Search */}
            <div className="relative">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={14}
              />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search customers by name or email"
                className="h-9 w-full rounded-md border border-gray-200 bg-[#fafafa] pl-9 pr-3 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
              />
            </div>

            {/* Status */}
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 rounded-md border border-gray-200 bg-[#fafafa] px-3 text-xs text-gray-600 outline-none"
            >
              <option value="All">Status: All</option>
              <option value="Loyal">Status: Loyal</option>
              <option value="Active">Status: Active</option>
              <option value="New">Status: New</option>
            </select>

            {/* Spend */}
            <select
              value={spend}
              onChange={(e) => {
                setSpend(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 rounded-md border border-gray-200 bg-[#fafafa] px-3 text-xs text-gray-600 outline-none"
            >
              <option value="All">Total Spend: All</option>
              <option value="0 - 500">₦0 - ₦500</option>
              <option value="500 - 2000">₦500 - ₦2,000</option>
              <option value="2000+">₦2,000+</option>
            </select>
          </div>
        </div>

        {/* Customer Table */}
        <div className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="min-w-0 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-[#fafafa]">
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-gray-600">
                    Customer
                  </th>

                  <th className="px-4 py-3 text-left text-[10px] font-medium text-gray-600">
                    Join Date
                  </th>

                  <th className="px-4 py-3 text-center text-[10px] font-medium text-gray-600">
                    <span className="block">Total</span>
                    <span>Orders</span>
                  </th>

                  <th className="px-4 py-3 text-right text-[10px] font-medium text-gray-600">
                    <span className="block">Total</span>
                    <span>Spend</span>
                  </th>

                  <th className="px-4 py-3 text-center text-[10px] font-medium text-gray-600">
                    Status
                  </th>

                  <th className="px-4 py-3 text-center text-[10px] font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {displayedCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-gray-200 last:border-0 hover:bg-gray-50"
                  >
                    {/* Customer */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {customer.image ? (
                          <img
                            src={customer.image}
                            alt={customer.name}
                            className="h-7 w-7 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-500">
                            SA
                          </div>
                        )}

                        <div>
                          <p className="text-[11px] font-medium text-gray-900">
                            {customer.name}
                          </p>

                          <p className="text-[9px] text-gray-400">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-[10px] text-gray-600">
                      <span className="max-w-[55px] leading-4">
                        {customer.joinDate}
                      </span>
                    </td>

                    {/* Orders */}
                    <td className="px-4 py-3 text-center text-[10px] text-gray-700">
                      {customer.orders}
                    </td>

                    {/* Spend */}
                    <td className="px-4 py-3 text-right text-[10px] font-medium text-gray-900">
                      {formatCurrency(customer.spend)}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${getStatusStyle(
                          customer.status,
                        )}`}
                      >
                        {customer.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="relative px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === customer.id ? null : customer.id,
                          )
                        }
                        className="text-gray-600 transition hover:text-black"
                        aria-label={`Actions for ${customer.name}`}
                      >
                        <FiMoreVertical size={14} />
                      </button>
                      {activeMenu === customer.id && (
                        <div className="absolute right-4 top-9 z-20 w-28 rounded-md border border-gray-200 bg-white p-1 text-left shadow-lg">
                          <button
                            onClick={() => {
                              setSelectedCustomer(customer);
                              setActiveMenu(null);
                            }}
                            className="flex w-full items-center gap-2 rounded px-2 py-2 text-xs hover:bg-gray-50"
                          >
                            <FiEye size={13} /> View
                          </button>
                          <button
                            onClick={() => {
                              setEditingCustomer(customer);
                              setActiveMenu(null);
                            }}
                            className="flex w-full items-center gap-2 rounded px-2 py-2 text-xs hover:bg-gray-50"
                          >
                            <FiEdit2 size={13} /> Edit
                          </button>
                          <button
                            onClick={() => {
                              setCustomerList((items) =>
                                items.filter((item) => item.id !== customer.id),
                              );
                              setActiveMenu(null);
                            }}
                            className="flex w-full items-center gap-2 rounded px-2 py-2 text-xs text-red-600 hover:bg-red-50"
                          >
                            <FiTrash2 size={13} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {displayedCustomers.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-sm text-gray-500"
                    >
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Bottom */}
          <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[9px] text-gray-500">
              Showing{" "}
              <span className="text-gray-700">
                {filteredCustomers.length > 0 ? "1" : "0"}–
                {filteredCustomers.length}
              </span>{" "}
              of <span className="text-gray-700">124</span> customers
            </p>

            {/* Pagination */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={activePage === 1}
                onClick={() => setCurrentPage(activePage - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-100 disabled:opacity-40"
              >
                <FiChevronLeft size={12} />
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] ${
                  currentPage === 1
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                1
              </button>

              {Array.from(
                { length: Math.max(0, totalPages - 1) },
                (_, index) => index + 2,
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] ${
                    activePage === page
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <span className="hidden px-1 text-xs text-gray-400">...</span>

              <button
                type="button"
                onClick={() => setCurrentPage(13)}
                className={`hidden h-7 w-7 items-center justify-center rounded-full text-[10px] ${
                  currentPage === 13
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                13
              </button>

              <button
                type="button"
                disabled={activePage === totalPages}
                onClick={() => setCurrentPage(activePage + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-100 disabled:opacity-40"
              >
                <FiChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {selectedCustomer && (
        <CustomerDetails
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
      {editingCustomer && (
        <CustomerEditor
          customer={editingCustomer}
          onClose={() => setEditingCustomer(null)}
          onSave={(updated) => {
            setCustomerList((items) =>
              items.map((item) => (item.id === updated.id ? updated : item)),
            );
            setEditingCustomer(null);
          }}
        />
      )}
    </section>
  );
};

const CustomerDetails = ({
  customer,
  onClose,
}: {
  customer: Customer;
  onClose: () => void;
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
  >
    <div
      className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Customer Details</h2>
        <button onClick={onClose} aria-label="Close">
          <FiX size={20} />
        </button>
      </div>
      <div className="mt-5 flex justify-center">
        {customer.image ? (
          <img
            src={customer.image}
            alt={customer.name}
            className="h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-2xl font-medium text-gray-500">
            {customer.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="mt-5 space-y-3 text-sm">
        <p>
          <span className="text-gray-500">Name: </span>
          {customer.name}
        </p>
        <p>
          <span className="text-gray-500">Email: </span>
          {customer.email}
        </p>
        <p>
          <span className="text-gray-500">Joined: </span>
          {customer.joinDate}
        </p>
        <p>
          <span className="text-gray-500">Orders: </span>
          {customer.orders}
        </p>
        <p>
          <span className="text-gray-500">Total spend: </span>
          {formatCurrency(customer.spend)}
        </p>
      </div>
    </div>
  </div>
);

const CustomerEditor = ({
  customer,
  onClose,
  onSave,
}: {
  customer: Customer;
  onClose: () => void;
  onSave: (customer: Customer) => void;
}) => {
  const [draft, setDraft] = useState(customer);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSave(draft);
        }}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Edit Customer</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            <FiX size={20} />
          </button>
        </div>
        <div className="mt-5 space-y-4">
          <label className="block text-xs font-medium">
            Name
            <input
              required
              value={draft.name}
              onChange={(event) =>
                setDraft({ ...draft, name: event.target.value })
              }
              className="mt-1 h-10 w-full rounded border border-gray-200 px-3 text-sm"
            />
          </label>
          <label className="block text-xs font-medium">
            Email
            <input
              required
              type="email"
              value={draft.email}
              onChange={(event) =>
                setDraft({ ...draft, email: event.target.value })
              }
              className="mt-1 h-10 w-full rounded border border-gray-200 px-3 text-sm"
            />
          </label>
          <label className="block text-xs font-medium">
            Status
            <select
              value={draft.status}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  status: event.target.value as CustomerStatus,
                })
              }
              className="mt-1 h-10 w-full rounded border border-gray-200 px-3 text-sm"
            >
              <option>LOYAL</option>
              <option>ACTIVE</option>
              <option>NEW</option>
            </select>
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-3 py-2 text-sm">
            Cancel
          </button>
          <button className="rounded-lg bg-black px-4 py-2 text-sm text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Customers;
