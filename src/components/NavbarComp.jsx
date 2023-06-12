import React, { useEffect, useState, useRef, useContext } from "react";
import DataContext from "../context/dataContext";
import { Link, Outlet } from "react-router-dom";

import { Container, Stack, Form, Nav, Navbar } from "react-bootstrap";
import Badge from "./common/Badge";
import TimeoutAlert from "./common/TimeoutAlert";
import { images } from "../constants";
import CartContext from "../context/CartContext";
import FavoritesContext from "../context/FavoritesContext";

export default function NavbarComp() {
  const { categories } = useContext(DataContext);
  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const [isSearch, setIsSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categoriesImages] = useState(images.getCategoriesImages);

  const hamburger = useRef();

  // Search
  const search = useRef();
  const [searchValue, setSearchValue] = useState("");

  function toggleSearch() {
    if (isMenuOpen) hamburger.current.click();
    setIsSearch(!isSearch);
  }
  function toggleHamburger() {
    setIsSearch(false);
    setIsMenuOpen(!isMenuOpen);
  }
  function handleSearch(e) {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    if (isSearch) search.current.focus();
  }, [isSearch]);
  // Search end

  return (
    <>
      <Navbar
        expand="lg"
        bg="white"
        sticky="top"
        className={`${
          !categories ? "glow" : ""
        } shadow-sm border-bottom px-4 px-lg-5 py-2 flex-wrap`}
      >
        <TimeoutAlert />
        {categories ? (
          <Navbar.Toggle
            ref={hamburger}
            aira-controls="navbarNav"
            className="p-0"
            onClick={() => toggleHamburger()}
          >
            <i className={`bi ${isMenuOpen ? "bi-x-lg" : "bi-list"} fs-2`}></i>
          </Navbar.Toggle>
        ) : null}
        <Navbar.Brand className="me-auto ms-3 ms-lg-0">
          <Link to="/">
            <i className="bi bi-shop-window fs-2 text-main"></i>
          </Link>
        </Navbar.Brand>
        {categories ? (
          <Navbar.Text className="order-lg-1">
            <Stack direction="horizontal" className="gap-4 gap-lg-5 ">
              <button>
                <i className="bi bi-person fs-4 nav-icon"></i>
              </button>
              <button onClick={() => toggleSearch()}>
                <i className="bi bi-search fs-5 nav-icon"></i>
              </button>
              <Link to="/favorites">
                <button className="position-relative">
                  <i className="bi bi-heart fs-5 nav-icon"></i>

                  <Badge value={favorites.length} />
                </button>
              </Link>
              <Link to="/cart">
                <button className="position-relative">
                  <i className="bi bi-bag fs-5 nav-icon"></i>
                  <Badge value={cart.length} />
                </button>
              </Link>
            </Stack>
          </Navbar.Text>
        ) : null}
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto ms-lg-3">
            {categories?.map((category, i) => (
              <Nav.Link
                key={category}
                as={Link}
                to={`products/category/${category}`}
                className="me-lg-3"
              >
                <Stack direction="horizontal" className="mb-2 mt-1 d-lg-none">
                  <div>
                    <img
                      className="me-3 ms-3 rounded-circle nav-link-icon"
                      src={categoriesImages[i].img}
                      alt={categoriesImages[i].alt}
                    />
                    {category}
                  </div>
                </Stack>
                <span className="d-none d-lg-block">{category}</span>
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>

        {isSearch ? (
          <Navbar.Text className="w-100 mt-2 mb-3 p-0 order-lg-2">
            <Container>
              <Form className="d-flex border rounded align-items-center px-3">
                <i className="bi bi-search fs-6"></i>
                <Form.Control
                  ref={search}
                  value={searchValue}
                  onChange={handleSearch}
                  type="search"
                  className="flex-grow-1 py-2"
                  placeholder="Szukaj produktów"
                  aria-label="Szukaj produktów"
                />
                <div className="vr me-3 ms-1" />
                <button type="button" onClick={() => toggleSearch()}>
                  <i className="bi bi-x-lg fs-6"></i>
                </button>
              </Form>
            </Container>
          </Navbar.Text>
        ) : null}
      </Navbar>
      <Outlet />
    </>
  );
}
