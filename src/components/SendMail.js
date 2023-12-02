import React from "react";
import Link from "next/link";

const SendMail = ({ email, children }) => {
  return <Link href={`mailto:${email}`}>{children}</Link>;
};
export default SendMail;
