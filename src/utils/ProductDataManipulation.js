import { usdToPLN } from "./MathUtils";

export function changeProductData(product, sizes) {
  if (
    product.category === "men's clothing" ||
    product.category === "women's clothing"
  ) {
    product.sizes = sizes[product.id];
  } else product.available = Math.floor(Math.random() * 20);
  product.price = usdToPLN(product.price);
  return product;
}

export function changeProductsData(products) {
  return products.map((product) => changeProductData(product));
}
