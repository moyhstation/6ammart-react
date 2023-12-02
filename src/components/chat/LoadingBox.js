import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
// import Loading from '../custom-loading/Loading'
import ChatMessageAdd from "./ChatMessageAdd";
import Loading from "../custom-loading/Loading";

const LoadingBox = () => {
  return (
    <CustomStackFullWidth height="71vh" justifyContent="space-between">
      <Loading />
      <ChatMessageAdd />
    </CustomStackFullWidth>
  );
};

export default LoadingBox;
