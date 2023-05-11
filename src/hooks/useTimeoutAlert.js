import React, { useEffect, useState } from "react";

export default function useTimeoutAlert(duration) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const action = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => {
      clearTimeout(action);
    };
  }, [show]);

  return [show, setShow];
}
