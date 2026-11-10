import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShopify } from "@fortawesome/free-brands-svg-icons";

import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router";
export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between bg-blue-600 text-white p-6">
        <h1 className="text-lg font-bold">
          <NavLink to="/">
            <FontAwesomeIcon icon={faShopify} className="mr-2" />
            TrendyMart
          </NavLink>
        </h1>

        <div className="relative">
          <NavLink to="/checkout">
            <FontAwesomeIcon icon={faCartShopping} className="text-2xl" />

            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </NavLink>
        </div>
      </header>
    </>
  );
}
