import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/NavbarComp";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Suspense, lazy } from "react";
import TimeoutFallback from "./components/TimeoutFallback";

const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Cart = lazy(() => import("./pages/Cart"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Navbar />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<TimeoutFallback />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path={`/produkty/:id`}
            element={
              <Suspense fallback={<TimeoutFallback />}>
                <Product />
              </Suspense>
            }
          />
          <Route
            path="/ulubione"
            element={
              <Suspense fallback={<TimeoutFallback />}>
                <Favorites />
              </Suspense>
            }
          />
          <Route
            path="/koszyk"
            element={
              <Suspense fallback={<TimeoutFallback />}>
                <Cart />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
