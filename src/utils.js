export function getProductSizes() {
  const getRandomNumber = () => Math.floor(Math.random() * 15);
  const productSizes = [];

  for (let i = 0; i < 21; i++) {
    productSizes.push([
      { XS: getRandomNumber() },
      { S: getRandomNumber() },
      { M: getRandomNumber() },
      { L: getRandomNumber() },
      { XL: getRandomNumber() },
      { XXL: getRandomNumber() },
    ]);
  }
  return productSizes;
}

export function usdToPLN(usdPrice) {
  return Math.trunc(usdPrice * 4.14);
}

export function roundHalf(num) {
  return Math.round(num * 2) / 2;
}

export function getPromises(array) {
  const promises = [];
  const addedIds = [];
  array.map((item) => {
    if (typeof item === "object") {
      if (addedIds.some((id) => id === item.id) === false) {
        promises.push(fetch(`https://fakestoreapi.com/products/${item.id}`));
        addedIds.push(item.id);
      }
    } else {
      if (addedIds.some((id) => id === item) === false) {
        promises.push(fetch(`https://fakestoreapi.com/products/${item}`));
        addedIds.push(item);
      }
    }
  });
  return promises;
}
