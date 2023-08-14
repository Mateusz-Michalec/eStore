import React, { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import CartProduct from "./CartProduct";
import Empty from "../../components/common/Empty";
import { Button, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getCartItemsCount, selectCartItems } from "./cartSlice";
import { useGetAllProductsQuery } from "../api/fakeStoreApi";
import CartProductPlaceholder from "./CartProductPlaceholder/CartProductPlaceholder";

export default function Cart() {
  const cart = useSelector(selectCartItems);
  const cartLength = useSelector(getCartItemsCount);
  const { data: allProducts, isLoading } = useGetAllProductsQuery();

  const filterAllProducts = () =>
    cart.map((item) => {
      const product = allProducts?.find((product) => product.id === item.id);
      return {
        image: product?.image,
        price: product?.price,
        title: product?.title,
        ...item,
      };
    });

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(filterAllProducts);
  }, [isLoading, cart]);

  const getTotalValue = () =>
    cartItems?.reduce(
      (acc, current) => acc + current.price * current.quantity,
      0
    );

  return (
    <>
      {cartLength === 0 ? (
        <Empty arrayLength={cartLength} title="Koszyk jest pusty" />
      ) : (
        <Container>
          <PageHeader arrayLength={cartLength} title="Koszyk" />
          <section>
            <Row className="g-4">
              {isLoading
                ? cart.map((item, i) => (
                    <CartProductPlaceholder key={`${item.id}_${i}`} />
                  ))
                : cartItems?.map((product) => (
                    <CartProduct
                      key={`${product.id}_${product.size}`}
                      product={product}
                    />
                  ))}
            </Row>
          </section>
          <section className="mt-4 text-main">
            <h5>Razem: {getTotalValue()} PLN</h5>
            <Button
              variant="dark"
              className="mt-2 text-uppercase py-2 px-4 ls-1"
            >
              Przejdź do kasy
            </Button>
          </section>
        </Container>
      )}
    </>
  );
}
