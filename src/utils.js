export function usdToPLN(usdPrice) {
  return Math.trunc(usdPrice * 4.14);
}

export function roundHalf(num) {
  return Math.round(num * 2) / 2;
}

export function getProductSizes() {
  const getRandomNumber = () => Math.floor(Math.random() * 15);

  return [
    { XS: getRandomNumber() },
    { S: getRandomNumber() },
    { M: getRandomNumber() },
    { L: getRandomNumber() },
    { XL: getRandomNumber() },
    { XXL: getRandomNumber() },
  ];
}
