import React, { useState } from "react";
import { alpha, Collapse, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { useRouter } from "next/router";
//import { getDataLimit } from "../../utils/customFunctions";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { getModuleId } from "../../../../helper-functions/getModuleId";
import { useTranslation } from "react-i18next";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import { VIEW_ALL_TEXT } from "../../../../utils/staticTexts";

const CollapsableMenu = ({
  value,
  toggleDrawers,
  setOpenDrawer,
  pathName,
  forcategory,
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen((prevState) => !prevState);
  const handleRoute = (id) => {
    if (forcategory === "true") {
      router.push({
        pathname: "/home",
        query: {
          search: "category",
          id: id,
          module_id: `${getModuleId()}`,
          name: btoa(name),
        },
      });
    } else {
      router.push(
        {
          pathname: `/${value?.path}/[id]`,
          query: { id: `${id}`, module_id: `${getModuleId()}` },
        },
        undefined,
        { shallow: true }
      );
    }

    setOpen(false);
    setOpenDrawer(false);
  };

  const handleView = () => {
    if (pathName === "/categories") {
      router.push(
        {
          pathname: "/home",
          query: {
            search: VIEW_ALL_TEXT.allCategories,
            from: "allCategories",
          },
        },
        undefined,
        { shallow: true }
      );
    } else {
      router.push(pathName, undefined, { shallow: true });
    }

    setOpen(false);
    setOpenDrawer(false);
  };
  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          color: (theme) => theme.palette.primary.main,
          "&:hover": {
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.3),
          },
        }}
      >
        <ListItemText primary={t(value?.text)} />
        {open ? (
          <ExpandLess sx={{ fontSize: "20px" }} />
        ) : (
          <ExpandMore sx={{ fontSize: "20px" }} />
        )}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          {value.items?.slice?.(0, 10)?.map((item, index) => (
            <ListItemButton
              sx={{
                pl: 4,
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.3),
                },
              }}
              key={index}
              onClick={() => handleRoute(item.id)}
            >
              <ListItemText primary={item.name}></ListItemText>
            </ListItemButton>
          ))}
          <CustomStackFullWidth alignItems="center" justifyContent="center">
            <Typography
              fontSize=".8rem"
              fontWeight="bold"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={handleView}
            >
              {t("View all")}
            </Typography>
          </CustomStackFullWidth>
        </List>
      </Collapse>
    </>
  );
};

export default CollapsableMenu;
