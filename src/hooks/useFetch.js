import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    (async function fetchData() {
      try {
        const jsonData = await (await fetch(url)).json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      }
    })();
  }, []);

  return [data, error];
}
