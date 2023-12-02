import React from "react";
import Link from "next/link";

const ClickToCall = ({ phone, children }) => {
  return <Link href={`tel:${phone}`}>{children}</Link>;
};
export default ClickToCall;
