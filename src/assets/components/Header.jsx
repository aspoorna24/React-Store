import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShopify } from "@fortawesome/free-brands-svg-icons";

import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
export default function Header() {
  const { cart } = useContext(CartContext);
  return (
    <>
      <header className="flex items-center justify-between bg-blue-600 text-white p-6">
        <h1 className="text-lg font-bold">
          <NavLink to="/">
            <FontAwesomeIcon icon={faShopify} className="mr-2" />
            TrendyMart
          </NavLink>
        </h1>
        <div>
          <input
            className="mr-2 p-2 border-amber-50 rounded-3xl h-8 w-xl text-gray-500 text-center bg-amber-50"
            type="text"
            placeholder="Search..."
          />
        </div>
        <div className="relative">
          <NavLink to="/checkout">
            <FontAwesomeIcon icon={faCartShopping} className="text-2xl" />

            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          </NavLink>
        </div>
      </header>
    </>
  );
}
