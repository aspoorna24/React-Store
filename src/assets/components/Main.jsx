import { useEffect, useState } from "react";
import Filters from "./Filters";
import ProductGrid from "./ProductGrid";
export default function Main() {
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredproduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const showFliteredProducts = () => {
    const filtered = products.filter((product) => product.price < 100);

    setFilteredproduct(filtered);
  };

  const showAllProducts = () => {
    setFilteredproduct(products);
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setFilteredproduct(json);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Filters
        showAllProducts={showAllProducts}
        showFliteredProducts={showFliteredProducts}
        setFilteredproduct={setFilteredproduct}
        filteredProduct={filteredProduct}
      />

      <section className="flex-grow p-4">
        {loading && (
          <h1 className="text-3xl font-bold text-gray items-center justify-center">
            Loading...
          </h1>
        )}
        <ProductGrid products={filteredProduct} />
      </section>
    </>
  );
}
