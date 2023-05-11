export function usdToPLN(usdPrice) {
  return Math.trunc(usdPrice * 4.14);
}

export function roundHalf(num) {
  return Math.round(num * 2) / 2;
}
