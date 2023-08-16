import { memo } from "react";
import { Row, Col } from "react-bootstrap";
import ProductPreview from "../product/ProductPreview/ProductPreview";
import LastViewedPlaceholder from "./LastViewedPlaceholder/LastViewedPlaceholder";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLastViewed, selectLastViewed } from "./lastViewedSlice";
import { useGetAllProductsQuery } from "../api/fakeStoreApi";

export const LastViewed = ({ productId }) => {
  const dispatch = useDispatch();
  const lastViewed = useSelector(selectLastViewed);

  const { data: allProducts, isLoading, isSuccess } = useGetAllProductsQuery();

  const [lastViewedItems, setLastViewedItems] = useState([]);

  useEffect(() => {
    dispatch(addLastViewed({ id: productId }));
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setLastViewedItems(
        lastViewed
          .filter((lastViewedId) => lastViewedId !== productId)
          .map((lastViewedId) =>
            allProducts.find((product) => {
              if (product.id === lastViewedId)
                return {
                  id: product.id,
                  image: product.image,
                  title: product.title,
                };
            })
          )
          .filter(Boolean)
      );
    }
  }, [isSuccess]);

  if (lastViewed.length > 0)
    if (isLoading)
      return (
        <>
          <h5 className="mb-3">Ostatnio oglądane</h5>
          <Row className="flex-nowrap my-5 py-5" style={{ overflowX: "auto" }}>
            {lastViewed.map((lastViewedId) => (
              <LastViewedPlaceholder key={lastViewedId} />
            ))}
          </Row>
        </>
      );
    else if (isSuccess && lastViewedItems.length > 0)
      return (
        <section className="my-5 py-5">
          <h5 className="mb-3">Ostatnio oglądane</h5>
          <Row className="flex-nowrap">
            {lastViewedItems.map((product) => (
              <Col xs={8} sm={6} md={5} lg={3} xl={2} key={product.id}>
                <ProductPreview product={product} component={"LastVieved"} />
              </Col>
            ))}
          </Row>
        </section>
      );
    else return null;
};

export default memo(LastViewed);
