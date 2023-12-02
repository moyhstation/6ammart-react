import React, { useState } from "react";
import { alpha, Collapse, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { useRouter } from "next/router";
import Link from "next/link";
//import { getDataLimit } from "../../utils/customFunctions";
import { t } from "i18next";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { getModuleId } from "../../../../helper-functions/getModuleId";
import { useTranslation } from "react-i18next";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import { Scrollbar } from "../../../srollbar";

const CollapsableMenu = ({ value, toggleDrawers, setOpenDrawer, pathName,forcategory }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  const handleRoute = (id) => {
    if(forcategory==='true'){
      router.push({
        pathname: "/home",
        query: {
          search: "category",
          id: id,
          module_id: `${getModuleId()}`,
          name: btoa(name),
        },
      });
    }else{
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
    router.push(pathName, undefined, { shallow: true });
    setOpen(false);
    setOpenDrawer(false);
  };
  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
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
              variant="h6"
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
