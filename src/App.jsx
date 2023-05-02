import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import NavbarCat from "./components/NavbarCat";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<NavbarCat />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
