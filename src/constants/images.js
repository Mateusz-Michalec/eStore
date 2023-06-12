import hero from "../assets/img/hero.jpg";
import electronics from "../assets/img/electronics.jpg";
import jewelery from "../assets/img/jewelery.jpg";
import mensClothing from "../assets/img/mensClothing.jpg";
import womensClothing from "../assets/img/womensClothing.jpg";

function getCategoriesImages() {
  return [
    {
      img: electronics,
      alt: "electronics",
    },
    {
      img: jewelery,
      alt: "jewelery",
    },
    {
      img: mensClothing,
      alt: "men's clothing",
    },
    {
      img: womensClothing,
      alt: "women's clothing",
    },
  ];
}

export default {
  hero,
  electronics,
  jewelery,
  mensClothing,
  womensClothing,
  getCategoriesImages,
};
