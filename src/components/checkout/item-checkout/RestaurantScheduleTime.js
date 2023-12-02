import React from "react";
import { Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useTranslation } from "react-i18next";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
  CustomTypographyBold,
} from "../../../styled-components/CustomStyles.style";
import { getAllSchedule, getDayNumber } from "../../../utils/CustomFunctions";
import { DeliveryCaption, PreferableTimeInput } from "../CheckOut.style";
import CustomAlert from "../../alert/CustomAlert";

const RestaurantScheduleTime = (props) => {
  const {
    storeData,
    handleChange,
    today,
    tomorrow,
    numberOfDay,
    configData,
    setScheduleAt,
  } = props;
  const { t } = useTranslation();
  const slotDurationTime =
    configData?.schedule_order_slot_duration === 0
      ? 30
      : configData?.schedule_order_slot_duration;

  return (
    <>
      {storeData?.schedule_order && (
        <CustomStackFullWidth sx={{ height: "100%", paddingY: "10px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <DeliveryCaption const id="demo-row-radio-buttons-group-label">
                {t("Preferable Time")}
              </DeliveryCaption>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>{t("Time")}</InputLabel>
                <Select
                  label={t("Time")}
                  onChange={handleChange}
                  defaultValue={getDayNumber(today)}
                >
                  <MenuItem
                    value={getDayNumber(today)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "primary.main",
                      },
                    }}
                  >
                    {t("Today")}
                  </MenuItem>
                  <MenuItem
                    value={getDayNumber(tomorrow)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "primary.main",
                      },
                    }}
                  >
                    {t("Tomorrow")}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {getAllSchedule(numberOfDay, storeData?.schedules, slotDurationTime)
              .length !== 0 && (
              <Grid item md={6} xs={12}>
                {storeData?.schedules && storeData?.schedules?.length > 0 && (
                  <PreferableTimeInput
                    key={numberOfDay}
                    defaultValue={
                      getDayNumber(today) === numberOfDay ? t("Now") : ""
                    }
                    disablePortal
                    id="combo-box-demo"
                    options={getAllSchedule(
                      numberOfDay,
                      storeData?.schedules,
                      slotDurationTime
                    )}
                    onChange={(e, option) => setScheduleAt(option?.value)}
                    renderInput={(params) => (
                      <TextField {...params} label={t("Schedule")} />
                    )}
                  />
                )}
              </Grid>
            )}
            {getAllSchedule(numberOfDay, storeData?.schedules, slotDurationTime)
              .length === 0 && (
              <Grid item xs={12}>
                <CustomAlert type="info" text="Store closed." />
              </Grid>
            )}
          </Grid>
        </CustomStackFullWidth>
      )}
    </>
  );
};

RestaurantScheduleTime.propTypes = {};

export default RestaurantScheduleTime;
