import React from "react";
import PropTypes from "prop-types";
import {
  CustomChip,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import CustomCheckbox from "../CustomCheckbox";
import { Skeleton, Typography } from "@mui/material";
import { Scrollbar } from "../srollbar";
import CheckboxWithChild from "../store-details/middle-section/CheckboxWithChild";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { CustomPaperBox } from "./index";
import { useTranslation } from "react-i18next";

const TagsCheckbox = (props) => {
  const { title, data, isFetching, showAll } = props;
  const { t } = useTranslation();
  return (
    <CustomStackFullWidth>
      <Typography
        fontWeight="bold"
        sx={{ color: (theme) => theme.palette.neutral[1000] }}
      >
        {t(title)}
      </Typography>
      <CustomPaperBox>
        <CustomStackFullWidth p="1rem">
          <Scrollbar style={{ maxHeight: "300px" }} scrollbarMinSize={5}>
            {showAll && <CustomCheckbox item={{ name: "All" }} />}
            {data?.map((item, index) => {
              return (
                <CustomStackFullWidth
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  key={index}
                >
                  <CustomCheckbox item={item} />
                  <CustomChip label={123} />
                </CustomStackFullWidth>
              );
            })}
            {isFetching &&
              [...Array(4)].map((item, index) => {
                return (
                  <ListItemButton key={index}>
                    <ListItemText>
                      <Skeleton
                        variant="rectangle"
                        height="10px"
                        width="100%"
                      />
                    </ListItemText>
                  </ListItemButton>
                );
              })}
          </Scrollbar>
        </CustomStackFullWidth>
      </CustomPaperBox>
    </CustomStackFullWidth>
  );
};

TagsCheckbox.propTypes = {};

export default TagsCheckbox;
