function sortByPriceAsc(array) {
  return [...array].sort((a, b) => (a.price > b.price ? 1 : -1));
}

function sortByPriceDesc(array) {
  return [...array].sort((a, b) => (a.price < b.price ? 1 : -1));
}

export default { sortByPriceAsc, sortByPriceDesc };
