import React, { useEffect, useState, useRef } from "react";
import { Link, Outlet } from "react-router-dom";

import { Stack, Nav, Navbar } from "react-bootstrap";
import Badge from "../common/Badge";
import TimeoutAlert from "../common/TimeoutAlert";
import { images } from "../../constants";
import Search from "./Search";
import { useGetCategoriesQuery } from "../../features/api/fakeStoreApi";
import { useSelector } from "react-redux";
import { getFavoritesCount } from "../../features/favorites/favoritesSlice";
import { getCartItemsCount } from "../../features/cart/cartSlice";

export default function NavbarComp() {
  const [isSearch, setIsSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categoriesImages] = useState(images.getCategoriesImages);

  const { data: categories, isLoading } = useGetCategoriesQuery();

  const favoritesCount = useSelector(getFavoritesCount);
  const cartCount = useSelector(getCartItemsCount);

  const hamburger = useRef();

  // Search
  const search = useRef();

  function toggleSearch() {
    if (isMenuOpen) hamburger.current.click();
    setIsSearch(!isSearch);
  }
  function toggleHamburger() {
    setIsSearch(false);
    setIsMenuOpen(!isMenuOpen);
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
          isLoading ? "glow" : ""
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

                  <Badge value={favoritesCount} />
                </button>
              </Link>
              <Link to="/cart">
                <button className="position-relative">
                  <i className="bi bi-bag fs-5 nav-icon"></i>
                  <Badge value={cartCount} />
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

        {isSearch ? <Search ref={search} setIsSearch={setIsSearch} /> : null}
      </Navbar>
      <Outlet />
    </>
  );
}
