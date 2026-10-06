import { useMemo, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiCalendar,
  FiEye,
  // FiExternalLink,
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import { orderData, type OrderStatus, type OrderType } from "../../data/orders";

const tabs = [
  "All Orders",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const getOrderDateValue = (order: OrderType) => {
  const date = new Date(`${order.date} ${order.time}`);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);

const Order = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Orders");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "All">("All");
  const [showFilter, setShowFilter] = useState(false);
  const [showDateRange, setShowDateRange] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const ordersPerPage = 10;

  // SEARCH + FILTER
  const filteredOrders = useMemo(() => {
    return orderData.filter((order) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        order.id.toLowerCase().includes(searchText) ||
        order.customer.toLowerCase().includes(searchText) ||
        order.email.toLowerCase().includes(searchText);

      const matchesTab =
        activeTab === "All Orders" || order.status === activeTab;

      const matchesFilter =
        filterStatus === "All" || order.status === filterStatus;

      const orderDate = getOrderDateValue(order);
      const matchesDateRange =
        (!startDate || orderDate >= startDate) &&
        (!endDate || orderDate <= endDate);

      return matchesSearch && matchesTab && matchesFilter && matchesDateRange;
    });
  }, [search, activeTab, filterStatus, startDate, endDate]);

  // PAGINATION
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const startIndex = (currentPage - 1) * ordersPerPage;

  const displayedOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage,
  );

  // TAB FUNCTION
  const changeTab = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // EXPORT CSV
  const exportCSV = () => {
    const headers = [
      "Order ID",
      "Date",
      "Time",
      "Customer",
      "Email",
      "Amount (NGN)",
      "Payment",
      "Status",
    ];

    const rows = filteredOrders.map((order) => [
      order.id,
      order.date,
      order.time,
      order.customer,
      order.email,
      order.amount,
      order.payment,
      order.status,
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
      "\n",
    );

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "orders.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  // VIEW ORDER
  const handleViewOrder = (order: OrderType) => {
    setSelectedOrder(order);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#111827]">
            Order Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View, manage, and process customer orders.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="flex w-fit items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <FiDownload size={14} />
          Export CSV
        </button>
      </div>

      {/* CARD */}
      <div className="min-w-0 overflow-hidden rounded-xl bg-white shadow-sm">
        {/* SEARCH / FILTER */}
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 md:flex-row md:items-center md:justify-between">
          {/* SEARCH */}
          <div className="relative w-full md:w-[235px]">
            <FiSearch
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by Order ID, customer, or SKU..."
              className="h-10 w-full rounded-md border border-gray-200 bg-gray-50 pl-9 pr-3 text-xs outline-none focus:border-gray-400"
            />
          </div>

          <div className="flex gap-2">
            {/* FILTER */}
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex h-10 items-center gap-2 rounded-md border border-gray-200 px-4 text-xs text-gray-600 hover:bg-gray-50"
              >
                <FiFilter size={13} />
                Filter
              </button>

              {showFilter && (
                <div className="absolute right-0 top-12 z-30 w-44 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                  {[
                    "All",
                    "Pending",
                    "Processing",
                    "Shipped",
                    "Delivered",
                    "Cancelled",
                  ].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setFilterStatus(status as OrderStatus | "All");
                        setCurrentPage(1);
                        setShowFilter(false);
                      }}
                      className="w-full rounded-md px-3 py-2 text-left text-xs text-gray-600 hover:bg-gray-50"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DATE RANGE */}
            <div className="relative">
              <button
                onClick={() => setShowDateRange(!showDateRange)}
                className={`flex h-10 items-center gap-2 rounded-md border px-4 text-xs transition hover:bg-gray-50 ${
                  startDate || endDate
                    ? "border-black bg-gray-50 text-black"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                <FiCalendar size={13} />
                Date Range
              </button>

              {showDateRange && (
                <div className="absolute right-0 top-12 z-30 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                  <div className="space-y-3">
                    <label className="block text-xs font-medium text-gray-700">
                      From
                      <input
                        type="date"
                        value={startDate}
                        max={endDate || undefined}
                        onChange={(event) => {
                          setStartDate(event.target.value);
                          setCurrentPage(1);
                        }}
                        className="mt-1.5 h-10 w-full rounded-md border border-gray-200 px-3 text-xs outline-none focus:border-gray-400"
                      />
                    </label>

                    <label className="block text-xs font-medium text-gray-700">
                      To
                      <input
                        type="date"
                        value={endDate}
                        min={startDate || undefined}
                        onChange={(event) => {
                          setEndDate(event.target.value);
                          setCurrentPage(1);
                        }}
                        className="mt-1.5 h-10 w-full rounded-md border border-gray-200 px-3 text-xs outline-none focus:border-gray-400"
                      />
                    </label>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setStartDate("");
                        setEndDate("");
                        setCurrentPage(1);
                      }}
                      className="text-xs text-gray-500 hover:text-black"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setShowDateRange(false)}
                      className="rounded-md bg-black px-3 py-2 text-xs font-medium text-white hover:bg-gray-800"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="overflow-x-auto border-b border-gray-100">
          <div className="flex min-w-max px-4">
            {tabs.map((tab) => {
              const count =
                tab === "All Orders"
                  ? orderData.length
                  : orderData.filter((order) => order.status === tab).length;

              return (
                <button
                  key={tab}
                  onClick={() => changeTab(tab)}
                  className={`relative px-4 py-4 text-xs ${
                    activeTab === tab
                      ? "font-medium text-black"
                      : "text-gray-500"
                  }`}
                >
                  {tab} ({count})
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-black" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* TABLE */}
        <div className="min-w-0 overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase text-gray-500">
                  Order ID
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase text-gray-500">
                  Date & Time
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase text-gray-500">
                  Customer
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase text-gray-500">
                  Amount
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase text-gray-500">
                  Payment
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase text-gray-500">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {displayedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  {/* ID */}
                  <td className="px-4 py-4 text-xs font-medium text-gray-800">
                    {order.id}
                  </td>

                  {/* DATE */}
                  <td className="px-4 py-4">
                    <p className="text-xs text-gray-600">{order.date}</p>

                    <p className="text-[10px] text-gray-400">{order.time}</p>
                  </td>

                  {/* CUSTOMER */}
                  <td className="px-4 py-4">
                    <p className="text-xs font-medium text-gray-800">
                      {order.customer}
                    </p>

                    <p className="text-[10px] text-gray-400">{order.email}</p>
                  </td>

                  {/* AMOUNT */}
                  <td className="px-4 py-4 text-xs font-medium">
                    {formatCurrency(order.amount)}
                  </td>

                  {/* PAYMENT */}
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                        order.payment === "Paid"
                          ? "bg-green-100 text-green-700"
                          : order.payment === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.payment}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Processing"
                              ? "bg-blue-100 text-blue-700"
                              : order.status === "Shipped"
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="text-gray-500 hover:text-black"
                        title="View order"
                      >
                        <FiEye size={14} />
                      </button>

                      {/* <button
                        onClick={() => handleViewOrder(order)}
                        className="text-gray-500 hover:text-black"
                        title="Open order"
                      >
                        <FiExternalLink size={14} />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EMPTY STATE */}
          {displayedOrders.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-400">
              No orders found.
            </div>
          )}
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-gray-500">
            Showing {filteredOrders.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + ordersPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length} entries
          </p>

          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30"
            >
              <FiChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 min-w-8 rounded-md px-2 text-xs ${
                    currentPage === page
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30"
            >
              <FiChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-modal-title"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Order details
                </p>
                <h2
                  id="order-modal-title"
                  className="mt-1 text-xl font-semibold text-gray-900"
                >
                  {selectedOrder.id}
                </h2>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                aria-label="Close order details"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-black">Date & time</span>
                <span className="font-medium text-gray-800">
                  {selectedOrder.date}, {selectedOrder.time}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-black">Customer</span>
                <span className="text-right font-medium text-gray-800">
                  {selectedOrder.customer}
                  <span className="block text-xs font-normal text-gray-500">
                    {selectedOrder.email}
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-black">Amount</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(selectedOrder.amount)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-black">Payment / status</span>
                <span className="font-medium text-gray-800">
                  {selectedOrder.payment} / {selectedOrder.status}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="group bg-black font-semibold w-full text-white px-7 py-3 rounded-xl  shadow-xl hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
