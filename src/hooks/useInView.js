import { useEffect, useState } from "react";

export default function useInView(ref, data) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setIsIntersecting(true);
      else setIsIntersecting(false);
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [data, ref]);

  return isIntersecting;
}
