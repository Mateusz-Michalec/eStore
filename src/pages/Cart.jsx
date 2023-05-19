import React, { useContext } from "react";
import DataContext from "../context/dataContext";
import CartProduct from "../components/CartProduct";
import { Container, Row, Col } from "react-bootstrap";

export default function Cart() {
  const { cart } = useContext(DataContext);

  return (
    <main className="px-4 px-lg-5 py-5">
      <h1 className="h2">Koszyk</h1>
      <p className="fs-7">
        {cart.length} Produkt{cart.length > 1 ? "y" : ""}
      </p>
      <Row className="g-5">
        {cart.map((item) => (
          <CartProduct key={`${item.id}_${item.size}`} product={item} />
        ))}
      </Row>
    </main>
  );
}
