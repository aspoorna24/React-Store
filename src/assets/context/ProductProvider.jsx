import { useState, useEffect } from "react";
import { ProductsContext } from "./ProductsContext";

export function ProductProvider({ children }) {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      });
  }, []);

  return (
    <ProductsContext.Provider value={{ product, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}
