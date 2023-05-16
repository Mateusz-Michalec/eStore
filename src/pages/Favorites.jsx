import React, { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import DataContext from "../context/dataContext";
import ProductPreview from "../components/ProductPreview";

export default function Favorites() {
  const { favorites } = useContext(DataContext);

  return (
    <main className="min-vh-100 p-4">
      <Container fluid>
        <h1 className="text-center h2">Ulubione</h1>
        <p className="text-end text-secondary fs-7">
          {favorites.length} Produkty
        </p>
        <section>
          <Row className="gy-5 gx-4">
            {favorites.map((favorite) => (
              <ProductPreview
                key={favorite.id}
                product={favorite}
                type="Favorites"
              />
            ))}
          </Row>
        </section>
      </Container>
    </main>
  );
}
