import { usdToPLN } from "./MathUtils";

export function changeProductData(product, sizes) {
  const conditionalProperty = sizes
    ? { sizes: sizes }
    : { available: Math.floor(Math.random() * 20) };

  return {
    ...product,
    price: usdToPLN(product.price),
    ...conditionalProperty,
  };
}

export function changeProductsData(products) {
  return products.map((product) => changeProductData(product));
}
