export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export type PaymentStatus = "Paid" | "Pending" | "Failed";

export interface OrderType {
  id: string;
  date: string;
  time: string;
  customer: string;
  email: string;
  amount: number;
  payment: PaymentStatus;
  status: OrderStatus;
}

const formatOrderDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const createOrder = (
  daysAgo: number,
  order: Omit<OrderType, "date">,
): OrderType => ({ ...order, date: formatOrderDate(daysAgo) });

export const orderData: OrderType[] = [
  createOrder(0, { id: "#ORD-9012", time: "14:32", customer: "Eleanor Vance", email: "e.vance@example.com", amount: 450, payment: "Paid", status: "Shipped" }),
  createOrder(0, { id: "#ORD-9011", time: "11:15", customer: "Marcus Thorne", email: "m.thorne@example.com", amount: 890, payment: "Pending", status: "Processing" }),
  createOrder(1, { id: "#ORD-9010", time: "16:45", customer: "Sophia Rossi", email: "s.rossi@example.com", amount: 320, payment: "Paid", status: "Delivered" }),
  createOrder(1, { id: "#ORD-9009", time: "13:20", customer: "Daniel Carter", email: "d.carter@example.com", amount: 720, payment: "Paid", status: "Shipped" }),
  createOrder(2, { id: "#ORD-9008", time: "10:12", customer: "Amelia Stone", email: "a.stone@example.com", amount: 560, payment: "Paid", status: "Processing" }),
  createOrder(3, { id: "#ORD-9007", time: "18:30", customer: "James Wilson", email: "j.wilson@example.com", amount: 230, payment: "Pending", status: "Pending" }),
  createOrder(3, { id: "#ORD-9006", time: "15:10", customer: "Olivia Brown", email: "o.brown@example.com", amount: 1100, payment: "Paid", status: "Delivered" }),
  createOrder(4, { id: "#ORD-9005", time: "12:05", customer: "Noah Anderson", email: "n.anderson@example.com", amount: 680, payment: "Paid", status: "Cancelled" }),
  createOrder(4, { id: "#ORD-9004", time: "09:45", customer: "Grace Miller", email: "g.miller@example.com", amount: 430, payment: "Paid", status: "Shipped" }),
  createOrder(5, { id: "#ORD-9003", time: "17:22", customer: "Henry Davis", email: "h.davis@example.com", amount: 950, payment: "Paid", status: "Delivered" }),
  createOrder(5, { id: "#ORD-9002", time: "14:10", customer: "Emma Taylor", email: "e.taylor@example.com", amount: 390, payment: "Pending", status: "Pending" }),
  createOrder(6, { id: "#ORD-9001", time: "11:30", customer: "Liam Thomas", email: "l.thomas@example.com", amount: 610, payment: "Paid", status: "Processing" }),
];
