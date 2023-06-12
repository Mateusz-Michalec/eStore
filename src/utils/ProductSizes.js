function getProductSizes() {
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

export default { getProductSizes };
