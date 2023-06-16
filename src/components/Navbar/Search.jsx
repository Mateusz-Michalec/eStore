import React, {
  forwardRef,
  useContext,
  useDeferredValue,
  useMemo,
} from "react";
import { useState } from "react";
import { Container, Form, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataContext from "../../context/dataContext";

const Search = forwardRef(({ setIsSearch }, ref) => {
  const { allProducts } = useContext(DataContext);
  const [searchValue, setSearchValue] = useState("");

  const deferedSearchValue = useDeferredValue(searchValue);

  // Simulate receiving data from API
  const searchResults = useMemo(() => {
    if (searchValue)
      return allProducts.filter((product) =>
        product.title.toLowerCase().includes(deferedSearchValue)
      );
  }, [deferedSearchValue]);

  return (
    <Navbar.Text className="w-100 mt-2 mb-3 p-0 order-lg-2">
      <Container className="p-0 position-relative">
        <Form className="d-flex border rounded align-items-center px-3">
          <i className="bi bi-search fs-6"></i>
          <Form.Control
            ref={ref}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            className="flex-grow-1 py-2"
            placeholder="Szukaj produktów"
            aria-label="Szukaj produktów"
          />
          <div className="vr me-3 ms-1" />
          <button type="button" onClick={() => setIsSearch(false)}>
            <i className="bi bi-x-lg fs-6"></i>
          </button>
        </Form>
        {searchResults ? (
          <div className="position-absolute bg-white border border-dark overflow-auto w-100 mt-2 p-3 search-results">
            <Stack gap={3}>
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <Link
                    key={product.id}
                    onClick={() => setIsSearch(false)}
                    to={`/products/${product.id}`}
                  >
                    {product.title}
                  </Link>
                ))
              ) : (
                <span>Brak wyników.</span>
              )}
            </Stack>
          </div>
        ) : null}
      </Container>
    </Navbar.Text>
  );
});

export default Search;
