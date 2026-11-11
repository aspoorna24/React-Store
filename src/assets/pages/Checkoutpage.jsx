import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-500 mt-2">
            Review your items before placing your order.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Order Items ({cart.length})
            </h2>

            {cart.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                <p className="text-gray-500 text-lg">Your cart is empty!</p>
              </div>
            ) : (
              cart.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-5"
                >
                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-24 h-24 object-contain rounded-lg bg-gray-50 p-2"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {product.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Quantity: {product.quantity}
                    </p>

                    <p className="text-indigo-600 font-bold mt-2">
                      ${(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-500 hover:bg-red-50 p-3 rounded-lg transition"
                    title="Remove item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-9 0h14"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between text-gray-600 mb-4">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600 mb-4">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-indigo-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Proceed to Payment
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                Secure checkout • Easy returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
