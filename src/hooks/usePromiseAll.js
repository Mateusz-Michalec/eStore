import React, { useEffect, useState } from "react";

export default function usePromiseAll(promises, callback) {
  const [data, setData] = useState();

  useEffect(() => {
    Promise.all(promises)
      .then((values) => Promise.all(values.map((value) => value.json())))
      .then((finalValues) => {
        if (callback) setData(callback(finalValues));
        // if (callback)
        //   setTimeout(() => {
        //     setData(callback(finalValues));
        //   }, 2000);
        // else setData(finalValues);
      });
  }, []);

  return [data, setData];
}
