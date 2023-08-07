import { store } from "../app/store";
import { selectSizesByProductId } from "../features/sizesSlice";
import MathUtils from "./MathUtils";

function changeProductData(product) {
  if (
    product.category === "men's clothing" ||
    product.category === "women's clothing"
  ) {
    const sizes = store.getState().sizes;
    product.sizes = selectSizesByProductId(sizes, product.id);
  } else product.available = Math.floor(Math.random() * 20);
  product.price = MathUtils.usdToPLN(product.price);

  return product;
}

function changeProductsData(products) {
  return products.map((product) => changeProductData(product));
}

export default { changeProductData, changeProductsData };
