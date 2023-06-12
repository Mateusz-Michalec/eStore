import { Row, Col } from "react-bootstrap";
import ProductPreview from "./ProductPreview";
import { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function ProductsHistory({ currentProduct }) {
  const [historyProducts, setHistoryProducts] = useLocalStorage(
    "historyProducts",
    []
  );

  function addProductToHistory(product) {
    if (!historyProducts.some((item) => item.id === product.id)) {
      if (historyProducts.length > 10) setHistoryProducts([product]);
      else setHistoryProducts((prev) => [product, ...prev]);
    }
  }

  useEffect(() => {
    if (currentProduct) addProductToHistory(currentProduct);
  }, [currentProduct]);

  if (historyProducts.length > 0)
    return (
      <section className="my-5 py-5">
        <h5 className="mb-3">Ostatnio oglądane</h5>
        <Row className="flex-nowrap" style={{ overflowX: "auto" }}>
          {historyProducts.map((product) => (
            <Col xs={8} sm={6} md={5} lg={3} xl={2} key={`h_${product.id}`}>
              <ProductPreview product={product} component={"ProductsHistory"} />
            </Col>
          ))}
        </Row>
      </section>
    );
  else return null;
}
