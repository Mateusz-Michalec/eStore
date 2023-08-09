import { createSlice } from "@reduxjs/toolkit";

function getProductSizes() {
  const getRandomNumber = () => Math.floor(Math.random() * 15);
  const productSizes = [];

  for (let i = 0; i < 30; i++) {
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

const initialState = getProductSizes();

const sizesSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {},
});

export const selectSizesByProductId = (state, productId) =>
  state[Number(productId)];

export const getSizeQuantity = (state, productId, size) => {
  if (productId && size) {
    const productSizes = state.sizes[productId];
    const sizeObj = productSizes.find((s) => s[size]);
    if (sizeObj) return sizeObj[size];
  }
};

export default sizesSlice.reducer;
