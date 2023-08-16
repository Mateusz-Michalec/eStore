import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Stack, Dropdown } from "react-bootstrap";
import ProductPreviewPlaceholder from "./ProductInCategoryPlaceholder";
import ProductPreview from "../ProductPreview/ProductPreview";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useGetProductsByCategoryQuery } from "../../../features/api/fakeStoreApi";
import { sortByPriceAsc, sortByPriceDesc } from "../../../utils/ProductSort";

export default function ProductsInCategory() {
  const { id } = useParams();
  const [sortValue, setSortValue] = useState("asc");
  const [sortBtnText, setSortBtnText] = useState("rosnąco");
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    refetch,
  } = useGetProductsByCategoryQuery({ categoryId: id, sortValue });

  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    if (isError) navigate("/");
    if (isSuccess) setDisplayedProducts(products);
  }, [isLoading, products]);

  // Sorting
  function handleSort(sortType, value) {
    if (value === "name") {
      setSortValue(sortType);
      setSortBtnText(sortType === "asc" ? "rosnąco" : "malejąco");
    } else if (value === "price") {
      setDisplayedProducts(
        sortType === "asc"
          ? sortByPriceAsc(products)
          : sortByPriceDesc(products)
      );
      setSortBtnText(sortType === "asc" ? "najniższa cena" : "najwyższa cena");
    }
  }

  useEffect(() => {
    if (sortBtnText === "rosnąco" || sortBtnText === "malejąco") refetch();
  }, [sortValue]);

  useEffect(() => {
    setSortBtnText("rosnąco");
  }, [id]);

  // End sorting

  return (
    <>
      {isLoading ? null : (
        <Stack direction="horizontal" className="justify-content-between ">
          <PageHeader title={id} arrayLength={products?.length} />
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
      )}
      <section>
        <Row className="g-5">
          {isLoading || isFetching
            ? [...Array(6)].map((x, i) => (
                <Col xs={12} md={6} xl={4} xxl={3} key={i}>
                  <ProductPreviewPlaceholder />
                </Col>
              ))
            : displayedProducts.map((product) => (
                <Col xs={12} md={6} xl={4} xxl={3} key={product.id}>
                  <ProductPreview
                    product={product}
                    component={"ProductsInCategory"}
                  />
                </Col>
              ))}
        </Row>
      </section>
    </>
  );
}
