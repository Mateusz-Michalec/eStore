function usdToPLN(usdPrice) {
  return Math.trunc(usdPrice * 4.14);
}

function roundHalf(num) {
  return Math.round(num * 2) / 2;
}

export default { usdToPLN, roundHalf };
