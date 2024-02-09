import React from "react";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import { Grid, Skeleton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { Scrollbar } from "../../srollbar";

const SuggestedSearches = ({ t, data, handleKeyPress, isRefetching }) => {
  return (
    <>
      {isRefetching ? (
        <Skeleton variant="text" width="60px" />
      ) : (
        data && (
          <CustomStackFullWidth>
            <Typography
              sx={{ my: "10px", color: (theme) => theme.palette.neutral[500] }}
            >
              {t("Suggested Searches")}
            </Typography>
            <CustomBoxFullWidth>
              <Scrollbar style={{ maxHeight: "400px" }}>
                <Grid container spacing={2}>
                  {data?.items?.length > 0 && (
                    <Grid item xs={12}>
                      <CustomStackFullWidth spacing={2}>
                        <Typography fontSize="14px" fontWeight="500">
                          {t("Items")}
                        </Typography>
                        {data?.items.map((item, index) => {
                          return (
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1.5}
                              key={index}
                              sx={{ cursor: "pointer" }}
                              onClick={() => handleKeyPress?.(item?.name)}
                            >
                              <SearchIcon />
                              <Typography
                                sx={{
                                  color: (theme) => theme.palette.neutral[700],
                                }}
                              >
                                {item?.name}
                              </Typography>
                            </Stack>
                          );
                        })}
                      </CustomStackFullWidth>
                    </Grid>
                  )}
                  {data?.stores?.length > 0 && (
                    <Grid item xs={12}>
                      <CustomStackFullWidth spacing={2}>
                        <Typography fontSize="14px" fontWeight="500">
                          {t("Stores")}
                        </Typography>
                        {data?.stores.map((item, index) => {
                          return (
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1.5}
                              key={index}
                              sx={{ cursor: "pointer" }}
                              onClick={() => handleKeyPress?.(item?.name)}
                            >
                              <SearchIcon />
                              <Typography
                                sx={{
                                  color: (theme) => theme.palette.neutral[700],
                                }}
                              >
                                {item?.name}
                              </Typography>
                            </Stack>
                          );
                        })}
                      </CustomStackFullWidth>
                    </Grid>
                  )}
                </Grid>
              </Scrollbar>
            </CustomBoxFullWidth>
          </CustomStackFullWidth>
        )
      )}
    </>
  );
};

export default SuggestedSearches;
