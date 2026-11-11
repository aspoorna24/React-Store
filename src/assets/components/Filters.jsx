import { useState, useEffect } from "react";
export default function Filters({
  showAllProducts,
  showFliteredProducts,
  setFilteredproduct,
  filteredProduct,
}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [catogery, setCatogery] = useState([]);

  useEffect(() => {
    function getCatogery() {
      fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((json) => {
          setCatogery(json);
        });
    }
    getCatogery();
  }, []);

  function handleCatogeryChange(event) {
    const selectedCategory = event.target.value;

    fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
      .then((res) => res.json())
      .then((json) => {
        setFilteredproduct(json);
      });
  }

  function sortBy(event) {
    const selectedOrder = event.target.value;

    const sorted = [...filteredProduct].sort((a, b) => {
      return selectedOrder === "desc" ? b.price - a.price : a.price - b.price;
    });

    setFilteredproduct(sorted);
  }

  return (
    <>
      <aside className="sticky top-4 w-64 min-w-64 shrink-0 h-screen bg-white p-4 mb-4  ">
        <h2 className="text-lg font-semibold pb-4">Filters</h2>
        <button
          className={`block w-full px-4 py-2 text-white rounded my-2 ${
            activeFilter === "under100" ? "bg-blue-700" : "bg-gray-400"
          }`}
          onClick={() => {
            showFliteredProducts();
            setActiveFilter("under100");
          }}
        >
          Under $1000
        </button>
        <button
          className={`block w-full px-4 py-2 text-white rounded my-2 ${
            activeFilter === "all" ? "bg-blue-700" : "bg-gray-400"
          }`}
          onClick={() => {
            showAllProducts();
            setActiveFilter("all");
          }}
        >
          Show All
        </button>

        <h3 className="text-lg font-semibold pt-4 mt-6">Category</h3>
        <ul>
          {catogery.map((catogery) => (
            <li key={catogery} className="m-2 text-gray-500 capitalize">
              <input
                type="radio"
                value={catogery}
                className="mr-2 "
                name="catogery"
                onChange={handleCatogeryChange}
              />
              {catogery}
            </li>
          ))}
        </ul>

        <h4 className="text-lg font-semibold pt-4 mt-6"> Sort by </h4>
        <select
          className="block w-full px-4 py-2  rounded my-2 border border-gray-300 "
          onChange={sortBy}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </aside>
    </>
  );
}
