import { useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { orderData } from "../../data/orders";
import { formatCurrency, formatOrderDate } from "../../data/orderUtils";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FiActivity,
  FiArrowUpRight,
  FiBarChart2,
  FiCalendar,
  FiChevronDown,
  FiMoreHorizontal,
  FiPackage,
  FiShoppingBag,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

const salesData = [
  { day: "Mon", sales: 3200 },
  { day: "Tue", sales: 4800 },
  { day: "Wed", sales: 3900 },
  { day: "Thu", sales: 6200 },
  { day: "Fri", sales: 5400 },
  { day: "Sat", sales: 7800 },
  { day: "Sun", sales: 6900 },
];

const acquisitionData = [
  { name: "Organic", value: 45 },
  { name: "Social", value: 25 },
  { name: "Email", value: 20 },
  { name: "Paid", value: 10 },
];

const products = [
  {
    name: "The Heritage Boot",
    units: "1,245",
    percentage: 88,
  },
  {
    name: "Classic Loafers",
    units: "902",
    percentage: 68,
  },
  {
    name: "Minimalist Sneaker",
    units: "840",
    percentage: 63,
  },
  {
    name: "Suede Chelsea",
    units: "620",
    percentage: 46,
  },
];

const categories = [
  {
    category: "Men's Footwear",
    revenue: "₦65,230",
    growth: "+8.4%",
    positive: true,
  },
  {
    category: "Women's Footwear",
    revenue: "₦42,100",
    growth: "+15.2%",
    positive: true,
  },
  {
    category: "Limited Collections",
    revenue: "₦17,170",
    growth: "-2.1%",
    positive: false,
  },
];

const COLORS = ["#272727", "#777777", "#b5b5b5", "#dddddd"];

const statusStyles: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-indigo-100 text-indigo-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const formatDateLabel = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);

const getDateRangeLabel = (startDateValue?: string, endDateValue?: string) => {
  const today = endDateValue
    ? new Date(`${endDateValue}T00:00:00`)
    : new Date();

  const start = startDateValue
    ? new Date(`${startDateValue}T00:00:00`)
    : new Date(today);

  if (!startDateValue && !endDateValue) {
    start.setDate(today.getDate() - 29);
  }

  return `${formatDateLabel(start)} - ${formatDateLabel(today)}`;
};

const totalRevenue = orderData.reduce((sum, order) => sum + order.amount, 0);
const averageOrderValue = Math.round(totalRevenue / orderData.length);

const Overview = () => {
  const [showDateRange, setShowDateRange] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dateLabel = getDateRangeLabel(startDate, endDate);
  return (
    <>
      <div className="min-h-screen min-w-0 bg-[#fafafa]">
        <div className="min-w-0">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              Dashboard Overview
            </h1>

            <div className="relative">
              <button
                onClick={() => setShowDateRange(!showDateRange)}
                className="flex w-fit items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 shadow-sm transition hover:bg-gray-50"
              >
                <FiCalendar className="text-gray-500" />

                <span>
                  {startDate || endDate
                    ? dateLabel
                    : `Last 30 Days: ${dateLabel}`}
                </span>

                <FiChevronDown className="ml-1" />
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
                        }}
                        className="mt-1.5 h-10 w-full rounded-md border border-gray-200 px-3 text-xs outline-none focus:border-gray-400"
                      />
                    </label>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setStartDate("");
                          setEndDate("");
                          setShowDateRange(false);
                        }}
                        className="rounded-md border border-gray-200 px-3 py-2 text-[10px] font-medium text-gray-600 hover:bg-gray-50"
                      >
                        Reset
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowDateRange(false)}
                        className="rounded-md bg-black px-3 py-2 text-[10px] font-medium text-white hover:bg-gray-800"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Revenue */}
            <div className="min-w-0 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[8px] font-medium uppercase tracking-wide text-gray-400">
                  Total Revenue
                </p>
                <div className="rounded-full bg-green-50 p-1.5 text-green-600">
                  <FiTrendingUp size={12} />
                </div>
              </div>

              <div className="mt-1 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  {formatCurrency(totalRevenue)}
                </h2>

                <span className="rounded bg-green-50 px-1.5 py-0.5 text-[8px] font-medium text-green-600">
                  <span className="inline-flex items-center gap-1">
                    <FiArrowUpRight size={10} /> +12.2%
                  </span>
                </span>
              </div>
            </div>

            {/* Conversion Rate */}
            <div className="min-w-0 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[8px] font-medium uppercase tracking-wide text-gray-400">
                  Conversion Rate
                </p>
                <div className="rounded-full bg-blue-50 p-1.5 text-blue-600">
                  <FiActivity size={12} />
                </div>
              </div>

              <div className="mt-1 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">3.2%</h2>

                <span className="rounded bg-green-50 px-1.5 py-0.5 text-[8px] font-medium text-green-600">
                  <span className="inline-flex items-center gap-1">
                    <FiArrowUpRight size={10} /> +0.5%
                  </span>
                </span>
              </div>
            </div>

            {/* Average Order */}
            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[8px] font-medium uppercase tracking-wide text-gray-400">
                  Average Order
                  <br />
                  Value
                </p>
                <div className="rounded-full bg-amber-50 p-1.5 text-amber-600">
                  <FiShoppingBag size={12} />
                </div>
              </div>

              <div className="mt-1 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  {formatCurrency(averageOrderValue)}
                </h2>

                <span className="rounded bg-red-50 px-1.5 py-0.5 text-[8px] font-medium text-red-500">
                  <span className="inline-flex items-center gap-1">
                    <FiArrowUpRight size={10} /> -2.2%
                  </span>
                </span>
              </div>
            </div>

            {/* Return Rate */}
            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[8px] font-medium uppercase tracking-wide text-gray-400">
                  Return Rate
                </p>
                <div className="rounded-full bg-violet-50 p-1.5 text-violet-600">
                  <FiUsers size={12} />
                </div>
              </div>

              <div className="mt-1 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">1.5%</h2>

                <span className="rounded bg-green-50 px-1.5 py-0.5 text-[8px] font-medium text-green-600">
                  <span className="inline-flex items-center gap-1">
                    <FiArrowUpRight size={10} /> -0.2%
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Main Charts */}
          <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">
            {/* Sales Over Time */}
            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">
                  Sales Over Time
                </h2>

                <button className="text-gray-400 hover:text-gray-700">
                  <FiMoreHorizontal />
                </button>
              </div>

              <div className="h-[220px] w-full rounded-md bg-[#f5f5f5] p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient
                        id="salesGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopOpacity={0.18} />
                        <stop offset="100%" stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <XAxis
                      dataKey="day"
                      tick={{
                        fontSize: 9,
                        fill: "#999",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      tick={{
                        fontSize: 9,
                        fill: "#999",
                      }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `₦${value / 1000}k`}
                    />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#222"
                      strokeWidth={2}
                      fill="url(#salesGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Acquisition */}
            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">
                  Acquisition
                </h2>

                <button className="text-gray-400 hover:text-gray-700">
                  <FiMoreHorizontal />
                </button>
              </div>

              <div className="relative flex justify-center">
                <div className="h-[145px] w-[145px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={acquisitionData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={45}
                        outerRadius={62}
                        paddingAngle={2}
                        stroke="none"
                      >
                        {acquisitionData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                  <span className="text-lg font-semibold text-gray-800">
                    100%
                  </span>
                </div>
              </div>

              {/* Acquisition Legend */}
              <div className="mt-1 space-y-1.5">
                {acquisitionData.map((item, index) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-[9px]"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          backgroundColor: COLORS[index],
                        }}
                      />

                      <span className="text-gray-500">{item.name}</span>
                    </div>

                    <span className="text-gray-600">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.15fr]">
            {/* Top Selling Products */}
            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-gray-100 p-2 text-gray-700">
                    <FiPackage size={12} />
                  </div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Top Selling Products
                  </h2>
                </div>

                <button className="text-gray-400 hover:text-gray-700">
                  <FiMoreHorizontal />
                </button>
              </div>

              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.name}
                    className="rounded-lg border border-gray-100 p-3"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-[10px] font-semibold text-gray-700">
                          <FiBarChart2 size={11} />
                        </span>
                        <span className="text-[9px] font-medium text-gray-800">
                          {product.name}
                        </span>
                      </div>

                      <span className="text-[8px] text-gray-500">
                        {product.units} units
                      </span>
                    </div>

                    <div className="h-[3px] w-full rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-[#0f7a52]"
                        style={{
                          width: `${product.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance by Category */}
            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">
                  Performance by Category
                </h2>

                <button className="text-[9px] text-gray-500 hover:text-gray-900">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px]">
                  <thead>
                    <tr className="border-b border-gray-100 text-left">
                      <th className="pb-2 text-[8px] font-medium uppercase tracking-wide text-gray-400">
                        Category
                      </th>

                      <th className="pb-2 text-right text-[8px] font-medium uppercase tracking-wide text-gray-400">
                        Revenue
                      </th>

                      <th className="pb-2 text-right text-[8px] font-medium uppercase tracking-wide text-gray-400">
                        Growth
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {categories.map((item) => (
                      <tr
                        key={item.category}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-3 text-[9px] text-gray-700">
                          {item.category}
                        </td>

                        <td className="py-3 text-right text-[9px] font-medium text-gray-700">
                          {item.revenue}
                        </td>

                        <td
                          className={`py-3 text-right text-[9px] font-medium ${
                            item.positive ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {item.growth}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="min-w-0 overflow-hidden mt-5 rounded-xl bg-white p-4 md:p-6 lg:p-7">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>

          <Link
            to="/admin/order"
            className="group flex items-center gap-2 text-xs font-medium text-gray-600 transition hover:text-gray-900"
          >
            View All
            <span className="text-base transition-transform duration-200 group-hover:translate-x-1">
              <IoMdArrowForward />
            </span>
          </Link>
        </div>

        <div className="min-w-0 overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase text-gray-500">
                  Order ID
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase text-gray-500">
                  Customer
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase text-gray-500">
                  Date & Time
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase text-gray-500">
                  Payment
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase text-gray-500">
                  Status
                </th>

                <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase text-gray-500">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {orderData.slice(0, 4).map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-4 text-xs font-medium text-gray-800">
                    {order.id}
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-xs font-medium text-gray-800">
                      {order.customer}
                    </p>
                    <p className="text-[10px] text-gray-400">{order.email}</p>
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-xs text-gray-600">
                      {formatOrderDate(order.date, order.time)}
                    </p>
                    <p className="text-[10px] text-gray-400">{order.time}</p>
                  </td>

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

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                        statusStyles[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-right text-xs font-medium text-gray-800">
                    {formatCurrency(order.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Overview;
