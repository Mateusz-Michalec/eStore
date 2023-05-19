import { useEffect, useState } from "react";

export default function useFetch(url, callback) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    (async function fetchData() {
      try {
        const jsonData = await (await fetch(url)).json();
        if (callback) setData(callback(jsonData));
        else setData(jsonData);
      } catch (error) {
        setError(error);
      }
    })();
  }, []);

  return [data, error];
}
