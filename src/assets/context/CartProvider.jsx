import { useState } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (product, quat) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        // Update quantity if product exists
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quat }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  return (
    <CartContext.Provider value={{ cart, setCart, removeFromCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
