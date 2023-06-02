import React, { useContext } from "react";
import DataContext from "../context/dataContext";
import CartProduct from "../components/CartProduct";
import { Container, Row, Button } from "react-bootstrap";
import CartProductPlaceholder from "../components/CartProductPlaceholder";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, getMultipleProducts } = useContext(DataContext);
  const [cartProducts, setCartProducts] = getMultipleProducts(cart);
  const navigate = useNavigate();

  function getProductById(id) {
    return cartProducts.find((product) => product.id === id);
  }

  return (
    <main className="px-4 px-lg-5 py-5">
      <Container>
        <header className="mb-4">
          {cart.length > 0 ? (
            <>
              <h1 className="h2">Koszyk</h1>
              <p className="fs-7 text-secondary">
                {cart.length} Produkt{cart.length > 1 ? "y" : ""}
              </p>
            </>
          ) : (
            <>
              <h1 className="h2 text-secondary">Koszyk jest pusty</h1>
              <Button
                variant="outline-secondary"
                onClick={() => navigate(-1)}
                className="mt-2 px-3 py-2"
              >
                <i className="bi bi-arrow-left me-1 back-icon"></i> Powrót do
                poprzedniej strony
              </Button>
            </>
          )}
        </header>
        <section>
          <Row className="g-4">
            {cartProducts
              ? cart.map((cartData) => {
                  const cartProduct = getProductById(cartData.id);
                  return (
                    <CartProduct
                      key={`${cartData.id}_${cartData.size}`}
                      product={{
                        ...cartData,
                        title: cartProduct.title,
                        image: cartProduct.image,
                        price: cartProduct.price,
                        sizes: cartProduct.sizes,
                        available: cartProduct.available,
                      }}
                    />
                  );
                })
              : cart.map((item) => (
                  <CartProductPlaceholder key={`${item.id}_${item.size}`} />
                ))}
          </Row>
        </section>
      </Container>
    </main>
  );
}
