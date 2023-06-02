import React, { useEffect, useState } from "react";

export default function TimeoutFallback() {
  const [fallback, setFallback] = useState(null);

  useEffect(() => {
    const showFallback = setTimeout(() => {
      setFallback(<div className="loader mt-5"></div>);
    }, 300);

    return () => {
      clearTimeout(showFallback);
      setFallback(null);
    };
  }, []);

  return fallback;
}
