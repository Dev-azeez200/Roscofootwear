import { useCart } from "../context/CartContext";
import { FiTrash2,  } from "react-icons/fi";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <section className=" mx-auto px-6 lg:px-10 py-14 md:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-semibold text-rosco">Shopping Bag</h1>

        <p className="mt-2 text-black">
          {cart.length} {cart.length === 1 ? "item" : "items"} in your selection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-medium">Your cart is empty</h2>

              <p className="text-gray-500 mt-3">
                Add some products to start shopping.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex md:flex-row gap-6 border-b border-gray-200 py-8"
              >
                <div className="lg:w-50 lg:h-50 md:w-70 md:h-70 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-8">
                    <div>
                      <h3 className="text-lg font-medium text-black">
                        {item.name}
                      </h3>

                      {item.color && (
                        <p className="mt-1 text-sm text-gray-500">
                          Color: {item.color}
                        </p>
                      )}

                      {item.size && (
                        <p className="text-sm text-gray-500">
                          Size: {item.size}
                        </p>
                      )}
                    </div>

                    <p className="text-lg font-medium whitespace-nowrap">
                      ₦{item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-gray-300 overflow-hidden">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-10 h-9 text-lg hover:bg-gray-100 transition"
                      >
                        −
                      </button>

                      <span className="w-10 text-center text-sm">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-10 h-9 text-lg hover:bg-gray-100 transition"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gray-500 hover:text-red-500"
                    >
                      <FiTrash2 size={13} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <div className="sticky top-28 rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
            <h2 className="text-xl font-medium mb-10">Order Summary</h2>

            <div className="space-y-5 text-[15px]">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>₦{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Tax</span>
                <span>₦{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="my-8 border-t" />

            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>₦{total.toFixed(2)}</span>
            </div>

            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-white transition hover:bg-rosco">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
