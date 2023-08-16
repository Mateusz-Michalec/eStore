export function usdToPLN(usdPrice) {
  return Math.trunc(usdPrice * 4.14);
}

export function roundHalf(num) {
  return Math.round(num * 2) / 2;
}

export function getRandomNumbersArr(length) {
  let randomNumbers = new Set();

  while (randomNumbers.size < length)
    randomNumbers.add(Math.floor(Math.random() * 20));

  return [...randomNumbers];
}

export function getMostPopularProduct(products) {
  return products.reduce((prev, current) =>
    prev.rating.count > current.rating.count ? prev : current
  );
}
