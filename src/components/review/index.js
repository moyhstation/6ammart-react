import React from "react";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import ReviewLists from "./ReviewLists";
import H1 from "../typographies/H1";

const ReviewPage = ({ id }) => {
  return (
    <CustomStackFullWidth mt="1rem">
      <CustomPaperBigCard>
        <CustomStackFullWidth spacing={4}>
          <H1 text="Reviews" textAlign="left" />
          <ReviewLists id={id} />
        </CustomStackFullWidth>
      </CustomPaperBigCard>
    </CustomStackFullWidth>
  );
};

export default ReviewPage;
