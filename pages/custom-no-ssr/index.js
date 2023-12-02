import React, { useEffect, useState } from "react";

const CustomNoSsr = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return <>{isClient && children}</>;
};

CustomNoSsr.propTypes = {};

export default CustomNoSsr;
