import React, { useState } from "react";
import { roundHalf } from "../utils";
import { Stack } from "react-bootstrap";

export default function StarsRating({ ratingRate, ratingCount }) {
  function createStarElements() {
    const stars = [];
    let rating = roundHalf(ratingRate);
    const isHalf = rating % 2 !== 0;
    if (isHalf) rating = rating - 0.5;
    let icon;

    for (let i = 0; i < 5; i++) {
      if (i < rating) icon = "bi-star-fill";
      else if (i == rating && isHalf) icon = "bi-star-half";
      else icon = "bi-star";
      stars.push(<i key={i} className={`bi ${icon}`}></i>);
    }
    return stars;
  }

  const [starsElements, setStarsElements] = useState(createStarElements);

  return (
    <section className="mt-2 mb-3">
      <span className="fs-7">
        Ocena {ratingRate} ({ratingCount} recenzji)
      </span>
      <Stack direction="horizontal" gap={2}>
        {starsElements}
      </Stack>
    </section>
  );
}
