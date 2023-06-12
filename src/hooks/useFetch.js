import { useEffect, useState } from "react";

export default function useFetch(url, callback, id, sizes) {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function sortData(products) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setData(products);
    }, 200);
  }

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const jsonData = await response.json();
          if (callback) setData(callback(jsonData, sizes));
          else setData(jsonData);
        } else {
          setError("Network response error");
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      setIsLoading(true);
    };
  }, [id, url]);

  return [data, isLoading, error, sortData];
}
