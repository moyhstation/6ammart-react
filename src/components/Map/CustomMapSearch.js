import React from "react";
import { SearchLocationTextField } from "../landing-page/hero-section/HeroSection.style";
import {
  Autocomplete,
  IconButton,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import CloseIcon from "@mui/icons-material/Close";
import { t } from "i18next";
import SearchIcon from "@mui/icons-material/Search";
import { Stack } from "@mui/system";
import AnimationDots from "../spinner/AnimationDots";

const CustomMapSearch = ({
  showCurrentLocation,
  predictions,
  handleChange,
  HandleChangeForSearch,
  handleAgreeLocation,
  currentLocation,
  handleCloseLocation,
  frommap,
  placesIsLoading,
  currentLocationValue,
  fromparcel,
  isLoading,
  noleftborder,
  testLocation,
  borderRadius,
  toReceiver,
  isLanding = false,
  placeId,
  handleCloseLocation1,
  isRefetching,
}) => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {!showCurrentLocation ? (
        <Autocomplete
          fullWidth
          options={predictions}
          getOptionLabel={(option) => option.description}
          onChange={(event, value) => handleChange(event, value)}
          value={currentLocationValue}
          clearOnBlur={false}
          loading={frommap === "true" ? placesIsLoading : null}
          // open={true}
          loadingText={
            frommap === "true" ? t("Search suggestions are loading...") : ""
          }
          PaperComponent={(props) => (
            <Paper
              sx={{
                borderRadius: "0 0 4px 4px",
              }}
              {...props}
            />
          )}
          renderInput={(params) => (
            <SearchLocationTextField
              noleftborder={noleftborder}
              frommap={frommap}
              fromparcel={fromparcel}
              id="outlined-basic"
              {...params}
              placeholder={t("Search location here...")}
              isLanding
              isXSmall
              onChange={(event) => HandleChangeForSearch(event)}
              InputProps={{
                ...params.InputProps,
                endAdornment:
                  frommap === "true" ? (
                    <IconButton
                      sx={{
                        mr: "-31px",
                        borderRadius: borderRadius ? borderRadius : "0px",
                        padding: "7px 10px",
                      }}
                    // onClick={() => handleAgreeLocation()}
                    >
                      <SearchIcon />
                    </IconButton>
                  ) : currentLocationValue?.description ? (
                    <IconButton
                      sx={{
                        mr: "-61px",
                        padding: "5px",
                      }}
                    >
                      <CloseIcon
                        style={{
                          cursor: "pointer",
                          height: "20px",
                        }}
                        onClick={() => handleCloseLocation()}
                      />
                    </IconButton>
                  ) : (
                    <>
                      {toReceiver === "true" ? null : (
                        // <>{(isLanding && placeId) ? (
                        //   <IconButton
                        //     sx={{
                        //       mr: isXSmall ? "30pxpx" : "80px",
                        //       padding: "5px",
                        //     }}
                        //   >
                        //     <CloseIcon
                        //       style={{
                        //         cursor: "pointer",
                        //         height: "20px",
                        //       }}
                        //       onClick={() => handleCloseLocation()}
                        //     />
                        //   </IconButton>
                        // ) : (
                        <IconButton
                          sx={{
                            mr: fromparcel === "true" ? "-61px" : "-31px",
                            padding: "5px",
                            display: fromparcel !== "true" && "none",
                          }}
                          onClick={() => handleAgreeLocation()}
                        >
                          <GpsFixedIcon color="primary" />
                        </IconButton>
                        // )
                        // }
                        // </>
                      )}
                    </>
                  ),
              }}
              required={true}
            />
          )}
        />
      ) : (
        <SearchLocationTextField
          margin_top="true"
          size="small"
          variant="outlined"
          id="outlined-basic"
          placeholder={t("Search location here...")}
          value={testLocation ? testLocation : currentLocation}
          onChange={(event) => HandleChangeForSearch(event)}
          required={true}
          isLanding
          isXSmall
          frommap={frommap}
          fromparcel={fromparcel}
          InputProps={{
            endAdornment: !showCurrentLocation ? (
              <IconButton onClick={() => handleAgreeLocation()}>
                <GpsFixedIcon color="primary" />
              </IconButton>
            ) : (
              <Stack mr={isLanding ? "50px" : "0"}>
                {isLoading || isRefetching ? (
                  <AnimationDots />
                ) : (
                  <IconButton
                    sx={{
                      padding: "5px",
                      marginRight: isXSmall ? "0px" : "0px",
                    }}
                  >
                    <CloseIcon
                      sx={{
                        cursor: "pointer",
                        fontSize: isXSmall ? "16px" : "24px",
                      }}
                      onClick={() => handleCloseLocation()}
                    />
                  </IconButton>
                )}
              </Stack>
            ),
          }}
        />
      )}
    </>
  );
};

export default CustomMapSearch;
