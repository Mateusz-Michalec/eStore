import React, { useEffect, useState } from "react";

export default function useTimeoutAlert() {
  const [alertData, setAlertData] = useState({
    show: false,
    text: "",
    location: "",
  });

  useEffect(() => {
    let action;
    if (alertData.show)
      action = setTimeout(() => {
        setAlertData((prev) => ({ ...prev, show: false }));
      }, 2500);

    return () => {
      if (alertData.show) clearTimeout(action);
    };
  }, [alertData.show]);

  return [alertData, setAlertData];
}
