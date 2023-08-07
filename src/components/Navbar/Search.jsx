import React, {
  forwardRef,
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
} from "react";
import { useState } from "react";
import { Container, Form, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../features/api/fakeStoreApi";

const Search = forwardRef(({ setIsSearch }, ref) => {
  const { data: allProducts } = useGetAllProductsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const deferedSearchTerm = useDeferredValue(searchTerm);

  useEffect(() => {
    setResults(
      allProducts?.filter((product) =>
        product.title.toLowerCase().includes(deferedSearchTerm)
      )
    );
  }, [deferedSearchTerm]);

  return (
    <Navbar.Text className="w-100 mt-2 mb-3 p-0 order-lg-2">
      <Container className="p-0 position-relative">
        <Form className="d-flex border rounded align-items-center px-3">
          <i className="bi bi-search fs-6"></i>
          <Form.Control
            ref={ref}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        {searchTerm.length > 0 ? (
          <div className="position-absolute bg-white border border-dark overflow-auto w-100 mt-2 p-3 search-results">
            <Stack gap={3}>
              {results.length > 0 ? (
                results.map((product) => (
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
