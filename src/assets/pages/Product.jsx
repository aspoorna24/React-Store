import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCartShopping,
  faArrowLeft,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export default function Product() {
  const { addToCart } = useContext(CartContext);

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError("");
    setProduct(null);
    setQuantity(1);
    setAdded(false);

    fetch(`https://fakestoreapi.com/products/${id}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((json) => {
        setProduct(json);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-500">
          Loading product...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-red-500">Product Not Found</h1>
        <NavLink to="/" className="mt-4 text-blue-600 underline">
          Back to Products
        </NavLink>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10  ">
      {/* Back Button */}
      <NavLink
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Products
      </NavLink>

      {/* Product Details */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-50 rounded-xl p-8">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-sm h-96 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            <span className="text-sm uppercase tracking-widest text-blue-600 font-semibold">
              {product.category}
            </span>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-3 leading-relaxed">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1 text-yellow-500">
                <FontAwesomeIcon icon={faStar} />
                <span className="font-semibold">{product.rating?.rate}</span>
              </div>

              <span className="text-gray-400">
                ({product.rating?.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <span className="text-3xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                Product Description
              </h3>

              <p className="text-gray-500 leading-7">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Quantity</h3>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-9 h-9 border rounded-lg hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>

                <span className="font-semibold text-lg">{quantity}</span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-9 h-9 border rounded-lg hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => {
                (addToCart(product, quantity), setAdded(true));
              }}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition flex items-center justify-center gap-3"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              {added ? "Added!" : "Add to Cart"}
            </button>

            {added && (
              <p className="text-green-600 text-sm mt-3">
                {quantity} item(s) selected. Connect this button to your cart
                state to save the products.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
