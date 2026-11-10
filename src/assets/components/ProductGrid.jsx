import { useNavigate } from "react-router";
export default function ProductGrid(props) {
  const navigate = useNavigate();
  function moveTo(id) {
    navigate(`/product/${id}`);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {props.products.map((product) => (
        <div
          className=" p-4 bg-white rounded shadow hover:cursor-pointer hover:shadow-2xl transition duration-300 ease-in-out "
          key={product.id}
          onClick={() => moveTo(product.id)}
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-40 mx-auto mb-4 object-contain"
          />
          <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
          <p className="text-gray-600 mt-2">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
