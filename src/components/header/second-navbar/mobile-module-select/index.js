import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { IconButton, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { ModuleSelection } from "../../../landing-page/hero-section/module-selection";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import useGetModule from "../../../../api-manage/hooks/react-query/useGetModule";
import { useDispatch } from "react-redux";
import { setSelectedModule } from "../../../../redux/slices/utils";
export const getLocation = () => {
  return window.localStorage.getItem("location");
};
const MobileModuleSelection = () => {
  const [openModuleSelection, setOpenModuleSelection] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleCloseModuleModal = (item) => {
    if (item) {
      toast.success(t("A module has been selected."));
      dispatch(setSelectedModule(item));
    }
    setOpenModuleSelection(false);
  };

  const getModule = () => {
    return JSON.parse(window.localStorage.getItem("module"));
  };

  return (
    <>
      <Tooltip
        title={t("Modules")}
        sx={{ display: router.pathname === "/" && "none" }}
      >
        <IconButton
          sx={{
            paddingInlineStart: "0px",
            color: (theme) => theme.palette.neutral[400],
          }}
          onClick={() => setOpenModuleSelection(true)}
        >
          <GridViewRoundedIcon />
        </IconButton>
      </Tooltip>
      {openModuleSelection && (
        <ModuleSelection
          location={getLocation()}
          closeModal={handleCloseModuleModal}
          isSelected={getModule()}
        />
      )}
    </>
  );
};

export default MobileModuleSelection;
