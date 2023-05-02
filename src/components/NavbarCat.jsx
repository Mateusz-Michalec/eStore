import React, { useEffect, useState, useRef } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet } from "react-router-dom";
import electronics from "../assets/img/electronics-min.jpg";
import jewelery from "../assets/img/jewelery-min.jpg";
import mensClothing from "../assets/img/men's clothing-min.jpg";
import womensClothing from "../assets/img/women's clothing-min.jpg";
import { Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function NavbarCat() {
  const [categories, setCategories] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Search
  const search = useRef();
  const [searchValue, setSearchValue] = useState("");

  const toggleSearch = () => setIsSearch((prev) => !prev);
  const handleSearch = (e) => setSearchValue(e.target.value);

  useEffect(() => {
    if (isSearch) search.current.focus();
  }, [isSearch]);
  // Search end

  useEffect(() => {
    (async function fetchCategories() {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategories(data);
    })();
  }, []);

  const categoriesImages = () => {
    return [
      {
        img: electronics,
        alt: "electronics",
      },
      {
        img: jewelery,
        alt: "jewelery",
      },
      {
        img: mensClothing,
        alt: "men's clothing",
      },
      {
        img: womensClothing,
        alt: "women's clothing",
      },
    ];
  };

  return (
    <>
      <Navbar expand="lg" bg="white" sticky="top" className="shadow px-3">
        {!isSearch ? (
          <>
            <Navbar.Toggle
              aira-controls="navbarNav"
              className="ps-0"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <i
                className={`bi ${isMenuOpen ? "bi-x-lg" : "bi-list"} fs-3`}
              ></i>
            </Navbar.Toggle>
            <Navbar.Brand className="me-auto ms-2" href="#">
              4Store
            </Navbar.Brand>
            <Navbar.Text className="order-lg-1">
              <Stack direction="horizontal" gap={4}>
                <button>
                  <i className="bi bi-person fs-5"></i>
                </button>
                <button onClick={() => toggleSearch()}>
                  <i className="bi bi-search fs-6"></i>
                </button>
                <button>
                  <i className="bi bi-heart fs-6"></i>
                </button>
                <button>
                  <i className="bi bi-bag fs-6"></i>
                </button>
              </Stack>
            </Navbar.Text>
            <Navbar.Collapse
              className="px-2 
            "
              id="navbarNav"
            >
              <Nav className="me-auto ms-lg-3">
                {categories
                  ? categories.map((category, i) => (
                      <Nav.Link
                        key={category}
                        as={Link}
                        to={`/${category}`}
                        className="me-lg-3"
                      >
                        <Stack
                          direction="horizontal"
                          className="mb-2 mt-1 d-lg-none"
                        >
                          <img
                            className="me-3 rounded-circle nav-link-icon"
                            src={categoriesImages()[i].img}
                            alt={categoriesImages()[i].alt}
                          />
                          {category}
                        </Stack>
                        <span className="d-none d-lg-block">{category}</span>
                      </Nav.Link>
                    ))
                  : null}
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <Navbar.Text className="w-100">
            <Form className="d-flex align-items-center">
              <i className="bi bi-search fs-6"></i>
              <Form.Control
                ref={search}
                value={searchValue}
                onChange={handleSearch}
                type="search"
                className="nav-search"
                placeholder="Szukaj produktów"
                aria-label="Szukaj produktów"
              />
              <button type="button" onClick={() => toggleSearch()}>
                <i className="bi bi-x-lg fs-6"></i>
              </button>
            </Form>
          </Navbar.Text>
        )}
      </Navbar>

      <Outlet />
    </>
  );
}
