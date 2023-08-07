import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Row, Col, Stack, Dropdown } from "react-bootstrap";
import ProductPreviewPlaceholder from "../Placeholders/ProductPreviewPlaceholder";
import ProductPreview from "../Product/ProductPreview";
import ProductsHistory from "../Product/ProductsHistory";
import PageHeader from "../common/PageHeader";
import DataContext from "../../context/dataContext";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { ProductDataManipulation, ProductSort } from "../../utils";
import { useGetProductsByCategoryQuery } from "../../features/api/fakeStoreApi";

export default function ProductsInCategory() {
  const { sizes } = useContext(DataContext);
  const { id } = useParams();
  const [sortValue, setSortValue] = useState("asc");
  const [sortBtnText, setSortBtnText] = useState("rosnąco");
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsByCategoryQuery(id, sortValue);

  useEffect(() => {
    if (isError) navigate("/");
  }, [isLoading]);

  function handleSort(sortType, value) {
    if (value === "name") {
      setSortValue(sortType);
      setSortBtnText(sortType === "asc" ? "Rosnąco" : "Malejąco");
    } else if (value === "price") {
      sortData(
        sortType === "asc"
          ? ProductSort.sortByPriceAsc(products)
          : ProductSort.sortByPriceDesc(products)
      );
      setSortBtnText(sortType === "asc" ? "Najniższa cena" : "Najwyższa cena");
    }
  }

  return (
    <main className="py-5 px-4 px-lg-5">
      {products ? (
        <Stack direction="horizontal" className="justify-content-between ">
          <PageHeader title={id} array={products} />
          <Dropdown>
            <Dropdown.Toggle
              className="text-uppercase"
              variant="outline-dark"
              id="dropdown-sort"
            >
              {sortBtnText}
            </Dropdown.Toggle>

            <DropdownMenu>
              <DropdownItem onClick={() => handleSort("asc", "name")}>
                Rosnąco
              </DropdownItem>
              <DropdownItem onClick={() => handleSort("desc", "name")}>
                Malejąco
              </DropdownItem>
              <DropdownItem onClick={() => handleSort("asc", "price")}>
                Najniższa cena
              </DropdownItem>
              <DropdownItem onClick={() => handleSort("desc", "price")}>
                Najwyższa cena
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Stack>
      ) : null}
      <section>
        <Row className="g-5">
          {!isLoading
            ? products?.map((product) => (
                <Col xs={12} md={6} xl={4} xxl={3} key={product.id}>
                  <ProductPreview
                    product={product}
                    component={"ProductsInCategory"}
                  />
                </Col>
              ))
            : [...Array(4)].map((x, i) => (
                <Col xs={12} md={6} xl={4} xxl={3} key={i}>
                  <ProductPreviewPlaceholder />
                </Col>
              ))}
        </Row>
      </section>
      {products ? <ProductsHistory /> : null}
    </main>
  );
}
