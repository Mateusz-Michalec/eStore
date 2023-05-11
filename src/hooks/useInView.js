import { useEffect, useState } from "react";

export default function useInView(refs) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target.id;
        if (entry.isIntersecting)
          setElements((prev) => [...prev, { [element]: true }]);
        else setElements((prev) => [...prev, { [element]: false }]);
      });
    });

    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return elements;
}
