function checkIsAlreadyAdded(id, array) {
  return array.find((product) => product.id === id);
}

function getAvailableSizesQuantity(product) {
  const sizeObj = product.sizes.find((item) => item[product.size]);
  return Object.values(sizeObj)[0];
}

function getMostPopularProduct(products) {
  return products?.reduce((prev, current) =>
    prev.rating.count > current.rating.count ? prev : current
  );
}

export default {
  checkIsAlreadyAdded,
  getAvailableSizesQuantity,
  getMostPopularProduct,
};
