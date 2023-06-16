import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import NavbarComp from "./components/Navbar/NavbarComp";
import Footer from "./components/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import { Suspense, lazy } from "react";
import TimeoutFallback from "./components/common/TimeoutFallback";

const Home = lazy(() => import("./components/pages/Home"));
const Product = lazy(() => import("./components/pages/Product"));
const Favorites = lazy(() => import("./components/pages/Favorites"));
const Cart = lazy(() => import("./components/pages/Cart"));
const ProductsInCategory = lazy(() =>
  import("./components/pages/ProductsInCategory")
);

function App() {
  return (
    <Suspense fallback={<TimeoutFallback />}>
      <BrowserRouter>
        <ScrollToTop />
        <NavbarComp />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products/category/:id"
            element={<ProductsInCategory />}
          />
          <Route path={`/products/:id`} element={<Product />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
