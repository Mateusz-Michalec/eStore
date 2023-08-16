import { usdToPLN } from "./MathUtils";

export function changeProductData(product, productSizes) {
  const conditionalProperty =
    product.category === "men's clothing" ||
    product.category === "women's clothing"
      ? { sizes: productSizes }
      : { available: Number(product.id) + 3 };

  return {
    ...product,
    price: usdToPLN(product.price),
    ...conditionalProperty,
  };
}
