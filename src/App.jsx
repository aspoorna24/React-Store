import "./App.css";
import Footer from "./assets/components/Footer.jsx";
import Headers from "./assets/components/Header.jsx";
import Main from "./assets/components/Main.jsx";
import { Route, Routes } from "react-router";
import Checkoutpage from "./assets/pages/Checkoutpage.jsx";
import NotFound from "./assets/pages/NotFound.jsx";
import Product from "./assets/pages/Product.jsx";
import { ProductProvider } from "./assets/context/ProductProvider.jsx";
import { CartProvider } from "./assets/context/CartProvider.jsx";
function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Headers />
          <main className="flex-grow flex  bg-gray-100">
            {/* <h1 className="text-3xl font-bold text-blue">
            Welcome to TrendyMart!
          </h1> */}
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/checkout" element={<Checkoutpage />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/product/:id" element={<Product />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
