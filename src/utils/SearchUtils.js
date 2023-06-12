function checkIsAlreadyAdded(product, array) {
  return array.find(
    (item) => item.id === product.id && item?.size === product?.size
  );
}

function getAvailableSizesQuantity(product) {
  const sizeObj = product.sizes.find((item) => item[product.size]);
  return Object.values(sizeObj)[0];
}

export default { checkIsAlreadyAdded, getAvailableSizesQuantity };
