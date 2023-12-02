import React, { useState } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { CustomDatePicker, CustomTimePicker } from "../CheckOut.style";
import {
  FormControlLabel,
  FormGroup,
  Input,
  InputAdornment,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { t } from "i18next";
import { InputLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment/moment";
import { getDayNumber } from "../../../utils/CustomFunctions";
import { useSelector } from "react-redux";
import { dateAndTimeConverter } from "../../../utils/DateAndTimeConverter";

const TimeInput = styled(TextField)(({ theme }) => ({
  border: "none",
  background: "rgba(118, 118, 128, 0.12)",
  borderRadius: "5px",
  input: {
    padding: "5px 0px",
    textAlign: "center",
    "&::-webkit-calendar-picker-indicator": {
      display: "none",
    },
    "&::-webkit-datetime-edit-ampm-field": {
      display: "none",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));
const MaterialUISwitch = styled(Switch)(({ theme, timeValue }) => ({
  width: 100,
  height: 30,
  padding: 0,

  "& .MuiSwitch-switchBase": {
    background: "rgba(118, 118, 128, 0.12)",
    margin: 2,
    padding: 0,
    transform: "translateX(2px)",
    "&.Mui-checked+": {
      "& .MuiSwitch-track": {
        background: "rgba(118, 118, 128, 0.12)",
        borderRadius: 5,
      },
    },

    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(45px)",
      "& .MuiSwitch-thumb:before": {
        content: `"${timeValue}"`,
        position: "absolute",

        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    background: "#fff",
    color: "#3E594D",
    width: 48,
    height: 26,

    borderRadius: "5px",
    "&:before": {
      content: `"${timeValue}"`,
      position: "absolute",

      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  "& .MuiSwitch-track": {
    background: "rgba(118, 118, 128, 0.12)",
    borderRadius: 5,
  },
}));

const ScheduleDelivery = ({ customDispatch, scheduleTime, setDayNumber }) => {
  const { configData } = useSelector((state) => state.configData);
  const [timeValue, setTimeValue] = useState("AM");
  const handleChange = (e) => {
    const input = e.target.value;
    const hour = parseInt(input.split(":")[0], 10);
    const amPm = hour >= 12 ? "PM" : "AM";
    const time = new Date(`2000-01-01 ${input}`); // Set an arbitrary date for parsing

    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    setTimeValue(amPm);
    customDispatch({
      type: "SET_SCHEDULE_TIME",
      payload: formattedTime,
    });
  };
  const handleChangeCheck = (event) => {
    if (event.target.checked) {
      customDispatch({ type: "SET_AMPM", payload: timeValue });
    } else {
      customDispatch({ type: "SET_AMPM", payload: timeValue });
    }
  };
  const handleDateChange = (newValue) => {
    const dayName = moment(newValue?.$d).format("dddd");
    const selectedDayNumber = getDayNumber(dayName);
    setDayNumber(selectedDayNumber);
    customDispatch({ type: "SET_SCHEDULE_MONTH", payload: newValue });
  };

  return (
    <CustomStackFullWidth p="1rem">
      {" "}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CustomDatePicker
          renderInput={(params) => <TextField {...params} />}
          onChange={(newValue) => handleDateChange(newValue)}
          disablePast
          views={["day"]}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          pr="1.25rem"
          pl="1.25rem"
          alignItems="center"
        >
          <Typography fontWeight="400" fontSize="16px">
            {t("Time")}
          </Typography>
          <Stack direction="row" spacing={1.7}>
            <TimeInput
              type="time"
              value={scheduleTime}
              onChange={(e) => handleChange(e)}
            />

            <MaterialUISwitch
              timeValue={timeValue}
              defaultChecked
              onChange={handleChangeCheck}
            />
          </Stack>
        </Stack>
      </LocalizationProvider>
    </CustomStackFullWidth>
  );
};

export default ScheduleDelivery;
