import { useEffect, useState } from "react";

export default function useFetch(url, callback, id) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      try {
        const jsonData = await (await fetch(url)).json();
        if (callback) setData(callback(jsonData));
        else setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    })();

    return () => setIsLoading(true);
  }, [id]);

  return [data, error, isLoading];
}
