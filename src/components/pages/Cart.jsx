import React, { useContext } from "react";
import PageHeader from "../common/PageHeader";
import CartProduct from "../Product/CartProduct";
import Empty from "../common/Empty";
import { Button, Container, Row } from "react-bootstrap";
import CartContext from "../../context/CartContext";

export default function Cart() {
  const { cart, updateCart, deleteFromCart } = useContext(CartContext);

  function getTotalValue() {
    return cart.reduce(
      (acc, current) => acc + current.price * current.quantity,
      0
    );
  }

  return (
    <main className="px-4 px-lg-5 py-5">
      <Empty array={cart} title="Koszyk jest pusty" />
      <Container>
        <PageHeader array={cart} title="Koszyk" />
        <section>
          <Row className="g-4">
            {cart.map((product) => (
              <CartProduct
                key={`${product.id}_${product.size}`}
                product={product}
                updateCart={updateCart}
                deleteFromCart={deleteFromCart}
              />
            ))}
          </Row>
        </section>
        <section className="mt-4 text-main pb-5">
          <h5>Razem: {getTotalValue()} PLN</h5>
          <Button variant="dark" className="mt-2 text-uppercase py-2 px-4 ls-1">
            Przejdź do kasy
          </Button>
        </section>
      </Container>
    </main>
  );
}
