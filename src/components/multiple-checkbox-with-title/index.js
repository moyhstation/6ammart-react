import React, { useEffect, useState } from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Skeleton, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Scrollbar } from "../srollbar";
import CheckboxWithChild from "../store-details/middle-section/CheckboxWithChild";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import CustomCheckbox from "../CustomCheckbox";
import { VIEW_ALL_TEXT } from "../../utils/staticTexts";

export const CustomPaperBox = styled(Box)(({ theme }) => ({
  backgroundColor: "paper.default",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
  borderRadius: "10px",
  p: "1rem",
  color: theme.palette.neutral[900],
}));
const MultipleCheckboxWithTitle = (props) => {
  const {
    title,
    data,
    isFetching,
    showAll,
    searchValue,
    id,
    selectedCategoriesHandler,
  } = props;
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    setSelectedId(id);
  }, [id]);

  
  useEffect(() => {
    selectedCategoriesHandler?.(selectedItems);
  }, [selectedItems]);
  useEffect(() => {
    if (searchValue === VIEW_ALL_TEXT.allCategories && data?.length > 0) {
      let checkData = { checked: true, id: "all" };
      allCheckHandler(checkData);
    } else if (searchValue === "category") {
      const selectedCategory = {
        checked: true,
        id: parseInt(id),
      };
      checkHandler(selectedCategory);
    }
  }, [data, searchValue, id]);
  const checkHandler = (checkedData) => {
    const parent = data?.find((item) => item?.id === checkedData?.id);
    let ids = [];
    if (parent) {
      if (parent?.childes.length > 0) {
        ids = [parent?.id, ...parent?.childes?.map((childId) => childId?.id)];
      } else {
        ids.push(parent?.id);
      }
    } else {
      ids.push(checkedData?.id);
    }
    if (checkedData?.checked) {
      setSelectedId(parent?.id);
      setSelectedItems((prevState) => [...prevState, ...ids]);
    } else {
      setSelectedItems((prevState) =>
        prevState.filter((item) => ids?.every((id) => id !== item))
      );
    }
  };

  const allCheckHandler = (itemData) => {
    if (itemData?.checked) {
      setIsAllSelected(true);
      let allIds = [];
      if (data?.length > 0) {
        data.forEach((item) => {
          allIds.push(item.id);
          if (item?.childes?.length > 0) {
            item?.childes?.forEach((childItem) => allIds.push(childItem.id));
          }
        });
      }
      setSelectedItems((prevState) => [...prevState, ...allIds]);
    } else {
      setIsAllSelected(false);
      setSelectedItems((prevState) => []);
    }
  };

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
            {showAll && (
              <CustomCheckbox
                item={{ name: "All", id: "all" }}
                checkHandler={allCheckHandler}
                isChecked={isAllSelected}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            )}
            {data?.map((item, index) => {
              return (
                <CheckboxWithChild
                  key={index}
                  item={item}
                  checkHandler={checkHandler}
                  selectedItems={selectedItems}
                />
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

MultipleCheckboxWithTitle.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default MultipleCheckboxWithTitle;
