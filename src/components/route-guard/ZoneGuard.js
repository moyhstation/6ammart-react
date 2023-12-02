import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ZoneGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }
      const zoneId = JSON.parse(localStorage.getItem("zoneid"));
      const location = localStorage.getItem("location");
      if (zoneId?.length > 0 && location) {
        setChecked(true);
      } else {
        router.push("/", undefined, { shallow: true });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};

export default ZoneGuard;
