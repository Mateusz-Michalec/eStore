import { Routes, Route } from "react-router-dom";
import "./App.scss";
import ScrollToTop from "./components/common/ScrollToTop";
import { Suspense, lazy } from "react";
import TimeoutFallback from "./components/common/TimeoutFallback";
import Navbar from "./components/Navbar/NavbarComp";
import Footer from "./components/Footer";

const Home = lazy(() => import("./components/pages/Home/Home"));
const Product = lazy(() => import("./features/product/Product"));
const Favorites = lazy(() => import("./features/favorites/Favorites"));
const Cart = lazy(() => import("./features/cart/Cart"));
const ProductsInCategory = lazy(() =>
  import("./features/product/ProductsInCategory/ProductsInCategory")
);

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <main className="py-5 mb-5 px-3 px-lg-5">
        <Suspense fallback={<TimeoutFallback />}>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route
                path="products/category/:id"
                element={<ProductsInCategory />}
              />
              <Route path={`products/:id`} element={<Product />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="cart" element={<Cart />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
