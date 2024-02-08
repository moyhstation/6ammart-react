import React from "react";
import CustomModal from "../../modal";
import { IconButton, Paper, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import MapComponent from "./MapComponent";
import { Box } from "@mui/system";

const LocationViewOnMap = (props) => {
  const { open, handleClose, latitude, longitude, address } = props;
  const theme = useTheme();
  return (
    <CustomModal openModal={open} handleClose={handleClose}>
      <Paper
        sx={{
          position: "relative",
          width: { xs: "300px", sm: "450px", md: "750px" },
          // height:{md:"500px"},
          // p: { xs: "10px", sm: "15px", md: "20px" },
          p:"15px"
        }}
      >
        <IconButton
          onClick={() => handleClose()}
          sx={{ 
            position: "absolute", 
            top: 5, 
            right: 5, 
            backgroundColor: theme.palette.whiteContainer.main,
            zIndex: 100 ,
            padding:"5px",
            borderRadius:"50%"
          }}
        >
          <CloseIcon sx={{ fontSize: "16px" }} />
        </IconButton>
        <CustomStackFullWidth sx={{ position: "relative" }}>
          <MapComponent latitude={latitude} longitude={longitude} />
          <Box
            sx={{
              backgroundColor: "background.paper",
              position: "absolute",
              right: "10px",
              px: "20px",
              py: "10px",
              bottom: 0,
              left: "10px",
              my: "10px",
            }}
          >
            {address}
          </Box>
        </CustomStackFullWidth>
      </Paper>
    </CustomModal>
  );
};

LocationViewOnMap.propTypes = {};

export default LocationViewOnMap;
