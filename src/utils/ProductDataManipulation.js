import { usdToPLN } from "./MathUtils";

export function changeProductData(product, productSizes) {
  const conditionalProperty = productSizes
    ? { sizes: productSizes }
    : { available: Math.floor(Math.random() * 20) };

  return {
    ...product,
    price: usdToPLN(product.price),
    ...conditionalProperty,
  };
}

export function changeProductsData(products, sizes) {
  return products.map((product) => changeProductData(product, sizes));
}
