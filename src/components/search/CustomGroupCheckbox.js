import React from "react";
import FormControl from "@mui/material/FormControl";
import { Checkbox, FormControlLabel, FormGroup, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { makeStyles } from "@mui/styles";
import CheckIcon from "@mui/icons-material/Check";
import { Stack } from "@mui/system";
import { t } from "i18next";

const CustomGroupCheckbox = ({ handleChangeFilter }) => {
  const theme = useTheme();
  const { filterData } = useSelector((state) => state.searchFilterStore);
  const { selectedModule } = useSelector((state) => state.utilsData);
  const [state, setState] = React.useState(filterData.filterBy);
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    handleChangeFilter(event);
  };

  return (
    <div>
      <FormControl component="fieldset" variant="standard">
        {selectedModule?.module_type === "food" && (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  name="veg"
                  checked={state.veg}
                  onChange={handleChange}
                  checkedIcon={
                    <Stack
                      sx={{
                        width: "25px",
                        height: "25px",
                        border: `3px solid ${theme.palette.primary.main}`,
                        borderRadius: "4px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CheckIcon style={{ width: "20px", height: "20px" }} />
                    </Stack>
                  }
                  icon={
                    <Stack
                      sx={{
                        width: "25px",
                        height: "25px",
                        border: `2px solid ${theme.palette.neutral[1100]}`,
                        borderRadius: "5px",
                      }}
                    ></Stack>
                  }
                />
              }
              label={t("Veg")}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.nonVeg}
                  onChange={handleChange}
                  name="nonVeg"
                  checkedIcon={
                    <Stack
                      sx={{
                        width: "25px",
                        height: "25px",
                        border: `3px solid ${theme.palette.primary.main}`,
                        borderRadius: "4px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CheckIcon style={{ width: "20px", height: "20px" }} />
                    </Stack>
                  }
                  icon={
                    <Stack
                      sx={{
                        width: "25px",
                        height: "25px",
                        border: `2px solid ${theme.palette.neutral[1100]}`,
                        borderRadius: "5px",
                      }}
                    ></Stack>
                  }
                />
              }
              label={t("Non-Veg")}
            />
          </>
        )}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="currentAvailableFoods"
                checked={state.currentAvailableFoods}
                onChange={handleChange}
                checkedIcon={
                  <Stack
                    sx={{
                      width: "25px",
                      height: "25px",
                      border: `3px solid ${theme.palette.primary.main}`,
                      borderRadius: "4px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CheckIcon style={{ width: "20px", height: "20px" }} />
                  </Stack>
                }
                icon={
                  <Stack
                    sx={{
                      width: "25px",
                      height: "25px",
                      border: `2px solid ${theme.palette.neutral[1100]}`,
                      borderRadius: "5px",
                    }}
                  ></Stack>
                }
              />
            }
            label={t("Currently Available Items")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.discountedFoods}
                onChange={handleChange}
                name="discountedFoods"
                checkedIcon={
                  <Stack
                    sx={{
                      width: "24px",
                      height: "24px",
                      border: `3px solid ${theme.palette.primary.main}`,
                      borderRadius: "4px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CheckIcon style={{ width: "20px", height: "20px" }} />
                  </Stack>
                }
                icon={
                  <Stack
                    sx={{
                      width: "24px",
                      height: "24px",
                      border: `2px solid ${theme.palette.neutral[1100]}`,
                      borderRadius: "5px",
                    }}
                  ></Stack>
                }
              />
            }
            label={t("Discounted Items")}
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default CustomGroupCheckbox;
