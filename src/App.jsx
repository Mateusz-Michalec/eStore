import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/NavbarComp";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const CategoryProducts = lazy(() => import("./pages/Product"));
const Favorites = lazy(() => import("./pages/Favorites"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Navbar />}>
          <Route
            path="/"
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          />
          <Route
            path={`/produkty/:id`}
            element={
              <Suspense>
                <CategoryProducts />
              </Suspense>
            }
          />
          <Route
            path="/ulubione"
            element={
              <Suspense>
                <Favorites />
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
