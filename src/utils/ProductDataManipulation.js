import mathUtils from "./MathUtils";

function changeProductData(product, sizes) {
  return {
    ...product,
    price: mathUtils.usdToPLN(product.price),
    sizes:
      product.category === "men's clothing" ||
      product.category === "women's clothing"
        ? sizes[product.id]
        : null,
    available:
      product.category !== "men's clothing" &&
      product.category !== "women's clothing"
        ? Math.floor(Math.random() * 20)
        : null,
  };
}

function changeProductsData(products, sizes) {
  return products.map((product) => changeProductData(product, sizes));
}

export default { changeProductData, changeProductsData };
